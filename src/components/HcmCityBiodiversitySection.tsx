import React, { useState, useMemo } from 'react';
import {
  Waves,
  Footprints,
  Feather,
  Droplet,
  Globe,
  Search,
  CheckCircle2,
  AlertTriangle,
  TreeDeciduous,
  Fish,
  Bird,
  ShieldCheck,
  PhoneCall,
  ChevronRight,
  Sparkles,
  MapPin,
  Compass,
  ArrowUpDown,
  Filter,
  TrendingUp,
  Scale,
  Briefcase,
  BadgeCheck,
  Building2,
  FileCheck,
  ShoppingBag,
  Info,
} from 'lucide-react';
import { DISTRICTS_DATA, HCM_DISTRICT_GROUPS } from '../data/mockData';
import { getGeologySubsidenceRecord, INSAR_MANDATORY_LABEL } from '../utils/geologySubsidenceData';
import { DistrictData, ModalContent } from '../types';
import {
  HCM_BIODIVERSITY_SPECIES,
  COMMERCIAL_SPECIES_STATS,
  SpeciesItem,
  enrichSpeciesItem,
  getDistrictBiodiversityMetadata,
  getWardHabitatSummary,
} from '../data/biodiversitySpeciesData';
import { BiodiversityTrendChart } from './BiodiversityTrendChart';

interface HcmCityBiodiversitySectionProps {
  currentDistrictId: string;
  onSelectDistrict?: (districtId: string) => void;
  onOpenDetail: (content: ModalContent) => void;
}

// 5 Vùng sinh thái trọng điểm của toàn địa bàn TP.HCM
interface EcologicalZone {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  scope: string;
  areaDesc: string;
  canopyCoverage: string;
  representativeSpecies: {
    underwater: string;
    terrestrial: string;
    aerial: string;
    amphibian: string;
  };
  keyStatus: string;
  vitalRole: string;
  protectionMeasures: string[];
}

const HCM_ECOLOGICAL_ZONES: EcologicalZone[] = [
  {
    id: 'can-gio-biosphere',
    name: 'Khu Dự trữ Sinh quyển Rừng ngập mặn Cần Giờ (UNESCO)',
    badge: 'Khu DTSQ Thế Giới',
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700',
    scope: 'Toàn bộ Huyện Cần Giờ (An Thới Đông, Bình Khánh, Long Hòa, Lý Nhơn, Tam Thôn Hiệp, Thạnh An, Cần Thạnh)',
    areaDesc: 'Hơn 38.000 ha rừng ngập mặn bạt ngàn ven biển Đông',
    canopyCoverage: 'Độ che phủ rừng ngập mặn đạt 95.4%',
    representativeSpecies: {
      underwater: 'Cá đối, cá bống thòi lòi, tôm sú tự nhiên, nghêu Bến Tre, hàu biển, cua biển',
      terrestrial: 'Đước đôi (Rhizophora apiculata), bần trắng, vẹt đen, mắm trắng, khỉ đuôi dài (Macaca fascicularis), sóc đất',
      aerial: 'Bồ nông chân xám (loài quý hiếm), cò trắng, choắt mỏ cong, bói cá, diệc lửa',
      amphibian: 'Cá thòi lòi leo cây, cua đá cạn, cá bống sao, rắn ráo nước mặn',
    },
    keyStatus: 'Bảo tồn cấp quốc tế nghiêm ngặt • Độ đa dạng sinh học cao nhất vùng Đông Nam Bộ',
    vitalRole: 'Lá phổi xanh khổng lồ thanh lọc không khí, hấp thụ "blue carbon" và là bức tường xanh chắn sóng, ngăn triều cường bảo vệ toàn TP.HCM.',
    protectionMeasures: [
      'Giao khoán bảo vệ rừng ngập mặn cho lực lượng kiểm lâm và các hộ dân địa phương.',
      'Nghiêm cấm chặt phá cây đước, bần và săn bắt chim trời trong vùng lõi sinh quyển.',
      'Thả giống tái tạo nguồn lợi thủy sản hàng năm tại vịnh Gành Rái và sông Lòng Tàu.',
    ],
  },
  {
    id: 'sai-gon-river-corridor',
    name: 'Hành lang Sinh thái Sông Sài Gòn & Kênh rạch Nội đô',
    badge: 'Hành lang Vi khí hậu',
    badgeColor: 'bg-sky-100 text-sky-800 dark:bg-sky-950/80 dark:text-sky-300 border-sky-300 dark:border-sky-700',
    scope: 'Trục sông Sài Gòn dài 80km (Củ Chi, Hóc Môn, Thủ Đức, Bình Thạnh, Q1, Q4, Q7, Nhà Bè) & Kênh Nhiêu Lộc - Thị Nghè, Tàu Hủ',
    areaDesc: 'Mạng lưới sông rạch tự nhiên dài hơn 1.000 km',
    canopyCoverage: 'Mảng xanh dải ven bờ sông đạt 82%',
    representativeSpecies: {
      underwater: 'Cá chép, cá bống, cá lăng, cá tra tự nhiên, vi sinh vật tầng đáy benthos hồi sinh 65%',
      terrestrial: 'Cây lộc vừng ven sông, dừa nước, dương xỉ bán ngập, thảm cỏ vetiver chống sạt lở',
      aerial: 'Chim bói cá, chim sẻ nhà, bồ câu hoang dã, vạc sậy, yến hàng đô thị',
      amphibian: 'Cóc nhà, thạch sùng, ễnh ương ven rạch, ấu trùng phù du nước ngọt',
    },
    keyStatus: 'Hồi sinh tích cực • 14 trạm sục khí oxy kênh rạch hoạt động liên tục',
    vitalRole: 'Điều hòa nhiệt độ đô thị (giảm 1.5 - 2°C hiệu ứng đảo nhiệt), tạo trục cảnh quan sinh thái và thoát lũ chính của thành phố.',
    protectionMeasures: [
      'Vận hành trạm bơm sục khí oxy và thu gom rác tự động trên kênh Nhiêu Lộc - Thị Nghè.',
      'Cải tạo bờ kè sinh thái kết hợp trồng thảm thực vật bản địa giữ đất.',
      'Nghiêm cấm xả nước thải công nghiệp chưa qua xử lý vào lưu vực sông.',
    ],
  },
  {
    id: 'northwest-agro-buffer',
    name: 'Vùng Đệm Nông nghiệp Sinh thái Tây Bắc & Tây Nam',
    badge: 'Vùng Đệm Thấm Hút',
    badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300 dark:border-amber-700',
    scope: 'Huyện Củ Chi, Huyện Hóc Môn, Huyện Bình Chánh và các phường ngoại vi TP. Bến Cát',
    areaDesc: 'Hơn 45.000 ha đất nông nghiệp, vườn sinh thái và thảm đồng cỏ',
    canopyCoverage: 'Độ che phủ thực vật đạt 74%',
    representativeSpecies: {
      underwater: 'Cá lóc đồng, cá rô đồng, lươn đồng, cá trê vàng, ốc bươu đen bản địa',
      terrestrial: 'Vườn cây ăn trái nhiệt đới (chôm chôm, măng cụt, bưởi da xanh), tràm nước, cỏ vetiver',
      aerial: 'Cò trắng đồng ruộng, chim cu cườm, bìm bịp lớn, chim sâu, chuồn chuồn kim',
      amphibian: 'Ếch đồng, nhái bén, cóc tía (thiên địch bắt rầy nâu và muỗi sinh học)',
    },
    keyStatus: 'Duy trì ổn định • Chuyển đổi mô hình nông nghiệp sinh thái tuần hoàn',
    vitalRole: 'Là vùng thấm hút tự nhiên khổng lồ giữ chậm nước mưa, hạn chế ngập úng dồn về khu vực trung tâm và duy trì mạch nước ngầm.',
    protectionMeasures: [
      'Khuyến khích canh tác hữu cơ, giảm 40% lượng phân bón hóa học và thuốc trừ sâu độc hại.',
      'Bảo vệ các kênh thủy lợi tự nhiên và hồ đầm trữ nước nông nghiệp sinh thái.',
    ],
  },
  {
    id: 'urban-core-heritage',
    name: 'Quần xã Sinh thái Đô thị Lõi Trung tâm Lịch sử',
    badge: 'Di sản Cây Cổ thụ',
    badgeColor: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700',
    scope: 'Quận 1, Quận 3, Quận 5, Quận 10, Phú Nhuận, Bình Thạnh (Thảo Cầm Viên, Tao Đàn, 23/9, Lê Văn Tám, Gia Định)',
    areaDesc: 'Hơn 120 ha công viên cây xanh lịch sử và dải phân cách xanh',
    canopyCoverage: 'Diện tích cây xanh đạt 3.9 m²/người dân nội thành',
    representativeSpecies: {
      underwater: 'Cá koi cảnh quan, cá bảy màu diệt bọ gậy, thủy sinh hồ nhân tạo',
      terrestrial: 'Hơn 5.400 cây cổ thụ di sản (sao đen, dầu rái, xà cừ >100 năm tuổi), sóc cây, bò sát nhỏ',
      aerial: 'Bồ câu Pháp thuần hóa, chim chích bông, chim sẻ, yến hàng đô thị',
      amphibian: 'Thạch sùng, cóc nhà sống tại thảm cỏ công viên và vườn hoa biệt thự cổ',
    },
    keyStatus: 'Bảo tồn di sản cây xanh • Đang mở rộng mảng xanh sân thượng & công viên bỏ túi',
    vitalRole: 'Cung cấp bóng mát, giữ độ ẩm không khí, giảm bụi mịn PM2.5 và là không gian thư giãn tinh thần cho hơn 5 triệu cư dân vùng lõi.',
    protectionMeasures: [
      'Gắn mã QR quản lý số hóa toàn bộ cây xanh cổ thụ trên 100 năm tuổi.',
      'Định kỳ kiểm tra tầm soát rỗng thân và cắt tỉa cành an toàn trước mùa mưa bão.',
    ],
  },
  {
    id: 'con-dao-marine-park',
    name: 'Vườn Quốc gia Hải đảo Côn Đảo (Đặc khu Sinh thái Biển)',
    badge: 'Khu Ramsar Biển Đảo',
    badgeColor: 'bg-teal-100 text-teal-800 dark:bg-teal-950/80 dark:text-teal-300 border-teal-300 dark:border-teal-700',
    scope: 'Đặc khu Côn Đảo gồm 14 hòn đảo lớn nhỏ và vùng biển bảo tồn rộng 14.000 ha',
    areaDesc: 'Hệ sinh thái biển đảo nguyên sinh tiêu biểu nhất Việt Nam',
    canopyCoverage: 'Độ che phủ rừng nhiệt đới hải đảo đạt 88.2%',
    representativeSpecies: {
      underwater: '360 loài san hô cứng, Rùa biển Vích (Chelonia mydas), Đồi mồi, Bò biển Dugong, cá rạn san hô',
      terrestrial: 'Cây phong ba, bàng vuông, nho rừng, sóc đen Côn Đảo (đặc hữu), bồ câu Nicobar',
      aerial: 'Chim yến hàng Côn Đảo, hải âu, ó cá, bồ nông di cư biển sâu',
      amphibian: 'Cua xe tăng (cua cạn khổng lồ Côn Đảo), thằn lằn ngón Côn Đảo, ếch nhái đảo',
    },
    keyStatus: 'Bảo tồn nghiêm ngặt cấp quốc tế • Vườn di sản Ramsar Công ước Quốc tế',
    vitalRole: 'Nơi sinh sản và ấp nở khoảng 90% số lượng rùa biển tại Việt Nam (theo thống kê của VQG Côn Đảo & Sách Kỷ lục Việt Nam), là kho dự trữ gen sinh học biển vô giá của quốc gia.',
    protectionMeasures: [
      'Kiểm lâm Vườn Quốc gia tuần tra 24/7 bảo vệ các bãi đẻ trứng rùa biển (Bãi Cát Lớn, Bãi Dương).',
      'Cấm tuyệt đối hoạt động đánh bắt hải sản trong vùng lõi bảo tồn san hô nghiêm ngặt.',
      'Chiến dịch Côn Đảo không rác thải nhựa đại dương.',
    ],
  },
];

