import React from 'react';
import { Trash2, Recycle, Truck, Lightbulb, Users, Megaphone, ChevronRight } from 'lucide-react';
import { DistrictData, ModalContent } from '../types';

interface ProtectionTabProps {
  data: DistrictData;
  onOpenDetail: (content: ModalContent) => void;
}

export const ProtectionTab: React.FC<ProtectionTabProps> = ({ data, onOpenDetail }) => {
  const protection = data.protection || {
    assessmentTitle: 'Đánh giá Công tác Bảo vệ Môi trường',
    assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
    wasteStatus: {
      pollution: 'Kiểm soát tốt',
      sorting: 'Đã triển khai phân loại tại nguồn',
      collection: 'Tần suất 2 lượt/ngày',
      wasteToFuel: 'Tái chế & thu hồi năng lượng',
    },
    communityEvents: {
      volunteering: `Chương trình Ngày Chủ Nhật Xanh tại ${data.name}`,
      campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu',
    },
  };

  return (
    <div className="flex flex-col gap-5 px-5 pb-6">
      {/* Đánh giá tổng quát (Màu xanh lá nhạt tươi mới) */}
      <div
        id="protection-eval-card"
        onClick={() =>
          onOpenDetail({
            title: 'Đánh giá Công tác Bảo vệ Môi trường',
            category: 'Tổng quan môi trường',
            description: `${protection.assessmentSubtitle} tại ${data.name}.`,
            details: [
              'Điểm đánh giá chỉ số môi trường đô thị (EPI cấp quận): 82/100.',
              'Tỷ lệ thu gom và xử lý chất thải rắn sinh hoạt đạt 100%.',
              'Mạng lưới giám sát vệ sinh môi trường bằng 45 camera AI thông minh.',
              'Khen thưởng các tổ dân phố có thành tích xuất sắc trong phong trào Vì Thành Phố Văn Minh Sạch Đẹp.',
            ],
            tips: [
              'Chung tay cùng khu phố giữ gìn vệ sinh chung, bỏ rác đúng giờ và đúng nơi quy định.',
            ],
          })
        }
        className="bg-[#EDF7ED] dark:bg-[#15803D]/20 hover:bg-[#e4f3e4] dark:hover:bg-[#15803D]/30 rounded-[24px] p-6 shadow-xs transition-all active:scale-[0.99] cursor-pointer border border-transparent dark:border-emerald-800/40"
      >
        <span className="text-[15px] font-semibold text-[#166534] dark:text-emerald-300 tracking-tight block">
          {protection.assessmentTitle}
        </span>
        <span className="text-[26px] font-extrabold text-[#14532D] dark:text-emerald-100 mt-1 tracking-tight leading-tight block">
          {protection.assessmentSubtitle}
        </span>
      </div>

      {/* Rác phân thải khu vực (Lưới 2x2) */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-[19px] font-extrabold text-[#0F172A] dark:text-slate-100 tracking-tight">
            Rác phân thải khu vực
          </h2>
          <span className="text-xs font-semibold text-[#15803D] dark:text-emerald-300 bg-[#DCFCE7] dark:bg-emerald-950/60 border border-transparent dark:border-emerald-800 px-2 py-0.5 rounded-md">
            Phân loại tại nguồn
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Ô nhiễm môi trường */}
          <button
            type="button"
            id="waste-pollution-btn"
            onClick={() =>
              onOpenDetail({
                title: 'Kiểm soát & Xử lý Ô nhiễm Môi trường',
                category: 'Quản lý rác thải',
                description: `Tình trạng: ${protection.wasteStatus.pollution}.`,
                details: [
                  'Đã xóa bỏ hoàn toàn các điểm đen rác thải tự phát trên địa bàn.',
                  'Hệ thống thu gom nước rỉ rác khép kín chống mùi hôi triệt để.',
                  'Đội phản ứng nhanh xử lý vi phạm xả rác trong vòng 15 phút từ lúc nhận tin báo.',
                ],
                tips: [
                  'Chụp ảnh hoặc gửi phản ánh trực tiếp tới Tổng đài 1022 khi phát hiện đổ trộm rác thải xây dựng.',
                ],
              })
            }
            className="bg-[#F5F4F0] dark:bg-[#1E293B] hover:bg-[#ECEBE6] dark:hover:bg-[#334155]/70 border border-transparent dark:border-slate-700 active:scale-95 transition-all rounded-[18px] p-4.5 flex flex-col items-start gap-3 cursor-pointer shadow-2xs text-left"
          >
            <div className="w-8 h-8 flex items-center justify-center text-[#475569] dark:text-slate-300">
              <Trash2 className="w-7 h-7 stroke-[2]" />
            </div>
            <span className="text-[14px] font-semibold text-[#334155] dark:text-slate-200 leading-snug">
              Ô nhiễm môi trường
            </span>
          </button>

          {/* Phân loại rác thải */}
          <button
            type="button"
            id="waste-sorting-btn"
            onClick={() =>
              onOpenDetail({
                title: 'Cẩm nang Phân loại Rác thải tại Nguồn',
                category: 'Quản lý rác thải',
                description: `Tiến độ: ${protection.wasteStatus.sorting}.`,
                details: [
                  '🟢 Rác hữu cơ dễ phân hủy: Thức ăn thừa, rau củ quả, bã trà, lá cây -> Cho vào túi/thùng xanh.',
                  '⚪ Rác có khả năng tái chế: Chai lọ nhựa, giấy báo, vỏ hộp sữa, lon kim loại -> Cho vào túi trắng/trong suốt.',
                  '⚫ Rác còn lại: Túi nilon bẩn, tã giấy, đồ gốm sứ vỡ -> Cho vào thùng xám.',
                ],
                tips: [
                  'Rửa sơ các hộp sữa hoặc chai nhựa trước khi phân loại để tránh mùi hôi và thu hút ruồi muỗi.',
                  'Pin cũ và thiết bị điện tử hỏng cần mang đến điểm thu hồi chất thải nguy hại của phường.',
                ],
              })
            }
            className="bg-[#F5F4F0] dark:bg-[#1E293B] hover:bg-[#ECEBE6] dark:hover:bg-[#334155]/70 border border-transparent dark:border-slate-700 active:scale-95 transition-all rounded-[18px] p-4.5 flex flex-col items-start gap-3 cursor-pointer shadow-2xs text-left"
          >
            <div className="w-8 h-8 flex items-center justify-center text-[#475569] dark:text-slate-300">
              <Recycle className="w-7 h-7 stroke-[2]" />
            </div>
            <span className="text-[14px] font-semibold text-[#334155] dark:text-slate-200 leading-snug">
              Phân loại rác thải
            </span>
          </button>

          {/* Thu gom rác thải */}
          <button
            type="button"
            id="waste-collection-btn"
            onClick={() =>
              onOpenDetail({
                title: 'Lịch trình & Phương tiện Thu gom Rác',
                category: 'Quản lý rác thải',
                description: `Tần suất: ${protection.wasteStatus.collection}.`,
                details: [
                  '100% phương tiện gom rác chuyển sang xe ép rác chuyên dùng đạt chuẩn Euro 5.',
                  'Thời gian xe gom đường chính: 21:00 - 04:30 sáng hàng ngày.',
                  'Thời gian gom trong các hẻm dân cư: Sáng 06:30 - 08:30 và Chiều 16:30 - 18:30.',
                ],
                tips: [
                  'Vui lòng chỉ đặt túi rác ra trước cửa nhà trước giờ thu gom tối đa 15 phút.',
                ],
              })
            }
            className="bg-[#F5F4F0] dark:bg-[#1E293B] hover:bg-[#ECEBE6] dark:hover:bg-[#334155]/70 border border-transparent dark:border-slate-700 active:scale-95 transition-all rounded-[18px] p-4.5 flex flex-col items-start gap-3 cursor-pointer shadow-2xs text-left"
          >
            <div className="w-8 h-8 flex items-center justify-center text-[#475569] dark:text-slate-300">
              <Truck className="w-7 h-7 stroke-[2]" />
            </div>
            <span className="text-[14px] font-semibold text-[#334155] dark:text-slate-200 leading-snug">
              Thu gom rác thải
            </span>
          </button>

          {/* Nhiên liệu từ rác */}
          <button
            type="button"
            id="waste-fuel-btn"
            onClick={() =>
              onOpenDetail({
                title: 'Công nghệ Chuyển hóa Nhiên liệu từ Rác (Waste to Energy)',
                category: 'Quản lý rác thải',
                description: `Hiệu quả: ${protection.wasteStatus.wasteToFuel}.`,
                details: [
                  'Nhà máy đốt rác phát điện công nghệ Đức tại khu liên hợp xử lý rác Tây Bắc.',
                  'Sản lượng điện hòa lưới ước tính: 40 MW/ngày đêm (đủ cấp điện sinh hoạt cho 100.000 hộ dân).',
                  'Thu hồi khí biogas sản xuất khí đốt công nghiệp CNG sạch.',
                ],
                tips: [
                  'Mỗi kg rác được phân loại đúng tại nguồn giúp tiết kiệm 0.2 kWh điện năng chuyển hóa.',
                ],
              })
            }
            className="bg-[#F5F4F0] dark:bg-[#1E293B] hover:bg-[#ECEBE6] dark:hover:bg-[#334155]/70 border border-transparent dark:border-slate-700 active:scale-95 transition-all rounded-[18px] p-4.5 flex flex-col items-start gap-3 cursor-pointer shadow-2xs text-left"
          >
            <div className="w-8 h-8 flex items-center justify-center text-[#475569] dark:text-slate-300">
              <Lightbulb className="w-7 h-7 stroke-[2]" />
            </div>
            <span className="text-[14px] font-semibold text-[#334155] dark:text-slate-200 leading-snug">
              Nhiên liệu từ rác
            </span>
          </button>
        </div>
      </section>

      {/* Cộng đồng */}
      <section className="flex flex-col gap-3">
        <h2 className="text-[19px] font-extrabold text-[#0F172A] dark:text-slate-100 tracking-tight">
          Cộng đồng
        </h2>

        <div className="flex flex-col gap-2.5">
          {/* Hoạt động tự nguyện */}
          <button
            type="button"
            id="community-volunteer-btn"
            onClick={() =>
              onOpenDetail({
                title: 'Hoạt động Tình nguyện Vì Môi trường',
                category: 'Cộng đồng xanh',
                description: protection.communityEvents.volunteering,
                details: [
                  'Chiến dịch Chủ Nhật Xanh: Diễn ra định kỳ vào sáng Chủ Nhật tuần thứ 2 và thứ 4 hàng tháng.',
                  'Địa điểm tập trung tuần này: Bến Bạch Đằng & Cầu Mống, Quận 1.',
                  'Hoạt động chính: Thu gom rác nổi ven sông, trồng hoa mảng xanh, phát túi vải tự hủy cho tiểu thương.',
                  'Đã có 1.840 lượt tình nguyện viên đăng ký tham gia.',
                ],
                tips: [
                  'Trang bị găng tay bảo hộ, nón tai bèo và bình nước cá nhân khi tham gia.',
                ],
              })
            }
            className="bg-[#F5F4F0] dark:bg-[#1E293B] hover:bg-[#ECEBE6] dark:hover:bg-[#334155]/70 border border-transparent dark:border-slate-700 active:scale-[0.99] transition-all rounded-[18px] px-5 py-4 flex items-center justify-between cursor-pointer shadow-2xs"
          >
            <div className="flex items-center gap-3.5">
              <Users className="w-6 h-6 text-[#334155] dark:text-emerald-400 stroke-[2]" />
              <span className="text-[15px] font-semibold text-[#1E293B] dark:text-slate-200">
                Hoạt động tự nguyện
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-[#94A3B8] dark:text-slate-400" />
          </button>

          {/* Tuyên truyền nâng cao ý thức */}
          <button
            type="button"
            id="community-campaign-btn"
            onClick={() =>
              onOpenDetail({
                title: 'Tuyên truyền & Giáo dục Môi trường Cộng đồng',
                category: 'Cộng đồng xanh',
                description: protection.communityEvents.campaign,
                details: [
                  'Cuộc thi "Gia Đình Không Rác Thải Nhựa" cấp thành phố.',
                  'Chuỗi hội thảo tương tác trực tiếp tại các trường THCS và THPT trên địa bàn.',
                  'Tặng cây sen đá và cây vạn lộc khi mang pin cũ và vỏ chai nhựa đến trụ sở UBND phường.',
                ],
                tips: [
                  'Mỗi cá nhân là một đại sứ môi trường lan tỏa lối sống xanh, bền vững.',
                ],
              })
            }
            className="bg-[#F5F4F0] dark:bg-[#1E293B] hover:bg-[#ECEBE6] dark:hover:bg-[#334155]/70 border border-transparent dark:border-slate-700 active:scale-[0.99] transition-all rounded-[18px] px-5 py-4 flex items-center justify-between cursor-pointer shadow-2xs"
          >
            <div className="flex items-center gap-3.5">
              <Megaphone className="w-6 h-6 text-[#334155] dark:text-amber-400 stroke-[2]" />
              <span className="text-[15px] font-semibold text-[#1E293B] dark:text-slate-200">
                Tuyên truyền nâng cao ý thức
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-[#94A3B8] dark:text-slate-400" />
          </button>
        </div>
      </section>
    </div>
  );
};
