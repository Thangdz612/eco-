export type TabType = 'weather' | 'environment' | 'enterprise' | 'protection' | 'settings';

export type DeviceScreenType = 'mobile' | 'mobile-lg' | 'tablet' | 'desktop' | 'responsive';

export type ThemeMode = 'system' | 'light' | 'dark';

// Phân loại nguồn dữ liệu theo nguyên tắc khoa học & kiểm chứng
export type DataVerificationType = 'observation' | 'forecast_model' | 'simulation';

export interface AirQualityPollutant {
  code: 'pm2_5' | 'pm10' | 'o3' | 'no2' | 'so2' | 'co';
  name: string; // Tên chất ô nhiễm
  formula: string; // Ký hiệu hóa học: PM2.5, PM10, O3, NO2, SO2, CO
  value: number | null; // Nồng độ số đo thực hoặc null nếu thiếu
  unit: string; // 'µg/m³'
  status: string; // 'Tốt' | 'Trung bình' | 'Kém' | 'Xấu' | 'Rất xấu' | 'Nguy hại' | 'Không có dữ liệu'
  benchmark: string; // Ngưỡng quy chuẩn QCVN 05:2023/BTNMT
  evaluation: string;
}

export interface AirQualityData {
  aqi: number | null; // US-AQI (0-500)
  europeanAqi?: number | null;
  status: string; // 'Tốt' | 'Trung bình' | 'Kém' | 'Không lành mạnh' | 'Rất xấu' | 'Nguy hại' | 'Không có dữ liệu'
  categoryText: string;
  colorHex: string;
  pollutants: {
    pm2_5: number | null;
    pm10: number | null;
    o3: number | null;
    no2: number | null;
    so2: number | null;
    co: number | null;
  };
  details: AirQualityPollutant[];
  source: string; // Nguồn dữ liệu kiểm chứng
  dataType: DataVerificationType; // 'forecast_model' | 'observation'
  timestamp: string; // Thời gian cập nhật
  apiUrl: string;
  isAvailable: boolean;
  errorMessage?: string;
}

export interface UserLocation {
  lat: number;
  lng: number;
  altitude?: number | null;
  accuracy?: number;
  nearestDistrictId?: string;
  nearestDistrictName?: string;
  distanceKm: number;
  timestamp: string;
  isRealGps: boolean;
  status?: 'success' | 'denied' | 'timeout' | 'unavailable' | 'unsupported' | 'out_of_region';
  errorMessage?: string;
  isStale?: boolean;
  source?: 'gps' | 'network' | 'default';
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
    // Thuộc tính kiểm chứng & thời gian thực
    timestamp?: string;
    source?: string;
    dataType?: DataVerificationType;
    isLive?: boolean;
    dewPoint?: string;
    surfacePressure?: string;
    windSpeed?: string;
    windGust?: string;
    rainProbability?: number;
    rainfallMm?: number;
  };
  airQuality?: AirQualityData;
  biodiversity: {
    dataOrigin?: 'field_inventory' | 'reference_sample' | 'no_local_data';
    dataSource?: string;
    lastSurveyYear?: string;
    underwater: { count: number; status: string; highlights: string[]; recordType?: 'recorded' | 'estimated' | 'actual_total' };
    terrestrial: { count: number; status: string; highlights: string[]; recordType?: 'recorded' | 'estimated' | 'actual_total' };
    aerial: { count: number; status: string; highlights: string[]; recordType?: 'recorded' | 'estimated' | 'actual_total' };
    amphibian: { count: number; status: string; highlights: string[]; recordType?: 'recorded' | 'estimated' | 'actual_total' };
  };
  environmentIndexes: {
    air?: {
      value: string;
      quality: string;
      progress: number;
      note: string;
      aqi?: number;
      pm25?: string;
    };
    water: { value: string; quality: string; progress: number; note: string };
    light: { value: string; quality: string; progress: number; note: string };
    geology: {
      value: string;
      quality: string;
      progress?: number;
      note: string;
      formationInfo?: string; // 1. Thông tin địa chất & tầng trầm tích
      elevationDem?: string; // 2. Địa hình/độ cao DEM (m so với MSL, vệ tinh SRTM/Copernicus)
      subsidenceRate?: string; // 3. Sụt lún / chuyển động mặt đất (InSAR Sentinel-1 hoặc 'Chưa có mốc đo thực địa')
      source?: string;
      timestamp?: string;
      isSatelliteModel?: boolean;
    };
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

export type CommercialStatusType = 'permitted_free' | 'conditional_farming' | 'strictly_prohibited';

export interface SpeciesItem {
  id: string;
  name: string;
  scientificName: string;
  realm: 'underwater' | 'aerial' | 'terrestrial' | 'amphibian';
  realmLabel: string;
  group: string;
  conservationStatus: string;
  statusType: 'normal' | 'rare' | 'vulnerable' | 'endangered' | 'critical';
  habitat: string;
  keyFeature: string;
  keyFeatures?: string;
  ecologicalRole: string;
  imageUrl?: string;
  // Khả năng kinh doanh & Khung pháp lý
  commercialStatus?: CommercialStatusType;
  commercialLabel?: string;
  commercialProducts?: string[];
  commercialFarmingLocation?: string;
  legalFramework?: string;
  economicValue?: string;
  commercialNotes?: string;
  // Phân loại khoa học & nguồn dữ liệu kiểm chứng
  recordType?: 'recorded' | 'estimated' | 'actual_total';
  recordTypeLabel?: string; // 'Loài được ghi nhận' | 'Ước tính số loài' | 'Tổng số loài thực tế'
  recordedLocation?: string; // Vị trí ghi nhận cụ thể
  recordedYear?: string; // Năm / Thời gian ghi nhận
  source?: string; // Nguồn dữ liệu (Sách Đỏ, GBIF, BQL Cần Giờ, VQG Côn Đảo...)
  verificationMethod?: string; // Phương pháp điều tra (Khảo sát thực địa, mẫu tiêu bản, bẫy ảnh...)
}

export interface ModalContent {
  title: string;
  category: string;
  description: string;
  details: string[];
  tips?: string[];
  type?: 'bio' | 'alert' | 'env' | 'response' | 'waste' | 'community' | 'enterprise';
  imageUrl?: string;
  speciesList?: SpeciesItem[];
  speciesData?: SpeciesItem;
  sections?: {
    title: string;
    icon?: string;
    items: { label: string; value: string; highlight?: boolean }[];
  }[];
}
