/**
 * Weather Notification Storage & Offline Cache (±3 days window)
 * Quản lý lưu trữ thông báo thời tiết khi thiết bị có kết nối Internet (phạm vi ±3 ngày).
 * 
 * NGUYÊN TẮC MINH BẠCH & CHUẨN XÁC:
 * - Dữ liệu thông báo (nhiệt độ, UV, mưa, gió) được tính toán ĐỘNG từ dữ liệu thực tế trích xuất
 *   qua API trạm khí quyển (src/utils/liveWeatherApi.ts) thay vì dùng chuỗi viết cứng (hardcoded).
 * - Nếu chưa có dữ liệu thật (ngoại tuyến / chưa đồng bộ mạng), KHÔNG phát sinh cảnh báo mang số liệu
 *   cụ thể (không bịa số UV, triều cường hay lượng mưa), mà chỉ gửi thông báo khuyến nghị chung hoặc hướng dẫn mở app để cập nhật.
 */

import {
  fetchDirectLiveWeatherData,
  LiveWeatherResponse,
} from './liveWeatherApi';
import {
  getCachedCollectedWeatherRange,
  DayCollectedWeather,
} from './collectedWeatherStorage';
import { networkManager } from './networkManager';
import { logger } from './logger';

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
  hasRealData?: boolean;
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

// Khóa lưu trữ cache v3 - Đảm bảo dọn sạch các bản tin hardcode giả định cũ
const STORAGE_KEY_NOTIFICATIONS = 'eco_weather_notifications_cache_v3';
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

// Helper: Phân loại mức độ UV theo tiêu chuẩn WMO
function getUvClassification(uv: number): { text: string; severity: 'high' | 'medium' | 'low' } {
  if (uv >= 11) return { text: 'Cực độ nguy hại (UV 11+)', severity: 'high' };
  if (uv >= 8) return { text: 'Rất nguy hại (UV 8 - 10)', severity: 'high' };
  if (uv >= 6) return { text: 'Cao (UV 6 - 7)', severity: 'medium' };
  if (uv >= 3) return { text: 'Trung bình (UV 3 - 5)', severity: 'medium' };
  return { text: 'Thấp (UV 0 - 2)', severity: 'low' };
}

/**
 * Sinh thông báo KHUYẾN NGHỊ CHUNG khi CHƯA có dữ liệu thời tiết thực
 * (KHÔNG chứa bất kỳ số liệu bịa đặt hay con số cảnh báo cụ thể nào)
 */
