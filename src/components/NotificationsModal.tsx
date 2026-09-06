import React, { useState, useEffect } from 'react';
import {
  X,
  Bell,
  AlertTriangle,
  CheckCircle,
  Info,
  Sun,
  Waves,
  CloudRain,
  RotateCw,
  Wifi,
  WifiOff,
  Database,
  Calendar,
  Settings as SettingsIcon,
} from 'lucide-react';
import {
  WeatherNotificationItem,
  getCachedWeatherNotifications,
  syncWeatherNotificationsOnline,
  getStorageConfig,
} from '../utils/weatherNotificationStorage';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  districtName: string;
  districtId?: string;
  onOpenPermissionsGuide?: () => void;
  onOpenSettings?: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  districtName,
  districtId = 'quan-1',
  onOpenPermissionsGuide,
  onOpenSettings,
}) => {
  const [filter, setFilter] = useState<'all' | 'today' | 'forecast' | 'history'>('all');
  const [notifications, setNotifications] = useState<WeatherNotificationItem[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);

  // Load notifications from local offline cache
  const loadData = () => {
    const list = getCachedWeatherNotifications(districtId, districtName);
    setNotifications(list);
    const cfg = getStorageConfig();
    setLastSyncTime(cfg.lastSyncFormatted);
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen, districtId, districtName]);

  // Online / offline listeners
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    const handleSynced = () => loadData();

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('eco-weather-notifications-synced', handleSynced);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('eco-weather-notifications-synced', handleSynced);
    };
  }, [districtId, districtName]);

  if (!isOpen) return null;

  // Filter items based on selected tab
  const filteredNotifications = notifications.filter((item) => {
    if (filter === 'today') return item.dateOffset === 0;
    if (filter === 'forecast') return item.dateOffset > 0;
    if (filter === 'history') return item.dateOffset < 0;
    return true; // 'all'
  });

  // Handle manual sync when online
  const handleSyncNow = async () => {
    if (!isOnline) {
      setSyncStatusMsg('Thiết bị đang ngoại tuyến. Vui lòng kết nối Internet để đồng bộ.');
      setTimeout(() => setSyncStatusMsg(null), 3000);
      return;
    }

    setIsSyncing(true);
    setSyncStatusMsg(null);
    const res = await syncWeatherNotificationsOnline(districtId, districtName);
    setIsSyncing(false);
    loadData();
    setSyncStatusMsg(res.message);
    setTimeout(() => setSyncStatusMsg(null), 4000);
  };

  // Helper to render icon per weather notification type
  const renderItemIcon = (type: string) => {
    switch (type) {
      case 'uv':
        return <Sun className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />;
      case 'tide':
        return <Waves className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />;
      case 'rain':
      case 'forecast':
        return <CloudRain className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />;
      default:
        return <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />;
    }
  };

  // Helper for item badge styling based on offset
  const renderOffsetBadge = (offset: number, label: string) => {
    if (offset === 0) {
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
          ● Hôm nay
        </span>
      );
    }
    if (offset > 0) {
      return (
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 border border-sky-300 dark:border-sky-800">
          ↗ Dự báo +{offset} ngày
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
        ↙ Lịch sử {offset} ngày
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        id="notifications-modal"
        className="bg-white dark:bg-[#1E293B] w-full max-w-lg rounded-t-[28px] sm:rounded-[28px] shadow-2xl overflow-hidden border border-[#E2E8F0] dark:border-[#334155] flex flex-col max-h-[88vh] animate-in slide-in-from-bottom duration-250 transition-colors"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#F1F5F9] dark:border-[#334155] flex items-center justify-between shrink-0 bg-white dark:bg-[#1E293B]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-[#0D47A1] dark:text-blue-400 flex items-center justify-center">
              <Bell className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="text-[16px] sm:text-[17px] font-extrabold text-[#0F172A] dark:text-white leading-tight">
                Thông Báo Thời Tiết & Cảnh Báo
              </h3>
              <p className="text-[11px] sm:text-[11.5px] text-slate-500 dark:text-slate-400">
                Khu vực: <strong>{districtName}</strong> • Lưu trữ ngoại tuyến ±3 ngày
              </p>
            </div>
          </div>
          <button
            type="button"
            id="close-notifications-btn"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Offline Storage Status Bar */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-2 shrink-0 text-xs">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            {isOnline ? (
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-400">
                <Wifi className="w-3.5 h-3.5" /> Online
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 font-semibold text-amber-700 dark:text-amber-400">
                <WifiOff className="w-3.5 h-3.5" /> Ngoại tuyến (Đã lưu máy)
              </span>
            )}
            <span className="text-slate-400">•</span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
              {lastSyncTime ? `Đồng bộ: ${lastSyncTime}` : 'Đã nạp sẵn ±3 ngày'}
            </span>
          </div>

          <button
            type="button"
            id="sync-notifications-btn"
            onClick={handleSyncNow}
            disabled={isSyncing}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-[#0D47A1] dark:text-blue-300 font-bold text-[11px] transition-all cursor-pointer disabled:opacity-50"
            title="Đồng bộ thông báo thời tiết ±3 ngày khi có kết nối Internet"
          >
            <RotateCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Đang lưu...' : 'Đồng bộ'}</span>
          </button>
        </div>

        {/* Sync Status Banner */}
        {syncStatusMsg && (
          <div className="mx-4 mt-2 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs flex items-center justify-between animate-in fade-in shrink-0">
            <span className="font-semibold text-[11.5px]">{syncStatusMsg}</span>
            <button
              type="button"
              onClick={() => setSyncStatusMsg(null)}
              className="text-emerald-700 dark:text-emerald-400 font-bold ml-2 cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* Filter Tabs: Tất cả, Hôm nay, Dự báo (+3 ngày), Lịch sử (-3 ngày) */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-4 pt-2 gap-1.5 shrink-0 overflow-x-auto custom-scrollbar">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`pb-2 px-2.5 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              filter === 'all'
                ? 'border-[#0D47A1] dark:border-blue-400 text-[#0D47A1] dark:text-blue-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            Tất cả (±3 ngày)
            <span className="ml-1 text-[10px] opacity-75 font-mono">({notifications.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setFilter('today')}
            className={`pb-2 px-2.5 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              filter === 'today'
                ? 'border-[#0D47A1] dark:border-blue-400 text-[#0D47A1] dark:text-blue-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            Hôm nay (0)
            <span className="ml-1 text-[10px] opacity-75 font-mono">
              ({notifications.filter((n) => n.dateOffset === 0).length})
            </span>
          </button>

          <button
            type="button"
            onClick={() => setFilter('forecast')}
            className={`pb-2 px-2.5 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              filter === 'forecast'
                ? 'border-[#0D47A1] dark:border-blue-400 text-[#0D47A1] dark:text-blue-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            Dự báo (+1 đến +3 ngày)
            <span className="ml-1 text-[10px] opacity-75 font-mono">
              ({notifications.filter((n) => n.dateOffset > 0).length})
            </span>
          </button>

          <button
            type="button"
            onClick={() => setFilter('history')}
            className={`pb-2 px-2.5 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              filter === 'history'
                ? 'border-[#0D47A1] dark:border-blue-400 text-[#0D47A1] dark:text-blue-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            Lịch sử (-1 đến -3 ngày)
            <span className="ml-1 text-[10px] opacity-75 font-mono">
              ({notifications.filter((n) => n.dateOffset < 0).length})
            </span>
          </button>
        </div>

        {/* Notifications List */}
        <div className="p-4 space-y-3 flex-1 overflow-y-auto custom-scrollbar">
          {/* Quick Permission Notice for Android Phone */}
          {onOpenPermissionsGuide && (
            <div className="p-3 rounded-2xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200 flex items-center justify-between gap-2">
              <div>
                <strong className="block text-[11.5px] font-bold text-amber-900 dark:text-amber-300">
                  📱 Chưa nhận chuông thông báo trên Android?
                </strong>
                <p className="text-[11px] text-amber-800/80 dark:text-amber-400/80 mt-0.5">
                  Xử lý trạng thái "Quản lý thông báo: Từ chối" trong cài đặt máy Android.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenPermissionsGuide();
                }}
                className="px-2.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] shrink-0 cursor-pointer transition-all"
              >
                Xem hướng dẫn
              </button>
            </div>
          )}

          {filteredNotifications.length === 0 ? (
            <div className="py-12 text-center text-slate-400 dark:text-slate-500 space-y-2">
              <Calendar className="w-10 h-10 mx-auto opacity-40" />
              <p className="text-xs">Không có thông báo nào trong khoảng thời gian này.</p>
            </div>
          ) : (
            filteredNotifications.map((item) => {
              const borderBgColor =
                item.severity === 'high'
                  ? 'border-rose-200 dark:border-rose-900/50 bg-rose-50/40 dark:bg-rose-950/20'
                  : item.severity === 'medium'
                  ? 'border-amber-200 dark:border-amber-900/50 bg-amber-50/40 dark:bg-amber-950/20'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A]';

              return (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-2xl border ${borderBgColor} flex items-start gap-3 transition-all hover:border-slate-300 dark:hover:border-slate-700`}
                >
                  {renderItemIcon(item.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {renderOffsetBadge(item.dateOffset, item.dateLabel)}
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                          {item.dateFormatted}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono inline-flex items-center gap-1">
                        <Database className="w-2.5 h-2.5" /> Đã lưu máy
                      </span>
                    </div>

                    <h4 className="text-[13.5px] font-bold text-[#0F172A] dark:text-slate-100 leading-snug">
                      {item.title}
                    </h4>

                    <p className="text-[12.5px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-[#F8FAFC] dark:bg-[#0F172A] border-t border-[#F1F5F9] dark:border-[#334155] flex items-center justify-between shrink-0 transition-colors">
          {onOpenSettings ? (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenSettings();
              }}
              className="inline-flex items-center gap-1.5 text-xs text-[#0D47A1] dark:text-blue-400 font-bold hover:underline cursor-pointer"
            >
              <SettingsIcon className="w-3.5 h-3.5" />
              <span>Quản lý lưu trữ trong Cài đặt</span>
            </button>
          ) : (
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              Phạm vi: <strong className="text-blue-600 dark:text-blue-400">±3 ngày khi có mạng</strong>
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-[#0F172A] dark:bg-slate-700 text-white text-xs font-bold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-600 transition-all cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
