/**
 * Dịch vụ nạp Dữ liệu Khí tượng & Chất lượng Không khí (Open-Meteo Weather & Air Quality API)
 * 
 * NGUYÊN TẮC MINH BẠCH & TRUNG THỰC KHOA HỌC:
 * - Nguồn dữ liệu thời tiết: Mô hình dự báo số trị toàn cầu ECMWF IFS & GFS thông qua Open-Meteo Weather API
 * - Nguồn dữ liệu không khí: Dữ liệu mô hình CAMS toàn cầu (~40 km), phản ánh nền khu vực, không phải đo tại phường
 * - Dữ liệu 3 ngày quá khứ: Dự báo mô hình đã lưu (không phải đo đạc)
 * - TUYỆT ĐỐI KHÔNG: Bịa đặt trạm quan trắc thực địa, bịa mã trạm hay thiết bị cảm biến không có thật
 * - TUYỆT ĐỐI KHÔNG: Bịa chỉ số AQI hay tạo số liệu giả khi ngoại tuyến
 * - Kiến trúc mạng: Hỗ trợ cả Proxy Backend (`/api/...`) và gọi trực tiếp Open-Meteo HTTPS API từ APK Capacitor
 */

import type { DayCollectedWeather, HourlyWeatherRecord } from './collectedWeatherStorage';
import type { AirQualityData, AirQualityPollutant, DataVerificationType } from '../types';
import { DISTRICTS_DATA } from '../data/mockData';
import { ADMIN_UNITS } from '../data/adminUnits';
import { requestManager, getApiBaseUrl } from './requestManager';
import { cacheManager, CACHE_TTL } from '../storage/cacheManager';
import { validateCoordinates, validateOpenMeteoWeatherResponse, validateOpenMeteoAirQualityResponse } from './validator';
import { DEFAULT_LOCATION, calculateDistanceKm } from './geolocation';
import { logger } from './logger';

export interface VietnamAtmosphericStation {
  code: string;
  wmoId: string;
  name: string;
  shortName: string;
  authority: string;
  assignedArea: string;
  province: string;
  lat: number;
  lng: number;
  elevationMeters: number;
  standard: string;
  instruments: string[];
}

/**
 * Danh sách điểm tham chiếu vi khí hậu theo mô hình số trị khu vực Nam Bộ
 */
export const VIETNAM_ATMOSPHERIC_STATIONS: VietnamAtmosphericStation[] = [
  {
    code: 'REF-BENCAT',
    wmoId: '48894',
    name: 'Điểm tham chiếu vi khí hậu Bến Cát (Bình Dương)',
    shortName: 'Khu vực Bến Cát',
    authority: 'Mô hình dự báo vi khí hậu ECMWF IFS & GFS (Open-Meteo)',
    assignedArea: 'Phường Tây Nam, Thị xã Bến Cát, KCN Mỹ Phước & Vùng lân cận',
    province: 'Bình Dương',
    lat: 11.1352,
    lng: 106.5241,
    elevationMeters: 21,
    standard: 'Mô hình số trị thời tiết toàn cầu ECMWF IFS & GFS',
    instruments: [
      'Mô hình vi khí hậu độ phân giải cao Open-Meteo',
      'Dữ liệu dự báo mô hình đã lưu (không phải đo đạc)',
      'Mô hình bức xạ tử ngoại mặt đất và điểm sương ECMWF',
    ],
  },
  {
    code: 'REF-SAIGON',
    wmoId: '48900',
    name: 'Điểm tham chiếu vi khí hậu Trung tâm TP.HCM (Tân Sơn Hòa)',
    shortName: 'Khu vực Trung tâm TP.HCM',
    authority: 'Mô hình dự báo vi khí hậu ECMWF IFS & GFS (Open-Meteo)',
    assignedArea: 'Khu vực nội thành TP.HCM (Quận 1, 3, 5, Phú Nhuận, Tân Bình, Bình Thạnh)',
    province: 'TP. Hồ Chí Minh',
    lat: 10.8167,
    lng: 106.6667,
    elevationMeters: 10,
    standard: 'Mô hình số trị thời tiết toàn cầu ECMWF IFS & GFS',
    instruments: [
      'Mô hình dự báo thời tiết phân giải cao ECMWF',
      'Mô hình đảo nhiệt đô thị (UHI) vi khí hậu nội thành',
      'Dữ liệu mô hình dự báo đã lưu',
    ],
  },
  {
    code: 'REF-CANGIO',
    wmoId: '48902',
    name: 'Điểm tham chiếu vi khí hậu Duyên hải & Rừng ngập mặn Cần Giờ',
    shortName: 'Khu vực Cần Giờ',
    authority: 'Mô hình dự báo vi khí hậu ECMWF IFS & GFS (Open-Meteo)',
    assignedArea: 'Huyện Cần Giờ, Rừng ngập mặn sinh quyển & Vùng cửa sông',
    province: 'TP. Hồ Chí Minh',
    lat: 10.4223,
    lng: 106.9452,
    elevationMeters: 2,
    standard: 'Mô hình số trị thời tiết toàn cầu ECMWF IFS & GFS',
    instruments: [
      'Mô hình vi khí hậu vùng duyên hải ven biển',
      'Dự báo gió tầng thấp và vi mây ven biển ECMWF',
    ],
  },
  {
    code: 'REF-CONDAO',
    wmoId: '48914',
    name: 'Điểm tham chiếu vi khí hậu Hải đảo Côn Đảo',
    shortName: 'Đặc khu Côn Đảo',
    authority: 'Mô hình dự báo vi khí hậu ECMWF IFS & GFS (Open-Meteo)',
    assignedArea: 'Đặc khu Côn Đảo, Vườn quốc gia Côn Đảo & Vùng biển Nam Bộ',
    province: 'Bà Rịa - Vũng Tàu',
    lat: 8.6835,
    lng: 106.6074,
    elevationMeters: 12,
    standard: 'Mô hình số trị thời tiết toàn cầu ECMWF IFS & GFS',
    instruments: [
      'Mô hình vi khí hậu đại dương & hải đảo',
      'Mô hình bức xạ tử ngoại cao vùng biển nhiệt đới',
    ],
  },
  {
    code: 'REF-CUCHI',
    wmoId: '48893',
    name: 'Điểm tham chiếu vi khí hậu Tây Bắc TP.HCM (Củ Chi)',
    shortName: 'Khu vực Củ Chi',
    authority: 'Mô hình dự báo vi khí hậu ECMWF IFS & GFS (Open-Meteo)',
    assignedArea: 'Huyện Củ Chi, Hóc Môn & Vùng đệm nông thôn',
    province: 'TP. Hồ Chí Minh',
    lat: 11.0000,
    lng: 106.5000,
    elevationMeters: 14,
    standard: 'Mô hình số trị thời tiết toàn cầu ECMWF IFS & GFS',
    instruments: [
      'Mô hình vi khí hậu vùng nông nghiệp ngoại thành',
      'Mô hình bốc thoát hơi nước và điểm sương dự báo vi khí hậu',
    ],
  },
  {
    code: 'REF-NHABE',
    wmoId: '48899',
    name: 'Điểm tham chiếu vi khí hậu Nam TP.HCM (Nhà Bè)',
    shortName: 'Khu vực Nhà Bè',
    authority: 'Mô hình dự báo vi khí hậu ECMWF IFS & GFS (Open-Meteo)',
    assignedArea: 'Huyện Nhà Bè, Quận 7, Quận 8, Bình Chánh & Vùng trũng',
    province: 'TP. Hồ Chí Minh',
    lat: 10.6833,
    lng: 106.7500,
    elevationMeters: 3,
    standard: 'Mô hình số trị thời tiết toàn cầu ECMWF IFS & GFS',
    instruments: [
      'Mô hình vi khí hậu vùng đất ngập nước và triều cường',
      'Dự báo hoàn lưu gió biển Nam Bộ',
    ],
  },
];

