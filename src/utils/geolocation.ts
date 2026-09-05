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
 * Finds the closest district to the given coordinates
 */
export function findNearestDistrict(lat: number, lng: number): { districtId: string; districtName: string; distanceKm: number } {
  const districts = Object.values(DISTRICTS_DATA);
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
 * Requests browser geolocation with graceful error handling and fallback
 */
export async function getCurrentUserLocation(): Promise<UserLocation> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      // Fallback to simulated HCM City center
      const fallbackLat = 10.7769;
      const fallbackLng = 106.7009;
      const nearest = findNearestDistrict(fallbackLat, fallbackLng);
      resolve({
        lat: fallbackLat,
        lng: fallbackLng,
        altitude: 12,
        accuracy: 25,
        nearestDistrictId: nearest.districtId,
        nearestDistrictName: nearest.districtName,
        distanceKm: nearest.distanceKm,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        isRealGps: false,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
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
        });
      },
      (err) => {
        console.warn('Geolocation error or permission denied:', err.message);
        // Fallback to simulated location near Saigon center
        const fallbackLat = 10.7769;
        const fallbackLng = 106.7009;
        const nearest = findNearestDistrict(fallbackLat, fallbackLng);
        resolve({
          lat: fallbackLat,
          lng: fallbackLng,
          accuracy: 50,
          nearestDistrictId: nearest.districtId,
          nearestDistrictName: nearest.districtName,
          distanceKm: nearest.distanceKm,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          isRealGps: false,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 60000,
      }
    );
  });
}
