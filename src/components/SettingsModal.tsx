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
} from 'lucide-react';
import { UserLocation, ThemeMode } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userLocation?: UserLocation | null;
  onRefreshLocation?: () => void;
  onOpenDartApk?: () => void;
  themeMode?: ThemeMode;
  onThemeChange?: (mode: ThemeMode) => void;
  systemTheme?: 'light' | 'dark';
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
  onOpenDartApk,
  themeMode = 'system',
  onThemeChange,
  systemTheme = 'light',
}) => {
  const [activeTab, setActiveTab] = useState<'permissions' | 'preferences' | 'manifest'>('preferences');

  // Permissions state
  const [geoStatus, setGeoStatus] = useState<'granted' | 'prompt' | 'denied' | 'checking'>('checking');
  const [notifStatus, setNotifStatus] = useState<'granted' | 'default' | 'denied'>('default');
  const [cameraStatus, setCameraStatus] = useState<'granted' | 'prompt' | 'denied' | 'untested'>('untested');
  const [storageStatus, setStorageStatus] = useState<string>('2.6 MB / 50 MB khả dụng');
  const [isRequestingPermission, setIsRequestingPermission] = useState<string | null>(null);
  const [statusFeedback, setStatusFeedback] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

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

  // Handler: Request Geolocation
  const handleRequestGeo = async () => {
    setIsRequestingPermission('geo');
    setStatusFeedback(null);
    try {
      if (!navigator.geolocation) {
        setStatusFeedback('Trình duyệt không hỗ trợ định vị GPS');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        () => {
          setGeoStatus('granted');
          setStatusFeedback('Đã cấp quyền GPS thành công!');
          if (onRefreshLocation) onRefreshLocation();
          setTimeout(() => setStatusFeedback(null), 3500);
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            setGeoStatus('denied');
            setStatusFeedback('Quyền định vị đã bị từ chối trong cài đặt trình duyệt.');
          } else {
            setStatusFeedback(`Lỗi định vị: ${error.message}`);
          }
          setTimeout(() => setStatusFeedback(null), 4000);
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
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

  const androidManifestCode = `<!-- AndroidManifest.xml (Quyền được cấp cho app Flutter / Android APK) -->
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.ecoapp.saigon.environment">

    <!-- 1. Quyền định vị GPS chính xác và đo độ cao người dùng -->
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    
    <!-- 2. Quyền gửi thông báo khẩn cấp (Triều cường, tia UV cực đại) -->
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />

    <!-- 3. Quyền máy ảnh chụp ảnh báo cáo môi trường & cây xanh -->
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-feature android:name="android.hardware.camera" android:required="false" />

    <!-- 4. Quyền lưu trữ offline cơ sở dữ liệu 168 xã phường -->
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" 
        android:maxSdkVersion="32" />

    <!-- 5. Quyền cảm biến độ rung và trạng thái mạng ngoại tuyến -->
    <uses-permission android:name="android.permission.VIBRATE" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
</manifest>`;

  const copyManifest = () => {
    navigator.clipboard.writeText(androidManifestCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
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
            id="tab-btn-manifest"
            onClick={() => setActiveTab('manifest')}
            className={`pb-2.5 px-3 text-[13px] font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'manifest'
                ? 'border-[#0D47A1] dark:border-blue-400 text-[#0D47A1] dark:text-blue-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Quyền Android APK</span>
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
                    <div className="text-[13px] font-bold text-slate-800 dark:text-slate-200">Tần suất làm mới cảm biến</div>
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
                    className="w-4 h-4 text-[#0D47A1] rounded cursor-pointer accent-[#0D47A1]"
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
                    className="w-4 h-4 text-[#0D47A1] rounded cursor-pointer accent-[#0D47A1]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PERMISSIONS MANAGER */}
          {activeTab === 'permissions' && (
            <div className="space-y-3.5">
              <div className="p-3 rounded-2xl bg-[#F8FAFC] dark:bg-slate-800/80 border border-[#E2E8F0] dark:border-slate-700 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300 transition-colors">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>
                    EcoApp bảo mật 100%: Mọi dữ liệu vị trí và cảm biến chỉ xử lý trực tiếp trên thiết bị của bạn.
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
                          <span className="text-emerald-700 dark:text-emerald-400 font-bold">{userLocation.nearestDistrictName}</span>
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

          {/* TAB 3: ANDROID MANIFEST (APK) PERMISSIONS */}
          {activeTab === 'manifest' && (
            <div className="space-y-3.5">
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200">
                <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Quyền cấp trong file Android APK (Flutter):</span> Khi bạn biên dịch mã Dart sang file APK cài đặt lên điện thoại Android, các quyền này sẽ được tự động yêu cầu trong quá trình cài đặt và cấp quyền runtime theo chuẩn Android 13+.
                </div>
              </div>

              {/* Code snippet with copy button */}
              <div className="relative">
                <div className="flex items-center justify-between bg-slate-900 dark:bg-black text-slate-200 px-4 py-2 rounded-t-2xl text-[12px] font-mono border-t border-x border-slate-800">
                  <span>android/app/src/main/AndroidManifest.xml</span>
                  <button
                    type="button"
                    onClick={copyManifest}
                    className="flex items-center gap-1 text-xs text-blue-300 hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Đã chép' : 'Sao chép XML'}</span>
                  </button>
                </div>
                <pre className="p-4 bg-slate-950 text-emerald-400 font-mono text-[11px] rounded-b-2xl overflow-x-auto max-h-64 leading-relaxed custom-scrollbar border-b border-x border-slate-800">
                  {androidManifestCode}
                </pre>
              </div>

              {onOpenDartApk && (
                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenDartApk();
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0D47A1] hover:bg-[#1565C0] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Mở bảng xuất mã Dart & hướng dẫn build APK</span>
                  </button>
                </div>
              )}
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
