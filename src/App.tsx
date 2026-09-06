import React, { useState, useEffect, useRef } from 'react';
import { TabType, ModalContent, UserLocation, ThemeMode } from './types';
import { DISTRICTS_DATA } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { WeatherTab } from './components/WeatherTab';
import { EnvironmentTab } from './components/EnvironmentTab';
import { EnterpriseTab } from './components/EnterpriseTab';
import { ProtectionTab } from './components/ProtectionTab';
import { SettingsTab } from './components/SettingsTab';
import { DetailModal } from './components/DetailModal';
import { DartApkModal } from './components/DartApkModal';
import { DistrictModal } from './components/DistrictModal';
import { NotificationsModal } from './components/NotificationsModal';
import { InstallGuideModal } from './components/InstallGuideModal';
import { LocationModal } from './components/LocationModal';
import { SettingsModal } from './components/SettingsModal';
import { DevicePermissionsGuideModal } from './components/DevicePermissionsGuideModal';
import { getCurrentUserLocation, isRunningInIframe } from './utils/geolocation';
import { 
  getSystemTheme, 
  getStoredThemeMode, 
  setStoredThemeMode, 
  resolveActiveTheme, 
  applyThemeClass 
} from './utils/theme';
import { syncWeatherNotificationsOnline, getStorageConfig } from './utils/weatherNotificationStorage';
import { ChevronUp } from 'lucide-react';

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
  const [isPermissionsGuideOpen, setIsPermissionsGuideOpen] = useState<boolean>(false);

  // Theme Management (System / Light / Dark)
  const [themeMode, setThemeMode] = useState<ThemeMode>(getStoredThemeMode);
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(getSystemTheme);
  const activeTheme = resolveActiveTheme(themeMode, systemTheme);

  // Scroll monitoring & controls
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // User Geolocation state
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locationBannerMessage, setLocationBannerMessage] = useState<string | null>(null);

  const currentDistrict = DISTRICTS_DATA[selectedDistrictId] || DISTRICTS_DATA['quan-1'];

  // Auto-sync weather notifications (±3 days) when device is online
  useEffect(() => {
    const tryAutoSync = () => {
      const config = getStorageConfig();
      if (config.autoSyncWhenOnline && (typeof navigator === 'undefined' || navigator.onLine)) {
        syncWeatherNotificationsOnline(currentDistrict.id, currentDistrict.name);
      }
    };

    tryAutoSync();

    window.addEventListener('online', tryAutoSync);
    return () => {
      window.removeEventListener('online', tryAutoSync);
    };
  }, [currentDistrict.id, currentDistrict.name]);

  // Sync theme changes to document
  useEffect(() => {
    applyThemeClass(activeTheme);
  }, [activeTheme]);

  // Listen to OS / device theme preference changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  const handleCycleTheme = () => {
    const nextMode: ThemeMode = themeMode === 'system' ? 'dark' : themeMode === 'dark' ? 'light' : 'system';
    setThemeMode(nextMode);
    setStoredThemeMode(nextMode);
  };

  // Scroll monitoring & smooth scrolling controls
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop } = scrollContainerRef.current;
      setShowScrollTop(scrollTop > 140);
    }
  };

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentTab, selectedDistrictId]);

  // Trigger geolocation detection
  const handleLocateUser = async (autoSwitchDistrict = true, showModal = false) => {
    setIsLocating(true);
    try {
      const loc = await getCurrentUserLocation();
      setUserLocation(loc);
      if (loc.isRealGps) {
        if (autoSwitchDistrict && loc.nearestDistrictId) {
          setSelectedDistrictId(loc.nearestDistrictId);
        }
        setLocationBannerMessage(
          `🎯 Đã định vị: ${loc.nearestDistrictName} (cách ~${loc.distanceKm} km, sai số ±${loc.accuracy}m)`
        );
      } else {
        setLocationBannerMessage(
          `⚠️ ${loc.errorMessage || 'Chưa lấy được tín hiệu GPS thực tế. Hãy chọn phường/xã từ danh sách.'}`
        );
      }
      setTimeout(() => {
        setLocationBannerMessage(null);
      }, 8000);
      if (showModal) {
        setIsLocationModalOpen(true);
      }
    } catch (e) {
      console.error('Location error:', e);
      setLocationBannerMessage('⚠️ Không thể kích hoạt GPS. Vui lòng kiểm tra quyền vị trí trên thiết bị.');
      setTimeout(() => {
        setLocationBannerMessage(null);
      }, 8000);
    } finally {
      setIsLocating(false);
    }
  };

  // Map header titles per tab according to designs
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
    <div className="min-h-screen w-full bg-[#F1F3F5] dark:bg-slate-950 flex justify-center text-[#1E293B] dark:text-slate-100 antialiased selection:bg-[#BFDBFE] selection:text-[#1E3A8A]">
      {/* 
        Native Mobile Screen Viewport:
        On a mobile phone (or exported APK), this fills 100% of the screen seamlessly.
        On a wider desktop browser, it stays elegantly centered at max-w-md like a mobile device.
      */}
      <div className="w-full max-w-md h-screen flex flex-col bg-white dark:bg-slate-900 sm:border-x sm:border-[#E2E8F0] dark:sm:border-slate-800 shadow-sm relative overflow-hidden transition-colors">
        {/* Real Mobile Header */}
        <Header
          subtitle={getHeaderSubtitle()}
          districtName={currentDistrict.name}
          onOpenDistrictPicker={() => setIsDistrictPickerOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenSettings={() => setCurrentTab('settings')}
          onOpenLocation={() => handleLocateUser(false, true)}
          userLocation={userLocation}
          themeMode={themeMode}
          activeTheme={activeTheme}
          onCycleTheme={handleCycleTheme}
        />

        {/* Floating GPS Notification Banner if locating or recently located */}
        {locationBannerMessage && (
          <div
            className={`mx-4 mb-2 p-2.5 rounded-xl border text-xs flex items-center justify-between animate-in fade-in slide-in-from-top-1 z-10 shrink-0 ${
              locationBannerMessage.startsWith('⚠️')
                ? 'bg-amber-50 dark:bg-amber-950/70 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                : 'bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200'
            }`}
          >
            <div className="flex items-center gap-2 pr-2">
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  locationBannerMessage.startsWith('⚠️') ? 'bg-amber-500' : 'bg-emerald-500 animate-ping'
                }`}
              />
              <span className="font-medium text-[11px] leading-tight">
                {locationBannerMessage}
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {locationBannerMessage.startsWith('⚠️') && (
                <>
                  {isRunningInIframe() && (
                    <button
                      type="button"
                      onClick={() => window.open(window.location.href, '_blank')}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/80 text-blue-900 dark:text-blue-200 font-semibold hover:bg-blue-200 cursor-pointer transition-colors"
                      title="Mở toàn màn hình để cấp quyền GPS"
                    >
                      Mở tab mới ↗
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsDistrictPickerOpen(true)}
                    className="text-[10.5px] px-2 py-0.5 rounded-md bg-amber-200/80 dark:bg-amber-800/80 text-amber-900 dark:text-amber-100 font-semibold hover:bg-amber-300 dark:hover:bg-amber-700 cursor-pointer transition-colors"
                  >
                    Chọn xã/phường
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => setLocationBannerMessage(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold p-1 text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Scrollable Tab Views with modern transparent scrollbar */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          id="app-scrollable-container"
          className="flex-1 overflow-y-auto custom-scrollbar pt-1 bg-white dark:bg-slate-900 relative scroll-smooth overscroll-contain transition-colors"
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

          {currentTab === 'settings' && (
            <SettingsTab
              userLocation={userLocation}
              onRefreshLocation={() => handleLocateUser(true, false)}
              onOpenDistrictPicker={() => setIsDistrictPickerOpen(true)}
              onOpenDartApk={() => setIsDartApkOpen(true)}
              onOpenInstallGuide={() => setIsInstallGuideOpen(true)}
              onOpenPermissionsGuide={() => setIsPermissionsGuideOpen(true)}
              themeMode={themeMode}
              onThemeChange={setThemeMode}
              systemTheme={systemTheme}
              districtId={currentDistrict.id}
              districtName={currentDistrict.name}
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
      </div>

      {/* ALL MODALS (Overlay natively on top of the app) */}
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
        onOpenDistrictPicker={() => setIsDistrictPickerOpen(true)}
        onOpenPermissionsGuide={() => setIsPermissionsGuideOpen(true)}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        districtName={currentDistrict.name}
        districtId={currentDistrict.id}
        onOpenPermissionsGuide={() => setIsPermissionsGuideOpen(true)}
        onOpenSettings={() => {
          setIsNotificationsOpen(false);
          setIsSettingsOpen(true);
        }}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        userLocation={userLocation}
        onRefreshLocation={() => handleLocateUser(true, false)}
        onOpenDartApk={() => setIsDartApkOpen(true)}
        onOpenInstallGuide={() => setIsInstallGuideOpen(true)}
        themeMode={themeMode}
        onThemeChange={(mode) => {
          setThemeMode(mode);
          setStoredThemeMode(mode);
        }}
        systemTheme={systemTheme}
        districtId={currentDistrict.id}
        districtName={currentDistrict.name}
      />

      <DevicePermissionsGuideModal
        isOpen={isPermissionsGuideOpen}
        onClose={() => setIsPermissionsGuideOpen(false)}
        userLocation={userLocation}
        onRefreshLocation={() => handleLocateUser(true, false)}
        onOpenDartApk={() => {
          setIsPermissionsGuideOpen(false);
          setIsDartApkOpen(true);
        }}
      />
    </div>
  );
}
