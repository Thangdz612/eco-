/**
 * Weather Notification Storage & Offline Cache (±3 days window)
 * Quản lý lưu trữ thông báo thời tiết khi thiết bị có kết nối Internet (phạm vi ±3 ngày)
 */

export interface WeatherNotificationItem {
  id: string;
  dateOffset: number; // -3, -2, -1, 0, 1, 2, 3
  dateLabel: string; // e.g. "Hôm nay (05/09)", "Ngày mai (06/09)", "3 ngày trước (02/09)"
  dateFormatted: string; // "DD/MM/YYYY"
  timestamp: number;
  districtId: string;
  districtName: string;
  type: 'warning' | 'alert' | 'info' | 'forecast' | 'tide' | 'uv' | 'rain';
  title: string;
  desc: string;
  severity: 'high' | 'medium' | 'low';
  isCached: boolean;
  cachedAt: string;
  source: 'internet_sync' | 'system_alert' | 'sensor_reading';
}

export interface WeatherStorageConfig {
  autoSyncWhenOnline: boolean;
  rangeDays: number; // Cố định 3 (±3 ngày)
  lastSyncTimestamp: number | null;
  lastSyncFormatted: string | null;
  totalCachedCount: number;
  cacheSizeBytes: number;
  isOnline: boolean;
}

const STORAGE_KEY_NOTIFICATIONS = 'eco_weather_notifications_cache_v2';
const STORAGE_KEY_CONFIG = 'eco_weather_storage_config_v2';

