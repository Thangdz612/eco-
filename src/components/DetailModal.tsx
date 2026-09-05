import React from 'react';
import { X, CheckCircle2, ShieldCheck, Info, Sparkles } from 'lucide-react';
import { ModalContent } from '../types';

interface DetailModalProps {
  content: ModalContent | null;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ content, onClose }) => {
  if (!content) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        id="detail-modal-container"
        className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-t-[28px] sm:rounded-[28px] max-h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-[#E2E8F0] dark:border-slate-800 animate-in slide-in-from-bottom duration-250"
      >
        {/* Modal Header */}
        <div className="p-5 pb-3 border-b border-[#F1F5F9] dark:border-slate-800 flex items-start justify-between bg-[#F8FAFC] dark:bg-slate-850">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0284C7] dark:text-sky-300 bg-[#E0F2FE] dark:bg-sky-950/70 px-2 py-0.5 rounded-full inline-block mb-1 border border-transparent dark:border-sky-800">
              {content.category}
            </span>
            <h3 className="text-[18px] font-extrabold text-[#0F172A] dark:text-slate-100 leading-tight">
              {content.title}
            </h3>
          </div>
          <button
            type="button"
            id="close-detail-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 active:scale-95 transition-all cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-[#334155] dark:text-slate-300 text-[14px]">
          {/* Summary */}
          <div className="p-3.5 bg-[#F8FAFC] dark:bg-slate-800/80 rounded-2xl border border-[#E2E8F0]/60 dark:border-slate-700 flex items-start gap-3">
            <Info className="w-5 h-5 text-[#0284C7] dark:text-sky-400 shrink-0 mt-0.5" />
            <p className="font-medium text-[#1E293B] dark:text-slate-200 leading-relaxed">
              {content.description}
            </p>
          </div>

          {/* Details list */}
          {content.details && content.details.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-[13px] font-bold uppercase tracking-wider text-[#64748B] dark:text-slate-400">
                Thông tin & Chỉ số chi tiết
              </h4>
              <ul className="space-y-2.5">
                {content.details.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span className="text-[#334155] dark:text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
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

          {/* Offline badge notice */}
          <div className="pt-2 flex items-center justify-between text-xs text-[#64748B] dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              Dữ liệu khả dụng ngoại tuyến (Offline 100%)
            </span>
            <span>Cập nhật: Mới nhất</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#F1F5F9] dark:border-slate-800 bg-white dark:bg-slate-900 flex justify-end">
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
