import React from 'react';
import { Sun, Droplets, SunMedium, Mountain, AlertTriangle, ArrowRight, Sparkles } from 'lucide-react';
import { DistrictData, ModalContent, UserLocation } from '../types';

interface WeatherTabProps {
  data: DistrictData;
  userLocation?: UserLocation | null;
  onOpenDetail: (content: ModalContent) => void;
}

export const WeatherTab: React.FC<WeatherTabProps> = ({ data, userLocation, onOpenDetail }) => {
  const displayAltitude =
    userLocation?.altitude !== null && userLocation?.altitude !== undefined
      ? `${userLocation.altitude} m`
      : data.weather.altitude;

  return (
    <div className="flex flex-col gap-5 px-5 pb-6">
      {/* Weather Highlight Banner */}
      <div
        id="weather-banner-card"
        onClick={() =>
          onOpenDetail({
            title: 'Chi tiết Thời tiết Hôm nay',
            category: 'Thời tiết',
            description: `${data.weather.description} tại ${data.name}.`,
            details: [
              `Nhiệt độ hiện tại: ${data.weather.temp}`,
              `Tình trạng mây & nắng: ${data.weather.condition}`,
              `Độ ẩm không khí: ${data.weather.humidity}`,
              `Độ cao quan trắc: ${displayAltitude} (so với mực nước biển)`,
              `Chỉ số bức xạ tia UV: ${data.weather.uvIndex} (${data.weather.uvLevel})`,
              `Cường độ bức xạ ánh sáng: ${data.weather.lightIntensity}`,
              'Tốc độ gió: Đông Nam 9 - 14 km/h',
              'Khả năng mưa trong ngày: 15% (rải rác chiều tối)',
            ],
            tips: [
              'Thời tiết thích hợp cho các hoạt động di chuyển và sinh hoạt ngoài trời.',
              'Trang bị mũ nón và kem chống nắng khi hoạt động ngoài trời từ 11:00 đến 14:00.',
            ],
          })
        }
        className="bg-[#EBF5FF] dark:bg-[#1E3A8A]/30 rounded-[24px] p-6 flex items-center justify-between shadow-xs transition-all active:scale-[0.99] cursor-pointer hover:bg-[#e4f0fc] dark:hover:bg-[#1E3A8A]/40 border border-transparent dark:border-blue-800/40"
      >
        <div className="flex flex-col">
          <span className="text-[15px] font-semibold text-[#1E40AF] dark:text-blue-300 tracking-tight">
            Thời tiết hôm nay
          </span>
          <span className="text-[26px] font-extrabold text-[#0F3B73] dark:text-blue-100 mt-1 tracking-tight leading-tight">
            {data.weather.temp}, {data.weather.condition}
          </span>
        </div>
        <div className="w-14 h-14 rounded-full flex items-center justify-center text-[#1D4ED8] dark:text-blue-300 bg-white/60 dark:bg-white/10 shadow-xs">
          <Sun className="w-9 h-9 stroke-[2]" />
        </div>
      </div>

      {/* Thông số thời tiết & vị trí người dùng: Độ ẩm, Độ cao, Tia UV / Ánh sáng */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-[19px] font-extrabold text-[#0F172A] dark:text-slate-100 tracking-tight">
            Thông số thời tiết & vị trí
          </h2>
          <span className="text-xs font-semibold text-[#1E40AF] dark:text-blue-300 bg-[#DBEAFE] dark:bg-blue-900/40 px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-transparent dark:border-blue-800">
            <Sparkles className="w-3 h-3 text-[#2563EB] dark:text-blue-400" />
            Cảm biến thực tế
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {/* 1. Độ ẩm */}
          <button
            type="button"
            id="weather-humidity-btn"
            onClick={() =>
              onOpenDetail({
                title: 'Độ ẩm Không khí',
                category: 'Thời tiết',
                description: `Độ ẩm tương đối hiện tại: ${data.weather.humidity} tại ${data.name}.`,
                details: [
                  `Độ ẩm đo được: ${data.weather.humidity}`,
                  'Điểm sương (Dew Point): 24.2°C',
                  'Đánh giá cảm giác thoải mái: Độ ẩm lý tưởng, cơ thể bài tiết mồ hôi tự nhiên tốt.',
                  'Khả năng ngưng tụ hơi ẩm: Thấp, tầm nhìn xa quang đãng trên 10 km.',
                  'Tần suất cập nhật cảm biến ẩm kế: 15 phút/lần.',
                ],
                tips: [
                  'Duy trì uống đủ nước (1.5 - 2 lít/ngày) trong điều kiện độ ẩm này.',
                  'Môi trường thích hợp bảo quản thiết bị điện tử và tài liệu giấy.',
                ],
              })
            }
            className="bg-[#F5F4F0] dark:bg-[#1E293B] hover:bg-[#ECEBE6] dark:hover:bg-[#334155]/70 border border-transparent dark:border-slate-700 active:scale-95 transition-all rounded-[18px] py-4 px-2.5 flex flex-col items-center justify-center gap-1.5 text-center cursor-pointer shadow-2xs"
          >
            <div className="w-8 h-8 flex items-center justify-center text-[#0284C7] dark:text-sky-400">
              <Droplets className="w-7 h-7 stroke-[2]" />
            </div>
            <span className="text-[13px] font-bold text-[#334155] dark:text-slate-200">
              Độ ẩm
            </span>
            <span className="text-[17px] font-black text-[#0F3B73] dark:text-blue-200 tracking-tight">
              {data.weather.humidity}
            </span>
            <span className="text-[11px] font-medium text-[#64748B] dark:text-slate-400">
              Tương đối
            </span>
          </button>

          {/* 2. Độ cao người dùng */}
          <button
            type="button"
            id="weather-altitude-btn"
            onClick={() =>
              onOpenDetail({
                title: 'Độ cao Vị trí Người dùng',
                category: 'Định vị & Địa hình',
                description: `Độ cao hiện tại: ${displayAltitude} so với mực nước biển chuẩn (MSL).`,
                details: [
                  `Độ cao đo được: ${displayAltitude}`,
                  `Nguồn dữ liệu: ${userLocation?.altitude ? 'Cảm biến GPS / Khí áp kế người dùng' : 'Mô hình số hóa độ cao địa hình khu vực (DEM)'}`,
                  'Mức chênh lệch thủy triều sông: +1.2 m vào giờ đỉnh triều',
                  'Áp suất khí quyển tương ứng: 1011.8 hPa (Bình thường)',
                  'Đặc điểm địa hình: Đồng bằng phù sa trũng ven sông, địa thế bằng phẳng.',
                ],
                tips: [
                  'Khu vực cao ráo, không thuộc vùng trũng ngập úng khi mưa vừa.',
                  'Có thể bật định vị GPS có cảm biến áp suất để đo độ cao tầng lầu chính xác hơn.',
                ],
              })
            }
            className="bg-[#F5F4F0] dark:bg-[#1E293B] hover:bg-[#ECEBE6] dark:hover:bg-[#334155]/70 border border-transparent dark:border-slate-700 active:scale-95 transition-all rounded-[18px] py-4 px-2.5 flex flex-col items-center justify-center gap-1.5 text-center cursor-pointer shadow-2xs"
          >
            <div className="w-8 h-8 flex items-center justify-center text-[#0D9488] dark:text-teal-400">
              <Mountain className="w-7 h-7 stroke-[2]" />
            </div>
            <span className="text-[13px] font-bold text-[#334155] dark:text-slate-200">
              Độ cao
            </span>
            <span className="text-[17px] font-black text-[#0F3B73] dark:text-blue-200 tracking-tight">
              {displayAltitude}
            </span>
            <span className="text-[11px] font-medium text-[#64748B] dark:text-slate-400">
              Mực nước biển
            </span>
          </button>

          {/* 3. Tia UV & Ánh sáng */}
          <button
            type="button"
            id="weather-uv-btn"
            onClick={() =>
              onOpenDetail({
                title: 'Chỉ số Ánh sáng & Tia UV',
                category: 'Bức xạ mặt trời',
                description: `Chỉ số bức xạ: ${data.weather.uvIndex} (${data.weather.uvLevel}) - Cường độ: ${data.weather.lightIntensity}.`,
                details: [
                  `Chỉ số UV đo được: ${data.weather.uvIndex}`,
                  `Mức độ cảnh báo: ${data.weather.uvLevel}`,
                  `Cường độ bức xạ nhiệt mặt trời: ${data.weather.lightIntensity}`,
                  'Khung giờ UV đạt đỉnh trong ngày: 11:30 - 13:30',
                  'Thời gian an toàn tiếp xúc trực tiếp không bảo vệ: 30 - 45 phút',
                ],
                tips: [
                  'Nên đeo kính râm có khả năng chống tia UV400 khi ra ngoài trời.',
                  'Bôi kem chống nắng SPF 30+ trở lên và mặc áo dài tay thoáng khí.',
                ],
              })
            }
            className="bg-[#F5F4F0] dark:bg-[#1E293B] hover:bg-[#ECEBE6] dark:hover:bg-[#334155]/70 border border-transparent dark:border-slate-700 active:scale-95 transition-all rounded-[18px] py-4 px-2.5 flex flex-col items-center justify-center gap-1.5 text-center cursor-pointer shadow-2xs"
          >
            <div className="w-8 h-8 flex items-center justify-center text-[#EA580C] dark:text-amber-400">
              <SunMedium className="w-7 h-7 stroke-[2]" />
            </div>
            <span className="text-[13px] font-bold text-[#334155] dark:text-slate-200">
              Tia UV
            </span>
            <span className="text-[17px] font-black text-[#0F3B73] dark:text-blue-200 tracking-tight">
              {data.weather.uvIndex}
            </span>
            <span className="text-[11px] font-medium text-[#64748B] dark:text-slate-400">
              {data.weather.uvLevel}
            </span>
          </button>
        </div>
      </section>

      {/* Cảnh báo biến cố */}
      <section className="flex flex-col gap-3">
        <h2 className="text-[19px] font-extrabold text-[#0F172A] dark:text-slate-100 tracking-tight">
          Cảnh báo biến cố
        </h2>

        <div
          id="weather-alert-card"
          onClick={() =>
            onOpenDetail({
              title: data.alerts.weatherAlert.title,
              category: 'Cảnh báo thời tiết',
              description: data.alerts.weatherAlert.desc,
              details: [
                `Cấp độ cảnh báo: ${data.alerts.weatherAlert.level === 'warning' ? 'Mức Cảnh Báo Vàng' : 'Thông Tin Thường Nhật'}`,
                'Nguồn dữ liệu: Trạm quan trắc tự động không khí & thời tiết',
                'Nguyên nhân: Mật độ phương tiện lưu thông cao giờ cao điểm kết hợp hiện tượng nghịch nhiệt nhẹ',
                'Nồng độ bụi PM2.5 trung bình: 46 µg/m³',
              ],
              tips: [
                data.alerts.weatherAlert.actionAdvice,
                'Đóng kín cửa sổ hướng đường lớn khi lưu lượng xe đông đúc.',
                'Sử dụng máy lọc không khí hoặc trồng các loại cây như trầu bà, lưỡi hổ trong nhà.',
              ],
            })
          }
          className="bg-[#FDF2E4] dark:bg-amber-950/40 hover:bg-[#FAEBDA] dark:hover:bg-amber-950/60 active:scale-[0.99] transition-all rounded-[20px] p-4.5 flex items-start gap-3.5 cursor-pointer shadow-2xs border border-[#FDE68A]/40 dark:border-amber-800/40"
        >
          <div className="mt-0.5 text-[#9A5B13] dark:text-amber-400 shrink-0 p-1 bg-[#FDF2E4] dark:bg-amber-900/40 rounded-lg">
            <AlertTriangle className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div className="flex-1">
            <h3 className="text-[16px] font-bold text-[#78350F] dark:text-amber-200 leading-snug">
              {data.alerts.weatherAlert.title}
            </h3>
            <p className="text-[14px] text-[#92400E] dark:text-amber-300/90 mt-0.5 leading-snug">
              {data.alerts.weatherAlert.desc}
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-[#B45309] dark:text-amber-400 mt-1 shrink-0 opacity-60" />
        </div>
      </section>
    </div>
  );
};
