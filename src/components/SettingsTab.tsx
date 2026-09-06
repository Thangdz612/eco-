import React, { useState, useEffect } from 'react';
import {
  Shield,
  MapPin,
  Bell,
  HardDrive,
  Sliders,
  Sparkles,
  Info,
  Sun,
  Moon,
  Monitor,
  ExternalLink,
  Smartphone,
  Download,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  RotateCw,
  Trash2,
  Copy,
  Check,
  Lock,
  ChevronDown,
  ChevronUp,
  Cloud,
  CloudRain,
  Radio,
  Calendar,
  Wifi,
  WifiOff,
  Clock,
  RefreshCw,
  Zap,
} from 'lucide-react';
import { UserLocation, ThemeMode } from '../types';
import { isRunningInIframe } from '../utils/geolocation';
import {
  WeatherNotificationItem,
  WeatherStorageConfig,
  getStorageConfig,
  updateStorageConfig,
  getCachedWeatherNotifications,
  syncWeatherNotificationsOnline,
  clearWeatherNotificationCache,
} from '../utils/weatherNotificationStorage';

interface SettingsTabProps {
  userLocation?: UserLocation | null;
  onRefreshLocation?: () => void;
  onOpenDistrictPicker?: () => void;
  onOpenDartApk?: () => void;
  onOpenInstallGuide?: () => void;
  onOpenPermissionsGuide?: () => void;
  themeMode?: ThemeMode;
  onThemeChange?: (mode: ThemeMode) => void;
  systemTheme?: 'light' | 'dark';
  districtId?: string;
  districtName?: string;
}

