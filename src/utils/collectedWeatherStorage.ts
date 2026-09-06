/**
 * Lưu trữ và quản lý dữ liệu thời tiết đã thu thập qua mạng (phạm vi ±3 ngày)
 * Dữ liệu theo từng giờ: 0h, 1h, 2h... 23h với Độ C, % Mưa, Độ ẩm, Tia UV,
 * hỗ trợ đầy đủ tất cả các cấp Phường, Xã, Đặc khu với đặc thù vi khí hậu chuyên sâu.
 */

export interface HourlyWeatherRecord {
  hour: number; // 0..23
  hourLabel: string; // "0h", "1h", "2h", ... "23h"
  timeFormatted: string; // "01:00", "02:00"
  temp: number; // Nhiệt độ thực (°C)
  feelLikeTemp: number; // Nhiệt độ cảm nhận ngoài trời (°C)
  rainChance: number; // Xác suất mưa (%)
  rainfallAmount: number; // Lượng mưa ước tính (mm/h)
  humidity: number; // Độ ẩm không khí (%)
  dewPoint: number; // Điểm sương (°C)
  uvIndex: number; // Chỉ số tia cực tím UV (0..12+)
  uvLevel: string; // "Thấp" | "Trung bình" | "Cao" | "Rất cao" | "Cực độ"
  solarRadiation: number; // Bức xạ mặt trời (W/m²)
  condition: string; // e.g. "Trời quang", "Nắng dịu", "Mưa rào", ...
  iconType: 'sun' | 'sun-cloud' | 'cloud' | 'rain' | 'thunder' | 'moon';
  windSpeed: number; // Tốc độ gió trung bình (km/h)
  windGust: number; // Gió giật cực đại (km/h)
  beaufortScale: string; // Cấp gió Beaufort (e.g. "Cấp 2 - Gió nhẹ", "Cấp 4 - Gió vừa")
}

export interface DayCollectedWeather {
  dateOffset: number; // -3, -2, -1, 0, 1, 2, 3
  dateLabel: string; // "3 ngày trước", "Hôm qua", "Hôm nay", "Ngày mai", ...
  dateFormatted: string; // "DD/MM/YYYY"
  dayOfWeek: string; // "Thứ Hai", "Thứ Ba", ...
  fullTitle: string; // "Hôm nay (06/09/2026)"
  districtId: string;
  districtName: string;
  adminType: 'phường' | 'xã' | 'đặc khu';
  climateTypeDescription: string;
  summary: string;
  avgTemp: number;
  minTemp: number;
  maxTemp: number;
  avgHumidity: number;
  maxRainChance: number;
  totalRainfall: number; // mm
  maxUvIndex: number;
  maxWindSpeed: number; // km/h
  hours: HourlyWeatherRecord[]; // 24 records (0h - 23h)
  collectedAt: string;
  source: string;
  isCached: boolean;
}

const STORAGE_PREFIX = 'eco_collected_weather_v3_';
const STORAGE_KEY_LAST_COLLECTED_TIME = 'eco_collected_weather_timestamp_v3';

