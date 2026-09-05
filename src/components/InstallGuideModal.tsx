import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  Download, 
  CheckCircle2, 
  ArrowRight, 
  HelpCircle, 
  Usb, 
  Send, 
  ShieldAlert,
  Settings,
  Cloud,
  Terminal,
  Laptop,
  Globe,
  Copy,
  Check
} from 'lucide-react';

interface InstallGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDartModal: () => void;
}

export const InstallGuideModal: React.FC<InstallGuideModalProps> = ({
  isOpen,
  onClose,
  onOpenDartModal,
}) => {
  const [selectedTab, setSelectedTab] = useState<'noFlutter' | 'installFlutter' | 'installApk' | 'pwaDirect'>('noFlutter');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        id="apk-install-guide-modal"
        className="bg-white w-full max-w-2xl rounded-[28px] max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0284C7]/10 flex items-center justify-center text-[#0284C7]">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-[17px] font-extrabold text-[#0F172A] leading-tight">
                Hướng Dẫn Toàn Diện Cho Người Chưa Có Flutter
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                Các giải pháp để cài đặt và trải nghiệm ứng dụng trên điện thoại
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-500 active:scale-95 transition-all cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="px-5 pt-3 pb-2 flex flex-wrap gap-1.5 bg-white border-b border-slate-100">
          <button
            type="button"
            onClick={() => setSelectedTab('noFlutter')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedTab === 'noFlutter'
                ? 'bg-[#0D47A1] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Cloud className="w-3.5 h-3.5" />
            <span>1. Build APK Online (Không cần cài máy)</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedTab('installFlutter')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedTab === 'installFlutter'
                ? 'bg-[#0D47A1] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>2. Cách cài Flutter vào máy tính</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedTab('pwaDirect')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedTab === 'pwaDirect'
                ? 'bg-[#0D47A1] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>3. Dùng ngay trên ĐT (Không cần APK)</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedTab('installApk')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              selectedTab === 'installApk'
                ? 'bg-[#0D47A1] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>4. Cách cài file APK vào điện thoại</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-[#334155] text-sm">
          {/* TAB 1: BUILD APK ONLINE KHÔNG CẦN CÀI FLUTTER */}
          {selectedTab === 'noFlutter' && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-emerald-950">
                  <strong className="block text-emerald-800 text-sm mb-1">
                    Tin vui: Bạn KHÔNG BẮT BUỘC phải cài Flutter vào máy tính!
                  </strong>
                  Bạn có thể sử dụng dịch vụ đám mây miễn phí (như <strong>GitHub Actions</strong> hoặc <strong>FlutLab.io / Project IDX</strong>). Máy chủ Google/GitHub sẽ tự chạy Flutter và xuất ra file <code>app-release.apk</code> cho bạn tải thẳng về điện thoại.
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-[#0F172A] text-sm flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#0D47A1] text-white text-xs flex items-center justify-center font-bold">A</span>
                  Cách dùng GitHub Actions (Tự động build file APK miễn phí):
                </h4>

                <ol className="list-decimal pl-5 space-y-2.5 text-xs sm:text-sm text-slate-700">
                  <li>
                    Tạo 1 tài khoản miễn phí trên <strong className="text-[#0F172A]">github.com</strong> và bấm <strong>New Repository</strong>.
                  </li>
                  <li>
                    Tải 2 file mã nguồn về từ nút <strong>"Mã Nguồn Dart & Xuất APK"</strong> trong app này:
                    <div className="flex gap-2 my-1">
                      <code className="bg-slate-100 text-[#0D47A1] px-2 py-0.5 rounded font-mono text-xs">lib/main.dart</code>
                      <code className="bg-slate-100 text-[#0D47A1] px-2 py-0.5 rounded font-mono text-xs">pubspec.yaml</code>
                    </div>
                  </li>
                  <li>
                    Tạo thêm thư mục <code className="bg-slate-100 text-[#0F172A] px-1.5 py-0.5 rounded">.github/workflows/build.yml</code> và dán đoạn mã tự động build bên dưới:
                  </li>
                </ol>

                <div className="relative bg-slate-900 rounded-xl p-3 text-emerald-400 font-mono text-xs overflow-x-auto">
                  <div className="flex justify-between items-center pb-2 mb-2 border-b border-slate-700 text-slate-400">
                    <span>.github/workflows/build.yml</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(`name: Build APK
on: [push, workflow_dispatch]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: subosito/flutter-action@v2
        with:
          flutter-version: '3.19.x'
      - run: flutter pub get
      - run: flutter build apk --release
      - uses: actions/upload-artifact@v3
        with:
          name: app-release
          path: build/app/outputs/flutter-apk/app-release.apk`, 'actionCode')}
                      className="px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-200 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedText === 'actionCode' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedText === 'actionCode' ? 'Đã sao chép!' : 'Sao chép'}</span>
                    </button>
                  </div>
                  <pre className="whitespace-pre">
{`name: Build APK
on: [push, workflow_dispatch]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: subosito/flutter-action@v2
        with:
          flutter-version: '3.19.x'
      - run: flutter pub get
      - run: flutter build apk --release
      - uses: actions/upload-artifact@v3
        with:
          name: app-release
          path: build/app/outputs/flutter-apk/app-release.apk`}
                  </pre>
                </div>

                <p className="text-xs text-slate-600">
                  👉 Sau khi đẩy lên, vào tab <strong>Actions</strong> trên GitHub &rarr; Đợi 2-3 phút &rarr; Tải file <code>app-release.apk</code> về điện thoại để cài đặt ngay!
                </p>
              </div>

              <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl flex items-start gap-2.5">
                <Globe className="w-5 h-5 text-[#0D47A1] shrink-0 mt-0.5" />
                <div className="text-xs text-[#1E3A8A] leading-relaxed">
                  <strong>Cách khác: Dùng FlutLab (flutlab.io)</strong>: Đây là trang web cho phép bạn dán file <code>main.dart</code> vào và bấm nút <strong>"Build APK"</strong> trực tiếp trên trình duyệt mà không cần cài bất kỳ thứ gì vào máy tính.
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CÁCH CÀI FLUTTER VÀO MÁY TÍNH */}
          {selectedTab === 'installFlutter' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
                <Laptop className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-amber-950">
                  <strong className="block text-amber-800 font-bold mb-0.5">
                    Nếu bạn muốn cài Flutter vào máy tính Windows để học lập trình:
                  </strong>
                  Flutter yêu cầu khoảng 5GB dung lượng ổ cứng để cài Flutter SDK và công cụ biên dịch Android.
                </div>
              </div>

              <div className="space-y-3 pl-2 border-l-2 border-slate-200 ml-2 text-xs sm:text-sm">
                <div className="pl-3">
                  <strong className="text-[#0F172A] block text-sm font-bold">
                    Bước 1: Tải bộ cài Flutter SDK
                  </strong>
                  <p className="text-slate-600 mt-1">
                    Truy cập trang chủ chính thức: <a href="https://docs.flutter.dev/get-started/install/windows" target="_blank" rel="noreferrer" className="text-[#0D47A1] font-bold underline">flutter.dev</a> &rarr; Tải file zip Flutter về.
                  </p>
                  <p className="text-slate-600 mt-0.5">
                    Giải nén thư mục đó vào ổ đĩa <code>C:\flutter</code> (không để trong Program Files).
                  </p>
                </div>

                <div className="pl-3">
                  <strong className="text-[#0F172A] block text-sm font-bold">
                    Bước 2: Thêm Flutter vào biến môi trường (Path)
                  </strong>
                  <p className="text-slate-600 mt-1">
                    Bấm phím Windows, tìm <code>env</code> &rarr; Chọn <strong>"Edit the system environment variables"</strong> &rarr; Bấm <strong>Environment Variables</strong> &rarr; Chọn dòng <strong>Path</strong> &rarr; Bấm <strong>New</strong> và dán:
                  </p>
                  <div className="mt-1 p-2 bg-slate-100 rounded font-mono text-xs text-[#0F172A] inline-block font-semibold">
                    C:\flutter\bin
                  </div>
                </div>

                <div className="pl-3">
                  <strong className="text-[#0F172A] block text-sm font-bold">
                    Bước 3: Tải Android Studio để lấy Android SDK
                  </strong>
                  <p className="text-slate-600 mt-1">
                    Tải <strong>Android Studio</strong> từ trang <code>developer.android.com</code>. Cài đặt theo mặc định để máy tự tải Android SDK và môi trường Java.
                  </p>
                </div>

                <div className="pl-3">
                  <strong className="text-[#0F172A] block text-sm font-bold">
                    Bước 4: Kiểm tra bằng lệnh flutter doctor
                  </strong>
                  <p className="text-slate-600 mt-1">
                    Mở <strong>CMD (Command Prompt)</strong> hoặc <strong>PowerShell</strong>, gõ lệnh:
                  </p>
                  <div className="mt-1 p-2 bg-slate-900 text-emerald-400 rounded-lg font-mono text-xs">
                    flutter doctor
                  </div>
                  <p className="text-slate-600 mt-1">
                    Khi thấy các dấu tick xanh [✓], máy bạn đã sẵn sàng gõ lệnh:
                  </p>
                  <div className="mt-1 p-2 bg-slate-900 text-amber-300 rounded-lg font-mono text-xs">
                    flutter build apk --release
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DÙNG NGAY TRÊN ĐT (PWA - THÊM VÀO MÀN HÌNH CHÍNH) */}
          {selectedTab === 'pwaDirect' && (
            <div className="space-y-4">
              <div className="p-4 bg-sky-50 border border-sky-200 rounded-2xl flex items-start gap-3">
                <Smartphone className="w-5 h-5 text-[#0284C7] shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-sky-950">
                  <strong className="block text-sky-800 text-sm mb-1">
                    Giải pháp nhanh nhất: Mở và cài app ngay trên điện thoại không cần APK!
                  </strong>
                  Ứng dụng này đã được cấu hình hoạt động ngoại tuyến (Offline) và có thể ghim thành 1 ứng dụng độc lập trên màn hình chính của điện thoại.
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <h4 className="font-bold text-[#0F172A] text-sm">Các bước thực hiện trong 30 giây:</h4>
                <ol className="list-decimal pl-5 space-y-2.5 text-slate-700">
                  <li>
                    Mở trình duyệt <strong>Google Chrome</strong> (trên Android) hoặc <strong>Safari</strong> (trên iPhone) trên điện thoại của bạn.
                  </li>
                  <li>
                    Truy cập vào liên kết xem ứng dụng này:
                    <div className="mt-1 p-2 bg-slate-100 rounded-lg text-xs font-mono text-[#0D47A1] break-all flex items-center justify-between">
                      <span>{currentUrl || 'Đường dẫn liên kết applet hiện tại'}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(currentUrl, 'url')}
                        className="ml-2 px-2 py-1 bg-white border border-slate-300 rounded text-slate-700 font-sans hover:bg-slate-50 cursor-pointer text-[11px]"
                      >
                        {copiedText === 'url' ? 'Đã chép link' : 'Sao chép link'}
                      </button>
                    </div>
                  </li>
                  <li>
                    <strong>Trên Android (Chrome):</strong> Bấm vào biểu tượng <strong>3 chấm dọc</strong> ở góc trên bên phải &rarr; Chọn <strong>"Thêm vào Màn hình chính" (Add to Home screen)</strong> hoặc <strong>"Cài đặt ứng dụng" (Install App)</strong>.
                  </li>
                  <li>
                    <strong>Trên iPhone (Safari):</strong> Bấm nút <strong>Chia sẻ (hình ô vuông mũi tên lên)</strong> ở cạnh dưới &rarr; Kéo xuống chọn <strong>"Thêm vào MH chính"</strong>.
                  </li>
                </ol>

                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>Ứng dụng sẽ có biểu tượng riêng trên điện thoại, mở lên toàn màn hình không có thanh địa chỉ web, hoạt động cực kỳ mượt mà!</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CÁCH CÀI FILE APK SAU KHI CÓ */}
          {selectedTab === 'installApk' && (
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-3.5 bg-slate-100 rounded-2xl">
                <strong className="text-[#0F172A] block font-bold mb-1">Khi bạn đã có file app-release.apk:</strong>
                Sau khi tải file APK từ máy tính hoặc từ GitHub về điện thoại, hãy làm theo các bước dưới đây để cài:
              </div>

              <div className="space-y-3 pl-2 border-l-2 border-slate-200 ml-2">
                <div className="pl-3">
                  <strong className="text-[#0F172A] block font-bold">1. Mở file APK trên điện thoại</strong>
                  <p className="text-slate-600 mt-0.5">
                    Vào ứng dụng <strong>Quản lý tệp (Files / File Manager)</strong> &rarr; thư mục <strong>Download (Tải về)</strong> &rarr; Chạm vào file <code>app-release.apk</code>.
                  </p>
                </div>

                <div className="pl-3">
                  <strong className="text-[#0F172A] block font-bold">2. Cho phép cài đặt nguồn ngoài</strong>
                  <p className="text-slate-600 mt-0.5">
                    Khi máy hiện thông báo bảo vệ, bấm <strong>Cài đặt (Settings)</strong> &rarr; Bật <strong>"Cho phép từ nguồn này" (Allow from this source)</strong> &rarr; Quay lại bấm <strong>Cài đặt (Install)</strong>.
                  </p>
                </div>

                <div className="pl-3">
                  <strong className="text-[#0F172A] block font-bold">3. Nếu Google Play Protect cảnh báo</strong>
                  <p className="text-slate-600 mt-0.5">
                    Bấm <strong>"Xem thêm chi tiết" (More details)</strong> &rarr; Chọn <strong>"Vẫn cài đặt" (Install anyway)</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-[#F8FAFC] flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenDartModal();
            }}
            className="text-xs sm:text-sm font-bold text-[#0D47A1] hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <span>Mở bảng sao chép mã nguồn Dart</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-[#0F172A] hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer"
          >
            Đã hiểu, đóng bảng
          </button>
        </div>
      </div>
    </div>
  );
};
