/**
 * Khách hàng giao tiếp Trợ lý AI (AI Chat Client)
 * - Tuân thủ bảo mật tuyệt đối: Không nhúng GEMINI_API_KEY trong frontend bundle/APK.
 * - Chỉ gọi thông qua Endpoint HTTPS Backend `/api/ai/chat`.
 * - Kiểm tra mạng trước khi gửi: Nếu offline, thông báo ngay lập tức mà không gửi request.
 * - Không retry vô hạn.
 */

import { networkManager } from './networkManager';
import { requestManager, getApiBaseUrl, ApiRequestError } from './requestManager';
import { logger } from './logger';

export interface AiChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AiChatResponse {
  success: boolean;
  reply?: string;
  error?: string;
  isOffline?: boolean;
}

/**
 * Gửi tin nhắn đến AI Assistant qua Backend an toàn
 */
export async function sendAiChatMessage(
  message: string,
  history: AiChatMessage[] = []
): Promise<AiChatResponse> {
  // 1. Kiểm tra kết nối mạng
  if (!networkManager.isOnline()) {
    return {
      success: false,
      isOffline: true,
      error: 'Chức năng AI cần kết nối Internet để phân tích và trả lời.',
    };
  }

  // 2. Xác định endpoint
  const baseUrl = getApiBaseUrl();
  const endpoint = baseUrl ? `${baseUrl}/api/ai/chat` : '/api/ai/chat';

  try {
    const payload = {
      message,
      history,
    };

    const response = await requestManager.fetchJson<{ reply?: string; message?: string; error?: string }>(
      endpoint,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        timeoutMs: 12000, // AI có thể cần 10-12s
        maxRetries: 0, // Không tự động retry câu hỏi AI
      }
    );

    const reply = response.reply || response.message;
    if (!reply) {
      throw new Error(response.error || 'Không nhận được phản hồi từ AI');
    }

    return {
      success: true,
      reply,
    };
  } catch (err: any) {
    logger.warn('Lỗi khi gọi AI Chat:', err);

    let friendly = 'Không thể kết nối đến máy chủ AI lúc này. Vui lòng thử lại sau.';
    if (err instanceof ApiRequestError) {
      if (err.isNetworkError) {
        friendly = 'Chức năng AI cần kết nối Internet.';
      } else if (err.isTimeout) {
        friendly = 'Hết thời gian chờ phản hồi từ mô hình AI.';
      } else if (err.status === 404) {
        friendly = 'Máy chủ AI chưa được cấu hình trên hệ thống này.';
      }
    }

    return {
      success: false,
      error: friendly,
    };
  }
}
