import { DISTRICTS_DATA } from '../data/mockData';
import { UserLocation } from '../types';

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
 * Requests browser/device geolocation with a 2-stage strategy (High Accuracy -> Network Fallback)
 * and rich error diagnostics for permission issues or timeouts.
 */
export async function getCurrentUserLocation(): Promise<UserLocation> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !navigator || !navigator.geolocation) {
      const fallbackLat = 10.7769;
      const fallbackLng = 106.7009;
      const nearest = findNearestDistrict(fallbackLat, fallbackLng);
      resolve({
        lat: fallbackLat,
        lng: fallbackLng,
        altitude: 12,
        accuracy: 50,
        nearestDistrictId: nearest.districtId,
        nearestDistrictName: nearest.districtName,
        distanceKm: nearest.distanceKm,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        isRealGps: false,
        status: 'unsupported',
        errorMessage: 'Trình duyệt hoặc môi trường này chưa hỗ trợ tính năng định vị vị trí.',
      });
      return;
    }

    // Helper to format success
    const handleSuccess = (pos: GeolocationPosition) => {
      const lat = Math.round(pos.coords.latitude * 10000) / 10000;
      const lng = Math.round(pos.coords.longitude * 10000) / 10000;
      const altitude = pos.coords.altitude !== null && pos.coords.altitude !== undefined 
        ? Math.round(pos.coords.altitude) 
        : null;
      const nearest = findNearestDistrict(lat, lng);
      resolve({
        lat,
        lng,
        altitude,
        accuracy: Math.round(pos.coords.accuracy || 15),
        nearestDistrictId: nearest.districtId,
        nearestDistrictName: nearest.districtName,
        distanceKm: nearest.distanceKm,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        isRealGps: true,
        status: 'success',
      });
    };

    // Helper to handle final failure with informative message
    const handleFinalError = (err: GeolocationPositionError) => {
      let status: 'denied' | 'timeout' | 'unavailable' = 'unavailable';
      let msg = 'Không thể lấy tín hiệu GPS của thiết bị.';

      if (err.code === 1) { // PERMISSION_DENIED
        status = 'denied';
        msg = 'Bạn chưa cấp quyền truy cập vị trí (Vui lòng bật quyền Vị trí trên trình duyệt hoặc cài đặt ứng dụng).';
      } else if (err.code === 2) { // POSITION_UNAVAILABLE
        status = 'unavailable';
        msg = 'Tín hiệu GPS không khả dụng (Vui lòng bật định vị Vị trí / Location trên điện thoại).';
      } else if (err.code === 3) { // TIMEOUT
        status = 'timeout';
        msg = 'Hết thời gian chờ phản hồi GPS. Vui lòng thử lại ngoài trời hoặc tự chọn phường/xã từ danh sách.';
      }

      const fallbackLat = 10.7769;
      const fallbackLng = 106.7009;
      const nearest = findNearestDistrict(fallbackLat, fallbackLng);

      resolve({
        lat: fallbackLat,
        lng: fallbackLng,
        accuracy: 100,
        nearestDistrictId: nearest.districtId,
        nearestDistrictName: nearest.districtName,
        distanceKm: nearest.distanceKm,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        isRealGps: false,
        status,
        errorMessage: msg,
      });
    };

    // Try Stage 1: High Accuracy (GPS Satellites) with 5-second timeout
    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      (err) => {
        // If permission is denied, don't waste time trying again
        if (err.code === 1) {
          handleFinalError(err);
          return;
        }

        // Stage 2: Fallback to Network-based location (Cell towers / WiFi BSSID)
        navigator.geolocation.getCurrentPosition(
          handleSuccess,
          (stage2Err) => {
            handleFinalError(stage2Err);
          },
          {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 120000,
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