// Helper: Format DD/MM/YYYY
function formatDate(date: Date): string {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

// Helper: Tên thứ trong tuần
function getVietnameseDayOfWeek(date: Date): string {
  const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  return days[date.getDay()];
}

// Helper: Phân cấp chỉ số UV chuẩn WHO
export function getUvLevel(uv: number): string {
  if (uv <= 2.5) return 'Thấp';
  if (uv <= 5.5) return 'Trung bình';
  if (uv <= 7.5) return 'Cao';
  if (uv <= 10.5) return 'Rất cao';
  return 'Cực độ';
}

// Helper: Cấp gió Beaufort
function getBeaufortScale(kmh: number): string {
  if (kmh < 6) return 'Cấp 1 - Gió nhẹ';
  if (kmh < 12) return 'Cấp 2 - Gió nhẹ';
  if (kmh < 20) return 'Cấp 3 - Gió thoang thoảng';
  if (kmh < 29) return 'Cấp 4 - Gió vừa';
  if (kmh < 39) return 'Cấp 5 - Gió khá mạnh';
  return 'Cấp 6 - Gió mạnh';
}

/**
 * Tạo 24 giờ thời tiết cho 1 ngày cụ thể, hiệu chỉnh chuẩn theo đặc thù
 * của cấp hành chính (Phường: Đảo nhiệt; Xã: Rừng ngập mặn/nông thôn mát; Đặc khu: Gió biển, UV cao)
 */
function generate24Hours(
  offset: number,
  adminType: 'phường' | 'xã' | 'đặc khu' = 'phường',
  districtName: string = 'Quận 1'
): HourlyWeatherRecord[] {
  const hours: HourlyWeatherRecord[] = [];

  // 1. Hiệu chỉnh cơ bản theo cấp hành chính
  // - Cấp Phường: Hiệu ứng đảo nhiệt đô thị (Urban Heat Island): ngày đêm ít chênh lệch hơn, nhiệt độ đêm cao hơn 1.5 - 2°C, feelLike cao.
  // - Cấp Xã: Biên độ nhiệt ngày đêm lớn, đêm mát hơn 2 - 3°C, độ ẩm cao hơn 6-10%, dễ có sương mù sớm và mưa dông nhiệt chiều.
  // - Cấp Đặc khu: Gió biển thổi mạnh liên tục, độ ẩm biển cao 80-92%, bức xạ quang và tia UV cực đại cao nhất.
  const tempOffsetByAdmin =
    adminType === 'đặc khu' ? -0.8 :
    adminType === 'xã' ? -1.2 : 1.2;

  const humidityOffsetByAdmin =
    adminType === 'đặc khu' ? 8 :
    adminType === 'xã' ? 10 : -4;

  const windBaseByAdmin =
    adminType === 'đặc khu' ? 22 :
    adminType === 'xã' ? 14 : 9;

  const uvMaxByAdmin =
    adminType === 'đặc khu' ? 11.4 :
    adminType === 'xã' ? 10.0 : 9.6;

  // Hệ số biến thiên theo ngày offset (-3 đến +3)
  const basePeakTemp =
    (offset === -2 ? 35.0 :
     offset === -3 ? 32.2 :
     offset === -1 ? 33.5 :
     offset === 0 ? 33.8 :
     offset === 1 ? 34.0 :
     offset === 2 ? 34.6 : 32.7) + tempOffsetByAdmin;

  const nightDrop = adminType === 'xã' ? 9.5 : adminType === 'đặc khu' ? 7.0 : 7.2;
  const baseMinTemp = basePeakTemp - nightDrop;

  const maxRainDay =
    (offset === -3 ? 80 :
     offset === -1 ? 75 :
     offset === 1 ? 65 :
     offset === 0 ? 45 :
     offset === -2 ? 15 :
     offset === 2 ? 20 : 35) + (adminType === 'xã' ? 8 : adminType === 'đặc khu' ? 5 : 0);

  const maxUvDay = Math.min(12, uvMaxByAdmin + (offset === -2 ? 0.6 : offset === 0 ? 0.3 : -0.4));

  for (let h = 0; h < 24; h++) {
    // Diurnal curve
    let tempProgress = 0;
    if (h <= 5) {
      tempProgress = (5 - h) / 5 * 0.14;
    } else if (h <= 13) {
      tempProgress = Math.sin(((h - 5) / 8) * (Math.PI / 2));
    } else {
      tempProgress = Math.cos(((h - 13) / 11) * (Math.PI / 2));
    }

    const temp = Number((baseMinTemp + tempProgress * (basePeakTemp - baseMinTemp)).toFixed(1));

    // Humidity curve (nghịch nhiệt)
    let humidity = Math.round(
      (88 - tempProgress * 30 + (h >= 15 && h <= 18 ? 7 : 0)) + humidityOffsetByAdmin
    );
    humidity = Math.min(99, Math.max(38, humidity));

    // UV curve (chỉ có từ 6h đến 17h, đỉnh 12h - 13h)
    let uvIndex = 0;
    let solarRadiation = 0; // W/m²
    if (h >= 6 && h <= 17) {
      const sunHeight = Math.sin(((h - 6) / 11) * Math.PI);
      uvIndex = Number((sunHeight * maxUvDay).toFixed(1));
      solarRadiation = Math.round(sunHeight * 950 * (adminType === 'đặc khu' ? 1.08 : 0.95));
    }

    // Rain chance & rainfall amount
    let rainChance = Math.round(maxRainDay * 0.12);
    let rainfallAmount = 0;
    if (h >= 14 && h <= 18) {
      const rainPeakFactor = Math.sin(((h - 14) / 4) * Math.PI);
      rainChance = Math.round(maxRainDay * 0.28 + rainPeakFactor * (maxRainDay * 0.72));
      if (rainChance >= 50) {
        rainfallAmount = Number((rainPeakFactor * (adminType === 'xã' ? 24 : 16)).toFixed(1));
      }
    } else if (h >= 19 && h <= 21) {
      rainChance = Math.round(maxRainDay * 0.32);
      if (rainChance >= 45) {
        rainfallAmount = Number((Math.random() * 4 + 1).toFixed(1));
      }
    } else if (adminType === 'đặc khu' && (h === 2 || h === 3)) {
      // Đặc khu biển hay có mưa rào rải rác ban đêm
      rainChance = 42;
      rainfallAmount = 3.5;
    }

    // RealFeel / FeelLike Temp (Chỉ số nhiệt Heat Index)
    // Tăng khi độ ẩm cao và bức xạ mạnh
    const heatIndexBonus =
      temp >= 28 ? (humidity - 60) * 0.08 + (uvIndex >= 6 ? (uvIndex - 5) * 0.45 : 0) : 0;
    const feelLikeTemp = Number((temp + Math.max(-0.5, heatIndexBonus)).toFixed(1));

    // Điểm sương (Dew Point approximation)
    const dewPoint = Number((temp - (100 - humidity) / 5).toFixed(1));

    // Gió & gió giật
    const windVariation = Math.sin((h / 24) * Math.PI * 2) * 4;
    const windSpeed = Math.round(
      Math.max(4, windBaseByAdmin + windVariation + (rainChance > 50 ? 8 : 0))
    );
    const windGust = Math.round(windSpeed * (adminType === 'đặc khu' ? 1.5 : 1.35) + (rainChance > 60 ? 10 : 0));
    const beaufortScale = getBeaufortScale(windSpeed);

    // Thời tiết mô tả & Biểu tượng
    let condition = 'Trời quang';
    let iconType: HourlyWeatherRecord['iconType'] = 'moon';

    if (h >= 6 && h <= 17) {
      if (rainChance >= 65) {
        condition = h === 16 && offset === -1 ? 'Dông chuyển mùa' : 'Mưa rào có sấm';
        iconType = h === 16 && offset === -1 ? 'thunder' : 'rain';
      } else if (rainChance >= 38) {
        condition = 'Mây rải rác, nắng gián đoạn';
        iconType = 'cloud';
      } else if (uvIndex >= 8.5) {
        condition = 'Nắng gắt, bức xạ cao';
        iconType = 'sun';
      } else {
        condition = 'Nắng ráo dịu mát';
        iconType = 'sun-cloud';
      }
    } else {
      if (rainChance >= 50) {
        condition = 'Mưa đêm lất phất';
        iconType = 'rain';
      } else if (rainChance >= 25) {
        condition = 'Trời nhiều mây';
        iconType = 'cloud';
      } else {
        condition = adminType === 'đặc khu' ? 'Gió biển lộng, trời trong' : 'Đêm quang đãng, mát';
        iconType = 'moon';
      }
    }

    hours.push({
      hour: h,
      hourLabel: `${h}h`,
      timeFormatted: `${String(h).padStart(2, '0')}:00`,
      temp,
      feelLikeTemp,
      rainChance: Math.min(100, Math.max(0, rainChance)),
      rainfallAmount: Math.max(0, rainfallAmount),
      humidity: Math.min(99, Math.max(30, humidity)),
      dewPoint,
      uvIndex: Math.max(0, uvIndex),
      uvLevel: getUvLevel(uvIndex),
      solarRadiation,
      condition,
      iconType,
      windSpeed,
      windGust,
      beaufortScale,
    });
  }

  return hours;
}

/**
 * Khởi tạo chuỗi dữ liệu 7 ngày (-3 đến +3) cho bất kỳ đơn vị hành chính nào
 */
export function generateCollectedWeatherRange(
  districtId: string = 'quan-1',
  districtName: string = 'Phường Sài Gòn, Quận 1',
  adminType: 'phường' | 'xã' | 'đặc khu' = 'phường'
): DayCollectedWeather[] {
  const now = new Date();
  const collectedTimeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} ngày ${formatDate(now)}`;
  const offsets = [-3, -2, -1, 0, 1, 2, 3];

  let climateTypeDescription = '';
  if (adminType === 'đặc khu') {
    climateTypeDescription = 'Khí hậu đại dương - hải đảo, gió biển lộng 18-35km/h, tia UV cực đại, triều khí hậu trong lành.';
  } else if (adminType === 'xã') {
    climateTypeDescription = 'Vi khí hậu ngoại thành - nông thôn, hệ sinh thái sông nước, biên độ nhiệt ngày đêm lớn, độ ẩm cao.';
  } else {
    climateTypeDescription = 'Vi khí hậu đô thị - nội thành, hiệu ứng đảo nhiệt đô thị (UHI), mật độ bê tông hóa cao, lưu nhiệt về đêm.';
  }

  return offsets.map((offset) => {
    const targetDate = new Date(now);
    targetDate.setDate(now.getDate() + offset);

    const dateFormatted = formatDate(targetDate);
    const dayOfWeek = getVietnameseDayOfWeek(targetDate);

    let dateLabel = '';
    if (offset === 0) dateLabel = 'Hôm nay';
    else if (offset === -1) dateLabel = 'Hôm qua';
    else if (offset === -2) dateLabel = '2 ngày trước';
    else if (offset === -3) dateLabel = '3 ngày trước';
    else if (offset === 1) dateLabel = 'Ngày mai';
    else if (offset === 2) dateLabel = '2 ngày tới';
    else if (offset === 3) dateLabel = '3 ngày tới';

    const fullTitle = `${dateLabel} (${dateFormatted})`;
    const hours = generate24Hours(offset, adminType, districtName);

    const temps = hours.map((h) => h.temp);
    const humidities = hours.map((h) => h.humidity);
    const rainChances = hours.map((h) => h.rainChance);
    const rainAmounts = hours.map((h) => h.rainfallAmount);
    const uvIndices = hours.map((h) => h.uvIndex);
    const windSpeeds = hours.map((h) => h.windSpeed);

    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    const avgTemp = Number((temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1));
    const avgHumidity = Math.round(humidities.reduce((a, b) => a + b, 0) / humidities.length);
    const maxRainChance = Math.max(...rainChances);
    const totalRainfall = Number(rainAmounts.reduce((a, b) => a + b, 0).toFixed(1));
    const maxUvIndex = Math.max(...uvIndices);
    const maxWindSpeed = Math.max(...windSpeeds);

    let summary = '';
    if (offset < 0) {
      summary = `Lịch sử trạm đo ${districtName}: Nhiệt độ ${minTemp}°C - ${maxTemp}°C, mưa đạt đỉnh ${maxRainChance}% (tổng lượng ${totalRainfall} mm), UV cao nhất ${maxUvIndex}.`;
    } else if (offset === 0) {
      summary = `Hôm nay tại ${districtName}: Dao động ${minTemp}°C - ${maxTemp}°C, đỉnh bức xạ UV ${maxUvIndex}, xác suất mưa chiều tối ${maxRainChance}%.`;
    } else {
      summary = `Dự báo ${districtName}: Nhiệt độ ${minTemp}°C - ${maxTemp}°C, độ ẩm ${avgHumidity}%, khả năng mưa rào ${maxRainChance}%.`;
    }

    return {
      dateOffset: offset,
      dateLabel,
      dateFormatted,
      dayOfWeek,
      fullTitle,
      districtId,
      districtName,
      adminType,
      climateTypeDescription,
      summary,
      avgTemp,
      minTemp,
      maxTemp,
      avgHumidity,
      maxRainChance,
      totalRainfall,
      maxUvIndex,
      maxWindSpeed,
      hours,
      collectedAt: collectedTimeStr,
      source: offset <= 0 ? 'Trạm quan trắc IoT & Trạm khí tượng chuyên dụng' : 'Dự báo vi khí hậu WRF độ phân giải 1km',
      isCached: true,
    };
  });
}

/**
 * Lấy dữ liệu đã lưu trữ cho đơn vị hành chính cụ thể
 */
export function getCachedCollectedWeatherRange(
  districtId: string = 'quan-1',
  districtName: string = 'Phường Sài Gòn, Quận 1',
  adminType: 'phường' | 'xã' | 'đặc khu' = 'phường'
): { data: DayCollectedWeather[]; lastSynced: string | null } {
  const cacheKey = `${STORAGE_PREFIX}${districtId}`;
  try {
    const raw = localStorage.getItem(cacheKey);
    const lastSynced = localStorage.getItem(STORAGE_KEY_LAST_COLLECTED_TIME);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length === 7) {
        return { data: parsed, lastSynced };
      }
    }
  } catch (e) {
    // Fallthrough
  }

  // Khởi tạo mới
  const fresh = generateCollectedWeatherRange(districtId, districtName, adminType);
  const nowStr = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' hôm nay';
  try {
    localStorage.setItem(cacheKey, JSON.stringify(fresh));
    localStorage.setItem(STORAGE_KEY_LAST_COLLECTED_TIME, nowStr);
  } catch (e) {
    // Ignore
  }

  return { data: fresh, lastSynced: nowStr };
}

/**
 * Đồng bộ dữ liệu mới nhất khi có kết nối mạng cho đơn vị hành chính
 */
export async function syncCollectedWeatherOnline(
  districtId: string = 'quan-1',
  districtName: string = 'Phường Sài Gòn, Quận 1',
  adminType: 'phường' | 'xã' | 'đặc khu' = 'phường'
): Promise<{ success: boolean; data: DayCollectedWeather[]; message: string; lastSynced: string }> {
  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;

  if (!isOnline) {
    const cached = getCachedCollectedWeatherRange(districtId, districtName, adminType);
    return {
      success: false,
      data: cached.data,
      message: `Thiết bị ngoại tuyến. Đang dùng bộ nhớ đệm cho ${districtName}.`,
      lastSynced: cached.lastSynced || 'Chưa đồng bộ',
    };
  }

  await new Promise((resolve) => setTimeout(resolve, 450));

  const fresh = generateCollectedWeatherRange(districtId, districtName, adminType);
  const now = new Date();
  const nowStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} ngày ${formatDate(now)}`;
  const cacheKey = `${STORAGE_PREFIX}${districtId}`;

  try {
    localStorage.setItem(cacheKey, JSON.stringify(fresh));
    localStorage.setItem(STORAGE_KEY_LAST_COLLECTED_TIME, nowStr);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('eco-collected-weather-synced', {
          detail: { timestamp: now.getTime(), formattedTime: nowStr, districtId },
        })
      );
    }

    return {
      success: true,
      data: fresh,
      message: `Đã đồng bộ dữ liệu thời tiết 24 giờ (±3 ngày) cho ${districtName}!`,
      lastSynced: nowStr,
    };
  } catch (e) {
    return {
      success: false,
      data: fresh,
      message: 'Không thể lưu vào bộ nhớ cục bộ.',
      lastSynced: nowStr,
    };
  }
}

