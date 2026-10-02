import React, { useState, useMemo } from 'react';
import { X, Check, MapPin, Crosshair, Navigation, Search, Filter, Layers } from 'lucide-react';
import { DISTRICTS_DATA, HCM_DISTRICT_GROUPS } from '../data/mockData';
import { UserLocation } from '../types';
import { calculateDistanceKm } from '../utils/geolocation';

interface DistrictModalProps {
  isOpen: boolean;
  selectedDistrictId: string;
  onSelectDistrict: (districtId: string) => void;
  onClose: () => void;
  onTriggerLocation?: () => void;
  userLocation?: UserLocation | null;
}

type AdminTypeFilter = 'all' | 'phường' | 'xã' | 'đặc khu';

function removeVietnameseTones(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

export const DistrictModal: React.FC<DistrictModalProps> = ({
  isOpen,
  selectedDistrictId,
  onSelectDistrict,
  onClose,
  onTriggerLocation,
  userLocation,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('Tất cả');
  const [adminTypeFilter, setAdminTypeFilter] = useState<AdminTypeFilter>('all');

  const allDistricts = useMemo(() => Object.values(DISTRICTS_DATA), []);

  const counts = useMemo(() => {
    return {
      all: allDistricts.length,
      phuong: allDistricts.filter((d) => d.adminType === 'phường').length,
      xa: allDistricts.filter((d) => d.adminType === 'xã').length,
      dacKhu: allDistricts.filter((d) => d.adminType === 'đặc khu').length,
    };
  }, [allDistricts]);

  const filteredDistricts = useMemo(() => {
    return allDistricts.filter((item) => {
      // Group filter
      if (selectedGroup !== 'Tất cả' && item.districtGroup !== selectedGroup) {
        return false;
      }

      // Type filter
      if (adminTypeFilter !== 'all' && item.adminType !== adminTypeFilter) {
        return false;
      }

      // Search term with accent-insensitive search
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const queryNoTone = removeVietnameseTones(searchTerm.trim());

        const nameNoTone = removeVietnameseTones(item.name);
        const subNoTone = removeVietnameseTones(item.subTitle);
        const groupNoTone = removeVietnameseTones(item.districtGroup || '');

        const matchName = item.name.toLowerCase().includes(query) || nameNoTone.includes(queryNoTone);
        const matchSub = item.subTitle.toLowerCase().includes(query) || subNoTone.includes(queryNoTone);
        const matchGroup = item.districtGroup?.toLowerCase().includes(query) || groupNoTone.includes(queryNoTone);
        return matchName || matchSub || matchGroup;
      }

      return true;
    });
  }, [allDistricts, selectedGroup, adminTypeFilter, searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        id="district-picker-modal"
        className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-t-[28px] sm:rounded-[28px] shadow-2xl overflow-hidden border border-[#E2E8F0] dark:border-slate-800 flex flex-col max-h-[85vh] animate-in slide-in-from-bottom duration-250"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#F1F5F9] dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-[#0D47A1] dark:text-blue-300 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-[16px] sm:text-[17px] font-extrabold text-[#0F172A] dark:text-slate-100 leading-tight">
                Danh sách 168 Đơn vị hành chính cấp xã
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                {counts.all} Đơn vị (113 Phường, 54 Xã, 1 Đặc khu Côn Đảo)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* GPS Current Location Quick Button */}
        {onTriggerLocation && (
          <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800 bg-[#F8FAFC] dark:bg-slate-850 shrink-0">
            <button
              type="button"
              id="btn-use-my-gps"
              onClick={() => {
                onTriggerLocation();
                onClose();
              }}
              className="w-full flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-gradient-to-r from-[#0D47A1] to-[#1E40AF] dark:from-blue-700 dark:to-indigo-700 text-white shadow-xs hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center text-white">
                  <Crosshair className="w-3.5 h-3.5" />
                </div>
                <div className="text-left">
                  <div className="text-[12.5px] font-bold">Định vị GPS vị trí của tôi</div>
                  <div className="text-[11px] text-blue-100 dark:text-blue-200 line-clamp-1">
                    {userLocation?.isRealGps && userLocation?.nearestDistrictName
                      ? `Trạm gần nhất: ${userLocation.nearestDistrictName}`
                      : 'Tự động xác định xã/phường gần vị trí thực tế của bạn'}
                  </div>
                </div>
              </div>
              <Navigation className="w-3.5 h-3.5 text-blue-200 shrink-0" />
            </button>
          </div>
        )}

        {/* Search Bar & Type Filters */}
        <div className="p-3 sm:px-4 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2.5 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="search-ward-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm An Điền, Tây Nam, Bến Cát, Củ Chi, Côn Đảo..."
              className="w-full pl-9 pr-8 py-2 text-[13px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 transition-all"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Type filter pills: Tất cả, Phường, Xã, Đặc khu */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
            {[
              { id: 'all', label: `Tất cả (${counts.all})` },
              { id: 'phường', label: `Phường (${counts.phuong})` },
              { id: 'xã', label: `Xã (${counts.xa})` },
              { id: 'đặc khu', label: `Đặc khu (${counts.dacKhu})` },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                id={`filter-type-${tab.id}`}
                onClick={() => setAdminTypeFilter(tab.id as AdminTypeFilter)}
                className={`text-[11.5px] px-2.5 py-1 rounded-lg font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  adminTypeFilter === tab.id
                    ? 'bg-[#0D47A1] dark:bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* District group filter chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium shrink-0 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              Khu vực:
            </span>
            {HCM_DISTRICT_GROUPS.map((group) => (
              <button
                key={group}
                type="button"
                onClick={() => setSelectedGroup(group)}
                className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedGroup === group
                    ? 'bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 font-bold border border-blue-300 dark:border-blue-700'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {group}
              </button>
            ))}
          </div>
        </div>

        {/* Count notification */}
        <div className="px-4 py-1.5 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 shrink-0">
          <span>
            Hiển thị <strong>{filteredDistricts.length}</strong> / 168 đơn vị cấp xã
          </span>
          {(searchTerm || selectedGroup !== 'Tất cả' || adminTypeFilter !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setSelectedGroup('Tất cả');
                setAdminTypeFilter('all');
              }}
              className="text-[#0D47A1] dark:text-blue-400 hover:underline font-semibold cursor-pointer"
            >
              Đặt lại bộ lọc
            </button>
          )}
        </div>

        {/* Ward List */}
        <div className="p-3 space-y-1.5 overflow-y-auto flex-1 divide-y divide-slate-50 dark:divide-slate-800/40">
          {filteredDistricts.length === 0 ? (
            <div className="py-12 text-center text-slate-400 dark:text-slate-500">
              <Layers className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-medium">Không tìm thấy đơn vị hành chính phù hợp</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Thử từ khóa khác hoặc đặt lại bộ lọc</p>
            </div>
          ) : (
            filteredDistricts.map((district) => {
              const isSelected = district.id === selectedDistrictId;
              const distance = userLocation
                ? calculateDistanceKm(userLocation.lat, userLocation.lng, district.lat, district.lng)
                : null;

              return (
                <button
                  key={district.id}
                  type="button"
                  id={`select-district-${district.id}`}
                  onClick={() => {
                    onSelectDistrict(district.id);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all text-left cursor-pointer ${
                    isSelected
                      ? 'bg-[#EBF5FF] dark:bg-blue-950/50 text-[#0D47A1] dark:text-blue-300 font-bold border border-[#BFDBFE] dark:border-blue-800'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/70 text-[#1E293B] dark:text-slate-200'
                  }`}
                >
                  <div className="pr-2 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[14px] font-bold text-slate-900 dark:text-slate-100 leading-snug">
                        {district.name}
                      </span>
                      {district.adminType && (
                        <span
                          className={`text-[9.5px] font-bold px-1.5 py-0.2 rounded-md ${
                            district.adminType === 'đặc khu'
                              ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                              : district.adminType === 'xã'
                              ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                              : 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300'
                          }`}
                        >
                          {district.adminType.toUpperCase()}
                        </span>
                      )}
                      {distance !== null && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {distance === 0 ? 'Tại đây' : `~${distance} km`}
                        </span>
                      )}
                    </div>
                    <div className="text-[11.5px] text-slate-500 dark:text-slate-400 mt-0.5 font-normal line-clamp-1">
                      {district.subTitle}
                    </div>
                    {district.weather?.temp ? (
                      <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 flex items-center gap-2">
                        <span className="font-semibold text-slate-600 dark:text-slate-300">{district.weather.temp}</span>
                        <span>•</span>
                        <span>Độ ẩm: {district.weather.humidity}</span>
                        <span>•</span>
                        <span>{district.weather.uvIndex}</span>
                      </div>
                    ) : (
                      <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 flex items-center gap-1.5">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500/70" />
                        <span>Khu vực {district.districtGroup}</span>
                      </div>
                    )}
                  </div>
                  {isSelected && <Check className="w-5 h-5 text-[#0D47A1] dark:text-blue-400 shrink-0" />}
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#F8FAFC] dark:bg-slate-900 border-t border-[#F1F5F9] dark:border-slate-800 text-[11px] text-center text-slate-500 dark:text-slate-400 shrink-0">
          Cập nhật chuẩn xác 168 đơn vị hành chính cấp xã theo Nghị quyết 1685/NQ-UBTVQH15 (113 phường, 54 xã, 1 đặc khu Côn Đảo) thuộc 3 khu vực: TP.HCM cũ, Bình Dương cũ và Bà Rịa – Vũng Tàu cũ
        </div>
      </div>
    </div>
  );
};
