/**
 * Quản lý bộ nhớ đệm ngoại tuyến (Offline Cache Manager)
 * Đảm bảo kiến trúc Offline-First vững chắc cho APK và Web:
 * - Đọc cache ngay lập tức khi mở app
 * - Quản lý TTL (Time-To-Live) độc lập cho từng loại dữ liệu
 * - Phân biệt rõ ràng giữa "Cache còn mới", "Cache đã cũ (Stale)" và "Chưa có cache"
 * - Không bao giờ cập nhật timestamp giả vào dữ liệu cũ
 * - Tự động di chuyển schema an toàn với Versioning
 */

import { logger } from '../utils/logger';

export const CURRENT_CACHE_VERSION = 2;

// Định mức thời gian hiệu lực (TTL) theo chuẩn khoa học khí tượng
export const CACHE_TTL = {
  WEATHER_CURRENT: 20 * 60 * 1000, // 20 phút
  WEATHER_RANGE: 90 * 60 * 1000, // 90 phút (1.5 giờ)
  AIR_QUALITY: 45 * 60 * 1000, // 45 phút
  NOTIFICATIONS: 2 * 60 * 60 * 1000, // 2 giờ
  USER_LOCATION: 24 * 60 * 60 * 1000, // 24 giờ
  ADMIN_UNITS: 7 * 24 * 60 * 60 * 1000, // 7 ngày
};

export interface CacheEnvelope<T> {
  version: number;
  key: string;
  savedAt: string; // ISO 8601
  timestamp: number; // Date.now()
  ttlMs: number;
  source: string;
  dataType: 'forecast_model' | 'observation' | 'simulation' | 'regional_static';
  data: T;
}

export interface CacheReadResult<T> {
  data: T;
  isCached: true;
  isFresh: boolean;
  savedAt: string;
  timestamp: number;
  formattedTime: string;
  source: string;
  dataType: 'forecast_model' | 'observation' | 'simulation' | 'regional_static';
}

class CacheManager {
  private prefix = 'eco_v2_';

  /**
   * Định dạng thời gian theo chuẩn tiếng Việt thân thiện
   */
  public formatTime(timestampOrIso: number | string): string {
    const d = typeof timestampOrIso === 'number' ? new Date(timestampOrIso) : new Date(timestampOrIso);
    if (isNaN(d.getTime())) return 'Không rõ thời gian';
    const hours = d.getHours().toString().padStart(2, '0');
    const mins = d.getMinutes().toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    return `${hours}:${mins} ngày ${day}/${month}`;
  }

  /**
   * Lưu dữ liệu vào Cache
   */
  public set<T>(
    key: string,
    data: T,
    options: {
      ttlMs?: number;
      source?: string;
      dataType?: 'forecast_model' | 'observation' | 'simulation' | 'regional_static';
    } = {}
  ): boolean {
    if (typeof window === 'undefined' || !window.localStorage) return false;

    const fullKey = this.prefix + key;
    const now = Date.now();
    const envelope: CacheEnvelope<T> = {
      version: CURRENT_CACHE_VERSION,
      key,
      savedAt: new Date(now).toISOString(),
      timestamp: now,
      ttlMs: options.ttlMs ?? CACHE_TTL.WEATHER_CURRENT,
      source: options.source || 'Bộ nhớ đệm EcoApp',
      dataType: options.dataType || 'forecast_model',
      data,
    };

    try {
      localStorage.setItem(fullKey, JSON.stringify(envelope));
      logger.cache('SET', key, { ttlMs: envelope.ttlMs, source: envelope.source });
      return true;
    } catch (err: any) {
      // Xử lý tràn dung lượng quota localStorage (dọn dẹp cache cũ)
      logger.warn(`Lỗi ghi localStorage cho khóa ${key}, tiến hành dọn dẹp cache:`, err);
      this.purgeExpired();
      try {
        localStorage.setItem(fullKey, JSON.stringify(envelope));
        return true;
      } catch (retryErr) {
        logger.error(`Không thể lưu cache sau khi dọn dẹp:`, retryErr);
        return false;
      }
    }
  }

  /**
   * Đọc dữ liệu từ Cache
   * Trả về dữ liệu kèm theo trạng thái isFresh (còn mới) hay đã cũ (stale)
   */
  public get<T>(key: string): CacheReadResult<T> | null {
    if (typeof window === 'undefined' || !window.localStorage) return null;

    const fullKey = this.prefix + key;
    try {
      const raw = localStorage.getItem(fullKey);
      if (!raw) {
        logger.cache('MISS', key);
        return null;
      }

      const envelope: CacheEnvelope<T> = JSON.parse(raw);
      // Kiểm tra version
      if (!envelope || envelope.version !== CURRENT_CACHE_VERSION || !envelope.data) {
        logger.cache('EXPIRED', key, 'Sai phiên bản cache, loại bỏ');
        localStorage.removeItem(fullKey);
        return null;
      }

      const now = Date.now();
      const ageMs = now - (envelope.timestamp || 0);
      const isFresh = ageMs < envelope.ttlMs;

      logger.cache(isFresh ? 'HIT' : 'STALE', key, {
        ageMins: Math.round(ageMs / 60000),
        isFresh,
      });

      return {
        data: envelope.data,
        isCached: true,
        isFresh,
        savedAt: envelope.savedAt,
        timestamp: envelope.timestamp,
        formattedTime: this.formatTime(envelope.timestamp),
        source: envelope.source,
        dataType: envelope.dataType,
      };
    } catch (err) {
      logger.warn(`Lỗi phân tích cú pháp cache cho khóa ${key}:`, err);
      try {
        localStorage.removeItem(fullKey);
      } catch (_e) {
        // ignore
      }
      return null;
    }
  }

  /**
   * Xóa một khóa cụ thể
   */
  public remove(key: string): void {
    if (typeof window === 'undefined' || !window.localStorage) return;
    try {
      localStorage.removeItem(this.prefix + key);
    } catch (_e) {
      // ignore
    }
  }

  /**
   * Tự động dọn dẹp các mục cache đã hết hạn để giải phóng bộ nhớ
   */
  public purgeExpired(): void {
    if (typeof window === 'undefined' || !window.localStorage) return;
    try {
      const now = Date.now();
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(this.prefix)) {
          try {
            const raw = localStorage.getItem(k);
            if (raw) {
              const env: CacheEnvelope<any> = JSON.parse(raw);
              if (env.version !== CURRENT_CACHE_VERSION || (env.timestamp && now - env.timestamp > env.ttlMs * 2)) {
                keysToRemove.push(k);
              }
            }
          } catch (_e) {
            keysToRemove.push(k);
          }
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
      if (keysToRemove.length > 0) {
        logger.info(`Đã dọn dẹp ${keysToRemove.length} mục cache cũ/hỏng.`);
      }
    } catch (e) {
      logger.warn('Lỗi trong quá trình dọn dẹp cache:', e);
    }
  }
}

export const cacheManager = new CacheManager();
