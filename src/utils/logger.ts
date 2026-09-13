/**
 * Trình ghi nhật ký ứng dụng (Logger)
 * - Development: Ghi chi tiết các sự kiện mạng, API, cache hit/miss, trạng thái kết nối
 * - Production: Tự động lọc bỏ các thông tin nhạy cảm, không ghi key, token hay dữ liệu riêng tư
 */

const isDev = Boolean((import.meta as any)?.env?.DEV ?? (typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production'));

export const logger = {
  debug: (...args: any[]) => {
    if (isDev) {
      console.log('[EcoApp:DEBUG]', ...args);
    }
  },
  info: (...args: any[]) => {
    if (isDev) {
      console.info('[EcoApp:INFO]', ...args);
    }
  },
  warn: (...args: any[]) => {
    console.warn('[EcoApp:WARN]', ...args);
  },
  error: (...args: any[]) => {
    console.error('[EcoApp:ERROR]', ...args);
  },
  api: (endpoint: string, status: number | string, detail?: any) => {
    if (isDev) {
      console.log(`[EcoApp:API] ${endpoint} -> ${status}`, detail || '');
    }
  },
  cache: (action: 'HIT' | 'MISS' | 'SET' | 'STALE' | 'EXPIRED', key: string, info?: any) => {
    if (isDev) {
      console.log(`[EcoApp:CACHE:${action}] ${key}`, info || '');
    }
  },
  network: (status: string, detail?: any) => {
    if (isDev) {
      console.log(`[EcoApp:NETWORK] ${status}`, detail || '');
    }
  },
};