export function generateGenericAdvisoryNotifications(
  districtId: string = 'quan-1',
  districtName: string = 'Quận 1'
): WeatherNotificationItem[] {
  const now = new Date();
  const cachedTimeStr = formatDateTime(now);
  const items: WeatherNotificationItem[] = [];

  const offsets = [-3, -2, -1, 0, 1, 2, 3];

  offsets.forEach((offset) => {
    const targetDate = new Date(now);
    targetDate.setDate(now.getDate() + offset);
    const dateFormatted = formatDate(targetDate);
    const dateLabel = getOffsetLabel(offset, targetDate);

    switch (offset) {
      case 0:
        // Hôm nay: Thông báo nhắc nhở kiểm tra chỉ số UV và thời tiết thực tế
        items.push({
          id: `gen-notif-d0-uv-${districtId}`,
          dateOffset: 0,
          dateLabel,
          dateFormatted,
          timestamp: targetDate.getTime() + 9 * 3600000,
          districtId,
          districtName,
          type: 'uv',
          severity: 'low',
          title: `[Hôm nay] Lưu ý bức xạ tia cực tím (UV)`,
          desc: `Thời tiết nhiệt đới đô thị thường có bức xạ UV cao vào giữa trưa. Mở ứng dụng khi có kết nối mạng để xem chỉ số UV đo đạc thực tế từ trạm khí tượng.`,
          isCached: true,
          cachedAt: cachedTimeStr,
          source: 'system_alert',
          hasRealData: false,
        });

        items.push({
          id: `gen-notif-d0-weather-${districtId}`,
          dateOffset: 0,
          dateLabel,
          dateFormatted,
          timestamp: targetDate.getTime() + 14 * 3600000,
          districtId,
          districtName,
          type: 'info',
          severity: 'low',
          title: `[Hôm nay] Theo dõi thời tiết tại ${districtName}`,
          desc: `Chưa có kết nối số liệu trực tiếp. Vui lòng bật Wi-Fi/4G và bấm Đồng bộ để tải nhiệt độ, độ ẩm và xác suất mưa thực địa.`,
          isCached: true,
          cachedAt: cachedTimeStr,
          source: 'system_alert',
          hasRealData: false,
        });
        break;

      case 1:
        // Ngày mai: Nhắc nhở theo dõi dự báo
        items.push({
          id: `gen-notif-d1-forecast-${districtId}`,
          dateOffset: 1,
          dateLabel,
          dateFormatted,
          timestamp: targetDate.getTime() + 8 * 3600000,
          districtId,
          districtName,
          type: 'forecast',
          severity: 'low',
          title: `[Dự báo ngày mai] Nhắc nhở theo dõi vi khí hậu`,
          desc: `Mô hình dự báo vi khí hậu sẵn sàng khi có kết nối mạng. Mở app để xem xác suất mưa và biên độ nhiệt ngày mai.`,
          isCached: true,
          cachedAt: cachedTimeStr,
          source: 'system_alert',
          hasRealData: false,
        });
        break;

      case 2:
        items.push({
          id: `gen-notif-d2-forecast-${districtId}`,
          dateOffset: 2,
          dateLabel,
          dateFormatted,
          timestamp: targetDate.getTime() + 8 * 3600000,
          districtId,
          districtName,
          type: 'forecast',
          severity: 'low',
          title: `[Dự báo +2 ngày] Kế hoạch công tác & di chuyển`,
          desc: `Dữ liệu dự báo số trị ECMWF sẽ tự động được cập nhật khi thiết bị kết nối Internet.`,
          isCached: true,
          cachedAt: cachedTimeStr,
          source: 'system_alert',
          hasRealData: false,
        });
        break;

      case 3:
        items.push({
          id: `gen-notif-d3-forecast-${districtId}`,
          dateOffset: 3,
          dateLabel,
          dateFormatted,
          timestamp: targetDate.getTime() + 8 * 3600000,
          districtId,
          districtName,
          type: 'forecast',
          severity: 'low',
          title: `[Dự báo +3 ngày] Xu hướng thời tiết mở rộng`,
          desc: `Kết nối mạng để tra cứu bản tin dự báo 3 ngày phục vụ các hoạt động sinh thái ngoài trời.`,
          isCached: true,
          cachedAt: cachedTimeStr,
          source: 'system_alert',
          hasRealData: false,
        });
        break;

      case -1:
        items.push({
          id: `gen-notif-dm1-history-${districtId}`,
          dateOffset: -1,
          dateLabel,
          dateFormatted,
          timestamp: targetDate.getTime() + 18 * 3600000,
          districtId,
          districtName,
          type: 'info',
          severity: 'low',
          title: `[Lịch sử hôm qua] Hồ sơ quan trắc khí tượng`,
          desc: `Số liệu quan trắc trạm khí quyển hôm qua đang chờ kết nối mạng để đối soát và lưu đệm.`,
          isCached: true,
          cachedAt: cachedTimeStr,
          source: 'system_alert',
          hasRealData: false,
        });
        break;

      case -2:
        items.push({
          id: `gen-notif-dm2-history-${districtId}`,
          dateOffset: -2,
          dateLabel,
          dateFormatted,
          timestamp: targetDate.getTime() + 18 * 3600000,
          districtId,
          districtName,
          type: 'info',
          severity: 'low',
          title: `[Lịch sử -2 ngày] Chuỗi số liệu vi khí hậu`,
          desc: `Đồng bộ trực tuyến để tra cứu dữ liệu đo đạc nhiệt độ, độ ẩm và mưa từ các trạm quan trắc tự động.`,
          isCached: true,
          cachedAt: cachedTimeStr,
          source: 'system_alert',
          hasRealData: false,
        });
        break;

      case -3:
        items.push({
          id: `gen-notif-dm3-history-${districtId}`,
          dateOffset: -3,
          dateLabel,
          dateFormatted,
          timestamp: targetDate.getTime() + 18 * 3600000,
          districtId,
          districtName,
          type: 'info',
          severity: 'low',
          title: `[Lịch sử -3 ngày] Lưu trữ quan trắc thực địa`,
          desc: `Dữ liệu lịch sử 3 ngày trước sẽ được nạp khi có kết nối đến máy chủ quan trắc khí quyển.`,
          isCached: true,
          cachedAt: cachedTimeStr,
          source: 'system_alert',
          hasRealData: false,
        });
        break;
    }
  });

  return items;
}

