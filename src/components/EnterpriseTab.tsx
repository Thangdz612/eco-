import React from 'react';
import { Mountain, Droplet, Wind, Leaf, ChevronRight, Satellite, Info } from 'lucide-react';
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
      {/* Nhãn cố định hướng dẫn tham khảo */}
      <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 rounded-xl px-3.5 py-2.5 text-xs text-amber-800 dark:text-amber-200 flex items-center gap-2">
        <Info className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
        <span>Nội dung hướng dẫn tham khảo — không phải số liệu quan trắc hay thống kê chính thức.</span>
      </div>

      {/* Đánh giá tổng quát (Màu tím oải hương mềm mại) */}
      <div
        id="enterprise-eval-card"
        onClick={() =>
          onOpenDetail({
            title: 'Đánh giá Cơ hội Phát triển Bền vững',
            category: 'Kinh tế & Doanh nghiệp',
            description: `${enterprise.assessmentSubtitle} tại ${data.name}.`,
            details: [
              'Khung định hướng phát triển xanh và áp dụng tiêu chí ESG trong hoạt động doanh nghiệp.',
              'Khuyến nghị kết nối hạ tầng cấp điện, cấp nước sạch và hệ thống xử lý nước thải tập trung.',
              'Tham khảo các chính sách hỗ trợ, ưu đãi mặt bằng cho mô hình kinh doanh tuần hoàn và phát triển bền vững.',
              'Định hướng phát triển mạng lưới logistics giảm phát thải và sử dụng phương tiện năng lượng sạch.',
            ],
            tips: [
              'Doanh nghiệp có thể tìm hiểu tiêu chí thẩm định dự án Xanh để tiếp cận các chương trình hỗ trợ tín dụng môi trường.',
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
                  'Thực hiện khoan khảo sát địa chất công trình theo quy định phân cấp công trình trước khi thiết kế nền móng.',
                  'Tuân thủ quy chuẩn xây dựng QCVN 03:2022/BXD (Cần đối chiếu phiên bản hiện hành) về kết cấu móng và công trình ngầm.',
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
                title: 'Hướng Dẫn Quản Lý Nước Thải Doanh Nghiệp',
                category: 'Khuyến nghị & Tham chiếu Quy chuẩn',
                description: `Hướng dẫn quản lý và kiểm soát nước thải tại ${data.name}.`,
                details: [
                  'Khuyến nghị các cơ sở F&B, kinh doanh dịch vụ ăn uống, lưu trú lắp đặt bể tách dầu mỡ sơ bộ trước khi thoát ra cống.',
                  'Hướng dẫn tham chiếu quy chuẩn kỹ thuật quốc gia về nước thải sinh hoạt: QCVN 14:2008/BTNMT (Cần đối chiếu phiên bản hiện hành).',
                  'Khuyến nghị các cơ sở tuân thủ ngưỡng giới hạn thông số ô nhiễm (BOD5, COD, TSS, dầu mỡ động thực vật) theo quy chuẩn hiện hành.',
                  'Nước thải sản xuất, kinh doanh cần qua hệ thống xử lý sơ bộ đạt tiêu chuẩn đấu nối với mạng lưới thoát nước khu vực.',
                ],
                tips: [
                  'Không xả dầu mỡ thừa trực tiếp vào đường ống cống thoát nước chung của tòa nhà.',
                  'Bảo dưỡng và nạo vét bể tách dầu mỡ định kỳ để đảm bảo hiệu quả tách lọc.',
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
              Khuyến nghị lắp đặt bể tách mỡ • Tham chiếu quy chuẩn nước thải QCVN 14:2008/BTNMT (Cần đối chiếu phiên bản hiện hành).
            </div>
          </div>

          {/* Ảnh hưởng không khí */}
          <div
            id="impact-air-card"
            onClick={() =>
              onOpenDetail({
                title: 'Hướng Dẫn Kiểm Soát Khí Thải & Tiếng Ồn Thương Mại',
                category: 'Khuyến nghị & Tham chiếu Quy chuẩn',
                description: `Hướng dẫn kiểm soát khí thải và tiếng ồn tại ${data.name}.`,
                details: [
                  'Khuyến nghị vận hành hệ thống máy phát điện dự phòng tuân thủ QCVN 19:2009/BTNMT (Cần đối chiếu phiên bản hiện hành) về khí thải công nghiệp.',
                  'Tham chiếu ngưỡng giới hạn tiếng ồn tối đa cho phép theo QCVN 26:2010/BTNMT (Cần đối chiếu phiên bản hiện hành) tại khu vực sinh hoạt và thương mại.',
                  'Khuyến khích chuyển đổi các bếp ăn thương mại sang năng lượng sạch, lắp đặt hệ thống chụp hút khói và lọc mùi.',
                  'Khuyến nghị cơ sở kinh doanh chủ động rà soát, bảo dưỡng định kỳ các nguồn phát sinh khí thải và tiếng ồn.',
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
              Khuyến nghị kiểm soát khí thải QCVN 19:2009/BTNMT • Ngưỡng tiếng ồn QCVN 26:2010/BTNMT (Cần đối chiếu phiên bản hiện hành).
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
                '1. Định hướng Chứng nhận Doanh nghiệp Xanh: Tham gia các chương trình đánh giá và hỗ trợ ưu đãi môi trường của thành phố.',
                '2. Khuyến khích đầu tư điện mặt trời mái nhà và giải pháp tiết kiệm năng lượng cho văn phòng, cơ sở sản xuất.',
                '3. Kế hoạch hành động giảm thiểu đồ nhựa dùng một lần trong bao bì và chuỗi cung ứng.',
                '4. Tiếp cận các chương trình đào tạo về kiểm kê khí nhà kính và lộ trình giảm phát thải carbon.',
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
