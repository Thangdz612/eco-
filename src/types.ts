export type TabType = 'weather' | 'environment' | 'enterprise' | 'protection';

export type DeviceScreenType = 'mobile' | 'mobile-lg' | 'tablet' | 'desktop' | 'responsive';

export type ThemeMode = 'system' | 'light' | 'dark';

export interface UserLocation {
  lat: number;
  lng: number;
  altitude?: number | null;
  accuracy?: number;
  nearestDistrictId: string;
  nearestDistrictName: string;
  distanceKm: number;
  timestamp: string;
  isRealGps: boolean;
  status?: 'success' | 'denied' | 'timeout' | 'unavailable' | 'unsupported';
  errorMessage?: string;
}

export interface DistrictData {
  id: string;
  name: string;
  subTitle: string;
  districtGroup?: string;
  adminType?: 'phường' | 'xã' | 'đặc khu';
  lat: number;
  lng: number;
  weather: {
    temp: string;
    condition: string;
    description: string;
    humidity: string;
    altitude: string;
    uvIndex: string;
    uvLevel: string;
    lightIntensity: string;
    statusAssessment: string;
    statusDetail: string;
  };
  biodiversity: {
    underwater: { count: number; status: string; highlights: string[] };
    terrestrial: { count: number; status: string; highlights: string[] };
    aerial: { count: number; status: string; highlights: string[] };
    amphibian: { count: number; status: string; highlights: string[] };
  };
  environmentIndexes: {
    water: { value: string; quality: string; progress: number; note: string };
    light: { value: string; quality: string; progress: number; note: string };
    geology: { value: string; quality: string; progress: number; note: string };
  };
  alerts: {
    weatherAlert: {
      title: string;
      desc: string;
      level: 'warning' | 'info' | 'danger';
      actionAdvice: string;
    };
    environmentAlert: {
      title: string;
      desc: string;
      level: 'warning' | 'info' | 'danger';
      actionAdvice: string;
    };
  };
  enterprise: {
    assessmentTitle: string;
    assessmentSubtitle: string;
    geologyImpact: { levelText: string; percent: number; status: 'low' | 'medium' | 'high' };
    waterImpact: { levelText: string; percent: number; status: 'low' | 'medium' | 'high' };
    airImpact: { levelText: string; percent: number; status: 'low' | 'medium' | 'high' };
    ecoProductionGuideline: string;
  };
  protection: {
    assessmentTitle: string;
    assessmentSubtitle: string;
    wasteStatus: {
      pollution: string;
      sorting: string;
      collection: string;
      wasteToFuel: string;
    };
    communityEvents: {
      volunteering: string;
      campaign: string;
    };
  };
}

export interface ModalContent {
  title: string;
  category: string;
  description: string;
  details: string[];
  tips?: string[];
  type?: 'bio' | 'alert' | 'env' | 'response' | 'waste' | 'community' | 'enterprise';
}
