import React from 'react';
import { Bell, ChevronDown, Crosshair, Settings, Sun, Moon, Monitor } from 'lucide-react';
import { UserLocation, ThemeMode } from '../types';

interface HeaderProps {
  subtitle: string;
  districtName: string;
  onOpenDistrictPicker: () => void;
  onOpenNotifications: () => void;
  onOpenSettings?: () => void;
  onOpenLocation?: () => void;
  userLocation?: UserLocation | null;
  hasUnreadNotifications?: boolean;
  themeMode?: ThemeMode;
  activeTheme?: 'light' | 'dark';
  onCycleTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  subtitle,
  districtName,
  onOpenDistrictPicker,
  onOpenNotifications,
  onOpenSettings,
  onOpenLocation,
  userLocation,
  hasUnreadNotifications = true,
  themeMode = 'system',
  activeTheme = 'light',
  onCycleTheme,
}) => {
  return (
    <header className="px-3.5 sm:px-5 pt-3 sm:pt-4 pb-2 flex items-center justify-between gap-1.5 select-none transition-colors">
      <div className="flex items-center gap-1.5 min-w-0 flex-1">
        <button
          type="button"
          id="district-selector-btn"
          onClick={onOpenDistrictPicker}
          className="text-left group transition-transform active:scale-[0.98] cursor-pointer min-w-0"
          aria-label="Chọn khu vực"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-[12px] sm:text-[13px] text-[#64748B] dark:text-slate-400 font-medium block leading-tight truncate">
              {subtitle}
            </span>
            {userLocation && (
              <span className="inline-flex items-center gap-1 text-[9.5px] sm:text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-1.5 py-0.2 rounded-full shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                GPS
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 mt-0.5 min-w-0">
            <h1
              className="text-[17px] sm:text-[22px] font-extrabold text-[#0F172A] dark:text-white tracking-tight leading-snug truncate max-w-[130px] xs:max-w-[170px] sm:max-w-[280px]"
              title={districtName}
            >
              {districtName}
            </h1>
            <ChevronDown className="w-4 h-4 text-[#64748B] dark:text-slate-400 shrink-0 transition-transform group-hover:translate-y-0.5" />
          </div>
        </button>
      </div>

      <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
        {/* Quick Theme Cycle Button */}
        {onCycleTheme && (
          <button
            type="button"
            id="theme-quick-toggle-btn"
            onClick={onCycleTheme}
            className="p-1.5 sm:p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all text-[#334155] dark:text-slate-300 hover:text-[#0D47A1] dark:hover:text-blue-400 cursor-pointer relative"
            title={`Chế độ giao diện: ${
              themeMode === 'system'
                ? `Theo thiết bị (${activeTheme === 'dark' ? 'Tối' : 'Sáng'})`
                : themeMode === 'dark'
                ? 'Tối (Dark Mode)'
                : 'Sáng (Light Mode)'
            }. Nhấp để chuyển nhanh.`}
            aria-label="Chuyển chế độ sáng tối"
          >
            {themeMode === 'system' ? (
              <div className="relative">
                <Monitor className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[1.8]" />
                <span className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-500 ring-1 ring-white dark:ring-slate-900" />
              </div>
            ) : activeTheme === 'dark' ? (
              <Moon className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[1.8] text-indigo-400" />
            ) : (
              <Sun className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[1.8] text-amber-500" />
            )}
          </button>
        )}

        {onOpenLocation && (
          <button
            type="button"
            id="gps-location-btn"
            onClick={onOpenLocation}
            className="p-1.5 sm:p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all text-[#0D47A1] dark:text-blue-400 cursor-pointer"
            title="Định vị vị trí GPS của tôi"
            aria-label="Định vị vị trí của tôi"
          >
            <Crosshair className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[2.2]" />
          </button>
        )}

        <button
          type="button"
          id="notification-btn"
          onClick={onOpenNotifications}
          className="relative p-1.5 sm:p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all text-[#334155] dark:text-slate-300 cursor-pointer"
          aria-label="Thông báo"
          title="Thông báo cảnh báo môi trường"
        >
          <Bell className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[1.8]" />
          {hasUnreadNotifications && (
            <span className="absolute top-1 right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#EF4444] rounded-full ring-2 ring-white dark:ring-slate-900" />
          )}
        </button>

        {onOpenSettings && (
          <button
            type="button"
            id="settings-btn"
            onClick={onOpenSettings}
            className="p-1.5 sm:p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all text-[#334155] dark:text-slate-300 hover:text-[#0D47A1] dark:hover:text-blue-400 cursor-pointer"
            aria-label="Cài đặt & Quyền truy cập"
            title="Cài đặt & Quản lý quyền truy cập"
          >
            <Settings className="w-4.5 h-4.5 sm:w-5 sm:h-5 stroke-[1.8]" />
          </button>
        )}
      </div>
    </header>
  );
};
