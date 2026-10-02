import React from 'react';
import { Mountain, Droplet, Wind, Leaf, ChevronRight, Satellite } from 'lucide-react';
import { DistrictData, ModalContent } from '../types';
import { getGeologySubsidenceRecord } from '../utils/geologySubsidenceData';

interface EnterpriseTabProps {
  data: DistrictData;
  onOpenDetail: (content: ModalContent) => void;
}

export const EnterpriseTab: React.FC<EnterpriseTabProps> = ({ data, onOpenDetail }) => {
  const geoRecord = getGeologySubsidenceRecord(
    data.id,
    data.name,
    data.lat || data.location?.lat,
    data.lng || data.location?.lng
  );

  const enterprise = data.enterprise || {
    assessmentTitle: 'Định hướng phát triển xanh',
    assessmentSubtitle: 'Chuyển đổi số & Kinh tế tuần hoàn',
    geologyImpact: { levelText: 'Thấp', percent: 25, status: 'low' as const },
    waterImpact: { levelText: 'Kiểm soát tốt', percent: 50, status: 'medium' as const },
    airImpact: { levelText: 'Tiêu chuẩn', percent: 45, status: 'medium' as const },
    ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương',
  };

  return (
    <div className="flex flex-col gap-5 px-5 pb-6">
      {/* Đánh giá tổng quát (Màu tím oải hương mềm mại) */}
      <div
        id="enterprise-eval-card"
        onClick={() =>
          onOpenDetail({
            title: 'Đánh giá Cơ hội Phát triển Bền vững',
            category: 'Kinh tế & Doanh nghiệp',
            description: `${enterprise.assessmentSubtitle} tại ${data.name}.`,
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
          {enterprise.assessmentTitle}
        </span>
        <span className="text-[25px] font-extrabold text-[#2E1065] dark:text-indigo-100 mt-1 tracking-tight leading-tight block">
          {enterprise.assessmentSubtitle}
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
          {/* Ảnh hưởng địa chất - Tách 3 nhóm: Địa chất, Địa hình, Sụt lún */}
          <div
            id="impact-geology-card"
            onClick={() =>
              onOpenDetail({
                title: 'Chi tiết Địa chất, Địa hình & Sụt lún Công trình',
                category: 'Quan trắc Địa tầng & Vệ tinh Viễn thám',
                description: `Đặc tính địa tầng: ${geoRecord.geology.formationName} tại ${data.name}.`,
                details: [
                  `1. THÔNG TIN ĐỊA CHẤT: Hệ tầng ${geoRecord.geology.formationName} (Tuổi: ${geoRecord.geology.geologicalAge}). Thành phần: ${geoRecord.geology.lithology}. Sức chịu tải tính toán: ${geoRecord.geology.bearingCapacity}. Nguồn: ${geoRecord.geology.source}.`,
                  `2. ĐỊA HÌNH & ĐỘ CAO: Cao độ số hóa DEM (Copernicus/SRTM 30m): ${geoRecord.topography.elevationMsl}. Dạng địa hình: ${geoRecord.topography.terrainType}. Nguồn: ${geoRecord.topography.dataSource}. Chú ý phương pháp: ${geoRecord.topography.methodNotice}.`,
                  `3. SỤT LÚN / CHUYỂN ĐỘNG MẶT ĐẤT: ${geoRecord.subsidence.insarRateMmYear ? `Tốc độ sụt lún trung bình: ${geoRecord.subsidence.insarRateMmYear}` : 'Chưa có mốc đo thực địa tại phường này — Tham chiếu mô hình vệ tinh radar vùng'}. Tình trạng: ${geoRecord.subsidence.statusLabel}. Xu hướng chuyển dịch: ${geoRecord.subsidence.displacementTrend}. Nguồn: ${geoRecord.subsidence.dataSource} (Chuỗi thời gian: ${geoRecord.subsidence.monitoringTimeRange}). Kỹ thuật: ${geoRecord.subsidence.surveyMethod}.`,
                  `Ghi chú tổng hợp: ${geoRecord.generalNote}`,
                ],
                tips: [
                  'Khoan khảo sát địa chất công trình tối thiểu 3 lỗ khoan đối với công trình cấp II trở lên.',
                  'Tuân thủ quy chuẩn xây dựng QCVN 03:2022/BXD về móng và tầng ngầm.',
                ],
              })
            }
            className="bg-[#F5F4F0] dark:bg-[#1E293B] hover:bg-[#ECEBE6] dark:hover:bg-[#334155]/70 border border-transparent dark:border-slate-700 active:scale-[0.99] transition-all rounded-[20px] p-4.5 cursor-pointer shadow-2xs"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <Mountain className="w-5 h-5 text-[#475569] dark:text-slate-300 stroke-[2]" />
                <span className="text-[15px] font-semibold text-[#1E293B] dark:text-slate-200">
                  Địa chất & Sụt lún nền
                </span>
              </div>
              <span className="text-[12px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-950/80 px-2 py-0.5 rounded-full">
                {geoRecord.subsidence.statusLabel}
              </span>
            </div>

            {/* 3 khối thông tin khoa học minh bạch */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-200/70 dark:border-slate-700/70 text-[11px]">
              <div className="bg-white/70 dark:bg-slate-800/70 p-2 rounded-xl">
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Địa chất</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">{geoRecord.geology.formationName}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">Tải: {geoRecord.geology.bearingCapacity}</span>
              </div>
              <div className="bg-white/70 dark:bg-slate-800/70 p-2 rounded-xl">
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Địa hình DEM</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{geoRecord.topography.elevationMsl}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5 line-clamp-1">{geoRecord.topography.terrainType}</span>
              </div>
              <div className="bg-white/70 dark:bg-slate-800/70 p-2 rounded-xl">
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Sụt lún InSAR</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                  {geoRecord.subsidence.insarRateMmYear || 'Tham chiếu vùng'}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5">Radar Sentinel-1</span>
              </div>
            </div>

            <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Satellite className="w-3 h-3 text-sky-600" />
                Vệ tinh radar & Bản đồ địa chất 1:50.000
              </span>
              <span className="text-emerald-700 dark:text-emerald-400 font-medium">Xem phân tích &rarr;</span>
            </div>
          </div>

          {/* Ảnh hưởng nguồn nước */}
          <div
            id="impact-water-card"
            onClick={() =>
              onOpenDetail({
                title: 'Chi tiết Ảnh hưởng Nguồn nước Thải Doanh Nghiệp',
                category: 'Giám sát Nước thải & Tiêu chuẩn QCVN',
                description: `Hiện trạng quản lý nước thải tại ${data.name}.`,
                details: [
                  '94% cơ sở kinh doanh F&B, giặt là, dịch vụ lưu trú đã lắp đặt bể tách dầu mỡ sơ cấp.',
                  'Lưu lượng nước xả thải trung bình khu vực: 1.200 m³/ngày đêm qua trạm xử lý nước thải tập trung.',
                  'Tỷ lệ mẫu kiểm tra định kỳ đạt quy chuẩn QCVN 14:2008/BTNMT: Đạt 92.5%.',
                  'Nguồn dữ liệu: Sở Tài nguyên và Môi trường TP.HCM & Trung tâm Y tế dự phòng quận/huyện.',
                  'Phương pháp: Lấy mẫu phân tích hóa lý định kỳ 6 tháng/lần tại hố ga thu gom.',
                ],
                tips: [
                  'Không xả dầu mỡ thừa trực tiếp vào đường ống cống thoát nước chung của tòa nhà.',
                  'Bảo dưỡng và nạo vét bể tách dầu mỡ tối thiểu 1 lần/tháng.',
                ],
              })
            }
            className="bg-[#F5F4F0] dark:bg-[#1E293B] hover:bg-[#ECEBE6] dark:hover:bg-[#334155]/70 border border-transparent dark:border-slate-700 active:scale-[0.99] transition-all rounded-[20px] p-4.5 cursor-pointer shadow-2xs"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <Droplet className="w-5 h-5 text-[#475569] dark:text-slate-300 stroke-[2]" />
                <span className="text-[15px] font-semibold text-[#1E293B] dark:text-slate-200">
                  Nước thải doanh nghiệp
                </span>
              </div>
              <span className="text-[12px] font-medium text-amber-700 dark:text-amber-400 bg-amber-100/80 dark:bg-amber-950/80 px-2 py-0.5 rounded-full">
                {enterprise.waterImpact.levelText}
              </span>
            </div>
            <div className="text-[11.5px] text-slate-600 dark:text-slate-300 mt-1">
              94% cơ sở F&B lắp đặt bể tách mỡ • Nước thải qua trạm xử lý đạt QCVN 14:2008/BTNMT.
            </div>
          </div>

          {/* Ảnh hưởng không khí */}
          <div
            id="impact-air-card"
            onClick={() =>
              onOpenDetail({
                title: 'Chi tiết Khí thải, Bụi & Tiếng ồn Thương mại',
                category: 'Giám sát Môi trường Không khí Đô thị',
                description: `Chỉ số kiểm soát khí thải tại ${data.name}.`,
                details: [
                  'Chỉ số khí thải SO2, NOx từ các hệ thống máy phát điện dự phòng: Nằm trong quy chuẩn QCVN 19:2009/BTNMT.',
                  'Độ ồn ban ngày khu vực kinh doanh hỗn hợp: 64 dB (ngưỡng cho phép tối đa 70 dB theo QCVN 26:2010/BTNMT).',
                  'Khuyến khích chuyển đổi các bếp ăn thương mại sang năng lượng điện thay vì gas hóa lỏng.',
                  'Nguồn dữ liệu: Trạm quan trắc tự động kết hợp thanh tra môi trường định kỳ.',
                ],
                tips: [
                  'Lắp đặt hệ thống lọc than hoạt tính cho các đường ống thông gió nhà hàng, quán ăn.',
                ],
              })
            }
            className="bg-[#F5F4F0] dark:bg-[#1E293B] hover:bg-[#ECEBE6] dark:hover:bg-[#334155]/70 border border-transparent dark:border-slate-700 active:scale-[0.99] transition-all rounded-[20px] p-4.5 cursor-pointer shadow-2xs"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <Wind className="w-5 h-5 text-[#475569] dark:text-slate-300 stroke-[2]" />
                <span className="text-[15px] font-semibold text-[#1E293B] dark:text-slate-200">
                  Khí thải & Tiếng ồn
                </span>
              </div>
              <span className="text-[12px] font-medium text-amber-700 dark:text-amber-400 bg-amber-100/80 dark:bg-amber-950/80 px-2 py-0.5 rounded-full">
                {enterprise.airImpact.levelText}
              </span>
            </div>
            <div className="text-[11.5px] text-slate-600 dark:text-slate-300 mt-1">
              Khí thải phát điện đạt QCVN 19:2009 • Độ ồn 64 dB (ngưỡng giới hạn 70 dB).
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
              title: enterprise.ecoProductionGuideline,
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
              {enterprise.ecoProductionGuideline}
            </span>
          </div>
          <ChevronRight className="w-5 h-5 text-[#94A3B8] dark:text-slate-400" />
        </button>
      </section>
    </div>
  );
};
