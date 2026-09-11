import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  Sparkles,
  Wind,
  Layers,
  MapPin,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  LayoutGrid,
  Maximize2,
  Compass,
  Thermometer,
  ExternalLink,
  Database,
  ShieldCheck,
  CheckCircle2,
  Code,
  X,
  Activity,
  Radio,
  Gauge,
  Copy,
  Check,
  ArrowLeftRight,
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  LineChart,
  AreaChart,
  BarChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceLine,
} from 'recharts';
import {
  DayCollectedWeather,
  HourlyWeatherRecord,
  getCachedCollectedWeatherRange,
  syncCollectedWeatherOnline,
  getLiveDataSourceInfo,
  getUvLevel,
  generateMultiLevelComparison,
  UnitComparisonHourRecord,
} from '../utils/collectedWeatherStorage';
import {
  VIETNAM_ATMOSPHERIC_STATIONS,
  type VietnamAtmosphericStation,
} from '../utils/liveWeatherApi';
import { DISTRICTS_DATA } from '../data/mockData';
import { ModalContent } from '../types';

interface WeatherCollectedRangeSectionProps {
  districtId: string;
  districtName: string;
  adminType?: 'phường' | 'xã' | 'đặc khu';
  onOpenDetail?: (content: ModalContent) => void;
  onSelectDistrict?: (districtId: string) => void;
}

type ChartType = 'temp' | 'rain' | 'humidity' | 'uv' | 'wind' | 'comparison';

