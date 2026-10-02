import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  BarChart3,
  LineChart as LineChartIcon,
  ShieldCheck,
  Calendar,
  Waves,
  Feather,
  Footprints,
  Droplet,
  Compass,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  ComposedChart,
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
} from '../data/biodiversityTrendData';
import { ModalContent } from '../types';
import { useActiveTheme } from '../utils/theme';

interface BiodiversityTrendChartProps {
  onOpenDetail?: (content: ModalContent) => void;
  compactMode?: boolean;
}

type ChartViewType = 'lines' | 'bars' | 'species_protected';

export const BiodiversityTrendChart: React.FC<BiodiversityTrendChartProps> = ({
  onOpenDetail,
}) => {
  const theme = useActiveTheme();
  const isDark = theme === 'dark';
  const [chartView, setChartView] = useState<ChartViewType>('lines');
  const [selectedRealm, setSelectedRealm] = useState<'all' | 'underwater' | 'aerial' | 'terrestrial' | 'amphibian'>('all');
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const [trendSearch, setTrendSearch] = useState<string>('');

  // Lọc danh sách loài
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
        <div className="bg-white/95 dark:bg-slate-900/95 p-3.5 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 text-xs backdrop-blur-md max-w-xs">
          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-slate-200 dark:border-slate-800">
            <span className="font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              Năm {label}
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              {record?.speciesRecorded} loài định danh
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
                  {entry.value.toLocaleString()} {entry.unit || ''}
                </span>
              </div>
            ))}
          </div>

          {record && (
            <div className="pt-2 mt-1.5 border-t border-slate-100 dark:border-slate-800 space-y-1 text-[10.5px]">
              <div>
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">Mốc quan trắc: </span>
                <span className="text-slate-700 dark:text-slate-300">{record.milestone}</span>
              </div>
              <div className="text-slate-500 dark:text-slate-400 text-[10px]">
                <strong>Nguồn: </strong>{record.dataSource}
              </div>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 1. Tiêu đề khối & Nút chuyển đổi view */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-slate-50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-900 border border-emerald-500/20 dark:border-emerald-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-600/20">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                Biểu Đồ Kiểm Kê & Xu Hướng Sinh Vật (2023 – 2026)
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow-2xs">
                Dữ liệu kiểm kê thực địa
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed max-w-3xl">
              Thống kê số lượng loài đã được định danh chính thức, cá thể quý hiếm được cứu hộ và diện tích thảm xanh bảo tồn. Nguồn: Chi cục Kiểm lâm TP.HCM, BQL Khu DTSQ Cần Giờ & Vườn Quốc gia Côn Đảo.
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
            <span className="hidden sm:inline">Số loài định danh</span>
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
            <span className="hidden sm:inline">4 Phân hệ</span>
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

      {/* 2. Các thẻ chỉ số KPI Tổng kết số lượng loài định danh thực tế (Không dùng % giả) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {/* Tổng loài ghi nhận */}
        <div className="p-3 rounded-xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">Loài đã ghi nhận</span>
            <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              Định danh
            </span>
          </div>
          <div className="mt-1">
            <div className="text-lg font-black text-slate-900 dark:text-slate-100">1.586 <span className="text-xs font-normal text-slate-400">loài</span></div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">Ước tính: ~2.250 loài</span>
          </div>
        </div>

        {/* Dưới nước / Biển */}
        <div className="p-3 rounded-xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-sky-700 dark:text-sky-400 flex items-center gap-1">
              <Waves className="w-3 h-3" /> Thủy sinh
            </span>
            <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
              Ghi nhận
            </span>
          </div>
          <div className="mt-1">
            <div className="text-lg font-black text-slate-900 dark:text-slate-100">418 <span className="text-xs font-normal text-slate-400">loài</span></div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">2023: 360 loài</span>
          </div>
        </div>

        {/* Chim & Trên không */}
        <div className="p-3 rounded-xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1">
              <Feather className="w-3 h-3" /> Trên không
            </span>
            <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
              Ghi nhận
            </span>
          </div>
          <div className="mt-1">
            <div className="text-lg font-black text-slate-900 dark:text-slate-100">285 <span className="text-xs font-normal text-slate-400">loài</span></div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">2023: 245 loài</span>
          </div>
        </div>

        {/* Động thực vật Trên cạn */}
        <div className="p-3 rounded-xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
              <Footprints className="w-3 h-3" /> Trên cạn
            </span>
            <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              Ghi nhận
            </span>
          </div>
          <div className="mt-1">
            <div className="text-lg font-black text-slate-900 dark:text-slate-100">774 <span className="text-xs font-normal text-slate-400">loài</span></div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">2023: 720 loài</span>
          </div>
        </div>

        {/* Lưỡng cư & Bò sát */}
        <div className="p-3 rounded-xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-teal-700 dark:text-teal-400 flex items-center gap-1">
              <Droplet className="w-3 h-3" /> Lưỡng cư
            </span>
            <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
              Ghi nhận
            </span>
          </div>
          <div className="mt-1">
            <div className="text-lg font-black text-slate-900 dark:text-slate-100">109 <span className="text-xs font-normal text-slate-400">loài</span></div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">2023: 95 loài</span>
          </div>
        </div>

        {/* Rừng & Mảng xanh bảo tồn */}
        <div className="p-3 rounded-xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300">Rừng ngập mặn</span>
            <span className="text-[9.5px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              Kiểm kê GIS
            </span>
          </div>
          <div className="mt-1">
            <div className="text-lg font-black text-slate-900 dark:text-slate-100">38.900 <span className="text-xs font-normal text-slate-400">ha</span></div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">+1.100 ha trồng mới</span>
          </div>
        </div>
      </div>

      {/* 3. KHU VỰC HIỂN THỊ BIỂU ĐỒ RECHARTS THEO SỐ LOÀI THỰC TẾ */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-emerald-600" />
              {chartView === 'lines' && 'Biểu Đồ: Diễn Biến Số Loài Định Danh Chính Thức (2023 - 2026)'}
              {chartView === 'bars' && 'Biểu Đồ Cột: Số Loài Ghi Nhận Từng Phân Hệ Qua 4 Năm'}
              {chartView === 'species_protected' && 'Biểu Đồ Kết Hợp: Số Loài Định Danh & Cá Thể Nguy Cấp Được Cứu Hộ'}
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Đơn vị: Số lượng loài được lập danh lục khoa học (loài). Phân biệt rõ với số loài tiềm năng theo mô hình.
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 text-[11px]">Năm khảo sát:</span>
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
              <ComposedChart data={BIODIVERSITY_ANNUAL_TRENDS} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRecorded" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#334155' : '#E2E8F0'} />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: isDark ? '#94A3B8' : '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis domain={[1200, 1800]} tick={{ fontSize: 10, fill: isDark ? '#94A3B8' : '#64748B' }} unit=" loài" axisLine={false} tickLine={false} />
                <Tooltip content={<CustomChartTooltip />} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} iconType="circle" formatter={(value) => <span className="text-slate-600 dark:text-slate-300 font-medium">{value}</span>} />
                <ReferenceLine y={1500} stroke="#94A3B8" strokeDasharray="3 3" label={{ value: 'Mốc 1.500 loài kiểm kê (2025)', fill: isDark ? '#94A3B8' : '#64748B', fontSize: 10 }} />

                <Area type="monotone" dataKey="speciesRecorded" name="Tổng loài đã định danh (loài)" stroke="#059669" strokeWidth={3} fillOpacity={1} fill="url(#colorRecorded)" />
              </ComposedChart>
            </ResponsiveContainer>
          )}

          {chartView === 'bars' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={BIODIVERSITY_ANNUAL_TRENDS} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#334155' : '#E2E8F0'} />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: isDark ? '#94A3B8' : '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 900]} tick={{ fontSize: 10, fill: isDark ? '#94A3B8' : '#64748B' }} unit=" loài" axisLine={false} tickLine={false} />
                <Tooltip content={<CustomChartTooltip />} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} iconType="rect" formatter={(value) => <span className="text-slate-600 dark:text-slate-300 font-medium">{value}</span>} />

                <Bar dataKey="underwaterSpecies" name="🌊 Thủy sinh & Biển" fill="#0284C7" radius={[4, 4, 0, 0]} />
                <Bar dataKey="aerialSpecies" name="🦅 Trên không (Chim)" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="terrestrialSpecies" name="🌳 Trên cạn" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="amphibianSpecies" name="🐸 Lưỡng cư & Bò sát" fill="#14B8A6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}

          {chartView === 'species_protected' && (
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={BIODIVERSITY_ANNUAL_TRENDS} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#334155' : '#E2E8F0'} />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: isDark ? '#94A3B8' : '#64748B' }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" domain={[1300, 1700]} tick={{ fontSize: 10, fill: isDark ? '#94A3B8' : '#64748B' }} unit=" loài" axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" domain={[2500, 6000]} tick={{ fontSize: 10, fill: isDark ? '#94A3B8' : '#64748B' }} unit=" cá thể" axisLine={false} tickLine={false} />
                <Tooltip content={<CustomChartTooltip />} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} formatter={(value) => <span className="text-slate-600 dark:text-slate-300 font-medium">{value}</span>} />

                <Bar yAxisId="left" dataKey="speciesRecorded" name="Số loài định danh chính thức (loài)" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={36} />
                <Line yAxisId="right" type="monotone" dataKey="endangeredProtected" name="Cá thể Sách Đỏ cứu hộ & theo dõi" stroke="#EF4444" strokeWidth={3} dot={{ r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Thông tin sự kiện và mốc can thiệp của năm đang chọn */}
        <div className="mt-1 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
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
            <div className="text-[10px] text-slate-500 dark:text-slate-400 pt-0.5">
              <strong>Nguồn dữ liệu: </strong>{currentYearRecord.dataSource} | <strong>Phương pháp: </strong>{currentYearRecord.verificationMethod}
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              onOpenDetail?.({
                title: `Hồ sơ Kiểm kê Đa dạng Sinh học năm ${currentYearRecord.year}`,
                category: 'Báo cáo kiểm kê định kỳ',
                description: `Tổng số loài định danh chính thức: ${currentYearRecord.speciesRecorded} loài • Ước tính tiềm năng: ${currentYearRecord.speciesEstimated} loài`,
                details: [
                  `Sự kiện then chốt: ${currentYearRecord.milestone}`,
                  `Thủy sinh & Biển (loài định danh): ${currentYearRecord.underwaterSpecies} loài`,
                  `Chim & Động vật bay (loài định danh): ${currentYearRecord.aerialSpecies} loài`,
                  `Động thực vật trên cạn (loài định danh): ${currentYearRecord.terrestrialSpecies} loài`,
                  `Lưỡng cư & Bò sát (loài định danh): ${currentYearRecord.amphibianSpecies} loài`,
                  `Diện tích rừng ngập mặn Cần Giờ: ${currentYearRecord.mangroveForestHa.toLocaleString()} ha`,
                  `Số cá thể loài Sách Đỏ được cứu hộ & bảo vệ: ${currentYearRecord.endangeredProtected.toLocaleString()} cá thể`,
                  `Nguồn cơ sở dữ liệu: ${currentYearRecord.dataSource}`,
                  `Phương pháp kiểm chứng: ${currentYearRecord.verificationMethod}`,
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

      {/* 4. So sánh số loài kiểm kê theo 5 vùng sinh thái chiến lược */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-sky-600" />
              So Sánh Số Loài Định Danh Theo 5 Vùng Trọng Điểm (2023 - 2026)
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Phân định minh bạch giữa vùng có trạm kiểm kê thực địa chuyên dụng (Cần Giờ, Côn Đảo) và vùng áp dụng mô hình sinh thái tham khảo
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {ECO_ZONES_TREND_DATA.map((z) => (
            <div
              key={z.zoneId}
              onClick={() =>
                onOpenDetail?.({
                  title: `Hồ sơ Sinh thái: ${z.zoneName}`,
                  category: z.dataClassification,
                  description: `Số loài ghi nhận: ${z.speciesRecorded2026} loài • Quy mô: ${z.habitatAreaHa}`,
                  details: [
                    `Số loài định danh năm 2023: ${z.speciesRecorded2023} loài`,
                    `Số loài định danh năm 2026: ${z.speciesRecorded2026} loài`,
                    `Quy mô diện tích sinh cảnh: ${z.habitatAreaHa}`,
                    `Phân loại dữ liệu: ${z.dataClassification}`,
                    `Nguồn số liệu: ${z.dataSource}`,
                    `Phương pháp điều tra: ${z.surveyMethod}`,
                    `Đặc điểm then chốt: ${z.keyHighlight}`,
                  ],
                  tips: [
                    'Bảo vệ hành lang thoát lũ và giữ nguyên các bãi bồi tự nhiên.',
                    'Duy trì tuần tra liên ngành bảo vệ rạn san hô và nguồn lợi thủy sản.',
                  ],
                })
              }
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 hover:border-sky-500 transition-all cursor-pointer flex flex-col justify-between gap-2 text-left group"
            >
              <div>
                <div className="flex items-start justify-between gap-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-sky-600 transition-colors line-clamp-1">
                    {z.zoneName}
                  </span>
                </div>
                <span className="text-[9.5px] font-semibold text-sky-700 dark:text-sky-300 bg-sky-100/70 dark:bg-sky-950/70 px-1.5 py-0.5 rounded block mt-1 line-clamp-1">
                  {z.dataClassification}
                </span>

                <div className="flex items-center gap-2 mt-2 text-xs">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">2023: <strong>{z.speciesRecorded2023} loài</strong></span>
                  <span className="text-slate-300 dark:text-slate-600">&rarr;</span>
                  <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">2026: <strong>{z.speciesRecorded2026} loài</strong></span>
                </div>
              </div>

              <div className="pt-1.5 border-t border-slate-200/60 dark:border-slate-700/60 text-[10px] text-slate-500 dark:text-slate-400 space-y-0.5">
                <div><strong>Diện tích: </strong>{z.habitatAreaHa}</div>
                <div className="line-clamp-2 leading-tight">{z.keyHighlight}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. BẢNG CHI TIẾT CÁC LOÀI SINH VẬT CỤ THỂ: ĐẦY ĐỦ THÔNG TIN KHOA HỌC */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              Danh Lục Loài Sinh Vật Chỉ Thị Biến Động Sinh Thái
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Theo dõi biến động số lượng các loài chỉ thị chủ chốt giai đoạn 2023 - 2026 kèm cơ sở tham chiếu vùng
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

        {/* Ghi chú minh bạch phương pháp & tham chiếu vùng */}
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 flex items-start gap-2">
          <Info className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
          <span>
            <strong>Ghi chú cơ sở tham chiếu:</strong> Thông tin nguồn tài liệu và chuỗi thời gian được tổng hợp theo báo cáo chuyên đề và phân vùng sinh thái của các đơn vị quản lý bảo tồn, không phải phiếu điều tra độc lập riêng cho từng cá thể.
          </span>
        </div>

        {/* Danh sách các thẻ loài chi tiết */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
          {filteredSpecies.map((sp) => {
            const isTemporaryDrop = sp.trendType === 'decrease_temporary';

            return (
              <div
                key={sp.id}
                onClick={() =>
                  onOpenDetail?.({
                    title: `${sp.name} (${sp.scientificName})`,
                    category: `${sp.recordTypeLabel} • ${sp.trendLabel}`,
                    description: `Khu vực: ${sp.recordedLocation} • Thời gian: ${sp.recordedYear}`,
                    details: [
                      `Tên khoa học: ${sp.scientificName}`,
                      `Phân hệ sinh thái: ${sp.realmLabel}`,
                      `Phân loại dữ liệu: ${sp.recordTypeLabel}`,
                      `Tình trạng IUCN / Sách Đỏ: ${sp.iucnStatus}`,
                      `Khu vực / Sinh cảnh ghi nhận: ${sp.recordedLocation}`,
                      `Thời gian tham chiếu quan trắc: ${sp.recordedYear}`,
                      `Cơ sở tham chiếu theo vùng sinh thái: ${sp.source}`,
                      `Phương thức đối chiếu thông tin: ${sp.verificationMethod}`,
                      `Ghi nhận 2023: ${sp.val2023}`,
                      `Ghi nhận 2026: ${sp.val2026}`,
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
                className="p-3.5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200/90 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between gap-2.5 text-left group"
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
                        : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                    }`}
                  >
                    {isTemporaryDrop ? (
                      <ArrowDownRight className="w-3 h-3 mr-0.5" />
                    ) : (
                      <ArrowUpRight className="w-3 h-3 mr-0.5" />
                    )}
                    {sp.trendLabel}
                  </span>
                </div>

                {/* Phân loại & Nguồn dữ liệu */}
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 text-[10.5px] space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-emerald-700 dark:text-emerald-300 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-200/50 dark:border-emerald-800/50">
                      {sp.recordTypeLabel}
                    </span>
                    <span className="text-slate-400 font-mono">{sp.recordedYear}</span>
                  </div>
                  <div className="text-slate-600 dark:text-slate-300 text-[10px] line-clamp-1">
                    <strong>Cơ sở tham chiếu: </strong>{sp.source}
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 text-[10px] line-clamp-1">
                    <strong>Khu vực: </strong>{sp.recordedLocation}
                  </div>
                </div>

                {/* So sánh 2023 vs 2026 */}
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wider block">Ghi nhận 2023</span>
                    <span className="text-slate-700 dark:text-slate-300 font-medium line-clamp-1">{sp.val2023}</span>
                  </div>
                  <div className="border-l border-slate-200 dark:border-slate-700 pl-2">
                    <span className="text-[9.5px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Ghi nhận 2026</span>
                    <span className="text-slate-900 dark:text-slate-100 font-bold line-clamp-1">{sp.val2026}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800 text-[10px]">
                  <span className="text-slate-400 font-mono">{sp.iucnStatus}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    Hồ sơ khoa học &rarr;
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
