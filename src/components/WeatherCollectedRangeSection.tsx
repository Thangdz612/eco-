import React, { useState, useEffect, useMemo } from 'react';
import {
  Sun,
  Droplets,
  SunMedium,
  CloudRain,
  Cloud,
  Moon,
  CloudLightning,
  RefreshCw,
  Wifi,
  WifiOff,
  Calendar,
  Clock,
  TrendingUp,
  BarChart2,
  List,
  CheckCircle2,
  Info,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import {
  DayCollectedWeather,
  HourlyWeatherRecord,
  getCachedCollectedWeatherRange,
  syncCollectedWeatherOnline,
  getUvLevel,
} from '../utils/collectedWeatherStorage';
import { ModalContent } from '../types';

interface WeatherCollectedRangeSectionProps {
  districtId: string;
  districtName: string;
  onOpenDetail?: (content: ModalContent) => void;
}

export const WeatherCollectedRangeSection: React.FC<WeatherCollectedRangeSectionProps> = ({
  districtId,
  districtName,
  onOpenDetail,
}) => {
  const [rangeData, setRangeData] = useState<DayCollectedWeather[]>(() =>
    getCachedCollectedWeatherRange(districtId, districtName).data
  );
  const [lastSyncedTime, setLastSyncedTime] = useState<string | null>(() =>
    getCachedCollectedWeatherRange(districtId, districtName).lastSynced
  );
  const [selectedOffset, setSelectedOffset] = useState<number>(0); // 0 = Hôm nay
  const [isOnline, setIsOnline] = useState<boolean>(() =>
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState<string | null>(null);

  // View preferences
  const [chartMetric, setChartMetric] = useState<'temp-rain' | 'humidity-uv' | 'all'>('temp-rain');
  const [displayMode, setDisplayMode] = useState<'timeline' | 'table'>('timeline');
  const [timeFilter, setTimeFilter] = useState<'all' | 'morning' | 'afternoon' | 'night'>('all');

  // Lắng nghe trạng thái mạng
  useEffect(() => {
    const handleOnline = async () => {
      setIsOnline(true);
      // Tự động đồng bộ khi có kết nối lại
      const res = await syncCollectedWeatherOnline(districtId, districtName);
      if (res.success) {
        setRangeData(res.data);
        setLastSyncedTime(res.lastSynced);
      }
    };
    const handleOffline = () => setIsOnline(false);

    const handleSyncEvent = () => {
      const cached = getCachedCollectedWeatherRange(districtId, districtName);
      setRangeData(cached.data);
      setLastSyncedTime(cached.lastSynced);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('eco-collected-weather-synced', handleSyncEvent);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('eco-collected-weather-synced', handleSyncEvent);
    };
  }, [districtId, districtName]);

  // Handle Manual Sync
  const handleManualSync = async () => {
    setIsSyncing(true);
    setSyncStatusMsg(null);
    const result = await syncCollectedWeatherOnline(districtId, districtName);
    setIsSyncing(false);
    if (result.success) {
      setRangeData(result.data);
      setLastSyncedTime(result.lastSynced);
      setSyncStatusMsg('Đã cập nhật dữ liệu thời tiết ±3 ngày mới nhất!');
    } else {
      setSyncStatusMsg(result.message);
    }
    setTimeout(() => setSyncStatusMsg(null), 4000);
  };

  // Selected Day Data
  const selectedDay = useMemo(() => {
    return (
      rangeData.find((d) => d.dateOffset === selectedOffset) ||
      rangeData.find((d) => d.dateOffset === 0) ||
      rangeData[0]
    );
  }, [rangeData, selectedOffset]);

  // Current Hour
  const currentHourNow = new Date().getHours();

  // Filtered Hours for display
  const filteredHours = useMemo(() => {
    if (!selectedDay) return [];
    if (timeFilter === 'morning') {
      return selectedDay.hours.filter((h) => h.hour >= 5 && h.hour <= 11);
    }
    if (timeFilter === 'afternoon') {
      return selectedDay.hours.filter((h) => h.hour >= 12 && h.hour <= 17);
    }
    if (timeFilter === 'night') {
      return selectedDay.hours.filter((h) => h.hour >= 18 || h.hour <= 4);
    }
    return selectedDay.hours;
  }, [selectedDay, timeFilter]);

  // Chart data format
  const chartData = useMemo(() => {
    if (!selectedDay) return [];
    return selectedDay.hours.map((h) => ({
      hour: h.hourLabel,
      temp: h.temp,
      rainChance: h.rainChance,
      humidity: h.humidity,
      uvIndex: h.uvIndex,
      condition: h.condition,
      rawHour: h.hour,
    }));
  }, [selectedDay]);

  const renderWeatherIcon = (type: HourlyWeatherRecord['iconType'], className = 'w-5 h-5') => {
    switch (type) {
      case 'sun':
        return <Sun className={`${className} text-amber-500`} />;
      case 'sun-cloud':
        return <Cloud className={`${className} text-amber-400`} />;
      case 'cloud':
        return <Cloud className={`${className} text-slate-400`} />;
      case 'rain':
        return <CloudRain className={`${className} text-blue-500`} />;
      case 'thunder':
        return <CloudLightning className={`${className} text-purple-500`} />;
      case 'moon':
        return <Moon className={`${className} text-indigo-400`} />;
      default:
        return <Sun className={`${className} text-amber-500`} />;
    }
  };

  const getUvBadgeStyle = (level: string) => {
    switch (level) {
      case 'Thấp':
        return 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'Trung bình':
        return 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'Cao':
        return 'bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800';
      case 'Rất cao':
      case 'Cực độ':
        return 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800';
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200';
    }
  };

  // Custom Chart Tooltip
  const CustomChartTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-slate-200/80 dark:border-slate-800 text-xs">
          <div className="font-bold text-slate-800 dark:text-slate-100 pb-1.5 mb-1.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
            <span className="text-blue-600 dark:text-blue-400 font-extrabold">{label}</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
              {data.condition}
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between gap-4">
              <span className="text-amber-600 dark:text-amber-400 font-medium flex items-center gap-1">
                🌡️ Nhiệt độ:
              </span>
              <span className="font-bold font-mono text-slate-800 dark:text-slate-200">
                {data.temp}°C
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1">
                🌧️ Khả năng mưa:
              </span>
              <span className="font-bold font-mono text-slate-800 dark:text-slate-200">
                {data.rainChance}%
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-teal-600 dark:text-teal-400 font-medium flex items-center gap-1">
                💧 Độ ẩm:
              </span>
              <span className="font-bold font-mono text-slate-800 dark:text-slate-200">
                {data.humidity}%
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-purple-600 dark:text-purple-400 font-medium flex items-center gap-1">
                ☀️ Tia UV:
              </span>
              <span className="font-bold font-mono text-slate-800 dark:text-slate-200">
                {data.uvIndex}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <section
      id="collected-weather-range-section"
      className="bg-white dark:bg-slate-900 rounded-[24px] p-5 shadow-xs border border-slate-200/80 dark:border-slate-800 flex flex-col gap-4.5"
    >
      {/* 1. Header & Network Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-[18px] font-extrabold text-[#0F172A] dark:text-slate-100 tracking-tight flex items-center gap-1.5">
              <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Thời tiết thu thập theo giờ (±3 ngày)
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Dữ liệu khí tượng 24h thu thập khi có mạng tại {districtName} (độ C, % mưa, độ ẩm, tia UV).
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
          {/* Online/Offline Badge */}
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
              isOnline
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
            }`}
          >
            {isOnline ? (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                Đã thu thập qua mạng
              </>
            ) : (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-600" />
                Đang dùng đệm ngoại tuyến
              </>
            )}
          </span>

          {/* Refresh/Sync button */}
          <button
            type="button"
            id="sync-collected-weather-btn"
            onClick={handleManualSync}
            disabled={isSyncing}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors disabled:opacity-50 cursor-pointer"
            title="Đồng bộ cập nhật dữ liệu mới nhất"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-blue-600' : ''}`} />
          </button>
        </div>
      </div>

      {/* Sync Status Banner */}
      {syncStatusMsg && (
        <div className="px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900 text-xs text-blue-800 dark:text-blue-300 flex items-center gap-2 animate-in fade-in">
          <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
          <span>{syncStatusMsg}</span>
        </div>
      )}

      {/* 2. Thanh chọn 7 ngày (phạm vi ±3 ngày: -3, -2, -1, 0, 1, 2, 3) */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            Chọn ngày quan sát (±3 ngày):
          </span>
          {lastSyncedTime && (
            <span className="text-[11px] text-slate-400 font-normal">
              Thu thập: {lastSyncedTime}
            </span>
          )}
        </div>

        <div className="grid grid-cols-7 gap-1.5 overflow-x-auto pb-1">
          {rangeData.map((day) => {
            const isSelected = day.dateOffset === selectedOffset;
            const isToday = day.dateOffset === 0;

            return (
              <button
                key={day.dateOffset}
                type="button"
                id={`day-tab-offset-${day.dateOffset}`}
                onClick={() => setSelectedOffset(day.dateOffset)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all cursor-pointer select-none ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm scale-[1.02]'
                    : isToday
                    ? 'bg-blue-50/80 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-800/80 hover:bg-blue-100/70'
                    : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span className={`text-[10px] uppercase font-bold tracking-wider ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                  {day.dateOffset === 0
                    ? 'Hôm nay'
                    : day.dateOffset === -1
                    ? 'Hôm qua'
                    : day.dateOffset === 1
                    ? 'Ngày mai'
                    : `${day.dateOffset > 0 ? '+' : ''}${day.dateOffset}d`}
                </span>
                <span className="text-[11.5px] font-extrabold mt-0.5 whitespace-nowrap">
                  {day.dateFormatted.slice(0, 5)}
                </span>
                <span className={`text-[10px] font-mono mt-0.5 ${isSelected ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>
                  {Math.round(day.minTemp)}°-{Math.round(day.maxTemp)}°
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Thẻ tóm tắt ngày đã chọn */}
      {selectedDay && (
        <div className="bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-slate-50 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-slate-900 rounded-2xl p-3.5 border border-blue-100 dark:border-blue-900/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-blue-100/80 dark:border-blue-900/40">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {selectedDay.fullTitle} - {selectedDay.dayOfWeek}
                </span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    selectedDay.dateOffset < 0
                      ? 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      : selectedDay.dateOffset === 0
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                  }`}
                >
                  {selectedDay.dateOffset < 0
                    ? 'Dữ liệu lịch sử đã lưu'
                    : selectedDay.dateOffset === 0
                    ? 'Dữ liệu hôm nay'
                    : 'Dự báo đã nạp'}
                </span>
              </div>
              <p className="text-[12px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {selectedDay.summary}
              </p>
            </div>

            <div className="text-[11px] text-slate-500 dark:text-slate-400 shrink-0 font-medium">
              Nguồn: {selectedDay.source}
            </div>
          </div>

          {/* 4 Thống kê chính của ngày */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2.5">
            <div className="bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Sun className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                  Biên độ nhiệt
                </span>
                <span className="text-sm font-extrabold text-slate-800 dark:text-slate-100 font-mono">
                  {selectedDay.minTemp}°C - {selectedDay.maxTemp}°C
                </span>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <CloudRain className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                  Đỉnh mưa trong ngày
                </span>
                <span className="text-sm font-extrabold text-blue-600 dark:text-blue-300 font-mono">
                  {selectedDay.maxRainChance}%
                </span>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
                <Droplets className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                  Độ ẩm trung bình
                </span>
                <span className="text-sm font-extrabold text-teal-600 dark:text-teal-300 font-mono">
                  {selectedDay.avgHumidity}%
                </span>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                <SunMedium className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                  Tia UV cực đại
                </span>
                <span className="text-sm font-extrabold text-rose-600 dark:text-rose-300 font-mono">
                  {selectedDay.maxUvIndex} ({getUvLevel(selectedDay.maxUvIndex)})
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Biểu đồ trực quan Recharts (Biểu đồ nhiệt độ, % mưa, độ ẩm, UV) */}
      <div className="flex flex-col gap-2.5 pt-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-sm font-bold text-slate-800 dark:text-slate-100">
            <TrendingUp className="w-4 h-4 text-amber-500" />
            <span>Biểu đồ diễn biến khí tượng 24 giờ ({selectedDay?.dateLabel})</span>
          </div>

          {/* Chart Metric Selectors */}
          <div className="inline-flex p-0.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold self-start sm:self-center">
            <button
              type="button"
              id="chart-mode-temp-rain"
              onClick={() => setChartMetric('temp-rain')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                chartMetric === 'temp-rain'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Nhiệt độ & % Mưa
            </button>
            <button
              type="button"
              id="chart-mode-humidity-uv"
              onClick={() => setChartMetric('humidity-uv')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                chartMetric === 'humidity-uv'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Độ ẩm & Tia UV
            </button>
            <button
              type="button"
              id="chart-mode-all"
              onClick={() => setChartMetric('all')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                chartMetric === 'all'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Tất cả
            </button>
          </div>
        </div>

        {/* Recharts Canvas */}
        <div className="w-full h-64 sm:h-72 bg-slate-50/50 dark:bg-slate-950/40 rounded-2xl p-2.5 border border-slate-200/70 dark:border-slate-800">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{ top: 12, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="humidityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0D9488" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0D9488" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />

              <XAxis
                dataKey="hour"
                tick={{ fontSize: 10, fill: '#94A3B8' }}
                axisLine={false}
                tickLine={false}
                interval={2} // hiển thị mỗi 2 giờ
              />

              {/* Trục Y trái: Nhiệt độ hoặc % */}
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 10, fill: '#94A3B8' }}
                axisLine={false}
                tickLine={false}
                domain={chartMetric === 'humidity-uv' ? [0, 100] : [20, 40]}
                unit={chartMetric === 'humidity-uv' ? '%' : '°C'}
              />

              {/* Trục Y phải: % Mưa hoặc UV */}
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 10, fill: '#94A3B8' }}
                axisLine={false}
                tickLine={false}
                domain={chartMetric === 'temp-rain' ? [0, 100] : [0, 12]}
                unit={chartMetric === 'temp-rain' ? '%' : ''}
              />

              <Tooltip content={<CustomChartTooltip />} />

              <Legend
                wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }}
                iconType="circle"
              />

              {/* Biểu diễn theo chế độ */}
              {(chartMetric === 'temp-rain' || chartMetric === 'all') && (
                <>
                  <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="rainChance"
                    name="Khả năng mưa (%)"
                    stroke="#2563EB"
                    strokeWidth={1.5}
                    fillOpacity={1}
                    fill="url(#rainGradient)"
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="temp"
                    name="Nhiệt độ (°C)"
                    stroke="#F59E0B"
                    strokeWidth={2.5}
                    dot={{ r: 2, fill: '#F59E0B' }}
                    activeDot={{ r: 5 }}
                  />
                </>
              )}

              {(chartMetric === 'humidity-uv' || chartMetric === 'all') && (
                <>
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="humidity"
                    name="Độ ẩm (%)"
                    stroke="#0D9488"
                    strokeWidth={1.5}
                    fillOpacity={1}
                    fill="url(#humidityGradient)"
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="uvIndex"
                    name="Chỉ số tia UV"
                    fill="#EC4899"
                    radius={[3, 3, 0, 0]}
                    maxBarSize={14}
                  />
                </>
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 5. Giao diện chi tiết từng giờ: 1h - độ C - % mưa - độ ẩm - tia UV; 2h... */}
      <div className="flex flex-col gap-3 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-[16px] font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
              <span>Chi tiết 24 giờ</span>
              <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                (1h, 2h, ... độ C, % mưa, độ ẩm, tia UV)
              </span>
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {/* Lọc khung giờ */}
            <div className="inline-flex p-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] font-medium">
              <button
                type="button"
                onClick={() => setTimeFilter('all')}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                  timeFilter === 'all'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 font-bold shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Tất cả 24h
              </button>
              <button
                type="button"
                onClick={() => setTimeFilter('morning')}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                  timeFilter === 'morning'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 font-bold shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Sáng (5-11h)
              </button>
              <button
                type="button"
                onClick={() => setTimeFilter('afternoon')}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                  timeFilter === 'afternoon'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 font-bold shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Chiều (12-17h)
              </button>
              <button
                type="button"
                onClick={() => setTimeFilter('night')}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                  timeFilter === 'night'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 font-bold shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Tối & Đêm
              </button>
            </div>

            {/* Chế độ xem: Timeline / Bảng */}
            <div className="inline-flex p-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px]">
              <button
                type="button"
                id="display-mode-timeline-btn"
                onClick={() => setDisplayMode('timeline')}
                className={`p-1 rounded transition-all cursor-pointer ${
                  displayMode === 'timeline'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
                title="Dạng thẻ trượt ngang"
              >
                <BarChart2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                id="display-mode-table-btn"
                onClick={() => setDisplayMode('table')}
                className={`p-1 rounded transition-all cursor-pointer ${
                  displayMode === 'table'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
                title="Dạng bảng danh sách"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Chế độ 1: Thẻ trượt ngang (Timeline Scroller) */}
        {displayMode === 'timeline' && (
          <div className="flex gap-2.5 overflow-x-auto pb-2 pt-1 custom-scrollbar">
            {filteredHours.map((h) => {
              const isCurrentHour = selectedDay?.dateOffset === 0 && h.hour === currentHourNow;

              return (
                <div
                  key={h.hour}
                  id={`weather-hour-card-${h.hour}`}
                  onClick={() =>
                    onOpenDetail?.({
                      title: `Thời tiết chi tiết lúc ${h.hourLabel} (${selectedDay?.dateLabel})`,
                      category: 'Khí tượng theo giờ',
                      description: `Điều kiện ${h.condition}, nhiệt độ ${h.temp}°C tại ${districtName}.`,
                      details: [
                        `Mốc thời gian: ${h.timeFormatted} (${h.hourLabel})`,
                        `Nhiệt độ không khí: ${h.temp}°C`,
                        `Xác suất mưa: ${h.rainChance}%`,
                        `Độ ẩm tương đối: ${h.humidity}%`,
                        `Chỉ số bức xạ tia UV: ${h.uvIndex} (${h.uvLevel})`,
                        `Tốc độ gió ước tính: ${h.windSpeed} km/h`,
                      ],
                      tips: [
                        h.uvIndex >= 6
                          ? 'Tia UV mức nguy hại, nên mang theo áo chống nắng và kính râm.'
                          : 'Tia UV ở mức an toàn cho các hoạt động ngoài trời.',
                        h.rainChance >= 50
                          ? 'Khả năng có mưa rào cao, nên chủ động chuẩn bị áo mưa hoặc dù khi di chuyển.'
                          : 'Thời tiết tạnh ráo, thuận lợi cho lưu thông.',
                      ],
                    })
                  }
                  className={`flex flex-col items-center justify-between p-3 rounded-2xl border min-w-[125px] transition-all cursor-pointer active:scale-98 shadow-xs ${
                    isCurrentHour
                      ? 'bg-blue-50/90 dark:bg-blue-950/60 border-blue-400 dark:border-blue-600 ring-2 ring-blue-400/30'
                      : 'bg-[#F8FAFC] dark:bg-slate-800/70 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200/80 dark:border-slate-700/80'
                  }`}
                >
                  {/* Hour label & badge */}
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-black text-slate-800 dark:text-slate-100 font-mono">
                      {h.hourLabel}
                    </span>
                    {isCurrentHour && (
                      <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-blue-600 text-white animate-pulse">
                        Hiện tại
                      </span>
                    )}
                  </div>

                  {/* Weather Icon & Condition */}
                  <div className="my-1.5 flex flex-col items-center">
                    {renderWeatherIcon(h.iconType, 'w-7 h-7')}
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 text-center line-clamp-1 mt-0.5">
                      {h.condition}
                    </span>
                  </div>

                  {/* Main Metric: Nhiệt độ */}
                  <div className="text-[17px] font-black text-slate-900 dark:text-slate-100 font-mono">
                    {h.temp}°C
                  </div>

                  {/* Chi tiết: % mưa, độ ẩm, tia UV */}
                  <div className="w-full space-y-1 mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[10.5px]">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-600 dark:text-blue-400 flex items-center gap-0.5">
                        <CloudRain className="w-3 h-3" /> Mưa:
                      </span>
                      <span className="font-bold text-slate-700 dark:text-slate-200 font-mono">
                        {h.rainChance}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-teal-600 dark:text-teal-400 flex items-center gap-0.5">
                        <Droplets className="w-3 h-3" /> Ẩm:
                      </span>
                      <span className="font-bold text-slate-700 dark:text-slate-200 font-mono">
                        {h.humidity}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-rose-600 dark:text-rose-400 flex items-center gap-0.5">
                        <SunMedium className="w-3 h-3" /> UV:
                      </span>
                      <span
                        className={`px-1 py-0.2 rounded text-[9.5px] font-bold border ${getUvBadgeStyle(
                          h.uvLevel
                        )}`}
                      >
                        {h.uvIndex}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Chế độ 2: Bảng danh sách chi tiết (Table View) */}
        {displayMode === 'table' && (
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
                  <th className="p-2.5">Thời gian</th>
                  <th className="p-2.5">Thời tiết</th>
                  <th className="p-2.5">Nhiệt độ</th>
                  <th className="p-2.5">Xác suất mưa</th>
                  <th className="p-2.5">Độ ẩm</th>
                  <th className="p-2.5">Chỉ số UV</th>
                  <th className="p-2.5">Gió</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
                {filteredHours.map((h) => {
                  const isCurrentHour = selectedDay?.dateOffset === 0 && h.hour === currentHourNow;

                  return (
                    <tr
                      key={h.hour}
                      onClick={() =>
                        onOpenDetail?.({
                          title: `Chi tiết khí tượng lúc ${h.hourLabel} (${selectedDay?.dateLabel})`,
                          category: 'Khí tượng theo giờ',
                          description: `${h.condition}, nhiệt độ ${h.temp}°C, xác suất mưa ${h.rainChance}%.`,
                          details: [
                            `Thời gian: ${h.timeFormatted} (${h.hourLabel})`,
                            `Nhiệt độ: ${h.temp}°C`,
                            `Khả năng mưa: ${h.rainChance}%`,
                            `Độ ẩm: ${h.humidity}%`,
                            `Tia UV: ${h.uvIndex} (${h.uvLevel})`,
                            `Gió: ${h.windSpeed} km/h`,
                          ],
                          tips: [
                            h.uvIndex >= 6
                              ? 'Cảnh báo bức xạ UV cao, hạn chế phơi nắng.'
                              : 'Tia cực tím an toàn.',
                          ],
                        })
                      }
                      className={`hover:bg-blue-50/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer ${
                        isCurrentHour ? 'bg-blue-50/80 dark:bg-blue-950/40 font-bold' : ''
                      }`}
                    >
                      <td className="p-2.5 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-slate-800 dark:text-slate-200 font-mono">
                            {h.hourLabel}
                          </span>
                          {isCurrentHour && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-600 text-white font-bold">
                              Hiện tại
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="p-2.5">
                        <div className="flex items-center gap-1.5">
                          {renderWeatherIcon(h.iconType, 'w-4 h-4 shrink-0')}
                          <span className="text-slate-700 dark:text-slate-300 truncate max-w-[120px]">
                            {h.condition}
                          </span>
                        </div>
                      </td>

                      <td className="p-2.5 whitespace-nowrap">
                        <span className="font-black text-slate-900 dark:text-slate-100 font-mono">
                          {h.temp}°C
                        </span>
                      </td>

                      <td className="p-2.5 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <div className="w-12 bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-blue-600 h-full rounded-full"
                              style={{ width: `${h.rainChance}%` }}
                            />
                          </div>
                          <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">
                            {h.rainChance}%
                          </span>
                        </div>
                      </td>

                      <td className="p-2.5 whitespace-nowrap">
                        <span className="font-mono text-teal-600 dark:text-teal-400 font-bold">
                          {h.humidity}%
                        </span>
                      </td>

                      <td className="p-2.5 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getUvBadgeStyle(
                            h.uvLevel
                          )}`}
                        >
                          {h.uvIndex} - {h.uvLevel}
                        </span>
                      </td>

                      <td className="p-2.5 whitespace-nowrap text-slate-500 dark:text-slate-400 font-mono">
                        {h.windSpeed} km/h
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};
