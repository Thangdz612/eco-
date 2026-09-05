import React from 'react';
import { 
  X, 
  MapPin, 
  Navigation, 
  Crosshair, 
  RotateCw, 
  ShieldCheck, 
  AlertTriangle,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { UserLocation, DistrictData } from '../types';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  userLocation: UserLocation | null;
  isLoading: boolean;
  onRefreshLocation: () => void;
  onSelectDistrict: (districtId: string) => void;
  currentDistrict: DistrictData;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  userLocation,
  isLoading,
  onRefreshLocation,
  onSelectDistrict,
  currentDistrict,
}) => {
  if (!isOpen) return null;

  const isRealGps = userLocation?.isRealGps ?? false;
  const status = userLocation?.status;

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
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-[#334155] dark:text-slate-300">
          {/* Main GPS Status Card */}
          <div
            className={`p-5 rounded-2xl border relative overflow-hidden transition-all ${
              isRealGps
                ? 'bg-gradient-to-br from-[#EBF5FF] to-[#EFF6FF] dark:from-blue-950/40 dark:to-indigo-950/40 border-blue-200 dark:border-blue-800/80'
                : 'bg-gradient-to-br from-amber-50 to-orange-50/70 dark:from-amber-950/30 dark:to-orange-950/20 border-amber-200 dark:border-amber-800/60'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div
                  className={`flex items-center gap-1.5 text-xs font-bold ${
                    isRealGps ? 'text-[#1E40AF] dark:text-blue-400' : 'text-amber-800 dark:text-amber-400'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isRealGps ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'
                    }`}
                  />
                  <span>
                    {isRealGps
                      ? 'GPS THIẾT BỊ HOẠT ĐỘNG CHÍNH XÁC'
                      : status === 'denied'
                      ? 'CHƯA ĐƯỢC CẤP QUYỀN VỊ TRÍ'
                      : 'ĐANG TÌM TÍN HIỆU VỊ TRÍ'}
                  </span>
                </div>
                <h4 className="text-[18px] font-black text-[#0F172A] dark:text-slate-100 mt-1">
                  {userLocation ? userLocation.nearestDistrictName : 'Đang tìm kiếm...'}
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

            {/* Error Message if GPS wasn't obtained */}
            {!isRealGps && userLocation?.errorMessage && (
              <div className="mt-3 p-2.5 rounded-xl bg-amber-100/80 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="leading-snug">{userLocation.errorMessage}</div>
              </div>
            )}

            {/* Coordinates display */}
            {userLocation && (
              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-3 text-xs">
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
                  <span className="text-[#64748B] dark:text-slate-400 block text-[11px]">Khoảng cách trạm</span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 text-[13px]">
                    {userLocation.distanceKm === 0 ? 'Tại điểm trạm' : `Cách ~${userLocation.distanceKm} km`}
                  </span>
                </div>
                <div>
                  <span className="text-[#64748B] dark:text-slate-400 block text-[11px]">Độ sai số ước tính</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300 text-[13px]">
                    ±{userLocation.accuracy} mét
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Action button: Apply nearest district */}
          {userLocation && (
            <div>
              <button
                type="button"
                onClick={() => {
                  onSelectDistrict(userLocation.nearestDistrictId);
                  onClose();
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#0D47A1] dark:bg-blue-600 hover:bg-[#1565C0] dark:hover:bg-blue-500 active:scale-98 text-white font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>Xem dữ liệu trạm gần nhất ({userLocation.nearestDistrictName})</span>
              </button>
            </div>
          )}

          {/* Troubleshooting GPS tips */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2 font-bold text-[#0F172A] dark:text-slate-100 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Hướng dẫn sửa lỗi định vị GPS</span>
            </div>
            <ul className="space-y-1.5 list-disc list-inside text-[12px] leading-relaxed text-slate-600 dark:text-slate-400">
              <li>
                <strong>Cấp quyền vị trí:</strong> Nhấn biểu tượng ổ khóa 🔒 trên thanh địa chỉ hoặc vào Cài đặt điện thoại &gt; Ứng dụng &gt; Quyền vị trí &gt; Cho phép.
              </li>
              <li>
                <strong>Bật GPS thiết bị:</strong> Kéo thanh điều khiển trên điện thoại và bật tính năng Vị trí (GPS / Location).
              </li>
              <li>
                <strong>Di chuyển ra không gian thoáng:</strong> Nếu đang ở trong tòa nhà kín bê tông dày, hãy di chuyển gần cửa sổ hoặc ra ngoài trời để bắt vệ tinh tốt hơn.
              </li>
            </ul>
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
