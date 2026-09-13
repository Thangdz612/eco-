/**
 * Quản lý các yêu cầu mạng tập trung (Request Manager)
 * - Quản lý URL backend cố định cho APK / Web
 * - Cơ chế Timeout 8s với AbortController
 * - Giới hạn Retry thông minh (tối đa 2 lần với Exponential Backoff 1s, 2s)
 * - Single-flight / Deduplication tránh gửi trùng các yêu cầu đang xử lý
 * - Chuyển đổi mã lỗi kỹ thuật thành thông báo tiếng Việt lịch sự, dễ hiểu
 */

import { logger } from './logger';
import { networkManager } from './networkManager';

export interface RequestOptions extends RequestInit {
  timeoutMs?: number;
  maxRetries?: number;
  skipDeduplication?: boolean;
}

export class ApiRequestError extends Error {
  public status?: number;
  public friendlyMessage: string;
  public isNetworkError: boolean;
  public isTimeout: boolean;

  constructor(message: string, options: { status?: number; friendlyMessage: string; isNetworkError?: boolean; isTimeout?: boolean }) {
    super(message);
    this.name = 'ApiRequestError';
    this.status = options.status;
    this.friendlyMessage = options.friendlyMessage;
    this.isNetworkError = !!options.isNetworkError;
    this.isTimeout = !!options.isTimeout;
  }
}

/**
 * Lấy URL gốc (Base URL) cho các dịch vụ Backend/Proxy
 * Ưu tiên: Biến môi trường VITE_API_BASE_URL -> window.location.origin (nếu trên Web)
 */
export function getApiBaseUrl(): string {
  try {
    const envUrl = (import.meta as any).env?.VITE_API_BASE_URL || (import.meta as any).env?.VITE_BACKEND_URL;
    if (envUrl && typeof envUrl === 'string' && envUrl.trim() !== '') {
      return envUrl.trim().replace(/\/+$/, '');
    }
  } catch (_e) {
    // ignore
  }

  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    // Nếu chạy trên Web chuẩn
    if (window.location.protocol.startsWith('http')) {
      return window.location.origin;
    }
  }

  return '';
}

class RequestManager {
  // Bản đồ lưu trữ các yêu cầu đang thực thi (In-flight requests) để deduplication
  private inFlightRequests: Map<string, Promise<any>> = new Map();

  /**
   * Thực thi yêu cầu HTTP an toàn với cơ chế timeout, retry và deduplication
   */
  public async fetchJson<T>(url: string, options: RequestOptions = {}): Promise<T> {
    const method = (options.method || 'GET').toUpperCase();
    const timeoutMs = options.timeoutMs ?? 8000;
    const maxRetries = method === 'GET' ? (options.maxRetries ?? 2) : 0; // Chỉ retry với GET
    const dedupeKey = `${method}:${url}`;

    // Kiểm tra kết nối mạng trước khi gọi
    if (!networkManager.isOnline()) {
      logger.network('Thiết bị đang OFFLINE, hủy gọi mạng:', url);
      throw new ApiRequestError('Thiết bị ngoại tuyến', {
        friendlyMessage: 'Không có kết nối mạng. Đang hiển thị dữ liệu lưu trong bộ nhớ đệm.',
        isNetworkError: true,
      });
    }

    // Single-flight Deduplication đối với các yêu cầu GET đồng thời
    if (method === 'GET' && !options.skipDeduplication && this.inFlightRequests.has(dedupeKey)) {
      logger.debug('Sử dụng lại yêu cầu mạng đang thực thi (Deduplication):', url);
      return this.inFlightRequests.get(dedupeKey)!;
    }

    const requestPromise = this.executeWithRetry<T>(url, options, timeoutMs, maxRetries);

    if (method === 'GET' && !options.skipDeduplication) {
      this.inFlightRequests.set(dedupeKey, requestPromise);
      // Dọn dẹp sau khi hoàn thành
      requestPromise.finally(() => {
        this.inFlightRequests.delete(dedupeKey);
      });
    }

    return requestPromise;
  }

  private async executeWithRetry<T>(
    url: string,
    options: RequestOptions,
    timeoutMs: number,
    retriesLeft: number
  ): Promise<T> {
    let attempt = 0;
    const maxAttempts = retriesLeft + 1;

    while (attempt < maxAttempts) {
      attempt++;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      try {
        logger.api(url, `Bắt đầu gửi (Lần ${attempt}/${maxAttempts})`);

        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
          headers: {
            Accept: 'application/json',
            ...(options.headers || {}),
          },
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          logger.api(url, response.status, 'Phản hồi không thành công');

          // Không retry các lỗi 4xx (Client errors)
          if (response.status >= 400 && response.status < 500) {
            throw new ApiRequestError(`Lỗi HTTP ${response.status}`, {
              status: response.status,
              friendlyMessage: `Yêu cầu không hợp lệ hoặc tài nguyên không tìm thấy (${response.status}).`,
            });
          }

          // Lỗi 5xx từ server
          if (attempt >= maxAttempts) {
            throw new ApiRequestError(`Máy chủ lỗi ${response.status}`, {
              status: response.status,
              friendlyMessage: 'Máy chủ dữ liệu hiện đang quá tải hoặc gặp sự cố tạm thời.',
            });
          }

          // Chờ trước khi retry (Exponential backoff: 1s, 2s)
          await this.delay(attempt * 1000);
          continue;
        }

        const data = await response.json();
        logger.api(url, 200, 'Thành công');
        return data as T;
      } catch (err: any) {
        clearTimeout(timeoutId);

        const isTimeout = err.name === 'AbortError' || err.message?.includes('aborted');
        const isNetwork = !networkManager.isOnline() || err.name === 'TypeError';

        logger.warn(`Lỗi khi gọi API ${url} (Lần ${attempt}):`, err.message || err);

        // Nếu hết số lần retry hoặc lỗi do client
        if (attempt >= maxAttempts) {
          if (isTimeout) {
            throw new ApiRequestError('Quá thời gian chờ phản hồi', {
              friendlyMessage: 'Hết thời gian chờ phản hồi từ máy chủ thời tiết (quá 8 giây).',
              isTimeout: true,
            });
          }
          if (isNetwork) {
            throw new ApiRequestError('Lỗi kết nối mạng', {
              friendlyMessage: 'Không thể kết nối đến máy chủ thời tiết. Vui lòng kiểm tra đường truyền Internet.',
              isNetworkError: true,
            });
          }
          throw new ApiRequestError(err.message || 'Lỗi không xác định', {
            friendlyMessage: 'Không thể tải dữ liệu thời tiết mới lúc này. Đang sử dụng bộ nhớ đệm.',
          });
        }

        // Tạm nghỉ trước khi thử lại
        await this.delay(attempt * 1000);
      }
    }

    throw new ApiRequestError('Quá số lần thử lại', {
      friendlyMessage: 'Không thể nhận dữ liệu mới sau nhiều lần thử lại.',
    });
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export const requestManager = new RequestManager();
