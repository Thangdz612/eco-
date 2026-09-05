import React from 'react';
import { Smartphone, Tablet, Monitor, Maximize2, MoveVertical } from 'lucide-react';
import { DeviceScreenType } from '../types';

interface DeviceFrameControlsProps {
  currentDevice: DeviceScreenType;
  onSelectDevice: (device: DeviceScreenType) => void;
  isFixedHeight: boolean;
  onToggleFixedHeight: () => void;
}

export const DeviceFrameControls: React.FC<DeviceFrameControlsProps> = ({
  currentDevice,
  onSelectDevice,
  isFixedHeight,
  onToggleFixedHeight,
}) => {
  const devices: { id: DeviceScreenType; label: string; sub: string; icon: React.ReactNode }[] = [
    {
      id: 'mobile',
      label: 'ĐT Nhỏ',
      sub: '390px',
      icon: <Smartphone className="w-4 h-4" />,
    },
    {
      id: 'mobile-lg',
      label: 'ĐT Lớn',
      sub: '430px',
      icon: <Smartphone className="w-4 h-4 scale-110" />,
    },
    {
      id: 'tablet',
      label: 'Tablet',
      sub: '768px',
      icon: <Tablet className="w-4 h-4" />,
    },
    {
      id: 'desktop',
      label: 'Máy tính',
      sub: '1024px',
      icon: <Monitor className="w-4 h-4" />,
    },
    {
      id: 'responsive',
      label: 'Tự do',
      sub: '100%',
      icon: <Maximize2 className="w-4 h-4" />,
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mb-4 px-3 flex flex-wrap items-center justify-between gap-2.5">
      {/* Device Selector Segmented Control */}
      <div className="inline-flex items-center p-1 bg-[#E2E8F0]/80 dark:bg-slate-800/80 backdrop-blur-xs rounded-2xl border border-[#CBD5E1] dark:border-slate-700 shadow-2xs">
        <span className="text-[11px] font-bold text-[#475569] dark:text-slate-400 px-2.5 hidden sm:inline">
          Khung thiết bị:
        </span>
        <div className="flex items-center gap-1">
          {devices.map((d) => {
            const isActive = currentDevice === d.id;
            return (
              <button
                key={d.id}
                type="button"
                id={`switch-device-${d.id}-btn`}
                onClick={() => onSelectDevice(d.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer select-none ${
                  isActive
                    ? 'bg-white dark:bg-slate-700 text-[#0D47A1] dark:text-blue-300 shadow-xs border border-blue-200/60 dark:border-blue-700 font-extrabold'
                    : 'text-[#475569] dark:text-slate-300 hover:text-[#0F172A] dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/50'
                }`}
                title={`Chuyển sang khung ${d.label} (${d.sub})`}
              >
                {d.icon}
                <span>{d.label}</span>
                <span
                  className={`text-[10px] hidden md:inline px-1 py-0.2 rounded font-mono ${
                    isActive
                      ? 'bg-blue-50 dark:bg-slate-800 text-[#0D47A1] dark:text-blue-300'
                      : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {d.sub}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Scrolling / Height Option Toggle */}
      <div className="inline-flex items-center gap-2">
        <button
          type="button"
          id="toggle-fixed-height-btn"
          onClick={onToggleFixedHeight}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer shadow-2xs ${
            isFixedHeight
              ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-950/70'
              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-[#475569] dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750'
          }`}
          title={
            isFixedHeight
              ? 'Đang bật khung màn hình cố định kèm thanh lướt'
              : 'Đang mở rộng tự do theo nội dung'
          }
        >
          <MoveVertical className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span className="font-bold">
            {isFixedHeight ? 'Thanh lướt thiết bị: BẬT' : 'Thanh lướt thiết bị: TẮT'}
          </span>
          {isFixedHeight && (
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
          )}
        </button>
      </div>
    </div>
  );
};
