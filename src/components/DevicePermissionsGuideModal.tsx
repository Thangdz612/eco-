import React, { useState, useEffect } from 'react';
import {
  X,
  Bell,
  MapPin,
  ShieldCheck,
  Smartphone,
  ExternalLink,
  Copy,
  Check,
  AlertTriangle,
  RotateCw,
  BellRing,
  Info,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { UserLocation } from '../types';

interface DevicePermissionsGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  userLocation: UserLocation | null;
  onRefreshLocation: () => void;
  onOpenDartApk?: () => void;
}

export const DevicePermissionsGuideModal: React.FC<DevicePermissionsGuideModalProps> = ({
  isOpen,
  onClose,
  userLocation,
  onRefreshLocation,
  onOpenDartApk,
}) => {
  const [notifState, setNotifState] = useState<NotificationPermission | 'unsupported'>('default');
  const [copiedLink, setCopiedLink] = useState(false);
  const [testSent, setTestSent] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setNotifState(Notification.permission);
    } else {
      setNotifState('unsupported');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    } catch (_e) {
      // fallback
    }
  };

  const handleRequestNotification = async () => {
    setFeedback(null);
    if (!('Notification' in window)) {
      setFeedback('Trình duyệt hiện tại không hỗ trợ Notification API.');
      return;
    }

    try {
      const perm = await Notification.requestPermission();
      setNotifState(perm);
      if (perm === 'granted') {
        setFeedback('Đã cấp quyền thông báo thành công!');
        sendTestNotification();
      } else if (perm === 'denied') {
        setFeedback('Quyền thông báo đang bị từ chối. Vui lòng mở cài đặt máy theo hướng dẫn bên dưới.');
      }
    } catch (e) {
      console.error(e);
      setFeedback('Lỗi khi xin quyền thông báo.');
    }
  };

  const sendTestNotification = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
      try {
        const notif = new Notification('🚨 Cảnh báo EcoApp (Thử nghiệm)', {
          body: 'Hệ thống cảnh báo thời tiết & triều cường đã kết nối thành công với điện thoại của bạn!',
          icon: '/assets/aistudio/logo.png',
          badge: '/assets/aistudio/logo.png',
          tag: 'eco-test-alert',
        });
        setTestSent(true);
        setTimeout(() => setTestSent(false), 4000);
        notif.onclick = () => {
          window.focus();
          notif.close();
        };
      } catch (e) {
        console.error('Notification error:', e);
      }
    }
  };

  const handleTriggerLocation = () => {
    setIsLocating(true);
    setFeedback(null);
    onRefreshLocation();
    setTimeout(() => {
      setIsLocating(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        id="device-permissions-guide-modal"
        className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[24px] max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden text-[#1E293B] dark:text-slate-100"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-850">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/70 flex items-center justify-center text-[#0D47A1] dark:text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#0F172A] dark:text-slate-100 leading-tight">
                Cấp Quyền Vị Trí & Thông Báo
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Hướng dẫn xử lý trên điện thoại Android & iPhone
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 active:scale-95 transition-all cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs">
          {/* Feedback banner */}
          {feedback && (
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200 flex items-center gap-2">
              <Info className="w-4 h-4 shrink-0 text-[#0D47A1] dark:text-blue-400" />
              <span>{feedback}</span>
            </div>
          )}

          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Notification Card */}
            <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 flex flex-col justify-between space-y-2.5">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-950 dark:text-amber-200 flex items-center gap-1.5 text-xs">
                    <Bell className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    Quyền Thông Báo
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10.5px] font-bold ${
                      notifState === 'granted'
                        ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300'
                        : notifState === 'denied'
                        ? 'bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300'
                        : 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300'
                    }`}
                  >
                    {notifState === 'granted' ? 'Đã cấp quyền' : notifState === 'denied' ? 'Từ chối' : 'Chưa bật'}
                  </span>
                </div>
                <p className="text-[11px] text-amber-900/80 dark:text-amber-300/80 mt-1 leading-relaxed">
                  Dùng để gửi chuông cảnh báo triều cường ngập lụt, tia UV độc hại và ô nhiễm không khí.
                </p>
              </div>

              <div className="space-y-1.5 pt-1">
                {notifState === 'granted' ? (
                  <button
                    type="button"
                    onClick={sendTestNotification}
                    className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-98 transition-all"
                  >
                    <BellRing className="w-3.5 h-3.5" />
                    <span>{testSent ? 'Đã phát tín hiệu!' : 'Gửi thử thông báo cảnh báo'}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleRequestNotification}
                    className="w-full py-2 px-3 rounded-xl bg-[#0D47A1] hover:bg-blue-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-98 transition-all"
                  >
                    <Bell className="w-3.5 h-3.5" />
                    <span>Bật quyền thông báo ngay</span>
                  </button>
                )}
              </div>
            </div>

            {/* GPS Location Card */}
            <div className="p-3.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/50 flex flex-col justify-between space-y-2.5">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-950 dark:text-blue-200 flex items-center gap-1.5 text-xs">
                    <MapPin className="w-4 h-4 text-[#0D47A1] dark:text-blue-400" />
                    Quyền Vị Trí (GPS)
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10.5px] font-bold ${
                      userLocation?.isRealGps
                        ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {userLocation?.isRealGps ? 'GPS vệ tinh' : 'Chưa định vị'}
                  </span>
                </div>
                <p className="text-[11px] text-blue-900/80 dark:text-blue-300/80 mt-1 leading-relaxed">
                  Tự động dò trạm quan trắc gần nhất trong 168+ xã phường TP.HCM & Bình Dương theo tọa độ thực.
                </p>
              </div>

              <button
                type="button"
                onClick={handleTriggerLocation}
                disabled={isLocating}
                className="w-full py-2 px-3 rounded-xl bg-[#0D47A1] hover:bg-blue-800 disabled:opacity-60 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-98 transition-all"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
                <span>{isLocating ? 'Đang dò tọa độ...' : 'Kích hoạt định vị GPS'}</span>
              </button>
            </div>
          </div>

          {/* Explanation based on User's Screenshot */}
          <div className="p-4 rounded-2xl bg-slate-100/90 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100 text-xs">
              <Smartphone className="w-4 h-4 text-[#0D47A1] dark:text-blue-400" />
              <span>Giải thích hiện tượng trên màn hình "Thông tin ứng dụng":</span>
            </div>

            {/* 1. Notifications */}
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-750 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-400 text-[11.5px]">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>1. Tại sao "Quản lý thông báo: Từ chối"?</span>
              </div>
              <p className="text-[11.5px] leading-relaxed text-slate-600 dark:text-slate-300">
                Trên hệ điều hành Android (Xiaomi, Redmi, Samsung, Oppo...), khi mới cài đặt ứng dụng, thông báo mặc định ở trạng thái <strong>"Từ chối"</strong> để bảo vệ pin.
              </p>
              <div className="p-2 bg-amber-50 dark:bg-amber-950/40 rounded-lg text-[11px] text-amber-900 dark:text-amber-200 font-medium">
                👉 <strong>Cách xử lý:</strong> Ngay tại màn hình chụp của bạn, chạm vào dòng <strong>"Quản lý thông báo &gt;"</strong> ➔ Bật công tắc <strong>"Cho phép thông báo"</strong> sang màu xanh là xong.
              </div>
            </div>

            {/* 2. Location permissions */}
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-750 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-blue-700 dark:text-blue-400 text-[11.5px]">
                <Lock className="w-3.5 h-3.5" />
                <span>2. Tại sao "Quyền: Không có quyền nào được yêu cầu"?</span>
              </div>
              <p className="text-[11.5px] leading-relaxed text-slate-600 dark:text-slate-300">
                Có 2 trường hợp tùy thuộc vào cách bạn cài đặt EcoApp:
              </p>
              <ul className="list-disc pl-4 space-y-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                <li>
                  <strong>Nếu cài từ Google Chrome (PWA WebAPK):</strong> Android quản lý quyền GPS thông qua ứng dụng <strong>Google Chrome</strong> chứ không gán riêng vào shortcut. Bạn chỉ cần vào <em>Cài đặt máy ➔ Ứng dụng ➔ Chrome ➔ Quyền ➔ Vị trí ➔ Chọn "Chỉ cho phép khi dùng ứng dụng"</em> và bật <em>"Vị trí chính xác"</em>.
                </li>
                <li>
                  <strong>Nếu build bằng GitHub (GitHub Actions):</strong> File quy trình <code className="text-purple-600 dark:text-purple-400 font-mono">.github/workflows/build-apk.yml</code> trong mã nguồn đã được cập nhật bước tự động chèn quyền GPS &amp; Thông báo vào file APK. Bạn chỉ cần vào tab <strong>Actions trên GitHub ➔ Run workflow</strong> rồi tải file APK mới trong mục <strong>Artifacts</strong> về cài là có đầy đủ quyền ngay!
                </li>
                <li>
                  <strong>Nếu tự biên dịch Native APK bằng Flutter:</strong> File <code className="text-blue-600 dark:text-blue-400 font-mono">AndroidManifest.xml</code> cần khai báo các thẻ quyền hệ thống. Ứng dụng đã chuẩn bị sẵn mã nguồn chuẩn trong mục Xuất APK.
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={handleCopyLink}
              className="py-2.5 px-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-blue-500 font-bold text-[11.5px] text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-all"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600 dark:text-emerald-400">Đã sao chép link!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Sao chép link web</span>
                </>
              )}
            </button>

            {onOpenDartApk && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenDartApk();
                }}
                className="py-2.5 px-3 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-[#0D47A1] dark:text-blue-300 font-bold text-[11.5px] flex items-center justify-center gap-1.5 cursor-pointer hover:bg-blue-100 transition-all"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Xem AndroidManifest.xml</span>
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-850 flex items-center justify-between text-xs">
          <span className="text-slate-500 dark:text-slate-400 text-[11px]">
            Hỗ trợ Android 10, 11, 12, 13, 14, 15 & iOS
          </span>
          <button
            type="button"
            onClick={onClose}
            className="py-1.5 px-4 rounded-xl bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 font-bold text-xs cursor-pointer transition-all"
          >
            Đã hiểu
          </button>
        </div>
      </div>
    </div>
  );
};
