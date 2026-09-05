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
    <header className="px-5 pt-4 pb-2 flex items-center justify-between select-none transition-colors">
      <div className="flex items-center gap-2">
        <button
          type="button"
          id="district-selector-btn"
          onClick={onOpenDistrictPicker}
          className="text-left group transition-transform active:scale-[0.98] cursor-pointer"
          aria-label="Chọn khu vực"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-[13px] text-[#64748B] dark:text-slate-400 font-medium block leading-tight">
              {subtitle}
            </span>
            {userLocation && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-1.5 py-0.2 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                GPS
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <h1
              className="text-[19px] sm:text-[22px] font-extrabold text-[#0F172A] dark:text-white tracking-tight leading-snug truncate max-w-[200px] xs:max-w-[240px] sm:max-w-[300px]"
              title={districtName}
            >
              {districtName}
            </h1>
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-[#64748B] dark:text-slate-400 shrink-0 transition-transform group-hover:translate-y-0.5" />
          </div>
        </button>
      </div>

      <div className="flex items-center gap-1">
        {/* Quick Theme Cycle Button */}
        {onCycleTheme && (
          <button
            type="button"
            id="theme-quick-toggle-btn"
            onClick={onCycleTheme}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all text-[#334155] dark:text-slate-300 hover:text-[#0D47A1] dark:hover:text-blue-400 cursor-pointer relative"
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
                <Monitor className="w-5 h-5 stroke-[1.8]" />
                <span className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white dark:ring-slate-900" />
              </div>
            ) : activeTheme === 'dark' ? (
              <Moon className="w-5 h-5 stroke-[1.8] text-indigo-400" />
            ) : (
              <Sun className="w-5 h-5 stroke-[1.8] text-amber-500" />
            )}
          </button>
        )}

        {onOpenLocation && (
          <button
            type="button"
            id="gps-location-btn"
            onClick={onOpenLocation}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all text-[#0D47A1] dark:text-blue-400 cursor-pointer"
            title="Định vị vị trí GPS của tôi"
            aria-label="Định vị vị trí của tôi"
          >
            <Crosshair className="w-5 h-5 stroke-[2.2]" />
          </button>
        )}

        <button
          type="button"
          id="notification-btn"
          onClick={onOpenNotifications}
          className="relative p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all text-[#334155] dark:text-slate-300 cursor-pointer"
          aria-label="Thông báo"
          title="Thông báo cảnh báo môi trường"
        >
          <Bell className="w-5 h-5 stroke-[1.8]" />
          {hasUnreadNotifications && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#EF4444] rounded-full ring-2 ring-white dark:ring-slate-900" />
          )}
        </button>

        {onOpenSettings && (
          <button
            type="button"
            id="settings-btn"
            onClick={onOpenSettings}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all text-[#334155] dark:text-slate-300 hover:text-[#0D47A1] dark:hover:text-blue-400 cursor-pointer"
            aria-label="Cài đặt & Quyền truy cập"
            title="Cài đặt & Quản lý quyền truy cập"
          >
            <Settings className="w-5 h-5 stroke-[1.8]" />
          </button>
        )}
      </div>
    </header>
  );
};
