import React from 'react';
import { 
  X, 
  MapPin, 
  Navigation, 
  Crosshair, 
  CheckCircle2, 
  Compass, 
  RotateCw, 
  ShieldCheck, 
  Sparkles,
  ExternalLink
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

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs animate-in fade-in duration-200 p-0 sm:p-4">
      <div
        id="user-location-modal"
        className="bg-white w-full max-w-md rounded-t-[28px] sm:rounded-[28px] shadow-2xl overflow-hidden border border-[#E2E8F0] animate-in slide-in-from-bottom duration-250 flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#F1F5F9] flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#0D47A1]/10 text-[#0D47A1] flex items-center justify-center">
              <Crosshair className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[16px] font-extrabold text-[#0F172A]">
                Định vị người dùng
              </h3>
              <p className="text-[11px] text-[#64748B]">
                Tự động nhận diện trạm quan trắc gần bạn nhất
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-[#334155]">
          {/* Main GPS Status Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#EBF5FF] to-[#EFF6FF] border border-[#BFDBFE] relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#1E40AF]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>{userLocation?.isRealGps ? 'GPS THIẾT BỊ HOẠT ĐỘNG' : 'ĐỊNH VỊ KHU VỰC'}</span>
                </div>
                <h4 className="text-[18px] font-black text-[#0F172A] mt-1">
                  {userLocation ? userLocation.nearestDistrictName : 'Đang tìm kiếm...'}
                </h4>
              </div>

              <button
                type="button"
                onClick={onRefreshLocation}
                disabled={isLoading}
                className="p-2 bg-white rounded-xl shadow-xs border border-blue-200 text-[#0D47A1] hover:bg-blue-50 transition-all cursor-pointer disabled:opacity-50"
                title="Cập nhật lại GPS"
              >
                <RotateCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {/* Coordinates display */}
            {userLocation && (
              <div className="mt-4 pt-3 border-t border-blue-200/70 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[#64748B] block text-[11px]">Vĩ độ (Latitude)</span>
                  <span className="font-mono font-bold text-[#0F172A] text-[13px]">
                    {userLocation.lat.toFixed(4)}° N
                  </span>
                </div>
                <div>
                  <span className="text-[#64748B] block text-[11px]">Kinh độ (Longitude)</span>
                  <span className="font-mono font-bold text-[#0F172A] text-[13px]">
                    {userLocation.lng.toFixed(4)}° E
                  </span>
                </div>
                <div>
                  <span className="text-[#64748B] block text-[11px]">Khoảng cách trạm</span>
                  <span className="font-bold text-emerald-700 text-[13px]">
                    {userLocation.distanceKm === 0 ? 'Tại điểm trạm' : `Cách ~${userLocation.distanceKm} km`}
                  </span>
                </div>
                <div>
                  <span className="text-[#64748B] block text-[11px]">Độ chính xác</span>
                  <span className="font-mono text-slate-700 text-[13px]">
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
                className="w-full py-3 px-4 rounded-xl bg-[#0D47A1] hover:bg-[#1565C0] active:scale-98 text-white font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>Xem dữ liệu trạm gần nhất ({userLocation.nearestDistrictName})</span>
              </button>
            </div>
          )}

          {/* Explanation */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 text-xs text-slate-600">
            <div className="flex items-center gap-2 font-bold text-[#0F172A] text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Cơ chế định vị Offline & GPS</span>
            </div>
            <p className="leading-relaxed">
              Ứng dụng đọc dữ liệu GPS trực tiếp từ cảm biến phần cứng của điện thoại mà <strong>không cần truyền dữ liệu lên máy chủ</strong> bên ngoài, đảm bảo quyền riêng tư và hoạt động 100% khi ngoại tuyến.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F8FAFC] border-t border-[#F1F5F9] flex items-center justify-between text-xs text-slate-500">
          <span>Khu vực đang chọn: <strong>{currentDistrict.name}</strong></span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