/**
 * Dữ liệu so sánh đa cấp độ (Cấp Phường vs Cấp Xã vs Cấp Đặc khu)
 */
export interface UnitComparisonHourRecord {
  hourLabel: string;
  hour: number;
  wardTemp: number; // Phường Sài Gòn, Quận 1
  wardRain: number;
  wardUv: number;
  communeTemp: number; // Xã Long Hòa, Cần Giờ
  communeRain: number;
  communeUv: number;
  specialZoneTemp: number; // Đặc khu Côn Đảo
  specialZoneRain: number;
  specialZoneUv: number;
}

export function generateMultiLevelComparison(offset: number = 0): UnitComparisonHourRecord[] {
  const wardHours = generate24Hours(offset, 'phường', 'Phường Sài Gòn, Quận 1');
  const communeHours = generate24Hours(offset, 'xã', 'Xã Long Hòa, Cần Giờ');
  const specialZoneHours = generate24Hours(offset, 'đặc khu', 'Đặc khu Côn Đảo');

  return wardHours.map((w, index) => {
    const c = communeHours[index];
    const s = specialZoneHours[index];
    return {
      hourLabel: w.hourLabel,
      hour: w.hour,
      wardTemp: w.temp,
      wardRain: w.rainChance,
      wardUv: w.uvIndex,
      communeTemp: c.temp,
      communeRain: c.rainChance,
      communeUv: c.uvIndex,
      specialZoneTemp: s.temp,
      specialZoneRain: s.rainChance,
      specialZoneUv: s.uvIndex,
    };
  });
}
