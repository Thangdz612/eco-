import React from 'react';
import { X, Bell, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  districtName: string;
  onOpenPermissionsGuide?: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  districtName,
  onOpenPermissionsGuide,
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: '1',
      title: 'Cảnh báo chất lượng không khí',
      desc: 'Bụi mịn PM2.5 vượt ngưỡng 40 µg/m³ vào giờ tan tầm. Vui lòng đeo khẩu trang khi ra đường.',
      time: '15 phút trước',
      type: 'warning',
      icon: AlertTriangle,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
    },
    {
      id: '2',
      title: 'Dự báo triều cường chiều tối',
      desc: 'Mực nước đỉnh triều dự kiến 1.48m lúc 17:30 tại trạm Phú An. Các tuyến đường trũng lưu ý di chuyển.',
      time: '1 giờ trước',
      type: 'info',
      icon: Info,
      color: 'text-sky-600 bg-sky-50 border-sky-200',
    },
    {
      id: '3',
      title: 'Đã đồng bộ dữ liệu ngoại tuyến',
      desc: 'Toàn bộ cơ sở dữ liệu quan trắc vi khí hậu đã được nạp sẵn vào thiết bị để hoạt động offline 100%.',
      time: 'Hôm nay',
      type: 'success',
      icon: CheckCircle,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        id="notifications-modal"
        className="bg-white w-full max-w-md rounded-t-[28px] sm:rounded-[28px] shadow-2xl overflow-hidden border border-[#E2E8F0] animate-in slide-in-from-bottom duration-250"
      >
        <div className="p-5 border-b border-[#F1F5F9] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#0D47A1]" />
            <h3 className="text-[17px] font-extrabold text-[#0F172A]">
              Thông báo ({districtName})
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
          {/* Quick Permission Notice for Android Phone */}
          {onOpenPermissionsGuide && (
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between gap-2">
              <div>
                <strong className="block text-[11.5px] font-bold text-amber-950">
                  📱 Chưa nhận được chuông cảnh báo trên điện thoại?
                </strong>
                <p className="text-[11px] text-amber-800/80 mt-0.5">
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

          {notifications.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`p-3.5 rounded-2xl border ${item.color} flex items-start gap-3`}
              >
                <Icon className="w-5 h-5 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[14px] font-bold text-[#0F172A]">
                      {item.title}
                    </h4>
                    <span className="text-[11px] text-slate-500">{item.time}</span>
                  </div>
                  <p className="text-[13px] text-slate-600 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 bg-[#F8FAFC] border-t border-[#F1F5F9] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 bg-[#0F172A] text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-all cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