// Danh sách các loài quý hiếm, nguy cấp cần ưu tiên bảo vệ tại TP.HCM
const ENDANGERED_SPECIES_LIST = [
  {
    name: 'Rùa biển Vích (Chelonia mydas)',
    level: 'Cực kỳ nguy cấp (CR)',
    habitat: 'Vùng biển & bãi đẻ Côn Đảo',
    countNote: 'Khoảng 2.000 cá thể mẹ về đẻ trứng/năm',
    threat: 'Rác nhựa biển và săn trộm trứng',
  },
  {
    name: 'Bồ nông chân xám (Pelecanus philippensis)',
    level: 'Sắp nguy cấp (VU)',
    habitat: 'Rừng ngập mặn Cần Giờ & bãi bồi sông Soài Rạp',
    countNote: 'Quần thể di trú mùa đông ~120 cá thể',
    threat: 'Thu hẹp bãi kiếm ăn phù sa tự nhiên',
  },
  {
    name: 'Rái cá lông mượt (Lutrogale perspicillata)',
    level: 'Nguy cấp (EN)',
    habitat: 'Khu lõi Rừng phòng hộ Cần Giờ',
    countNote: 'Chỉ thị sinh học nguồn nước sạch tự nhiên',
    threat: 'Ô nhiễm nguồn nước và bẫy lưới cá mắt nhỏ',
  },
  {
    name: 'Bò biển Dugong (Dugong dugon)',
    level: 'Cực kỳ nguy cấp (CR)',
    habitat: 'Thảm cỏ biển Vườn quốc gia Côn Đảo',
    countNote: 'Còn dưới 15 cá thể được ghi nhận thường trực',
    threat: 'Suy giảm thảm cỏ biển và chân vịt tàu thuyền',
  },
  {
    name: 'Khỉ đuôi dài (Macaca fascicularis)',
    level: 'Bảo tồn bảo vệ (LC/VU)',
    habitat: 'Đảo Khỉ Cần Giờ & Thảo Cầm Viên Sài Gòn',
    countNote: 'Hơn 2.200 cá thể sinh sống tự nhiên',
    threat: 'Du khách cho ăn thức ăn công nghiệp sai cách',
  },
  {
    name: 'Cá thòi lòi leo cây (Periophthalmus)',
    level: 'Chỉ thị sinh thái (LC)',
    habitat: 'Vùng bùn bãi bồi Cần Giờ, Nhà Bè, Bình Chánh',
    countNote: 'Phổ biến rộng, giữ cân bằng bùn hữu cơ',
    threat: 'San lấp bờ rạch bằng bê tông hóa',
  },
];

