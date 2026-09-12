import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Info,
  Sparkles,
  MapPin,
  Scale,
  AlertTriangle,
  FileText,
  PhoneCall,
  Waves,
  Footprints,
  Feather,
  Droplet,
  Copy,
  Check,
  BookOpen,
  ShieldAlert,
} from 'lucide-react';
import { ModalContent } from '../types';

interface DetailModalProps {
  content: ModalContent | null;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ content, onClose }) => {
  const [activeSpeciesTab, setActiveSpeciesTab] = useState<'overview' | 'legal' | 'habitat'>('overview');
  const [copied, setCopied] = useState(false);

  if (!content) return null;

  const sp = content.speciesData;

  const handleCopyInfo = () => {
    const textToCopy = sp
      ? `${sp.name} (${sp.scientificName})\nPhân loại: ${sp.group} - ${sp.realmLabel}\nBảo tồn: ${sp.conservationStatus}\nSinh cảnh: ${sp.habitat}\nĐặc điểm: ${sp.keyFeatures || sp.keyFeature}\nVai trò sinh thái: ${sp.ecologicalRole}\nKhung pháp lý: ${sp.legalFramework || 'Đang cập nhật'}`
      : `${content.title}\n${content.description}\n\n${content.details.join('\n')}`;

    navigator.clipboard?.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isCritical = sp && (sp.statusType === 'critical' || sp.conservationStatus.includes('CR'));
  const isEndangered = sp && (sp.statusType === 'endangered' || sp.conservationStatus.includes('EN'));
  const isVulnerable = sp && (sp.statusType === 'vulnerable' || sp.conservationStatus.includes('VU'));
  const isRare = sp && sp.statusType === 'rare';

  const statusBadgeColor = isCritical
    ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border-rose-300 dark:border-rose-800'
    : isEndangered
    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300 dark:border-amber-800'
    : isVulnerable
    ? 'bg-orange-100 text-orange-800 dark:bg-orange-950/80 dark:text-orange-300 border-orange-300 dark:border-orange-800'
    : isRare
    ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border-purple-300 dark:border-purple-800'
    : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800';

  const commercialBadge = sp
    ? sp.commercialStatus === 'permitted_free'
      ? { label: '🟢 Được phép kinh doanh tự do (OCOP/Nuôi trồng)', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300' }
      : sp.commercialStatus === 'conditional_farming'
      ? { label: '🟡 Nuôi thương mại có điều kiện (Mã số F2)', color: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300' }
      : { label: '🔴 Nghiêm cấm kinh doanh (Phụ lục I CITES / Sách Đỏ)', color: 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border-rose-300' }
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200 p-0 sm:p-4">
      <div
        id="detail-modal-container"
        className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-t-[28px] sm:rounded-[28px] max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-[#E2E8F0] dark:border-slate-800 animate-in slide-in-from-bottom duration-250"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 pb-3 border-b border-[#F1F5F9] dark:border-slate-800 flex items-start justify-between bg-[#F8FAFC] dark:bg-slate-850">
          <div className="flex-1 pr-3">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0284C7] dark:text-sky-300 bg-[#E0F2FE] dark:bg-sky-950/70 px-2.5 py-0.5 rounded-full border border-sky-200 dark:border-sky-800">
                {content.category}
              </span>
              {sp && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusBadgeColor}`}>
                  {sp.conservationStatus}
                </span>
              )}
            </div>
            <h3 className="text-[18px] sm:text-[20px] font-extrabold text-[#0F172A] dark:text-slate-100 leading-tight">
              {content.title}
            </h3>
            {sp && (
              <p className="text-[13px] font-serif italic text-slate-500 dark:text-slate-400 mt-0.5">
                Danh pháp quốc tế: {sp.scientificName}
              </p>
            )}
          </div>
          <button
            type="button"
            id="close-detail-modal-btn"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 active:scale-95 transition-all cursor-pointer shrink-0"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-[#334155] dark:text-slate-300 text-[14px] custom-scrollbar">
          {/* Featured Image (nếu có ảnh chính) */}
          {content.imageUrl && (
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-750 bg-slate-100 dark:bg-slate-800 shadow-xs max-h-64 sm:max-h-72">
              <img
                src={content.imageUrl}
                alt={content.title}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-52 sm:h-64 object-cover object-center"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-semibold drop-shadow-md">
                <span className="truncate max-w-[280px] font-medium">{content.title}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs font-sans text-sky-200 border border-white/20">
                  Nguồn: Wikimedia Commons
                </span>
              </div>
            </div>
          )}

          {/* NẾU LÀ HỒ SƠ LOÀI CHI TIẾT (speciesData có sẵn) */}
          {sp ? (
            <div className="space-y-3.5">
              {/* Huy hiệu tình trạng thương mại */}
              {commercialBadge && (
                <div className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-between gap-2 ${commercialBadge.color}`}>
                  <div className="flex items-center gap-2">
                    <Scale className="w-4 h-4 shrink-0" />
                    <span>{commercialBadge.label}</span>
                  </div>
                  <span className="text-[11px] font-medium opacity-90 underline">
                    {sp.commercialStatus === 'strictly_prohibited' ? 'Điều 244 BLHS' : 'NĐ 06/2019/NĐ-CP'}
                  </span>
                </div>
              )}

              {/* Sub-tabs điều hướng nội dung chi tiết loài */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActiveSpeciesTab('overview')}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeSpeciesTab === 'overview'
                      ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Hình Thái & Nhận Diện</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSpeciesTab('legal')}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeSpeciesTab === 'legal'
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Pháp Lý & Kinh Doanh</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSpeciesTab('habitat')}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeSpeciesTab === 'habitat'
                      ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-2xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Sinh Cảnh & Bảo Tồn</span>
                </button>
              </div>

              {/* Tab 1: Tổng quan hình thái */}
              {activeSpeciesTab === 'overview' && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  {/* Bảng thuộc tính sinh học */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-200/70 dark:border-slate-700">
                      <span className="text-slate-400 block text-[11px] font-semibold uppercase">Phân hệ sinh thái</span>
                      <strong className="text-slate-800 dark:text-slate-200 text-sm mt-0.5 flex items-center gap-1.5">
                        {sp.realm === 'underwater' && <Waves className="w-4 h-4 text-sky-500" />}
                        {sp.realm === 'aerial' && <Feather className="w-4 h-4 text-amber-500" />}
                        {sp.realm === 'terrestrial' && <Footprints className="w-4 h-4 text-emerald-500" />}
                        {sp.realm === 'amphibian' && <Droplet className="w-4 h-4 text-teal-500" />}
                        {sp.realmLabel}
                      </strong>
                    </div>

                    <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-200/70 dark:border-slate-700">
                      <span className="text-slate-400 block text-[11px] font-semibold uppercase">Nhóm phân loại</span>
                      <strong className="text-slate-800 dark:text-slate-200 text-sm mt-0.5 block truncate">
                        {sp.group}
                      </strong>
                    </div>
                  </div>

                  {/* Đặc điểm nhận diện */}
                  <div className="p-3.5 bg-sky-50/70 dark:bg-sky-950/30 rounded-xl border border-sky-200/70 dark:border-sky-800/50 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-sky-900 dark:text-sky-300 uppercase tracking-wider">
                      <Sparkles className="w-4 h-4 text-sky-600" />
                      <span>Đặc điểm sinh học nhận dạng chi tiết</span>
                    </div>
                    <p className="text-xs sm:text-[13px] text-sky-950 dark:text-sky-200 leading-relaxed">
                      {sp.keyFeatures || sp.keyFeature}
                    </p>
                  </div>

                  {/* Vai trò sinh thái */}
                  <div className="p-3.5 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-xl border border-emerald-200/70 dark:border-emerald-800/50 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Vai trò trong mạng lưới sinh thái tự nhiên</span>
                    </div>
                    <p className="text-xs sm:text-[13px] text-emerald-950 dark:text-emerald-200 leading-relaxed">
                      {sp.ecologicalRole}
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 2: Khung pháp lý & kinh doanh */}
              {activeSpeciesTab === 'legal' && (
                <div className="space-y-3 animate-in fade-in duration-200 text-xs sm:text-[13px]">
                  {/* Căn cứ pháp lý */}
                  <div className="p-3.5 bg-indigo-50/70 dark:bg-indigo-950/30 rounded-xl border border-indigo-200/70 dark:border-indigo-800/50 space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-indigo-950 dark:text-indigo-300 uppercase tracking-wider text-xs">
                      <FileText className="w-4 h-4 text-indigo-600" />
                      <span>Căn cứ pháp lý & Nghị định thi hành</span>
                    </div>
                    <p className="text-indigo-900 dark:text-indigo-200 leading-relaxed">
                      {sp.legalFramework || 'Tuân thủ các quy định chung của Luật Thủy sản 2017 và Luật Lâm nghiệp 2017.'}
                    </p>
                  </div>

                  {/* Địa bàn nuôi trồng & Sản phẩm */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-200/70 dark:border-slate-700 space-y-1">
                      <span className="text-slate-400 block text-[11px] font-semibold uppercase">Địa bàn nuôi / xuất xứ</span>
                      <p className="text-slate-800 dark:text-slate-200 font-medium">
                        {sp.commercialFarmingLocation || 'Phân bố tự nhiên trên các thủy vực và rừng TP.HCM.'}
                      </p>
                    </div>

                    <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-200/70 dark:border-slate-700 space-y-1">
                      <span className="text-slate-400 block text-[11px] font-semibold uppercase">Giá trị kinh tế</span>
                      <p className="text-slate-800 dark:text-slate-200 font-medium">
                        {sp.economicValue || 'Giá trị duy trì sinh thái và nghiên cứu khoa học.'}
                      </p>
                    </div>
                  </div>

                  {/* Sản phẩm thương phẩm hợp pháp */}
                  {sp.commercialProducts && sp.commercialProducts.length > 0 && (
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-200/70 dark:border-slate-700 space-y-1.5">
                      <span className="text-slate-400 block text-[11px] font-semibold uppercase">Sản phẩm thương phẩm hợp pháp:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {sp.commercialProducts.map((p, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-750 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 text-xs font-medium"
                          >
                            ✓ {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Lưu ý thi hành & Cảnh báo */}
                  <div className={`p-3 rounded-xl border space-y-1 ${
                    sp.commercialStatus === 'strictly_prohibited'
                      ? 'bg-rose-50/80 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
                      : 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                  }`}>
                    <div className="flex items-center gap-1.5 font-bold uppercase text-[11px]">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Lưu ý chấp hành pháp luật:</span>
                    </div>
                    <p className="text-xs leading-relaxed">
                      {sp.commercialNotes || 'Chấp hành nghiêm quy định về kiểm dịch, truy xuất nguồn gốc và bảo vệ sinh cảnh tự nhiên.'}
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 3: Sinh cảnh & Bảo tồn */}
              {activeSpeciesTab === 'habitat' && (
                <div className="space-y-3 animate-in fade-in duration-200 text-xs sm:text-[13px]">
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-200/70 dark:border-slate-700 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      <span>Khu vực phân bố trọng điểm</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                      {sp.habitat}
                    </p>
                  </div>

                  {/* Hành động bảo vệ */}
                  <div className="p-3.5 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-xl border border-emerald-200/70 dark:border-emerald-800/50 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider">
                      <ShieldAlert className="w-4 h-4 text-emerald-600" />
                      <span>Khuyến cáo bảo tồn cộng đồng</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-emerald-950 dark:text-emerald-200">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>Không đánh bắt bằng xung điện, hóa chất độc hại hay lưới mắt nhỏ tại các bãi đẻ tự nhiên.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>Không phóng sinh các loài ngoại lai xâm hại gây mất cân bằng chuỗi thức ăn.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>Báo ngay khi phát hiện buôn bán, nuôi nhốt động vật hoang dã trái phép qua đường dây nóng.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Hotline cứu hộ */}
                  <div className="p-3 bg-slate-900 text-white rounded-xl flex items-center justify-between gap-2 shadow-xs">
                    <div className="flex items-center gap-2.5">
                      <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <span className="text-[11px] font-bold uppercase text-emerald-400 block">
                          Đường dây nóng Kiểm lâm & Cứu hộ TP.HCM
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-200">
                          (028) 3844 1447 • ENV: 1800 1522
                        </span>
                      </div>
                    </div>
                    <a
                      href="tel:18001522"
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold shrink-0 transition-colors"
                    >
                      Gọi miễn phí
                    </a>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* HIỂN THỊ CHUẨN KHI KHÔNG CÓ speciesData (ví dụ: Vùng sinh thái, Chỉ số, Báo cáo) */
            <div className="space-y-4">
              {/* Summary */}
              <div className="p-3.5 bg-[#F8FAFC] dark:bg-slate-800/80 rounded-2xl border border-[#E2E8F0]/60 dark:border-slate-700 flex items-start gap-3">
                <Info className="w-5 h-5 text-[#0284C7] dark:text-sky-400 shrink-0 mt-0.5" />
                <p className="font-medium text-[#1E293B] dark:text-slate-200 leading-relaxed">
                  {content.description}
                </p>
              </div>

              {/* Custom structured sections (nếu có) */}
              {content.sections && content.sections.length > 0 && (
                <div className="space-y-3">
                  {content.sections.map((sec, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3.5 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-200/70 dark:border-slate-700 space-y-2"
                    >
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                        <span>{sec.title}</span>
                      </h4>
                      <div className="space-y-1.5">
                        {sec.items.map((item, iIdx) => (
                          <div key={iIdx} className="text-xs flex items-start justify-between gap-2 border-b border-slate-100 dark:border-slate-750 pb-1 last:border-0 last:pb-0">
                            <span className="text-slate-500 dark:text-slate-400 shrink-0">{item.label}:</span>
                            <span className={`font-semibold text-right ${item.highlight ? 'text-sky-700 dark:text-sky-300' : 'text-slate-800 dark:text-slate-200'}`}>
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Details list */}
              {content.details && content.details.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-[13px] font-bold uppercase tracking-wider text-[#64748B] dark:text-slate-400">
                    Thông tin & Chỉ số chi tiết
                  </h4>
                  <ul className="space-y-2.5">
                    {content.details.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 leading-relaxed text-xs sm:text-[13.5px]">
                        <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                        <span className="text-[#334155] dark:text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Danh mục tên các loài đã xác định & ghi nhận (Species List) */}
              {content.speciesList && content.speciesList.length > 0 && (
                <div className="space-y-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[13px] font-bold uppercase tracking-wider text-[#0284C7] dark:text-sky-400 flex items-center gap-1.5">
                      <span>🐾 Danh lục Toàn bộ Loài Sinh vật ({content.speciesList.length} loài)</span>
                    </h4>
                    <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                      Ảnh nhận dạng & Danh pháp
                    </span>
                  </div>

                  <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
                    {content.speciesList.map((species) => {
                      const spIsCritical = species.statusType === 'critical' || species.conservationStatus.includes('CR');
                      const spIsEndangered = species.statusType === 'endangered' || species.conservationStatus.includes('EN');
                      const spIsVulnerable = species.statusType === 'vulnerable' || species.conservationStatus.includes('VU');
                      const spIsRare = species.statusType === 'rare';

                      const badgeStyle = spIsCritical
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border-rose-300 dark:border-rose-800'
                        : spIsEndangered
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                        : spIsVulnerable
                        ? 'bg-orange-100 text-orange-800 dark:bg-orange-950/80 dark:text-orange-300 border-orange-300 dark:border-orange-800'
                        : spIsRare
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border-purple-300 dark:border-purple-800'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800';

                      return (
                        <div
                          key={species.id}
                          className="p-3 bg-[#F8FAFC] dark:bg-slate-800/90 rounded-xl border border-slate-200/80 dark:border-slate-700 flex gap-3 transition-colors hover:border-sky-300 dark:hover:border-sky-700"
                        >
                          {species.imageUrl && (
                            <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-700 border border-slate-200 dark:border-slate-600">
                              <img
                                src={species.imageUrl}
                                alt={species.name}
                                referrerPolicy="no-referrer"
                                loading="lazy"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLElement).style.display = 'none';
                                }}
                              />
                            </div>
                          )}

                          <div className="flex-1 flex flex-col justify-between gap-1">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-extrabold text-[14px] text-slate-900 dark:text-slate-100">
                                    {species.name}
                                  </span>
                                  <span className="text-[12px] italic text-slate-500 dark:text-slate-400 font-serif">
                                    ({species.scientificName})
                                  </span>
                                </div>
                                <span className="text-[11px] font-semibold text-sky-700 dark:text-sky-400 block mt-0.5">
                                  {species.group} • {species.habitat}
                                </span>
                              </div>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${badgeStyle}`}>
                                {species.conservationStatus.split('-')[0].trim()}
                              </span>
                            </div>

                            <p className="text-[12px] text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                              <span className="font-semibold text-slate-700 dark:text-slate-200">Đặc điểm: </span>
                              {species.keyFeature}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Practical Tips */}
              {content.tips && content.tips.length > 0 && (
                <div className="p-4 bg-[#F0FDF4] dark:bg-emerald-950/40 border border-[#BBF7D0] dark:border-emerald-800/60 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-[#166534] dark:text-emerald-300 font-bold text-[13px]">
                    <Sparkles className="w-4 h-4" />
                    <span>Khuyến nghị & Hành động thực tế</span>
                  </div>
                  <ul className="space-y-1.5 text-[13px] text-[#15803D] dark:text-emerald-300/90">
                    {content.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-bold">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Offline badge notice */}
          <div className="pt-2 flex items-center justify-between text-xs text-[#64748B] dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              Dữ liệu khả dụng ngoại tuyến (Offline 100%)
            </span>
            <span>Cập nhật chuẩn 2026</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#F1F5F9] dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleCopyInfo}
            className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Đã sao chép' : 'Sao chép thông tin'}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#0F172A] dark:bg-blue-600 hover:bg-[#1E293B] dark:hover:bg-blue-500 active:scale-98 text-white rounded-xl font-semibold text-sm transition-all cursor-pointer"
          >
            Đã hiểu & Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
