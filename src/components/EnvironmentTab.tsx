import React from 'react';
import { Waves, Footprints, Feather, Droplet, AlertTriangle, ShieldCheck, Ambulance, ChevronRight, SunMedium, Mountain } from 'lucide-react';
import { DistrictData, ModalContent } from '../types';

interface EnvironmentTabProps {
  data: DistrictData;
  onOpenDetail: (content: ModalContent) => void;
}

export const EnvironmentTab: React.FC<EnvironmentTabProps> = ({ data, onOpenDetail }) => {
  return (
    <div className="flex flex-col gap-5 px-5 pb-6">
      {/* Đánh giá thời tiết card */}
      <div
        id="env-weather-eval-card"
        onClick={() =>
          onOpenDetail({
            title: 'Đánh giá Thời tiết Khu vực',
            category: 'Tổng quan môi trường',
            description: `${data.weather.statusDetail} tại ${data.name}.`,
            details: [
              'Nền nhiệt độ tương đối ổn định giữa các khung giờ trong ngày.',
              'Mức độ dao động áp suất khí quyển: < 1.5 hPa (rất an toàn).',
              'Độ ẩm không khí duy trì 65 - 72%, không gây sốc nhiệt.',
              'Khả năng xuất hiện dông lốc bất thường: Rất thấp (dưới 5%).',
            ],
            tips: [
              'Thích hợp duy trì mọi hoạt động sinh hoạt, học tập và sản xuất.',
              'Theo dõi định kỳ trạm đo vi khí hậu trước 17:00 hàng ngày.',
            ],
          })
        }
        className="bg-[#EBF5FF] dark:bg-[#1E3A8A]/30 rounded-[24px] p-6 shadow-xs transition-all active:scale-[0.99] cursor-pointer hover:bg-[#e4f0fc] dark:hover:bg-[#1E3A8A]/40 border border-transparent dark:border-blue-800/40"
      >
        <span className="text-[15px] font-semibold text-[#1E40AF] dark:text-blue-300 tracking-tight block">
          {data.weather.statusAssessment}
        </span>
        <span className="text-[26px] font-extrabold text-[#0F3B73] dark:text-blue-100 mt-1 tracking-tight leading-tight block">
          {data.weather.statusDetail}
        </span>
      </div>

      {/* Chỉ số môi trường (Nước, Ánh sáng, Địa chất) */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-[19px] font-extrabold text-[#0F172A] dark:text-slate-100 tracking-tight">
            Chỉ số môi trường
          </h2>
          <span className="text-xs font-semibold text-[#0284C7] dark:text-sky-300 bg-[#E0F2FE] dark:bg-sky-950/60 border border-transparent dark:border-sky-800 px-2 py-0.5 rounded-md">
            Quan trắc tự động
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {/* Nước */}
          <button
            type="button"
            id="env-water-btn"
            onClick={() =>
              onOpenDetail({
                title: 'Chỉ số Chất lượng Nguồn nước',
                category: 'Chỉ số môi trường',
                description: `${data.environmentIndexes.water.value} - Đánh giá: ${data.environmentIndexes.water.quality}`,
                details: [
                  data.environmentIndexes.water.note,
                  'Chỉ số WQI (Water Quality Index): 72/100 (Thang điểm Tốt).',
                  'Độ mặn tại trạm đo sông Sài Gòn: 0.12 g/L (An toàn tuyệt đối cho xử lý nước sinh hoạt).',
                  'Hàm lượng kim loại nặng (Chì, Thủy ngân): Không phát hiện vượt ngưỡng.',
                  'Tần suất kiểm định tự động: 30 phút/lần.',
                ],
                tips: [
                  'Tiết kiệm nguồn nước sạch trong sinh hoạt gia đình.',
                  'Báo cáo ngay sự cố rò rỉ hóa chất hoặc nước thải đen cho cơ quan quản lý.',
                ],
              })
            }
            className="bg-[#F5F4F0] dark:bg-[#1E293B] hover:bg-[#ECEBE6] dark:hover:bg-[#334155]/70 border border-transparent dark:border-slate-700 active:scale-95 transition-all rounded-[18px] py-4.5 px-3 flex flex-col items-center justify-center gap-2 text-center cursor-pointer shadow-2xs"
          >
            <div className="w-8 h-8 flex items-center justify-center text-[#0284C7] dark:text-sky-400">
              <Droplet className="w-7 h-7 stroke-[2]" />
            </div>
            <span className="text-[14px] font-bold text-[#334155] dark:text-slate-200">
              Nước
            </span>
            <span className="text-[11px] font-semibold text-[#0284C7] dark:text-sky-300 bg-[#E0F2FE] dark:bg-sky-950/70 border border-transparent dark:border-sky-800 px-2 py-0.5 rounded-full">
              {data.environmentIndexes.water.quality}
            </span>
          </button>

          {/* Ánh sáng */}
          <button
            type="button"
            id="env-light-btn"
            onClick={() =>
              onOpenDetail({
                title: 'Chỉ số Bức xạ Ánh sáng & Tia UV',
                category: 'Chỉ số môi trường',
                description: `${data.environmentIndexes.light.value} - Đánh giá: ${data.environmentIndexes.light.quality}`,
                details: [
                  data.environmentIndexes.light.note,
                  'Cường độ bức xạ mặt trời đo tại bề mặt: 680 W/m².',
                  'Chỉ số UV cao nhất ban ngày: 5.4 vào lúc 12:15 trưa.',
                  'Mức độ tán xạ ánh sáng đô thị: Bình thường, không có sương mù quang hóa.',
                ],
                tips: [
                  'Sử dụng kem chống nắng SPF 30+ khi hoạt động liên tục ngoài trời hơn 30 phút.',
                  'Tận dụng ánh sáng tự nhiên tại văn phòng và nhà ở để giảm tiêu thụ điện lưới.',
                ],
              })
            }
            className="bg-[#F5F4F0] dark:bg-[#1E293B] hover:bg-[#ECEBE6] dark:hover:bg-[#334155]/70 border border-transparent dark:border-slate-700 active:scale-95 transition-all rounded-[18px] py-4.5 px-3 flex flex-col items-center justify-center gap-2 text-center cursor-pointer shadow-2xs"
          >
            <div className="w-8 h-8 flex items-center justify-center text-[#EA580C] dark:text-amber-400">
              <SunMedium className="w-7 h-7 stroke-[2]" />
            </div>
            <span className="text-[14px] font-bold text-[#334155] dark:text-slate-200">
              Ánh sáng
            </span>
            <span className="text-[11px] font-semibold text-[#EA580C] dark:text-amber-300 bg-[#FFEDD5] dark:bg-amber-950/70 border border-transparent dark:border-amber-800 px-2 py-0.5 rounded-full">
              {data.environmentIndexes.light.quality}
            </span>
          </button>

          {/* Địa chất */}
          <button
            type="button"
            id="env-geology-btn"
            onClick={() =>
              onOpenDetail({
                title: 'Chỉ số Nền Địa chất Đô thị',
                category: 'Chỉ số môi trường',
                description: `${data.environmentIndexes.geology.value} - Đánh giá: ${data.environmentIndexes.geology.quality}`,
                details: [
                  data.environmentIndexes.geology.note,
                  'Tầng địa chất móng công trình: Lớp sét dẻo cứng chịu tải trọng cao.',
                  'Tốc độ sụt lún trung bình tích lũy: Dưới 3.2 mm/năm (ổn định).',
                  'Số lượng mốc trắc địa vệ tinh GNSS theo dõi liên tục: 12 trạm.',
                ],
                tips: [
                  'Tuân thủ quy định khảo sát địa chất khi xây dựng công trình ngầm.',
                  'Bảo tồn mạch nước ngầm tầng sâu, hạn chế khoan giếng tùy tiện.',
                ],
              })
            }
            className="bg-[#F5F4F0] dark:bg-[#1E293B] hover:bg-[#ECEBE6] dark:hover:bg-[#334155]/70 border border-transparent dark:border-slate-700 active:scale-95 transition-all rounded-[18px] py-4.5 px-3 flex flex-col items-center justify-center gap-2 text-center cursor-pointer shadow-2xs"
          >
            <div className="w-8 h-8 flex items-center justify-center text-[#0D9488] dark:text-teal-400">
              <Mountain className="w-7 h-7 stroke-[2]" />
            </div>
            <span className="text-[14px] font-bold text-[#334155] dark:text-slate-200">
              Địa chất
            </span>
            <span className="text-[11px] font-semibold text-[#0D9488] dark:text-teal-300 bg-[#CCFBF1] dark:bg-teal-950/70 border border-transparent dark:border-teal-800 px-2 py-0.5 rounded-full">
              {data.environmentIndexes.geology.quality}
            </span>
          </button>
        </div>
      </section>

      {/* Quần xã sinh vật */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-[19px] font-extrabold text-[#0F172A] dark:text-slate-100 tracking-tight">
            Quần xã sinh vật
          </h2>
          <span className="text-xs font-semibold text-[#64748B] dark:text-slate-400 bg-[#F1F5F9] dark:bg-slate-800 px-2 py-0.5 rounded-md">
            Hệ sinh thái đô thị
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2.5">
          {/* Dưới nước */}
          <button
            type="button"
            id="bio-underwater-btn"
            onClick={() =>
              onOpenDetail({
                title: 'Quần xã Sinh vật Dưới nước',
                category: 'Hệ sinh thái',
                description: `Tình trạng: ${data.biodiversity.underwater.status}. Đã ghi nhận ${data.biodiversity.underwater.count} loài chính.`,
                details: [
                  'Khu vực phân bố: Sông Sài Gòn, Kênh Tàu Hủ - Bến Nghé, Rạch Thị Nghè.',
                  ...data.biodiversity.underwater.highlights,
                  'Chỉ số sinh học đáy benthos: Phục hồi 65% so với năm 2022.',
                  'Hệ thống sục khí kênh Nhiêu Lộc giúp duy trì oxy hòa tan cho đàn cá sinh sản.',
                ],
                tips: [
                  'Nghiêm cấm hành vi chích điện hoặc đánh bắt cá bằng lưới mắt nhỏ trên kênh rạch nội đô.',
                  'Không xả rác thải nhựa hoặc thức ăn thừa xuống dòng kênh.',
                ],
              })
            }
            className="bg-[#F5F4F0] dark:bg-[#1E293B] hover:bg-[#ECEBE6] dark:hover:bg-[#334155]/70 border border-transparent dark:border-slate-700 active:scale-95 transition-all rounded-[18px] py-4 px-2 flex flex-col items-center justify-center gap-2.5 text-center cursor-pointer shadow-2xs"
          >
            <div className="w-8 h-8 flex items-center justify-center text-[#475569] dark:text-slate-300">
              <Waves className="w-7 h-7 stroke-[2]" />
            </div>
            <span className="text-[13px] font-semibold text-[#334155] dark:text-slate-200 leading-tight">
              Dưới nước
            </span>
          </button>

          {/* Trên cạn */}
          <button
            type="button"
            id="bio-terrestrial-btn"
            onClick={() =>
              onOpenDetail({
                title: 'Quần xã Sinh vật Trên cạn',
                category: 'Hệ sinh thái',
                description: `Tình trạng: ${data.biodiversity.terrestrial.status}. Đã thống kê ${data.biodiversity.terrestrial.count} loài thực vật và động vật.`,
                details: [
                  'Khu bảo tồn trọng điểm: Thảo Cầm Viên Sài Gòn, Công viên Tao Đàn, 23 Tháng 9.',
                  ...data.biodiversity.terrestrial.highlights,
                  'Độ che phủ tán cây: Đạt mức 3.8m²/người dân nội thành.',
                  'Quần thể bò sát nhỏ, sóc cây, các loài bướm đặc trưng vùng nhiệt đới.',
                ],
                tips: [
                  'Bảo vệ cây xanh công cộng và tích cực trồng thêm cây cảnh thanh lọc không khí ban công.',
                ],
              })
            }
            className="bg-[#F5F4F0] dark:bg-[#1E293B] hover:bg-[#ECEBE6] dark:hover:bg-[#334155]/70 border border-transparent dark:border-slate-700 active:scale-95 transition-all rounded-[18px] py-4 px-2 flex flex-col items-center justify-center gap-2.5 text-center cursor-pointer shadow-2xs"
          >
            <div className="w-8 h-8 flex items-center justify-center text-[#475569] dark:text-slate-300">
              <Footprints className="w-7 h-7 stroke-[2]" />
            </div>
            <span className="text-[13px] font-semibold text-[#334155] dark:text-slate-200 leading-tight">
              Trên cạn
            </span>
          </button>

          {/* Trên trời */}
          <button
            type="button"
            id="bio-aerial-btn"
            onClick={() =>
              onOpenDetail({
                title: 'Quần xã Sinh vật Trên trời',
                category: 'Hệ sinh thái',
                description: `Tình trạng: ${data.biodiversity.aerial.status}. Đã xác định ${data.biodiversity.aerial.count} loài chim và côn trùng bay.`,
                details: [
                  'Quần thể chim sẻ đô thị, chim yến, bồ câu hoang dã, cò trắng ven sông.',
                  ...data.biodiversity.aerial.highlights,
                  'Tần suất xuất hiện di trú cao vào buổi sáng sớm (05:30 - 07:00).',
                  'Chỉ số an toàn không phận sinh thái: Tốt.',
                ],
                tips: [
                  'Không sử dụng bẫy lưới hoặc súng săn chim tự chế tại công viên.',
                  'Bố trí bồn nước sạch nhỏ ở sân thượng để chim trời có nơi uống nước mùa khô.',
                ],
              })
            }
            className="bg-[#F5F4F0] dark:bg-[#1E293B] hover:bg-[#ECEBE6] dark:hover:bg-[#334155]/70 border border-transparent dark:border-slate-700 active:scale-95 transition-all rounded-[18px] py-4 px-2 flex flex-col items-center justify-center gap-2.5 text-center cursor-pointer shadow-2xs"
          >
            <div className="w-8 h-8 flex items-center justify-center text-[#475569] dark:text-slate-300">
              <Feather className="w-7 h-7 stroke-[2]" />
            </div>
            <span className="text-[13px] font-semibold text-[#334155] dark:text-slate-200 leading-tight">
              Trên trời
            </span>
          </button>

          {/* Lưỡng cư */}
          <button
            type="button"
            id="bio-amphibian-btn"
            onClick={() =>
              onOpenDetail({
                title: 'Quần xã Sinh vật Lưỡng cư',
                category: 'Hệ sinh thái',
                description: `Tình trạng: ${data.biodiversity.amphibian.status}. Đã ghi nhận ${data.biodiversity.amphibian.count} loài sống tại vùng giáp ranh nước - cạn.`,
                details: [
                  'Khu vực sinh sống: Vùng đất ẩm bãi bồi, bờ kè sinh thái, hồ nước nhân tạo.',
                  ...data.biodiversity.amphibian.highlights,
                  'Vai trò sinh thái: Khống chế muỗi, lăng quăng và sâu bọ hại cây xanh.',
                ],
                tips: [
                  'Bảo tồn các thảm cỏ bán ngập ven rạch để duy trì nơi đẻ trứng tự nhiên của các loài lưỡng cư.',
                ],
              })
            }
            className="bg-[#F5F4F0] dark:bg-[#1E293B] hover:bg-[#ECEBE6] dark:hover:bg-[#334155]/70 border border-transparent dark:border-slate-700 active:scale-95 transition-all rounded-[18px] py-4 px-2 flex flex-col items-center justify-center gap-2.5 text-center cursor-pointer shadow-2xs"
          >
            <div className="w-8 h-8 flex items-center justify-center text-[#475569] dark:text-slate-300">
              <Droplet className="w-7 h-7 stroke-[2]" />
            </div>
            <span className="text-[13px] font-semibold text-[#334155] dark:text-slate-200 leading-tight">
              Lưỡng cư
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
          id="env-alert-card"
          onClick={() =>
            onOpenDetail({
              title: data.alerts.environmentAlert.title,
              category: 'Cảnh báo thủy triều & ngập',
              description: data.alerts.environmentAlert.desc,
              details: [
                'Độ cao mực nước đo tại trạm Phú An: 1.48m (dưới báo động 2).',
                'Khung giờ triều đỉnh: 17:15 - 19:30 chiều tối nay.',
                'Các tuyến đường có nguy cơ đọng nước cục bộ: Bến Vân Đồn, Tôn Thất Thuyết, Calmette.',
                'Hệ thống cống ngăn triều Bến Nghé đang trong trạng thái sẵn sàng hạ cửa van đóng khi mực nước vượt 1.50m.',
              ],
              tips: [
                data.alerts.environmentAlert.actionAdvice,
                'Người dân di chuyển bằng phương tiện gầm thấp nên chủ động chọn tuyến đường cao ráo hơn.',
                'Đội bơm di động công ty thoát nước đã ứng trực tại hiện trường.',
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
              {data.alerts.environmentAlert.title}
            </h3>
            <p className="text-[14px] text-[#92400E] dark:text-amber-300/90 mt-0.5 leading-snug">
              {data.alerts.environmentAlert.desc}
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-[#B45309] dark:text-amber-400 mt-1 shrink-0 opacity-60" />
        </div>
      </section>

      {/* Ứng phó */}
      <section className="flex flex-col gap-3">
        <h2 className="text-[19px] font-extrabold text-[#0F172A] dark:text-slate-100 tracking-tight">
          Ứng phó
        </h2>

        <div className="flex flex-col gap-2.5">
          {/* Phương thức bảo vệ */}
          <button
            type="button"
            id="response-protection-btn"
            onClick={() =>
              onOpenDetail({
                title: 'Phương thức bảo vệ sức khỏe & tài sản',
                category: 'Cẩm nang ứng phó',
                description: 'Quy trình phòng ngừa rủi ro khí hậu đô thị hoạt động ngoại tuyến không cần internet.',
                details: [
                  '1. Khi ngập lụt: Kê cao ổ điện, ngắt cầu dao tầng hầm/tầng 1, di chuyển xe máy lên vị trí cao.',
                  '2. Khi chỉ số không khí xấu: Đóng kín cửa sổ đón gió, bật điều hòa chế độ lọc ion hoặc máy lọc HEPA.',
                  '3. Khi nắng nóng gay gắt: Bổ sung nước điện giải, che chắn kính chắn nắng tại các cửa kính văn phòng.',
                  '4. Kiểm tra an toàn cây xanh gần nhà trước giông lốc.',
                ],
                tips: [
                  'Lưu cẩm nang này vào bộ nhớ điện thoại để tra cứu bất cứ khi nào mất sóng.',
                  'Túi sơ cấp cứu gia đình nên có sẵn bông băng, thuốc sát trùng và đèn pin sạc điện.',
                ],
              })
            }
            className="bg-[#F5F4F0] dark:bg-[#1E293B] hover:bg-[#ECEBE6] dark:hover:bg-[#334155]/70 border border-transparent dark:border-slate-700 active:scale-[0.99] transition-all rounded-[18px] px-5 py-4 flex items-center justify-between cursor-pointer shadow-2xs"
          >
            <div className="flex items-center gap-3.5">
              <ShieldCheck className="w-6 h-6 text-[#334155] dark:text-emerald-400 stroke-[2]" />
              <span className="text-[15px] font-semibold text-[#1E293B] dark:text-slate-200">
                Phương thức bảo vệ
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-[#94A3B8] dark:text-slate-400" />
          </button>

          {/* Cứu nạn cứu hộ */}
          <button
            type="button"
            id="response-rescue-btn"
            onClick={() =>
              onOpenDetail({
                title: 'Danh bạ Cứu nạn cứu hộ Khẩn cấp (Offline)',
                category: 'Cứu nạn cứu hộ',
                description: 'Hệ thống hotline và vị trí ứng trực cứu hộ khẩn cấp tại địa bàn TP.HCM.',
                details: [
                  '📞 Cứu nạn cứu hộ & Chữa cháy: 114 (Miễn cước, kết nối ngay cả khi hết tiền điện thoại)',
                  '📞 Cấp cứu Y tế Đô thị: 115',
                  '📞 Trực ban Cảnh sát phản ứng nhanh: 113',
                  '📞 Đội cứu nạn đường thủy Sông Sài Gòn: 028.3822.4567',
                  '📞 Tổng đài thoát nước & ngập úng TP.HCM: 028.3844.5980',
                ],
                tips: [
                  'Khi gọi 114: Giữ bình tĩnh, nói rõ số nhà/địa danh nhận diện, số lượng người gặp nạn và tình trạng hiện tại.',
                  'Dữ liệu danh bạ này đã được nén sẵn trong tệp APK cài đặt máy.',
                ],
              })
            }
            className="bg-[#F5F4F0] dark:bg-[#1E293B] hover:bg-[#ECEBE6] dark:hover:bg-[#334155]/70 border border-transparent dark:border-slate-700 active:scale-[0.99] transition-all rounded-[18px] px-5 py-4 flex items-center justify-between cursor-pointer shadow-2xs"
          >
            <div className="flex items-center gap-3.5">
              <Ambulance className="w-6 h-6 text-[#334155] dark:text-rose-400 stroke-[2]" />
              <span className="text-[15px] font-semibold text-[#1E293B] dark:text-slate-200">
                Cứu nạn cứu hộ
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-[#94A3B8] dark:text-slate-400" />
          </button>
        </div>
      </section>
    </div>
  );
};
