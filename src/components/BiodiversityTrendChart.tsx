import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  LineChart as LineChartIcon,
  Layers,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Info,
  Waves,
  Feather,
  Footprints,
  Droplet,
  Compass,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
  LineChart,
  BarChart,
  Line,
  Bar,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceLine,
} from 'recharts';
import {
  BIODIVERSITY_ANNUAL_TRENDS,
  SPECIES_TREND_DETAILS,
  ECO_ZONES_TREND_DATA,
  SpeciesTrendItem,
} from '../data/biodiversityTrendData';
import { ModalContent } from '../types';

interface BiodiversityTrendChartProps {
  onOpenDetail?: (content: ModalContent) => void;
  compactMode?: boolean;
}

type ChartViewType = 'lines' | 'bars' | 'species_protected';

export const BiodiversityTrendChart: React.FC<BiodiversityTrendChartProps> = ({
  onOpenDetail,
  compactMode = false,
}) => {
  const [chartView, setChartView] = useState<ChartViewType>('lines');
  const [selectedRealm, setSelectedRealm] = useState<'all' | 'underwater' | 'aerial' | 'terrestrial' | 'amphibian'>('all');
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [trendSearch, setTrendSearch] = useState<string>('');

  // Lọc danh sách loài tăng giảm
  const filteredSpecies = useMemo(() => {
    return SPECIES_TREND_DETAILS.filter((item) => {
      const matchRealm = selectedRealm === 'all' || item.realm === selectedRealm;
      const matchSearch =
        !trendSearch ||
        item.name.toLowerCase().includes(trendSearch.toLowerCase()) ||
        item.scientificName.toLowerCase().includes(trendSearch.toLowerCase()) ||
        item.region.toLowerCase().includes(trendSearch.toLowerCase()) ||
        item.trendLabel.toLowerCase().includes(trendSearch.toLowerCase());
      return matchRealm && matchSearch;
    });
  }, [selectedRealm, trendSearch]);

  // Tìm bản ghi năm được chọn
  const currentYearRecord = useMemo(() => {
    return (
      BIODIVERSITY_ANNUAL_TRENDS.find((r) => r.year === selectedYear) ||
      BIODIVERSITY_ANNUAL_TRENDS[BIODIVERSITY_ANNUAL_TRENDS.length - 1]
    );
  }, [selectedYear]);

  // Custom tooltip cho recharts
  const CustomChartTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const record = BIODIVERSITY_ANNUAL_TRENDS.find((r) => r.label === label || r.year.toString() === label);
      return (
        <div className="bg-white/95 dark:bg-slate-900/95 p-3 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 text-xs backdrop-blur-md max-w-xs">
          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-200 dark:border-slate-800">
            <span className="font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              Năm {label}
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              Tổng quan: {record?.overallScore} điểm
            </span>
          </div>

          <div className="space-y-1 my-1.5">
            {payload.map((entry: any, index: number) => (
              <div key={`tip-${index}`} className="flex items-center justify-between gap-3 text-[11px]">
                <span className="flex items-center gap-1.5" style={{ color: entry.color }}>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                  {entry.name}:
                </span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                  {entry.value} {entry.unit || ''}
                </span>
              </div>
            ))}
          </div>

          {record && (
            <div className="pt-1.5 mt-1.5 border-t border-slate-100 dark:border-slate-800 text-[10.5px] text-slate-600 dark:text-slate-400">
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">Sự kiện: </span>
              {record.milestone}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 1. Header & Giới thiệu xu hướng 2023 - 2026 */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-sky-500/10 to-teal-500/10 border border-emerald-500/20 dark:border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/20">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                Biểu Đồ Xu Hướng Tăng Giảm Sinh Vật (2023 – 2026)
              </h3>
              <span className="text-[10.5px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow-2xs">
                Quan trắc 4 năm liên tục
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed max-w-3xl">
              Theo dõi diễn biến phục hồi và biến động quần thể sinh vật biển/thủy sinh, trên không, trên cạn và lưỡng cư qua các cột mốc can thiệp bảo tồn môi trường TP.HCM & Côn Đảo.
            </p>
          </div>
        </div>

        {/* Nút chuyển đổi dạng biểu đồ */}
        <div className="flex items-center gap-1 p-1 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700 self-start sm:self-auto shrink-0 shadow-2xs">
          <button
            type="button"
            id="trend-chart-view-lines"
            onClick={() => setChartView('lines')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              chartView === 'lines'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <LineChartIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Đường / Vùng</span>
          </button>

          <button
            type="button"
            id="trend-chart-view-bars"
            onClick={() => setChartView('bars')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              chartView === 'bars'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cột so sánh</span>
          </button>

          <button
            type="button"
            id="trend-chart-view-species"
            onClick={() => setChartView('species_protected')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              chartView === 'species_protected'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Loài & Sách Đỏ</span>
          </button>
        </div>
      </div>

      {/* 2. Các thẻ chỉ số KPI Tổng kết biến động 2023 - 2026 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {/* Tổng thể */}
        <div className="p-3 rounded-xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Đa dạng tổng hợp</span>
            <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center">
              <ArrowUpRight className="w-3 h-3 mr-0.5" /> +22.8%
            </span>
          </div>
          <div className="mt-1">
            <div className="text-lg font-black text-slate-900 dark:text-slate-100">80.8 <span className="text-xs font-normal text-slate-400">/100</span></div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">2023: 65.8 điểm</span>
          </div>
        </div>

        {/* Dưới nước / Biển */}
        <div className="p-3 rounded-xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-sky-700 dark:text-sky-400 flex items-center gap-1">
              <Waves className="w-3 h-3" /> Thủy sinh
            </span>
            <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 flex items-center">
              <ArrowUpRight className="w-3 h-3 mr-0.5" /> +23.5%
            </span>
          </div>
          <div className="mt-1">
            <div className="text-lg font-black text-slate-900 dark:text-slate-100">84.2 <span className="text-xs font-normal text-slate-400">/100</span></div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">2023: 68.2 điểm</span>
          </div>
        </div>

        {/* Chim & Trên không */}
        <div className="p-3 rounded-xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1">
              <Feather className="w-3 h-3" /> Trên không
            </span>
            <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 flex items-center">
              <ArrowUpRight className="w-3 h-3 mr-0.5" /> +30.6%
            </span>
          </div>
          <div className="mt-1">
            <div className="text-lg font-black text-slate-900 dark:text-slate-100">81.0 <span className="text-xs font-normal text-slate-400">/100</span></div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">2023: 62.0 điểm</span>
          </div>
        </div>

        {/* Động thực vật Trên cạn */}
        <div className="p-3 rounded-xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
              <Footprints className="w-3 h-3" /> Trên cạn
            </span>
            <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center">
              <ArrowUpRight className="w-3 h-3 mr-0.5" /> +17.6%
            </span>
          </div>
          <div className="mt-1">
            <div className="text-lg font-black text-slate-900 dark:text-slate-100">87.0 <span className="text-xs font-normal text-slate-400">/100</span></div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">2023: 74.0 điểm</span>
          </div>
        </div>

        {/* Lưỡng cư & Bò sát */}
        <div className="p-3 rounded-xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-teal-700 dark:text-teal-400 flex items-center gap-1">
              <Droplet className="w-3 h-3" /> Lưỡng cư
            </span>
            <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 flex items-center">
              <ArrowUpRight className="w-3 h-3 mr-0.5" /> +20.3%
            </span>
          </div>
          <div className="mt-1">
            <div className="text-lg font-black text-slate-900 dark:text-slate-100">71.0 <span className="text-xs font-normal text-slate-400">/100</span></div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">2024 giảm nhẹ 56.2</span>
          </div>
        </div>

        {/* Rừng & Mảng xanh bảo tồn */}
        <div className="p-3 rounded-xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300">Rừng ngập mặn</span>
            <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              +1.100 ha
            </span>
          </div>
          <div className="mt-1">
            <div className="text-lg font-black text-slate-900 dark:text-slate-100">38.900 <span className="text-xs font-normal text-slate-400">ha</span></div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">2023: 37.800 ha</span>
          </div>
        </div>
      </div>

      {/* 3. KHU VỰC HIỂN THỊ BIỂU ĐỒ RECHARTS */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-emerald-600" />
              {chartView === 'lines' && 'Biểu Đồ Đường Vùng: Quỹ Đạo Phục Hồi 4 Phân Hệ (2023 - 2026)'}
              {chartView === 'bars' && 'Biểu Đồ Cột: So Sánh Điểm Số Từng Phân Hệ Qua 4 Năm'}
              {chartView === 'species_protected' && 'Biểu Đồ Kết Hợp: Số Loài Định Danh & Cá Thể Nguy Cấp Được Cứu Hộ'}
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Đơn vị đo lường: Chỉ số sức khỏe quần thể sinh vật (0-100 điểm) chuẩn hóa theo thang đa dạng sinh thái quốc tế
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 text-[11px]">Chọn năm xem mốc can thiệp:</span>
            {[2023, 2024, 2025, 2026].map((yr) => (
              <button
                key={yr}
                type="button"
                onClick={() => setSelectedYear(yr)}
                className={`px-2 py-0.5 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                  selectedYear === yr
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-2xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>
        </div>

        {/* Render Biểu đồ theo state */}
        <div className="w-full h-72 sm:h-80 pt-2">
          {chartView === 'lines' && (
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={BIODIVERSITY_ANNUAL_TRENDS} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorOverall" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
                <XAxis dataKey="label" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[50, 100]} tick={{ fontSize: 10 }} unit=" đ" axisLine={false} tickLine={false} />
                <Tooltip content={<CustomChartTooltip />} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} iconType="circle" />
                <ReferenceLine y={70} stroke="#94A3B8" strokeDasharray="3 3" label={{ value: 'Ngưỡng đa dạng tốt (70 điểm)', fill: '#64748B', fontSize: 10 }} />

                <Area type="monotone" dataKey="overallScore" name="Điểm Đa dạng Tổng hợp" stroke="#059669" strokeWidth={3} fillOpacity={1} fill="url(#colorOverall)" />
                <Line type="monotone" dataKey="underwater" name="🌊 Thủy sinh & Biển" stroke="#0284C7" strokeWidth={2.2} dot={{ r: 3 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="terrestrial" name="🌳 Trên cạn" stroke="#16A34A" strokeWidth={2.2} dot={{ r: 3 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="aerial" name="🦅 Trên không (Chim)" stroke="#D97706" strokeWidth={2.2} dot={{ r: 3 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="amphibian" name="🐸 Lưỡng cư & Bò sát" stroke="#0D9488" strokeWidth={2.2} strokeDasharray="4 2" dot={{ r: 3 }} activeDot={{ r: 6 }} />
              </ComposedChart>
            </ResponsiveContainer>
          )}

          {chartView === 'bars' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={BIODIVERSITY_ANNUAL_TRENDS} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
                <XAxis dataKey="label" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} unit=" đ" axisLine={false} tickLine={false} />
                <Tooltip content={<CustomChartTooltip />} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} iconType="rect" />

                <Bar dataKey="underwater" name="🌊 Thủy sinh" fill="#0284C7" radius={[4, 4, 0, 0]} />
                <Bar dataKey="aerial" name="🦅 Trên không" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="terrestrial" name="🌳 Trên cạn" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="amphibian" name="🐸 Lưỡng cư" fill="#14B8A6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}

          {chartView === 'species_protected' && (
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={BIODIVERSITY_ANNUAL_TRENDS} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
                <XAxis dataKey="label" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" domain={[1300, 1700]} tick={{ fontSize: 10 }} unit=" loài" axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" domain={[2500, 6000]} tick={{ fontSize: 10 }} unit=" cá thể" axisLine={false} tickLine={false} />
                <Tooltip content={<CustomChartTooltip />} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />

                <Bar yAxisId="left" dataKey="speciesCount" name="Tổng loài ghi nhận (loài)" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={36} />
                <Line yAxisId="right" type="monotone" dataKey="endangeredProtected" name="Cá thể Sách Đỏ cứu hộ/về tự nhiên" stroke="#EF4444" strokeWidth={3} dot={{ r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Thông tin sự kiện và mốc can thiệp của năm đang chọn */}
        <div className="mt-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                Mốc can thiệp năm {currentYearRecord.year}:
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                {currentYearRecord.milestone}
              </span>
            </div>
            <p className="text-[11.5px] text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong className="text-rose-600 dark:text-rose-400">Áp lực môi trường: </strong>{currentYearRecord.stressFactor} •{' '}
              <strong className="text-emerald-600 dark:text-emerald-400">Hành động bảo tồn: </strong>{currentYearRecord.conservationAction}
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              onOpenDetail?.({
                title: `Hồ sơ Môi trường & Đa dạng Sinh học năm ${currentYearRecord.year}`,
                category: 'Báo cáo quan trắc thường niên',
                description: `Điểm số đa dạng toàn diện: ${currentYearRecord.overallScore}/100 • Tổng loài: ${currentYearRecord.speciesCount} loài`,
                details: [
                  `Sự kiện then chốt: ${currentYearRecord.milestone}`,
                  `Chỉ số sinh vật thủy sinh & biển: ${currentYearRecord.underwater} điểm`,
                  `Chỉ số chim & sinh vật trên không: ${currentYearRecord.aerial} điểm`,
                  `Chỉ số động thực vật trên cạn: ${currentYearRecord.terrestrial} điểm`,
                  `Chỉ số lưỡng cư & bò sát: ${currentYearRecord.amphibian} điểm`,
                  `Diện tích rừng ngập mặn Cần Giờ & thảm xanh: ${currentYearRecord.mangroveForestHa.toLocaleString()} ha`,
                  `Số cá thể loài Sách Đỏ được cứu hộ & bảo vệ: ${currentYearRecord.endangeredProtected.toLocaleString()} cá thể`,
                  `Yếu tố áp lực: ${currentYearRecord.stressFactor}`,
                  `Giải pháp thực thi: ${currentYearRecord.conservationAction}`,
                ],
                tips: [
                  'Tăng cường tuần tra ngăn chặn bẫy bắt động vật hoang dã trái phép.',
                  'Ủng hộ các chiến dịch trồng cây bản địa và giảm rác thải nhựa đại dương.',
                ],
              })
            }
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shrink-0 cursor-pointer transition-colors shadow-2xs flex items-center gap-1 self-start sm:self-auto"
          >
            <Info className="w-3.5 h-3.5" />
            Chi tiết năm {currentYearRecord.year}
          </button>
        </div>
      </div>

      {/* 4. So sánh tỷ lệ tăng trưởng theo 5 vùng sinh thái chiến lược */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-sky-600" />
              So Sánh Tăng Trưởng Đa Dạng Sinh Thái Theo 5 Vùng Trọng Điểm (2023 - 2026)
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Trục sông Sài Gòn và Cần Giờ ghi nhận tốc độ phục hồi sinh thái cao nhất nhờ các dự án xử lý nước thải và phục hồi rừng
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
          {ECO_ZONES_TREND_DATA.map((z) => (
            <div
              key={z.zoneId}
              onClick={() =>
                onOpenDetail?.({
                  title: `Xu hướng phục hồi sinh thái: ${z.zoneName}`,
                  category: 'Đánh giá 5 Vùng Trọng điểm 2023-2026',
                  description: `Tăng trưởng ròng: +${z.growthRate}% (Từ ${z.score2023} lên ${z.score2026} điểm)`,
                  details: [
                    `Điểm số 2023: ${z.score2023} điểm`,
                    `Điểm số 2024: ${z.score2024} điểm`,
                    `Điểm số 2025: ${z.score2025} điểm`,
                    `Điểm số 2026: ${z.score2026} điểm`,
                    `Điểm nổi bật: ${z.keyHighlight}`,
                  ],
                  tips: [
                    'Bảo vệ hành lang thoát lũ và giữ nguyên các bãi bồi tự nhiên.',
                    'Duy trì tuần tra liên ngành bảo vệ rạn san hô và nguồn lợi thủy sản.',
                  ],
                })
              }
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 hover:border-sky-500 transition-all cursor-pointer flex flex-col justify-between gap-1.5 text-left group"
            >
              <div>
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-sky-600 transition-colors line-clamp-1">
                    {z.zoneName}
                  </span>
                  <span className="text-[10px] font-extrabold text-emerald-700 dark:text-emerald-400 px-1 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950 shrink-0">
                    +{z.growthRate}%
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-1.5 text-xs">
                  <span className="text-[11px] text-slate-400">2023: <strong>{z.score2023}</strong></span>
                  <span className="text-slate-300 dark:text-slate-600">&rarr;</span>
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">2026: <strong>{z.score2026}</strong></span>
                </div>
              </div>

              {/* Thanh tiến độ trực quan */}
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mt-1">
                <div
                  className="bg-sky-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${z.score2026}%` }}
                />
              </div>

              <p className="text-[10.5px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5 leading-relaxed">
                {z.keyHighlight}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. BẢNG CHI TIẾT CÁC LOÀI SINH VẬT CỤ THỂ: TĂNG / GIẢM / HỒI PHỤC (2023 - 2026) */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Chi Tiết Biến Động Từng Loài Sinh Vật Tiêu Biểu (2023 – 2026)
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Phân tích số liệu cụ thể, nguyên nhân tăng trưởng hoặc sụt giảm tạm thời do El Niño 2024
            </p>
          </div>

          {/* Tìm kiếm loài */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              id="trend-species-search"
              value={trendSearch}
              onChange={(e) => setTrendSearch(e.target.value)}
              placeholder="Tìm tên loài, phân hệ, địa bàn..."
              className="px-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 w-48 sm:w-56"
            />
          </div>
        </div>

        {/* Lọc phân hệ */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 custom-scrollbar">
          {[
            { id: 'all', label: `Tất cả loài (${SPECIES_TREND_DETAILS.length})` },
            { id: 'underwater', label: '🌊 Dưới nước / Biển' },
            { id: 'aerial', label: '🦅 Trên không' },
            { id: 'terrestrial', label: '🌳 Trên cạn' },
            { id: 'amphibian', label: '🐸 Lưỡng cư' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedRealm(tab.id as any)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedRealm === tab.id
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Danh sách các thẻ loài chi tiết */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
          {filteredSpecies.map((sp) => {
            const isIncrease = sp.trendType === 'increase_strong' || sp.trendType === 'increase_stable' || sp.trendType === 'recovered_high';
            const isTemporaryDrop = sp.trendType === 'decrease_temporary';

            return (
              <div
                key={sp.id}
                onClick={() =>
                  onOpenDetail?.({
                    title: `${sp.name} (${sp.scientificName})`,
                    category: `Xu hướng 2023 - 2026: ${sp.trendLabel}`,
                    description: `Biến động: +${sp.percentageChange}% • Phân bố: ${sp.region}`,
                    details: [
                      `Tên khoa học: ${sp.scientificName}`,
                      `Phân hệ sinh thái: ${sp.realmLabel}`,
                      `Tình trạng IUCN / Sách Đỏ: ${sp.iucnStatus}`,
                      `Hiện trạng năm 2023: ${sp.val2023}`,
                      `Hiện trạng năm 2026: ${sp.val2026}`,
                      `Đánh giá tổng quan: ${sp.statusText}`,
                      `Nguyên nhân biến động: ${sp.cause}`,
                      `Giải pháp can thiệp: ${sp.protectiveSolution}`,
                    ],
                    tips: [
                      'Tuân thủ bảo vệ môi trường tự nhiên, không vứt rác thải nhựa tại các khu bảo tồn.',
                      'Báo ngay cho lực lượng chức năng khi phát hiện vi phạm khai thác trái phép.',
                    ],
                  })
                }
                className="p-3 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200/90 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between gap-2 text-left group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 transition-colors">
                        {sp.name}
                      </span>
                      <span className="text-[10px] italic text-slate-500 dark:text-slate-400">
                        ({sp.scientificName})
                      </span>
                    </div>
                    <span className="text-[10.5px] text-slate-500 dark:text-slate-400 block mt-0.5 line-clamp-1">
                      {sp.realmLabel} • {sp.region}
                    </span>
                  </div>

                  <span
                    className={`text-[9.5px] font-black px-2 py-0.5 rounded-full shrink-0 flex items-center gap-0.5 ${
                      isTemporaryDrop
                        ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                        : sp.trendType === 'increase_strong' || sp.trendType === 'recovered_high'
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                        : 'bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800'
                    }`}
                  >
                    {isTemporaryDrop ? (
                      <ArrowDownRight className="w-3 h-3 mr-0.5" />
                    ) : (
                      <ArrowUpRight className="w-3 h-3 mr-0.5" />
                    )}
                    {sp.trendLabel} (+{sp.percentageChange}%)
                  </span>
                </div>

                {/* So sánh 2023 vs 2026 */}
                <div className="grid grid-cols-2 gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-[11px]">
                  <div>
                    <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block">Năm 2023</span>
                    <span className="text-slate-700 dark:text-slate-300 font-medium line-clamp-1">{sp.val2023}</span>
                  </div>
                  <div className="border-l border-slate-200 dark:border-slate-700 pl-2">
                    <span className="text-[9.5px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Năm 2026</span>
                    <span className="text-slate-900 dark:text-slate-100 font-bold line-clamp-1">{sp.val2026}</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  <span className="font-semibold text-slate-700 dark:text-slate-200">Nguyên nhân: </span>
                  {sp.cause}
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800 text-[10.5px]">
                  <span className="text-slate-400 font-mono">{sp.iucnStatus}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    Xem phân tích hồ sơ &rarr;
                  </span>
                </div>
              </div>
            );
          })}

          {filteredSpecies.length === 0 && (
            <div className="col-span-full p-6 text-center text-xs text-slate-400">
              Không tìm thấy loài nào khớp với từ khóa "{trendSearch}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
