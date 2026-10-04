import React, { useState, useEffect } from 'react';
import {
  X,
  Shield,
  MapPin,
  Bell,
  Camera,
  HardDrive,
  Compass,
  CheckCircle2,
  AlertCircle,
  Clock,
  Smartphone,
  Copy,
  Check,
  Sliders,
  Sparkles,
  Info,
  Lock,
  Sun,
  Moon,
  Monitor,
  HelpCircle,
  ExternalLink,
  CloudRain,
  Wifi,
  WifiOff,
  Database,
  RotateCw,
  Calendar,
  Waves,
  Trash2,
  ArrowRight,
} from 'lucide-react';
import { UserLocation, ThemeMode } from '../types';
import { isRunningInIframe, requestGeolocationPermission } from '../utils/geolocation';
import {
  WeatherNotificationItem,
  WeatherStorageConfig,
  getStorageConfig,
  updateStorageConfig,
  getCachedWeatherNotifications,
  syncWeatherNotificationsOnline,
  clearWeatherNotificationCache,
} from '../utils/weatherNotificationStorage';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userLocation?: UserLocation | null;
  onRefreshLocation?: () => void;
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

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  userLocation,
  onRefreshLocation,
  themeMode = 'system',
  onThemeChange,
  systemTheme = 'light',
  districtId = 'quan-1',
  districtName = 'Quận 1',
}) => {
  const [activeTab, setActiveTab] = useState<'preferences' | 'permissions' | 'weatherCache'>('preferences');

  // Weather Notification Storage State (±3 days)
  const [weatherConfig, setWeatherConfig] = useState<WeatherStorageConfig>(getStorageConfig());
  const [weatherNotifications, setWeatherNotifications] = useState<WeatherNotificationItem[]>([]);
  const [weatherFilter, setWeatherFilter] = useState<'all' | 'today' | 'forecast' | 'history'>('all');
  const [isSyncingWeather, setIsSyncingWeather] = useState(false);
  const [weatherSyncMsg, setWeatherSyncMsg] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  // Permissions state
  const [geoStatus, setGeoStatus] = useState<'granted' | 'prompt' | 'denied' | 'checking'>('checking');
  const [notifStatus, setNotifStatus] = useState<'granted' | 'default' | 'denied'>('default');
  const [cameraStatus, setCameraStatus] = useState<'granted' | 'prompt' | 'denied' | 'untested'>('untested');
  const [storageStatus, setStorageStatus] = useState<string>('2.6 MB / 50 MB khả dụng');
  const [isRequestingPermission, setIsRequestingPermission] = useState<string | null>(null);
  const [statusFeedback, setStatusFeedback] = useState<string | null>(null);

  // App settings stored in local state (persisted to localStorage)
  const [preferences, setPreferences] = useState<AppPreferences>(() => {
    try {
      const saved = localStorage.getItem('eco_app_preferences');
      if (saved) return JSON.parse(saved);
    } catch (e) {
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
    } catch (e) {
      // ignore
    }
  };

  // Check actual permissions upon opening
  useEffect(() => {
    if (!isOpen) return;

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
  }, [isOpen, userLocation]);

  // Weather storage load & sync listeners
  const loadWeatherCache = () => {
    setWeatherConfig(getStorageConfig());
    setWeatherNotifications(getCachedWeatherNotifications(districtId, districtName));
  };

  useEffect(() => {
    if (isOpen) {
      loadWeatherCache();
    }
  }, [isOpen, districtId, districtName]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    const handleSynced = () => loadWeatherCache();

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('eco-weather-notifications-synced', handleSynced);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('eco-weather-notifications-synced', handleSynced);
    };
  }, [districtId, districtName]);

  const handleToggleAutoSync = (checked: boolean) => {
    const updated = updateStorageConfig({ autoSyncWhenOnline: checked });
    setWeatherConfig(updated);
    setStatusFeedback(
      checked
        ? 'Đã bật tự động lưu trữ thông báo thời tiết ±3 ngày khi có Internet'
        : 'Đã tắt tự động lưu trữ thông báo thời tiết'
    );
    setTimeout(() => setStatusFeedback(null), 3000);
  };

  const handleSyncWeatherNow = async () => {
    if (!isOnline) {
      setWeatherSyncMsg('Thiết bị đang ngoại tuyến. Vui lòng kết nối Wi-Fi hoặc 4G để đồng bộ dữ liệu thời tiết.');
      setTimeout(() => setWeatherSyncMsg(null), 3500);
      return;
    }
    setIsSyncingWeather(true);
    setWeatherSyncMsg(null);
    const res = await syncWeatherNotificationsOnline(districtId, districtName);
    setIsSyncingWeather(false);
    loadWeatherCache();
    setWeatherSyncMsg(res.message);
    setTimeout(() => setWeatherSyncMsg(null), 4000);
  };

  const handleClearWeatherCache = () => {
    clearWeatherNotificationCache();
    loadWeatherCache();
    setWeatherSyncMsg('Đã làm trống bộ nhớ đệm thông báo thời tiết.');
    setTimeout(() => setWeatherSyncMsg(null), 3000);
  };

  // Handler: Request Geolocation
  const handleRequestGeo = async () => {
    setIsRequestingPermission('geo');
    setStatusFeedback(null);
    try {
      const res = await requestGeolocationPermission();
      setGeoStatus(res.status === 'granted' ? 'granted' : res.status === 'denied' ? 'denied' : 'prompt');
      setStatusFeedback(res.message);
      if (res.granted && onRefreshLocation) {
        onRefreshLocation();
      }
      setTimeout(() => setStatusFeedback(null), 4000);
    } finally {
      setIsRequestingPermission(null);
    }
  };

  // Handler: Request Notifications
  const handleRequestNotifications = async () => {
    setIsRequestingPermission('notif');
    setStatusFeedback(null);
    try {
      if (!('Notification' in window)) {
        setStatusFeedback('Thiết bị hoặc iframe này không hỗ trợ Web Notification');
        return;
      }

      const res = await Notification.requestPermission();
      setNotifStatus(res);
      if (res === 'granted') {
        setStatusFeedback('Đã kích hoạt quyền thông báo cảnh báo môi trường!');
        try {
          new Notification('🌿 EcoApp Thông Báo', {
            body: 'Hệ thống cảnh báo môi trường & thời tiết 168 xã phường đã kích hoạt thành công!',
            icon: '/favicon.ico',
          });
        } catch (e) {
          // ignore
        }
      } else if (res === 'denied') {
        setStatusFeedback('Bạn đã từ chối quyền thông báo. Hãy mở cài đặt trình duyệt để cho phép lại.');
      }
      setTimeout(() => setStatusFeedback(null), 3500);
    } catch (e) {
      setStatusFeedback('Không thể yêu cầu quyền thông báo trong môi trường này.');
      setTimeout(() => setStatusFeedback(null), 3500);
    } finally {
      setIsRequestingPermission(null);
    }
  };

  // Handler: Request Camera
  const handleRequestCamera = async () => {
    setIsRequestingPermission('camera');
    setStatusFeedback(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setStatusFeedback('Trình duyệt không hỗ trợ truy cập máy ảnh');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraStatus('granted');
      setStatusFeedback('Đã cấp quyền máy ảnh! Có thể chụp ảnh hiện trường môi trường.');
      stream.getTracks().forEach((track) => track.stop());
      setTimeout(() => setStatusFeedback(null), 3500);
    } catch (err) {
      setCameraStatus('denied');
      setStatusFeedback('Quyền máy ảnh bị từ chối hoặc thiết bị không có camera.');
      setTimeout(() => setStatusFeedback(null), 4000);
    } finally {
      setIsRequestingPermission(null);
    }
  };

  // Handler: Clear Cache
  const handleClearCache = () => {
    try {
      localStorage.removeItem('eco_app_notes');
      localStorage.removeItem('eco_app_preferences');
      setStatusFeedback('Đã xóa bộ nhớ đệm và khôi phục cài đặt gốc thành công!');
      setTimeout(() => setStatusFeedback(null), 3000);
    } catch (e) {
      setStatusFeedback('Lỗi khi xóa bộ nhớ đệm');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        id="settings-modal"
        className="bg-white dark:bg-[#1E293B] w-full max-w-xl rounded-t-[28px] sm:rounded-[28px] shadow-2xl overflow-hidden border border-[#E2E8F0] dark:border-[#334155] flex flex-col max-h-[90vh] animate-in slide-in-from-bottom duration-250 transition-colors"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#F1F5F9] dark:border-[#334155] flex items-center justify-between bg-white dark:bg-[#1E293B] shrink-0 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-blue-50 dark:bg-blue-900/40 text-[#0D47A1] dark:text-blue-400 flex items-center justify-center shadow-xs">
              <Shield className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-[17px] sm:text-[18px] font-extrabold text-[#0F172A] dark:text-slate-100 leading-tight">
                Cài Đặt & Quyền Truy Cập
              </h2>
              <p className="text-[11.5px] text-[#64748B] dark:text-slate-400 font-medium">
                Chế độ sáng tối, quyền cảm biến, GPS & đồng bộ ngoại tuyến
              </p>
            </div>
          </div>
          <button
            type="button"
            id="close-settings-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-pointer transition-colors"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-900/60 px-4 pt-2 gap-2 shrink-0 transition-colors">
          <button
            type="button"
            id="tab-btn-preferences"
            onClick={() => setActiveTab('preferences')}
            className={`pb-2.5 px-3 text-[13px] font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'preferences'
                ? 'border-[#0D47A1] dark:border-blue-400 text-[#0D47A1] dark:text-blue-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Giao Diện & Đơn Vị</span>
          </button>

          <button
            type="button"
            id="tab-btn-permissions"
            onClick={() => setActiveTab('permissions')}
            className={`pb-2.5 px-3 text-[13px] font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'permissions'
                ? 'border-[#0D47A1] dark:border-blue-400 text-[#0D47A1] dark:text-blue-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Quyền Cảm Biến</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block ml-0.5" />
          </button>

          <button
            type="button"
            id="tab-btn-weather-cache"
            onClick={() => setActiveTab('weatherCache')}
            className={`pb-2.5 px-3 text-[13px] font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'weatherCache'
                ? 'border-[#0D47A1] dark:border-blue-400 text-[#0D47A1] dark:text-blue-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5 text-sky-500" />
            <span>Lưu Trữ Thời Tiết (±3 Ngày)</span>
            <span className="w-2 h-2 rounded-full bg-sky-500 inline-block ml-0.5" />
          </button>
        </div>

        {/* Dynamic Status Banner Feedback */}
        {statusFeedback && (
          <div className="mx-4 mt-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200 text-xs flex items-center justify-between animate-in fade-in shrink-0">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <span className="font-semibold text-[12px]">{statusFeedback}</span>
            </div>
            <button
              type="button"
              onClick={() => setStatusFeedback(null)}
              className="text-blue-500 hover:text-blue-700 dark:text-blue-300 font-bold ml-2 text-xs cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Content Container */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1">
          {/* TAB 1: PREFERENCES, THEME & UNITS */}
          {activeTab === 'preferences' && (
            <div className="space-y-4">
              {/* CHẾ ĐỘ SÁNG / TỐI THEO THIẾT BỊ */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0F172A] space-y-3.5 shadow-2xs transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                      {themeMode === 'dark' || (themeMode === 'system' && systemTheme === 'dark') ? (
                        <Moon className="w-4 h-4" />
                      ) : (
                        <Sun className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-[14px] font-bold text-slate-900 dark:text-slate-100">
                        Chế độ Sáng / Tối
                      </h4>
                      <p className="text-[11.5px] text-slate-500 dark:text-slate-400">
                        Chọn chế độ màu hoặc tự động đồng bộ theo thiết bị
                      </p>
                    </div>
                  </div>

                  {themeMode === 'system' && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800 px-2 py-0.5 rounded-full">
                      <Sparkles className="w-3 h-3 text-blue-500" /> Tự động
                    </span>
                  )}
                </div>

                {/* 3 Theme Options Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  {/* Option 1: Light */}
                  <button
                    type="button"
                    id="theme-btn-light"
                    onClick={() => onThemeChange && onThemeChange('light')}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all cursor-pointer ${
                      themeMode === 'light'
                        ? 'bg-blue-50 dark:bg-blue-900/30 border-[#0D47A1] dark:border-blue-400 text-[#0D47A1] dark:text-blue-300 font-bold shadow-xs ring-1 ring-[#0D47A1]/20'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <Sun className="w-5 h-5 mb-1.5 text-amber-500" />
                    <span className="text-[12.5px] leading-tight">Sáng</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-400 mt-0.5">Light Mode</span>
                  </button>

                  {/* Option 2: Dark */}
                  <button
                    type="button"
                    id="theme-btn-dark"
                    onClick={() => onThemeChange && onThemeChange('dark')}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all cursor-pointer ${
                      themeMode === 'dark'
                        ? 'bg-blue-50 dark:bg-blue-900/30 border-[#0D47A1] dark:border-blue-400 text-[#0D47A1] dark:text-blue-300 font-bold shadow-xs ring-1 ring-[#0D47A1]/20'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <Moon className="w-5 h-5 mb-1.5 text-indigo-500" />
                    <span className="text-[12.5px] leading-tight">Tối</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-400 mt-0.5">Dark Mode</span>
                  </button>

                  {/* Option 3: System / Device */}
                  <button
                    type="button"
                    id="theme-btn-system"
                    onClick={() => onThemeChange && onThemeChange('system')}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all cursor-pointer ${
                      themeMode === 'system'
                        ? 'bg-blue-50 dark:bg-blue-900/30 border-[#0D47A1] dark:border-blue-400 text-[#0D47A1] dark:text-blue-300 font-bold shadow-xs ring-1 ring-[#0D47A1]/20'
                        : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <Monitor className="w-5 h-5 mb-1.5 text-emerald-500" />
                    <span className="text-[12.5px] leading-tight">Theo thiết bị</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-400 mt-0.5">Auto Sync</span>
                  </button>
                </div>

                {/* System Mode Realtime Status Box */}
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-[11.5px] flex items-center justify-between">
                  <span>
                    Thiết bị/Hệ điều hành đang đặt:{' '}
                    <strong className="text-slate-900 dark:text-white">
                      {systemTheme === 'dark' ? 'Chế độ Tối (Dark) 🌙' : 'Chế độ Sáng (Light) ☀️'}
                    </strong>
                  </span>
                  {themeMode === 'system' && (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold text-[10.5px]">
                      ● Đang đồng bộ
                    </span>
                  )}
                </div>
              </div>

              {/* ĐƠN VỊ ĐO LƯỜNG */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0F172A] space-y-3 transition-colors shadow-2xs">
                <h4 className="text-[13.5px] font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#0D47A1] dark:text-blue-400" /> Đơn vị đo lường
                </h4>

                {/* Temp Unit */}
                <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <div className="text-[13px] font-bold text-slate-800 dark:text-slate-200">Đơn vị nhiệt độ</div>
                    <div className="text-[11.5px] text-slate-500 dark:text-slate-400">Độ C (°C) chuẩn Việt Nam hoặc Độ F (°F)</div>
                  </div>
                  <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl">
                    <button
                      type="button"
                      onClick={() => savePreferences({ tempUnit: 'C' })}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
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
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        preferences.tempUnit === 'F'
                          ? 'bg-[#0D47A1] text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      °F
                    </button>
                  </div>
                </div>

                {/* Altitude Unit */}
                <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <div className="text-[13px] font-bold text-slate-800 dark:text-slate-200">Đơn vị độ cao địa hình</div>
                    <div className="text-[11.5px] text-slate-500 dark:text-slate-400">Mét (m) so với mực nước biển hoặc Feet (ft)</div>
                  </div>
                  <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl">
                    <button
                      type="button"
                      onClick={() => savePreferences({ altitudeUnit: 'm' })}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
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
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        preferences.altitudeUnit === 'ft'
                          ? 'bg-[#0D47A1] text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      Feet (ft)
                    </button>
                  </div>
                </div>

                {/* Refresh rate */}
                <div className="flex items-center justify-between py-2">
                  <div>
                    <div className="text-[13px] font-bold text-slate-800 dark:text-slate-200">Tần suất làm mới dữ liệu</div>
                    <div className="text-[11.5px] text-slate-500 dark:text-slate-400">Chu kỳ cập nhật vi khí hậu & áp suất</div>
                  </div>
                  <select
                    value={preferences.refreshRate}
                    onChange={(e) => savePreferences({ refreshRate: e.target.value as any })}
                    className="text-xs font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-blue-500"
                  >
                    <option value="15s">15 giây</option>
                    <option value="30s">30 giây (Chuẩn)</option>
                    <option value="60s">1 phút</option>
                    <option value="manual">Thủ công</option>
                  </select>
                </div>
              </div>

              {/* Sensor & Battery Settings */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0F172A] space-y-3 transition-colors shadow-2xs">
                <h4 className="text-[13.5px] font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Tối ưu hóa phần cứng & GPS
                </h4>

                <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <div className="text-[13px] font-bold text-slate-800 dark:text-slate-200">Chế độ GPS độ chính xác cao</div>
                    <div className="text-[11.5px] text-slate-500 dark:text-slate-400">Sử dụng đa vệ tinh GNSS/Galileo để định vị sai số &lt; 5m</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.gpsHighAccuracy}
                    onChange={(e) => savePreferences({ gpsHighAccuracy: e.target.checked })}
                    className="w-4 h-4 text-[#0D47A1] dark:text-blue-400 rounded cursor-pointer accent-[#0D47A1]"
                  />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <div className="text-[13px] font-bold text-slate-800 dark:text-slate-200">Tự động đồng bộ ngoại tuyến</div>
                    <div className="text-[11.5px] text-slate-500 dark:text-slate-400">Tự động lưu trạm đã xem vào bộ nhớ đệm cục bộ</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.offlineAutoSync}
                    onChange={(e) => savePreferences({ offlineAutoSync: e.target.checked })}
                    className="w-4 h-4 text-[#0D47A1] dark:text-blue-400 rounded cursor-pointer accent-[#0D47A1]"
                  />
                </div>
              </div>

              {/* Weather Notification Storage Card in Preferences */}
              <div className="p-4 rounded-2xl border border-sky-200 dark:border-sky-900/60 bg-sky-50/50 dark:bg-sky-950/30 space-y-3 transition-colors shadow-2xs">
                <div className="flex items-center justify-between">
                  <h4 className="text-[13.5px] font-bold text-sky-950 dark:text-sky-200 flex items-center gap-2">
                    <CloudRain className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                    <span>Lưu trữ thông báo thời tiết (±3 ngày khi có Internet)</span>
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300 border border-sky-300 dark:border-sky-700">
                    Phạm vi: ±3 ngày
                  </span>
                </div>

                <p className="text-[11.5px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  Khi thiết bị kết nối mạng, ứng dụng tự động lưu trữ thông báo thời tiết từ 3 ngày trước đến 3 ngày tới vào máy để xem ngoại tuyến không cần mạng.
                </p>

                <div className="flex items-center justify-between py-2 border-t border-sky-100 dark:border-sky-900/60">
                  <div>
                    <div className="text-[13px] font-bold text-slate-800 dark:text-slate-200">
                      Tự động lưu trữ khi có kết nối Internet
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      Trạng thái: {isOnline ? '🟢 Đang kết nối mạng' : '🔴 Ngoại tuyến'} • {weatherNotifications.length} thông báo đã lưu
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={weatherConfig.autoSyncWhenOnline}
                    onChange={(e) => handleToggleAutoSync(e.target.checked)}
                    className="w-4 h-4 text-[#0D47A1] dark:text-blue-400 rounded cursor-pointer accent-[#0D47A1]"
                  />
                </div>

                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    Đồng bộ lần cuối: {weatherConfig.lastSyncFormatted || 'Đã nạp sẵn'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveTab('weatherCache')}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0D47A1] dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    <span>Xem danh sách & quản lý bộ nhớ</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PERMISSIONS MANAGER */}
          {activeTab === 'permissions' && (
            <div className="space-y-3.5">
              {/* Special Guide for Android App Info Screen */}
              <div className="p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-950 dark:text-amber-200 space-y-2.5">
                <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-300">
                  <Smartphone className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>Xử lý cài đặt trên điện thoại Android (Màn hình Thông tin ứng dụng)</span>
                </div>
                <div className="space-y-2 text-[11.5px] leading-relaxed">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200/80 dark:border-amber-800/60">
                    <strong className="text-amber-800 dark:text-amber-300 block mb-0.5">
                      1. "Quản lý thông báo: Từ chối"
                    </strong>
                    <span>
                      👉 Chạm trực tiếp vào dòng <strong>"Quản lý thông báo &gt;"</strong> trên màn hình Thông tin ứng dụng của điện thoại ➔ Gạt bật công tắc <strong>"Cho phép thông báo"</strong> (Hiển thị thông báo).
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200/80 dark:border-amber-800/60">
                    <strong className="text-blue-800 dark:text-blue-300 block mb-0.5">
                      2. "Quyền: Không có quyền nào được yêu cầu"
                    </strong>
                    <span>
                      👉 Khi cài từ Google Chrome (PWA), Android không gán quyền vị trí trực tiếp cho shortcut mà quản lý qua <strong>Google Chrome</strong>: Vào <em>Cài đặt máy ➔ Ứng dụng ➔ Chrome ➔ Quyền ➔ Vị trí ➔ Bật "Cho phép khi dùng ứng dụng"</em>. (Nếu tự build APK từ Flutter, hãy dùng file AndroidManifest.xml ở tab bên cạnh để đăng ký quyền).
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800/80 border border-[#E2E8F0] dark:border-slate-700 flex items-start justify-between text-xs text-slate-600 dark:text-slate-300 transition-colors">
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    Vị trí của bạn chỉ dùng để chọn phường/xã gần nhất. Khi tải thời tiết, tọa độ của phường hoặc vị trí GPS được gửi tới dịch vụ Open-Meteo (và máy chủ của ứng dụng nếu có). EcoApp không lưu vị trí lên máy chủ.
                  </span>
                </div>
              </div>

              {/* 1. Geolocation Permission */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0F172A] hover:border-slate-300 dark:hover:border-slate-600 transition-all shadow-2xs">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-[#0D47A1] dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-[14px] font-bold text-slate-900 dark:text-slate-100">Vị trí GPS & Độ cao địa hình</h4>
                        {geoStatus === 'granted' ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Đã cấp phép
                          </span>
                        ) : geoStatus === 'denied' ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 px-2 py-0.5 rounded-full">
                            <AlertCircle className="w-3 h-3 text-rose-600 dark:text-rose-400" /> Bị chặn
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 px-2 py-0.5 rounded-full">
                            <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400" /> Chưa cấp
                          </span>
                        )}
                      </div>
                      <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                        Tự động tính khoảng cách và định vị trạm thời tiết gần nhất trong 168 xã/phường TP.HCM, đo độ cao so với mực nước biển.
                      </p>
                      {userLocation && (
                        <div className="mt-2 text-[11px] font-mono text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/80 p-2 rounded-lg border border-slate-100 dark:border-slate-700 flex items-center justify-between">
                          <span>
                            Tọa độ: {userLocation.lat.toFixed(4)}°N, {userLocation.lng.toFixed(4)}°E (Độ cao: {userLocation.altitude || 12}m)
                          </span>
                          <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                            {userLocation.nearestDistrictName || (userLocation.status === 'out_of_region' ? 'Ngoài khu vực phục vụ' : 'Chưa xác định')}
                          </span>
                        </div>
                      )}

                      {/* Detailed unblocking helper if permission is denied or in iframe */}
                      {geoStatus === 'denied' && (
                        <div className="mt-2.5 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11.5px] text-amber-900 dark:text-amber-200 space-y-2">
                          <div className="font-bold flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>Quyền vị trí đang bị chặn</span>
                          </div>
                          <p className="leading-relaxed">
                            {isRunningInIframe()
                              ? 'Trình duyệt chặn xin quyền vị trí trong khung xem trước (iFrame). Vui lòng mở ứng dụng trong Tab mới để trình duyệt hiện thông báo cấp quyền.'
                              : 'Bạn có thể mở lại bằng cách nhấp biểu tượng 🔒 hoặc ⚙️ bên trái thanh địa chỉ URL > chọn "Cho phép" ở mục Vị trí > Tải lại trang (F5).'}
                          </p>
                          {isRunningInIframe() && (
                            <button
                              type="button"
                              onClick={() => window.open(window.location.href, '_blank')}
                              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Mở trong Tab mới để cấp quyền</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    id="btn-request-geo"
                    onClick={handleRequestGeo}
                    disabled={isRequestingPermission === 'geo'}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                      geoStatus === 'granted'
                        ? 'bg-blue-50 dark:bg-blue-900/40 text-[#0D47A1] dark:text-blue-300 border border-blue-200 dark:border-blue-700 hover:bg-blue-100'
                        : 'bg-[#0D47A1] hover:bg-[#1565C0] text-white shadow-xs'
                    }`}
                  >
                    {isRequestingPermission === 'geo'
                      ? 'Đang kiểm tra...'
                      : geoStatus === 'granted'
                      ? 'Hiệu chuẩn lại'
                      : 'Cấp quyền GPS'}
                  </button>
                </div>
              </div>

              {/* 2. Notifications Permission */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0F172A] hover:border-slate-300 dark:hover:border-slate-600 transition-all shadow-2xs">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Bell className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-[14px] font-bold text-slate-900 dark:text-slate-100">Thông báo cảnh báo thiên tai & UV</h4>
                        {notifStatus === 'granted' ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Đã kích hoạt
                          </span>
                        ) : notifStatus === 'denied' ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 px-2 py-0.5 rounded-full">
                            <AlertCircle className="w-3 h-3 text-rose-600 dark:text-rose-400" /> Bị chặn
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 px-2 py-0.5 rounded-full">
                            <Clock className="w-3 h-3 text-amber-600 dark:text-amber-400" /> Chưa cấp
                          </span>
                        )}
                      </div>
                      <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                        Gửi cảnh báo tức thì khi chỉ số UV vượt ngưỡng cực đại (chỉ số &gt; 11), triều cường dâng cao đỉnh điểm hoặc bão giông ven biển Cần Giờ.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    id="btn-request-notif"
                    onClick={handleRequestNotifications}
                    disabled={isRequestingPermission === 'notif'}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
                      notifStatus === 'granted'
                        ? 'bg-amber-50 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-700 hover:bg-amber-100'
                        : 'bg-amber-500 text-white hover:bg-amber-600 shadow-xs'
                    }`}
                  >
                    {notifStatus === 'granted' ? 'Gửi thử nghiệm' : 'Bật thông báo'}
                  </button>
                </div>
              </div>

              {/* 3. Camera Permission */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0F172A] hover:border-slate-300 dark:hover:border-slate-600 transition-all shadow-2xs">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Camera className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-[14px] font-bold text-slate-900 dark:text-slate-100">Máy ảnh (Giám sát hiện trường)</h4>
                        {cameraStatus === 'granted' ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Đã sẵn sàng
                          </span>
                        ) : cameraStatus === 'denied' ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 px-2 py-0.5 rounded-full">
                            <AlertCircle className="w-3 h-3 text-rose-600 dark:text-rose-400" /> Từ chối
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-full">
                            Sẵn sàng khi dùng
                          </span>
                        )}
                      </div>
                      <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                        Chụp ảnh cây xanh, điểm ngập lụt, xả thải vi phạm môi trường và giám sát thực địa trong thẻ Bảo Vệ Môi Trường.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    id="btn-request-camera"
                    onClick={handleRequestCamera}
                    disabled={isRequestingPermission === 'camera'}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-purple-50 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-700 hover:bg-purple-100 transition-all cursor-pointer shrink-0"
                  >
                    Kiểm tra Camera
                  </button>
                </div>
              </div>

              {/* 4. Offline Storage & Cache */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0F172A] hover:border-slate-300 dark:hover:border-slate-600 transition-all shadow-2xs">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <HardDrive className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-[14px] font-bold text-slate-900 dark:text-slate-100">Bộ nhớ ngoại tuyến (Offline Storage)</h4>
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Hoạt động 100%
                        </span>
                      </div>
                      <p className="text-[12px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                        Lưu trữ toàn bộ cơ sở dữ liệu 168 đơn vị hành chính, vi khí hậu và nhật ký địa phương mà không cần kết nối mạng.
                      </p>
                      <div className="mt-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                        Dung lượng bộ nhớ: <strong>{storageStatus}</strong>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    id="btn-clear-cache"
                    onClick={handleClearCache}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer shrink-0"
                  >
                    Xóa đệm
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: WEATHER NOTIFICATIONS OFFLINE CACHE (±3 DAYS) */}
          {activeTab === 'weatherCache' && (
            <div className="space-y-4">
              {/* Internet Status & Scope Info Banner */}
              <div className="p-3.5 rounded-2xl bg-sky-50/80 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900/60 text-xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-sky-900 dark:text-sky-300">
                    {isOnline ? (
                      <Wifi className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    ) : (
                      <WifiOff className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                    )}
                    <span>
                      {isOnline
                        ? '🟢 Thiết bị đang kết nối Internet: Sẵn sàng tự động lưu trữ'
                        : '🔴 Thiết bị ngoại tuyến: Đang sử dụng dữ liệu đã lưu trong máy'}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-sky-200/70 dark:bg-sky-900 text-sky-900 dark:text-sky-200">
                    Phạm vi: ±3 Ngày
                  </span>
                </div>

                <div className="text-[11.5px] text-sky-950/85 dark:text-sky-200/90 leading-relaxed bg-white/70 dark:bg-slate-900/60 p-2.5 rounded-xl border border-sky-200/60 dark:border-sky-900/40">
                  <div className="font-semibold text-sky-900 dark:text-sky-300 mb-1">
                    Cơ chế lưu trữ ngoại tuyến thông minh:
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-700 dark:text-slate-300 text-[11px]">
                    <li>
                      <strong>3 ngày trước (-3 đến -1):</strong> Lưu vết lịch sử cảnh báo triều cường, chất lượng không khí để theo dõi xu hướng.
                    </li>
                    <li>
                      <strong>Hôm nay (0 ngày):</strong> Thông báo thời gian thực về vi khí hậu, chỉ số UV và thời tiết trạm quan trắc.
                    </li>
                    <li>
                      <strong>3 ngày tới (+1 đến +3):</strong> Dự báo sớm mưa dông, đỉnh triều và biến đổi nhiệt để chủ động lộ trình.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Weather Sync Feedback Alert */}
              {weatherSyncMsg && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs flex items-center justify-between animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>{weatherSyncMsg}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setWeatherSyncMsg(null)}
                    className="text-emerald-700 dark:text-emerald-400 font-bold ml-2 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* Configuration & Storage Overview */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0F172A] space-y-3.5 shadow-2xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <h4 className="text-[13.5px] font-bold text-slate-900 dark:text-slate-100">
                      Tự động lưu trữ thông báo khi có Internet
                    </h4>
                    <p className="text-[11.5px] text-slate-500 dark:text-slate-400">
                      Mỗi khi thiết bị bắt được Wi-Fi / 4G, app tự động tải và cập nhật dữ liệu ±3 ngày
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="toggle-weather-autosync"
                    checked={weatherConfig.autoSyncWhenOnline}
                    onChange={(e) => handleToggleAutoSync(e.target.checked)}
                    className="w-4 h-4 text-[#0D47A1] dark:text-blue-400 rounded cursor-pointer accent-[#0D47A1]"
                  />
                </div>

                {/* Storage Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                    <div className="text-[10.5px] text-slate-500 dark:text-slate-400">Thông báo đã lưu</div>
                    <div className="text-base font-extrabold text-[#0D47A1] dark:text-blue-400">
                      {weatherNotifications.length}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                    <div className="text-[10.5px] text-slate-500 dark:text-slate-400">Phạm vi thời gian</div>
                    <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400">
                      ±3 ngày
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                    <div className="text-[10.5px] text-slate-500 dark:text-slate-400">Khu vực lưu trữ</div>
                    <div className="text-xs font-extrabold text-slate-800 dark:text-slate-200 truncate mt-1">
                      {districtName}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                    <div className="text-[10.5px] text-slate-500 dark:text-slate-400">Lần đồng bộ</div>
                    <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 truncate mt-1">
                      {weatherConfig.lastSyncFormatted || 'Sẵn sàng'}
                    </div>
                  </div>
                </div>

                {/* Manual Action Buttons */}
                <div className="pt-1 flex flex-wrap items-center gap-2 justify-between">
                  <button
                    type="button"
                    id="btn-sync-weather-now"
                    onClick={handleSyncWeatherNow}
                    disabled={isSyncingWeather}
                    className="flex-1 min-w-[170px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0D47A1] hover:bg-[#1565C0] text-white text-xs font-bold shadow-xs transition-all cursor-pointer disabled:opacity-50"
                  >
                    <RotateCw className={`w-3.5 h-3.5 ${isSyncingWeather ? 'animate-spin' : ''}`} />
                    <span>{isSyncingWeather ? 'Đang đồng bộ...' : 'Đồng bộ ngay khi có Internet'}</span>
                  </button>

                  <button
                    type="button"
                    id="btn-clear-weather-cache"
                    onClick={handleClearWeatherCache}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-all cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                    <span>Làm trống đệm</span>
                  </button>
                </div>
              </div>

              {/* Filter Tabs for Cached Notifications */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-[13px] font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Database className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                    <span>Danh sách thông báo đã lưu trong máy ({weatherNotifications.length})</span>
                  </h4>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Xem khi không có mạng
                  </span>
                </div>

                <div className="flex border-b border-slate-200 dark:border-slate-800 gap-1 overflow-x-auto custom-scrollbar pb-1">
                  <button
                    type="button"
                    onClick={() => setWeatherFilter('all')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                      weatherFilter === 'all'
                        ? 'bg-[#0D47A1] text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    Tất cả (±3 ngày) ({weatherNotifications.length})
                  </button>

                  <button
                    type="button"
                    onClick={() => setWeatherFilter('today')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                      weatherFilter === 'today'
                        ? 'bg-[#0D47A1] text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    Hôm nay (0) ({weatherNotifications.filter((n) => n.dateOffset === 0).length})
                  </button>

                  <button
                    type="button"
                    onClick={() => setWeatherFilter('forecast')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                      weatherFilter === 'forecast'
                        ? 'bg-[#0D47A1] text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    Dự báo (+1 đến +3 ngày) ({weatherNotifications.filter((n) => n.dateOffset > 0).length})
                  </button>

                  <button
                    type="button"
                    onClick={() => setWeatherFilter('history')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                      weatherFilter === 'history'
                        ? 'bg-[#0D47A1] text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    Lịch sử (-1 đến -3 ngày) ({weatherNotifications.filter((n) => n.dateOffset < 0).length})
                  </button>
                </div>
              </div>

              {/* Filtered Cached List */}
              <div className="space-y-2.5 max-h-72 overflow-y-auto custom-scrollbar pr-0.5">
                {weatherNotifications
                  .filter((item) => {
                    if (weatherFilter === 'today') return item.dateOffset === 0;
                    if (weatherFilter === 'forecast') return item.dateOffset > 0;
                    if (weatherFilter === 'history') return item.dateOffset < 0;
                    return true;
                  })
                  .map((item) => {
                    const badge =
                      item.dateOffset === 0 ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                          ● Hôm nay
                        </span>
                      ) : item.dateOffset > 0 ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 border border-sky-300 dark:border-sky-800">
                          ↗ Dự báo +{item.dateOffset} ngày
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
                          ↙ Lịch sử {item.dateOffset} ngày
                        </span>
                      );

                    const borderStyle =
                      item.severity === 'high'
                        ? 'border-rose-200 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20'
                        : item.severity === 'medium'
                        ? 'border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A]';

                    return (
                      <div
                        key={item.id}
                        className={`p-3 rounded-2xl border ${borderStyle} flex items-start gap-3 transition-colors`}
                      >
                        <div className="mt-0.5">
                          {item.type === 'uv' ? (
                            <Sun className="w-4.5 h-4.5 text-amber-500" />
                          ) : item.type === 'tide' ? (
                            <Waves className="w-4.5 h-4.5 text-sky-500" />
                          ) : item.type === 'rain' || item.type === 'forecast' ? (
                            <CloudRain className="w-4.5 h-4.5 text-indigo-500" />
                          ) : (
                            <AlertCircle className="w-4.5 h-4.5 text-rose-500" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {badge}
                              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                                {item.dateFormatted}
                              </span>
                              {item.hasRealData ? (
                                <span className="text-[9.5px] px-1.5 py-0.5 rounded font-semibold bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                                  Số đo thực tế
                                </span>
                              ) : (
                                <span className="text-[9.5px] px-1.5 py-0.5 rounded font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                                  Khuyến cáo chung
                                </span>
                              )}
                            </div>
                            <span className="text-[9.5px] text-slate-400 font-mono flex items-center gap-1">
                              <Database className="w-2.5 h-2.5" /> Bộ nhớ máy
                            </span>
                          </div>

                          <h5 className="text-[13px] font-bold text-slate-900 dark:text-slate-100">
                            {item.title}
                          </h5>
                          <p className="text-[12px] text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-[#F8FAFC] dark:bg-[#0F172A] border-t border-[#F1F5F9] dark:border-[#334155] flex items-center justify-between shrink-0 transition-colors">
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Trạng thái bảo mật: <strong className="text-emerald-700 dark:text-emerald-400">Mã hóa cục bộ 100%</strong>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 text-xs font-bold cursor-pointer transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
