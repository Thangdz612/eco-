/**
 * Quản lý trạng thái kết nối mạng (Network Manager)
 * Đảm bảo phát hiện chính xác trạng thái ONLINE / OFFLINE trong cả Web và APK Capacitor.
 * Hỗ trợ cơ chế pub/sub để các thành phần UI phản ứng tức thì và đồng bộ mượt mà khi có mạng trở lại.
 */

import { logger } from './logger';

export type NetworkStatus = 'ONLINE' | 'OFFLINE' | 'UNKNOWN';

type NetworkListener = (status: NetworkStatus) => void;

class NetworkManager {
  private status: NetworkStatus = 'UNKNOWN';
  private listeners: Set<NetworkListener> = new Set();
  private debounceTimer: any = null;

  constructor() {
    this.init();
  }

  private init() {
    if (typeof window === 'undefined') {
      this.status = 'ONLINE';
      return;
    }

    // Xác định trạng thái ban đầu
    this.status = navigator.onLine ? 'ONLINE' : 'OFFLINE';
    logger.network(`Khởi tạo trạng thái mạng ban đầu: ${this.status}`);

    // Lắng nghe sự kiện chuẩn từ trình duyệt/WebView
    window.addEventListener('online', () => {
      this.handleStateChange('ONLINE');
    });

    window.addEventListener('offline', () => {
      this.handleStateChange('OFFLINE');
    });

    // Lắng nghe Capacitor Network Plugin nếu ứng dụng đang chạy trong APK
    try {
      const cap = (window as any).Capacitor;
      if (cap?.Plugins?.Network) {
        cap.Plugins.Network.getStatus().then((s: any) => {
          this.handleStateChange(s.connected ? 'ONLINE' : 'OFFLINE');
        });
        cap.Plugins.Network.addListener('networkStatusChange', (s: any) => {
          this.handleStateChange(s.connected ? 'ONLINE' : 'OFFLINE');
        });
      }
    } catch (e) {
      logger.debug('Capacitor Network Plugin không khả dụng, sử dụng API Web tiêu chuẩn.');
    }
  }

  private handleStateChange(newStatus: NetworkStatus) {
    if (this.status === newStatus) return;

    this.status = newStatus;
    logger.network(`Chuyển đổi trạng thái mạng: ${newStatus}`);

    // Debounce thông báo khi ONLINE trở lại để gom cụm các yêu cầu tải
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      this.notifyListeners();
      // Phát sự kiện toàn cục CustomEvent
      try {
        window.dispatchEvent(
          new CustomEvent('eco-network-status-changed', {
            detail: { status: this.status, isOnline: this.status === 'ONLINE' },
          })
        );
      } catch (_e) {
        // ignore
      }
    }, 300);
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => {
      try {
        listener(this.status);
      } catch (err) {
        logger.error('Lỗi trong listener mạng:', err);
      }
    });
  }

  /**
   * Kiểm tra thiết bị có đang trực tuyến hay không
   */
  public isOnline(): boolean {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      return false;
    }
    return this.status === 'ONLINE';
  }

  /**
   * Lấy trạng thái hiện tại
   */
  public getStatus(): NetworkStatus {
    return this.status;
  }

  /**
   * Đăng ký nhận thông báo thay đổi trạng thái
   */
  public subscribe(listener: NetworkListener): () => void {
    this.listeners.add(listener);
    // Gửi ngay trạng thái hiện tại cho subscriber mới
    listener(this.status);

    return () => {
      this.listeners.delete(listener);
    };
  }
}

export const networkManager = new NetworkManager();