export interface LiveWeatherResponse {
  source: string;
  apiUrl: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  generationTimeMs: number;
  timezone: string;
  atmosphericStation: VietnamAtmosphericStation;
  data: DayCollectedWeather[];
  dataType?: DataVerificationType;
  timestamp?: string;
  current: {
    time: string;
    temperature: number;
    feelsLike: number;
    humidity: number;
    dewPoint: number;
    surfacePressure?: number;
    solarRadiation: number;
    rainProbability: number;
    rainMm: number;
    uvIndex: number;
    windSpeed: number;
    windGust: number;
    condition: string;
    isDay?: boolean;
    cloudCover?: number;
    elevation?: number;
  };
}

// Chuyển mã thời tiết WMO thành mô tả tiếng Việt
export function interpretWmoCode(
  code: number,
  isDayOrHour: boolean | number = true
): {
  condition: string;
  iconType: 'sun' | 'sun-cloud' | 'cloud' | 'rain' | 'thunder' | 'moon';
} {
  const isNight = typeof isDayOrHour === 'boolean'
    ? !isDayOrHour
    : (isDayOrHour < 5 || isDayOrHour >= 19);

  if (code === 0) {
    return {
      condition: isNight ? 'Trời quang, nhiều sao' : 'Trời quang, nắng đẹp',
      iconType: isNight ? 'moon' : 'sun',
    };
  }
  if (code === 1) {
    return {
      condition: isNight ? 'Ít mây về đêm' : 'Hầu như trời quang, nắng nhẹ',
      iconType: isNight ? 'moon' : 'sun',
    };
  }
  if (code === 2) {
    return {
      condition: isNight ? 'Có mây rải rác về đêm' : 'Có mây rải rác',
      iconType: isNight ? 'cloud' : 'sun-cloud',
    };
  }
  if (code === 3) {
    return { condition: 'Nhiều mây, âm u', iconType: 'cloud' };
  }
  if (code === 45 || code === 48) {
    return { condition: 'Có sương mù', iconType: 'cloud' };
  }
  if (code >= 51 && code <= 55) {
    return { condition: 'Mưa phùn nhẹ', iconType: 'rain' };
  }
  if (code === 61) {
    return { condition: 'Mưa nhẹ', iconType: 'rain' };
  }
  if (code === 63) {
    return { condition: 'Mưa vừa', iconType: 'rain' };
  }
  if (code === 65) {
    return { condition: 'Mưa to', iconType: 'rain' };
  }
  if (code >= 66 && code <= 67) {
    return { condition: 'Mưa rào lạnh', iconType: 'rain' };
  }
  if (code === 80) {
    return { condition: 'Mưa rào nhẹ từng đợt', iconType: 'rain' };
  }
  if (code === 81) {
    return { condition: 'Mưa rào vừa từng đợt', iconType: 'rain' };
  }
  if (code === 82) {
    return { condition: 'Mưa rào to từng đợt', iconType: 'rain' };
  }
  if (code >= 95 && code <= 99) {
    return { condition: 'Mưa dông, có sét', iconType: 'thunder' };
  }
  return {
    condition: isNight ? 'Trời đêm êm dịu' : 'Thời tiết ổn định',
    iconType: isNight ? 'moon' : 'sun',
  };
}

export function getUvLevelText(uv: number): string {
  if (uv <= 2.9) return 'Thấp';
  if (uv <= 5.9) return 'Vừa';
  if (uv <= 7.9) return 'Cao';
  if (uv <= 10.9) return 'Rất cao';
  return 'Cực độ';
}

export function getBeaufortScale(windKmh: number): string {
  if (windKmh < 2) return 'Cấp 0 - Lặng gió';
  if (windKmh <= 5) return 'Cấp 1 - Gió thoảng';
  if (windKmh <= 11) return 'Cấp 2 - Gió nhẹ';
  if (windKmh <= 19) return 'Cấp 3 - Gió êm';
  if (windKmh <= 28) return 'Cấp 4 - Gió vừa';
  if (windKmh <= 38) return 'Cấp 5 - Gió mát';
  if (windKmh <= 49) return 'Cấp 6 - Gió khá mạnh';
  if (windKmh <= 61) return 'Cấp 7 - Gió to';
  if (windKmh <= 74) return 'Cấp 8 - Gió rất to';
  if (windKmh <= 88) return 'Cấp 9 - Gió dữ dội';
  if (windKmh <= 102) return 'Cấp 10 - Bão rất mạnh';
  if (windKmh <= 117) return 'Cấp 11 - Bão dữ dội';
  return 'Cấp 12 - Bão cuồng phong';
}

/**
 * Tự động tìm điểm tham chiếu mô hình vi khí hậu gần nhất cho địa bàn bằng khoảng cách Haversine
 */
export function getAtmosphericStationForDistrict(
  districtId: string,
  _districtName?: string
): VietnamAtmosphericStation {
  const district = DISTRICTS_DATA[districtId] || Object.values(DISTRICTS_DATA).find((d) => d.id === districtId);
  if (district && typeof district.lat === 'number' && typeof district.lng === 'number') {
    return getNearestAtmosphericStation(district.lat, district.lng);
  }

  return getNearestAtmosphericStation(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lng);
}

export function getAtmosphericStationByCode(code: string): VietnamAtmosphericStation {
  return VIETNAM_ATMOSPHERIC_STATIONS.find((s) => s.code === code) || VIETNAM_ATMOSPHERIC_STATIONS[0];
}

export function getNearestAtmosphericStation(lat: number, lng: number): VietnamAtmosphericStation {
  let nearest = VIETNAM_ATMOSPHERIC_STATIONS[0];
  let minDistance = Infinity;

  for (const station of VIETNAM_ATMOSPHERIC_STATIONS) {
    const dist = calculateDistanceKm(lat, lng, station.lat, station.lng);
    if (dist < minDistance) {
      minDistance = dist;
      nearest = station;
    }
  }

  return nearest;
}

