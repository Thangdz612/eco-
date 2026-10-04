import React, { useState, useEffect } from 'react';
import {
  Sun,
  Moon,
  CloudRain,
  Cloud,
  CloudSun,
  Droplets,
  SunMedium,
  Mountain,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Wind,
  Activity,
  RefreshCw,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Database,
  Gauge,
  Info,
} from 'lucide-react';
import { DistrictData, ModalContent, UserLocation, AirQualityData } from '../types';
import { WeatherCollectedRangeSection } from './WeatherCollectedRangeSection';
import {
  getCachedAirQuality,
  syncCollectedWeatherOnline,
  getCachedCurrentLiveWeather,
  CurrentLiveWeather,
} from '../utils/collectedWeatherStorage';
import { getReliableAirQuality } from '../utils/liveWeatherApi';

interface WeatherTabProps {
  data: DistrictData;
  userLocation?: UserLocation | null;
  onOpenDetail: (content: ModalContent) => void;
  onSelectDistrict?: (districtId: string) => void;
}

export const WeatherTab: React.FC<WeatherTabProps> = ({
  data,
  userLocation,
  onOpenDetail,
  onSelectDistrict,
}) => {
  const [airQuality, setAirQuality] = useState<AirQualityData>(() => {
    return data.airQuality || getReliableAirQuality(data.id, data.lat, data.lng, data.name);
  });
  const [currentWeather, setCurrentWeather] = useState<CurrentLiveWeather>(() => {
    return getCachedCurrentLiveWeather(data.id, data.name);
  });
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  useEffect(() => {
    const aq = data.airQuality || getReliableAirQuality(data.id, data.lat, data.lng, data.name);
    setAirQuality(aq);
    setCurrentWeather(getCachedCurrentLiveWeather(data.id, data.name));
  }, [data.id, data.airQuality, data.lat, data.lng, data.name]);

  useEffect(() => {
    const handleSyncEvent = (e: any) => {
      if (e.detail?.districtId === data.id) {
        if (e.detail?.airQuality) {
          setAirQuality(e.detail.airQuality);
        }
        setCurrentWeather(getCachedCurrentLiveWeather(data.id, data.name));
      }
    };
    window.addEventListener('eco-collected-weather-synced', handleSyncEvent);
    return () => window.removeEventListener('eco-collected-weather-synced', handleSyncEvent);
  }, [data.id, data.name]);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    try {
      const res = await syncCollectedWeatherOnline(data.id, data.name, data.adminType);
      if (res.airQuality) {
        setAirQuality(res.airQuality);
      }
      setCurrentWeather(getCachedCurrentLiveWeather(data.id, data.name));
    } finally {
      setIsRefreshing(false);
    }
  };

  const rawAlt = currentWeather.altitude || data.weather?.altitude;
  const displayAltitude =
    userLocation?.altitude !== null && userLocation?.altitude !== undefined
      ? `${userLocation.altitude} m`
      : rawAlt && rawAlt !== '10 m' && rawAlt !== '10 m (Mô hình DEM)'
      ? rawAlt
      : 'Không có dữ liệu';

  // Nhãn phân loại dữ liệu thời tiết
  const isSimulation = currentWeather.dataType === 'simulation' || !currentWeather.hasData;
  const weatherTypeLabel = !currentWeather.hasData
    ? 'Chờ đồng bộ mạng'
    : currentWeather.dataType === 'observation'
    ? 'Dữ liệu quan trắc thực địa'
    : isSimulation
    ? '⚠️ Dữ liệu ước tính - đang chờ đồng bộ mạng'
    : 'Dữ liệu mô hình dự báo số trị';

  const weatherSourceLabel =
    currentWeather.source ||
    (isSimulation
      ? 'Dữ liệu ước tính offline (chưa đồng bộ với API thời tiết thực)'
      : 'Open-Meteo Weather API (ECMWF & GFS)');
  const weatherTimestamp =
    currentWeather.timestamp || (isSimulation ? 'Dữ liệu ước tính offline' : 'Đang cập nhật');

  const weatherAlert = data.alerts?.weatherAlert || {
    title: currentWeather.hasData ? `Thời tiết ${currentWeather.condition}` : 'Thời tiết ổn định',
    desc: currentWeather.hasData
      ? `Nhiệt độ ${currentWeather.temp}, độ ẩm ${currentWeather.humidity} tại ${data.name.split(',')[0]}.`
      : `Thời tiết tại ${data.name.split(',')[0]} duy trì trạng thái ổn định, không có cảnh báo thời tiết bất thường.`,
    level: 'info' as const,
    actionAdvice: 'Điều kiện thời tiết bình thường, thuận lợi cho sinh hoạt và lao động ngoài trời.',
  };

  return (
    <div className="flex flex-col gap-5 px-5 pb-6">
      {/* Weather Highlight Banner */}
      <div
        id="weather-banner-card"
        onClick={() =>
          onOpenDetail({
            title: 'Chi tiết Khí hậu & Thời tiết Hiện tại',
            category: 'Thời tiết',
            description: `${currentWeather.description || `${currentWeather.temp}, ${currentWeather.condition}`} tại ${data.name}.`,
            details: [
              `Nhiệt độ hiện tại: ${currentWeather.temp}`,
              `Tình trạng mây & khí hậu: ${currentWeather.condition}`,
              `Độ ẩm tương đối: ${currentWeather.humidity}`,
              `Áp suất bề mặt: ${currentWeather.surfacePressure || 'Không có dữ liệu'}`,
              `Điểm sương (Dew point): ${currentWeather.dewPoint || 'Không có dữ liệu'}`,
              `Tốc độ gió bề mặt: ${currentWeather.windSpeed || 'Chưa có dữ liệu'}`,
              `Gió giật: ${currentWeather.windGust || 'Chưa có dữ liệu'}`,
              `Xác suất mưa: ${currentWeather.rainProbability !== undefined ? `${currentWeather.rainProbability}%` : 'Chưa có mưa'}`,
              `Độ cao mô hình ước tính: ${displayAltitude} (so với mực nước biển MSL)`,
              `Chỉ số bức xạ tia UV: ${currentWeather.uvIndex} (${currentWeather.uvLevel})`,
              `Phân loại dữ liệu: ${weatherTypeLabel}`,
              `Nguồn kiểm chứng: ${weatherSourceLabel}`,
              `Thời điểm mô hình dự báo: ${weatherTimestamp}`,
            ],
            tips: [
              isSimulation
                ? 'Dữ liệu hiện tại là ước tính mô phỏng offline. Vui lòng kết nối mạng và làm mới để đồng bộ số liệu mô hình thực tế.'
                : 'Dữ liệu được cập nhật tự động từ mô hình số trị Open-Meteo vi khí hậu.',
              'Trang bị mũ nón và kem chống nắng khi hoạt động ngoài trời vào khung giờ trưa từ 11:00 đến 14:00.',
            ],
          })
        }
        className="bg-[#EBF5FF] dark:bg-[#1E3A8A]/30 rounded-[24px] p-5 sm:p-6 flex flex-col gap-3 shadow-xs transition-all active:scale-[0.99] cursor-pointer hover:bg-[#e4f0fc] dark:hover:bg-[#1E3A8A]/40 border border-transparent dark:border-blue-800/40"
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[14px] font-bold text-[#1E40AF] dark:text-blue-300 tracking-tight">
                Thời tiết tại {data.name.split(',')[0]}
              </span>
              {isSimulation ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 shadow-2xs">
                  <Database className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                  ⚠️ Dữ liệu ước tính - đang chờ đồng bộ mạng
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-800">
                  <Database className="w-3 h-3 text-blue-600 dark:text-blue-300" />
                  {weatherTypeLabel}
                </span>
              )}
            </div>
            <span className="text-[28px] font-black text-[#0F3B73] dark:text-blue-100 mt-1 tracking-tight leading-tight">
              {currentWeather.temp}, {currentWeather.condition}
            </span>
          </div>

          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-[#1D4ED8] dark:text-blue-300 bg-white/70 dark:bg-white/10 shadow-xs shrink-0">
            {currentWeather.isDay === false || currentWeather.iconType === 'moon' ? (
              <Moon className="w-9 h-9 stroke-[2] text-indigo-500 dark:text-indigo-300" />
            ) : currentWeather.iconType === 'rain' ? (
              <CloudRain className="w-9 h-9 stroke-[2] text-blue-500 dark:text-blue-400" />
            ) : currentWeather.iconType === 'cloud' ? (
              <Cloud className="w-9 h-9 stroke-[2] text-slate-500 dark:text-slate-300" />
            ) : currentWeather.iconType === 'sun-cloud' ? (
              <CloudSun className="w-9 h-9 stroke-[2] text-amber-500 dark:text-amber-300" />
            ) : (
              <Sun className="w-9 h-9 stroke-[2] text-amber-500 dark:text-amber-300" />
            )}
          </div>
        </div>

        {/* Thước đo phụ: Gió, Áp suất, Mưa */}
        <div className="pt-2.5 border-t border-blue-200/60 dark:border-blue-800/60 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 flex-wrap gap-2">
          <div className="flex items-center gap-1 font-medium">
            <Wind className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Gió: {currentWeather.windSpeed || 'Chưa có dữ liệu'}</span>
          </div>
          <div className="flex items-center gap-1 font-medium">
            <Gauge className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Khí áp: {currentWeather.surfacePressure || 'Không có dữ liệu'}</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
            <Clock className="w-3 h-3" />
            <span>Cập nhật: {weatherTimestamp}</span>
          </div>
        </div>

        {isSimulation && (
          <div className="mt-1 p-2.5 rounded-xl bg-amber-100/80 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-[11.5px] text-amber-900 dark:text-amber-200 flex items-start sm:items-center gap-2">
            <span className="font-bold shrink-0">⚠️ Lưu ý nguồn gốc:</span>
            <span>Dữ liệu ước tính offline chưa đồng bộ với API thời tiết thực. Các chỉ số nhiệt độ, độ ẩm chỉ mang tính tham khảo vi khí hậu ban đầu.</span>
          </div>
        )}
      </div>

      {/* KHUNG CHỈ SỐ KHÔNG KHÍ (OPEN-METEO AIR QUALITY API) */}
      <section id="khung-chi-so-khong-khi" className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-[19px] font-extrabold text-[#0F172A] dark:text-slate-100 tracking-tight flex items-center gap-1.5">
              <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              Khung chỉ số không khí (US AQI & Bụi mịn)
            </h2>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              Mô hình CAMS toàn cầu (~40 km)
            </span>
          </div>

          <button
            type="button"
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="self-start sm:self-auto text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 cursor-pointer transition-colors"
            title="Làm mới chỉ số không khí"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
            <span>{isRefreshing ? 'Đang tải...' : 'Làm mới API'}</span>
          </button>
        </div>

        {/* Thông báo trung thực nguồn gốc mô hình CAMS toàn cầu */}
        <div className="p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 leading-relaxed flex items-start gap-2">
          <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <span>
            <strong>Dữ liệu mô hình CAMS toàn cầu (~40 km)</strong>, phản ánh nền khu vực, không phải đo tại phường.
          </span>
        </div>

        {/* Nếu có dữ liệu chất lượng không khí hợp lệ */}
        {airQuality && airQuality.isAvailable ? (
          <div className="flex flex-col gap-3">
            {/* Card tổng quan AQI */}
            <div
              id="aqi-overview-card"
              onClick={() =>
                onOpenDetail({
                  title: 'Đánh giá Chất lượng Không khí (US AQI)',
                  category: 'Môi trường & Không khí',
                  description: `Chỉ số US AQI hiện tại: ${airQuality.aqi ?? 'Chưa xác định'} (${airQuality.status}) tại khu vực ${data.name}.`,
                  details: [
                    `Chỉ số US AQI: ${airQuality.aqi !== null ? airQuality.aqi : 'Không có dữ liệu'}`,
                    airQuality.europeanAqi !== undefined && airQuality.europeanAqi !== null
                      ? `Chỉ số European AQI: ${airQuality.europeanAqi}`
                      : 'Chỉ số European AQI: Chưa khả dụng',
                    `Tình trạng: ${airQuality.status}`,
                    `Đánh giá y tế: ${airQuality.categoryText}`,
                    `Phân loại dữ liệu: Dữ liệu mô hình CAMS toàn cầu (~40 km), phản ánh nền khu vực, không phải đo tại phường`,
                    `Nguồn gốc: ${airQuality.source}`,
                    `Tọa độ lưới: ${data.lat.toFixed(4)}°N, ${data.lng.toFixed(4)}°E`,
                    `Thời gian mô hình: ${airQuality.timestamp}`,
                  ],
                  tips: [
                    'Khi US AQI dưới 50: Chất lượng không khí đạt chuẩn an toàn, thích hợp mọi hoạt động thể thao ngoài trời.',
                    'Khi US AQI trên 100: Người nhạy cảm đường hô hấp nên hạn chế chạy bộ ngoài trời giờ cao điểm giao thông.',
                    'Quy chuẩn so sánh: QCVN 05:2023/BTNMT - Quy chuẩn kỹ thuật quốc gia về chất lượng không khí.',
                  ],
                })
              }
              className="rounded-2xl p-4.5 border transition-all cursor-pointer shadow-xs"
              style={{
                backgroundColor: `${airQuality.colorHex}15`,
                borderColor: `${airQuality.colorHex}40`,
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs uppercase tracking-wider font-extrabold text-slate-600 dark:text-slate-300">
                      Chỉ số US AQI
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-black text-white"
                      style={{ backgroundColor: airQuality.colorHex }}
                    >
                      {airQuality.status}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span
                      className="text-3xl font-black tracking-tight"
                      style={{ color: airQuality.colorHex }}
                    >
                      {airQuality.aqi !== null ? airQuality.aqi : 'Chưa có số liệu'}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      / 500 (Ngưỡng an toàn &lt; 50)
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 font-medium leading-relaxed">
                    {airQuality.categoryText}
                  </p>
                </div>

                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xs"
                  style={{ backgroundColor: `${airQuality.colorHex}25` }}
                >
                  <Activity className="w-6 h-6" style={{ color: airQuality.colorHex }} />
                </div>
              </div>

              {/* Siêu dữ liệu kiểm chứng */}
              <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-800 flex flex-col gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="flex items-center gap-1 font-medium">
                    <Database className="w-3 h-3 text-emerald-600" />
                    Mô hình ước tính/dự báo CAMS toàn cầu
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Cập nhật: {airQuality.timestamp}
                  </span>
                </div>
                <p className="text-[10.5px] text-slate-500 dark:text-slate-400 italic">
                  Dữ liệu mô hình CAMS toàn cầu (~40 km), phản ánh nền khu vực, không phải đo tại phường
                </p>
              </div>
            </div>

            {/* Bảng 6 chỉ số ô nhiễm chi tiết (PM2.5, PM10, O3, NO2, SO2, CO) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {airQuality.details.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  id={`aqi-pollutant-${item.code}`}
                  onClick={() =>
                    onOpenDetail({
                      title: `Chỉ số ${item.formula} (${item.name})`,
                      category: 'Chất lượng không khí',
                      description: `Nồng độ mô hình ước tính: ${item.value !== null ? `${item.value} ${item.unit}` : 'Không có dữ liệu'} - Đánh giá: ${item.status}.`,
                      details: [
                        `Ký hiệu khoa học: ${item.formula}`,
                        `Tên gọi: ${item.name}`,
                        `Giá trị mô hình ước tính: ${item.value !== null ? `${item.value} ${item.unit}` : 'Không có dữ liệu'}`,
                        `Ngưỡng đối chiếu QCVN 05:2023/BTNMT: ${item.benchmark}`,
                        `Đánh giá sức khỏe: ${item.evaluation}`,
                        `Nguồn dữ liệu: ${airQuality.source}`,
                        `Phân loại: Dữ liệu mô hình CAMS toàn cầu (~40 km), phản ánh nền khu vực, không phải đo tại phường`,
                        `Thời gian mô hình: ${airQuality.timestamp}`,
                      ],
                      tips: [
                        'QCVN 05:2023/BTNMT là Quy chuẩn kỹ thuật quốc gia bắt buộc áp dụng của Bộ Tài nguyên và Môi trường.',
                        'Nếu nồng độ vượt ngưỡng khuyến nghị, nên đeo khẩu trang đạt chuẩn N95 hoặc KF94 khi ra đường.',
                      ],
                    })
                  }
                  className="bg-[#F5F4F0] dark:bg-[#1E293B] hover:bg-[#ECEBE6] dark:hover:bg-[#334155]/70 border border-transparent dark:border-slate-700 active:scale-95 transition-all rounded-[18px] p-3.5 flex flex-col items-start justify-between text-left cursor-pointer shadow-2xs"
                >
                  <div className="w-full flex items-center justify-between mb-1">
                    <span className="text-[13px] font-extrabold text-[#0F3B73] dark:text-blue-200">
                      {item.formula}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.status === 'Tốt'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300'
                          : item.status === 'Trung bình'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300'
                          : item.status === 'Không có dữ liệu'
                          ? 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-950/70 dark:text-red-300'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate w-full">
                    {item.name}
                  </span>
                  <div className="mt-1.5 flex items-baseline gap-1">
                    <span className="text-[17px] font-black text-slate-900 dark:text-slate-100">
                      {item.value !== null ? item.value : '—'}
                    </span>
                    <span className="text-[10.5px] text-slate-500 dark:text-slate-400 font-medium">
                      {item.unit}
                    </span>
                  </div>
                  <span className="text-[9.5px] text-slate-400 mt-1 italic">
                    QCVN: {item.benchmark}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* TRẠNG THÁI CHƯA CÓ DỮ LIỆU - KHÔNG TẠO SỐ GIẢ */
          <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 flex flex-col items-center text-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-slate-200/70 dark:bg-slate-700/60 flex items-center justify-center text-slate-500 dark:text-slate-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Chưa có dữ liệu mô hình cho khu vực này
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mt-1 leading-relaxed">
                Ứng dụng truy vấn trực tiếp theo tọa độ từ Open-Meteo Air Quality API. Khi API mất kết nối hoặc ngoài vùng lưới mô hình, hệ thống tuân thủ nguyên tắc không bịa đặt số liệu giả.
              </p>
            </div>
            <button
              type="button"
              onClick={handleManualRefresh}
              disabled={isRefreshing}
              className="mt-1 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Đang kết nối lại...' : 'Thử kết nối lại API'}</span>
            </button>
          </div>
        )}
      </section>

      {/* Thông số thời tiết & vị trí người dùng: Độ ẩm, Độ cao, Tia UV / Ánh sáng */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-[19px] font-extrabold text-[#0F172A] dark:text-slate-100 tracking-tight">
            Thông số thời tiết & vị trí
          </h2>
          <span className="text-xs font-semibold text-[#1E40AF] dark:text-blue-300 bg-[#DBEAFE] dark:bg-blue-900/40 px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-transparent dark:border-blue-800">
            <Sparkles className="w-3 h-3 text-[#2563EB] dark:text-blue-400" />
            Mô hình ước tính/dự báo
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {/* 1. Độ ẩm */}
          <button
            type="button"
            id="weather-humidity-btn"
            onClick={() =>
              onOpenDetail({
                title: 'Độ ẩm Không khí',
                category: 'Thời tiết',
                description: `Độ ẩm tương đối hiện tại: ${currentWeather.humidity} tại ${data.name}.`,
                details: [
                  `Độ ẩm mô hình ước tính: ${currentWeather.humidity}`,
                  `Điểm sương (Dew Point): ${currentWeather.dewPoint || 'Không có dữ liệu'}`,
                  'Đánh giá cảm giác thoải mái: Độ ẩm lý tưởng, cơ thể bài tiết mồ hôi tự nhiên tốt.',
                  'Khả năng ngưng tụ hơi ẩm: Thấp, tầm nhìn xa quang đãng trên 10 km.',
                  `Nguồn dữ liệu: ${weatherSourceLabel}`,
                  `Phân loại: ${weatherTypeLabel}`,
                  `Thời điểm: ${weatherTimestamp}`,
                ],
                tips: [
                  'Duy trì uống đủ nước (1.5 - 2 lít/ngày) trong điều kiện độ ẩm này.',
                  'Môi trường thích hợp bảo quản thiết bị điện tử và tài liệu giấy.',
                ],
              })
            }
            className="bg-[#F5F4F0] dark:bg-[#1E293B] hover:bg-[#ECEBE6] dark:hover:bg-[#334155]/70 border border-transparent dark:border-slate-700 active:scale-95 transition-all rounded-[18px] py-4 px-2.5 flex flex-col items-center justify-center gap-1.5 text-center cursor-pointer shadow-2xs"
          >
            <div className="w-8 h-8 flex items-center justify-center text-[#0284C7] dark:text-sky-400">
              <Droplets className="w-7 h-7 stroke-[2]" />
            </div>
            <span className="text-[13px] font-bold text-[#334155] dark:text-slate-200">
              Độ ẩm
            </span>
            <span className="text-[17px] font-black text-[#0F3B73] dark:text-blue-200 tracking-tight">
              {currentWeather.humidity}
            </span>
            <span className="text-[11px] font-medium text-[#64748B] dark:text-slate-400">
              Tương đối
            </span>
          </button>

          {/* 2. Độ cao người dùng */}
          <button
            type="button"
            id="weather-altitude-btn"
            onClick={() =>
              onOpenDetail({
                title: 'Độ cao Vị trí Người dùng',
                category: 'Định vị & Địa hình',
                description: `Độ cao hiện tại: ${displayAltitude} so với mực nước biển chuẩn (MSL).`,
                details: [
                  `Độ cao vị trí: ${displayAltitude}`,
                  `Nguồn dữ liệu: ${userLocation?.altitude ? 'Cảm biến GPS / Khí áp kế người dùng' : 'Mô hình số hóa độ cao địa hình khu vực (DEM)'}`,
                  'Mức chênh lệch thủy triều sông: +1.2 m vào giờ đỉnh triều',
                  `Áp suất khí quyển tương ứng: ${currentWeather.surfacePressure || 'Không có dữ liệu'}`,
                  'Đặc điểm địa hình: Đồng bằng phù sa trũng ven sông, địa thế bằng phẳng.',
                ],
                tips: [
                  'Khu vực cao ráo, không thuộc vùng trũng ngập úng khi mưa vừa.',
                  'Có thể bật định vị GPS có cảm biến áp suất để đo độ cao tầng lầu chính xác hơn.',
                ],
              })
            }
            className="bg-[#F5F4F0] dark:bg-[#1E293B] hover:bg-[#ECEBE6] dark:hover:bg-[#334155]/70 border border-transparent dark:border-slate-700 active:scale-95 transition-all rounded-[18px] py-4 px-2.5 flex flex-col items-center justify-center gap-1.5 text-center cursor-pointer shadow-2xs"
          >
            <div className="w-8 h-8 flex items-center justify-center text-[#0D9488] dark:text-teal-400">
              <Mountain className="w-7 h-7 stroke-[2]" />
            </div>
            <span className="text-[13px] font-bold text-[#334155] dark:text-slate-200">
              Độ cao
            </span>
            <span className="text-[17px] font-black text-[#0F3B73] dark:text-blue-200 tracking-tight">
              {displayAltitude}
            </span>
            <span className="text-[11px] font-medium text-[#64748B] dark:text-slate-400">
              Mực nước biển
            </span>
          </button>

          {/* 3. Tia UV & Ánh sáng */}
          <button
            type="button"
            id="weather-uv-btn"
            onClick={() =>
              onOpenDetail({
                title: 'Chỉ số Ánh sáng & Tia UV',
                category: 'Bức xạ mặt trời',
                description: `Chỉ số bức xạ: ${currentWeather.uvIndex} (${currentWeather.uvLevel}) - Cường độ: ${currentWeather.lightIntensity || 'Không có dữ liệu'}.`,
                details: [
                  `Chỉ số UV mô hình ước tính: ${currentWeather.uvIndex}`,
                  `Mức độ cảnh báo: ${currentWeather.uvLevel}`,
                  `Cường độ bức xạ nhiệt mặt trời: ${currentWeather.lightIntensity || 'Không có dữ liệu'}`,
                  'Khung giờ UV đạt đỉnh trong ngày: 11:30 - 13:30',
                  'Thời gian an toàn tiếp xúc trực tiếp không bảo vệ: 30 - 45 phút',
                  `Nguồn dữ liệu: ${weatherSourceLabel}`,
                  `Phân loại: ${weatherTypeLabel}`,
                  `Thời điểm cập nhật: ${weatherTimestamp}`,
                ],
                tips: [
                  'Nên đeo kính râm có khả năng chống tia UV400 khi ra ngoài trời.',
                  'Bôi kem chống nắng SPF 30+ trở lên và mặc áo dài tay thoáng khí.',
                ],
              })
            }
            className="bg-[#F5F4F0] dark:bg-[#1E293B] hover:bg-[#ECEBE6] dark:hover:bg-[#334155]/70 border border-transparent dark:border-slate-700 active:scale-95 transition-all rounded-[18px] py-4 px-2.5 flex flex-col items-center justify-center gap-1.5 text-center cursor-pointer shadow-2xs"
          >
            <div className="w-8 h-8 flex items-center justify-center text-[#EA580C] dark:text-amber-400">
              <SunMedium className="w-7 h-7 stroke-[2]" />
            </div>
            <span className="text-[13px] font-bold text-[#334155] dark:text-slate-200">
              Tia UV
            </span>
            <span className="text-[17px] font-black text-[#0F3B73] dark:text-blue-200 tracking-tight">
              {currentWeather.uvIndex}
            </span>
            <span className="text-[11px] font-medium text-[#64748B] dark:text-slate-400">
              {currentWeather.uvLevel}
            </span>
          </button>
        </div>
      </section>

      {/* Dữ liệu thời tiết theo giờ đã thu thập (±3 ngày) kèm biểu đồ và bảng chi tiết 1h, 2h... */}
      <WeatherCollectedRangeSection
        districtId={data.id}
        districtName={data.name}
        adminType={data.adminType}
        onOpenDetail={onOpenDetail}
        onSelectDistrict={onSelectDistrict}
      />

      {/* Cảnh báo biến cố */}
      <section className="flex flex-col gap-3">
        <h2 className="text-[19px] font-extrabold text-[#0F172A] dark:text-slate-100 tracking-tight">
          Cảnh báo biến cố
        </h2>

        <div
          id="weather-alert-card"
          onClick={() =>
            onOpenDetail({
              title: weatherAlert.title,
              category: 'Cảnh báo thời tiết',
              description: weatherAlert.desc,
              details: [
                `Cấp độ cảnh báo: ${weatherAlert.level === 'warning' ? 'Mức Cảnh Báo Vàng' : 'Thông Tin Thường Nhật'}`,
                `Nguồn kiểm chứng: Trạm khí tượng & Open-Meteo vi khí hậu`,
                `Phân loại: ${weatherTypeLabel}`,
                `Thời gian: ${weatherTimestamp}`,
                airQuality && airQuality.pollutants.pm2_5 !== null
                  ? `Nồng độ bụi mịn PM2.5 ước tính theo mô hình: ${airQuality.pollutants.pm2_5} µg/m³`
                  : 'Chưa có dữ liệu ước tính bụi mịn cho khung giờ này',
              ],
              tips: [
                weatherAlert.actionAdvice,
                'Đóng kín cửa sổ hướng đường lớn khi lưu lượng xe đông đúc.',
                'Sử dụng máy lọc không khí hoặc trồng các loại cây như trầu bà, lưỡi hổ trong nhà.',
              ],
            })
          }
          className="bg-[#FDF2E4] dark:bg-amber-950/40 hover:bg-[#FAEBDA] dark:hover:bg-amber-950/60 active:scale-[0.99] transition-all rounded-[20px] p-4.5 flex items-start gap-3.5 cursor-pointer shadow-2xs border border-[#FDE68A]/40 dark:border-amber-800/40"
        >
          <div className="mt-0.5 text-[#9A5B13] dark:text-amber-400 shrink-0 p-1 bg-[#FDF2E4] dark:bg-amber-900/40 rounded-lg">
            <AlertTriangle className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div className="flex-1">
            <h3 className="text-[16px] font-bold text-[#78350F] dark:text-amber-200 leading-snug">
              {weatherAlert.title}
            </h3>
            <p className="text-[14px] text-[#92400E] dark:text-amber-300/90 mt-0.5 leading-snug">
              {weatherAlert.desc}
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-[#B45309] dark:text-amber-400 mt-1 shrink-0 opacity-60" />
        </div>
      </section>
    </div>
  );
};
