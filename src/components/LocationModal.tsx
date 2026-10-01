import React from 'react';
import { 
  X, 
  MapPin, 
  Navigation, 
  Crosshair, 
  RotateCw, 
  AlertTriangle,
} from 'lucide-react';
import { UserLocation, DistrictData } from '../types';
import { isRunningInIframe, ACCURACY_GOOD_M, ACCURACY_POOR_M } from '../utils/geolocation';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  userLocation: UserLocation | null;
  isLoading: boolean;
  onRefreshLocation: () => void;
  onSelectDistrict: (districtId: string) => void;
  currentDistrict: DistrictData;
  onOpenDistrictPicker?: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  userLocation,
  isLoading,
  onRefreshLocation,
  onSelectDistrict,
  currentDistrict,
  onOpenDistrictPicker,
}) => {
  if (!isOpen) return null;

  const isRealGps = userLocation?.isRealGps ?? false;
  const status = userLocation?.status;

  const getStatusBadge = () => {
    if (status === 'out_of_region') {
      return {
        label: 'NGOÀI KHU VỰC PHỤC VỤ',
        badgeClass: 'text-rose-700 dark:text-rose-400',
        dotClass: 'bg-rose-500',
        cardClass: 'bg-gradient-to-br from-rose-50 to-orange-50/70 dark:from-rose-950/30 dark:to-orange-950/20 border-rose-200 dark:border-rose-800/60',
      };
    }
    if (status === 'success') {
      if (typeof userLocation?.accuracy === 'number') {
        if (userLocation.accuracy <= ACCURACY_GOOD_M) {
          return {
            label: 'GPS CHÍNH XÁC',
            badgeClass: 'text-emerald-700 dark:text-emerald-400',
            dotClass: 'bg-emerald-500 animate-ping',
            cardClass: 'bg-gradient-to-br from-[#EBF5FF] to-[#EFF6FF] dark:from-blue-950/40 dark:to-indigo-950/40 border-blue-200 dark:border-blue-800/80',
          };
        }
        if (userLocation.accuracy <= ACCURACY_POOR_M) {
          return {
            label: 'VỊ TRÍ GẦN ĐÚNG',
            badgeClass: 'text-blue-700 dark:text-blue-400',
            dotClass: 'bg-blue-500',
            cardClass: 'bg-gradient-to-br from-[#EBF5FF] to-[#EFF6FF] dark:from-blue-950/40 dark:to-indigo-950/40 border-blue-200 dark:border-blue-800/80',
          };
        }
        return {
          label: 'VỊ TRÍ RẤT KHÔNG CHÍNH XÁC (định vị theo mạng)',
          badgeClass: 'text-amber-800 dark:text-amber-400',
          dotClass: 'bg-amber-500',
          cardClass: 'bg-gradient-to-br from-amber-50 to-orange-50/70 dark:from-amber-950/30 dark:to-orange-950/20 border-amber-200 dark:border-amber-800/60',
        };
      }
      return {
        label: 'VỊ TRÍ GẦN ĐÚNG',
        badgeClass: 'text-blue-700 dark:text-blue-400',
        dotClass: 'bg-blue-500',
        cardClass: 'bg-gradient-to-br from-[#EBF5FF] to-[#EFF6FF] dark:from-blue-950/40 dark:to-indigo-950/40 border-blue-200 dark:border-blue-800/80',
      };
    }
    if (status === 'denied') {
      return {
        label: 'CHƯA CẤP ĐƯỢC QUYỀN VỊ TRÍ',
        badgeClass: 'text-amber-800 dark:text-amber-400',
        dotClass: 'bg-amber-500',
        cardClass: 'bg-gradient-to-br from-amber-50 to-orange-50/70 dark:from-amber-950/30 dark:to-orange-950/20 border-amber-200 dark:border-amber-800/60',
      };
    }
    if (status === 'timeout') {
      return {
        label: 'HẾT THỜI GIAN CHỜ TÍN HIỆU GPS',
        badgeClass: 'text-amber-800 dark:text-amber-400',
        dotClass: 'bg-amber-500',
        cardClass: 'bg-gradient-to-br from-amber-50 to-orange-50/70 dark:from-amber-950/30 dark:to-orange-950/20 border-amber-200 dark:border-amber-800/60',
      };
    }
    return {
      label: 'ĐANG TÌM TÍN HIỆU VỊ TRÍ',
      badgeClass: 'text-amber-800 dark:text-amber-400',
      dotClass: 'bg-amber-500',
      cardClass: 'bg-gradient-to-br from-amber-50 to-orange-50/70 dark:from-amber-950/30 dark:to-orange-950/20 border-amber-200 dark:border-amber-800/60',
    };
  };

  const statusBadge = getStatusBadge();

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs animate-in fade-in duration-200 p-0 sm:p-4">
      <div
        id="user-location-modal"
        className="bg-white dark:bg-slate-900 w-full max-w-md rounded-t-[28px] sm:rounded-[28px] shadow-2xl overflow-hidden border border-[#E2E8F0] dark:border-slate-800 animate-in slide-in-from-bottom duration-250 flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#F1F5F9] dark:border-slate-800 flex items-center justify-between bg-[#F8FAFC] dark:bg-slate-850">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#0D47A1]/10 dark:bg-blue-500/20 text-[#0D47A1] dark:text-blue-300 flex items-center justify-center">
              <Crosshair className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[16px] font-extrabold text-[#0F172A] dark:text-slate-100">
                Định vị GPS thiết bị
              </h3>
              <p className="text-[11px] text-[#64748B] dark:text-slate-400">
                Tự động nhận diện phường/xã và trạm quan trắc gần bạn nhất
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm text-[#334155] dark:text-slate-300">
          {/* Main GPS Status Card */}
          <div className={`p-5 rounded-2xl border relative overflow-hidden transition-all ${statusBadge.cardClass}`}>
            <div className="flex items-start justify-between">
              <div>
                <div className={`flex items-center gap-1.5 text-xs font-bold ${statusBadge.badgeClass}`}>
                  <span className={`w-2 h-2 rounded-full ${statusBadge.dotClass}`} />
                  <span>{statusBadge.label}</span>
                </div>
                <h4 className="text-[17px] font-black text-[#0F172A] dark:text-slate-100 mt-1">
                  {status === 'success' && userLocation?.nearestDistrictName 
                    ? userLocation.nearestDistrictName 
                    : status === 'out_of_region' 
                    ? 'Ngoài khu vực phục vụ (TP.HCM)' 
                    : 'Chưa xác định vị trí'}
                </h4>
              </div>

              <button
                type="button"
                onClick={onRefreshLocation}
                disabled={isLoading}
                className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-xs border border-slate-200 dark:border-slate-700 text-[#0D47A1] dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-slate-700 transition-all cursor-pointer disabled:opacity-50"
                title="Cập nhật lại GPS"
              >
                <RotateCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {/* Error / Warning Message if not success or out of region */}
            {!isRealGps && userLocation?.errorMessage && (
              <div
                className={`mt-3 p-2.5 rounded-xl text-xs flex items-start gap-2 ${
                  status === 'out_of_region'
                    ? 'bg-rose-100/90 dark:bg-rose-900/40 text-rose-900 dark:text-rose-200'
                    : 'bg-amber-100/90 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200'
                }`}
              >
                <AlertTriangle
                  className={`w-4 h-4 shrink-0 mt-0.5 ${
                    status === 'out_of_region' ? 'text-rose-600 dark:text-rose-400' : 'text-amber-600'
                  }`}
                />
                <div className="leading-relaxed font-medium">{userLocation.errorMessage}</div>
              </div>
            )}

            {/* Coordinates display if available */}
            {userLocation && (
              <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-slate-800 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[#64748B] dark:text-slate-400 block text-[11px]">Vĩ độ (Latitude)</span>
                  <span className="font-mono font-bold text-[#0F172A] dark:text-slate-200 text-[13px]">
                    {userLocation.lat.toFixed(4)}° N
                  </span>
                </div>
                <div>
                  <span className="text-[#64748B] dark:text-slate-400 block text-[11px]">Kinh độ (Longitude)</span>
                  <span className="font-mono font-bold text-[#0F172A] dark:text-slate-200 text-[13px]">
                    {userLocation.lng.toFixed(4)}° E
                  </span>
                </div>
                <div>
                  <span className="text-[#64748B] dark:text-slate-400 block text-[11px]">Trạng thái dữ liệu</span>
                  <span
                    className={`font-bold text-[12px] ${
                      status === 'out_of_region'
                        ? 'text-rose-600 dark:text-rose-400'
                        : isRealGps
                        ? 'text-emerald-700 dark:text-emerald-400'
                        : 'text-amber-700 dark:text-amber-400'
                    }`}
                  >
                    {status === 'out_of_region'
                      ? 'Ngoài vùng phục vụ'
                      : isRealGps
                      ? userLocation.accuracy !== undefined
                        ? `GPS thực tế (±${userLocation.accuracy}m)`
                        : 'GPS thực tế (không rõ sai số)'
                      : 'Tọa độ mặc định'}
                  </span>
                  {userLocation.isStale && (
                    <span className="block text-[10.5px] text-amber-600 dark:text-amber-400 font-medium">
                      (Dữ liệu lưu tạm &gt;60s)
                    </span>
                  )}
                </div>
                <div>
                  <span className="text-[#64748B] dark:text-slate-400 block text-[11px]">Khoảng cách trạm</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 text-[12px]">
                    {status === 'success'
                      ? userLocation.distanceKm === 0
                        ? 'Tại trạm'
                        : `Cách ~${userLocation.distanceKm} km`
                      : status === 'out_of_region'
                      ? `Cách trạm gần nhất ~${userLocation.distanceKm} km`
                      : 'Chưa xác định'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Action button: only shown when GPS is success and valid district exists */}
          {status === 'success' && userLocation?.nearestDistrictId && (
            <button
              type="button"
              onClick={() => {
                onSelectDistrict(userLocation.nearestDistrictId!);
                onClose();
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#0D47A1] dark:bg-blue-600 hover:bg-[#1565C0] dark:hover:bg-blue-500 active:scale-98 text-white font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Navigation className="w-4 h-4" />
              <span>Xem dữ liệu trạm gần nhất ({userLocation.nearestDistrictName})</span>
            </button>
          )}

          {/* Quick manual selection shortcut (Primary fallback for when GPS is not allowed) */}
          <div className="p-3.5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 flex flex-col gap-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0D47A1] dark:text-blue-300">
              <MapPin className="w-4 h-4 text-[#0D47A1] dark:text-blue-400" />
              <span>Không cần GPS: Chọn thủ công Phường / Xã</span>
            </div>
            <p className="text-[11.5px] text-slate-600 dark:text-slate-300 leading-relaxed">
              Bạn có thể chọn trực tiếp từ danh mục chuẩn xác 168 đơn vị hành chính cấp xã (gồm 113 phường, 54 xã, 1 đặc khu Côn Đảo - Phường An Điền, Tây Nam, Bến Cát, Phú An...). Mọi chỉ số môi trường, thời tiết đều đầy đủ 100%.
            </p>
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onOpenDistrictPicker) {
                  onOpenDistrictPicker();
                }
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-[#0D47A1] dark:bg-blue-600 hover:bg-[#1565C0] text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-98 transition-all"
            >
              <MapPin className="w-4 h-4" />
              <span>Mở danh sách chọn Phường / Xã</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F8FAFC] dark:bg-slate-850 border-t border-[#F1F5F9] dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Đang chọn: <strong className="text-slate-800 dark:text-slate-200">{currentDistrict.name}</strong></span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
