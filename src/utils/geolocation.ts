import { DISTRICTS_DATA } from '../data/mockData';
import { UserLocation } from '../types';

declare global {
  interface Window {
    Capacitor?: {
      isNativePlatform?: () => boolean;
      getPlatform?: () => string;
      [key: string]: any;
    };
  }
}

/**
 * Detect whether the app is running in a native Capacitor Android/iOS runtime
 */
export function isNativePlatform(): boolean {
  return typeof window !== 'undefined' && Boolean(window.Capacitor?.isNativePlatform?.());
}

/**
 * Tọa độ trung tâm mặc định (Quận 1, TP.HCM) dùng làm điểm chuẩn tham chiếu khí tượng và fallback
 */
export const DEFAULT_LOCATION = { lat: 10.7769, lng: 106.7009 };

/**
 * Service boundaries for Ho Chi Minh City metropolitan and ecological service coverage
 */
export const SERVICE_BOUNDS = { latMin: 8.5, latMax: 11.3, lngMin: 106.3, lngMax: 107.2 };

/**
 * Maximum acceptable distance in km to match a ward/commune station
 */
export const MAX_MATCH_DISTANCE_KM = 20;

/**
 * Accuracy thresholds in meters
 */
export const ACCURACY_GOOD_M = 100;
export const ACCURACY_POOR_M = 1000;

/**
 * Calculates distance in kilometers between two GPS coordinates using Haversine formula
 */
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

/**
 * Finds the closest district/ward to the given coordinates
 */
export function findNearestDistrict(lat: number, lng: number): { districtId: string; districtName: string; distanceKm: number } {
  const districts = Object.values(DISTRICTS_DATA);
  if (!districts.length) {
    return { districtId: 'quan-1', districtName: 'Phường Sài Gòn, Quận 1', distanceKm: 0 };
  }
  let closest = districts[0];
  let minDistance = calculateDistanceKm(lat, lng, closest.lat, closest.lng);

  for (let i = 1; i < districts.length; i++) {
    const d = districts[i];
    const dist = calculateDistanceKm(lat, lng, d.lat, d.lng);
    if (dist < minDistance) {
      minDistance = dist;
      closest = d;
    }
  }

  return {
    districtId: closest.id,
    districtName: closest.name,
    distanceKm: minDistance,
  };
}

/**
 * Evaluates raw coordinates, verifies whether coordinates are within service bounds and distance,
 * and builds a fully typed UserLocation object.
 */
export function evaluateUserLocation(
  coords: { latitude: number; longitude: number; altitude?: number | null; accuracy?: number | null },
  timestamp?: number,
  source: 'gps' | 'network' | 'default' = 'gps'
): UserLocation {
  const lat = Math.round(coords.latitude * 10000) / 10000;
  const lng = Math.round(coords.longitude * 10000) / 10000;
  const altitude = typeof coords.altitude === 'number' && Number.isFinite(coords.altitude)
    ? Math.round(coords.altitude)
    : null;
  const accuracy = typeof coords.accuracy === 'number' && Number.isFinite(coords.accuracy)
    ? Math.round(coords.accuracy)
    : undefined;

  const isStale = typeof timestamp === 'number' && Number.isFinite(timestamp)
    ? Date.now() - timestamp > 60000
    : false;

  const inBounds =
    lat >= SERVICE_BOUNDS.latMin &&
    lat <= SERVICE_BOUNDS.latMax &&
    lng >= SERVICE_BOUNDS.lngMin &&
    lng <= SERVICE_BOUNDS.lngMax;

  const nearest = findNearestDistrict(lat, lng);

  if (!inBounds || nearest.distanceKm > MAX_MATCH_DISTANCE_KM) {
    return {
      lat,
      lng,
      altitude,
      accuracy,
      distanceKm: nearest.distanceKm,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      isRealGps: false,
      status: 'out_of_region',
      errorMessage: 'Vị trí của bạn nằm ngoài khu vực phục vụ của ứng dụng (TP.HCM). Vui lòng chọn thủ công phường/xã.',
      isStale,
      source,
    };
  }

  return {
    lat,
    lng,
    altitude,
    accuracy,
    nearestDistrictId: nearest.districtId,
    nearestDistrictName: nearest.districtName,
    distanceKm: nearest.distanceKm,
    timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    isRealGps: true,
    status: 'success',
    isStale,
    source,
  };
}

/**
 * Check if the application is embedded in an iframe (e.g. AI Studio preview)
 */
