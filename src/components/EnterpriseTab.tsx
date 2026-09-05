import React from 'react';
import { Mountain, Droplet, Wind, Leaf, ChevronRight } from 'lucide-react';
import { DistrictData, ModalContent } from '../types';

interface EnterpriseTabProps {
  data: DistrictData;
  onOpenDetail: (content: ModalContent) => void;
}

export const EnterpriseTab: React.FC<EnterpriseTabProps> = ({ data, onOpenDetail }) => {
  return (
    <div className="flex flex-col gap-5 px-5 pb-6">
      {/* Đánh giá tổng quát (Màu tím oải hương mềm mại) */}
      <div
        id="enterprise-eval-card"
        onClick={() =>
          onOpenDetail({
            title: 'Đánh giá Cơ hội Phát triển Bền vững',
            category: 'Kinh tế & Doanh nghiệp',
            description: `${data.enterprise.assessmentSubtitle} tại ${data.name}.`,
            details: [
              'Chỉ số thuận lợi kinh doanh xanh (Green Index): 78/100.',
              'Cơ sở hạ tầng cấp điện, cấp nước sạch và xử lý nước thải tập trung hoàn thiện 99%.',
              'Chính sách ưu đãi: Giảm 20% phí thuê mặt bằng cho các mô hình kinh doanh tuần hoàn và đạt chứng chỉ ESG.',
              'Mạng lưới logistics nội đô bằng xe điện đang được mở rộng và thí điểm.',
            ],
            tips: [
              'Doanh nghiệp có thể đăng ký thẩm định tiêu chuẩn Xanh để hưởng hỗ trợ tín dụng ưu đãi từ Quỹ Bảo vệ Môi trường TP.HCM.',
            ],
          })
        }
        className="bg-[#F0EDFD] dark:bg-[#4338CA]/25 hover:bg-[#e9e5fc] dark:hover:bg-[#4338CA]/35 rounded-[24px] p-6 shadow-xs transition-all active:scale-[0.99] cursor-pointer border border-transparent dark:border-indigo-800/40"
      >
        <span className="text-[15px] font-semibold text-[#4C1D95] dark:text-indigo-300 tracking-tight block">
          {data.enterprise.assessmentTitle}
        </span>
        <span className="text-[25px] font-extrabold text-[#2E1065] dark:text-indigo-100 mt-1 tracking-tight leading-tight block">
          {data.enterprise.assessmentSubtitle}
        </span>
      </div>

      {/* Mức độ ảnh hưởng */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-[19px] font-extrabold text-[#0F172A] dark:text-slate-100 tracking-tight">
            Mức độ ảnh hưởng
          </h2>
          <span className="text-xs font-semibold text-[#4338CA] dark:text-indigo-300 bg-[#EEF2FF] dark:bg-indigo-950/60 border border-transparent dark:border-indigo-800 px-2 py-0.5 rounded-md">
            Chỉ số giám sát ESG
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {/* Ảnh hưởng địa chất */}
          <div
            id="impact-geology-card"
            onClick={() =>
              onOpenDetail({
                title: 'Chi tiết Ảnh hưởng Địa chất Công trình',
                category: 'Tác động môi trường',
                description: `Mức độ tác động hiện tại: ${data.enterprise.geologyImpact.levelText} (${data.enterprise.geologyImpact.percent}%).`,
                details: [
                  'Tải trọng công trình xây dựng tuân thủ quy hoạch 1/2000.',
                  'Khảo sát các mạch nước ngầm và độ dịch chuyển tầng sét sâu không ghi nhận biến dạng.',
                  'Mức độ rung lắc do máy móc công nghiệp nhẹ: Nằm trong giới hạn an toàn TCVN.',
                ],
                tips: [
                  'Kiểm tra định kỳ kết cấu móng và thoát sàn đối với kho bãi, xưởng lắp ráp.',
                ],
              })
            }
            className="bg-[#F5F4F0] dark:bg-[#1E293B] hover:bg-[#ECEBE6] dark:hover:bg-[#334155]/70 border border-transparent dark:border-slate-700 active:scale-[0.99] transition-all rounded-[20px] p-4.5 cursor-pointer shadow-2xs"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <Mountain className="w-5 h-5 text-[#475569] dark:text-slate-300 stroke-[2]" />
                <span className="text-[15px] font-semibold text-[#1E293B] dark:text-slate-200">
                  Ảnh hưởng địa chất
                </span>
              </div>
              <span className="text-[14px] font-medium text-[#64748B] dark:text-slate-400">
                {data.enterprise.geologyImpact.levelText}
              </span>
            </div>
            {/* Progress bar green */}
            <div className="w-full h-2 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700">
              <div
                className="h-full bg-[#65A30D] rounded-full transition-all duration-500"
                style={{ width: `${data.enterprise.geologyImpact.percent}%` }}
              />
            </div>
          </div>

          {/* Ảnh hưởng nguồn nước */}
          <div
            id="impact-water-card"
            onClick={() =>
              onOpenDetail({
                title: 'Chi tiết Ảnh hưởng Nguồn nước Thải Doanh Nghiệp',
                category: 'Tác động môi trường',
                description: `Mức độ tác động hiện tại: ${data.enterprise.waterImpact.levelText} (${data.enterprise.waterImpact.percent}%).`,
                details: [
                  '94% cơ sở kinh doanh F&B, giặt là, khách sạn đã lắp bể tách mỡ.',
                  'Lưu lượng nước xả thải trung bình: 1.200 m³/ngày đêm qua trạm xử lý nước thải tập trung.',
                  'Tỷ lệ mẫu kiểm tra định kỳ đạt quy chuẩn QCVN 14: 92.5%.',
                ],
                tips: [
                  'Không xả dầu mỡ thừa trực tiếp vào đường ống cống thoát nước chung của tòa nhà.',
                  'Bảo dưỡng và nạo vét bể tách dầu mỡ tối thiểu 1 lần/tháng.',
                ],
              })
            }
            className="bg-[#F5F4F0] dark:bg-[#1E293B] hover:bg-[#ECEBE6] dark:hover:bg-[#334155]/70 border border-transparent dark:border-slate-700 active:scale-[0.99] transition-all rounded-[20px] p-4.5 cursor-pointer shadow-2xs"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <Droplet className="w-5 h-5 text-[#475569] dark:text-slate-300 stroke-[2]" />
                <span className="text-[15px] font-semibold text-[#1E293B] dark:text-slate-200">
                  Ảnh hưởng nguồn nước
                </span>
              </div>
              <span className="text-[14px] font-medium text-[#64748B] dark:text-slate-400">
                {data.enterprise.waterImpact.levelText}
              </span>
            </div>
            {/* Progress bar orange */}
            <div className="w-full h-2 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700">
              <div
                className="h-full bg-[#F59E0B] rounded-full transition-all duration-500"
                style={{ width: `${data.enterprise.waterImpact.percent}%` }}
              />
            </div>
          </div>

          {/* Ảnh hưởng không khí */}
          <div
            id="impact-air-card"
            onClick={() =>
              onOpenDetail({
                title: 'Chi tiết Ảnh hưởng Khí thải & Tiếng ồn',
                category: 'Tác động môi trường',
                description: `Mức độ tác động hiện tại: ${data.enterprise.airImpact.levelText} (${data.enterprise.airImpact.percent}%).`,
                details: [
                  'Chỉ số khí thải SO2, NOx từ các hệ thống máy phát điện dự phòng: Nằm trong quy chuẩn.',
                  'Độ ồn ban ngày khu vực kinh doanh hỗn hợp: 64 dB (ngưỡng cho phép 70 dB).',
                  'Khuyến khích chuyển đổi các bếp ăn thương mại sang năng lượng điện thay vì gas hóa lỏng.',
                ],
                tips: [
                  'Lắp đặt hệ thống lọc than hoạt tính cho các đường ống thông gió nhà hàng, quán ăn.',
                ],
              })
            }
            className="bg-[#F5F4F0] dark:bg-[#1E293B] hover:bg-[#ECEBE6] dark:hover:bg-[#334155]/70 border border-transparent dark:border-slate-700 active:scale-[0.99] transition-all rounded-[20px] p-4.5 cursor-pointer shadow-2xs"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <Wind className="w-5 h-5 text-[#475569] dark:text-slate-300 stroke-[2]" />
                <span className="text-[15px] font-semibold text-[#1E293B] dark:text-slate-200">
                  Ảnh hưởng không khí
                </span>
              </div>
              <span className="text-[14px] font-medium text-[#64748B] dark:text-slate-400">
                {data.enterprise.airImpact.levelText}
              </span>
            </div>
            {/* Progress bar orange */}
            <div className="w-full h-2 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700">
              <div
                className="h-full bg-[#F59E0B] rounded-full transition-all duration-500"
                style={{ width: `${data.enterprise.airImpact.percent}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Định hướng */}
      <section className="flex flex-col gap-3">
        <h2 className="text-[19px] font-extrabold text-[#0F172A] dark:text-slate-100 tracking-tight">
          Định hướng
        </h2>

        <button
          type="button"
          id="enterprise-direction-btn"
          onClick={() =>
            onOpenDetail({
              title: data.enterprise.ecoProductionGuideline,
              category: 'Chính sách phát triển xanh',
              description: 'Bộ khung tiêu chuẩn chuyển đổi số và chuyển đổi xanh dành cho doanh nghiệp nội đô.',
              details: [
                '1. Chứng nhận Doanh nghiệp Xanh (Green Enterprise Certification): Miễn giảm phí bảo vệ môi trường trong 2 năm đầu.',
                '2. Hỗ trợ 30% kinh phí lắp đặt pin năng lượng mặt trời mái nhà cho văn phòng và nhà xưởng.',
                '3. Cam kết loại bỏ 100% đồ nhựa dùng một lần trong chuỗi cung ứng sản phẩm quà tặng và bao bì.',
                '4. Tham gia thị trường tín chỉ carbon thử nghiệm của TP.HCM giai đoạn 2026.',
              ],
              tips: [
                'Tải trọn bộ tài liệu hướng dẫn chuyển đổi ESG được tích hợp sẵn không cần kết nối mạng.',
              ],
            })
          }
          className="bg-[#F5F4F0] dark:bg-[#1E293B] hover:bg-[#ECEBE6] dark:hover:bg-[#334155]/70 border border-transparent dark:border-slate-700 active:scale-[0.99] transition-all rounded-[18px] px-5 py-4 flex items-center justify-between cursor-pointer shadow-2xs"
        >
          <div className="flex items-center gap-3.5">
            <Leaf className="w-6 h-6 text-[#334155] dark:text-emerald-400 stroke-[2]" />
            <span className="text-[15px] font-semibold text-[#1E293B] dark:text-slate-200">
              {data.enterprise.ecoProductionGuideline}
            </span>
          </div>
          <ChevronRight className="w-5 h-5 text-[#94A3B8] dark:text-slate-400" />
        </button>
      </section>
    </div>
  );
};
