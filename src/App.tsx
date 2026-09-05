import React, { useState, useEffect, useRef } from 'react';
import { TabType, ModalContent, UserLocation, DeviceScreenType } from './types';
import { DISTRICTS_DATA } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { WeatherTab } from './components/WeatherTab';
import { EnvironmentTab } from './components/EnvironmentTab';
import { EnterpriseTab } from './components/EnterpriseTab';
import { ProtectionTab } from './components/ProtectionTab';
import { DetailModal } from './components/DetailModal';
import { DartApkModal } from './components/DartApkModal';
import { DistrictModal } from './components/DistrictModal';
import { NotificationsModal } from './components/NotificationsModal';
import { InstallGuideModal } from './components/InstallGuideModal';
import { LocationModal } from './components/LocationModal';
import { SettingsModal } from './components/SettingsModal';
import { DeviceFrameControls } from './components/DeviceFrameControls';
import { getCurrentUserLocation } from './utils/geolocation';
import { 
  Smartphone, 
  Maximize2, 
  Minimize2, 
  WifiOff, 
  FileCode2, 
  CheckCircle2, 
  ShieldCheck,
  Sparkles,
  Download,
  HelpCircle,
  Crosshair,
  MapPin,
  ChevronUp,
  ChevronsDown,
  MoveVertical,
  Settings
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('weather');
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>('quan-1');
  const [activeModalContent, setActiveModalContent] = useState<ModalContent | null>(null);
  const [isDartApkOpen, setIsDartApkOpen] = useState<boolean>(false);
  const [isInstallGuideOpen, setIsInstallGuideOpen] = useState<boolean>(false);
  const [isDistrictPickerOpen, setIsDistrictPickerOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Device screen & scroll configuration
  const [currentDevice, setCurrentDevice] = useState<DeviceScreenType>('mobile');
  const [isFixedHeight, setIsFixedHeight] = useState<boolean>(true);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [canScrollDown, setCanScrollDown] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // User Geolocation state
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locationBannerMessage, setLocationBannerMessage] = useState<string | null>(null);


  const currentDistrict = DISTRICTS_DATA[selectedDistrictId] || DISTRICTS_DATA['quan-1'];

  // Scroll monitoring & smooth scrolling controls
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      setShowScrollTop(scrollTop > 140);
      setCanScrollDown(scrollTop + clientHeight < scrollHeight - 30);
    }
  };

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'instant' });
    const timer = setTimeout(() => {
      if (scrollContainerRef.current) {
        const { scrollHeight, clientHeight } = scrollContainerRef.current;
        setCanScrollDown(scrollHeight > clientHeight + 15);
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [currentTab, selectedDistrictId, currentDevice, isFixedHeight]);

  // Trigger geolocation detection
  const handleLocateUser = async (autoSwitchDistrict = true, showModal = false) => {
    setIsLocating(true);
    try {
      const loc = await getCurrentUserLocation();
      setUserLocation(loc);
      if (autoSwitchDistrict && loc.nearestDistrictId) {
        setSelectedDistrictId(loc.nearestDistrictId);
      }
      setLocationBannerMessage(
        `Đã định vị: ${loc.lat.toFixed(4)}°N, ${loc.lng.toFixed(4)}°E (Trạm gần nhất: ${loc.nearestDistrictName})`
      );
      setTimeout(() => {
        setLocationBannerMessage(null);
      }, 5000);
      if (showModal) {
        setIsLocationModalOpen(true);
      }
    } catch (e) {
      console.error('Location error:', e);
    } finally {
      setIsLocating(false);
    }
  };

  // Map header titles per tab according to the screenshots
  const getHeaderSubtitle = () => {
    switch (currentTab) {
      case 'weather':
        return 'Khu vực hiện tại';
      case 'environment':
        return 'Môi trường khu vực';
      case 'enterprise':
        return 'Phát triển doanh nghiệp';
      case 'protection':
        return 'Bảo vệ môi trường';
      default:
        return 'Khu vực hiện tại';
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F3F5] text-[#1E293B] flex flex-col items-center justify-start antialiased selection:bg-[#BFDBFE] selection:text-[#1E3A8A]">
      {/* Top Global Navigation / Action Bar */}
      <header className="w-full bg-white border-b border-[#E2E8F0] px-4 py-2.5 sm:px-6 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Brand & Offline Status */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#0D47A1] text-white flex items-center justify-center font-black text-base shadow-xs">
              🌿
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-[15px] tracking-tight text-[#0F172A]">
                  EcoApp Đô Thị
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Offline 100%
                </span>
              </div>
              <p className="text-[11px] text-[#64748B] hidden sm:block">
                Hoạt động ngoại tuyến không cần mạng • Sẵn sàng xuất file APK
              </p>
            </div>
          </div>

          {/* Quick Action Tools */}
          <div className="flex items-center gap-2">
            {/* GPS Locate Button */}
            <button
              type="button"
              id="global-locate-user-btn"
              onClick={() => handleLocateUser(true, true)}
              disabled={isLocating}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-200 bg-blue-50/80 hover:bg-blue-100 text-[#0D47A1] text-xs font-bold transition-all cursor-pointer shadow-2xs disabled:opacity-50"
              title="Định vị vị trí hiện tại của bạn"
            >
              <Crosshair className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin text-blue-600' : ''}`} />
              <span>{isLocating ? 'Đang định vị...' : 'Định vị của tôi'}</span>
            </button>

            {/* SETTINGS & PERMISSIONS BUTTON */}
            <button
              type="button"
              id="open-settings-top-btn"
              onClick={() => setIsSettingsOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-[#334155] text-xs font-bold transition-all cursor-pointer shadow-2xs"
              title="Cài đặt và quản lý quyền truy cập"
            >
              <Settings className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">Cài đặt & Quyền</span>
              <span className="sm:hidden">Cài đặt</span>
            </button>

            {/* HOW TO INSTALL ON PHONE BUTTON */}
            <button
              type="button"
              id="open-install-guide-btn"
              onClick={() => setIsInstallGuideOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold transition-all cursor-pointer shadow-2xs"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
              <span className="hidden sm:inline">Cách cài đặt trên ĐT</span>
              <span className="sm:hidden">Cài đặt ĐT</span>
            </button>

            {/* DART / APK EXPORT BUTTON */}
            <button
              type="button"
              id="open-dart-apk-btn"
              onClick={() => setIsDartApkOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0D47A1] hover:bg-[#1565C0] active:scale-95 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mã Dart & Xuất APK</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main App Canvas */}
      <main className="w-full flex-1 flex flex-col items-center justify-start p-2 sm:p-5 md:p-6">
        {/* Device Screen Switcher Bar & Scroll Controls */}
        <DeviceFrameControls
          currentDevice={currentDevice}
          onSelectDevice={(device) => setCurrentDevice(device)}
          isFixedHeight={isFixedHeight}
          onToggleFixedHeight={() => setIsFixedHeight(!isFixedHeight)}
        />

        {/* Device Container */}
        <div
          className={`w-full transition-all duration-300 ${
            currentDevice === 'mobile'
              ? 'max-w-[400px]'
              : currentDevice === 'mobile-lg'
              ? 'max-w-[440px]'
              : currentDevice === 'tablet'
              ? 'max-w-[768px]'
              : currentDevice === 'desktop'
              ? 'max-w-[1024px]'
              : 'w-full max-w-5xl'
          } my-1`}
        >
          {/* Device Frame Bezel */}
          <div
            className={`bg-white overflow-hidden flex flex-col transition-all duration-300 ${
              currentDevice === 'mobile'
                ? 'border-[9px] border-[#0F172A] rounded-[48px] shadow-[0_24px_70px_rgba(15,23,42,0.22)]'
                : currentDevice === 'mobile-lg'
                ? 'border-[9px] border-[#0F172A] rounded-[52px] shadow-[0_24px_70px_rgba(15,23,42,0.22)]'
                : currentDevice === 'tablet'
                ? 'border-[12px] border-[#1E293B] rounded-[36px] shadow-[0_24px_70px_rgba(15,23,42,0.18)]'
                : currentDevice === 'desktop'
                ? 'border border-[#CBD5E1] rounded-[22px] shadow-[0_20px_60px_rgba(15,23,42,0.12)]'
                : 'border border-[#E2E8F0] rounded-[24px] shadow-sm'
            } ${
              !isFixedHeight
                ? 'min-h-[750px]'
                : currentDevice === 'mobile'
                ? 'h-[800px] max-h-[calc(100vh-175px)]'
                : currentDevice === 'mobile-lg'
                ? 'h-[850px] max-h-[calc(100vh-175px)]'
                : currentDevice === 'tablet'
                ? 'h-[820px] max-h-[calc(100vh-175px)]'
                : currentDevice === 'desktop'
                ? 'h-[780px] max-h-[calc(100vh-175px)]'
                : 'h-[800px] max-h-[calc(100vh-175px)]'
            }`}
          >
            {/* 1. Desktop Window Top Bar (if in desktop mode) */}
            {currentDevice === 'desktop' ? (
              <div className="px-4 py-2.5 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between select-none">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#EF4444] border border-red-500/20 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#F59E0B] border border-amber-500/20 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#10B981] border border-emerald-500/20 inline-block" />
                </div>
                <div className="text-[12px] font-semibold text-[#475569] flex items-center gap-2">
                  <span>EcoApp Đô Thị — Màn Hình Máy Tính</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded-sm">
                    Offline
                  </span>
                </div>
                <div className="text-xs text-[#94A3B8] font-mono">1024 × 768</div>
              </div>
            ) : (
              /* 2. Mobile / Tablet Simulated Status Bar */
              <div className="px-6 pt-3 pb-1 flex items-center justify-between text-xs font-semibold text-[#0F172A] select-none bg-white">
                <span className="font-mono">09:41</span>
                {/* Speaker Notch / Dynamic Island for Phones or Front Camera for Tablet */}
                {currentDevice === 'tablet' ? (
                  <div className="w-3 h-3 bg-[#0F172A] rounded-full mx-auto border border-slate-700 ring-1 ring-slate-800" />
                ) : (
                  <div className="w-24 h-4 bg-[#0F172A] rounded-full mx-auto hidden sm:flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-slate-800 mr-2" />
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-[#334155]">
                  <WifiOff className="w-3.5 h-3.5 text-slate-400" title="Chế độ ngoại tuyến" />
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded">
                    OFFLINE
                  </span>
                  <span className="text-[11px]">100%</span>
                </div>
              </div>
            )}

            {/* Application Screen Header */}
            <Header
              subtitle={getHeaderSubtitle()}
              districtName={currentDistrict.name}
              onOpenDistrictPicker={() => setIsDistrictPickerOpen(true)}
              onOpenNotifications={() => setIsNotificationsOpen(true)}
              onOpenSettings={() => setIsSettingsOpen(true)}
              onOpenLocation={() => handleLocateUser(false, true)}
              userLocation={userLocation}
            />

            {/* Floating GPS Notification Banner if locating or recently located */}
            {locationBannerMessage && (
              <div className="mx-4 mb-2 p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-center justify-between animate-in fade-in slide-in-from-top-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="font-semibold text-[11px] leading-tight">
                    {locationBannerMessage}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setLocationBannerMessage(null)}
                  className="text-blue-500 hover:text-blue-700 font-bold ml-1 text-xs"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Scrollable Tab Views with visible custom scrollbar */}
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              id="app-scrollable-container"
              className="flex-1 overflow-y-auto custom-scrollbar pt-1 bg-white relative scroll-smooth"
            >
              {currentTab === 'weather' && (
                <WeatherTab
                  data={currentDistrict}
                  userLocation={userLocation}
                  onOpenDetail={(content) => setActiveModalContent(content)}
                />
              )}

              {currentTab === 'environment' && (
                <EnvironmentTab
                  data={currentDistrict}
                  onOpenDetail={(content) => setActiveModalContent(content)}
                />
              )}

              {currentTab === 'enterprise' && (
                <EnterpriseTab
                  data={currentDistrict}
                  onOpenDetail={(content) => setActiveModalContent(content)}
                />
              )}

              {currentTab === 'protection' && (
                <ProtectionTab
                  data={currentDistrict}
                  onOpenDetail={(content) => setActiveModalContent(content)}
                />
              )}

              {/* Floating Quick Scroll to Top button when scrolled down */}
              {showScrollTop && (
                <button
                  type="button"
                  id="quick-scroll-top-btn"
                  onClick={scrollToTop}
                  className="sticky bottom-3 float-right mr-3 z-20 px-3 py-1.5 rounded-full bg-[#0D47A1] hover:bg-[#1565C0] active:scale-95 text-white shadow-md text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-blue-300/40 animate-in fade-in zoom-in-90"
                  title="Lướt nhanh lên đầu trang"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                  <span>Lên đầu</span>
                </button>
              )}
            </div>

            {/* Application Bottom Navigation Bar */}
            <BottomNav
              currentTab={currentTab}
              onSelectTab={(tab) => setCurrentTab(tab)}
            />

            {/* Simulated Home Bar Indicator (for phone / tablet) */}
            {currentDevice !== 'desktop' && (
              <div className="py-2 flex justify-center bg-white select-none">
                <div
                  className={`h-1 bg-[#CBD5E1] rounded-full ${
                    currentDevice === 'tablet' ? 'w-48' : 'w-32'
                  }`}
                />
              </div>
            )}
          </div>
        </div>

        {/* Informative Banner under preview */}
        <div className="max-w-lg text-center mt-3 mb-6 px-4 text-xs text-[#64748B] space-y-1.5">
          <p className="font-medium text-[#334155]">
            Giao diện 4 màn hình được thiết kế chuẩn xác theo bản vẽ người dùng cung cấp.
          </p>
          <div className="flex items-center justify-center gap-2 pt-0.5">
            <button
              type="button"
              onClick={() => setIsInstallGuideOpen(true)}
              className="text-[#0D47A1] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer bg-blue-50 px-2 py-0.5 rounded-md"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Xem hướng dẫn từng bước cài lên điện thoại</span>
            </button>
          </div>
        </div>
      </main>

      {/* MODALS */}
      <DetailModal
        content={activeModalContent}
        onClose={() => setActiveModalContent(null)}
      />

      <DartApkModal
        isOpen={isDartApkOpen}
        onClose={() => setIsDartApkOpen(false)}
      />

      <InstallGuideModal
        isOpen={isInstallGuideOpen}
        onClose={() => setIsInstallGuideOpen(false)}
        onOpenDartModal={() => {
          setIsInstallGuideOpen(false);
          setIsDartApkOpen(true);
        }}
      />

      <DistrictModal
        isOpen={isDistrictPickerOpen}
        selectedDistrictId={selectedDistrictId}
        onSelectDistrict={(id) => setSelectedDistrictId(id)}
        onClose={() => setIsDistrictPickerOpen(false)}
        onTriggerLocation={() => handleLocateUser(true, true)}
        userLocation={userLocation}
      />

      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        userLocation={userLocation}
        isLoading={isLocating}
        onRefreshLocation={() => handleLocateUser(true, false)}
        onSelectDistrict={(id) => setSelectedDistrictId(id)}
        currentDistrict={currentDistrict}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        districtName={currentDistrict.name}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        userLocation={userLocation}
        onRefreshLocation={() => handleLocateUser(true, false)}
        onOpenDartApk={() => setIsDartApkOpen(true)}
      />
    </div>
  );
}