export function isRunningInIframe(): boolean {
  try {
    return window.self !== window.top;
  } catch (_e) {
    return true;
  }
}

/**
 * Requests browser/device geolocation:
 * - When in native Capacitor (Android/iOS): uses @capacitor/geolocation plugin.
 * - When in Web or on plugin error: uses browser navigator.geolocation 2-stage fallback.
 */
export async function getCurrentUserLocation(): Promise<UserLocation> {
  // 1. Native Capacitor platform flow
  if (isNativePlatform()) {
    try {
      const { Geolocation } = await import('@capacitor/geolocation');
      let perm = await Geolocation.checkPermissions();
      if (perm.location !== 'granted' && perm.coarseLocation !== 'granted') {
        perm = await Geolocation.requestPermissions();
      }

      if (perm.location === 'denied' && perm.coarseLocation === 'denied') {
        return {
          lat: DEFAULT_LOCATION.lat,
          lng: DEFAULT_LOCATION.lng,
          accuracy: undefined,
          distanceKm: 0,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          isRealGps: false,
          status: 'denied',
          errorMessage: 'Quyền vị trí đã bị từ chối vĩnh viễn. Vui lòng mở Cài đặt thiết bị > Ứng dụng > EcoApp > Quyền và cấp quyền Vị trí (Location).',
          source: 'default',
        };
      }

      const pos = await Geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 8000 });
      return evaluateUserLocation(pos.coords, pos.timestamp, 'gps');
    } catch (err: any) {
      const errMsg = String(err?.message || err || '').toLowerCase();
      if (errMsg.includes('permission') || errMsg.includes('denied')) {
        return {
          lat: DEFAULT_LOCATION.lat,
          lng: DEFAULT_LOCATION.lng,
          accuracy: undefined,
          distanceKm: 0,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          isRealGps: false,
          status: 'denied',
          errorMessage: 'Quyền vị trí đã bị từ chối. Vui lòng mở Cài đặt thiết bị > Ứng dụng > EcoApp > Quyền và cấp quyền Vị trí.',
          source: 'default',
        };
      }
      if (
        errMsg.includes('disabled') ||
        errMsg.includes('location services') ||
        errMsg.includes('provider') ||
        errMsg.includes('unavailable')
      ) {
        return {
          lat: DEFAULT_LOCATION.lat,
          lng: DEFAULT_LOCATION.lng,
          accuracy: undefined,
          distanceKm: 0,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          isRealGps: false,
          status: 'unavailable',
          errorMessage: 'Dịch vụ vị trí (GPS) trên thiết bị chưa được bật. Vui lòng bật Vị trí / GPS trong Cài đặt nhanh.',
          source: 'default',
        };
      }
      if (errMsg.includes('timeout')) {
        return {
          lat: DEFAULT_LOCATION.lat,
          lng: DEFAULT_LOCATION.lng,
          accuracy: undefined,
          distanceKm: 0,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          isRealGps: false,
          status: 'timeout',
          errorMessage: 'Hết thời gian chờ phản hồi GPS. Vui lòng thử lại ngoài trời hoặc tự chọn phường/xã.',
          source: 'default',
        };
      }
      console.warn('Native Geolocation plugin error, falling back to navigator:', err);
    }
  }

  // 2. Web / Browser fallback flow (2-stage)
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !navigator || !navigator.geolocation) {
      resolve({
        lat: DEFAULT_LOCATION.lat,
        lng: DEFAULT_LOCATION.lng,
        altitude: 12,
        accuracy: undefined,
        distanceKm: 0,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        isRealGps: false,
        status: 'unsupported',
        errorMessage: 'Trình duyệt hoặc thiết bị này chưa hỗ trợ tính năng định vị GPS.',
        source: 'default',
      });
      return;
    }

    // Helper to format success
    const handleSuccess = (pos: GeolocationPosition, source: 'gps' | 'network') => {
      const loc = evaluateUserLocation(pos.coords, pos.timestamp, source);
      resolve(loc);
    };

    // Helper to handle final failure with informative message
    const handleFinalError = (err: GeolocationPositionError) => {
      let status: 'denied' | 'timeout' | 'unavailable' = 'unavailable';
      const inIframe = isRunningInIframe();
      let msg = 'Không thể lấy tín hiệu GPS của thiết bị.';

      if (err.code === 1) { // PERMISSION_DENIED
        status = 'denied';
        if (inIframe) {
          msg = 'Khung xem trước (iFrame) bị trình duyệt chặn hộp thoại cấp quyền vị trí. Vui lòng mở trong Tab mới hoặc chọn thủ công phường/xã.';
        } else {
          msg = 'Quyền vị trí bị chặn trong cài đặt trình duyệt. Hãy bấm biểu tượng 🔒 cạnh URL để cho phép, hoặc chọn thủ công xã/phường.';
        }
      } else if (err.code === 2) { // POSITION_UNAVAILABLE
        status = 'unavailable';
        msg = 'Tín hiệu GPS không khả dụng (Vui lòng bật tính năng Vị trí / GPS trong cài đặt thiết bị).';
      } else if (err.code === 3) { // TIMEOUT
        status = 'timeout';
        msg = 'Hết thời gian chờ phản hồi GPS. Vui lòng thử lại ngoài trời hoặc tự chọn phường/xã từ danh sách.';
      }

      resolve({
        lat: DEFAULT_LOCATION.lat,
        lng: DEFAULT_LOCATION.lng,
        accuracy: undefined,
        distanceKm: 0,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        isRealGps: false,
        status,
        errorMessage: msg,
        source: 'default',
      });
    };

    // Try Stage 1: High Accuracy (GPS Satellites) with 5-second timeout
    navigator.geolocation.getCurrentPosition(
      (pos) => handleSuccess(pos, 'gps'),
      (err) => {
        // If permission is denied, don't waste time trying again
        if (err.code === 1) {
          handleFinalError(err);
          return;
        }

        // Stage 2: Fallback to Network-based location (Cell towers / WiFi BSSID)
        navigator.geolocation.getCurrentPosition(
          (pos) => handleSuccess(pos, 'network'),
          (stage2Err) => {
            handleFinalError(stage2Err);
          },
          {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 60000,
          }
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 30000,
      }
    );
  });
}