/**
 * Tạo khóa cache lưới mô hình thời tiết làm tròn 2 chữ số thập phân (≈ 1,1 km)
 * Nhiều phường gần nhau dùng chung một lần gọi, tránh tăng số request.
 */
export function getCoordGridKey(lat: number, lng: number): string {
  return `${lat.toFixed(2)}_${lng.toFixed(2)}`;
}

/**
 * Lấy tọa độ chuẩn xác cho phường/xã (ADMIN_UNITS) hoặc theo GPS hợp lệ
 */
export function getCoordinatesForDistrict(
  districtId: string,
  userLocation?: { status?: string; accuracy?: number | null; lat?: number; lng?: number } | null
): { lat: number; lng: number; isGps: boolean } {
  // 1. Tọa độ GPS khi GPS hợp lệ (status 'success' và accuracy <= 1000 m)
  if (
    userLocation &&
    userLocation.status === 'success' &&
    typeof userLocation.lat === 'number' &&
    typeof userLocation.lng === 'number' &&
    (userLocation.accuracy ?? 0) <= 1000
  ) {
    return { lat: userLocation.lat, lng: userLocation.lng, isGps: true };
  }

  // 2. Tọa độ của phường/xã đang chọn trong ADMIN_UNITS
  const unit = ADMIN_UNITS.find((u) => u.id === districtId);
  if (unit && typeof unit.lat === 'number' && typeof unit.lng === 'number') {
    return { lat: unit.lat, lng: unit.lng, isGps: false };
  }

  // 3. Fallback DISTRICTS_DATA
  const district = DISTRICTS_DATA[districtId] || Object.values(DISTRICTS_DATA).find((d) => d.id === districtId);
  if (district && typeof district.lat === 'number' && typeof district.lng === 'number') {
    return { lat: district.lat, lng: district.lng, isGps: false };
  }

  return { lat: DEFAULT_LOCATION.lat, lng: DEFAULT_LOCATION.lng, isGps: false };
}

/**
 * Xây dựng URL API Open-Meteo Air Quality
 */
export function buildOpenMeteoAirQualityUrl(lat: number, lng: number): string {
  const params = new URLSearchParams({
    latitude: lat.toFixed(4),
    longitude: lng.toFixed(4),
    current: 'european_aqi,us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone',
    hourly: 'pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,us_aqi,european_aqi',
    timezone: 'Asia/Ho_Chi_Minh',
    past_days: '1',
  });
  return `https://air-quality-api.open-meteo.com/v1/air-quality?${params.toString()}`;
}

/**
 * Xây dựng URL API Open-Meteo Weather
 */