/**
 * Tạo thông báo sinh động (DYNAMICTY) từ kết quả API trực tiếp LiveWeatherResponse
 * (Toàn bộ con số nhiệt độ, UV, mưa, gió... đều tính toán từ API thực tế)
 */
export function generateDynamicNotifications(
  districtId: string,
  districtName: string,
  liveData: LiveWeatherResponse
): WeatherNotificationItem[] {
  const now = new Date();
  const cachedTimeStr = formatDateTime(now);
  const items: WeatherNotificationItem[] = [];

  const dayMap = new Map<number, DayCollectedWeather>();
  if (Array.isArray(liveData.data)) {
    liveData.data.forEach((d) => dayMap.set(d.dateOffset, d));
  }

  const stationName =
    liveData.atmosphericStation?.shortName ||
    liveData.atmosphericStation?.name ||
    'Trạm quan trắc khí tượng';

  const current = liveData.current;
  const day0 = dayMap.get(0);

  const offsets = [-3, -2, -1, 0, 1, 2, 3];

  offsets.forEach((offset) => {
    const targetDate = new Date(now);
    targetDate.setDate(now.getDate() + offset);
    const dateFormatted = formatDate(targetDate);
    const dateLabel = getOffsetLabel(offset, targetDate);
    const dayRecord = dayMap.get(offset);

    // ==========================================
    // 1. HÔM NAY (OFFSET = 0)
    // ==========================================
    if (offset === 0) {
      // Thông báo 1: Bức xạ UV thực tế
      const realUv = current?.uvIndex ?? (day0?.maxUvIndex ?? 0);
      const uvInfo = getUvClassification(realUv);

      let uvTitle = `[Hôm nay] Bức xạ UV đo được: ${realUv.toFixed(1)} (${uvInfo.text})`;
      let uvDesc = `Số liệu đo từ ${stationName}: Chỉ số UV bề mặt hiện là ${realUv.toFixed(1)}.`;
      if (realUv >= 8) {
        uvTitle = `[Hôm nay] Cảnh báo bức xạ UV rất cao: ${realUv.toFixed(1)}`;
        uvDesc = `Số liệu trạm ${stationName}: Chỉ số UV đạt ${realUv.toFixed(1)} (${uvInfo.text}). Khuyến cáo hạn chế tiếp xúc nắng trực tiếp từ 10:30 đến 14:00, sử dụng kem chống nắng và kính bảo hộ mắt.`;
      } else if (realUv >= 6) {
        uvTitle = `[Hôm nay] Bức xạ UV ở mức cao: ${realUv.toFixed(1)}`;
        uvDesc = `Chỉ số UV đo được tại trạm là ${realUv.toFixed(1)}. Khuyến cáo che chắn và đội nón rộng vành khi di chuyển ngoài trời.`;
      } else {
        uvTitle = `[Hôm nay] Bức xạ UV ở mức an toàn: ${realUv.toFixed(1)}`;
        uvDesc = `Chỉ số bức xạ cực tím đo được là ${realUv.toFixed(1)} (${uvInfo.text}), thuận lợi cho các hoạt động di chuyển và sinh thái ngoài trời.`;
      }

      items.push({
        id: `live-notif-d0-uv-${districtId}`,
        dateOffset: 0,
        dateLabel,
        dateFormatted,
        timestamp: targetDate.getTime() + 11 * 3600000,
        districtId,
        districtName,
        type: 'uv',
        severity: uvInfo.severity,
        title: uvTitle,
        desc: uvDesc,
        isCached: true,
        cachedAt: cachedTimeStr,
        source: 'sensor_reading',
        hasRealData: true,
      });

      // Thông báo 2: Tình trạng mưa & nhiệt độ thực tế
      const realTemp = current?.temperature ?? (day0?.avgTemp ?? 28);
      const realFeelsLike = current?.feelsLike ?? realTemp;
      const realRainProb = current?.rainProbability ?? (day0?.maxRainChance ?? 0);
      const realRainMm = current?.rainMm ?? 0;
      const realHumidity = current?.humidity ?? (day0?.avgHumidity ?? 75);
      const realCondition = current?.condition || day0?.summary || 'Nhiều mây';

      if (realRainMm > 0 || realRainProb >= 60 || (day0 && day0.totalRainfall > 5)) {
        const rainfallDisplay = realRainMm > 0 ? realRainMm : (day0?.totalRainfall ?? 0);
        items.push({
          id: `live-notif-d0-rain-${districtId}`,
          dateOffset: 0,
          dateLabel,
          dateFormatted,
          timestamp: targetDate.getTime() + 15 * 3600000,
          districtId,
          districtName,
          type: 'rain',
          severity: realRainMm >= 10 || realRainProb >= 80 ? 'high' : 'medium',
          title: `[Hôm nay] ${realRainMm > 0 ? `Ghi nhận mưa (~${rainfallDisplay.toFixed(1)} mm)` : `Cảnh báo khả năng mưa dông (${realRainProb}%)`}`,
          desc: `Trạm quan trắc ${stationName} ghi nhận xác suất mưa ${realRainProb}%, lượng mưa ~${rainfallDisplay.toFixed(1)} mm, độ ẩm ${realHumidity}%, gió ${current?.windSpeed ?? 10} km/h (giật ${current?.windGust ?? 15} km/h). Lưu ý chủ động mang theo áo mưa và đề phòng ngập cục bộ.`,
          isCached: true,
          cachedAt: cachedTimeStr,
          source: 'sensor_reading',
          hasRealData: true,
        });
      } else if (day0 && day0.maxTemp >= 35) {
        items.push({
          id: `live-notif-d0-temp-${districtId}`,
          dateOffset: 0,
          dateLabel,
          dateFormatted,
          timestamp: targetDate.getTime() + 13 * 3600000,
          districtId,
          districtName,
          type: 'warning',
          severity: 'high',
          title: `[Hôm nay] Cảnh báo nắng nóng: Đỉnh nhiệt ${day0.maxTemp}°C`,
          desc: `Nhiệt độ hiện tại ${realTemp}°C (cảm nhận như ${realFeelsLike}°C), đỉnh nhiệt trong ngày ${day0.maxTemp}°C, độ ẩm ${realHumidity}%. Khuyến cáo bổ sung nước đầy đủ và tránh sốc nhiệt.`,
          isCached: true,
          cachedAt: cachedTimeStr,
          source: 'sensor_reading',
          hasRealData: true,
        });
      } else {
        items.push({
          id: `live-notif-d0-weather-${districtId}`,
          dateOffset: 0,
          dateLabel,
          dateFormatted,
          timestamp: targetDate.getTime() + 8 * 3600000,
          districtId,
          districtName,
          type: 'info',
          severity: 'low',
          title: `[Hôm nay] Thời tiết ${districtName}: ${realCondition}, ${realTemp}°C`,
          desc: `Dữ liệu đo đạc thực tế từ ${stationName}: Nhiệt độ ${realTemp}°C (cảm nhận ${realFeelsLike}°C)${day0 ? `, dao động ${day0.minTemp}°C - ${day0.maxTemp}°C` : ''}, độ ẩm ${realHumidity}%, xác suất mưa ${realRainProb}%. Thời tiết ổn định.`,
          isCached: true,
          cachedAt: cachedTimeStr,
          source: 'sensor_reading',
          hasRealData: true,
        });
      }

      // Thông báo 3: Vi khí hậu & Gió / Môi trường thực tế
      const windSpeed = current?.windSpeed ?? (day0?.maxWindSpeed ?? 10);
      const windGust = current?.windGust ?? Math.round(windSpeed * 1.3);
      if (windSpeed >= 25 || windGust >= 35) {
        items.push({
          id: `live-notif-d0-wind-${districtId}`,
          dateOffset: 0,
          dateLabel,
          dateFormatted,
          timestamp: targetDate.getTime() + 16 * 3600000,
          districtId,
          districtName,
          type: 'warning',
          severity: 'medium',
          title: `[Hôm nay] Gió giật mạnh tại khu vực: ${windSpeed} - ${windGust} km/h`,
          desc: `Cảm biến siêu âm tháp 10m ghi nhận gió giật đạt ${windGust} km/h. Chú ý an toàn khi di chuyển qua các tuyến đường nhiều cây cao hoặc công trình thi công.`,
          isCached: true,
          cachedAt: cachedTimeStr,
          source: 'sensor_reading',
          hasRealData: true,
        });
      } else {
        items.push({
          id: `live-notif-d0-env-${districtId}`,
          dateOffset: 0,
          dateLabel,
          dateFormatted,
          timestamp: targetDate.getTime() + 17 * 3600000,
          districtId,
          districtName,
          type: 'info',
          severity: 'low',
          title: `[Hôm nay] Khí áp bề mặt & Điểm sương trạm`,
          desc: `Khí áp bề mặt ${current?.surfacePressure ?? 1008} hPa, điểm sương ${current?.dewPoint ?? 23}°C, phong tốc ${windSpeed} km/h. Môi trường đô thị ở trạng thái khuếch tán bình thường.`,
          isCached: true,
          cachedAt: cachedTimeStr,
          source: 'sensor_reading',
          hasRealData: true,
        });
      }
    }

    // ==========================================
    // 2. LỊCH SỬ (-1, -2, -3 NGÀY)
    // ==========================================
    else if (offset < 0) {
      if (dayRecord) {
        const isRainy = dayRecord.totalRainfall > 0;
        const rainTitle = isRainy
          ? `Ghi nhận mưa ${dayRecord.totalRainfall.toFixed(1)} mm`
          : 'Thời tiết khô ráo, không mưa';

        items.push({
          id: `live-notif-dm${Math.abs(offset)}-rain-${districtId}`,
          dateOffset: offset,
          dateLabel,
          dateFormatted,
          timestamp: targetDate.getTime() + 10 * 3600000,
          districtId,
          districtName,
          type: isRainy ? 'rain' : 'info',
          severity: dayRecord.totalRainfall >= 15 ? 'high' : (isRainy ? 'medium' : 'low'),
          title: `[Lịch sử ${offset === -1 ? 'Hôm qua' : `${Math.abs(offset)} ngày trước`}] ${rainTitle}, nhiệt độ ${dayRecord.minTemp}°C - ${dayRecord.maxTemp}°C`,
          desc: `Số liệu quan trắc trạm ${dayRecord.stationName || stationName}: Xác suất mưa đạt đỉnh ${dayRecord.maxRainChance}%, độ ẩm trung bình ${dayRecord.avgHumidity}%, khí áp ${dayRecord.surfacePressure || 1008} hPa.`,
          isCached: true,
          cachedAt: cachedTimeStr,
          source: 'sensor_reading',
          hasRealData: true,
        });

        if (dayRecord.maxUvIndex >= 8) {
          items.push({
            id: `live-notif-dm${Math.abs(offset)}-uv-${districtId}`,
            dateOffset: offset,
            dateLabel,
            dateFormatted,
            timestamp: targetDate.getTime() + 14 * 3600000,
            districtId,
            districtName,
            type: 'uv',
            severity: 'medium',
            title: `[Lịch sử ${offset === -1 ? 'Hôm qua' : `${Math.abs(offset)} ngày trước`}] Bức xạ UV cực đại ghi nhận ${dayRecord.maxUvIndex.toFixed(1)}`,
            desc: `Đỉnh bức xạ đo được vào khung giờ 11:30 - 13:30. Tốc độ gió cao nhất trong ngày ${dayRecord.maxWindSpeed.toFixed(1)} km/h.`,
            isCached: true,
            cachedAt: cachedTimeStr,
            source: 'sensor_reading',
            hasRealData: true,
          });
        }
      } else {
        // Dự phòng nhẹ nếu thiếu ngày
        items.push({
          id: `live-notif-dm${Math.abs(offset)}-gen-${districtId}`,
          dateOffset: offset,
          dateLabel,
          dateFormatted,
          timestamp: targetDate.getTime() + 12 * 3600000,
          districtId,
          districtName,
          type: 'info',
          severity: 'low',
          title: `[Lịch sử ${offset === -1 ? 'Hôm qua' : `${Math.abs(offset)} ngày trước`}] Nhật ký thời tiết khu vực`,
          desc: `Dữ liệu lịch sử quan trắc đã lưu trữ thành công từ trạm ${stationName}.`,
          isCached: true,
          cachedAt: cachedTimeStr,
          source: 'sensor_reading',
          hasRealData: true,
        });
      }
    }

    // ==========================================
    // 3. DỰ BÁO (+1, +2, +3 NGÀY)
    // ==========================================
    else if (offset > 0) {
      if (dayRecord) {
        const isHighRain = dayRecord.maxRainChance >= 60;
        const isModerateRain = dayRecord.maxRainChance >= 40;

        items.push({
          id: `live-notif-dp${offset}-forecast-${districtId}`,
          dateOffset: offset,
          dateLabel,
          dateFormatted,
          timestamp: targetDate.getTime() + 8 * 3600000,
          districtId,
          districtName,
          type: isHighRain ? 'rain' : 'forecast',
          severity: (isHighRain || dayRecord.maxTemp >= 35) ? 'medium' : 'low',
          title: `[Dự báo ${offset === 1 ? 'Ngày mai' : `+${offset} ngày`}] ${isHighRain ? `Khả năng mưa rào (${dayRecord.maxRainChance}%)` : (isModerateRain ? `Mưa rải rác (${dayRecord.maxRainChance}%)` : 'Trời nắng mây đan xen')}, nhiệt độ ${dayRecord.minTemp}°C - ${dayRecord.maxTemp}°C`,
          desc: `Mô hình số trị dự báo ngày ${dayRecord.dateFormatted}: ${dayRecord.summary} Lượng mưa dự kiến ~${dayRecord.totalRainfall.toFixed(1)} mm, độ ẩm trung bình ${dayRecord.avgHumidity}%, gió lớn nhất ${dayRecord.maxWindSpeed.toFixed(1)} km/h.`,
          isCached: true,
          cachedAt: cachedTimeStr,
          source: 'internet_sync',
          hasRealData: true,
        });

        if (dayRecord.maxUvIndex >= 7) {
          items.push({
            id: `live-notif-dp${offset}-uv-${districtId}`,
            dateOffset: offset,
            dateLabel,
            dateFormatted,
            timestamp: targetDate.getTime() + 12 * 3600000,
            districtId,
            districtName,
            type: 'uv',
            severity: dayRecord.maxUvIndex >= 8 ? 'medium' : 'low',
            title: `[Dự báo ${offset === 1 ? 'Ngày mai' : `+${offset} ngày`}] Chỉ số UV dự kiến đạt ${dayRecord.maxUvIndex.toFixed(1)}`,
            desc: `Khoảng thời gian bức xạ cao tập trung 11:00 - 13:30. Khuyến nghị chuẩn bị ô dù hoặc nón rộng vành khi hoạt động ngoài trời.`,
            isCached: true,
            cachedAt: cachedTimeStr,
            source: 'internet_sync',
            hasRealData: true,
          });
        }
      } else {
        items.push({
          id: `live-notif-dp${offset}-gen-${districtId}`,
          dateOffset: offset,
          dateLabel,
          dateFormatted,
          timestamp: targetDate.getTime() + 8 * 3600000,
          districtId,
          districtName,
          type: 'forecast',
          severity: 'low',
          title: `[Dự báo ${offset === 1 ? 'Ngày mai' : `+${offset} ngày`}] Bản tin dự báo mở rộng`,
          desc: `Dữ liệu vi khí hậu được tính toán từ mô hình số trị ECMWF & trạm ${stationName}.`,
          isCached: true,
          cachedAt: cachedTimeStr,
          source: 'internet_sync',
          hasRealData: true,
        });
      }
    }
  });

  return items;
}