export const HcmCityBiodiversitySection: React.FC<HcmCityBiodiversitySectionProps> = ({
  currentDistrictId,
  onSelectDistrict,
  onOpenDetail,
}) => {
  const [selectedZoneId, setSelectedZoneId] = useState<string>('can-gio-biosphere');
  const [regionFilter, setRegionFilter] = useState<string>('Tất cả');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSubTab, setActiveSubTab] = useState<'zones' | 'species' | 'commercial' | 'trend' | 'wards' | 'endangered'>('zones');
  const [speciesRealmFilter, setSpeciesRealmFilter] = useState<'all' | 'underwater' | 'aerial' | 'terrestrial' | 'amphibian'>('all');
  const [speciesSearchQuery, setSpeciesSearchQuery] = useState<string>('');

  // Bộ lọc chuyên sâu cho danh mục Loài có thể kinh doanh & Pháp lý
  const [commercialStatusFilter, setCommercialStatusFilter] = useState<'all' | 'permitted_free' | 'conditional_farming' | 'strictly_prohibited'>('all');
  const [commercialRealmFilter, setCommercialRealmFilter] = useState<'all' | 'underwater' | 'aerial' | 'terrestrial' | 'amphibian'>('all');
  const [commercialSearchQuery, setCommercialSearchQuery] = useState<string>('');

  // Lọc danh sách loài sinh vật toàn thành phố
  const filteredSpecies = useMemo(() => {
    return HCM_BIODIVERSITY_SPECIES.filter((sp) => {
      const matchRealm =
        speciesRealmFilter === 'all' || sp.realm === speciesRealmFilter;
      const matchSearch =
        !speciesSearchQuery ||
        sp.name.toLowerCase().includes(speciesSearchQuery.toLowerCase()) ||
        sp.scientificName.toLowerCase().includes(speciesSearchQuery.toLowerCase()) ||
        sp.group.toLowerCase().includes(speciesSearchQuery.toLowerCase()) ||
        sp.habitat.toLowerCase().includes(speciesSearchQuery.toLowerCase()) ||
        (sp.commercialProducts && sp.commercialProducts.some((p) => p.toLowerCase().includes(speciesSearchQuery.toLowerCase())));
      return matchRealm && matchSearch;
    }).map(enrichSpeciesItem);
  }, [speciesRealmFilter, speciesSearchQuery]);

  // Lọc danh sách loài theo góc độ kinh doanh & pháp lý thương mại
  const filteredCommercialSpecies = useMemo(() => {
    return HCM_BIODIVERSITY_SPECIES.filter((sp) => {
      const matchStatus =
        commercialStatusFilter === 'all' || sp.commercialStatus === commercialStatusFilter;
      const matchRealm =
        commercialRealmFilter === 'all' || sp.realm === commercialRealmFilter;
      const q = commercialSearchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        sp.name.toLowerCase().includes(q) ||
        sp.scientificName.toLowerCase().includes(q) ||
        (sp.commercialLabel && sp.commercialLabel.toLowerCase().includes(q)) ||
        (sp.commercialFarmingLocation && sp.commercialFarmingLocation.toLowerCase().includes(q)) ||
        (sp.commercialProducts && sp.commercialProducts.some((p) => p.toLowerCase().includes(q))) ||
        (sp.legalFramework && sp.legalFramework.toLowerCase().includes(q)) ||
        (sp.economicValue && sp.economicValue.toLowerCase().includes(q));
      return matchStatus && matchRealm && matchSearch;
    });
  }, [commercialStatusFilter, commercialRealmFilter, commercialSearchQuery]);

  // Lấy toàn bộ danh sách 168 xã/phường/đặc khu từ DISTRICTS_DATA
  const allDistricts = useMemo(() => {
    return Object.values(DISTRICTS_DATA);
  }, []);

  // Lọc danh sách xã/phường phục vụ tìm kiếm & tra cứu
  const filteredDistricts = useMemo(() => {
    return allDistricts.filter((d) => {
      const matchRegion =
        regionFilter === 'Tất cả' || d.districtGroup === regionFilter;
      const matchQuery =
        !searchQuery ||
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.subTitle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchRegion && matchQuery;
    });
  }, [allDistricts, regionFilter, searchQuery]);

  const activeZone = useMemo(() => {
    return (
      HCM_ECOLOGICAL_ZONES.find((z) => z.id === selectedZoneId) ||
      HCM_ECOLOGICAL_ZONES[0]
    );
  }, [selectedZoneId]);

  return (
    <div
      id="hcm-city-biodiversity-section"
      className="flex flex-col gap-4 bg-white dark:bg-slate-900 rounded-[24px] p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs"
    >
      {/* 1. Header & Chỉ số Sức khỏe Sinh thái Toàn TP.HCM */}
      <div className="flex flex-col gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-600 text-white shadow-xs shrink-0">
                <Globe className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
                  Quần Xã Sinh Vật Toàn Bộ TP.HCM
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Tổng quan sinh cảnh 5 phân vùng sinh thái, hành lang xanh và Vườn di sản Côn Đảo
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Chỉ số CBI: <strong>78.5/100</strong> (Tốt)
            </span>
          </div>
        </div>

        {/* Thông tin 4 trụ cột Quần xã sinh thái định tính theo sinh cảnh vùng */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
          {/* Dưới nước */}
          <div className="bg-sky-50/80 dark:bg-sky-950/40 border border-sky-200/70 dark:border-sky-800/60 rounded-2xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[11.5px] font-bold text-sky-900 dark:text-sky-300 flex items-center gap-1">
                <Waves className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                Dưới nước
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/80 dark:bg-slate-800 font-bold text-sky-700 dark:text-sky-300 shadow-2xs">
                Sinh cảnh nước
              </span>
            </div>
            <div className="mt-2">
              <span className="text-xs font-bold text-sky-950 dark:text-sky-100 block leading-snug">
                Sông Sài Gòn • Rừng ngập mặn Cần Giờ • Rạn san hô Côn Đảo
              </span>
              <span className="text-[10px] text-sky-700 dark:text-sky-400 block mt-1">
                Tham khảo sinh cảnh vùng — không phải kiểm kê tại phường
              </span>
            </div>
          </div>

          {/* Trên cạn */}
          <div className="bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/70 dark:border-emerald-800/60 rounded-2xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[11.5px] font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1">
                <Footprints className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Trên cạn
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/80 dark:bg-slate-800 font-bold text-emerald-700 dark:text-emerald-300 shadow-2xs">
                Sinh cảnh cạn
              </span>
            </div>
            <div className="mt-2">
              <span className="text-xs font-bold text-emerald-950 dark:text-emerald-100 block leading-snug">
                Cây cổ thụ di sản • Rừng phòng hộ ven biển • Rừng hải đảo
              </span>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block mt-1">
                Tham khảo sinh cảnh vùng — không phải kiểm kê tại phường
              </span>
            </div>
          </div>

          {/* Trên trời */}
          <div className="bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/70 dark:border-amber-800/60 rounded-2xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[11.5px] font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1">
                <Feather className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                Trên trời
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/80 dark:bg-slate-800 font-bold text-amber-700 dark:text-amber-300 shadow-2xs">
                Chim & côn trùng
              </span>
            </div>
            <div className="mt-2">
              <span className="text-xs font-bold text-amber-950 dark:text-amber-100 block leading-snug">
                Chim di cư quốc tế • Bãi bồi ven biển • Chim yến vách đá
              </span>
              <span className="text-[10px] text-amber-700 dark:text-amber-400 block mt-1">
                Tham khảo sinh cảnh vùng — không phải kiểm kê tại phường
              </span>
            </div>
          </div>

          {/* Lưỡng cư */}
          <div className="bg-teal-50/80 dark:bg-teal-950/40 border border-teal-200/70 dark:border-teal-800/60 rounded-2xl p-3 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[11.5px] font-bold text-teal-900 dark:text-teal-300 flex items-center gap-1">
                <Droplet className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                Lưỡng cư & Bò sát
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/80 dark:bg-slate-800 font-bold text-teal-700 dark:text-teal-300 shadow-2xs">
                Vùng giáp ranh
              </span>
            </div>
            <div className="mt-2">
              <span className="text-xs font-bold text-teal-950 dark:text-teal-100 block leading-snug">
                Bãi bồi cửa sông • Động vật bán ngập Côn Đảo • Thiên địch tự nhiên
              </span>
              <span className="text-[10px] text-teal-700 dark:text-teal-400 block mt-1">
                Tham khảo sinh cảnh vùng — không phải kiểm kê tại phường
              </span>
            </div>
          </div>
        </div>

        <div className="text-[11px] text-slate-500 dark:text-slate-400 italic">
          * Nguyên tắc trung thực khoa học: Ứng dụng không thực hiện phép cộng dồn số loài cơ học giữa các phường/xã để tránh đếm lặp loài.
        </div>
      </div>

      {/* 2. Menu Sub-Tabs chọn góc nhìn: 5 Vùng sinh thái / Bảng tra cứu 168 phường xã / Loài nguy cấp Sách Đỏ */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
        <button
          type="button"
          id="bio-tab-zones"
          onClick={() => setActiveSubTab('zones')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeSubTab === 'zones'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-emerald-600" />
          <span>5 Vùng Sinh Thái</span>
        </button>

        <button
          type="button"
          id="bio-tab-species"
          onClick={() => setActiveSubTab('species')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeSubTab === 'species'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>Tên Các Loài</span>
        </button>

        <button
          type="button"
          id="bio-tab-commercial"
          onClick={() => setActiveSubTab('commercial')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeSubTab === 'commercial'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Scale className="w-3.5 h-3.5 text-indigo-600" />
          <span>Kinh Doanh & Pháp Lý</span>
        </button>

        <button
          type="button"
          id="bio-tab-trend"
          onClick={() => setActiveSubTab('trend')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeSubTab === 'trend'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
          <span>Xu Hướng (2023 - 2026)</span>
        </button>

        <button
          type="button"
          id="bio-tab-wards"
          onClick={() => setActiveSubTab('wards')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeSubTab === 'wards'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <TreeDeciduous className="w-3.5 h-3.5 text-blue-600" />
          <span>Tra Cứu 168 Xã/Phường</span>
        </button>

        <button
          type="button"
          id="bio-tab-endangered"
          onClick={() => setActiveSubTab('endangered')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
            activeSubTab === 'endangered'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          <span>Loài Nguy Cấp Sách Đỏ</span>
        </button>
      </div>

      {/* 3. NỘI DUNG SUB-TAB 1: 5 VÙNG SINH THÁI CHIẾN LƯỢC */}
      {activeSubTab === 'zones' && (
        <div className="flex flex-col gap-3">
          {/* Thanh cuộn ngang các vùng sinh thái */}
          <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar">
            {HCM_ECOLOGICAL_ZONES.map((zone) => {
              const isSelected = zone.id === selectedZoneId;
              return (
                <button
                  key={zone.id}
                  type="button"
                  id={`btn-zone-${zone.id}`}
                  onClick={() => setSelectedZoneId(zone.id)}
                  className={`px-3 py-2 rounded-xl text-left shrink-0 transition-all cursor-pointer flex flex-col gap-1 border ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm ring-2 ring-emerald-400/40'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750'
                  }`}
                >
                  <span className="text-[11.5px] font-bold leading-tight line-clamp-1">
                    {zone.name.split('(')[0]}
                  </span>
                  <span
                    className={`text-[10px] font-semibold ${
                      isSelected ? 'text-emerald-100' : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {zone.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Chi tiết Vùng Sinh thái được chọn */}
          <div className="bg-slate-50 dark:bg-slate-850 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-750 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span
                  className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full border mb-1.5 ${activeZone.badgeColor}`}
                >
                  {activeZone.badge}
                </span>
                <h4 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                  {activeZone.name}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  <strong>Phạm vi địa lý:</strong> {activeZone.scope}
                </p>
              </div>
            </div>

            {/* Thông số mảng xanh & diện tích */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Quy mô diện tích</span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {activeZone.areaDesc}
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Độ che phủ mảng xanh</span>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                  {activeZone.canopyCoverage}
                </span>
              </div>
            </div>

            {/* Quần xã sinh vật đặc trưng theo 4 phân tầng */}
            <div className="flex flex-col gap-2 pt-1 border-t border-slate-200/60 dark:border-slate-700">
              <h5 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Quần xã sinh vật đặc trưng
              </h5>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 flex items-start gap-2">
                  <Waves className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sky-950 dark:text-sky-300 block">Thủy sinh / Dưới nước:</strong>
                    <span className="text-slate-600 dark:text-slate-300 leading-snug">
                      {activeZone.representativeSpecies.underwater}
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 flex items-start gap-2">
                  <Footprints className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-emerald-950 dark:text-emerald-300 block">Động thực vật trên cạn:</strong>
                    <span className="text-slate-600 dark:text-slate-300 leading-snug">
                      {activeZone.representativeSpecies.terrestrial}
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 flex items-start gap-2">
                  <Feather className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-950 dark:text-amber-300 block">Chim & sinh vật bay:</strong>
                    <span className="text-slate-600 dark:text-slate-300 leading-snug">
                      {activeZone.representativeSpecies.aerial}
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 flex items-start gap-2">
                  <Droplet className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-teal-950 dark:text-teal-300 block">Lưỡng cư & bò sát:</strong>
                    <span className="text-slate-600 dark:text-slate-300 leading-snug">
                      {activeZone.representativeSpecies.amphibian}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Vai trò sinh thái & Các biện pháp bảo vệ */}
            <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-800/50 rounded-xl text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900 dark:text-emerald-300">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Vai trò sinh thái trọng yếu</span>
              </div>
              <p className="text-emerald-800 dark:text-emerald-300/90 leading-relaxed">
                {activeZone.vitalRole}
              </p>
              <div className="pt-1.5 border-t border-emerald-200/50 dark:border-emerald-800/40 space-y-1 text-slate-700 dark:text-slate-300">
                <strong className="block text-[11px] text-emerald-950 dark:text-emerald-300 uppercase">
                  Biện pháp bảo tồn hiện hành:
                </strong>
                {activeZone.protectionMeasures.map((pm, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-[11.5px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{pm}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NỘI DUNG SUB-TAB: DANH MỤC TÊN CÁC LOÀI SINH VẬT (BIỂN, KHÔNG, CẠN, LƯỠNG CƯ) */}
      {activeSubTab === 'species' && (
        <div className="flex flex-col gap-3">
          {/* Header giải thích */}
          <div className="p-3 bg-sky-50/80 dark:bg-sky-950/40 border border-sky-200/80 dark:border-sky-800/60 rounded-xl text-xs flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
            <div className="flex-1 text-sky-950 dark:text-sky-200 leading-relaxed">
              <strong>Danh mục tên và phân loại khoa học các loài sinh vật toàn TP.HCM & Côn Đảo:</strong>{' '}
              Bao gồm sinh vật biển & thủy sinh, sinh vật trên không, động thực vật trên cạn và lưỡng cư bò sát. Bấm vào loài bất kỳ để tra cứu chi tiết đặc điểm nhận diện, sinh cảnh và tình trạng bảo tồn.
            </div>
          </div>

          {/* Ô tìm kiếm loài và phân loại */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                id="search-species-city-input"
                value={speciesSearchQuery}
                onChange={(e) => setSpeciesSearchQuery(e.target.value)}
                placeholder="Tìm tên loài tiếng Việt, danh pháp khoa học (Latinh), sinh cảnh..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-sky-500 text-slate-900 dark:text-slate-100"
              />
              {speciesSearchQuery && (
                <button
                  type="button"
                  onClick={() => setSpeciesSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            <span className="text-xs text-slate-500 dark:text-slate-400 shrink-0 self-end sm:self-auto">
              Hiển thị <strong>{filteredSpecies.length}</strong> / {HCM_BIODIVERSITY_SPECIES.length} loài
            </span>
          </div>

          {/* Bộ lọc phân hệ sinh vật: Biển, Không, Cạn, Lưỡng Cư */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
            {[
              { id: 'all', label: 'Tất cả loài', count: HCM_BIODIVERSITY_SPECIES.length },
              { id: 'underwater', label: '🌊 Biển & Thủy sinh', count: HCM_BIODIVERSITY_SPECIES.filter((s) => s.realm === 'underwater').length },
              { id: 'aerial', label: '🦅 Trên không', count: HCM_BIODIVERSITY_SPECIES.filter((s) => s.realm === 'aerial').length },
              { id: 'terrestrial', label: '🌳 Trên cạn', count: HCM_BIODIVERSITY_SPECIES.filter((s) => s.realm === 'terrestrial').length },
              { id: 'amphibian', label: '🐸 Lưỡng cư & Bò sát', count: HCM_BIODIVERSITY_SPECIES.filter((s) => s.realm === 'amphibian').length },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSpeciesRealmFilter(tab.id as any)}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-between gap-1 border ${
                  speciesRealmFilter === tab.id
                    ? 'bg-sky-600 text-white border-sky-600 shadow-2xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750'
                }`}
              >
                <span className="truncate">{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-black ${
                    speciesRealmFilter === tab.id
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Ghi chú minh bạch về nguồn tham chiếu vùng sinh thái */}
          <div className="p-3 rounded-2xl bg-sky-50/70 dark:bg-sky-950/30 border border-sky-200/70 dark:border-sky-800/50 text-[11px] text-slate-600 dark:text-slate-400 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-slate-800 dark:text-slate-200 block">
                Cơ sở tham chiếu theo vùng sinh thái (chưa kiểm chứng riêng từng loài)
              </span>
              <p className="text-slate-500 dark:text-slate-400 text-[10.5px] leading-relaxed">
                Thông tin sinh cảnh phân bố và nguồn tài liệu được tổng hợp theo vùng sinh thái tổng quát (Khu DTSQ Cần Giờ, VQG Côn Đảo, nông nghiệp Củ Chi - Hóc Môn và đô thị trung tâm), không đại diện cho phiếu điều tra thực địa riêng cho từng loài riêng biệt.
              </p>
            </div>
          </div>

          {/* Danh sách thẻ chi tiết các loài */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[620px] overflow-y-auto pr-1 custom-scrollbar">
            {filteredSpecies.map((sp) => (
              <div
                key={sp.id}
                onClick={() =>
                  onOpenDetail({
                    title: `${sp.name} (${sp.scientificName})`,
                    imageUrl: sp.imageUrl,
                    category: `Hồ sơ loài - ${
                      sp.realm === 'underwater'
                        ? 'Sinh vật biển & thủy sinh'
                        : sp.realm === 'aerial'
                        ? 'Sinh vật trên không'
                        : sp.realm === 'terrestrial'
                        ? 'Động thực vật trên cạn'
                        : 'Lưỡng cư & bò sát'
                    }`,
                    description: `${sp.group} • Bảo tồn: ${sp.conservationStatus}`,
                    details: [
                      `Tên thông dụng: ${sp.name}`,
                      `Danh pháp khoa học quốc tế: ${sp.scientificName}`,
                      `Phân loại nhóm: ${sp.group}`,
                      `Khu vực & sinh cảnh phân bố: ${sp.habitat}`,
                      `Đặc điểm sinh học nhận dạng: ${sp.keyFeatures}`,
                      `Vai trò sinh thái & giá trị bảo tồn: ${sp.ecologicalRole}`,
                      `Cơ sở tham chiếu theo vùng sinh thái (chưa kiểm chứng riêng từng loài): ${sp.source}`,
                      `Phương thức đối chiếu thông tin: ${sp.verificationMethod}`,
                      `Tình trạng kinh doanh & Khung pháp lý: ${
                        sp.commercialStatus === 'permitted_free'
                          ? '🟢 ĐƯỢC PHÉP KINH DOANH & NUÔI TRỒNG TỰ DO (Đặc sản OCOP, thủy hải sản, hoa kiểng, nông lâm nghiệp bền vững)'
                          : sp.commercialStatus === 'conditional_farming'
                          ? '🟡 GÂY NUÔI THƯƠNG MẠI CÓ ĐIỀU KIỆN (Bắt buộc đăng ký Mã số cơ sở nuôi với Chi cục Kiểm lâm TP.HCM, chứng minh nguồn giống F2 theo Nghị định 06/2019/NĐ-CP & CITES)'
                          : '🔴 NGHIÊM CẤM KINH DOANH DƯỚI MỌI HÌNH THỨC (Loài nguy cấp Sách Đỏ / CITES I / Nhóm IB; vi phạm bị truy cứu trách nhiệm hình sự Điều 244 BLHS)'
                      }`,
                      sp.commercialProducts && sp.commercialProducts.length > 0
                        ? `Sản phẩm thương phẩm tiêu biểu: ${sp.commercialProducts.join('; ')}`
                        : '',
                      sp.commercialFarmingLocation ? `Địa bàn sản xuất / nuôi trồng chính: ${sp.commercialFarmingLocation}` : '',
                      sp.legalFramework ? `Căn cứ pháp lý & Nghị định quản lý: ${sp.legalFramework}` : '',
                      sp.economicValue ? `Giá trị kinh tế & Thị trường: ${sp.economicValue}` : '',
                      sp.commercialNotes ? `Lưu ý & cảnh báo thực thi: ${sp.commercialNotes}` : '',
                    ].filter(Boolean),
                    tips: [
                      sp.commercialStatus === 'permitted_free'
                        ? 'Tuân thủ quy chuẩn chất lượng OCOP, VietGAP và chuỗi cung ứng bền vững.'
                        : sp.commercialStatus === 'conditional_farming'
                        ? 'Đăng ký đầy đủ mã số trại nuôi với Kiểm lâm và báo cáo biến động đàn định kỳ.'
                        : 'Không mua bán tiêu thụ động vật hoang dã quý hiếm. Báo tin vi phạm qua (028) 3844 1447.',
                    ],
                  })
                }
                className="p-3 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200/90 dark:border-slate-750 hover:border-sky-500 dark:hover:border-sky-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between gap-2.5 text-left group"
              >
                {/* Ảnh đại diện loài */}
                <div className="relative w-full h-36 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                  {sp.imageUrl ? (
                    <img
                      src={sp.imageUrl}
                      alt={sp.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl">
                      {sp.realm === 'underwater' ? '🌊' : sp.realm === 'aerial' ? '🦅' : sp.realm === 'terrestrial' ? '🌳' : '🐸'}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  
                  <span
                    className={`absolute top-2 right-2 text-[9.5px] font-bold px-2 py-0.5 rounded-full shadow-xs backdrop-blur-md ${
                      sp.conservationStatus.includes('Sách Đỏ') ||
                      sp.conservationStatus.includes('CR') ||
                      sp.conservationStatus.includes('EN') ||
                      sp.conservationStatus.includes('VU')
                        ? 'bg-rose-900/85 text-rose-100 border border-rose-300/30'
                        : 'bg-emerald-900/85 text-emerald-100 border border-emerald-300/30'
                    }`}
                  >
                    {sp.conservationStatus.split('-')[0].trim()}
                  </span>

                  <span className="absolute bottom-2 left-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/60 text-white backdrop-blur-xs">
                    {sp.group}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                        {sp.name}
                      </h4>
                      <span className="text-[11px] italic text-slate-500 dark:text-slate-400 font-serif">
                        ({sp.scientificName})
                      </span>
                    </div>
                    <span className="text-[10.5px] font-medium text-slate-500 dark:text-slate-400 block mt-0.5">
                      {sp.habitat}
                    </span>
                  </div>
                </div>

                {/* Huy hiệu pháp lý kinh doanh & Sản phẩm */}
                {sp.commercialStatus && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      className={`text-[9.5px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 ${
                        sp.commercialStatus === 'permitted_free'
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                          : sp.commercialStatus === 'conditional_farming'
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                          : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                      }`}
                    >
                      {sp.commercialStatus === 'permitted_free'
                        ? '🟢 Kinh doanh / OCOP'
                        : sp.commercialStatus === 'conditional_farming'
                        ? '🟡 Nuôi có phép F2'
                        : '🔴 Cấm kinh doanh'}
                    </span>
                    {sp.commercialProducts && sp.commercialProducts.length > 0 && (
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[220px]">
                        SP: {sp.commercialProducts.slice(0, 2).join(' • ')}
                      </span>
                    )}
                  </div>
                )}

                <div className="text-[11.5px] text-slate-600 dark:text-slate-300 space-y-1 leading-relaxed">
                  <p className="line-clamp-2">
                    <strong className="text-slate-700 dark:text-slate-200">Đặc điểm:</strong> {sp.keyFeatures}
                  </p>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400 line-clamp-1">
                    <strong className="text-slate-700 dark:text-slate-200">Vai trò:</strong> {sp.ecologicalRole}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1.5 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    {sp.realm === 'underwater'
                      ? '🌊 Biển & Nước'
                      : sp.realm === 'aerial'
                      ? '🦅 Trên không'
                      : sp.realm === 'terrestrial'
                      ? '🌳 Trên cạn'
                      : '🐸 Lưỡng cư'}
                  </span>
                  <span className="text-sky-600 dark:text-sky-400 group-hover:translate-x-0.5 transition-transform font-bold text-[11px] flex items-center gap-1">
                    Xem hồ sơ chi tiết &rarr;
                  </span>
                </div>
              </div>
            ))}

            {filteredSpecies.length === 0 && (
              <div className="col-span-full p-8 text-center text-xs text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                Không tìm thấy loài nào khớp với từ khóa "{speciesSearchQuery}".
              </div>
            )}
          </div>
        </div>
      )}

      {/* NỘI DUNG SUB-TAB: QUẢN LÝ CÁC LOÀI CÓ THỂ KINH DOANH & KHUNG PHÁP LÝ (TP.HCM & CÔN ĐẢO) */}
      {activeSubTab === 'commercial' && (
        <div className="flex flex-col gap-4">
          {/* Header giải thích khung pháp lý quy chuẩn */}
          <div className="p-4 bg-gradient-to-r from-indigo-50/90 via-sky-50/70 to-emerald-50/90 dark:from-indigo-950/40 dark:via-sky-950/30 dark:to-emerald-950/40 border border-indigo-200/80 dark:border-indigo-800/60 rounded-2xl">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-indigo-600 text-white rounded-xl shrink-0 mt-0.5 shadow-xs">
                <Scale className="w-5 h-5" />
              </div>
              <div className="flex-1 space-y-1 text-xs">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-black text-slate-900 dark:text-slate-100">
                    Khung Pháp Lý Quản Lý Sinh Vật Kinh Doanh & Động Thực Vật Hoang Dã
                  </h3>
                  <span className="text-[10.5px] font-bold px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800">
                    Cập nhật 2024 - 2026
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Căn cứ <strong>Nghị định 06/2019/NĐ-CP</strong> (sửa đổi bởi <strong>Nghị định 84/2021/NĐ-CP</strong>), <strong>Luật Thủy sản 2017</strong>, <strong>Luật Chăn nuôi 2018</strong> và <strong>Điều 244 Bộ luật Hình sự</strong>. Toàn bộ các loài sinh vật trên địa bàn TP.HCM & Côn Đảo được phân định chính xác theo 3 nhóm chế tài:
                </p>
              </div>
            </div>

            {/* 3 Thẻ tóm tắt nhóm phân loại pháp lý */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-3.5">
              <div
                onClick={() => setCommercialStatusFilter('permitted_free')}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  commercialStatusFilter === 'permitted_free'
                    ? 'bg-emerald-100/80 dark:bg-emerald-950/90 border-emerald-500 shadow-xs ring-2 ring-emerald-500/20'
                    : 'bg-white/80 dark:bg-slate-900/80 border-emerald-200 dark:border-emerald-800/70 hover:bg-emerald-50/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                    <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    Kinh Doanh Tự Do / OCOP
                  </span>
                  <span className="text-xs font-black px-2 py-0.5 rounded-full bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-100">
                    {COMMERCIAL_SPECIES_STATS.permittedCount} loài
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1.5 leading-snug">
                  Đặc sản nông lâm thủy sản, hoa kiểng, cá cảnh OCOP. Nuôi trồng, chế biến và phân phối tự do tuân thủ an toàn thực phẩm.
                </p>
              </div>

              <div
                onClick={() => setCommercialStatusFilter('conditional_farming')}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  commercialStatusFilter === 'conditional_farming'
                    ? 'bg-amber-100/80 dark:bg-amber-950/90 border-amber-500 shadow-xs ring-2 ring-amber-500/20'
                    : 'bg-white/80 dark:bg-slate-900/80 border-amber-200 dark:border-amber-800/70 hover:bg-amber-50/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-amber-600 shrink-0" />
                    Gây Nuôi Có Điều Kiện
                  </span>
                  <span className="text-xs font-black px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100">
                    {COMMERCIAL_SPECIES_STATS.conditionalCount} loài
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1.5 leading-snug">
                  Bắt buộc đăng ký Mã số cơ sở nuôi với Chi cục Kiểm lâm TP.HCM, chứng minh giống F2 hợp pháp, mở sổ theo dõi tăng giảm đàn.
                </p>
              </div>

              <div
                onClick={() => setCommercialStatusFilter('strictly_prohibited')}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  commercialStatusFilter === 'strictly_prohibited'
                    ? 'bg-rose-100/80 dark:bg-rose-950/90 border-rose-500 shadow-xs ring-2 ring-rose-500/20'
                    : 'bg-white/80 dark:bg-slate-900/80 border-rose-200 dark:border-rose-800/70 hover:bg-rose-50/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    Cấm Tuyệt Đối Kinh Doanh
                  </span>
                  <span className="text-xs font-black px-2 py-0.5 rounded-full bg-rose-200 dark:bg-rose-900 text-rose-900 dark:text-rose-100">
                    {COMMERCIAL_SPECIES_STATS.prohibitedCount} loài
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1.5 leading-snug">
                  Loài nguy cấp CITES I / Nhóm IB / Sách Đỏ. Mọi hành vi săn bắt, tàng trữ, buôn bán bị xử phạt tù theo Điều 244 BLHS.
                </p>
              </div>
            </div>
          </div>

          {/* 6 Ngành kinh tế & chuỗi giá trị mũi nhọn tại TP.HCM */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                <span>6 Chuỗi Giá Trị Sinh Thái & OCOP Nông Nghiệp Đô Thị TP.HCM</span>
              </h4>
              <span className="text-[10.5px] text-slate-500 dark:text-slate-400">
                Mô hình kinh tế xanh & sinh thái đô thị
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {COMMERCIAL_SPECIES_STATS.keyExportSectors.map((sector, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setCommercialSearchQuery(sector.title.split(' ')[0]);
                  }}
                  className="p-3 rounded-xl bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-750 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-xs transition-all cursor-pointer text-left"
                >
                  <div className="flex items-start justify-between gap-1.5">
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-1">
                      {sector.title}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 shrink-0">
                      OCOP / Chuỗi giá trị
                    </span>
                  </div>
                  <p className="mt-1.5 text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {sector.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Thanh công cụ tìm kiếm và lọc */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                id="search-commercial-species-input"
                value={commercialSearchQuery}
                onChange={(e) => setCommercialSearchQuery(e.target.value)}
                placeholder="Tìm tên loài, thương phẩm (mật dừa, yến sào, cá sấu, hoa lan...), địa bàn Cần Giờ, Củ Chi..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
              />
              {commercialSearchQuery && (
                <button
                  type="button"
                  onClick={() => setCommercialSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Lọc trạng thái kinh doanh */}
            <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
              {[
                { id: 'all', label: 'Tất cả' },
                { id: 'permitted_free', label: '🟢 Tự do / OCOP' },
                { id: 'conditional_farming', label: '🟡 Nuôi có phép F2' },
                { id: 'strictly_prohibited', label: '🔴 Cấm tuyệt đối' },
              ].map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setCommercialStatusFilter(st.id as any)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    commercialStatusFilter === st.id
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          {/* Lọc phân hệ sinh thái */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
            {[
              { id: 'all', label: 'Tất cả hệ sinh thái' },
              { id: 'underwater', label: '🌊 Biển & Thủy sinh' },
              { id: 'aerial', label: '🦅 Trên không' },
              { id: 'terrestrial', label: '🌳 Động thực vật cạn' },
              { id: 'amphibian', label: '🐸 Lưỡng cư & bò sát' },
            ].map((realm) => (
              <button
                key={realm.id}
                type="button"
                onClick={() => setCommercialRealmFilter(realm.id as any)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                  commercialRealmFilter === realm.id
                    ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 hover:text-slate-800'
                }`}
              >
                {realm.label}
              </button>
            ))}
          </div>

          {/* Lưới danh sách loài kinh doanh chi tiết */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[620px] overflow-y-auto pr-1 custom-scrollbar">
            {filteredCommercialSpecies.map((sp) => (
              <div
                key={sp.id}
                onClick={() =>
                  onOpenDetail({
                    title: `${sp.name} (${sp.scientificName})`,
                    imageUrl: sp.imageUrl,
                    category: `Hồ sơ pháp lý & thương mại - ${
                      sp.commercialStatus === 'permitted_free'
                        ? 'Được kinh doanh & khai thác bền vững'
                        : sp.commercialStatus === 'conditional_farming'
                        ? 'Gây nuôi thương mại có điều kiện'
                        : 'Nghiêm cấm kinh doanh tuyệt đối'
                    }`,
                    description: `${sp.group} • ${sp.commercialLabel || sp.conservationStatus}`,
                    details: [
                      `Tên thông dụng: ${sp.name}`,
                      `Danh pháp khoa học: ${sp.scientificName}`,
                      `Tình trạng bảo tồn Sách Đỏ: ${sp.conservationStatus}`,
                      `Quy chế kinh doanh & quản lý: ${
                        sp.commercialStatus === 'permitted_free'
                          ? '🟢 ĐƯỢC KINH DOANH & NUÔI TRỒNG TỰ DO: Được phép tổ chức nuôi trồng, đánh bắt bền vững, sơ chế biến và thương mại tự do.'
                          : sp.commercialStatus === 'conditional_farming'
                          ? '🟡 GÂY NUÔI CÓ ĐIỀU KIỆN (CITES II / NHÓM IIB): Bắt buộc phải đăng ký Mã số cơ sở nuôi động thực vật hoang dã với Chi cục Kiểm lâm TP.HCM, xuất trình hồ sơ nguồn gốc hợp pháp F2.'
                          : '🔴 NGHIÊM CẤM KINH DOANH DƯỚI MỌI HÌNH THỨC: Nghiêm cấm tuyệt đối mọi hành vi săn bắt, tàng trữ, buôn bán, quảng cáo. Vi phạm bị truy cứu trách nhiệm hình sự Điều 244 BLHS.'
                      }`,
                      sp.commercialProducts && sp.commercialProducts.length > 0
                        ? `Sản phẩm thương phẩm: ${sp.commercialProducts.join('; ')}`
                        : '',
                      sp.commercialFarmingLocation
                        ? `Địa bàn sản xuất / nuôi trồng chính: ${sp.commercialFarmingLocation}`
                        : '',
                      sp.legalFramework
                        ? `Căn cứ pháp lý & Nghị định: ${sp.legalFramework}`
                        : '',
                      sp.economicValue
                        ? `Giá trị kinh tế & Thị trường: ${sp.economicValue}`
                        : '',
                      sp.commercialNotes
                        ? `Lưu ý & Khuyến nghị thực thi: ${sp.commercialNotes}`
                        : '',
                      `Khu vực & sinh cảnh: ${sp.habitat}`,
                      `Đặc điểm nhận diện: ${sp.keyFeatures}`,
                      `Vai trò sinh thái: ${sp.ecologicalRole}`,
                    ].filter(Boolean),
                    tips: [
                      sp.commercialStatus === 'permitted_free'
                        ? 'Đẩy mạnh đăng ký bảo hộ nhãn hiệu chứng nhận OCOP và thực hành chuỗi cung ứng hữu cơ đạt chuẩn VietGAP/MSC.'
                        : sp.commercialStatus === 'conditional_farming'
                        ? 'Mở sổ theo dõi tăng giảm đàn hàng quý, báo cáo Chi cục Kiểm lâm TP.HCM định kỳ và không săn bắt bổ sung cá thể hoang dã trái phép.'
                        : 'Không mua bán tiêu thụ động vật hoang dã quý hiếm. Khi phát hiện vi phạm, báo ngay đường dây nóng Kiểm lâm TP.HCM: (028) 3844 1447.',
                    ],
                  })
                }
                className={`p-3.5 rounded-2xl bg-white dark:bg-slate-850 border transition-all cursor-pointer flex flex-col justify-between gap-2.5 text-left group hover:shadow-md ${
                  sp.commercialStatus === 'permitted_free'
                    ? 'border-emerald-200/90 dark:border-emerald-900/60 hover:border-emerald-500'
                    : sp.commercialStatus === 'conditional_farming'
                    ? 'border-amber-200/90 dark:border-amber-900/60 hover:border-amber-500'
                    : 'border-rose-200/90 dark:border-rose-900/60 hover:border-rose-500'
                }`}
              >
                {/* Ảnh đại diện & huy hiệu pháp lý */}
                <div className="relative w-full h-36 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
                  {sp.imageUrl ? (
                    <img
                      src={sp.imageUrl}
                      alt={sp.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl">
                      {sp.realm === 'underwater' ? '🌊' : sp.realm === 'aerial' ? '🦅' : sp.realm === 'terrestrial' ? '🌳' : '🐸'}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  <span
                    className={`absolute top-2 right-2 text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs backdrop-blur-md flex items-center gap-1 ${
                      sp.commercialStatus === 'permitted_free'
                        ? 'bg-emerald-900/85 text-emerald-100 border border-emerald-300/40'
                        : sp.commercialStatus === 'conditional_farming'
                        ? 'bg-amber-900/85 text-amber-100 border border-amber-300/40'
                        : 'bg-rose-900/85 text-rose-100 border border-rose-300/40'
                    }`}
                  >
                    {sp.commercialStatus === 'permitted_free' ? (
                      <>
                        <BadgeCheck className="w-3 h-3 text-emerald-300" />
                        <span>Được kinh doanh / OCOP</span>
                      </>
                    ) : sp.commercialStatus === 'conditional_farming' ? (
                      <>
                        <FileCheck className="w-3 h-3 text-amber-300" />
                        <span>Gây nuôi có phép F2</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-3 h-3 text-rose-300" />
                        <span>Cấm kinh doanh</span>
                      </>
                    )}
                  </span>

                  <span className="absolute bottom-2 left-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/60 text-white backdrop-blur-xs">
                    {sp.group}
                  </span>
                </div>

                <div>
                  {/* Hàng trên: Tên loài */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="text-sm font-black text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {sp.name}
                        </h4>
                        <span className="text-[11px] italic text-slate-500 dark:text-slate-400 font-serif">
                          ({sp.scientificName})
                        </span>
                      </div>
                      <span className="text-[10.5px] font-medium text-slate-500 dark:text-slate-400 block mt-0.5">
                        {sp.habitat}
                      </span>
                    </div>
                  </div>

                  {/* Danh mục sản phẩm thương phẩm (nếu có) */}
                  {sp.commercialProducts && sp.commercialProducts.length > 0 && (
                    <div className="mt-2 flex items-center gap-1 flex-wrap">
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">Sản phẩm:</span>
                      {sp.commercialProducts.map((prod, pIdx) => (
                        <span
                          key={pIdx}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                        >
                          {prod}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Địa bàn nuôi trồng & Căn cứ pháp lý */}
                  <div className="mt-2 space-y-1 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    {sp.commercialFarmingLocation && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span><strong>Địa bàn:</strong> {sp.commercialFarmingLocation}</span>
                      </div>
                    )}
                    {sp.legalFramework && (
                      <div className="flex items-start gap-1.5">
                        <Scale className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1"><strong>Pháp lý:</strong> {sp.legalFramework}</span>
                      </div>
                    )}
                    {sp.economicValue && (
                      <div className="flex items-start gap-1.5 text-slate-700 dark:text-slate-200">
                        <ShoppingBag className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1"><strong>Giá trị:</strong> {sp.economicValue}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer card */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-[10.5px] text-slate-400 font-medium">
                    {sp.commercialLabel || sp.conservationStatus}
                  </span>
                  <span className="text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform font-bold text-[11px] flex items-center gap-1">
                    Xem hồ sơ pháp lý &rarr;
                  </span>
                </div>
              </div>
            ))}

            {filteredCommercialSpecies.length === 0 && (
              <div className="col-span-full p-8 text-center text-xs text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
                Không tìm thấy loài nào khớp với bộ lọc hoặc từ khóa "{commercialSearchQuery}".
              </div>
            )}
          </div>
        </div>
      )}

      {/* NỘI DUNG SUB-TAB: BIỂU ĐỒ XU HƯỚNG TĂNG GIẢM SINH VẬT (2023 - 2026) */}
      {activeSubTab === 'trend' && (
        <BiodiversityTrendChart onOpenDetail={onOpenDetail} />
      )}

      {/* 4. NỘI DUNG SUB-TAB 2: TRA CỨU QUẦN XÃ SINH VẬT 168 XÃ/PHƯỜNG */}
      {activeSubTab === 'wards' && (
        <div className="flex flex-col gap-3">
          {/* Bộ lọc theo 3 khu vực lớn và ô tìm kiếm */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {/* Ô tìm kiếm */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                id="search-ward-biodiversity-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm phường, xã, đặc khu..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter 3 nhóm khu vực theo Nghị quyết 1685 */}
            <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
              {HCM_DISTRICT_GROUPS.map((group) => {
                const isSelected = regionFilter === group;
                return (
                  <button
                    key={group}
                    type="button"
                    onClick={() => setRegionFilter(group)}
                    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {group}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>
              Hiển thị <strong>{filteredDistricts.length}</strong> / 168 đơn vị hành chính
            </span>
            <span className="text-[11px] italic">
              * Bấm vào địa bàn để xem chi tiết hoặc đặt làm vị trí quan trắc
            </span>
          </div>

          {/* Danh sách các phường/xã kèm thông số Quần xã sinh vật */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 border border-slate-200/80 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 custom-scrollbar">
            {filteredDistricts.map((d) => {
              const isCurrent = d.id === currentDistrictId;
              const wardHab = getWardHabitatSummary(d.id, d.name, d.districtGroup);

              return (
                <div
                  key={d.id}
                  id={`ward-item-${d.id}`}
                  className={`p-3 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 ${
                    isCurrent
                      ? 'bg-blue-50/60 dark:bg-blue-950/40 border-l-4 border-l-blue-600'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h6 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                        {d.name}
                      </h6>
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {d.adminType}
                      </span>
                      <span className="text-[9.5px] font-semibold px-1.5 py-0.5 rounded-md border bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700">
                        Tham khảo sinh cảnh vùng
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold">
                          Đang xem
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {d.subTitle}
                    </p>

                    {/* Mô tả định tính theo sinh cảnh vùng */}
                    <div className="flex items-center gap-2 mt-1.5 text-[11px] flex-wrap">
                      <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-md text-[10.5px]">
                        <Compass className="w-3 h-3 text-emerald-600" />
                        {wardHab.habitatZone}
                      </span>
                      <span className="text-slate-600 dark:text-slate-300 text-[10.5px]">
                        {wardHab.habitatDescription}
                      </span>
                      <span className="text-slate-400 dark:text-slate-500 text-[10px] italic">
                        ({wardHab.disclaimer})
                      </span>
                    </div>
                  </div>

                  {/* Nút thao tác nhanh */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      type="button"
                      id={`btn-inspect-ward-${d.id}`}
                      onClick={() => {
                        const geo = getGeologySubsidenceRecord(d.id, d.name, d.location?.lat, d.location?.lng);
                        onOpenDetail({
                          title: `Hồ sơ Sinh cảnh & Địa chất tại ${d.name}`,
                          category: 'Tham khảo sinh cảnh vùng',
                          description: `${wardHab.habitatZone} — ${wardHab.disclaimer}`,
                          details: [
                            `Mô tả sinh cảnh vùng: ${wardHab.habitatDescription}.`,
                            `Ghi chú phương pháp: ${wardHab.disclaimer}.`,
                            'Cơ sở dữ liệu: Không hiển thị số đếm loài theo khuôn mẫu cấp phường để tránh sai lệch khoa học và đếm lặp loài.',
                            `Đặc điểm địa chất: Hệ tầng ${geo.geology.formationName} (${geo.geology.lithology}) - Sức chịu tải: ${geo.geology.bearingCapacity}.`,
                            `Địa hình mô hình số DEM: ${geo.topography.elevationMsl} (${geo.topography.terrainType}).`,
                            `Biến động bề mặt InSAR: ${geo.subsidence.insarRateMmYear || 'Chưa có mốc đo cục bộ riêng tại phường'} (${geo.subsidence.statusLabel}).`,
                            `Lưu ý bắt buộc InSAR: ${INSAR_MANDATORY_LABEL}.`,
                            `Nguồn dữ liệu: Địa chất (${geo.geology.source}), Viễn thám radar (${geo.subsidence.dataSource}, ${geo.subsidence.surveyMethod}).`,
                          ],
                          tips: [
                            'Tích cực tham gia các phong trào trồng cây xanh và ngày Chủ nhật xanh tại địa phương.',
                            'Không thả các loài sinh vật ngoại lai xâm hại (rùa tai đỏ, ốc bươu vàng, cá dọn bể) ra sông rạch.',
                          ],
                        });
                      }}
                      className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                    >
                      Chi tiết
                    </button>

                    {onSelectDistrict && !isCurrent && (
                      <button
                        type="button"
                        id={`btn-select-ward-${d.id}`}
                        onClick={() => onSelectDistrict(d.id)}
                        className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                        title="Chuyển toàn bộ dữ liệu ứng dụng về địa bàn này"
                      >
                        <MapPin className="w-3 h-3" />
                        <span>Xem vị trí này</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {filteredDistricts.length === 0 && (
              <div className="p-6 text-center text-slate-500 dark:text-slate-400 text-xs">
                Không tìm thấy phường/xã nào khớp với từ khóa "{searchQuery}".
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. NỘI DUNG SUB-TAB 3: DANH MỤC LOÀI NGUY CẤP SÁCH ĐỎ & ĐƯỜNG DÂY NÓNG BẢO VỆ */}
      {activeSubTab === 'endangered' && (
        <div className="flex flex-col gap-3">
          <div className="p-3 bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-800/60 rounded-xl text-xs flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1 text-rose-900 dark:text-rose-200 leading-relaxed">
              <strong>Danh mục loài sinh vật ưu tiên bảo vệ đặc biệt tại địa bàn TP.HCM:</strong>{' '}
              Mọi hành vi săn bắn, buôn bán, bẫy bắt hoặc phá hủy sinh cảnh các loài trong Sách Đỏ đều bị xử lý nghiêm theo Bộ luật Hình sự.
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {ENDANGERED_SPECIES_LIST.map((spec, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 flex flex-col justify-between gap-1.5"
              >
                <div className="flex items-start justify-between gap-1">
                  <strong className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-tight">
                    {spec.name}
                  </strong>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 shrink-0 border border-rose-200 dark:border-rose-800">
                    {spec.level}
                  </span>
                </div>

                <div className="text-[11px] text-slate-600 dark:text-slate-300 space-y-0.5">
                  <div>
                    <span className="text-slate-400">Sinh cảnh:</span> {spec.habitat}
                  </div>
                  <div>
                    <span className="text-slate-400">Tình trạng:</span> {spec.countNote}
                  </div>
                  <div className="text-rose-600 dark:text-rose-400 font-medium">
                    <span>Nguy cơ:</span> {spec.threat}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Đường dây nóng bảo tồn động vật hoang dã */}
          <div className="p-3.5 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-emerald-400 block">
                  Đường dây nóng phản ánh săn bắt & vi phạm sinh thái
                </span>
                <p className="text-[11.5px] text-slate-300 mt-0.5">
                  Chi cục Kiểm lâm TP.HCM: <strong>028.3829.3512</strong> • Tổng đài Quốc gia ENV: <strong>1800 1522</strong> (Miễn cước)
                </p>
              </div>
            </div>

            <a
              href="tel:18001522"
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shrink-0 text-center transition-colors shadow-2xs"
            >
              Gọi 1800 1522
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