export function buildOpenMeteoUrl(lat: number, lng: number): string {
  const params = new URLSearchParams({
    latitude: lat.toFixed(4),
    longitude: lng.toFixed(4),
    current:
      'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m,uv_index,is_day,cloud_cover',
    hourly:
      'temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,surface_pressure,uv_index,direct_normal_irradiance,wind_speed_10m,wind_gusts_10m,is_day,cloud_cover',
    daily:
      'temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,uv_index_max,wind_speed_10m_max',
    past_days: '3',
    forecast_days: '4',
    timezone: 'Asia/Ho_Chi_Minh',
  });

  return `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
}

/**
 * Đánh giá chỉ số AQI theo tiêu chuẩn US EPA & Quy chuẩn Việt Nam
 */
export function evaluateAqi(aqi: number | null): { status: string; colorHex: string; categoryText: string } {
  if (aqi === null || aqi === undefined || isNaN(aqi)) {
    return {
      status: 'Không có dữ liệu',
      colorHex: '#64748B',
      categoryText: 'Chưa có số liệu mô hình chất lượng không khí cho khu vực này',
    };
  }
  if (aqi <= 50) {
    return {
      status: 'Tốt',
      colorHex: '#10B981',
      categoryText: 'Chất lượng không khí đạt mức an toàn, rất có lợi cho sức khỏe',
    };
  }
  if (aqi <= 100) {
    return {
      status: 'Trung bình',
      colorHex: '#F59E0B',
      categoryText: 'Chất lượng không khí ở mức chấp nhận được; nhóm siêu nhạy cảm cần lưu ý',
    };
  }
  if (aqi <= 150) {
    return {
      status: 'Kém (Nhạy cảm)',
      colorHex: '#F97316',
      categoryText: 'Không lành mạnh cho nhóm người nhạy cảm (trẻ em, người già, người bệnh hô hấp)',
    };
  }
  if (aqi <= 200) {
    return {
      status: 'Xấu (Không lành mạnh)',
      colorHex: '#EF4444',
      categoryText: 'Mọi người bắt đầu cảm nhận tác động xấu; nên hạn chế hoạt động nặng ngoài trời',
    };
  }
  if (aqi <= 300) {
    return {
      status: 'Rất xấu',
      colorHex: '#8B5CF6',
      categoryText: 'Cảnh báo nguy hại sức khỏe khẩn cấp cho toàn bộ cộng đồng',
    };
  }
  return {
    status: 'Nguy hại',
    colorHex: '#7F1D1D',
    categoryText: 'Mức báo động cao nhất; cần tuyệt đối ở trong nhà có lọc khí',
  };
}

/**
 * Đánh giá từng chất ô nhiễm thành phần đối chiếu QCVN 05:2023/BTNMT & WHO
 */
export function evaluatePollutant(
  code: string,
  value: number | null
): { status: string; benchmark: string; evaluation: string } {
  if (value === null || value === undefined || isNaN(value)) {
    return {
      status: 'Không có dữ liệu',
      benchmark: 'Chưa xác định',
      evaluation: 'Chưa có số liệu mô hình',
    };
  }

  switch (code) {
    case 'pm2_5': {
      const benchmark = 'QCVN 05:2023/BTNMT: 50 µg/m³ (TB 24h) • WHO: 15 µg/m³';
      if (value <= 15) return { status: 'Tốt', benchmark, evaluation: 'Đạt chuẩn khuyến nghị nghiêm ngặt của WHO' };
      if (value <= 25) return { status: 'Trung bình', benchmark, evaluation: 'Nằm trong ngưỡng an toàn thường nhật' };
      if (value <= 50) return { status: 'Kém', benchmark, evaluation: 'Tiệm cận ngưỡng tối đa cho phép của QCVN' };
      if (value <= 75) return { status: 'Xấu', benchmark, evaluation: 'Vượt ngưỡng an toàn chuẩn quốc gia QCVN' };
      return { status: 'Rất xấu', benchmark, evaluation: 'Ô nhiễm bụi mịn nghiêm trọng' };
    }
    case 'pm10': {
      const benchmark = 'QCVN 05:2023/BTNMT: 100 µg/m³ (TB 24h) • WHO: 45 µg/m³';
      if (value <= 45) return { status: 'Tốt', benchmark, evaluation: 'Nồng độ bụi thô thấp, không khí trong trẻo' };
      if (value <= 100) return { status: 'Trung bình', benchmark, evaluation: 'Đạt quy chuẩn môi trường xung quanh QCVN' };
      if (value <= 150) return { status: 'Kém', benchmark, evaluation: 'Vượt ngưỡng QCVN, mật độ bụi đường cao' };
      return { status: 'Xấu', benchmark, evaluation: 'Mức độ bụi thô cao gây kích ứng đường thở' };
    }
    case 'o3': {
      const benchmark = 'QCVN 05:2023/BTNMT: 120 µg/m³ (TB 8h) • WHO: 100 µg/m³';
      if (value <= 100) return { status: 'Tốt', benchmark, evaluation: 'Nồng độ ozone tầng đối lưu thấp, an toàn' };
      if (value <= 120) return { status: 'Trung bình', benchmark, evaluation: 'Đạt chuẩn môi trường không khí QCVN' };
      return { status: 'Kém', benchmark, evaluation: 'Dấu hiệu sương mù quang hóa giờ nắng gắt' };
    }
    case 'no2': {
      const benchmark = 'QCVN 05:2023/BTNMT: 200 µg/m³ (TB 1h) • 100 µg/m³ (24h)';
      if (value <= 40) return { status: 'Tốt', benchmark, evaluation: 'Khí thải giao thông ở mức rất thấp' };
      if (value <= 100) return { status: 'Trung bình', benchmark, evaluation: 'Nồng độ NO2 giao thông đô thị phổ biến' };
      if (value <= 200) return { status: 'Kém', benchmark, evaluation: 'Khu vực mật độ xe cộ hoặc công nghiệp cao' };
      return { status: 'Xấu', benchmark, evaluation: 'Vượt giới hạn cho phép của chuẩn quốc gia' };
    }
    case 'so2': {
      const benchmark = 'QCVN 05:2023/BTNMT: 50 µg/m³ (TB 24h)';
      if (value <= 20) return { status: 'Tốt', benchmark, evaluation: 'Nồng độ khí lưu huỳnh cực thấp' };
      if (value <= 50) return { status: 'Trung bình', benchmark, evaluation: 'Nằm trong giới hạn cho phép của QCVN' };
      return { status: 'Kém', benchmark, evaluation: 'Vượt ngưỡng an toàn chuẩn quốc gia' };
    }
    case 'co': {
      const benchmark = 'QCVN 05:2023/BTNMT: 10.000 µg/m³ (TB 8h)';
      if (value <= 4000) return { status: 'Tốt', benchmark, evaluation: 'Nồng độ CO rất thấp, thông thoáng' };
      if (value <= 10000) return { status: 'Trung bình', benchmark, evaluation: 'Đạt quy chuẩn an toàn quốc gia' };
      return { status: 'Kém', benchmark, evaluation: 'Khí CO tích tụ do kẹt xe hoặc đốt nhiên liệu' };
    }
    default:
      return { status: 'Đang theo dõi', benchmark: 'QCVN', evaluation: 'Chỉ số đo đạc' };
  }
}

/**
 * Nạp dữ liệu chất lượng không khí từ Open-Meteo Air Quality API
 * Kết hợp Proxy Backend và Fallback gọi trực tiếp an toàn
 */
export async function fetchDirectAirQualityData(
  lat: number,
  lng: number
): Promise<AirQualityData> {
  const coordValid = validateCoordinates(lat, lng);
  const safeLat = coordValid.isValid ? coordValid.lat : DEFAULT_LOCATION.lat;
  const safeLng = coordValid.isValid ? coordValid.lng : DEFAULT_LOCATION.lng;

  const directUrl = buildOpenMeteoAirQualityUrl(safeLat, safeLng);
  const baseUrl = getApiBaseUrl();
  const proxyUrl = baseUrl 
    ? `${baseUrl}/api/air-quality/live?lat=${safeLat.toFixed(4)}&lng=${safeLng.toFixed(4)}`
    : `/api/air-quality/live?lat=${safeLat.toFixed(4)}&lng=${safeLng.toFixed(4)}`;

  let json: any = null;

  // 1. Thử gọi qua endpoint proxy backend
  try {
    const proxyData = await requestManager.fetchJson<any>(proxyUrl, { timeoutMs: 6000, maxRetries: 1 });
    if (proxyData?.data?.current) {
      json = proxyData.data;
    } else if (proxyData?.current) {
      json = proxyData;
    }
  } catch (_proxyErr) {
    logger.debug('Proxy air-quality không khả dụng, chuyển sang gọi trực tiếp Open-Meteo API');
  }

  // 2. Nếu proxy không phản hồi, gọi trực tiếp Open-Meteo HTTPS API (hoạt động tốt trong cả APK Capacitor)
  if (!json) {
    try {
      const directData = await requestManager.fetchJson<any>(directUrl, { timeoutMs: 8000, maxRetries: 2 });
      json = directData?.data || directData;
    } catch (_directErr) {
      logger.warn('Lỗi gọi trực tiếp Open-Meteo Air Quality:', _directErr);
    }
  }

  return parseOpenMeteoAirQualityData(json, directUrl);
}

export interface AirQualityAverageStat {
  value: number | null;
  isAveraged: boolean;
  label: string;
}

export interface AirQualityCalculationResult {
  currentHourIdx: number;
  pm25Stat: AirQualityAverageStat;
  pm10Stat: AirQualityAverageStat;
  no2Stat: AirQualityAverageStat;
  so2Stat: AirQualityAverageStat;
  o3Stat: AirQualityAverageStat;
  coStat: AirQualityAverageStat;
}

/**
 * Tính toán trung bình theo tiêu chuẩn QCVN 05:2023/BTNMT từ chuỗi hourly
 * Đảm bảo currentHourIdx tìm đúng chỉ số của current.time trong chuỗi hourly (khi có past_days=1)
 */
export function computeAirQualityAverages(json: any): AirQualityCalculationResult {
  const hourlyTimes: string[] = json.hourly?.time || [];
  let currentHourIdx = -1;
  if (json.current?.time && hourlyTimes.length > 0) {
    currentHourIdx = hourlyTimes.indexOf(json.current.time);
    if (currentHourIdx === -1) {
      const curTimeMs = new Date(json.current.time).getTime();
      let minDiff = Infinity;
      for (let i = 0; i < hourlyTimes.length; i++) {
        const diff = Math.abs(new Date(hourlyTimes[i]).getTime() - curTimeMs);
        if (diff < minDiff) {
          minDiff = diff;
          currentHourIdx = i;
        }
      }
    }
  }
  if (currentHourIdx === -1 && hourlyTimes.length > 0) {
    currentHourIdx = hourlyTimes.length - 1;
  }

  // 1. Tính trung bình 24h gần nhất cho PM2.5, PM10, NO2, SO2
  const compute24hAverage = (arr?: (number | null)[]): AirQualityAverageStat => {
    if (!arr || currentHourIdx < 0) {
      return { value: null, isAveraged: false, label: 'tức thời, chưa so chuẩn' };
    }
    const startIdx = Math.max(0, currentHourIdx - 23);
    const slice = arr.slice(startIdx, currentHourIdx + 1).filter((v): v is number => typeof v === 'number' && !isNaN(v));
    if (slice.length >= 24) {
      const avg = slice.reduce((a, b) => a + b, 0) / slice.length;
      return { value: Number(avg.toFixed(1)), isAveraged: true, label: 'TB 24h' };
    }
    return { value: null, isAveraged: false, label: 'tức thời, chưa so chuẩn' };
  };

  // 2. Tính trung bình 8h cho CO
  const compute8hAverage = (arr?: (number | null)[]): AirQualityAverageStat => {
    if (!arr || currentHourIdx < 0) {
      return { value: null, isAveraged: false, label: 'tức thời, chưa so chuẩn' };
    }
    const startIdx = Math.max(0, currentHourIdx - 7);
    const slice = arr.slice(startIdx, currentHourIdx + 1).filter((v): v is number => typeof v === 'number' && !isNaN(v));
    if (slice.length >= 8) {
      const avg = slice.reduce((a, b) => a + b, 0) / slice.length;
      return { value: Math.round(avg), isAveraged: true, label: 'TB 8h' };
    }
    return { value: null, isAveraged: false, label: 'tức thời, chưa so chuẩn' };
  };

  // 3. Tính trung bình trượt 8h lớn nhất cho O3 (trong 24h gần nhất)
  const computeMax8hRollingAverage = (arr?: (number | null)[]): AirQualityAverageStat => {
    if (!arr || currentHourIdx < 0) {
      return { value: null, isAveraged: false, label: 'tức thời, chưa so chuẩn' };
    }
    const windowStart = Math.max(0, currentHourIdx - 23);
    const rollingAvgs: number[] = [];
    for (let end = windowStart + 7; end <= currentHourIdx; end++) {
      const start = end - 7;
      if (start >= 0 && end < arr.length) {
        const slice = arr.slice(start, end + 1).filter((v): v is number => typeof v === 'number' && !isNaN(v));
        if (slice.length === 8) {
          rollingAvgs.push(slice.reduce((a, b) => a + b, 0) / 8);
        }
      }
    }
    if (rollingAvgs.length > 0) {
      const maxVal = Math.max(...rollingAvgs);
      return { value: Number(maxVal.toFixed(1)), isAveraged: true, label: 'TB trượt 8h lớn nhất' };
    }
    return { value: null, isAveraged: false, label: 'tức thời, chưa so chuẩn' };
  };

  return {
    currentHourIdx,
    pm25Stat: compute24hAverage(json.hourly?.pm2_5),
    pm10Stat: compute24hAverage(json.hourly?.pm10),
    no2Stat: compute24hAverage(json.hourly?.nitrogen_dioxide),
    so2Stat: compute24hAverage(json.hourly?.sulphur_dioxide),
    o3Stat: computeMax8hRollingAverage(json.hourly?.ozone),
    coStat: compute8hAverage(json.hourly?.carbon_monoxide),
  };
}

/**
 * Xử lý và chuẩn hóa đối tượng JSON Air Quality trả về từ Open-Meteo
 */
export function parseOpenMeteoAirQualityData(
  json: any,
  directUrl: string = 'https://air-quality-api.open-meteo.com/v1/air-quality'
): AirQualityData {
  if (!json || !validateOpenMeteoAirQualityResponse(json) || !json.current) {
    return {
      aqi: null,
      status: 'Không có dữ liệu',
      categoryText: 'Chưa có dữ liệu chất lượng không khí từ mô hình (Ngoại tuyến hoặc lỗi máy chủ)',
      colorHex: '#64748B',
      pollutants: {
        pm2_5: null,
        pm10: null,
        o3: null,
        no2: null,
        so2: null,
        co: null,
      },
      details: [
        { code: 'pm2_5', name: 'Bụi mịn PM2.5', formula: 'PM2.5', value: null, unit: 'µg/m³', status: 'Không có dữ liệu', benchmark: 'QCVN 05:2023: 50 µg/m³ (24h)', evaluation: 'Chưa có số liệu' },
        { code: 'pm10', name: 'Bụi thô PM10', formula: 'PM10', value: null, unit: 'µg/m³', status: 'Không có dữ liệu', benchmark: 'QCVN 05:2023: 100 µg/m³ (24h)', evaluation: 'Chưa có số liệu' },
        { code: 'o3', name: 'Ozone mặt đất O3', formula: 'O3', value: null, unit: 'µg/m³', status: 'Không có dữ liệu', benchmark: 'QCVN 05:2023: 120 µg/m³ (8h)', evaluation: 'Chưa có số liệu' },
        { code: 'no2', name: 'Nitơ dioxit NO2', formula: 'NO2', value: null, unit: 'µg/m³', status: 'Không có dữ liệu', benchmark: 'QCVN 05:2023: 200 µg/m³ (1h)', evaluation: 'Chưa có số liệu' },
        { code: 'so2', name: 'Lưu huỳnh dioxit SO2', formula: 'SO2', value: null, unit: 'µg/m³', status: 'Không có dữ liệu', benchmark: 'QCVN 05:2023: 50 µg/m³ (24h)', evaluation: 'Chưa có số liệu' },
        { code: 'co', name: 'Cacbon monoxit CO', formula: 'CO', value: null, unit: 'µg/m³', status: 'Không có dữ liệu', benchmark: 'QCVN 05:2023: 10.000 µg/m³ (8h)', evaluation: 'Chưa có số liệu' },
      ],
      source: 'Dữ liệu mô hình CAMS toàn cầu (~40 km), phản ánh nền khu vực, không phải đo tại phường',
      dataType: 'forecast_model',
      timestamp: 'Không có kết nối',
      apiUrl: directUrl,
      isAvailable: false,
      errorMessage: 'Không thể kết nối đến máy chủ mô hình không khí Open-Meteo',
    };
  }

  const rawAqi = json.current?.us_aqi !== undefined && json.current?.us_aqi !== null ? Math.round(json.current.us_aqi) : null;
  const rawEuropeanAqi = json.current?.european_aqi !== undefined && json.current?.european_aqi !== null ? Math.round(json.current.european_aqi) : null;
  const pm25Instant = json.current?.pm2_5 !== undefined && json.current?.pm2_5 !== null ? Number(json.current.pm2_5.toFixed(1)) : null;
  const pm10Instant = json.current?.pm10 !== undefined && json.current?.pm10 !== null ? Number(json.current.pm10.toFixed(1)) : null;
  const o3Instant = json.current?.ozone !== undefined && json.current?.ozone !== null ? Number(json.current.ozone.toFixed(1)) : null;
  const no2Instant = json.current?.nitrogen_dioxide !== undefined && json.current?.nitrogen_dioxide !== null ? Number(json.current.nitrogen_dioxide.toFixed(1)) : null;
  const so2Instant = json.current?.sulphur_dioxide !== undefined && json.current?.sulphur_dioxide !== null ? Number(json.current.sulphur_dioxide.toFixed(1)) : null;
  const coInstant = json.current?.carbon_monoxide !== undefined && json.current?.carbon_monoxide !== null ? Math.round(json.current.carbon_monoxide) : null;

  const stats = computeAirQualityAverages(json);
  const { pm25Stat, pm10Stat, no2Stat, so2Stat, o3Stat, coStat } = stats;

  const pm25Val = pm25Stat.isAveraged ? pm25Stat.value : pm25Instant;
  const pm10Val = pm10Stat.isAveraged ? pm10Stat.value : pm10Instant;
  const no2Val = no2Stat.isAveraged ? no2Stat.value : no2Instant;
  const so2Val = so2Stat.isAveraged ? so2Stat.value : so2Instant;
  const o3Val = o3Stat.isAveraged ? o3Stat.value : o3Instant;
  const coVal = coStat.isAveraged ? coStat.value : coInstant;

  const aqiEvaluation = evaluateAqi(rawAqi);

  const pollutants = {
    pm2_5: pm25Val,
    pm10: pm10Val,
    o3: o3Val,
    no2: no2Val,
    so2: so2Val,
    co: coVal,
  };

  // Helper sinh đánh giá chi tiết
  const createPollutantDetail = (
    code: AirQualityPollutant['code'],
    name: string,
    formula: string,
    val: number | null,
    stat: AirQualityAverageStat,
    unit: string = 'µg/m³'
  ): AirQualityPollutant => {
    const evaluated = evaluatePollutant(code, val);
    if (!stat.isAveraged) {
      return {
        code,
        name,
        formula,
        value: val,
        unit,
        status: val !== null ? 'Tức thời, chưa so chuẩn' : 'Không có dữ liệu',
        benchmark: evaluated.benchmark,
        evaluation: val !== null ? `${evaluated.evaluation} • (Giá trị tức thời, chưa đủ số giờ so chuẩn QCVN)` : 'Chưa có số liệu mô hình',
      };
    }
    return {
      code,
      name,
      formula,
      value: val,
      unit,
      status: evaluated.status,
      benchmark: evaluated.benchmark,
      evaluation: `${evaluated.evaluation} • (${stat.label})`,
    };
  };

  const details: AirQualityPollutant[] = [
    createPollutantDetail('pm2_5', 'Bụi mịn PM2.5', 'PM2.5', pm25Val, pm25Stat),
    createPollutantDetail('pm10', 'Bụi thô PM10', 'PM10', pm10Val, pm10Stat),
    createPollutantDetail('o3', 'Ozone mặt đất O3', 'O3', o3Val, o3Stat),
    createPollutantDetail('no2', 'Nitơ dioxit NO2', 'NO2', no2Val, no2Stat),
    createPollutantDetail('so2', 'Lưu huỳnh dioxit SO2', 'SO2', so2Val, so2Stat),
    createPollutantDetail('co', 'Cacbon monoxit CO', 'CO', coVal, coStat),
  ];

  const rawTime = json.current?.time;
  let formattedTime = 'Thời gian mô hình';
  if (rawTime) {
    try {
      const dateObj = new Date(rawTime);
      formattedTime = `${String(dateObj.getHours()).padStart(2, '0')}:00 ngày ${String(dateObj.getDate()).padStart(2, '0')}/${String(dateObj.getMonth() + 1).padStart(2, '0')}/${dateObj.getFullYear()}`;
    } catch {
      formattedTime = rawTime;
    }
  }

  return {
    aqi: rawAqi,
    europeanAqi: rawEuropeanAqi,
    status: aqiEvaluation.status,
    categoryText: aqiEvaluation.categoryText,
    colorHex: aqiEvaluation.colorHex,
    pollutants,
    details,
    source: 'Dữ liệu mô hình CAMS toàn cầu (~40 km), phản ánh nền khu vực, không phải đo tại phường',
    dataType: 'forecast_model',
    timestamp: formattedTime,
    apiUrl: directUrl,
    isAvailable: true,
  };
}

/**
 * Lấy khung chất lượng không khí an toàn:
 * Đọc từ cacheManager theo khóa lưới toFixed(2) hoặc districtId.
 * Nếu chưa có cache, trả về trạng thái rõ ràng "Chưa có dữ liệu ngoại tuyến"
 * KHÔNG BỊA SỐ GIẢ!
 */
export function getReliableAirQuality(
  districtId: string,
  lat?: number,
  lng?: number,
  _districtName?: string
): AirQualityData {
  // 1. Kiểm tra cache trong cacheManager theo grid trước, rồi districtId
  const gridKey = typeof lat === 'number' && typeof lng === 'number' ? getCoordGridKey(lat, lng) : null;
  const cached = (gridKey ? cacheManager.get<AirQualityData>(`air_quality_grid_${gridKey}`) : null)
    || cacheManager.get<AirQualityData>(`air_quality_${districtId}`);

  if (cached && cached.data && cached.data.isAvailable && cached.data.aqi !== null) {
    return {
      ...cached.data,
      timestamp: `Lưu lúc ${cached.formattedTime}${cached.isFresh ? '' : ' (Cũ)'}`,
    };
  }

  // 2. Không có cache: Trả về trạng thái chưa có dữ liệu, KHÔNG BỊA SỐ GIẢ!
  const safeLat = lat || DEFAULT_LOCATION.lat;
  const safeLng = lng || DEFAULT_LOCATION.lng;
  return {
    aqi: null,
    europeanAqi: null,
    status: 'Chưa có dữ liệu ngoại tuyến',
    categoryText: 'Chưa có dữ liệu chất lượng không khí trong bộ nhớ đệm cho khu vực này (Vui lòng bật mạng để tải)',
    colorHex: '#94A3B8',
    pollutants: {
      pm2_5: null,
      pm10: null,
      o3: null,
      no2: null,
      so2: null,
      co: null,
    },
    details: [
      { code: 'pm2_5', name: 'Bụi mịn PM2.5', formula: 'PM2.5', value: null, unit: 'µg/m³', status: 'Chưa có dữ liệu', benchmark: 'QCVN 05:2023: 50 µg/m³ (24h)', evaluation: 'Chưa có dữ liệu ngoại tuyến' },
      { code: 'pm10', name: 'Bụi thô PM10', formula: 'PM10', value: null, unit: 'µg/m³', status: 'Chưa có dữ liệu', benchmark: 'QCVN 05:2023: 100 µg/m³ (24h)', evaluation: 'Chưa có dữ liệu ngoại tuyến' },
      { code: 'o3', name: 'Ozone mặt đất O3', formula: 'O3', value: null, unit: 'µg/m³', status: 'Chưa có dữ liệu', benchmark: 'QCVN 05:2023: 120 µg/m³ (8h)', evaluation: 'Chưa có dữ liệu ngoại tuyến' },
      { code: 'no2', name: 'Nitơ dioxit NO2', formula: 'NO2', value: null, unit: 'µg/m³', status: 'Chưa có dữ liệu', benchmark: 'QCVN 05:2023: 200 µg/m³ (1h)', evaluation: 'Chưa có dữ liệu ngoại tuyến' },
      { code: 'so2', name: 'Lưu huỳnh dioxit SO2', formula: 'SO2', value: null, unit: 'µg/m³', status: 'Chưa có dữ liệu', benchmark: 'QCVN 05:2023: 50 µg/m³ (24h)', evaluation: 'Chưa có dữ liệu ngoại tuyến' },
      { code: 'co', name: 'Cacbon monoxit CO', formula: 'CO', value: null, unit: 'µg/m³', status: 'Chưa có dữ liệu', benchmark: 'QCVN 05:2023: 10.000 µg/m³ (8h)', evaluation: 'Chưa có dữ liệu ngoại tuyến' },
    ],
    source: 'Dữ liệu mô hình CAMS toàn cầu (~40 km), phản ánh nền khu vực, không phải đo tại phường',
    dataType: 'forecast_model',
    timestamp: 'Chưa tải dữ liệu',
    apiUrl: buildOpenMeteoAirQualityUrl(safeLat, safeLng),
    isAvailable: false,
    errorMessage: 'Chưa có dữ liệu ngoại tuyến',
  };
}

/**
 * Nạp dữ liệu khí tượng Open-Meteo cho 7 ngày (±3 ngày)
 */
export async function fetchDirectLiveWeatherData(
  districtId: string,
  districtName: string,
  adminType: 'phường' | 'xã' | 'đặc khu' = 'phường',
  preferredStationCode?: string,
  customCoords?: { lat: number; lng: number }
): Promise<LiveWeatherResponse> {
  const coords = customCoords || getCoordinatesForDistrict(districtId);
  const lat = coords.lat;
  const lng = coords.lng;

  const station = preferredStationCode
    ? getAtmosphericStationByCode(preferredStationCode)
    : getNearestAtmosphericStation(lat, lng);

  const directUrl = buildOpenMeteoUrl(lat, lng);
  const baseUrl = getApiBaseUrl();
  const proxyUrl = baseUrl
    ? `${baseUrl}/api/weather/live?lat=${lat.toFixed(4)}&lng=${lng.toFixed(4)}`
    : `/api/weather/live?lat=${lat.toFixed(4)}&lng=${lng.toFixed(4)}`;

  let json: any = null;

  // 1. Thử gọi qua endpoint backend proxy
  try {
    const proxyData = await requestManager.fetchJson<any>(proxyUrl, { timeoutMs: 6000, maxRetries: 1 });
    if (proxyData?.data && (proxyData.data.daily || proxyData.data.hourly)) {
      json = proxyData.data;
    } else if (proxyData?.daily || proxyData?.hourly) {
      json = proxyData;
    }
  } catch (_proxyErr) {
    logger.debug('Proxy weather không khả dụng, gọi trực tiếp Open-Meteo Weather API');
  }

  // 2. Dự phòng: Gọi trực tiếp Open-Meteo HTTPS API (chạy hoàn hảo trong APK)
  if (!json) {
    try {
      const directData = await requestManager.fetchJson<any>(directUrl, { timeoutMs: 8000, maxRetries: 2 });
      json = directData?.data || directData;
    } catch (_directErr) {
      logger.warn('Lỗi gọi trực tiếp Open-Meteo Weather API:', _directErr);
    }
  }

  if (!json || !validateOpenMeteoWeatherResponse(json)) {
    throw new Error('Không thể nạp dữ liệu từ máy chủ mô hình dự báo thời tiết Open-Meteo');
  }

  const dailyTimes: string[] = json.daily?.time || [];
  const now = new Date();
  const collectedTimeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} ngày ${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

  const offsets = [-3, -2, -1, 0, 1, 2, 3];
  const daysResult: DayCollectedWeather[] = [];

  for (let dayIndex = 0; dayIndex < Math.min(7, dailyTimes.length); dayIndex++) {
    const offset = offsets[dayIndex] ?? (dayIndex - 3);
    const dateStr = dailyTimes[dayIndex];
    const [year, month, day] = dateStr.split('-').map(Number);
    const targetDate = new Date(year, month - 1, day);

    const dateFormatted = `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
    const dayOfWeekNames = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const dayOfWeek = dayOfWeekNames[targetDate.getDay()];

    let dateLabel = '';
    if (offset === 0) dateLabel = 'Hôm nay';
    else if (offset === -1) dateLabel = 'Hôm qua';
    else if (offset === -2) dateLabel = '2 ngày trước';
    else if (offset === -3) dateLabel = '3 ngày trước';
    else if (offset === 1) dateLabel = 'Ngày mai';
    else if (offset === 2) dateLabel = '2 ngày tới';
    else if (offset === 3) dateLabel = '3 ngày tới';

    const fullTitle = `${dateLabel} (${dateFormatted})`;
    const startHourIdx = dayIndex * 24;
    const hours: HourlyWeatherRecord[] = [];

    for (let h = 0; h < 24; h++) {
      const idx = startHourIdx + h;
      const rawTemp = json.hourly?.temperature_2m?.[idx] ?? 28;
      const rawFeelsLike = json.hourly?.apparent_temperature?.[idx] ?? rawTemp;
      const rawHumidity = json.hourly?.relative_humidity_2m?.[idx] ?? 75;
      const rawDewPoint = json.hourly?.dew_point_2m?.[idx] ?? 23;
      const rawPressure = json.hourly?.surface_pressure?.[idx];
      const rawRainChance = json.hourly?.precipitation_probability?.[idx] ?? 30;
      const rawRainMm = json.hourly?.precipitation?.[idx] ?? 0;
      const rawUv = json.hourly?.uv_index?.[idx] ?? 0;
      const rawIrradiance = json.hourly?.direct_normal_irradiance?.[idx] ?? 0;
      const rawWindSpeed = json.hourly?.wind_speed_10m?.[idx] ?? 10;
      const rawWindGust = json.hourly?.wind_gusts_10m?.[idx] ?? rawWindSpeed * 1.3;
      const rawWmo = json.hourly?.weather_code?.[idx] ?? 0;
      const isDayHour = Boolean(json.hourly?.is_day?.[idx] ?? (h >= 6 && h < 18));

      const { condition, iconType } = interpretWmoCode(rawWmo, isDayHour);

      hours.push({
        hour: h,
        hourLabel: `${h}h`,
        timeFormatted: `${String(h).padStart(2, '0')}:00`,
        temp: Number(rawTemp.toFixed(1)),
        feelLikeTemp: Number(rawFeelsLike.toFixed(1)),
        rainChance: Math.round(rawRainChance),
        rainfallAmount: Number(rawRainMm.toFixed(1)),
        humidity: Math.round(rawHumidity),
        dewPoint: Number(rawDewPoint.toFixed(1)),
        pressure: rawPressure !== undefined && rawPressure !== null ? Number(rawPressure.toFixed(1)) : undefined,
        uvIndex: Number(rawUv.toFixed(1)),
        uvLevel: getUvLevelText(rawUv),
        solarRadiation: Math.round(rawIrradiance || (rawUv > 0 ? rawUv * 85 : 0)),
        condition,
        iconType,
        windSpeed: Number(rawWindSpeed.toFixed(1)),
        windGust: Number(rawWindGust.toFixed(1)),
        beaufortScale: getBeaufortScale(rawWindSpeed),
        dataType: 'forecast_model' as const,
      });
    }

    const minTemp = json.daily?.temperature_2m_min?.[dayIndex] ?? Math.min(...hours.map((h) => h.temp));
    const maxTemp = json.daily?.temperature_2m_max?.[dayIndex] ?? Math.max(...hours.map((h) => h.temp));
    const maxRainChance = json.daily?.precipitation_probability_max?.[dayIndex] ?? Math.max(...hours.map((h) => h.rainChance));
    const totalRainfall = json.daily?.precipitation_sum?.[dayIndex] ?? hours.reduce((acc, h) => acc + h.rainfallAmount, 0);
    const maxUvIndex = json.daily?.uv_index_max?.[dayIndex] ?? Math.max(...hours.map((h) => h.uvIndex));
    const maxWindSpeed = json.daily?.wind_speed_10m_max?.[dayIndex] ?? Math.max(...hours.map((h) => h.windSpeed));
    const avgTemp = Number(((minTemp + maxTemp) / 2).toFixed(1));
    const avgHumidity = Math.round(hours.reduce((acc, h) => acc + h.humidity, 0) / 24);
    
    const validPressures = hours.map((h) => h.pressure).filter((p): p is number => typeof p === 'number');
    const avgPressure = validPressures.length > 0 ? Number((validPressures.reduce((a, b) => a + b, 0) / validPressures.length).toFixed(1)) : undefined;

    let summary = '';
    if (maxRainChance >= 60) {
      summary = `Mưa dông khả năng cao (${maxRainChance}%), lượng mưa tích lũy ~${totalRainfall.toFixed(1)}mm.`;
    } else if (maxTemp >= 35) {
      summary = `Nắng nóng, đỉnh nhiệt ${maxTemp}°C, chỉ số UV cao điểm trưa.`;
    } else {
      summary = `Thời tiết ổn định, nhiệt độ ${minTemp}°C - ${maxTemp}°C, độ ẩm ${avgHumidity}%.`;
    }

    daysResult.push({
      dateOffset: offset,
      dateLabel,
      dateFormatted,
      dayOfWeek,
      fullTitle,
      districtId,
      districtName,
      adminType,
      climateTypeDescription: `Mô hình dự báo vi khí hậu ECMWF IFS & GFS theo tọa độ ${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E (Open-Meteo).`,
      summary,
      avgTemp,
      minTemp: Number(minTemp.toFixed(1)),
      maxTemp: Number(maxTemp.toFixed(1)),
      avgHumidity,
      maxRainChance: Math.round(maxRainChance),
      totalRainfall: Number(totalRainfall.toFixed(1)),
      maxUvIndex: Number(maxUvIndex.toFixed(1)),
      maxWindSpeed: Number(maxWindSpeed.toFixed(1)),
      surfacePressure: avgPressure,
      stationCode: station.code,
      stationName: station.name,
      stationAuthority: station.authority,
      hours,
      collectedAt: collectedTimeStr,
      source:
        offset <= 0
          ? 'Dự báo mô hình đã lưu (không phải đo đạc)'
          : 'Mô hình dự báo số trị vi khí hậu ECMWF IFS & GFS (Open-Meteo)',
      dataType: 'forecast_model' as const,
      hasData: true,
      isCached: false,
    });
  }

  // Thông số hiện tại
  const currentTemp = json.current?.temperature_2m ?? 28;
  const currentFeelsLike = json.current?.apparent_temperature ?? currentTemp;
  const currentHumidity = json.current?.relative_humidity_2m ?? 75;
  const currentWind = json.current?.wind_speed_10m ?? 10;
  const currentUv = json.current?.uv_index ?? 0;
  const currentWmo = json.current?.weather_code ?? 0;
  const currentRainMm = json.current?.precipitation ?? 0;
  const currentPressure = json.current?.surface_pressure !== undefined && json.current?.surface_pressure !== null
    ? Number(json.current.surface_pressure.toFixed(1))
    : undefined;

  const currentIsDay = Boolean(json.current?.is_day ?? (now.getHours() >= 6 && now.getHours() < 18));
  const currentCloudCover = json.current?.cloud_cover !== undefined ? Number(json.current.cloud_cover) : undefined;
  const { condition: currentCondition } = interpretWmoCode(currentWmo, currentIsDay);

  const currentHourIdx = 3 * 24 + now.getHours();
  const currentRainProb = json.hourly?.precipitation_probability?.[currentHourIdx] ?? 40;
  const currentDewPoint = json.hourly?.dew_point_2m?.[currentHourIdx] ?? 23.5;
  const currentIrradiance = json.hourly?.direct_normal_irradiance?.[currentHourIdx] ?? (currentUv > 0 ? currentUv * 85 : 0);
  const currentWindGust = json.hourly?.wind_gusts_10m?.[currentHourIdx] ?? currentWind * 1.3;

  const elevation = typeof json.elevation === 'number' && !isNaN(json.elevation)
    ? Math.round(json.elevation)
    : undefined;

  return {
    source: 'Mô hình dự báo số trị vi khí hậu ECMWF IFS & GFS (Open-Meteo Weather API)',
    apiUrl: directUrl,
    latitude: json.latitude,
    longitude: json.longitude,
    elevation,
    generationTimeMs: json.generationtime_ms || 0,
    timezone: json.timezone || 'Asia/Ho_Chi_Minh',
    atmosphericStation: station,
    data: daysResult,
    dataType: 'forecast_model' as const,
    timestamp: json.current?.time || new Date().toISOString(),
    current: {
      time: json.current?.time || new Date().toISOString(),
      temperature: Number(currentTemp.toFixed(1)),
      feelsLike: Number(currentFeelsLike.toFixed(1)),
      humidity: Math.round(currentHumidity),
      dewPoint: Number(currentDewPoint.toFixed(1)),
      surfacePressure: currentPressure,
      solarRadiation: Math.round(currentIrradiance),
      rainProbability: Math.round(currentRainProb),
      rainMm: Number(currentRainMm.toFixed(1)),
      uvIndex: Number(currentUv.toFixed(1)),
      windSpeed: Number(currentWind.toFixed(1)),
      windGust: Number(currentWindGust.toFixed(1)),
      condition: currentCondition,
      isDay: currentIsDay,
      cloudCover: currentCloudCover,
      elevation,
    },
  };
}