// Helper: Format DD/MM/YYYY
function formatDate(date: Date): string {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

// Helper: Format HH:mm - DD/MM/YYYY
function formatDateTime(date: Date): string {
  const hours = String(date.getHours()).padStart(2, '0');
  const mins = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${mins} ngày ${formatDate(date)}`;
}

// Generate human-friendly label for offset
function getOffsetLabel(offset: number, date: Date): string {
  const dateStr = formatDate(date);
  if (offset === 0) return `Hôm nay (${dateStr})`;
  if (offset === -1) return `Hôm qua (${dateStr})`;
  if (offset === -2) return `2 ngày trước (${dateStr})`;
  if (offset === -3) return `3 ngày trước (${dateStr})`;
  if (offset === 1) return `Ngày mai (${dateStr})`;
  if (offset === 2) return `2 ngày tới (${dateStr})`;
  if (offset === 3) return `3 ngày tới (${dateStr})`;
  return `${dateStr}`;
}

/**
 * Tạo dữ liệu thông báo thời tiết chuẩn cho phạm vi ±3 ngày
 */
export function generateRangeNotifications(
  districtId: string = 'quan-1',
  districtName: string = 'Quận 1'
): WeatherNotificationItem[] {
  const now = new Date();
  const cachedTimeStr = formatDateTime(now);
  const items: WeatherNotificationItem[] = [];

  // Mảng các ngày từ -3 đến +3
  const offsets = [-3, -2, -1, 0, 1, 2, 3];

  offsets.forEach((offset) => {
    const targetDate = new Date(now);
    targetDate.setDate(now.getDate() + offset);
    const dateFormatted = formatDate(targetDate);
    const dateLabel = getOffsetLabel(offset, targetDate);

    // Căn cứ vào từng ngày để xây dựng thông báo thời tiết thực tế
    switch (offset) {
      case -3:
        items.push({
          id: `w-notif-d-minus-3-1`,
          dateOffset: -3,
          dateLabel,
          dateFormatted,
          timestamp: targetDate.getTime() + 9 * 3600000,
          districtId,
          districtName,
          type: 'rain',
          severity: 'medium',
          title: `[Lịch sử -3 ngày] Mưa rào diện rộng & hạ nhiệt vi khí hậu`,
          desc: `Ghi nhận lượng mưa đo được 28.5mm, nhiệt độ không khí giảm nhanh từ 35.2°C xuống 27.1°C, chất lượng không khí AQI cải thiện đáng kể.`,
          isCached: true,
          cachedAt: cachedTimeStr,
          source: 'internet_sync',
        });
        items.push({
          id: `w-notif-d-minus-3-2`,
          dateOffset: -3,
          dateLabel,
          dateFormatted,
          timestamp: targetDate.getTime() + 17 * 3600000,
          districtId,
          districtName,
          type: 'tide',
          severity: 'low',
          title: `[Lịch sử -3 ngày] Triều cường chân triều đạt 1.35m`,
          desc: `Mực nước đỉnh triều đo tại trạm hải văn Phú An đạt 1.35m (dưới báo động 1), giao thông thủy bộ các trục ven sông thông suốt bình thường.`,
          isCached: true,
          cachedAt: cachedTimeStr,
          source: 'internet_sync',
        });
        break;

      case -2:
        items.push({
          id: `w-notif-d-minus-2-1`,
          dateOffset: -2,
          dateLabel,
          dateFormatted,
          timestamp: targetDate.getTime() + 11 * 3600000,
          districtId,
          districtName,
          type: 'uv',
          severity: 'high',
          title: `[Lịch sử -2 ngày] Cảnh báo bức xạ UV cực đại 9.4`,
          desc: `Chỉ số bức xạ cực tím UV vượt ngưỡng 9.4 trong khung giờ 11h30 - 13h30. Độ ẩm tương đối 58%, chỉ số ánh sáng đo được 72,000 Lux.`,
          isCached: true,
          cachedAt: cachedTimeStr,
          source: 'internet_sync',
        });
        items.push({
          id: `w-notif-d-minus-2-2`,
          dateOffset: -2,
          dateLabel,
          dateFormatted,
          timestamp: targetDate.getTime() + 19 * 3600000,
          districtId,
          districtName,
          type: 'info',
          severity: 'low',
          title: `[Lịch sử -2 ngày] Gió mùa Tây Nam hoạt động ổn định cấp 2 - 3`,
          desc: `Tốc độ gió trung bình 12 - 18 km/h giúp khuếch tán khói bụi đô thị, độ ẩm ban đêm đạt 82%.`,
          isCached: true,
          cachedAt: cachedTimeStr,
          source: 'internet_sync',
        });
        break;

      case -1:
        items.push({
          id: `w-notif-d-minus-1-1`,
          dateOffset: -1,
          dateLabel,
          dateFormatted,
          timestamp: targetDate.getTime() + 16 * 3600000,
          districtId,
          districtName,
          type: 'warning',
          severity: 'high',
          title: `[Lịch sử -1 ngày (Hôm qua)] Cảnh báo dông lốc chuyển mùa`,
          desc: `Mây đối lưu nhiệt phát triển gây mưa rào ngắn kèm gió giật cấp 4 tại khu vực trung tâm và các phường lân cận.`,
          isCached: true,
          cachedAt: cachedTimeStr,
          source: 'internet_sync',
        });
        items.push({
          id: `w-notif-d-minus-1-2`,
          dateOffset: -1,
          dateLabel,
          dateFormatted,
          timestamp: targetDate.getTime() + 18 * 3600000,
          districtId,
          districtName,
          type: 'tide',
          severity: 'medium',
          title: `[Lịch sử -1 ngày (Hôm qua)] Triều cường đạt đỉnh 1.48m`,
          desc: `Mực nước triều dâng 1.48m vào lúc 17h45, ghi nhận ngập cục bộ một số đoạn đường trũng thấp mép bờ sông.`,
          isCached: true,
          cachedAt: cachedTimeStr,
          source: 'internet_sync',
        });
        break;

      case 0:
        items.push({
          id: `w-notif-d-0-1`,
          dateOffset: 0,
          dateLabel,
          dateFormatted,
          timestamp: targetDate.getTime() + 8 * 3600000,
          districtId,
          districtName,
          type: 'uv',
          severity: 'high',
          title: `[Hôm nay] Cảnh báo chỉ số UV cực đại 10.5 (Mức rất nguy hại)`,
          desc: `Khuyến nghị người dân và du khách hạn chế tiếp xúc trực tiếp với ánh nắng từ 10:30 đến 14:00. Bôi kem chống nắng và sử dụng kính bảo vệ mắt.`,
          isCached: true,
          cachedAt: cachedTimeStr,
          source: 'internet_sync',
        });
        items.push({
          id: `w-notif-d-0-2`,
          dateOffset: 0,
          dateLabel,
          dateFormatted,
          timestamp: targetDate.getTime() + 15 * 3600000,
          districtId,
          districtName,
          type: 'tide',
          severity: 'high',
          title: `[Hôm nay] Cảnh báo triều cường vượt mức 1.55m (Báo động 2)`,
          desc: `Đỉnh triều dự kiến xuất hiện lúc 17:30 - 18:30 tại trạm Phú An và Nhà Bè. Nguy cơ ngập úng các tuyến đường trần não, Nguyễn Hữu Cảnh và bến Vân Đồn.`,
          isCached: true,
          cachedAt: cachedTimeStr,
          source: 'internet_sync',
        });
        items.push({
          id: `w-notif-d-0-3`,
          dateOffset: 0,
          dateLabel,
          dateFormatted,
          timestamp: targetDate.getTime() + 17 * 3600000,
          districtId,
          districtName,
          type: 'warning',
          severity: 'medium',
          title: `[Hôm nay] Bụi mịn PM2.5 tăng vào khung giờ cao điểm`,
          desc: `Chỉ số chất lượng không khí AQI dao động 110 - 128 (Không lành mạnh cho nhóm nhạy cảm). Nên sử dụng khẩu trang kháng bụi khi tham gia giao thông.`,
          isCached: true,
          cachedAt: cachedTimeStr,
          source: 'internet_sync',
        });
        break;

      case 1:
        items.push({
          id: `w-notif-d-plus-1-1`,
          dateOffset: 1,
          dateLabel,
          dateFormatted,
          timestamp: targetDate.getTime() + 7 * 3600000,
          districtId,
          districtName,
          type: 'forecast',
          severity: 'medium',
          title: `[Dự báo +1 ngày (Ngày mai)] Mây thay đổi, nắng gián đoạn, chiều tối có mưa rào`,
          desc: `Dự báo nhiệt độ ngày mai từ 26°C đến 34°C. Xác suất mưa 65%, tập trung từ 16h00 đến 19h00 kèm khả năng có dông sét cục bộ.`,
          isCached: true,
          cachedAt: cachedTimeStr,
          source: 'internet_sync',
        });
        items.push({
          id: `w-notif-d-plus-1-2`,
          dateOffset: 1,
          dateLabel,
          dateFormatted,
          timestamp: targetDate.getTime() + 16 * 3600000,
          districtId,
          districtName,
          type: 'tide',
          severity: 'medium',
          title: `[Dự báo +1 ngày (Ngày mai)] Đỉnh triều chiều mai đạt 1.51m`,
          desc: `Đỉnh triều duy trì ở mức cao vào khoảng 18h15. Chủ phương tiện lưu thông qua các tuyến ven kênh rạch cần chủ động chọn lộ trình thay thế.`,
          isCached: true,
          cachedAt: cachedTimeStr,
          source: 'internet_sync',
        });
        break;

      case 2:
        items.push({
          id: `w-notif-d-plus-2-1`,
          dateOffset: 2,
          dateLabel,
          dateFormatted,
          timestamp: targetDate.getTime() + 8 * 3600000,
          districtId,
          districtName,
          type: 'forecast',
          severity: 'low',
          title: `[Dự báo +2 ngày] Xu hướng nhiệt độ tăng nhẹ 34.5°C, giảm mưa`,
          desc: `Áp cao cận nhiệt đới khống chế, nắng ráo kéo dài ban ngày. Khả năng mưa giảm xuống dưới 30%, gió nhẹ 8 - 14 km/h.`,
          isCached: true,
          cachedAt: cachedTimeStr,
          source: 'internet_sync',
        });
        items.push({
          id: `w-notif-d-plus-2-2`,
          dateOffset: 2,
          dateLabel,
          dateFormatted,
          timestamp: targetDate.getTime() + 12 * 3600000,
          districtId,
          districtName,
          type: 'uv',
          severity: 'high',
          title: `[Dự báo +2 ngày] Chỉ số UV dự báo ở mức 9.8`,
          desc: `Thời gian bức xạ mặt trời cao điểm từ 11:00 đến 13:30. Nhiệt độ cảm nhận thực tế ngoài trời có thể đạt ngưỡng 38°C.`,
          isCached: true,
          cachedAt: cachedTimeStr,
          source: 'internet_sync',
        });
        break;

      case 3:
        items.push({
          id: `w-notif-d-plus-3-1`,
          dateOffset: 3,
          dateLabel,
          dateFormatted,
          timestamp: targetDate.getTime() + 8 * 3600000,
          districtId,
          districtName,
          type: 'forecast',
          severity: 'low',
          title: `[Dự báo +3 ngày] Thời tiết ổn định, chỉ số sinh thái đạt trạng thái tốt`,
          desc: `Dự báo ngày nắng nhẹ xen kẽ mây, nhiệt độ 25 - 33°C, độ ẩm ban ngày duy trì mức 62%. Thích hợp cho các hoạt động dã ngoại và du lịch sinh thái.`,
          isCached: true,
          cachedAt: cachedTimeStr,
          source: 'internet_sync',
        });
        items.push({
          id: `w-notif-d-plus-3-2`,
          dateOffset: 3,
          dateLabel,
          dateFormatted,
          timestamp: targetDate.getTime() + 18 * 3600000,
          districtId,
          districtName,
          type: 'tide',
          severity: 'low',
          title: `[Dự báo +3 ngày] Triều cường rút xuống dưới Báo động 1 (1.30m)`,
          desc: `Kỳ triều cường kết thúc, mực nước tại trạm Phú An và Nhà Bè rút xuống dưới 1.40m (dưới Báo động 1), không còn nguy cơ ngập úng.`,
          isCached: true,
          cachedAt: cachedTimeStr,
          source: 'internet_sync',
        });
        break;
    }
  });

  return items;
}

/**
 * Lấy cấu hình lưu trữ
 */
export function getStorageConfig(): WeatherStorageConfig {
  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
  let config: WeatherStorageConfig = {
    autoSyncWhenOnline: true,
    rangeDays: 3,
    lastSyncTimestamp: null,
    lastSyncFormatted: null,
    totalCachedCount: 0,
    cacheSizeBytes: 0,
    isOnline,
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (raw) {
      const parsed = JSON.parse(raw);
      config = { ...config, ...parsed, isOnline, rangeDays: 3 };
    }
  } catch (e) {
    // Ignore storage parse error
  }

  // Calculate actual cached count & size
  try {
    const rawData = localStorage.getItem(STORAGE_KEY_NOTIFICATIONS);
    if (rawData) {
      const parsed = JSON.parse(rawData);
      config.totalCachedCount = Array.isArray(parsed) ? parsed.length : 0;
      config.cacheSizeBytes = new Blob([rawData]).size;
    }
  } catch (e) {
    // Ignore
  }

  return config;
}

/**
 * Cập nhật cấu hình lưu trữ
 */
export function updateStorageConfig(
  updates: Partial<WeatherStorageConfig>
): WeatherStorageConfig {
  const current = getStorageConfig();
  const next = { ...current, ...updates, rangeDays: 3 };
  try {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(next));
  } catch (e) {
    // Ignore
  }
  return next;
}

/**
 * Lấy danh sách thông báo thời tiết đã lưu trữ (±3 ngày)
 */
export function getCachedWeatherNotifications(
  districtId: string = 'quan-1',
  districtName: string = 'Quận 1'
): WeatherNotificationItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_NOTIFICATIONS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    // Fall through
  }

  // Nếu chưa có trong cache, tự động khởi tạo dữ liệu mẫu ±3 ngày
  const initial = generateRangeNotifications(districtId, districtName);
  try {
    localStorage.setItem(STORAGE_KEY_NOTIFICATIONS, JSON.stringify(initial));
    const now = new Date();
    updateStorageConfig({
      lastSyncTimestamp: now.getTime(),
      lastSyncFormatted: formatDateTime(now),
      totalCachedCount: initial.length,
    });
  } catch (e) {
    // Ignore
  }
  return initial;
}

/**
 * Thực hiện đồng bộ / lưu trữ thông báo thời tiết ±3 ngày khi có kết nối Internet
 */
export async function syncWeatherNotificationsOnline(
  districtId: string = 'quan-1',
  districtName: string = 'Quận 1'
): Promise<{ success: boolean; count: number; message: string }> {
  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;

  if (!isOnline) {
    return {
      success: false,
      count: 0,
      message: 'Thiết bị đang ngoại tuyến. Vui lòng kết nối Wi-Fi hoặc 4G/5G để đồng bộ dữ liệu thời tiết mới nhất.',
    };
  }

  // Mô phỏng độ trễ mạng ngắn khi fetch dữ liệu khí tượng từ trạm
  await new Promise((resolve) => setTimeout(resolve, 600));

  const items = generateRangeNotifications(districtId, districtName);
  const now = new Date();
  const formattedTime = formatDateTime(now);

  try {
    localStorage.setItem(STORAGE_KEY_NOTIFICATIONS, JSON.stringify(items));
    const blobSize = new Blob([JSON.stringify(items)]).size;
    updateStorageConfig({
      lastSyncTimestamp: now.getTime(),
      lastSyncFormatted: formattedTime,
      totalCachedCount: items.length,
      cacheSizeBytes: blobSize,
    });

    // Phát sự kiện custom event để các component lắng nghe
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('eco-weather-notifications-synced', {
          detail: { count: items.length, timestamp: now.getTime(), formattedTime },
        })
      );
    }

    return {
      success: true,
      count: items.length,
      message: `Đã lưu trữ thành công ${items.length} thông báo thời tiết trong phạm vi ±3 ngày vào bộ nhớ máy (${(blobSize / 1024).toFixed(1)} KB).`,
    };
  } catch (e) {
    return {
      success: false,
      count: 0,
      message: 'Không thể ghi vào bộ nhớ máy: Dung lượng lưu trữ đầy hoặc bị chặn.',
    };
  }
}

/**
 * Xóa toàn bộ bộ nhớ đệm thông báo thời tiết
 */
export function clearWeatherNotificationCache(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_NOTIFICATIONS);
    updateStorageConfig({
      lastSyncTimestamp: null,
      lastSyncFormatted: null,
      totalCachedCount: 0,
      cacheSizeBytes: 0,
    });
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('eco-weather-notifications-cleared'));
    }
  } catch (e) {
    // Ignore
  }
}