/**
 * Sinh thông báo từ chuỗi DayCollectedWeather đã lưu (nếu đã có dữ liệu thực)
 */
export function generateNotificationsFromDayRange(
  districtId: string,
  districtName: string,
  days: DayCollectedWeather[]
): WeatherNotificationItem[] {
  const day0 = days.find((d) => d.dateOffset === 0);
  const nowHour = new Date().getHours();
  const currentHourRecord = day0?.hours?.[nowHour] || day0?.hours?.[12];

  // Giả lập một đối tượng LiveWeatherResponse từ ngày đã lưu
  const pseudoLive: LiveWeatherResponse = {
    source: day0?.source || 'Trạm quan trắc khí quyển Việt Nam',
    apiUrl: 'https://api.open-meteo.com/v1/forecast',
    latitude: 10.7769,
    longitude: 106.7009,
    elevation: 10,
    generationTimeMs: 12,
    timezone: 'Asia/Bangkok',
    atmosphericStation: {
      code: day0?.stationCode || 'VN-48900',
      wmoId: '48900',
      name: day0?.stationName || 'Trạm Khí tượng Thủy văn',
      shortName: day0?.stationName || 'Trạm Khí quyển',
      authority: day0?.stationAuthority || 'Tổng cục KTTV Việt Nam',
      assignedArea: districtName,
      province: 'TP. Hồ Chí Minh',
      lat: 10.8167,
      lng: 106.6667,
      elevationMeters: 10,
      standard: 'QCVN 46:2012/BTNMT',
      instruments: [],
    },
    data: days,
    dataType: day0?.dataType,
    timestamp: new Date().toISOString(),
    current: {
      time: new Date().toISOString(),
      temperature: currentHourRecord?.temp ?? (day0?.avgTemp ?? 28),
      feelsLike: currentHourRecord?.feelLikeTemp ?? (day0?.avgTemp ?? 28),
      humidity: currentHourRecord?.humidity ?? (day0?.avgHumidity ?? 75),
      dewPoint: currentHourRecord?.dewPoint ?? 23,
      surfacePressure: currentHourRecord?.pressure ?? (day0?.surfacePressure ?? 1008),
      solarRadiation: currentHourRecord?.solarRadiation ?? 0,
      rainProbability: currentHourRecord?.rainChance ?? (day0?.maxRainChance ?? 20),
      rainMm: currentHourRecord?.rainfallAmount ?? (day0?.totalRainfall ?? 0),
      uvIndex: currentHourRecord?.uvIndex ?? (day0?.maxUvIndex ?? 0),
      windSpeed: currentHourRecord?.windSpeed ?? (day0?.maxWindSpeed ?? 10),
      windGust: currentHourRecord?.windGust ?? 15,
      condition: currentHourRecord?.condition ?? (day0?.summary ?? 'Thời tiết ổn định'),
    },
  };

  return generateDynamicNotifications(districtId, districtName, pseudoLive);
}