export const WeatherCollectedRangeSection: React.FC<WeatherCollectedRangeSectionProps> = ({
  districtId,
  districtName,
  adminType,
  onOpenDetail,
  onSelectDistrict,
}) => {
  const safeAdminType: 'phường' | 'xã' | 'đặc khu' = adminType || 'phường';

  // State for current selected unit
  const [currentId, setCurrentId] = useState<string>(districtId);
  const [currentName, setCurrentName] = useState<string>(districtName);
  const [currentAdminType, setCurrentAdminType] = useState<'phường' | 'xã' | 'đặc khu'>(safeAdminType);

  // Synchronize when prop changes & auto-fetch live meteorological data
  useEffect(() => {
    setCurrentId(districtId);
    setCurrentName(districtName);
    const newAdmin = adminType || 'phường';
    setCurrentAdminType(newAdmin);
    const cached = getCachedCollectedWeatherRange(districtId, districtName, newAdmin);
    setRangeData(cached.data);
    setLastSyncedTime(cached.lastSynced);
    setRawJsonContent(null);

    // Truy vấn dữ liệu thực tế trực tiếp từ cơ sở dữ liệu khí tượng Open-Meteo & ECMWF
    if (typeof navigator === 'undefined' || navigator.onLine) {
      setIsSyncing(true);
      syncCollectedWeatherOnline(districtId, districtName, newAdmin)
        .then((res) => {
          if (res.success) {
            setRangeData(res.data);
            setLastSyncedTime(res.lastSynced);
          }
        })
        .finally(() => {
          setIsSyncing(false);
        });
    }
  }, [districtId, districtName, adminType]);

  // Weather range dataset
  const [rangeData, setRangeData] = useState<DayCollectedWeather[]>(() =>
    getCachedCollectedWeatherRange(districtId, districtName, safeAdminType).data
  );
  const [lastSyncedTime, setLastSyncedTime] = useState<string | null>(() =>
    getCachedCollectedWeatherRange(districtId, districtName, safeAdminType).lastSynced
  );
  const [selectedOffset, setSelectedOffset] = useState<number>(0); // 0 = Hôm nay
  const [isOnline, setIsOnline] = useState<boolean>(() =>
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState<string | null>(null);

  // Raw JSON Inspection Modal
  const [showRawJsonModal, setShowRawJsonModal] = useState<boolean>(false);
  const [rawJsonLoading, setRawJsonLoading] = useState<boolean>(false);
  const [rawJsonContent, setRawJsonContent] = useState<string | null>(null);
  const [copiedJson, setCopiedJson] = useState<boolean>(false);

  // Vietnam Atmospheric Station Selection
  const [selectedStationCode, setSelectedStationCode] = useState<string>('');
  const [showStationModal, setShowStationModal] = useState<boolean>(false);

  // Live Meteorological Source Info & Coordinates
  const liveSourceInfo = useMemo(() => {
    return getLiveDataSourceInfo(currentId, currentName, selectedStationCode || undefined);
  }, [currentId, currentName, selectedStationCode]);

  // Handler to select a specific Vietnam Atmospheric Station
  const handleSelectStation = async (stationCode: string) => {
    setSelectedStationCode(stationCode);
    setShowStationModal(false);
    setIsSyncing(true);
    setRawJsonContent(null);
    try {
      const res = await syncCollectedWeatherOnline(currentId, currentName, currentAdminType, stationCode);
      if (res.success) {
        setRangeData(res.data);
        setLastSyncedTime(res.lastSynced);
        setSyncStatusMsg(`Đã kết nối trực tiếp: ${res.station?.shortName || stationCode}`);
      } else {
        setSyncStatusMsg(res.message);
      }
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncStatusMsg(null), 4500);
    }
  };

  // Handler to fetch and view raw JSON from Meteorological API directly
  const handleViewRawJson = async () => {
    setShowRawJsonModal(true);
    setCopiedJson(false);
    if (!rawJsonContent) {
      setRawJsonLoading(true);
      try {
        let json: any = null;
        // Thử lấy qua proxy máy chủ trước để tránh chặn CORS trong iframe
        try {
          const proxyRes = await fetch(`/api/weather/live?lat=${liveSourceInfo.lat.toFixed(4)}&lng=${liveSourceInfo.lng.toFixed(4)}`);
          if (proxyRes.ok) {
            const pj = await proxyRes.json();
            json = pj?.data || pj;
          }
        } catch (_e) {}

        if (!json) {
          const res = await fetch(liveSourceInfo.apiUrl);
          if (res.ok) {
            json = await res.json();
          }
        }

        if (json) {
          setRawJsonContent(JSON.stringify(json, null, 2));
        } else {
          throw new Error('Không thể tải dữ liệu JSON');
        }
      } catch (err: any) {
        setRawJsonContent(
          `Không thể nạp dữ liệu trực tiếp: ${err?.message || 'Lỗi mạng'}\n\nBạn có thể nhấp vào liên kết "Kiểm chứng API gốc" bên dưới để mở dữ liệu JSON trực tiếp trong tab mới.`
        );
      } finally {
        setRawJsonLoading(false);
      }
    }
  };

  const handleCopyJson = () => {
    if (rawJsonContent) {
      navigator.clipboard.writeText(rawJsonContent);
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 2000);
    }
  };

  // Administrative Unit Picker State
  const [isPickerOpen, setIsPickerOpen] = useState<boolean>(false);
  const [adminTypeFilter, setAdminTypeFilter] = useState<'all' | 'phường' | 'xã' | 'đặc khu'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Chart view preferences
  const [activeChart, setActiveChart] = useState<ChartType>('temp');
  const [isGridView, setIsGridView] = useState<boolean>(false);
  const [comparisonMetric, setComparisonMetric] = useState<'temp' | 'rain' | 'uv'>('temp');

  // Hourly details view preferences
  const [displayMode, setDisplayMode] = useState<'timeline' | 'table'>('timeline');
  const [timeFilter, setTimeFilter] = useState<'all' | 'morning' | 'afternoon' | 'night'>('all');

  // Date slider controls (các mốc quan trắc kéo rộng, lướt qua lại mượt mà)
  const dateScrollRef = useRef<HTMLDivElement>(null);

  const handleStepDay = (step: -1 | 1) => {
    const currentIndex = rangeData.findIndex((d) => d.dateOffset === selectedOffset);
    if (currentIndex !== -1) {
      const nextIndex = Math.max(0, Math.min(rangeData.length - 1, currentIndex + step));
      setSelectedOffset(rangeData[nextIndex].dateOffset);
    }
  };

  // Tự động cuộn ngày được chọn vào tầm nhìn trung tâm mượt mà, giữ cố định viewport thiết bị
  useEffect(() => {
    const el = document.getElementById(`day-tab-offset-${selectedOffset}`);
    if (el && dateScrollRef.current) {
      const container = dateScrollRef.current;
      const elLeft = el.offsetLeft;
      const elWidth = el.offsetWidth;
      const containerWidth = container.offsetWidth;
      container.scrollTo({
        left: elLeft - (containerWidth / 2) + (elWidth / 2),
        behavior: 'smooth',
      });
    }
  }, [selectedOffset]);

  // Lắng nghe trạng thái mạng & sự kiện đồng bộ
  useEffect(() => {
    const handleOnline = async () => {
      setIsOnline(true);
      const res = await syncCollectedWeatherOnline(currentId, currentName, currentAdminType);
      if (res.success) {
        setRangeData(res.data);
        setLastSyncedTime(res.lastSynced);
      }
    };
    const handleOffline = () => setIsOnline(false);

    const handleSyncEvent = (e: any) => {
      const cached = getCachedCollectedWeatherRange(currentId, currentName, currentAdminType);
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
  }, [currentId, currentName, currentAdminType]);

  // When changing administrative unit
  const handleSelectUnit = (unitId: string) => {
    const unit = DISTRICTS_DATA[unitId];
    if (!unit) return;
    const newType = unit.adminType || 'phường';
    setCurrentId(unit.id);
    setCurrentName(unit.name);
    setCurrentAdminType(newType);
    setIsPickerOpen(false);
    setRawJsonContent(null);

    // Load or generate dataset for this unit
    const cached = getCachedCollectedWeatherRange(unit.id, unit.name, newType);
    setRangeData(cached.data);
    setLastSyncedTime(cached.lastSynced);

    // Truy vấn trực tiếp số liệu từ cơ sở dữ liệu khí tượng Open-Meteo & ECMWF
    setIsSyncing(true);
    syncCollectedWeatherOnline(unit.id, unit.name, newType)
      .then((res) => {
        if (res.success) {
          setRangeData(res.data);
          setLastSyncedTime(res.lastSynced);
        }
      })
      .finally(() => {
        setIsSyncing(false);
      });

    if (onSelectDistrict) {
      onSelectDistrict(unit.id);
    }
  };

  // Manual Sync
  const handleManualSync = async () => {
    setIsSyncing(true);
    setSyncStatusMsg(null);
    setRawJsonContent(null);
    const result = await syncCollectedWeatherOnline(
      currentId,
      currentName,
      currentAdminType,
      selectedStationCode || undefined
    );
    setIsSyncing(false);
    if (result.success) {
      setRangeData(result.data);
      setLastSyncedTime(result.lastSynced);
      setSyncStatusMsg(`Đã cập nhật trực tiếp từ ${result.station?.shortName || currentName}!`);
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

  // Multi-Level Comparison Data
  const comparisonData: UnitComparisonHourRecord[] = useMemo(() => {
    return generateMultiLevelComparison(selectedOffset);
  }, [selectedOffset]);

  // List of all administrative units with filtering
  const allUnitsList = useMemo(() => {
    const units = Object.values(DISTRICTS_DATA);
    return units.filter((u) => {
      const matchType = adminTypeFilter === 'all' || (u.adminType || 'phường') === adminTypeFilter;
      const matchSearch =
        searchQuery.trim() === '' ||
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.districtGroup && u.districtGroup.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchType && matchSearch;
    });
  }, [adminTypeFilter, searchQuery]);

  // Stats count
  const countStats = useMemo(() => {
    const units = Object.values(DISTRICTS_DATA);
    let wards = 0;
    let communes = 0;
    let specials = 0;
    units.forEach((u) => {
      const type = u.adminType || 'phường';
      if (type === 'phường') wards++;
      else if (type === 'xã') communes++;
      else if (type === 'đặc khu') specials++;
    });
    return { wards, communes, specials, total: units.length };
  }, []);

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

  const getAdminBadge = (type: 'phường' | 'xã' | 'đặc khu') => {
    switch (type) {
      case 'đặc khu':
        return {
          label: 'Đặc khu',
          desc: 'Khí hậu hải đảo - gió biển lộng',
          badgeClass: 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
        };
      case 'xã':
        return {
          label: 'Cấp Xã',
          desc: 'Vi khí hậu ngoại thành - nông thôn',
          badgeClass: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
        };
      default:
        return {
          label: 'Cấp Phường',
          desc: 'Vi khí hậu đô thị - đảo nhiệt UHI',
          badgeClass: 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
        };
    }
  };

  const adminMeta = getAdminBadge(currentAdminType);

  // Custom Chart Tooltip
  const CustomDetailedTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-3 rounded-xl shadow-xl border border-slate-200/90 dark:border-slate-800 text-xs min-w-[200px] z-50">
          <div className="font-bold text-slate-800 dark:text-slate-100 pb-1.5 mb-1.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
            <span className="text-blue-600 dark:text-blue-400 font-extrabold">{label}</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
              {data.condition || 'Quan trắc vi khí hậu'}
            </span>
          </div>

          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <div key={`tooltip-item-${index}`} className="flex items-center justify-between gap-3">
                <span className="font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                  {entry.name}:
                </span>
                <span className="font-bold font-mono text-slate-800 dark:text-slate-100">
                  {entry.value} {entry.unit || ''}
                </span>
              </div>
            ))}

            {data.beaufortScale && (
              <div className="pt-1 mt-1 border-t border-slate-100 dark:border-slate-800 text-[10.5px] text-slate-500">
                Gió: <span className="font-semibold text-slate-700 dark:text-slate-300">{data.beaufortScale}</span>
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <section
      id="collected-weather-range-section"
      className="bg-white dark:bg-slate-900 rounded-[24px] p-3.5 sm:p-5 shadow-xs border border-slate-200/80 dark:border-slate-800 flex flex-col gap-5 w-full max-w-full overflow-hidden"
    >
      {/* 1. Header & Bộ chọn cấp Phường / Xã / Đặc khu */}
      <div className="flex flex-col gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-[18px] font-extrabold text-[#0F172A] dark:text-slate-100 tracking-tight flex items-center gap-1.5">
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                Dữ liệu khí tượng 24h (±3 ngày)
              </h2>

              {/* Admin Badge */}
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${adminMeta.badgeClass}`}
              >
                <Compass className="w-3.5 h-3.5" />
                {adminMeta.label}: {currentName}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Hỗ trợ đầy đủ các cấp Phường (đô thị), Xã (nông thôn, ven sông), Đặc khu (hải đảo). {adminMeta.desc}.
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

        {/* Thanh chọn nhanh Đơn vị Hành chính theo Cấp Phường / Xã / Đặc khu */}
        <div className="relative">
          <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <div className="truncate">
                <span className="text-[11px] text-slate-400 block font-medium">Đang hiển thị biểu đồ & dữ liệu cho:</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate block">
                  {currentName}
                </span>
              </div>
            </div>

            <button
              type="button"
              id="open-admin-unit-picker-btn"
              onClick={() => setIsPickerOpen(!isPickerOpen)}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0 transition-colors"
            >
              <span>Chọn Phường/Xã/Đặc khu</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isPickerOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Administrative Units Dropdown Modal */}
          {isPickerOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 z-40 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-3.5 flex flex-col gap-3 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-blue-600" />
                  Chọn đơn vị hành chính để xem biểu đồ chuyên sâu:
                </span>
                <span className="text-[11px] text-slate-400">
                  Tổng {countStats.total} đơn vị
                </span>
              </div>

              {/* Bộ lọc loại cấp hành chính */}
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                <button
                  type="button"
                  onClick={() => setAdminTypeFilter('all')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                    adminTypeFilter === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Tất cả ({countStats.total})
                </button>
                <button
                  type="button"
                  onClick={() => setAdminTypeFilter('phường')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                    adminTypeFilter === 'phường'
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300'
                  }`}
                >
                  Cấp Phường ({countStats.wards})
                </button>
                <button
                  type="button"
                  onClick={() => setAdminTypeFilter('xã')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                    adminTypeFilter === 'xã'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300'
                  }`}
                >
                  Cấp Xã ({countStats.communes})
                </button>
                <button
                  type="button"
                  onClick={() => setAdminTypeFilter('đặc khu')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                    adminTypeFilter === 'đặc khu'
                      ? 'bg-purple-600 text-white'
                      : 'bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300'
                  }`}
                >
                  Cấp Đặc khu ({countStats.specials})
                </button>
              </div>

              {/* Ô tìm kiếm */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm theo tên Phường, Xã, Đặc khu, Quận..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Danh sách cuộn */}
              <div className="max-h-56 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                {allUnitsList.slice(0, 50).map((unit) => {
                  const isCur = unit.id === currentId;
                  const type = unit.adminType || 'phường';
                  const badge = getAdminBadge(type);

                  return (
                    <button
                      key={unit.id}
                      type="button"
                      onClick={() => handleSelectUnit(unit.id)}
                      className={`w-full text-left p-2 rounded-lg flex items-center justify-between gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors ${
                        isCur ? 'bg-blue-50 dark:bg-blue-950/50 font-bold' : ''
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="text-xs text-slate-800 dark:text-slate-100 truncate">
                          {unit.name}
                        </div>
                        <div className="text-[10.5px] text-slate-400 truncate">
                          {unit.districtGroup || 'TP.HCM'} • {unit.subTitle}
                        </div>
                      </div>

                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border shrink-0 ${badge.badgeClass}`}>
                        {badge.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sync Status Banner */}
      {syncStatusMsg && (
        <div className="px-3 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900 text-xs text-blue-800 dark:text-blue-300 flex items-center gap-2 animate-in fade-in">
          <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
          <span>{syncStatusMsg}</span>
        </div>
      )}

      {/* 2. Thanh chọn mốc ngày quan trắc: kéo rộng thẻ, lướt qua lại mượt mà, chống tràn viền mobile */}
      <div className="flex flex-col gap-2.5 w-full max-w-full overflow-hidden">
        {/* Header điều hướng & chỉ báo */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
              <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Mốc quan trắc:</span>
            </span>
            <span className="text-[10.5px] px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200/60 dark:border-blue-800/60 shrink-0 flex items-center gap-1.5">
              <ArrowLeftRight className="w-3 h-3 text-blue-600 dark:text-blue-400" />
              <span>Lướt qua lại</span>
            </span>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              id="btn-date-prev"
              onClick={() => handleStepDay(-1)}
              title="Lùi về mốc trước"
              aria-label="Lùi về mốc trước"
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 transition-transform cursor-pointer shadow-xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              id="btn-date-next"
              onClick={() => handleStepDay(1)}
              title="Tiến sang mốc sau"
              aria-label="Tiến sang mốc sau"
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 transition-transform cursor-pointer shadow-xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Khung cuộn mốc quan trắc kéo rộng, lướt qua lại thoải mái, chống tràn viền mobile */}
        <div className="relative w-full max-w-full overflow-hidden">
          <div
            ref={dateScrollRef}
            className="flex gap-2.5 overflow-x-auto snap-x snap-mandatory scroll-smooth py-1.5 px-0.5 no-scrollbar touch-pan-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {rangeData.map((day) => {
              const isSelected = day.dateOffset === selectedOffset;
              const isToday = day.dateOffset === 0;

              // Biểu tượng khí tượng theo lượng mưa
              const DayIcon =
                day.maxRainChance >= 60
                  ? CloudRain
                  : day.maxRainChance >= 30
                  ? Cloud
                  : Sun;

              return (
                <button
                  key={day.dateOffset}
                  type="button"
                  id={`day-tab-offset-${day.dateOffset}`}
                  onClick={() => setSelectedOffset(day.dateOffset)}
                  className={`w-[145px] min-w-[145px] sm:w-[165px] sm:min-w-[165px] flex-shrink-0 snap-start flex flex-col justify-between p-3 rounded-2xl border text-left transition-all cursor-pointer select-none ${
                    isSelected
                      ? 'bg-gradient-to-b from-blue-600 to-blue-700 text-white border-blue-600 shadow-md shadow-blue-500/25 ring-2 ring-blue-400/40 scale-[1.01]'
                      : isToday
                      ? 'bg-blue-50/80 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-700 hover:bg-blue-100/60'
                      : 'bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border-slate-200/90 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {/* Hàng trên: Nhãn ngày và Icon khí hậu */}
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span
                      className={`text-[10.5px] uppercase font-bold tracking-wider truncate ${
                        isSelected
                          ? 'text-blue-100'
                          : isToday
                          ? 'text-blue-600 dark:text-blue-400 font-extrabold'
                          : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {day.dateOffset === 0
                        ? 'Hôm nay'
                        : day.dateOffset === -1
                        ? 'Hôm qua'
                        : day.dateOffset === 1
                        ? 'Ngày mai'
                        : day.dateOffset < 0
                        ? `${Math.abs(day.dateOffset)} ngày trước`
                        : `${day.dateOffset} ngày tới`}
                    </span>
                    <DayIcon
                      className={`w-4.5 h-4.5 shrink-0 ${
                        isSelected
                          ? 'text-yellow-300'
                          : day.maxRainChance >= 50
                          ? 'text-blue-500'
                          : 'text-amber-500'
                      }`}
                    />
                  </div>

                  {/* Hàng giữa: Ngày & Thứ */}
                  <div className="my-1">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base sm:text-lg font-extrabold tracking-tight">
                        {day.dateFormatted.slice(0, 5)}
                      </span>
                      <span
                        className={`text-[11px] font-medium truncate ${
                          isSelected ? 'text-blue-100' : 'text-slate-400'
                        }`}
                      >
                        {day.dayOfWeek}
                      </span>
                    </div>
                  </div>

                  {/* Hàng dưới: Biên độ nhiệt & Độ ẩm/Mưa */}
                  <div className="mt-1 pt-1.5 border-t border-current/10 flex items-center justify-between text-[11px]">
                    <span className="font-extrabold text-[11.5px] sm:text-xs">
                      {Math.round(day.minTemp)}° - {Math.round(day.maxTemp)}°C
                    </span>
                    <span
                      className={`text-[10.5px] font-medium flex items-center gap-0.5 shrink-0 ${
                        isSelected ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      <Droplets className="w-3 h-3 text-sky-400" />
                      {day.maxRainChance}%
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Thanh chỉ báo 7 chấm và thông tin đồng bộ */}
        <div className="flex items-center justify-between px-1 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            {rangeData.map((d) => {
              const active = d.dateOffset === selectedOffset;
              return (
                <button
                  key={d.dateOffset}
                  type="button"
                  onClick={() => setSelectedOffset(d.dateOffset)}
                  title={d.fullTitle}
                  className={`transition-all rounded-full cursor-pointer ${
                    active
                      ? 'w-5 h-1.5 bg-blue-600 dark:bg-blue-400'
                      : 'w-1.5 h-1.5 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400'
                  }`}
                />
              );
            })}
          </div>
          <span className="text-[10.5px] italic text-slate-400 hidden sm:inline">
            Vuốt ngang hoặc dùng nút mũi tên để lướt qua lại
          </span>
          {lastSyncedTime && (
            <span className="text-[10px] text-slate-400 font-normal">
              Đồng bộ: {lastSyncedTime}
            </span>
          )}
        </div>
      </div>

      {/* 3. Thẻ tóm tắt ngày đã chọn */}
      {selectedDay && (
        <div className="bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-slate-50 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-slate-900 rounded-2xl p-3.5 border border-blue-100 dark:border-blue-900/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-blue-100/80 dark:border-blue-900/40">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {selectedDay.fullTitle} - {selectedDay.dayOfWeek}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${adminMeta.badgeClass}`}>
                  {adminMeta.label}
                </span>
              </div>
              <p className="text-[12px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                {selectedDay.summary}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 italic">
                {selectedDay.climateTypeDescription}
              </p>
            </div>

            <div className="text-[11px] text-slate-500 dark:text-slate-400 shrink-0 font-medium flex items-center gap-1.5 flex-wrap">
              <span>Trạm quan trắc:</span>
              <span className="font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-800">
                {selectedDay.stationName || liveSourceInfo.station.name} ({selectedDay.stationCode || liveSourceInfo.station.code})
              </span>
            </div>
          </div>

          {/* 6 Thống kê chính của ngày từ trạm khí quyển */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-2.5">
            <div className="bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Thermometer className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                  Biên độ nhiệt
                </span>
                <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100 font-mono">
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
                  Mưa đỉnh điểm
                </span>
                <span className="text-xs font-extrabold text-blue-600 dark:text-blue-300 font-mono">
                  {selectedDay.maxRainChance}% ({selectedDay.totalRainfall}mm)
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
                <span className="text-xs font-extrabold text-teal-600 dark:text-teal-300 font-mono">
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
                <span className="text-xs font-extrabold text-rose-600 dark:text-rose-300 font-mono">
                  {selectedDay.maxUvIndex} ({getUvLevel(selectedDay.maxUvIndex)})
                </span>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                <Wind className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                  Gió lớn nhất
                </span>
                <span className="text-xs font-extrabold text-sky-600 dark:text-sky-300 font-mono">
                  {selectedDay.maxWindSpeed} km/h
                </span>
              </div>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <Gauge className="w-4.5 h-4.5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                  Áp suất khí quyển
                </span>
                <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-300 font-mono">
                  {selectedDay.surfacePressure || 1008.2} hPa
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Hệ thống Đa Biểu Đồ Chuyên Sâu (Không chỉ 1 biểu đồ, mà gồm 6 biểu đồ chuyên biệt!) */}
      <div className="flex flex-col gap-3 pt-1">
        {/* Header điều khiển biểu đồ */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4.5 h-4.5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
              Hệ thống Biểu đồ Khí tượng Chuyên sâu (24 giờ)
            </span>
          </div>

          {/* Toggle Chế độ xem: Từng biểu đồ chi tiết (Tab) vs Xem lưới Dashboard (Grid) */}
          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              type="button"
              id="toggle-grid-charts-view-btn"
              onClick={() => setIsGridView(!isGridView)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                isGridView
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              {isGridView ? (
                <>
                  <Maximize2 className="w-3.5 h-3.5" />
                  Xem tab đơn phóng to
                </>
              ) : (
                <>
                  <LayoutGrid className="w-3.5 h-3.5" />
                  Xem lưới tất cả biểu đồ
                </>
              )}
            </button>
          </div>
        </div>

        {/* Thanh chọn 6 loại biểu đồ (Khi ở chế độ tab) */}
        {!isGridView && (
          <div className="flex items-center gap-1 overflow-x-auto pb-1">
            <button
              type="button"
              id="chart-tab-temp"
              onClick={() => setActiveChart('temp')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                activeChart === 'temp'
                  ? 'bg-amber-500 text-white shadow-xs scale-102'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Thermometer className="w-3.5 h-3.5" />
              1. Nhiệt độ & RealFeel
            </button>

            <button
              type="button"
              id="chart-tab-rain"
              onClick={() => setActiveChart('rain')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                activeChart === 'rain'
                  ? 'bg-blue-600 text-white shadow-xs scale-102'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <CloudRain className="w-3.5 h-3.5" />
              2. Xác suất & Lượng mưa (mm)
            </button>

            <button
              type="button"
              id="chart-tab-humidity"
              onClick={() => setActiveChart('humidity')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                activeChart === 'humidity'
                  ? 'bg-teal-600 text-white shadow-xs scale-102'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Droplets className="w-3.5 h-3.5" />
              3. Độ ẩm & Điểm sương
            </button>

            <button
              type="button"
              id="chart-tab-uv"
              onClick={() => setActiveChart('uv')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                activeChart === 'uv'
                  ? 'bg-rose-600 text-white shadow-xs scale-102'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <SunMedium className="w-3.5 h-3.5" />
              4. Tia UV & Bức xạ (W/m²)
            </button>

            <button
              type="button"
              id="chart-tab-wind"
              onClick={() => setActiveChart('wind')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                activeChart === 'wind'
                  ? 'bg-sky-600 text-white shadow-xs scale-102'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Wind className="w-3.5 h-3.5" />
              5. Tốc độ gió & Gió giật
            </button>

            <button
              type="button"
              id="chart-tab-comparison"
              onClick={() => setActiveChart('comparison')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                activeChart === 'comparison'
                  ? 'bg-purple-600 text-white shadow-xs scale-102'
                  : 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 hover:bg-purple-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              6. So sánh Phường vs Xã vs Đặc khu
            </button>
          </div>
        )}

        {/* NỘI DUNG BIỂU ĐỒ */}
        {!isGridView ? (
          // CHẾ ĐỘ 1: XEM TAB ĐƠN PHÓNG TO
          <div className="w-full bg-slate-50/70 dark:bg-slate-950/40 rounded-2xl p-3 border border-slate-200/70 dark:border-slate-800">
            {/* Biểu đồ 1: Nhiệt độ & Cảm nhận RealFeel */}
            {activeChart === 'temp' && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    🌡️ Biểu đồ 1: Nhiệt độ thực tế vs Nhiệt độ cảm nhận ngoài trời (RealFeel - Heat Index)
                  </span>
                  <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                    {currentAdminType === 'phường'
                      ? 'Hiệu ứng đảo nhiệt đô thị (UHI) làm tăng nhiệt cảm nhận'
                      : currentAdminType === 'đặc khu'
                      ? 'Gió biển điều hòa làm dịu nhiệt cảm nhận'
                      : 'Biên độ nhiệt ngày đêm lớn vùng nông thôn'}
                  </span>
                </div>
                <div className="w-full h-64 sm:h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedDay?.hours} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
                      <XAxis dataKey="hourLabel" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} interval={2} />
                      <YAxis domain={[20, 42]} tick={{ fontSize: 10 }} unit="°C" axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomDetailedTooltip />} />
                      <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} iconType="circle" />
                      <ReferenceLine y={35} stroke="#EF4444" strokeDasharray="3 3" label={{ value: 'Ngưỡng nắng nóng (35°C)', fill: '#EF4444', fontSize: 10 }} />
                      <Line type="monotone" dataKey="temp" name="Nhiệt độ thực tế" unit="°C" stroke="#F59E0B" strokeWidth={2.5} dot={{ r: 2 }} activeDot={{ r: 5 }} />
                      <Line type="monotone" dataKey="feelLikeTemp" name="Nhiệt độ cảm nhận (RealFeel)" unit="°C" stroke="#DC2626" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Biểu đồ 2: Xác suất mưa & Lượng mưa mm */}
            {activeChart === 'rain' && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    🌧️ Biểu đồ 2: Xác suất mưa (%) & Lượng mưa dự báo theo từng giờ (mm/h)
                  </span>
                  <span className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
                    Tổng lượng mưa dự báo trong ngày: {selectedDay?.totalRainfall} mm
                  </span>
                </div>
                <div className="w-full h-64 sm:h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={selectedDay?.hours} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="rainFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
                      <XAxis dataKey="hourLabel" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} interval={2} />
                      <YAxis yAxisId="rainPct" domain={[0, 100]} unit="%" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis yAxisId="rainMm" orientation="right" domain={[0, 30]} unit="mm" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomDetailedTooltip />} />
                      <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} iconType="circle" />
                      <Area yAxisId="rainPct" type="monotone" dataKey="rainChance" name="Xác suất mưa" unit="%" stroke="#2563EB" fill="url(#rainFill)" />
                      <Bar yAxisId="rainMm" dataKey="rainfallAmount" name="Lượng mưa" unit="mm" fill="#0284C7" radius={[3, 3, 0, 0]} maxBarSize={16} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Biểu đồ 3: Độ ẩm & Điểm sương */}
            {activeChart === 'humidity' && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    💧 Biểu đồ 3: Độ ẩm không khí (%) & Điểm đọng sương (Dew Point °C)
                  </span>
                  <span className="text-[11px] text-teal-600 dark:text-teal-400 font-medium">
                    Độ ẩm TB: {selectedDay?.avgHumidity}% • Đánh giá độ ẩm bão hòa & ngưng tụ
                  </span>
                </div>
                <div className="w-full h-64 sm:h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={selectedDay?.hours} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="humFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0D9488" stopOpacity={0.35} />
                          <stop offset="95%" stopColor="#0D9488" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
                      <XAxis dataKey="hourLabel" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} interval={2} />
                      <YAxis yAxisId="hum" domain={[30, 100]} unit="%" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis yAxisId="dew" orientation="right" domain={[15, 30]} unit="°C" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomDetailedTooltip />} />
                      <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} iconType="circle" />
                      <Area yAxisId="hum" type="monotone" dataKey="humidity" name="Độ ẩm không khí" unit="%" stroke="#0D9488" fill="url(#humFill)" strokeWidth={2} />
                      <Line yAxisId="dew" type="monotone" dataKey="dewPoint" name="Điểm đọng sương" unit="°C" stroke="#059669" strokeWidth={2} strokeDasharray="3 3" dot={false} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Biểu đồ 4: Bức xạ mặt trời & Chỉ số tia UV */}
            {activeChart === 'uv' && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    ☀️ Biểu đồ 4: Chỉ số bức xạ cực tím (UV Index) & Bức xạ quang điện (W/m²)
                  </span>
                  <span className="text-[11px] text-rose-600 dark:text-rose-400 font-medium">
                    Đỉnh UV: {selectedDay?.maxUvIndex} ({getUvLevel(selectedDay?.maxUvIndex || 0)})
                  </span>
                </div>
                <div className="w-full h-64 sm:h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={selectedDay?.hours} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
                      <XAxis dataKey="hourLabel" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} interval={2} />
                      <YAxis yAxisId="uv" domain={[0, 13]} tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis yAxisId="rad" orientation="right" domain={[0, 1100]} unit="W/m²" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomDetailedTooltip />} />
                      <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} iconType="circle" />
                      <ReferenceLine yAxisId="uv" y={8} stroke="#E11D48" strokeDasharray="3 3" label={{ value: 'Ngưỡng rất cao (UV 8+)', fill: '#E11D48', fontSize: 10 }} />
                      <Bar yAxisId="uv" dataKey="uvIndex" name="Chỉ số tia UV" fill="#E11D48" radius={[3, 3, 0, 0]} maxBarSize={14} />
                      <Line yAxisId="rad" type="monotone" dataKey="solarRadiation" name="Bức xạ quang học" unit="W/m²" stroke="#F59E0B" strokeWidth={2} dot={false} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Biểu đồ 5: Tốc độ gió & Gió giật */}
            {activeChart === 'wind' && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    💨 Biểu đồ 5: Tốc độ gió trung bình & Gió giật gián đoạn (km/h)
                  </span>
                  <span className="text-[11px] text-sky-600 dark:text-sky-400 font-medium">
                    Gió biển/sông tác động mạnh nhất lúc 14h - 18h
                  </span>
                </div>
                <div className="w-full h-64 sm:h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={selectedDay?.hours} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
                      <XAxis dataKey="hourLabel" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} interval={2} />
                      <YAxis domain={[0, 50]} unit="km/h" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomDetailedTooltip />} />
                      <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} iconType="circle" />
                      <Area type="monotone" dataKey="windSpeed" name="Tốc độ gió TB" unit="km/h" stroke="#0284C7" fill="#BAE6FD" fillOpacity={0.4} strokeWidth={2} />
                      <Line type="monotone" dataKey="windGust" name="Gió giật tức thời" unit="km/h" stroke="#0369A1" strokeWidth={2} strokeDasharray="3 3" dot={false} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Biểu đồ 6: So sánh Phường vs Xã vs Đặc khu */}
            {activeChart === 'comparison' && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div>
                    <span className="text-xs font-bold text-purple-800 dark:text-purple-300 block">
                      🌐 Biểu đồ 6: Đối sánh vi khí hậu Đa cấp độ (Phường vs Xã vs Đặc khu)
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      So sánh trực tiếp giữa Cấp Phường (Quận 1) vs Cấp Xã (Cần Giờ) vs Cấp Đặc khu (Côn Đảo)
                    </span>
                  </div>

                  {/* Selector chỉ số so sánh */}
                  <div className="inline-flex p-0.5 rounded-lg bg-slate-200/80 dark:bg-slate-800 text-xs font-semibold self-start sm:self-center">
                    <button
                      type="button"
                      onClick={() => setComparisonMetric('temp')}
                      className={`px-2 py-1 rounded cursor-pointer ${
                        comparisonMetric === 'temp'
                          ? 'bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 font-bold shadow-2xs'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Nhiệt độ (°C)
                    </button>
                    <button
                      type="button"
                      onClick={() => setComparisonMetric('rain')}
                      className={`px-2 py-1 rounded cursor-pointer ${
                        comparisonMetric === 'rain'
                          ? 'bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 font-bold shadow-2xs'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Xác suất mưa (%)
                    </button>
                    <button
                      type="button"
                      onClick={() => setComparisonMetric('uv')}
                      className={`px-2 py-1 rounded cursor-pointer ${
                        comparisonMetric === 'uv'
                          ? 'bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 font-bold shadow-2xs'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Tia UV
                    </button>
                  </div>
                </div>

                <div className="w-full h-64 sm:h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={comparisonData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
                      <XAxis dataKey="hourLabel" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} interval={2} />
                      <YAxis
                        domain={comparisonMetric === 'temp' ? [20, 40] : comparisonMetric === 'rain' ? [0, 100] : [0, 12]}
                        unit={comparisonMetric === 'temp' ? '°C' : comparisonMetric === 'rain' ? '%' : ''}
                        tick={{ fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip content={<CustomDetailedTooltip />} />
                      <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} iconType="circle" />

                      {comparisonMetric === 'temp' && (
                        <>
                          <Line type="monotone" dataKey="wardTemp" name="Cấp Phường (Phường Sài Gòn, Q1)" unit="°C" stroke="#2563EB" strokeWidth={2.5} dot={false} />
                          <Line type="monotone" dataKey="communeTemp" name="Cấp Xã (Xã Long Hòa, Cần Giờ)" unit="°C" stroke="#059669" strokeWidth={2.5} dot={false} />
                          <Line type="monotone" dataKey="specialZoneTemp" name="Cấp Đặc khu (Đặc khu Côn Đảo)" unit="°C" stroke="#9333EA" strokeWidth={2.5} dot={false} />
                        </>
                      )}

                      {comparisonMetric === 'rain' && (
                        <>
                          <Line type="monotone" dataKey="wardRain" name="Cấp Phường (Mưa đô thị)" unit="%" stroke="#2563EB" strokeWidth={2} dot={false} />
                          <Line type="monotone" dataKey="communeRain" name="Cấp Xã (Dông nhiệt chiều)" unit="%" stroke="#059669" strokeWidth={2} dot={false} />
                          <Line type="monotone" dataKey="specialZoneRain" name="Cấp Đặc khu (Mưa biển đêm/chiều)" unit="%" stroke="#9333EA" strokeWidth={2} dot={false} />
                        </>
                      )}

                      {comparisonMetric === 'uv' && (
                        <>
                          <Line type="monotone" dataKey="wardUv" name="Cấp Phường (Tia UV nội đô)" stroke="#2563EB" strokeWidth={2} dot={false} />
                          <Line type="monotone" dataKey="communeUv" name="Cấp Xã (Tia UV ngoại thành)" stroke="#059669" strokeWidth={2} dot={false} />
                          <Line type="monotone" dataKey="specialZoneUv" name="Cấp Đặc khu (UV biển cực đại)" stroke="#9333EA" strokeWidth={2.5} dot={false} />
                        </>
                      )}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        ) : (
          // CHẾ ĐỘ 2: XEM LƯỚI TẤT CẢ BIỂU ĐỒ (DASHBOARD GRID VIEW)
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {/* Grid Item 1: Nhiệt độ */}
            <div className="bg-slate-50/80 dark:bg-slate-950/40 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1 flex items-center justify-between">
                <span>🌡️ 1. Nhiệt độ & Cảm nhận RealFeel (°C)</span>
                <span className="text-[10px] text-amber-600 font-mono">Đỉnh: {selectedDay?.maxTemp}°C</span>
              </div>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={selectedDay?.hours} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
                    <XAxis dataKey="hourLabel" tick={{ fontSize: 9 }} interval={4} />
                    <YAxis domain={[20, 42]} tick={{ fontSize: 9 }} unit="°" />
                    <Tooltip content={<CustomDetailedTooltip />} />
                    <Line type="monotone" dataKey="temp" name="Nhiệt độ thực" unit="°C" stroke="#F59E0B" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="feelLikeTemp" name="RealFeel" unit="°C" stroke="#DC2626" strokeWidth={1.5} strokeDasharray="3 3" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Grid Item 2: Lượng mưa */}
            <div className="bg-slate-50/80 dark:bg-slate-950/40 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1 flex items-center justify-between">
                <span>🌧️ 2. Xác suất mưa (%) & Lượng mưa (mm)</span>
                <span className="text-[10px] text-blue-600 font-mono">Đỉnh: {selectedDay?.maxRainChance}%</span>
              </div>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={selectedDay?.hours} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
                    <XAxis dataKey="hourLabel" tick={{ fontSize: 9 }} interval={4} />
                    <YAxis yAxisId="left" domain={[0, 100]} tick={{ fontSize: 9 }} unit="%" />
                    <YAxis yAxisId="right" orientation="right" domain={[0, 25]} tick={{ fontSize: 9 }} unit="mm" />
                    <Tooltip content={<CustomDetailedTooltip />} />
                    <Area yAxisId="left" type="monotone" dataKey="rainChance" name="Xác suất mưa" unit="%" stroke="#2563EB" fill="#93C5FD" fillOpacity={0.4} />
                    <Bar yAxisId="right" dataKey="rainfallAmount" name="Lượng mưa" unit="mm" fill="#0284C7" maxBarSize={12} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Grid Item 3: Độ ẩm & Điểm sương */}
            <div className="bg-slate-50/80 dark:bg-slate-950/40 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1 flex items-center justify-between">
                <span>💧 3. Độ ẩm (%) & Điểm đọng sương (°C)</span>
                <span className="text-[10px] text-teal-600 font-mono">TB: {selectedDay?.avgHumidity}%</span>
              </div>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={selectedDay?.hours} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
                    <XAxis dataKey="hourLabel" tick={{ fontSize: 9 }} interval={4} />
                    <YAxis domain={[35, 100]} tick={{ fontSize: 9 }} unit="%" />
                    <Tooltip content={<CustomDetailedTooltip />} />
                    <Line type="monotone" dataKey="humidity" name="Độ ẩm" unit="%" stroke="#0D9488" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="dewPoint" name="Điểm sương" unit="°C" stroke="#059669" strokeWidth={1.5} strokeDasharray="2 2" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Grid Item 4: Tia UV & Gió */}
            <div className="bg-slate-50/80 dark:bg-slate-950/40 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1 flex items-center justify-between">
                <span>☀️ 4. Bức xạ tia UV & Tốc độ gió (km/h)</span>
                <span className="text-[10px] text-rose-600 font-mono">UV max: {selectedDay?.maxUvIndex}</span>
              </div>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={selectedDay?.hours} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
                    <XAxis dataKey="hourLabel" tick={{ fontSize: 9 }} interval={4} />
                    <YAxis yAxisId="uv" domain={[0, 12]} tick={{ fontSize: 9 }} />
                    <YAxis yAxisId="wind" orientation="right" domain={[0, 45]} unit="k" tick={{ fontSize: 9 }} />
                    <Tooltip content={<CustomDetailedTooltip />} />
                    <Bar yAxisId="uv" dataKey="uvIndex" name="Tia UV" fill="#E11D48" maxBarSize={12} />
                    <Line yAxisId="wind" type="monotone" dataKey="windSpeed" name="Tốc độ gió" unit="km/h" stroke="#0284C7" strokeWidth={2} dot={false} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5. Giao diện chi tiết từng giờ: 1h - độ C - % mưa - độ ẩm - tia UV; 2h... */}
      <div className="flex flex-col gap-3 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-[16px] font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
              <span>Bảng dữ liệu 24 giờ chi tiết ({currentName})</span>
              <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                (1h, 2h... Độ C, % Mưa, Độ ẩm, Tia UV, Gió)
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
                      title: `Thời tiết chi tiết lúc ${h.hourLabel} (${currentName})`,
                      category: `Khí tượng ${adminMeta.label}`,
                      description: `Điều kiện ${h.condition}, nhiệt độ thực ${h.temp}°C, cảm nhận ${h.feelLikeTemp}°C tại ${currentName}.`,
                      details: [
                        `Mốc thời gian: ${h.timeFormatted} (${h.hourLabel})`,
                        `Cấp đơn vị hành chính: ${adminMeta.label} (${currentName})`,
                        `Nhiệt độ không khí: ${h.temp}°C (Cảm nhận: ${h.feelLikeTemp}°C)`,
                        `Xác suất mưa: ${h.rainChance}% (Lượng mưa: ${h.rainfallAmount} mm)`,
                        `Độ ẩm tương đối: ${h.humidity}% (Điểm sương: ${h.dewPoint}°C)`,
                        `Chỉ số bức xạ tia cực tím UV: ${h.uvIndex} (${h.uvLevel})`,
                        `Bức xạ mặt trời: ${h.solarRadiation} W/m²`,
                        `Gió: ${h.windSpeed} km/h (Giật: ${h.windGust} km/h - ${h.beaufortScale})`,
                      ],
                      tips: [
                        h.uvIndex >= 6
                          ? 'Tia UV ở mức nguy hại, nên mang theo áo chống nắng, kem chống nắng và kính râm.'
                          : 'Tia UV ở mức an toàn cho các hoạt động ngoài trời.',
                        h.rainChance >= 50
                          ? 'Khả năng có mưa rào cao, nên chủ động chuẩn bị áo mưa hoặc dù khi di chuyển.'
                          : 'Thời tiết tạnh ráo, thuận lợi cho lưu thông.',
                        currentAdminType === 'đặc khu'
                          ? 'Đặc khu hải đảo gió mạnh, chú ý an toàn tàu thuyền và hoạt động ven biển.'
                          : currentAdminType === 'xã'
                          ? 'Vùng ven sông rạch dễ có sương mù sớm và mưa dông nhiệt cục bộ vào buổi chiều.'
                          : 'Khu vực nội thành có hiện tượng tích nhiệt đô thị, nhiệt độ cảm nhận vào buổi tối có thể cao hơn.',
                      ],
                    })
                  }
                  className={`flex flex-col items-center justify-between p-3 rounded-2xl border min-w-[130px] transition-all cursor-pointer active:scale-98 shadow-xs ${
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

                  {/* Main Metric: Nhiệt độ thực & FeelLike */}
                  <div className="text-center">
                    <div className="text-[17px] font-black text-slate-900 dark:text-slate-100 font-mono">
                      {h.temp}°C
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      Feel: {h.feelLikeTemp}°C
                    </div>
                  </div>

                  {/* Chi tiết: % mưa, độ ẩm, tia UV, gió */}
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
                      <span className={`px-1 py-0.2 rounded text-[9.5px] font-bold border ${getUvBadgeStyle(h.uvLevel)}`}>
                        {h.uvIndex}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-slate-500">
                      <span className="flex items-center gap-0.5">
                        <Wind className="w-3 h-3" /> Gió:
                      </span>
                      <span className="font-mono text-[10px]">
                        {h.windSpeed} km/h
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
                  <th className="p-2.5">Nhiệt độ (Thực/Cảm nhận)</th>
                  <th className="p-2.5">Xác suất & Lượng mưa</th>
                  <th className="p-2.5">Độ ẩm (Điểm sương)</th>
                  <th className="p-2.5">Chỉ số UV (Bức xạ)</th>
                  <th className="p-2.5">Gió & Cấp gió</th>
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
                          title: `Khí tượng chi tiết lúc ${h.hourLabel} (${currentName})`,
                          category: `Khí tượng ${adminMeta.label}`,
                          description: `${h.condition}, nhiệt độ ${h.temp}°C, xác suất mưa ${h.rainChance}%.`,
                          details: [
                            `Thời gian: ${h.timeFormatted} (${h.hourLabel})`,
                            `Nhiệt độ thực tế: ${h.temp}°C`,
                            `Nhiệt độ cảm nhận: ${h.feelLikeTemp}°C`,
                            `Khả năng mưa: ${h.rainChance}% (Lượng mưa: ${h.rainfallAmount} mm)`,
                            `Độ ẩm: ${h.humidity}% (Điểm sương: ${h.dewPoint}°C)`,
                            `Tia UV: ${h.uvIndex} (${h.uvLevel}) - Bức xạ: ${h.solarRadiation} W/m²`,
                            `Gió: ${h.windSpeed} km/h (Giật: ${h.windGust} km/h - ${h.beaufortScale})`,
                          ],
                          tips: [
                            h.uvIndex >= 6
                              ? 'Cảnh báo bức xạ UV cao, hạn chế phơi nắng ngoài trời.'
                              : 'Tia cực tím ở mức độ an toàn.',
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
                          <span className="text-slate-700 dark:text-slate-300 truncate max-w-[110px]">
                            {h.condition}
                          </span>
                        </div>
                      </td>

                      <td className="p-2.5 whitespace-nowrap">
                        <span className="font-black text-slate-900 dark:text-slate-100 font-mono">
                          {h.temp}°C
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono ml-1.5">
                          ({h.feelLikeTemp}°C)
                        </span>
                      </td>

                      <td className="p-2.5 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <div className="w-10 bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-blue-600 h-full rounded-full"
                              style={{ width: `${h.rainChance}%` }}
                            />
                          </div>
                          <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">
                            {h.rainChance}%
                          </span>
                          {h.rainfallAmount > 0 && (
                            <span className="text-[10.5px] text-slate-400 font-mono">
                              ({h.rainfallAmount}mm)
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="p-2.5 whitespace-nowrap">
                        <span className="font-mono text-teal-600 dark:text-teal-400 font-bold">
                          {h.humidity}%
                        </span>
                        <span className="text-[10.5px] text-slate-400 font-mono ml-1">
                          ({h.dewPoint}°C)
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

                      <td className="p-2.5 whitespace-nowrap text-slate-600 dark:text-slate-300 font-mono text-[11px]">
                        {h.windSpeed} km/h • {h.beaufortScale}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Kiểm chứng & Xem Dữ liệu Thô JSON từ Cơ sở Dữ liệu Khí tượng */}
      {showRawJsonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50/80 dark:bg-slate-850">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                    Dữ liệu thô JSON: {liveSourceInfo.station.name}
                  </h3>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    Mã trạm: {liveSourceInfo.station.code} • WMO {liveSourceInfo.station.wmoId} • {liveSourceInfo.station.lat}°N, {liveSourceInfo.station.lng}°E
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  id="btn-copy-raw-json"
                  onClick={handleCopyJson}
                  className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Sao chép toàn bộ JSON"
                >
                  {copiedJson ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Đã chép!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Sao chép</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  id="btn-close-raw-json-modal"
                  onClick={() => setShowRawJsonModal(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal API URL Bar */}
            <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2 text-xs">
              <span className="text-slate-500 font-mono truncate text-[11px]">
                {liveSourceInfo.apiUrl}
              </span>
              <a
                href={liveSourceInfo.apiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1 text-[11px]"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Mở tab mới
              </a>
            </div>

            {/* Modal Body: JSON Viewer */}
            <div className="p-4 overflow-y-auto font-mono text-[11.5px] leading-relaxed bg-slate-950 text-emerald-400 flex-1 select-text">
              {rawJsonLoading ? (
                <div className="flex items-center justify-center py-12 gap-2 text-slate-400">
                  <RefreshCw className="w-5 h-5 animate-spin text-blue-400" />
                  <span>Đang truy vấn trực tiếp từ cơ sở dữ liệu khí tượng...</span>
                </div>
              ) : (
                <pre className="whitespace-pre-wrap">{rawJsonContent || 'Không có dữ liệu.'}</pre>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Chuẩn WMO IFS / ICON & QCVN 46:2012/BTNMT • Đo đạc 24/7
              </span>
              <button
                type="button"
                onClick={() => setShowRawJsonModal(false)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Chọn Trạm Khí quyển & Khí tượng Quốc gia Việt Nam */}
      {showStationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 bg-gradient-to-r from-blue-50/80 to-indigo-50/50 dark:from-slate-850 dark:to-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-600 text-white shadow-xs">
                  <Radio className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                    Mạng lưới Trạm Khí quyển & Khí tượng Việt Nam
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Chọn trạm khí tượng quốc gia (VNMHA / WMO) để tiếp nhận trực tiếp số liệu viễn thám
                  </p>
                </div>
              </div>
              <button
                type="button"
                id="btn-close-station-modal"
                onClick={() => setShowStationModal(false)}
                className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Danh sách các trạm */}
            <div className="p-4 overflow-y-auto space-y-3 flex-1 custom-scrollbar">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Hiển thị {VIETNAM_ATMOSPHERIC_STATIONS.length} trạm quan trắc chuẩn WMO khu vực phụ trách Nam Bộ:
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {VIETNAM_ATMOSPHERIC_STATIONS.map((st) => {
                  const isCurrent = liveSourceInfo.station.code === st.code;

                  return (
                    <div
                      key={st.code}
                      id={`station-card-${st.code}`}
                      onClick={() => handleSelectStation(st.code)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-2.5 ${
                        isCurrent
                          ? 'border-blue-500 bg-blue-50/60 dark:bg-blue-950/40 ring-2 ring-blue-500/30'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="inline-flex items-center gap-1 font-mono text-[10.5px] px-2 py-0.5 rounded-md font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                              Mã trạm: {st.code} • WMO {st.wmoId}
                            </span>
                            <h4 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 mt-1">
                              {st.name}
                            </h4>
                          </div>
                          {isCurrent && (
                            <span className="shrink-0 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                              <Check className="w-3.5 h-3.5" />
                              Đang kết nối
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                          {st.assignedArea}
                        </p>

                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 font-mono">
                          <span>Tọa độ: {st.lat.toFixed(4)}°N, {st.lng.toFixed(4)}°E</span>
                          <span>Độ cao: {st.elevationMeters}m</span>
                        </div>

                        {/* Thiết bị trắc diện */}
                        <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700/60">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                            Thiết bị quan trắc khí quyển:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {st.instruments.map((ins, i) => (
                              <span
                                key={i}
                                className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700/70 text-slate-600 dark:text-slate-300"
                              >
                                {ins}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[10.5px] text-slate-500">
                        <span>{st.standard}</span>
                        <span className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
                          {isCurrent ? 'Trạm hiện hành' : 'Kết nối trạm này →'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Theo danh mục trạm quan trắc tài nguyên khí tượng thủy văn Quốc gia Việt Nam
              </span>
              <button
                type="button"
                onClick={() => setShowStationModal(false)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