export interface AppPreferences {
  tempUnit: 'C' | 'F';
  altitudeUnit: 'm' | 'ft';
  refreshRate: '15s' | '30s' | '60s' | 'manual';
  gpsHighAccuracy: boolean;
  offlineAutoSync: boolean;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  userLocation,
  onRefreshLocation,
  onOpenDistrictPicker,
  onOpenDartApk,
  onOpenInstallGuide,
  onOpenPermissionsGuide,
  themeMode = 'system',
  onThemeChange,
  systemTheme = 'light',
  districtId = 'quan-1',
  districtName = 'Phường Sài Gòn',
}) => {
  const [geoStatus, setGeoStatus] = useState<'granted' | 'prompt' | 'denied' | 'checking'>('checking');
  const [notifStatus, setNotifStatus] = useState<'granted' | 'default' | 'denied'>('default');
  const [storageStatus, setStorageStatus] = useState<string>('2.6 MB / 50 MB khả dụng');
  const [statusFeedback, setStatusFeedback] = useState<string | null>(null);
  const [mobileTab, setMobileTab] = useState<'android' | 'ios'>('android');
  const [showTroubleshoot, setShowTroubleshoot] = useState<boolean>(true);
  const [copiedLink, setCopiedLink] = useState(false);

  // Weather Storage (±3 Days) State
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [storageConfig, setStorageConfig] = useState<WeatherStorageConfig>(getStorageConfig);
  const [weatherNotifs, setWeatherNotifs] = useState<WeatherNotificationItem[]>(() =>
    getCachedWeatherNotifications(districtId, districtName)
  );
  const [isSyncingWeather, setIsSyncingWeather] = useState<boolean>(false);
  const [weatherFilter, setWeatherFilter] = useState<'all' | 'today' | 'forecast' | 'history'>('all');
  const [weatherSyncMsg, setWeatherSyncMsg] = useState<string | null>(null);

  useEffect(() => {
    const handleOnline = async () => {
      setIsOnline(true);
      if (storageConfig.autoSyncWhenOnline) {
        await syncWeatherNotificationsOnline(districtId, districtName);
        setWeatherNotifs(getCachedWeatherNotifications(districtId, districtName));
        setStorageConfig(getStorageConfig());
      }
    };
    const handleOffline = () => setIsOnline(false);
    const handleSyncEvent = () => {
      setWeatherNotifs(getCachedWeatherNotifications(districtId, districtName));
      setStorageConfig(getStorageConfig());
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('eco-weather-notifications-synced', handleSyncEvent);
    window.addEventListener('eco-weather-notifications-cleared', handleSyncEvent);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('eco-weather-notifications-synced', handleSyncEvent);
      window.removeEventListener('eco-weather-notifications-cleared', handleSyncEvent);
    };
  }, [districtId, districtName, storageConfig.autoSyncWhenOnline]);

  const handleManualWeatherSync = async () => {
    setIsSyncingWeather(true);
    setWeatherSyncMsg(null);
    const res = await syncWeatherNotificationsOnline(districtId, districtName);
    setWeatherNotifs(getCachedWeatherNotifications(districtId, districtName));
    setStorageConfig(getStorageConfig());
    setIsSyncingWeather(false);
    setWeatherSyncMsg(res.message);
    setTimeout(() => setWeatherSyncMsg(null), 4000);
  };

  const handleClearWeatherCache = () => {
    clearWeatherNotificationCache();
    setWeatherNotifs([]);
    setStorageConfig(getStorageConfig());
    setWeatherSyncMsg('Đã xóa bộ nhớ đệm thông báo thời tiết.');
    setTimeout(() => setWeatherSyncMsg(null), 3000);
  };

  const handleToggleAutoSync = (enabled: boolean) => {
    const updated = updateStorageConfig({ autoSyncWhenOnline: enabled });
    setStorageConfig(updated);
    if (enabled && isOnline) {
      handleManualWeatherSync();
    }
  };

  const filteredWeatherNotifs = weatherNotifs.filter((item) => {
    if (weatherFilter === 'today') return item.dateOffset === 0;
    if (weatherFilter === 'forecast') return item.dateOffset > 0;
    if (weatherFilter === 'history') return item.dateOffset < 0;
    return true;
  });

  const handleCopyLink = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    } catch (_e) {
      // ignore
    }
  };

  const [preferences, setPreferences] = useState<AppPreferences>(() => {
    try {
      const saved = localStorage.getItem('eco_app_preferences');
      if (saved) return JSON.parse(saved);
    } catch (_e) {
      // ignore
    }
    return {
      tempUnit: 'C',
      altitudeUnit: 'm',
      refreshRate: '30s',
      gpsHighAccuracy: true,
      offlineAutoSync: true,
    };
  });

  const savePreferences = (newPrefs: Partial<AppPreferences>) => {
    const updated = { ...preferences, ...newPrefs };
    setPreferences(updated);
    try {
      localStorage.setItem('eco_app_preferences', JSON.stringify(updated));
    } catch (_e) {
      // ignore
    }
  };

  useEffect(() => {
    // Check Geolocation permission
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions
        .query({ name: 'geolocation' as PermissionName })
        .then((result) => {
          setGeoStatus(result.state as 'granted' | 'prompt' | 'denied');
          result.onchange = () => {
            setGeoStatus(result.state as 'granted' | 'prompt' | 'denied');
          };
        })
        .catch(() => {
          setGeoStatus(userLocation ? 'granted' : 'prompt');
        });
    } else {
      setGeoStatus(userLocation ? 'granted' : 'prompt');
    }

    // Check Notifications permission
    if ('Notification' in window) {
      setNotifStatus(Notification.permission);
    }

    // Check Storage
    if (navigator.storage && navigator.storage.estimate) {
      navigator.storage.estimate().then((est) => {
        const usageMb = ((est.usage || 2700000) / (1024 * 1024)).toFixed(1);
        const quotaMb = ((est.quota || 52428800) / (1024 * 1024)).toFixed(0);
        setStorageStatus(`${usageMb} MB / ${quotaMb} MB khả dụng`);
      });
    }
  }, [userLocation]);

  const handleRequestGeo = async () => {
    setStatusFeedback(null);
    if (onRefreshLocation) {
      onRefreshLocation();
    }
    if (isRunningInIframe()) {
      setStatusFeedback('Nếu trình duyệt chặn yêu cầu GPS trong khung xem trước, vui lòng nhấn "Mở tab mới" bên dưới.');
    }
  };

  const handleRequestNotification = async () => {
    if (!('Notification' in window)) {
      setStatusFeedback('Trình duyệt không hỗ trợ Web Notifications');
      return;
    }
    try {
      const permission = await Notification.requestPermission();
      setNotifStatus(permission);
      if (permission === 'granted') {
        setStatusFeedback('Đã bật quyền nhận thông báo cảnh báo thời tiết & môi trường!');
        setTimeout(() => setStatusFeedback(null), 3500);
      } else {
        setStatusFeedback('Quyền thông báo bị từ chối trong trình duyệt.');
        setTimeout(() => setStatusFeedback(null), 3500);
      }
    } catch (_err) {
      setStatusFeedback('Không thể yêu cầu quyền thông báo');
    }
  };

  const handleClearCache = () => {
    try {
      localStorage.removeItem('eco_app_notes');
      localStorage.removeItem('eco_app_preferences');
      setStatusFeedback('Đã xóa bộ nhớ đệm và khôi phục cài đặt mặc định thành công!');
      setTimeout(() => setStatusFeedback(null), 3000);
    } catch (_e) {
      setStatusFeedback('Lỗi khi xóa bộ nhớ đệm');
    }
  };

  const inIframe = isRunningInIframe();

  return (
    <div className="p-4 space-y-4 pb-20 animate-in fade-in duration-200">
      {/* Settings Header Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#0D47A1]/10 dark:bg-blue-900/40 text-[#0D47A1] dark:text-blue-400 flex items-center justify-center">
            <Sliders className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h2 className="text-[18px] font-extrabold text-[#0F172A] dark:text-white tracking-tight">
              Cài Đặt Ứng Dụng
            </h2>
            <p className="text-[12px] text-[#64748B] dark:text-slate-400">
              Giao diện, quyền GPS, đơn vị đo & quản lý hệ thống
            </p>
          </div>
        </div>
      </div>

      {/* Quick highlight card for Weather Storage ±3 Days */}
      <div className="p-3.5 rounded-2xl bg-linear-to-r from-blue-500/10 via-indigo-500/10 to-emerald-500/10 border border-blue-200 dark:border-blue-800/80 flex items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-[#0D47A1] text-white flex items-center justify-center shrink-0">
            <CloudRain className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[12px] font-extrabold text-[#0F172A] dark:text-white truncate">
                Lưu Trữ Thời Tiết (±3 Ngày)
              </span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                Khi có mạng
              </span>
            </div>
            <p className="text-[10.5px] text-[#64748B] dark:text-slate-400 truncate">
              {isOnline ? '🟢 Đang có Internet • Tự động lưu' : '🔴 Ngoại tuyến • Dùng dữ liệu đệm'}
            </p>
          </div>
        </div>
        <a
          href="#weather-storage-section"
          className="px-2.5 py-1.5 rounded-xl bg-[#0D47A1] hover:bg-[#1565C0] text-white text-[11px] font-bold shrink-0 transition-colors shadow-xs cursor-pointer"
        >
          Xem ngay ↓
        </a>
      </div>

      {/* Feedback Banner */}
      {statusFeedback && (
        <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-2 animate-in fade-in">
          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div className="leading-snug">{statusFeedback}</div>
        </div>
      )}

      {/* Section 1: Giao diện sáng / tối */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">
              Chế Độ Giao Diện
            </h3>
          </div>
          <span className="text-[11px] text-[#64748B] dark:text-slate-400">
            {themeMode === 'system'
              ? `Tự động (${systemTheme === 'dark' ? 'Tối' : 'Sáng'})`
              : themeMode === 'dark'
              ? 'Chế độ tối'
              : 'Chế độ sáng'}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => onThemeChange && onThemeChange('system')}
            className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
              themeMode === 'system'
                ? 'bg-white dark:bg-slate-900 border-[#0D47A1] dark:border-blue-500 shadow-xs'
                : 'bg-white/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            <Monitor className="w-4 h-4 text-[#0D47A1] dark:text-blue-400" />
            <span className="text-[11px] font-bold">Theo máy</span>
          </button>

          <button
            type="button"
            onClick={() => onThemeChange && onThemeChange('light')}
            className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
              themeMode === 'light'
                ? 'bg-white dark:bg-slate-900 border-amber-500 shadow-xs text-amber-700 dark:text-amber-400'
                : 'bg-white/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            <Sun className="w-4 h-4 text-amber-500" />
            <span className="text-[11px] font-bold">Giao diện sáng</span>
          </button>

          <button
            type="button"
            onClick={() => onThemeChange && onThemeChange('dark')}
            className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
              themeMode === 'dark'
                ? 'bg-white dark:bg-slate-900 border-indigo-500 shadow-xs text-indigo-700 dark:text-indigo-400'
                : 'bg-white/60 dark:bg-slate-900/40 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            <Moon className="w-4 h-4 text-indigo-400" />
            <span className="text-[11px] font-bold">Giao diện tối</span>
          </button>
        </div>
      </div>

      {/* Section: Lưu Trữ Thông Báo Thời Tiết (±3 Ngày khi có Internet) */}
      <div id="weather-storage-section" className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-3.5 scroll-mt-4">
        {/* Header of the section */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-[#0D47A1] dark:text-blue-400 flex items-center justify-center shrink-0">
              <CloudRain className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0F172A] dark:text-white flex items-center gap-1.5">
                <span>Lưu Trữ Thông Báo Thời Tiết (±3 Ngày)</span>
              </h3>
              <span className="text-[11px] text-[#64748B] dark:text-slate-400">
                Tự động đồng bộ và lưu đệm khi có kết nối Internet
              </span>
            </div>
          </div>
          
          <span
            className={`text-[10.5px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0 ${
              isOnline
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>

        {/* Feature Explanation & Policy */}
        <p className="text-[12px] text-[#64748B] dark:text-slate-400 leading-relaxed">
          Khi thiết bị kết nối Internet (Wi-Fi/4G), ứng dụng tự động tải và lưu trữ thông báo thời tiết trong phạm vi <strong>±3 ngày</strong> (3 ngày trước lịch sử, hôm nay, và 3 ngày tới dự báo) vào bộ nhớ cục bộ để bạn có thể xem lại bất kỳ lúc nào ngay cả khi không có mạng.
        </p>

        {/* Auto Sync Toggle Switch */}
        <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shadow-xs">
          <div className="min-w-0">
            <span className="text-xs font-bold text-[#0F172A] dark:text-white block">
              Tự động lưu trữ khi có Internet
            </span>
            <span className="text-[10.5px] text-[#64748B] dark:text-slate-400 block leading-tight">
              Tự động cập nhật dữ liệu ±3 ngày khi bắt được sóng mạng
            </span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={storageConfig.autoSyncWhenOnline}
              onChange={(e) => handleToggleAutoSync(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-[#0D47A1]" />
          </label>
        </div>

        {/* Feedback Message */}
        {weatherSyncMsg && (
          <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{weatherSyncMsg}</span>
          </div>
        )}

        {/* 4 Metrics Stats Grid */}
        <div className="grid grid-cols-2 xs:grid-cols-4 gap-2">
          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
            <span className="text-[10px] text-[#64748B] dark:text-slate-400 block">Đã lưu đệm</span>
            <span className="text-sm font-extrabold text-[#0D47A1] dark:text-blue-400 block mt-0.5">
              {weatherNotifs.length} thông báo
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
            <span className="text-[10px] text-[#64748B] dark:text-slate-400 block">Phạm vi</span>
            <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 block mt-0.5">
              ±3 ngày
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
            <span className="text-[10px] text-[#64748B] dark:text-slate-400 block">Khu vực</span>
            <span className="text-xs font-bold text-[#0F172A] dark:text-white truncate block mt-1" title={districtName}>
              {districtName}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
            <span className="text-[10px] text-[#64748B] dark:text-slate-400 block">Đồng bộ cuối</span>
            <span className="text-[10.5px] font-bold text-slate-700 dark:text-slate-300 block mt-1">
              {storageConfig.lastSyncTimestamp
                ? new Date(storageConfig.lastSyncTimestamp).toLocaleTimeString('vi-VN', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : 'Chưa có'}
            </span>
          </div>
        </div>

        {/* Action Buttons: Sync Now & Clear Cache */}
        <div className="grid grid-cols-2 gap-2 pt-0.5">
          <button
            type="button"
            onClick={handleManualWeatherSync}
            disabled={isSyncingWeather}
            className="py-2.5 px-3 rounded-xl bg-[#0D47A1] hover:bg-[#1565C0] text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-98 transition-all disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncingWeather ? 'animate-spin' : ''}`} />
            <span>{isSyncingWeather ? 'Đang đồng bộ...' : 'Đồng bộ ngay khi có mạng'}</span>
          </button>

          <button
            type="button"
            onClick={handleClearWeatherCache}
            disabled={isSyncingWeather || weatherNotifs.length === 0}
            className="py-2.5 px-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-red-400 text-slate-700 dark:text-slate-300 hover:text-red-600 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-98 transition-all disabled:opacity-40"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Làm trống đệm</span>
          </button>
        </div>

        {/* Preview of Stored Weather Notifications */}
        <div className="pt-2 border-t border-slate-200/80 dark:border-slate-700/80 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#0F172A] dark:text-white">
              Xem danh sách thông báo đã lưu trong máy:
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              {filteredWeatherNotifs.length}/{weatherNotifs.length}
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 custom-scrollbar text-[11px] font-bold">
            <button
              type="button"
              onClick={() => setWeatherFilter('all')}
              className={`px-2.5 py-1 rounded-lg shrink-0 cursor-pointer transition-all ${
                weatherFilter === 'all'
                  ? 'bg-[#0D47A1] text-white shadow-xs'
                  : 'bg-slate-200/70 dark:bg-slate-700/60 text-slate-600 dark:text-slate-400'
              }`}
            >
              Tất cả (±3 ngày)
            </button>
            <button
              type="button"
              onClick={() => setWeatherFilter('today')}
              className={`px-2.5 py-1 rounded-lg shrink-0 cursor-pointer transition-all ${
                weatherFilter === 'today'
                  ? 'bg-[#0D47A1] text-white shadow-xs'
                  : 'bg-slate-200/70 dark:bg-slate-700/60 text-slate-600 dark:text-slate-400'
              }`}
            >
              Hôm nay (0)
            </button>
            <button
              type="button"
              onClick={() => setWeatherFilter('forecast')}
              className={`px-2.5 py-1 rounded-lg shrink-0 cursor-pointer transition-all ${
                weatherFilter === 'forecast'
                  ? 'bg-[#0D47A1] text-white shadow-xs'
                  : 'bg-slate-200/70 dark:bg-slate-700/60 text-slate-600 dark:text-slate-400'
              }`}
            >
              Dự báo (+1..+3 ngày)
            </button>
            <button
              type="button"
              onClick={() => setWeatherFilter('history')}
              className={`px-2.5 py-1 rounded-lg shrink-0 cursor-pointer transition-all ${
                weatherFilter === 'history'
                  ? 'bg-[#0D47A1] text-white shadow-xs'
                  : 'bg-slate-200/70 dark:bg-slate-700/60 text-slate-600 dark:text-slate-400'
              }`}
            >
              Lịch sử (-1..-3 ngày)
            </button>
          </div>

          {/* Notification List preview */}
          <div className="space-y-2 max-h-72 overflow-y-auto custom-scrollbar pr-0.5">
            {filteredWeatherNotifs.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                Chưa có thông báo nào trong mục này. Bấm "Đồng bộ ngay khi có mạng" ở trên.
              </div>
            ) : (
              filteredWeatherNotifs.map((item) => {
                const timeStr = new Date(item.timestamp).toLocaleTimeString('vi-VN', {
                  hour: '2-digit',
                  minute: '2-digit',
                });
                return (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 space-y-1.5 shadow-2xs"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={`text-[9.5px] px-1.5 py-0.2 font-bold rounded-full ${
                            item.dateOffset === 0
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300'
                              : item.dateOffset > 0
                              ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-300'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                          }`}
                        >
                          {item.dateLabel}
                        </span>

                        <span
                          className={`text-[9.5px] px-1.5 py-0.2 font-bold rounded-full ${
                            item.severity === 'high'
                              ? 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300'
                              : item.severity === 'medium'
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                              : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                          }`}
                        >
                          {item.severity === 'high'
                            ? 'Cảnh báo cao'
                            : item.severity === 'medium'
                            ? 'Chú ý'
                            : 'Thông tin'}
                        </span>
                      </div>

                      <span className="text-[10px] text-slate-400 font-mono shrink-0">
                        {timeStr}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-[#0F172A] dark:text-white leading-snug">
                      {item.title}
                    </h4>

                    <p className="text-[11.5px] text-[#64748B] dark:text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Section 2: Quyền vị trí & GPS */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-red-500" />
            <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">
              Quyền Vị Trí & GPS
            </h3>
          </div>
          <span
            className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
              geoStatus === 'granted' || userLocation?.isRealGps
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                : geoStatus === 'denied'
                ? 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300'
                : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
            }`}
          >
            {geoStatus === 'granted' || userLocation?.isRealGps
              ? 'Đã cấp quyền GPS'
              : geoStatus === 'denied'
              ? 'Đang bị chặn'
              : 'Chưa cấp quyền'}
          </span>
        </div>

        <p className="text-[12px] text-[#64748B] dark:text-slate-400 leading-relaxed">
          Định vị GPS giúp tự động đo độ cao thực tế so với mực nước biển, độ ẩm, áp suất và gán trạm quan trắc gần nhất trong 168+ xã phường.
        </p>

        {userLocation && (
          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs grid grid-cols-2 gap-2">
            <div>
              <span className="text-[#64748B] dark:text-slate-400 block text-[10px]">Trạm gần nhất</span>
              <span className="font-bold text-[#0F172A] dark:text-white truncate block">
                {userLocation.nearestDistrictName}
              </span>
            </div>
            <div>
              <span className="text-[#64748B] dark:text-slate-400 block text-[10px]">Khoảng cách</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {userLocation.distanceKm === 0 ? 'Tại điểm trạm' : `Cách ~${userLocation.distanceKm} km`}
              </span>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-1">
          <button
            type="button"
            onClick={handleRequestGeo}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#0D47A1] dark:bg-blue-600 hover:bg-[#1565C0] text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-98 transition-all"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Kích hoạt định vị GPS</span>
          </button>

          <button
            type="button"
            onClick={() => window.open(window.location.href, '_blank')}
            className="py-2.5 px-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-900/80 transition-all"
            title="Mở tab mới nếu iFrame chặn cấp quyền"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Mở Tab mới</span>
          </button>
        </div>

        {/* Mobile Quick Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={handleCopyLink}
            className="py-2 px-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-blue-500 font-bold text-[11.5px] text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600 dark:text-emerald-400">Đã chép liên kết!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Sao chép link web</span>
              </>
            )}
          </button>

          {onOpenDistrictPicker && (
            <button
              type="button"
              onClick={onOpenDistrictPicker}
              className="py-2 px-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-[#0D47A1] dark:text-blue-300 font-bold text-[11.5px] flex items-center justify-center gap-1.5 cursor-pointer hover:bg-blue-100 transition-all"
            >
              <MapPin className="w-3.5 h-3.5 text-[#0D47A1] dark:text-blue-400" />
              <span>Chọn Xã/Phường ngay</span>
            </button>
          )}
        </div>

        {/* Mobile GPS Troubleshooting Section */}
        <div className="pt-2 border-t border-slate-200/80 dark:border-slate-750">
          <button
            type="button"
            onClick={() => setShowTroubleshoot(!showTroubleshoot)}
            className="w-full py-1.5 flex items-center justify-between text-xs font-bold text-[#0D47A1] dark:text-blue-400 cursor-pointer"
          >
            <div className="flex items-center gap-1.5">
              <Smartphone className="w-4 h-4" />
              <span>Hướng dẫn sửa lỗi không cấp được GPS trên điện thoại</span>
            </div>
            {showTroubleshoot ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showTroubleshoot && (
            <div className="mt-2.5 space-y-2.5 text-xs text-slate-600 dark:text-slate-300 animate-in fade-in">
              {/* OS Tabs */}
              <div className="flex bg-slate-200/80 dark:bg-slate-750 p-0.5 rounded-xl text-[11.5px] font-bold">
                <button
                  type="button"
                  onClick={() => setMobileTab('android')}
                  className={`flex-1 py-1.5 rounded-lg cursor-pointer transition-all ${
                    mobileTab === 'android'
                      ? 'bg-white dark:bg-slate-900 text-[#0D47A1] dark:text-blue-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  Android (Xiaomi, Samsung, Oppo...)
                </button>
                <button
                  type="button"
                  onClick={() => setMobileTab('ios')}
                  className={`flex-1 py-1.5 rounded-lg cursor-pointer transition-all ${
                    mobileTab === 'ios'
                      ? 'bg-white dark:bg-slate-900 text-[#0D47A1] dark:text-blue-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  iPhone / iPad (iOS Safari)
                </button>
              </div>

              {mobileTab === 'android' ? (
                <div className="space-y-2 text-[11.5px] leading-relaxed">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900/60 text-[#0D47A1] dark:text-blue-300 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
                    <div>
                      <strong>Bật GPS máy:</strong> Vuốt từ đỉnh màn hình điện thoại xuống ➔ Tìm và bật biểu tượng <strong>"Vị trí" (GPS)</strong>.
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900/60 text-[#0D47A1] dark:text-blue-300 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
                    <div>
                      <strong>Mở quyền trên Chrome:</strong> Nhấn biểu tượng <strong>ổ khóa 🔒 hoặc nút ⚙️ / 2 gạch</strong> bên trái thanh URL ➔ Chọn <strong>Quyền (Permissions)</strong> ➔ Bật <strong>Vị trí (Location)</strong> sang <strong>Cho phép</strong> ➔ Nhấn Tải lại trang.
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900/60 text-[#0D47A1] dark:text-blue-300 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
                    <div>
                      <strong>Cấp quyền hệ điều hành cho Chrome:</strong> Vào <em>Cài đặt điện thoại ➔ Ứng dụng ➔ Chrome ➔ Quyền ➔ Vị trí</em> ➔ Chọn <strong>"Chỉ cho phép khi dùng ứng dụng"</strong> và gạt bật <strong>"Sử dụng vị trí chính xác"</strong>.
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900/60 text-[#0D47A1] dark:text-blue-300 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">4</span>
                    <div>
                      <strong>Mở bằng trình duyệt ngoài:</strong> Nếu đang mở từ AI Studio, Zalo, Facebook Messenger: Bấm nút <strong>[Sao chép link web]</strong> ở trên ➔ Mở ứng dụng <strong>Google Chrome</strong> độc lập rồi dán vào.
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-[11.5px] leading-relaxed">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900/60 text-[#0D47A1] dark:text-blue-300 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
                    <div>
                      <strong>Bật Dịch vụ định vị:</strong> Vào <em>Cài đặt máy ➔ Quyền riêng tư & Bảo mật ➔ Dịch vụ định vị</em> ➔ Bật công tắc <strong>Dịch vụ định vị</strong>.
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900/60 text-[#0D47A1] dark:text-blue-300 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
                    <div>
                      <strong>Cấp quyền cho Safari:</strong> Trong mục Dịch vụ định vị, kéo xuống tìm <strong>Trang web Safari</strong> ➔ Chọn <strong>"Khi dùng ứng dụng"</strong> và bật <strong>"Vị trí chính xác"</strong>.
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900/60 text-[#0D47A1] dark:text-blue-300 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
                    <div>
                      <strong>Tải lại trang:</strong> Quay lại trình duyệt Safari, bấm biểu tượng mũi tên tròn để tải lại trang ➔ Nhấn <strong>"Cho phép"</strong> khi xuất hiện hộp thoại.
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Section 3: Cấu hình đơn vị & tần suất */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#0D47A1] dark:text-blue-400" />
          <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">
            Đơn Vị & Tần Suất Quan Trắc
          </h3>
        </div>

        <div className="space-y-2.5 text-xs">
          <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-slate-700 dark:text-slate-300 font-medium">Đơn vị nhiệt độ</span>
            <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg">
              <button
                type="button"
                onClick={() => savePreferences({ tempUnit: 'C' })}
                className={`px-2.5 py-1 rounded-md font-bold text-xs cursor-pointer transition-all ${
                  preferences.tempUnit === 'C'
                    ? 'bg-[#0D47A1] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                °C
              </button>
              <button
                type="button"
                onClick={() => savePreferences({ tempUnit: 'F' })}
                className={`px-2.5 py-1 rounded-md font-bold text-xs cursor-pointer transition-all ${
                  preferences.tempUnit === 'F'
                    ? 'bg-[#0D47A1] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                °F
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-slate-700 dark:text-slate-300 font-medium">Đơn vị độ cao địa hình</span>
            <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg">
              <button
                type="button"
                onClick={() => savePreferences({ altitudeUnit: 'm' })}
                className={`px-2.5 py-1 rounded-md font-bold text-xs cursor-pointer transition-all ${
                  preferences.altitudeUnit === 'm'
                    ? 'bg-[#0D47A1] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Mét (m)
              </button>
              <button
                type="button"
                onClick={() => savePreferences({ altitudeUnit: 'ft' })}
                className={`px-2.5 py-1 rounded-md font-bold text-xs cursor-pointer transition-all ${
                  preferences.altitudeUnit === 'ft'
                    ? 'bg-[#0D47A1] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Feet (ft)
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-slate-700 dark:text-slate-300 font-medium">GPS độ chính xác cao (Vệ tinh)</span>
            <input
              type="checkbox"
              checked={preferences.gpsHighAccuracy}
              onChange={(e) => savePreferences({ gpsHighAccuracy: e.target.checked })}
              className="w-4 h-4 text-[#0D47A1] rounded cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Section 4: Quyền Thông Báo Cảnh Báo */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">
              Cảnh Báo & Thông Báo Môi Trường
            </h3>
          </div>
          <span
            className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
              notifStatus === 'granted'
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
            }`}
          >
            {notifStatus === 'granted' ? 'Đã bật thông báo' : 'Chưa bật'}
          </span>
        </div>

        <p className="text-[12px] text-[#64748B] dark:text-slate-400 leading-relaxed">
          Nhận tin tức tức thì khi triều cường dâng cao ngập tuyến đường, tia cực tím UV đạt ngưỡng nguy hại hoặc ô nhiễm bụi mịn AQI vượt chuẩn.
        </p>

        <button
          type="button"
          onClick={handleRequestNotification}
          className="w-full py-2 px-3 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
        >
          <Bell className="w-3.5 h-3.5" />
          <span>{notifStatus === 'granted' ? 'Cập nhật cài đặt thông báo' : 'Bật nhận thông báo cảnh báo'}</span>
        </button>

        {onOpenPermissionsGuide && (
          <button
            type="button"
            onClick={onOpenPermissionsGuide}
            className="w-full py-2 px-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
          >
            <Smartphone className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Xử lý "Từ chối thông báo / Không có quyền" trên ĐT</span>
          </button>
        )}
      </div>

      {/* Section 5: Xuất APK & Hướng dẫn cài đặt */}
      <div className="p-4 rounded-2xl bg-linear-to-r from-blue-50 to-emerald-50 dark:from-blue-950/30 dark:to-emerald-950/30 border border-blue-200 dark:border-blue-900/50 space-y-3">
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-[#0D47A1] dark:text-blue-400" />
          <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">
            Cài Đặt Lên Điện Thoại & Xuất APK
          </h3>
        </div>

        <p className="text-[12px] text-slate-600 dark:text-slate-300 leading-relaxed">
          Ứng dụng hỗ trợ chạy cài đặt trực tiếp như một ứng dụng Native trên Android & iOS (PWA), hoặc xuất mã nguồn Dart Flutter để build file APK.
        </p>

        <div className="grid grid-cols-2 gap-2 pt-1">
          {onOpenInstallGuide && (
            <button
              type="button"
              onClick={onOpenInstallGuide}
              className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#0D47A1] text-[#0D47A1] dark:text-blue-400 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Hướng dẫn cài đặt</span>
            </button>
          )}

          {onOpenDartApk && (
            <button
              type="button"
              onClick={onOpenDartApk}
              className="p-2.5 rounded-xl bg-[#0D47A1] dark:bg-blue-600 hover:bg-[#1565C0] text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất mã nguồn APK</span>
            </button>
          )}
        </div>
      </div>

      {/* Section 6: Bộ nhớ đệm & Dọn dẹp */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-slate-600 dark:text-slate-400" />
            <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">
              Bộ Nhớ Đệm Ngoại Tuyến (Offline)
            </h3>
          </div>
          <span className="text-[11px] text-[#64748B] dark:text-slate-400 font-mono">
            {storageStatus}
          </span>
        </div>

        <p className="text-[12px] text-[#64748B] dark:text-slate-400 leading-relaxed">
          Lưu trữ ngoại tuyến dữ liệu 168+ xã phường, ghi chú nhật ký môi trường và cấu hình cá nhân không cần mạng Internet.
        </p>

        <button
          type="button"
          onClick={handleClearCache}
          className="py-2 px-3 rounded-xl border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Xóa bộ nhớ đệm & Đặt lại mặc định</span>
        </button>
      </div>

      {/* Section 7: Thông tin ứng dụng */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-center space-y-1">
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
          <Shield className="w-4 h-4 text-emerald-600" />
          <span>EcoApp - Môi Trường & Thời Tiết v2.4</span>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          Mạng lưới quan trắc 168+ xã phường (TP. Hồ Chí Minh & Bình Dương)
        </p>
        <p className="text-[10.5px] text-slate-400 dark:text-slate-500 pt-1">
          Tích hợp giám sát thời tiết, độ cao địa hình, phát triển doanh nghiệp & bảo vệ môi trường
        </p>
      </div>
    </div>
  );
};