/**
 * Shared helper to request geolocation permission across Web and Capacitor native app
 */
export async function requestGeolocationPermission(): Promise<{
  granted: boolean;
  status: 'granted' | 'denied' | 'prompt' | 'unavailable' | 'unsupported';
  message: string;
}> {
  if (isNativePlatform()) {
    try {
      const { Geolocation } = await import('@capacitor/geolocation');
      let perm = await Geolocation.checkPermissions();
      if (perm.location !== 'granted' && perm.coarseLocation !== 'granted') {
        perm = await Geolocation.requestPermissions();
      }
      if (perm.location === 'granted' || perm.coarseLocation === 'granted') {
        return {
          granted: true,
          status: 'granted',
          message: 'Đã cấp quyền GPS thành công trên thiết bị!',
        };
      }
      if (perm.location === 'denied' && perm.coarseLocation === 'denied') {
        return {
          granted: false,
          status: 'denied',
          message: 'Quyền vị trí đã bị từ chối vĩnh viễn. Vui lòng mở Cài đặt thiết bị > Ứng dụng > EcoApp > Quyền và cấp quyền Vị trí.',
        };
      }
      return {
        granted: false,
        status: 'denied',
        message: 'Chưa cấp quyền vị trí cho ứng dụng.',
      };
    } catch (err: any) {
      console.warn('Native permission request notice:', err);
    }
  }

  // Web / Browser fallback flow
  if (typeof window === 'undefined' || !navigator || !navigator.geolocation) {
    return {
      granted: false,
      status: 'unsupported',
      message: 'Trình duyệt hoặc thiết bị này không hỗ trợ định vị GPS.',
    };
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      () => {
        resolve({
          granted: true,
          status: 'granted',
          message: 'Đã cấp quyền GPS thành công!',
        });
      },
      (error) => {
        if (error.code === 1) { // PERMISSION_DENIED
          const msg = isRunningInIframe()
            ? 'Khung xem trước (iFrame) bị trình duyệt chặn hộp thoại cấp quyền vị trí. Vui lòng mở trong Tab mới hoặc cấp quyền trên thanh địa chỉ URL.'
            : 'Quyền định vị đã bị từ chối trong cài đặt trình duyệt.';
          resolve({
            granted: false,
            status: 'denied',
            message: msg,
          });
        } else if (error.code === 2) {
          resolve({
            granted: false,
            status: 'unavailable',
            message: 'Tín hiệu GPS không khả dụng. Vui lòng bật tính năng Vị trí / GPS trên thiết bị.',
          });
        } else {
          resolve({
            granted: false,
            status: 'prompt',
            message: `Không thể kết nối GPS: ${error.message}`,
          });
        }
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  });
}
