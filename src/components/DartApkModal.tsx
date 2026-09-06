import React, { useState } from 'react';
import { X, Copy, Check, Download, Terminal, Smartphone, FileCode2, Package, CheckCircle2, ShieldCheck, GitBranch, ExternalLink } from 'lucide-react';
import { FLUTTER_MAIN_DART, FLUTTER_PUBSPEC, FLUTTER_ANDROID_MANIFEST, APK_BUILD_INSTRUCTIONS, GITHUB_ACTIONS_WORKFLOW } from '../data/flutterDartCode';

interface DartApkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DartApkModal: React.FC<DartApkModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'mainDart' | 'pubspec' | 'manifest' | 'github' | 'instructions'>('mainDart');
  const [copied, setCopied] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2500);
  };

  const handleDownloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        id="dart-apk-export-modal"
        className="bg-white w-full max-w-3xl rounded-[24px] max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0284C7]/10 flex items-center justify-center text-[#0284C7]">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-[17px] font-extrabold text-[#0F172A] leading-tight">
                Mã Nguồn Dart & Hướng Dẫn Xuất APK
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                Chạy offline 100% trên Android • Chuẩn Material 3 Flutter
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 active:scale-95 transition-all cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="px-6 pt-3 pb-2 flex flex-wrap items-center gap-2 border-b border-slate-100 bg-[#FAFAFA]">
          <button
            type="button"
            onClick={() => setActiveTab('mainDart')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'mainDart'
                ? 'bg-[#1E3A8A] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <FileCode2 className="w-4 h-4" />
            <span>lib/main.dart</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('pubspec')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'pubspec'
                ? 'bg-[#1E3A8A] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>pubspec.yaml</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('manifest')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'manifest'
                ? 'bg-[#1E3A8A] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>AndroidManifest.xml</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('github')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'github'
                ? 'bg-[#1E3A8A] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <GitBranch className="w-4 h-4 text-purple-500" />
            <span>Build bằng GitHub (build-apk.yml)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('instructions')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'instructions'
                ? 'bg-[#1E3A8A] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Hướng dẫn chi tiết</span>
          </button>

          {/* Download and copy toolbar */}
          <div className="ml-auto flex items-center gap-2">
            {activeTab === 'mainDart' && (
              <>
                <button
                  type="button"
                  onClick={() => handleCopy(FLUTTER_MAIN_DART, 'mainDart')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold text-slate-700 transition-all cursor-pointer"
                >
                  {copied === 'mainDart' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied === 'mainDart' ? 'Đã sao chép!' : 'Sao chép Dart'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDownloadFile(FLUTTER_MAIN_DART, 'main.dart')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0284C7] hover:bg-[#0369A1] text-white rounded-lg text-xs font-semibold transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải main.dart</span>
                </button>
              </>
            )}

            {activeTab === 'pubspec' && (
              <>
                <button
                  type="button"
                  onClick={() => handleCopy(FLUTTER_PUBSPEC, 'pubspec')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold text-slate-700 transition-all cursor-pointer"
                >
                  {copied === 'pubspec' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied === 'pubspec' ? 'Đã sao chép!' : 'Sao chép pubspec'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDownloadFile(FLUTTER_PUBSPEC, 'pubspec.yaml')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0284C7] hover:bg-[#0369A1] text-white rounded-lg text-xs font-semibold transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải pubspec.yaml</span>
                </button>
              </>
            )}

            {activeTab === 'manifest' && (
              <>
                <button
                  type="button"
                  onClick={() => handleCopy(FLUTTER_ANDROID_MANIFEST, 'manifest')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold text-slate-700 transition-all cursor-pointer"
                >
                  {copied === 'manifest' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied === 'manifest' ? 'Đã sao chép!' : 'Sao chép Manifest'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDownloadFile(FLUTTER_ANDROID_MANIFEST, 'AndroidManifest.xml')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0284C7] hover:bg-[#0369A1] text-white rounded-lg text-xs font-semibold transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải AndroidManifest.xml</span>
                </button>
              </>
            )}

            {activeTab === 'github' && (
              <>
                <button
                  type="button"
                  onClick={() => handleCopy(GITHUB_ACTIONS_WORKFLOW, 'github')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold text-slate-700 transition-all cursor-pointer"
                >
                  {copied === 'github' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied === 'github' ? 'Đã sao chép!' : 'Sao chép Workflow'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDownloadFile(GITHUB_ACTIONS_WORKFLOW, 'build-apk.yml')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0284C7] hover:bg-[#0369A1] text-white rounded-lg text-xs font-semibold transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải build-apk.yml</span>
                </button>
              </>
            )}

            {activeTab === 'instructions' && (
              <button
                type="button"
                onClick={() => handleCopy(APK_BUILD_INSTRUCTIONS, 'instructions')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0284C7] hover:bg-[#0369A1] text-white rounded-lg text-xs font-semibold transition-all cursor-pointer"
              >
                {copied === 'instructions' ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied === 'instructions' ? 'Đã sao chép lệnh!' : 'Sao chép các bước'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Content Viewer */}
        <div className="flex-1 overflow-y-auto p-5 bg-[#0F172A] text-slate-200 font-mono text-xs leading-relaxed">
          {activeTab === 'mainDart' && (
            <pre className="overflow-x-auto whitespace-pre">
              <code>{FLUTTER_MAIN_DART}</code>
            </pre>
          )}

          {activeTab === 'pubspec' && (
            <pre className="overflow-x-auto whitespace-pre">
              <code>{FLUTTER_PUBSPEC}</code>
            </pre>
          )}

          {activeTab === 'manifest' && (
            <pre className="overflow-x-auto whitespace-pre">
              <code>{FLUTTER_ANDROID_MANIFEST}</code>
            </pre>
          )}

          {activeTab === 'github' && (
            <div className="space-y-4 font-sans text-sm text-slate-200">
              <div className="p-4 bg-purple-950/50 border border-purple-800/70 rounded-xl text-purple-200">
                <div className="flex items-center gap-2 text-purple-300 font-bold text-sm mb-1.5">
                  <GitBranch className="w-4 h-4 text-purple-400" />
                  <span>Quy trình tự động hóa GitHub Actions (CI/CD)</span>
                </div>
                <p className="text-xs text-purple-200/90 leading-relaxed">
                  File workflow dưới đây nằm tại đường dẫn <code className="bg-black/40 px-1.5 py-0.5 rounded text-amber-300 font-mono">.github/workflows/build-apk.yml</code>. 
                  Hệ thống đã được bổ sung bước <strong className="text-white">Inject Android Permissions</strong> để tự động chèn quyền GPS vệ tinh & Thông báo vào APK trước khi biên dịch, khắc phục hoàn toàn lỗi <em>"Không có quyền nào được yêu cầu"</em> trên điện thoại.
                </p>
                <div className="mt-3 pt-3 border-t border-purple-800/50 flex flex-wrap gap-2 text-xs">
                  <span className="bg-emerald-900/60 text-emerald-300 px-2.5 py-1 rounded-md font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> ACCESS_FINE_LOCATION
                  </span>
                  <span className="bg-emerald-900/60 text-emerald-300 px-2.5 py-1 rounded-md font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> POST_NOTIFICATIONS
                  </span>
                  <span className="bg-emerald-900/60 text-emerald-300 px-2.5 py-1 rounded-md font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Tự động xuất APK
                  </span>
                </div>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-slate-400">.github/workflows/build-apk.yml</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(GITHUB_ACTIONS_WORKFLOW, 'github-code')}
                    className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
                  >
                    {copied === 'github-code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied === 'github-code' ? 'Đã sao chép' : 'Sao chép YAML'}</span>
                  </button>
                </div>
                <pre className="overflow-x-auto whitespace-pre font-mono text-xs text-slate-300 max-h-[340px] bg-black/50 p-3 rounded-lg border border-slate-800">
                  <code>{GITHUB_ACTIONS_WORKFLOW}</code>
                </pre>
              </div>

              <div className="p-4 bg-slate-800/90 rounded-xl border border-slate-700">
                <h4 className="font-bold text-amber-400 text-sm mb-2">
                  Cách lấy file APK sau khi GitHub build xong:
                </h4>
                <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-300">
                  <li>Vào trang GitHub của bạn ➔ bấm tab <strong className="text-white">Actions</strong>.</li>
                  <li>Chọn workflow <strong className="text-white">Build Android APK</strong> ➔ bấm vào lượt chạy mới nhất (tích xanh thành công).</li>
                  <li>Kéo xuống cuối trang tại mục <strong className="text-white">Artifacts</strong> ➔ tải tệp <strong className="text-emerald-400">EcoApp-APK</strong> (file zip).</li>
                  <li>Giải nén lấy file <code className="text-sky-300 font-mono">app-debug.apk</code> và cài lên điện thoại. Mọi quyền Vị trí & Thông báo sẽ tự động kích hoạt đầy đủ!</li>
                </ol>
              </div>
            </div>
          )}

          {activeTab === 'instructions' && (
            <div className="space-y-4 font-sans text-sm text-slate-200">
              <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700">
                <h4 className="text-base font-bold text-amber-400 mb-2 flex items-center gap-2">
                  <Terminal className="w-5 h-5" />
                  Lệnh xuất file APK 1 dòng lệnh:
                </h4>
                <div className="flex items-center justify-between bg-black/50 p-3 rounded-lg font-mono text-emerald-400 text-xs sm:text-sm">
                  <code>flutter build apk --release</code>
                  <button
                    type="button"
                    onClick={() => handleCopy('flutter build apk --release', 'cmd1')}
                    className="p-1 hover:bg-slate-700 rounded text-slate-400 hover:text-white"
                  >
                    {copied === 'cmd1' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-3 text-slate-300">
                <h5 className="font-bold text-white text-sm">Các bước tiến hành chi tiết:</h5>
                <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm">
                  <li>
                    <strong className="text-white">Tạo project:</strong> Mở Terminal chạy{' '}
                    <code className="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded">
                      flutter create eco_app_offline
                    </code>
                  </li>
                  <li>
                    <strong className="text-white">Dán mã nguồn:</strong> Tải hoặc dán tệp{' '}
                    <code className="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded">pubspec.yaml</code> và{' '}
                    <code className="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded">lib/main.dart</code> từ tab bên trên vào dự án.
                  </li>
                  <li>
                    <strong className="text-white">Cài đặt dependencies:</strong> Chạy lệnh{' '}
                    <code className="bg-slate-800 text-amber-300 px-1.5 py-0.5 rounded">flutter pub get</code>.
                  </li>
                  <li>
                    <strong className="text-white">Build file APK:</strong> Chạy lệnh{' '}
                    <code className="bg-slate-800 text-emerald-400 px-1.5 py-0.5 rounded font-bold">
                      flutter build apk --release
                    </code>
                  </li>
                  <li>
                    <strong className="text-white">Nhận file APK cài đặt:</strong> File sau khi build hoàn tất nằm tại:
                    <div className="mt-1 bg-black/60 p-2.5 rounded font-mono text-xs text-sky-300 break-all">
                      build/app/outputs/flutter-apk/app-release.apk
                    </div>
                  </li>
                </ol>
              </div>

              <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-emerald-300 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                <span>
                  Ứng dụng được viết hoàn toàn độc lập ngoại tuyến (Offline-First), không yêu cầu máy chủ bên ngoài hay kết nối Internet khi cài đặt vào điện thoại Android.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-white flex items-center justify-between text-xs text-slate-500">
          <span>Hỗ trợ Flutter 3.x+ • Android SDK 21+ (Android 5.0 đến Android 15)</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold transition-all cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