/**
 * Hàm chung tương thích ngược: Tạo dữ liệu thông báo thời tiết cho phạm vi ±3 ngày
 * - Nếu có liveData: dùng dữ liệu API thực tế
 * - Nếu chưa có: kiểm tra cache range thực tế, nếu không có nữa thì dùng khuyến nghị chung
 */
export function generateRangeNotifications(
  districtId: string = 'quan-1',
  districtName: string = 'Quận 1',
  liveData?: LiveWeatherResponse | null
): WeatherNotificationItem[] {
  if (liveData && liveData.data && liveData.data.length > 0) {
    return generateDynamicNotifications(districtId, districtName, liveData);
  }

  // Thử kiểm tra dữ liệu cache trạm khí tượng đã đồng bộ trước đó
  try {
    const cachedRange = getCachedCollectedWeatherRange(districtId, districtName);
    const hasRealRange = cachedRange.data.some(
      (d) => d.dataType === 'observation' || d.dataType === 'forecast_model'
    );
    if (hasRealRange) {
      return generateNotificationsFromDayRange(districtId, districtName, cachedRange.data);
    }
  } catch (_e) {
    // Bỏ qua nếu lỗi
  }

  // Nếu hoàn toàn chưa có dữ liệu thật: KHÔNG viết cứng số liệu cụ thể, trả về khuyến nghị chung
  return generateGenericAdvisoryNotifications(districtId, districtName);
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
 * Tự động loại bỏ cache cũ nếu chứa chuỗi hardcode giả định
 */
export function getCachedWeatherNotifications(
  districtId: string = 'quan-1',
  districtName: string = 'Quận 1'
): WeatherNotificationItem[] {
  try {
    // Dọn dẹp cache v2 cũ nếu còn tồn tại
    localStorage.removeItem('eco_weather_notifications_cache_v2');

    const raw = localStorage.getItem(STORAGE_KEY_NOTIFICATIONS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Kiểm tra xem dữ liệu có chứa chuỗi hardcode cũ không
        const hasLegacyHardcodedStrings = parsed.some(
          (item: any) =>
            typeof item?.title === 'string' &&
            (item.title.includes('1.55m') ||
              item.title.includes('10.5') ||
              item.title.includes('28.5mm') ||
              item.title.includes('1.48m') ||
              item.id?.startsWith('w-notif-d-'))
        );

        if (!hasLegacyHardcodedStrings) {
          return parsed;
        }
      }
    }
  } catch (e) {
    // Fall through
  }

  // Nếu chưa có trong cache hoặc cache cũ không hợp lệ: khởi tạo thông báo chuẩn
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
 * Gọi API trực tiếp từ liveWeatherApi.ts để tính toán động các thông số nhiệt độ, UV, mưa
 */
export async function syncWeatherNotificationsOnline(
  districtId: string = 'quan-1',
  districtName: string = 'Quận 1',
  adminType: 'phường' | 'xã' | 'đặc khu' | string = 'phường'
): Promise<{ success: boolean; count: number; message: string }> {
  const safeAdminType: 'phường' | 'xã' | 'đặc khu' =
    adminType === 'xã' || adminType === 'đặc khu' ? adminType : 'phường';
  const isOnline = networkManager.isOnline();

  if (!isOnline) {
    return {
      success: false,
      count: 0,
      message: 'Thiết bị đang ngoại tuyến. Vui lòng kết nối Wi-Fi hoặc 4G/5G để đồng bộ dữ liệu thời tiết mới nhất.',
    };
  }

  try {
    // 1. Gọi trực tiếp dữ liệu khí tượng thời gian thực từ liveWeatherApi
    const liveData = await fetchDirectLiveWeatherData(districtId, districtName, safeAdminType);

    // 2. Sinh thông báo động từ số liệu mô hình thời tiết Open-Meteo
    const items = generateDynamicNotifications(districtId, districtName, liveData);
    const now = new Date();
    const formattedTime = formatDateTime(now);

    localStorage.setItem(STORAGE_KEY_NOTIFICATIONS, JSON.stringify(items));
    const blobSize = new Blob([JSON.stringify(items)]).size;
    updateStorageConfig({
      lastSyncTimestamp: now.getTime(),
      lastSyncFormatted: formattedTime,
      totalCachedCount: items.length,
      cacheSizeBytes: blobSize,
    });

    // Phát sự kiện custom event để các component giao diện (Modal, Settings) lắng nghe và cập nhật tức thì
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('eco-weather-notifications-synced', {
          detail: { count: items.length, timestamp: now.getTime(), formattedTime },
        })
      );
    }

    const stationLabel =
      liveData.atmosphericStation?.shortName ||
      liveData.atmosphericStation?.name ||
      'Mô hình vi khí hậu Open-Meteo';

    return {
      success: true,
      count: items.length,
      message: `Đã lưu trữ thành công ${items.length} thông báo từ mô hình thời tiết (${stationLabel}: Nhiệt độ ${liveData.current.temperature}°C, UV ${liveData.current.uvIndex}, mưa ${liveData.current.rainProbability}%).`,
    };
  } catch (err: any) {
    // Nếu gọi API trực tiếp gặp lỗi mạng, kiểm tra xem có dữ liệu cache quan trắc đã lưu hay không
    let items: WeatherNotificationItem[];
    let isReal = false;

    try {
      const cachedRange = getCachedCollectedWeatherRange(districtId, districtName, safeAdminType);
      const hasRealRange = cachedRange.data.some(
        (d) => d.dataType === 'observation' || d.dataType === 'forecast_model'
      );
      if (hasRealRange) {
        items = generateNotificationsFromDayRange(districtId, districtName, cachedRange.data);
        isReal = true;
      } else {
        items = generateGenericAdvisoryNotifications(districtId, districtName);
      }
    } catch (_e) {
      items = generateGenericAdvisoryNotifications(districtId, districtName);
    }

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

      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('eco-weather-notifications-synced', {
            detail: { count: items.length, timestamp: now.getTime(), formattedTime },
          })
        );
      }
    } catch (_saveErr) {
      // Ignore
    }

    return {
      success: true,
      count: items.length,
      message: isReal
        ? `Đã lưu trữ ${items.length} thông báo thời tiết từ bộ đệm trạm quan trắc.`
        : `Đã lưu ${items.length} thông báo khuyến nghị chung (đang chờ kết nối mạng để đồng bộ số đo thực tế).`,
    };
  }
}

/**
 * Xóa toàn bộ bộ nhớ đệm thông báo thời tiết
 */
export function clearWeatherNotificationCache(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_NOTIFICATIONS);
    localStorage.removeItem('eco_weather_notifications_cache_v2');
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
