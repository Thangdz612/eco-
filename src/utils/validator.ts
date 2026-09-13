/**
 * Module kiểm định tính hợp lệ của dữ liệu khí tượng và môi trường (Data Validator)
 * Đảm bảo dữ liệu từ API hoặc Cache là có cơ sở khoa học, không bị lỗi NaN, null bất thường,
 * hoặc sai lệch phạm vi địa lý.
 */

export interface ValidatedCoordinate {
  isValid: boolean;
  lat: number;
  lng: number;
  reason?: string;
}

/**
 * Kiểm tra tọa độ địa lý WGS-84
 */
export function validateCoordinates(lat: any, lng: any): ValidatedCoordinate {
  const numLat = Number(lat);
  const numLng = Number(lng);

  if (typeof numLat !== 'number' || isNaN(numLat) || !isFinite(numLat)) {
    return { isValid: false, lat: 0, lng: 0, reason: 'Vĩ độ không hợp lệ' };
  }
  if (typeof numLng !== 'number' || isNaN(numLng) || !isFinite(numLng)) {
    return { isValid: false, lat: 0, lng: 0, reason: 'Kinh độ không hợp lệ' };
  }
  if (numLat < -90 || numLat > 90) {
    return { isValid: false, lat: numLat, lng: numLng, reason: 'Vĩ độ vượt ngưỡng [-90, 90]' };
  }
  if (numLng < -180 || numLng > 180) {
    return { isValid: false, lat: numLat, lng: numLng, reason: 'Kinh độ vượt ngưỡng [-180, 180]' };
  }

  return { isValid: true, lat: numLat, lng: numLng };
}

/**
 * Kiểm tra nhiệt độ thời tiết (°C)
 */
export function validateTemperature(temp: any): { isValid: boolean; value: number | null } {
  if (temp === null || temp === undefined) {
    return { isValid: false, value: null };
  }
  const num = Number(temp);
  if (isNaN(num) || !isFinite(num)) {
    return { isValid: false, value: null };
  }
  // Phạm vi nhiệt độ khí hậu Trái Đất [-50°C .. 65°C]
  if (num < -50 || num > 65) {
    return { isValid: false, value: null };
  }
  return { isValid: true, value: Math.round(num * 10) / 10 };
}

/**
 * Kiểm tra độ ẩm tương đối (%)
 */
export function validateHumidity(hum: any): { isValid: boolean; value: number | null } {
  if (hum === null || hum === undefined) return { isValid: false, value: null };
  const num = Number(hum);
  if (isNaN(num) || !isFinite(num) || num < 0 || num > 100) {
    return { isValid: false, value: null };
  }
  return { isValid: true, value: Math.round(num) };
}

/**
 * Kiểm tra chỉ số US-AQI (0 .. 500)
 */
export function validateAqi(aqi: any): { isValid: boolean; value: number | null } {
  if (aqi === null || aqi === undefined) return { isValid: false, value: null };
  const num = Number(aqi);
  if (isNaN(num) || !isFinite(num) || num < 0 || num > 500) {
    return { isValid: false, value: null };
  }
  return { isValid: true, value: Math.round(num) };
}

/**
 * Kiểm tra nồng độ chất ô nhiễm (PM2.5, PM10, etc.) trong không khí (µg/m³)
 */
export function validatePollutantValue(val: any): number | null {
  if (val === null || val === undefined) return null;
  const num = Number(val);
  if (isNaN(num) || !isFinite(num) || num < 0 || num > 2000) return null;
  return Math.round(num * 10) / 10;
}

/**
 * Kiểm định phản hồi API Open-Meteo Weather
 */
export function validateOpenMeteoWeatherResponse(data: any): boolean {
  if (!data || typeof data !== 'object') return false;
  // Bắt buộc có thông số vị trí và dữ liệu theo giờ hoặc hiện tại
  if (typeof data.latitude !== 'number' || typeof data.longitude !== 'number') {
    return false;
  }
  if (!data.hourly && !data.current) {
    return false;
  }
  if (data.hourly && (!Array.isArray(data.hourly.time) || !Array.isArray(data.hourly.temperature_2m))) {
    return false;
  }
  return true;
}

/**
 * Kiểm định phản hồi API Open-Meteo Air Quality
 */
export function validateOpenMeteoAirQualityResponse(data: any): boolean {
  if (!data || typeof data !== 'object') return false;
  if (typeof data.latitude !== 'number' || typeof data.longitude !== 'number') {
    return false;
  }
  if (!data.current && !data.hourly) {
    return false;
  }
  return true;
}
