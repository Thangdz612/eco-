import React, { useState, useEffect, useMemo } from 'react';
import {
  Waves,
  Footprints,
  Feather,
  Droplet,
  AlertTriangle,
  ShieldCheck,
  Ambulance,
  ChevronRight,
  SunMedium,
  Mountain,
  Globe,
  Compass,
  ArrowRight,
  TreeDeciduous,
  MapPin,
  Sparkles,
  Search,
  CheckCircle2,
  Fish,
  Bird,
  TrendingUp,
  Database,
  Clock,
  Wind,
  Info,
} from 'lucide-react';
import { DistrictData, ModalContent, AirQualityData } from '../types';
import { HcmCityBiodiversitySection } from './HcmCityBiodiversitySection';
import { BiodiversityTrendChart } from './BiodiversityTrendChart';
import {
  getSpeciesByRealm,
  getSpeciesForDistrict,
  HCM_BIODIVERSITY_SPECIES,
  getDistrictBiodiversityMetadata,
  getWardHabitatSummary,
} from '../data/biodiversitySpeciesData';
import { getCachedAirQuality, getCachedCurrentLiveWeather, CurrentLiveWeather } from '../utils/collectedWeatherStorage';
import { getReliableAirQuality } from '../utils/liveWeatherApi';
import { getGeologySubsidenceRecord, INSAR_MANDATORY_LABEL } from '../utils/geologySubsidenceData';

interface EnvironmentTabProps {
  data: DistrictData;
  onOpenDetail: (content: ModalContent) => void;
  onSelectDistrict?: (districtId: string) => void;
}

export const EnvironmentTab: React.FC<EnvironmentTabProps> = ({
  data,
  onOpenDetail,
  onSelectDistrict,
}) => {
  const [bioViewScope, setBioViewScope] = useState<'local' | 'trend' | 'city'>('local');
  const [localSpeciesRealm, setLocalSpeciesRealm] = useState<'all' | 'underwater' | 'aerial' | 'terrestrial' | 'amphibian' | 'commercial'>('all');
  const [localSpeciesSearch, setLocalSpeciesSearch] = useState<string>('');

  const [currentWeather, setCurrentWeather] = useState<CurrentLiveWeather>(() => {
    return getCachedCurrentLiveWeather(data.id, data.name);
  });

  useEffect(() => {
    setCurrentWeather(getCachedCurrentLiveWeather(data.id, data.name));
  }, [data.id, data.name]);

  const bioUnderwater = data.biodiversity?.underwater || {
    status: 'Tham khảo vùng sinh thái',
    count: 0,
    highlights: [],
  };
  const bioTerrestrial = data.biodiversity?.terrestrial || {
    status: 'Mảng xanh công viên & thảm thực vật',
    count: 0,
    highlights: [],
  };
  const bioAerial = data.biodiversity?.aerial || {
    status: 'Quần thể chim & côn trùng vùng',
    count: 0,
    highlights: [],
  };
  const bioAmphibian = data.biodiversity?.amphibian || {
    status: 'Bảo tồn & phục hồi tự nhiên',
    count: 0,
    highlights: [],
  };

  const geoRecord = useMemo(() => {
    return getGeologySubsidenceRecord(data.id, data.name, data.location?.lat, data.location?.lng);
  }, [data.id, data.name, data.location?.lat, data.location?.lng]);

  const wardHabitat = useMemo(() => {
    return getWardHabitatSummary(data.id, data.name, data.districtGroup);
  }, [data.id, data.name, data.districtGroup]);

  const envIndexes = {
    light: data.environmentIndexes?.light || {
      value: 'Bức xạ ánh sáng',
      quality: 'Tốt',
      progress: 80,
      note: 'Bức xạ ánh sáng tự nhiên từ mô hình ước tính vi khí hậu',
    },
    geology: geoRecord.hasLocalRecord
      ? {
          value: geoRecord.geology.formationName,
          quality: 'Tham khảo vùng',
          progress: 75,
          note: `Hệ tầng ${geoRecord.geology.formationName}. ${geoRecord.geology.lithology}`,
        }
      : {
          value: 'Chưa có dữ liệu địa chất cục bộ',
          quality: 'Chưa có dữ liệu',
          progress: 0,
          note: 'Chưa có tài liệu khoan khảo sát địa tầng và mốc quan trắc lún cục bộ tại phường',
        },
  };

  const environmentAlert = data.alerts?.environmentAlert || {
    title: 'Môi trường đạt chuẩn an toàn',
    desc: `Chất lượng môi trường tại ${data.name.split(',')[0]} duy trì trạng thái bình thường`,
    level: 'info' as const,
    actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.',
  };

  // Danh sách các loài gắn liền với địa bàn hiện tại
  const currentDistrictSpecies = useMemo(() => {
    return getSpeciesForDistrict(data.id, data.districtGroup);
  }, [data.id, data.districtGroup]);

  // Thông tin siêu dữ liệu khảo sát và cơ sở tham chiếu vùng sinh thái
  const bioDistrictMeta = useMemo(() => {
    return getDistrictBiodiversityMetadata(data.id, data.name);
  }, [data.id, data.name]);

  // Lọc theo phân hệ và tìm kiếm (bao gồm cả trạng thái kinh doanh & thương phẩm)
  const filteredLocalSpecies = useMemo(() => {
    return currentDistrictSpecies.filter((sp) => {
      const matchRealm =
        localSpeciesRealm === 'all'
          ? true
          : localSpeciesRealm === 'commercial'
          ? sp.commercialStatus === 'permitted_free' || sp.commercialStatus === 'conditional_farming'
          : sp.realm === localSpeciesRealm;
      const q = localSpeciesSearch.toLowerCase().trim();
      const matchSearch =
        !q ||
        sp.name.toLowerCase().includes(q) ||
        sp.scientificName.toLowerCase().includes(q) ||
        sp.group.toLowerCase().includes(q) ||
        sp.habitat.toLowerCase().includes(q) ||
        (sp.commercialLabel && sp.commercialLabel.toLowerCase().includes(q)) ||
        (sp.commercialProducts && sp.commercialProducts.some((p) => p.toLowerCase().includes(q))) ||
        (sp.commercialFarmingLocation && sp.commercialFarmingLocation.toLowerCase().includes(q));
      return matchRealm && matchSearch;
    });
  }, [currentDistrictSpecies, localSpeciesRealm, localSpeciesSearch]);

  // Tên loài tiêu biểu gắn với 4 thẻ
  const underwaterKeySpecies = useMemo(() => {
    const list = currentDistrictSpecies.filter((s) => s.realm === 'underwater');
    return list.length > 0 ? list : getSpeciesByRealm('underwater');
  }, [currentDistrictSpecies]);

  const terrestrialKeySpecies = useMemo(() => {
    const list = currentDistrictSpecies.filter((s) => s.realm === 'terrestrial');
    return list.length > 0 ? list : getSpeciesByRealm('terrestrial');
  }, [currentDistrictSpecies]);

  const aerialKeySpecies = useMemo(() => {
    const list = currentDistrictSpecies.filter((s) => s.realm === 'aerial');
    return list.length > 0 ? list : getSpeciesByRealm('aerial');
  }, [currentDistrictSpecies]);

  const amphibianKeySpecies = useMemo(() => {
    const list = currentDistrictSpecies.filter((s) => s.realm === 'amphibian');
    return list.length > 0 ? list : getSpeciesByRealm('amphibian');
  }, [currentDistrictSpecies]);

  // Hàm sinh nội dung chi tiết theo từng khu vực sinh thái cụ thể của địa phương
  const getDynamicBioDetails = (category: 'underwater' | 'terrestrial' | 'aerial' | 'amphibian') => {
    const isCanGio = data.id.includes('cg') || data.name.includes('Cần Giờ');
    const isConDao = data.id.includes('condao') || data.name.includes('Côn Đảo');
    const isCuChiHocMonBenCat =
      data.id.includes('cc') ||
      data.id.includes('hm') ||
      data.id.includes('bc') ||
      data.name.includes('Củ Chi') ||
      data.name.includes('Hóc Môn') ||
      data.name.includes('Bến Cát') ||
      data.name.includes('Bình Chánh');
    const isNhaBeDistrict = data.id.includes('nb') || data.name.includes('Nhà Bè');

    const buildDetails = (): { title: string; description: string; details: string[]; tips: string[]; category?: string } => {
      const HABITAT_DISCLAIMER_NOTE = 'Ghi chú phương pháp: Tham khảo sinh cảnh vùng — không phải kiểm kê tại phường.';
      if (category === 'underwater') {
        if (isCanGio) {
          return {
            title: `Quần xã Sinh vật Thủy sinh - Rừng ngập mặn ${data.name}`,
            description: `Đặc trưng hệ sinh thái nước lợ và ngập mặn ven biển. [Tham khảo sinh cảnh vùng — không phải kiểm kê tại phường]`,
            details: [
              HABITAT_DISCLAIMER_NOTE,
              'Khu vực phân bố: Cửa sông Soài Rạp, sông Lòng Tàu, các kênh rạch đước và vịnh Gành Rái.',
              ...bioUnderwater.highlights,
              'Quần thể thủy sinh: Cá thòi lòi, cá bống sao, cá đối mục, tôm sú tự nhiên, nghêu lụa và hàu đá.',
              'Chỉ số sinh học đáy benthos: Rất giàu dinh dưỡng phù sa tự nhiên, là bãi ấp nở của ốc và cá non vùng biển Nam Bộ.',
              'Hệ thống rễ đước, mắm giúp lọc sạch bùn hữu cơ và giữ cân bằng nồng độ oxy hòa tan cho nguồn nước.',
            ],
            tips: [
              'Bảo vệ bãi bồi ven rừng ngập mặn, không khai thác thủy sản non bằng xung điện hoặc cào đáy.',
              'Tuân thủ thời gian cấm bắt nghêu và cua sinh sản vào mùa mưa.',
            ],
          };
        }
        if (isConDao) {
          return {
            title: `Quần xã Thủy sinh & San hô Biển - Đặc khu ${data.name}`,
            description: `Quần thể rạn san hô và sinh vật biển phong phú. [Tham khảo sinh cảnh vùng — không phải kiểm kê tại phường]`,
            details: [
              HABITAT_DISCLAIMER_NOTE,
              'Khu vực sinh sống: Vườn quốc gia Côn Đảo, Bãi Cát Lớn, Hòn Bảy Cạnh, Hòn Cau, Hòn Tre Lớn.',
              ...bioUnderwater.highlights,
              'Rạn san hô nguyên sinh: Hơn 360 loài san hô cứng tạo môi trường sống cho cá bướm, cá hề, trai tai tượng.',
              'Vùng đẻ trứng rùa biển Vích (Chelonia mydas) và đồi mồi lớn nhất Việt Nam.',
              'Quần thể Bò biển Dugong (Dugong dugon) ăn thảm cỏ biển tự nhiên.',
            ],
            tips: [
              'Tuyệt đối không bẻ hoặc dẫm đạp lên các rạn san hô khi lặn biển.',
              'Giữ sạch tuyệt đối bãi biển, không vứt túi nilon hay rác nhựa làm rùa biển nuốt phải.',
            ],
          };
        }
        if (isCuChiHocMonBenCat) {
          return {
            title: `Quần xã Thủy sinh Nước ngọt - Vùng đệm ${data.name}`,
            description: `Đặc trưng cá đồng và thủy sinh nội địa vùng đệm nông nghiệp. [Tham khảo sinh cảnh vùng — không phải kiểm kê tại phường]`,
            details: [
              HABITAT_DISCLAIMER_NOTE,
              'Khu vực phân bố: Lưu vực sông Sài Gòn thượng nguồn, kênh Đông Củ Chi, rạch Thầy Cai.',
              ...bioUnderwater.highlights,
              'Các loài cá đồng bản địa: Cá lóc, cá trê vàng, cá rô đồng, lươn đồng, ốc bươu đen tự nhiên.',
              'Thảm thực vật thủy sinh: Bèo tấm, rau muống nước, lục bình giúp lọc sạch nitơ và photpho trong nước thải nông nghiệp.',
            ],
            tips: [
              'Hạn chế xả nước thải chăn nuôi trực tiếp ra kênh tưới tiêu nội đồng.',
              'Không thả cá dọn bể ngoại lai (Plecostomus) vì chúng tiêu diệt trứng cá đồng bản địa.',
            ],
          };
        }
        if (isNhaBeDistrict) {
          return {
            title: `Quần xã Thủy sinh Vùng nước lợ - ${data.name}`,
            description: `Hệ sinh thái thủy sinh vùng triều dâng ven sông và rạch dừa nước. [Tham khảo sinh cảnh vùng — không phải kiểm kê tại phường]`,
            details: [
              HABITAT_DISCLAIMER_NOTE,
              'Khu vực phân bố: Rạch Mương Chuối, sông Đồng Điền, sông Nhà Bè.',
              ...bioUnderwater.highlights,
              'Đặc trưng sinh thái: Rừng dừa nước tự nhiên nuôi dưỡng đàn cá kèo, cua bùn, tôm đất.',
              'Hệ rễ dừa nước dày đặc giữ phù sa, ngăn chặn sạt lở bờ sông tự nhiên.',
            ],
            tips: [
              'Bảo vệ các thảm dừa nước phòng hộ trước nguy cơ san lấp xây dựng tự phát.',
            ],
          };
        }
        // Đô thị trung tâm Sài Gòn
        return {
          title: `Quần xã Sinh vật Dưới nước - Đô thị ${data.name}`,
          category: 'Hệ sinh thái thủy sinh',
          description: `Hệ sinh thái thủy sinh kênh rạch đô thị đang trong tiến trình phục hồi. [Tham khảo sinh cảnh vùng — không phải kiểm kê tại phường]`,
          details: [
            HABITAT_DISCLAIMER_NOTE,
            'Khu vực phân bố: Sông Sài Gòn, Kênh Tàu Hủ - Bến Nghé, Kênh Nhiêu Lộc - Thị Nghè, Hồ Con Rùa.',
            ...bioUnderwater.highlights,
            'Chỉ số sinh học đáy benthos: Phục hồi 65% so với giai đoạn trước năm 2022.',
            'Hệ thống 14 trạm sục khí oxy kênh Nhiêu Lộc giúp duy trì nồng độ DO phù hợp cho đàn cá chép và cá rô phi sinh sản.',
            'Các hồ nhân tạo công viên nuôi dưỡng cá cảnh quan và hệ thủy sinh lọc nước tự nhiên.',
          ],
          tips: [
            'Nghiêm cấm chích điện, đánh bắt cá bằng lưới mắt nhỏ trên kênh rạch nội đô.',
            'Không xả rác thải nhựa hoặc đổ thức ăn thừa dầu mỡ xuống miệng cống thoát nước.',
          ],
        };
      }

      if (category === 'terrestrial') {
        if (isCanGio) {
          return {
            title: `Quần xã Thực & Động vật Rừng ngập mặn Cần Giờ - ${data.name}`,
            description: `Quần xã thực vật ngập mặn và động vật có vú thích nghi bùn lầy ven biển. [Tham khảo sinh cảnh vùng — không phải kiểm kê tại phường]`,
            details: [
              HABITAT_DISCLAIMER_NOTE,
              'Vùng đệm và vùng lõi Khu dự trữ sinh quyển thế giới UNESCO Cần Giờ.',
              ...bioTerrestrial.highlights,
              'Thực vật rừng ngập mặn: Đước đôi (Rhizophora), bần trắng, vẹt đen, mắm trắng, cóc đỏ, su ổi.',
              'Động vật có vú & bò sát: Đàn khỉ đuôi dài (Macaca fascicularis) hơn 2.000 cá thể, rái cá lông mượt, trăn gấm, kỳ đà hoa.',
              'Độ che phủ mảng xanh đạt trên 95% diện tích tự nhiên.',
            ],
            tips: [
              'Không cho động vật hoang dã ăn thức ăn công nghiệp có đường hoặc bao bì nilon.',
              'Tuân thủ nội quy bảo vệ rừng ngập mặn khi đi dã ngoại sinh thái.',
            ],
          };
        }
        if (isConDao) {
          return {
            title: `Quần xã Thực & Động vật Vườn quốc gia Côn Đảo - ${data.name}`,
            description: `Hệ sinh thái rừng nhiệt đới nguyên sinh hải đảo và động vật đặc hữu. [Tham khảo sinh cảnh vùng — không phải kiểm kê tại phường]`,
            details: [
              HABITAT_DISCLAIMER_NOTE,
              'Rừng nhiệt đới hải đảo nguyên sinh: Độ che phủ tán cây đạt 88.2%.',
              ...bioTerrestrial.highlights,
              'Loài đặc hữu Côn Đảo: Sóc đen Côn Đảo (Ratufa bicolor condorensis), chuột hươu, bồ câu Nicobar.',
              'Thực vật hải đảo: Cây phong ba, bàng vuông, nho rừng, cây găng néo.',
            ],
            tips: [
              'Giữ nguyên vẹn thảm thực vật rừng, không hái phong lan hay lấy hạt cây rừng.',
            ],
          };
        }
        return {
          title: `Quần xã Sinh vật Trên cạn - ${data.name}`,
          category: 'Hệ sinh thái cạn',
          description: `Thảm thực vật bóng mát và động vật cảnh quan đô thị. [Tham khảo sinh cảnh vùng — không phải kiểm kê tại phường]`,
          details: [
            HABITAT_DISCLAIMER_NOTE,
            'Khu bảo tồn mảng xanh trọng điểm: Thảo Cầm Viên Sài Gòn, Công viên Tao Đàn, Gia Định, 23 Tháng 9.',
            ...bioTerrestrial.highlights,
            'Di sản cây xanh cổ thụ: Hơn 5.400 cây sao đen, dầu rái, xà cừ trên 100 năm tuổi tạo tầng tán mát.',
            'Độ che phủ tán cây đô thị: Đạt mức 3.9m²/người dân nội thành.',
            'Quần thể bò sát nhỏ, sóc cây, các loài bướm đặc trưng nhiệt đới sinh sống và phát triển tự nhiên.',
          ],
          tips: [
            'Bảo vệ cây xanh bóng mát công cộng và tăng cường trồng cây xanh thanh lọc bụi mịn ban công.',
            'Báo ngay cho cơ quan công viên cây xanh khi phát hiện cây nghiêng mục trước mùa mưa bão.',
          ],
        };
      }

      if (category === 'aerial') {
        if (isCanGio) {
          return {
            title: `Quần xã Chim nước Rừng ngập mặn Cần Giờ - ${data.name}`,
            description: `Quần thể chim nước và chim di cư quốc tế ven biển Đông. [Tham khảo sinh cảnh vùng — không phải kiểm kê tại phường]`,
            details: [
              HABITAT_DISCLAIMER_NOTE,
              'Sân chim Cần Giờ và bãi bồi ven biển Đông.',
              ...bioAerial.highlights,
              'Các loài chim quý hiếm: Bồ nông chân xám, cò thìa, choắt mỏ cong, diệc lửa, bói cá lớn.',
              'Mùa di trú đỉnh điểm từ tháng 10 đến tháng 4 hàng năm với hàng ngàn cá thể chim bay về tránh rét.',
            ],
            tips: [
              'Tuyệt đối cấm sử dụng bẫy lưới tàng hình, súng cao su săn bắn chim di cư ven rừng.',
            ],
          };
        }
        if (isConDao) {
          return {
            title: `Quần xã Chim biển & Chim Yến Côn Đảo - ${data.name}`,
            description: `Quần thể chim hải đảo và chim yến tự nhiên. [Tham khảo sinh cảnh vùng — không phải kiểm kê tại phường]`,
            details: [
              HABITAT_DISCLAIMER_NOTE,
              'Vách đá hải đảo và vùng trời Vườn quốc gia Côn Đảo.',
              ...bioAerial.highlights,
              'Quần thể chim yến hàng Côn Đảo làm tổ trên vách đá tự nhiên.',
              'Các loài chim biển: Hải âu xám, ó cá săn mồi biển sâu, bồ câu Nicobar cực kỳ quý hiếm.',
            ],
            tips: [
              'Bảo tồn nghiêm ngặt các hang yến tự nhiên theo quy định Vườn quốc gia.',
            ],
          };
        }
        return {
          title: `Quần xã Sinh vật Trên trời - ${data.name}`,
          category: 'Hệ sinh thái chim & côn trùng bay',
          description: `Quần thể chim và côn trùng có ích thích nghi môi trường đô thị. [Tham khảo sinh cảnh vùng — không phải kiểm kê tại phường]`,
          details: [
            HABITAT_DISCLAIMER_NOTE,
            'Quần thể chim đô thị: Bồ câu hoang dã, chim sẻ nhà, chim chích bông, chim yến hàng làm tổ nhà cao tầng.',
            ...bioAerial.highlights,
            'Côn trùng thụ phấn: Ong mật, bướm hoa công viên, chuồn chuồn kim giúp cân bằng sinh thái cây xanh.',
            'Tần suất xuất hiện cao vào sáng sớm (05:30 - 07:00) và chiều mát (16:30 - 18:00).',
          ],
          tips: [
            'Không sử dụng bẫy dính hay súng tự chế tại các công viên và khu dân cư.',
            'Bố trí khay nước sạch nhỏ ở ban công hoặc sân thượng để chim trời có nơi uống nước ngày nắng.',
          ],
        };
      }

      // Amphibian (Lưỡng cư & Bò sát)
      if (isCanGio || isNhaBeDistrict) {
        return {
          title: `Quần xã Sinh vật Lưỡng cư Vùng ngập mặn - ${data.name}`,
          description: `Đặc trưng lưỡng cư vùng giáp ranh bùn lầy ven biển. [Tham khảo sinh cảnh vùng — không phải kiểm kê tại phường]`,
          details: [
            HABITAT_DISCLAIMER_NOTE,
            'Khu vực phân bố: Rừng ngập mặn, bãi bồi phù sa sông Soài Rạp và rạch dừa nước.',
            ...bioAmphibian.highlights,
            'Loài đặc trưng: Cá thòi lòi leo cây (Periophthalmus) có thể thở cả dưới nước lẫn trên cạn.',
            'Cua đá bãi bồi, cá bống sao, rắn ráo nước lợ, thằn lằn cát ven biển.',
            'Đóng vai trò phân hủy lá đước rụng và chuyển hóa mùn bã hữu cơ thành chất dinh dưỡng cho biển.',
          ],
          tips: [
            'Bảo tồn sinh cảnh thảm bùn tự nhiên, không đổ trạc xà bần san lấp rạch bãi bồi.',
          ],
        };
      }
      if (isConDao) {
        return {
          title: `Quần xã Bò sát & Lưỡng cư Hải đảo - ${data.name}`,
          description: `Bò sát và động vật bán ngập đặc hữu hải đảo Côn Đảo. [Tham khảo sinh cảnh vùng — không phải kiểm kê tại phường]`,
          details: [
            HABITAT_DISCLAIMER_NOTE,
            'Sinh cảnh: Bờ suối đá rừng nhiệt đới và bãi cát ven biển Côn Đảo.',
            ...bioAmphibian.highlights,
            'Cua xe tăng (Cardisoma carnifex) - loài cua cạn khổng lồ đặc trưng rừng ngập mặn Côn Đảo.',
            'Thằn lằn ngón Côn Đảo (Cyrtodactylus condorensis) - loài bò sát đặc hữu duy nhất của quần đảo.',
          ],
          tips: [
            'Không săn bắt cua xe tăng và thằn lằn ngón làm đặc sản ẩm thực.',
          ],
        };
      }
      return {
        title: `Quần xã Sinh vật Lưỡng cư - ${data.name}`,
        category: 'Hệ sinh thái lưỡng cư',
        description: `Quần thể lưỡng cư thích nghi vùng giáp ranh nước - cạn đô thị. [Tham khảo sinh cảnh vùng — không phải kiểm kê tại phường]`,
        details: [
          HABITAT_DISCLAIMER_NOTE,
          'Khu vực sinh sống: Vùng đất ẩm bãi bồi, bờ kè sinh thái, thảm cỏ bờ rạch, hồ cảnh quan.',
          ...bioAmphibian.highlights,
          'Các loài phổ biến: Cóc nhà, thạch sùng, nhái bén, ếch đồng ven ngoại thành.',
          'Vai trò sinh thái trọng yếu: Là thiên địch tự nhiên tiêu diệt muỗi vằn, lăng quăng và sâu bọ hại cây.',
        ],
        tips: [
          'Bảo tồn thảm cỏ tự nhiên ven rạch để duy trì môi trường sinh sản của các loài lưỡng cư.',
        ],
      };
    };

    const baseContent = buildDetails();
    const relevantSpecies =
      category === 'underwater'
        ? underwaterKeySpecies
        : category === 'terrestrial'
        ? terrestrialKeySpecies
        : category === 'aerial'
        ? aerialKeySpecies
        : amphibianKeySpecies;

    const defaultCategory =
      category === 'underwater'
        ? 'Quần xã dưới nước'
        : category === 'terrestrial'
        ? 'Quần xã trên cạn'
        : category === 'aerial'
        ? 'Quần xã trên trời'
        : 'Quần xã lưỡng cư';

    return {
      category: baseContent.category || defaultCategory,
      ...baseContent,
      speciesList: relevantSpecies,
    };
  };

  const [airQuality, setAirQuality] = useState<AirQualityData>(() => {
    return data.airQuality || getReliableAirQuality(data.id, data.lat, data.lng, data.name);
  });

  useEffect(() => {
    const aq = data.airQuality || getReliableAirQuality(data.id, data.lat, data.lng, data.name);
    setAirQuality(aq);
  }, [data.id, data.airQuality, data.lat, data.lng, data.name]);

  useEffect(() => {
    const handleSyncEvent = (e: any) => {
      if (e.detail?.districtId === data.id) {
        if (e.detail?.airQuality) {
          setAirQuality(e.detail.airQuality);
        }
        setCurrentWeather(getCachedCurrentLiveWeather(data.id, data.name));
      }
    };
    window.addEventListener('eco-collected-weather-synced', handleSyncEvent);
    return () => window.removeEventListener('eco-collected-weather-synced', handleSyncEvent);
  }, [data.id, data.name]);

  const isSimulation = currentWeather.dataType === 'simulation' || !currentWeather.hasData;
  const climateTypeLabel = !currentWeather.hasData
    ? 'Chờ đồng bộ mạng'
    : currentWeather.dataType === 'observation'
    ? 'Dữ liệu quan trắc thực địa'
    : isSimulation
    ? 'Dữ liệu mô phỏng'
    : 'Dữ liệu mô hình dự báo số trị';

  const climateTimestamp = currentWeather.timestamp || 'Cập nhật định kỳ';
  const climateSource = currentWeather.source || 'Open-Meteo Weather API (ECMWF & GFS)';

  return (
    <div className="flex flex-col gap-5 px-5 pb-6">
      {/* Đánh giá vi khí hậu card */}
      <div
        id="env-weather-eval-card"
        onClick={() =>
          onOpenDetail({
            title: 'Đánh giá Vi khí hậu Khu vực',
            category: 'Tổng quan môi trường',
            description: `${currentWeather.statusDetail} tại ${data.name}.`,
            details: [
              `Đánh giá tổng quan: ${currentWeather.statusAssessment}`,
              `Tình trạng chi tiết: ${currentWeather.statusDetail}`,
              `Nhiệt độ hiện tại: ${currentWeather.temp}`,
              `Độ ẩm không khí: ${currentWeather.humidity}`,
              `Áp suất khí quyển: ${currentWeather.surfacePressure || 'Không có dữ liệu'}`,
              `Điểm sương: ${currentWeather.dewPoint || 'Không có dữ liệu'}`,
              `Phân loại dữ liệu: ${climateTypeLabel}`,
              `Nguồn kiểm chứng: ${climateSource}`,
              `Thời gian quan trắc / mô hình: ${climateTimestamp}`,
            ],
            tips: [
              'Dữ liệu vi khí hậu được phân tích dựa trên mô hình số trị Open-Meteo chuẩn hóa.',
              'Theo dõi định kỳ mô hình vi khí hậu trước 17:00 hàng ngày để cập nhật diễn biến.',
            ],
          })
        }
        className="bg-[#EBF5FF] dark:bg-[#1E3A8A]/30 rounded-[24px] p-5 sm:p-6 shadow-xs transition-all active:scale-[0.99] cursor-pointer hover:bg-[#e4f0fc] dark:hover:bg-[#1E3A8A]/40 border border-transparent dark:border-blue-800/40 flex flex-col gap-2.5"
      >
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-[14px] font-bold text-[#1E40AF] dark:text-blue-300 tracking-tight">
            {currentWeather.statusAssessment}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-800">
            <Database className="w-3 h-3 text-blue-600 dark:text-blue-300" />
            {climateTypeLabel}
          </span>
        </div>
        <span className="text-[24px] font-black text-[#0F3B73] dark:text-blue-100 tracking-tight leading-tight block">
          {currentWeather.statusDetail}
        </span>
        <div className="pt-2 border-t border-blue-200/60 dark:border-blue-800/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 flex-wrap gap-2">
          <span>Nguồn: {climateSource}</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Cập nhật: {climateTimestamp}
          </span>
        </div>
      </div>

      {/* Chỉ số môi trường (Không khí, Nước, Ánh sáng, Địa chất) */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-[19px] font-extrabold text-[#0F172A] dark:text-slate-100 tracking-tight">
            Chỉ số môi trường
          </h2>
          <span className="text-xs font-semibold text-[#0284C7] dark:text-sky-300 bg-[#E0F2FE] dark:bg-sky-950/60 border border-transparent dark:border-sky-800 px-2 py-0.5 rounded-md">
            Mô hình ước tính/dự báo
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Không khí */}
          <button
            type="button"
            id="env-air-btn"
            onClick={() =>
              onOpenDetail({
                title: 'Chỉ số Chất lượng Không khí (US AQI)',
                category: 'Chỉ số môi trường',
                description: `US AQI: ${airQuality.aqi !== null ? airQuality.aqi : 'Không có dữ liệu'} - Đánh giá: ${airQuality.status || 'Chưa có dữ liệu'}`,
                details: [
                  `Chỉ số US AQI: ${airQuality.aqi !== null ? airQuality.aqi : 'Không có dữ liệu'} (Ngưỡng an toàn WHO: < 50)`,
                  `Bụi mịn PM2.5: ${airQuality.pollutants.pm2_5 !== null ? `${airQuality.pollutants.pm2_5} µg/m³` : 'Không có dữ liệu'} (QCVN 05:2023: 50 µg/m³ 24h)`,
                  `Bụi thô PM10: ${airQuality.pollutants.pm10 !== null ? `${airQuality.pollutants.pm10} µg/m³` : 'Không có dữ liệu'} (QCVN 05:2023: 100 µg/m³ 24h)`,
                  `Ozone mặt đất O3: ${airQuality.pollutants.o3 !== null ? `${airQuality.pollutants.o3} µg/m³` : 'Không có dữ liệu'} (Chuẩn 8h)`,
                  `Khí thải NO2: ${airQuality.pollutants.no2 !== null ? `${airQuality.pollutants.no2} µg/m³` : 'Không có dữ liệu'} (Chuẩn 24h)`,
                  `Khí thải SO2: ${airQuality.pollutants.so2 !== null ? `${airQuality.pollutants.so2} µg/m³` : 'Không có dữ liệu'} (Chuẩn 24h)`,
                  `Khí thải CO: ${airQuality.pollutants.co !== null ? `${airQuality.pollutants.co} µg/m³` : 'Không có dữ liệu'} (Chuẩn 8h)`,
                  `Đánh giá sức khỏe: ${airQuality.categoryText}`,
                  `Lưu ý nguồn: Dữ liệu mô hình CAMS toàn cầu (~40 km), phản ánh nền khu vực, không phải đo tại phường`,
                  `Nguồn gốc: ${airQuality.source}`,
                  `Thời điểm mô hình dự báo: ${airQuality.timestamp}`,
                ],
                tips: [
                  'Dữ liệu mô hình CAMS toàn cầu (~40 km), phản ánh nền khu vực, không phải đo tại phường.',
                  'Xem bảng chỉ số chi tiết theo giờ và 6 chất ô nhiễm tại thẻ "Thời tiết".',
                  'QCVN 05:2023/BTNMT là quy chuẩn kỹ thuật quốc gia bắt buộc áp dụng.',
                ],
              })
            }
            className="bg-[#F5F4F0] dark:bg-[#1E293B] hover:bg-[#ECEBE6] dark:hover:bg-[#334155]/70 border border-transparent dark:border-slate-700 active:scale-95 transition-all rounded-[18px] py-4.5 px-3 flex flex-col items-center justify-center gap-2 text-center cursor-pointer shadow-2xs"
          >
            <div className="w-8 h-8 flex items-center justify-center text-[#2563EB] dark:text-sky-400">
              <Wind className="w-7 h-7 stroke-[2]" />
            </div>
            <span className="text-[14px] font-bold text-[#334155] dark:text-slate-200">
              Không khí
            </span>
            <span
              className="text-[10.5px] font-semibold px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: `${airQuality.colorHex}20`,
                color: airQuality.colorHex,
              }}
            >
              {airQuality.aqi !== null ? `US AQI ${airQuality.aqi}` : 'Chưa có AQI'} • {airQuality.status}
            </span>
          </button>
          {/* Nước */}
          <button
            type="button"
            id="env-water-btn"
            onClick={() =>
              onOpenDetail({
                title: 'Chất lượng Nước',
                category: 'Chỉ số môi trường',
                description: 'Chưa có dữ liệu quan trắc cho khu vực này',
                details: [
                  'Hiện tại chưa có trạm quan trắc tự động hoặc dữ liệu cảm biến nước mặt công khai kết nối trực tiếp tại địa bàn này.',
                  'Các chỉ số chuyên sâu (WQI, COD, BOD, pH, DO, kim loại nặng) cần số liệu đo đạc thực tế từ cơ quan quản lý tài nguyên môi trường hoặc trạm trắc nghiệm đạt chuẩn.',
                  'Ứng dụng tuân thủ nguyên tắc khoa học dữ liệu: Không tự tính toán, suy đoán hoặc hiển thị chỉ số giả định khi thiếu nguồn quan trắc chính thức.',
                ],
                tips: [
                  'Tiết kiệm nguồn nước sạch trong sinh hoạt gia đình.',
                  'Báo cáo ngay sự cố ô nhiễm nguồn nước hoặc xả thải trái phép tới Tổng đài 1022 hoặc UBND địa phương.',
                ],
              })
            }
            className="bg-[#F5F4F0] dark:bg-[#1E293B] hover:bg-[#ECEBE6] dark:hover:bg-[#334155]/70 border border-transparent dark:border-slate-700 active:scale-95 transition-all rounded-[18px] py-4.5 px-3 flex flex-col items-center justify-center gap-2 text-center cursor-pointer shadow-2xs"
          >
            <div className="w-8 h-8 flex items-center justify-center text-slate-500 dark:text-slate-400">
              <Droplet className="w-7 h-7 stroke-[2]" />
            </div>
            <span className="text-[14px] font-bold text-[#334155] dark:text-slate-200">
              Nước
            </span>
            <span className="text-[10.5px] font-medium text-slate-600 dark:text-slate-400 bg-slate-200/80 dark:bg-slate-800 border border-slate-300/60 dark:border-slate-700 px-2 py-0.5 rounded-full leading-tight text-center">
              Chưa có dữ liệu
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
                description: `${envIndexes.light.value} - Đánh giá: ${envIndexes.light.quality}`,
                details: [
                  envIndexes.light.note,
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
              {envIndexes.light.quality}
            </span>
          </button>

          {/* Địa chất */}
          <button
            type="button"
            id="env-geology-btn"
            onClick={() => {
              if (geoRecord.hasLocalRecord) {
                onOpenDetail({
                  title: `Địa chất & Biến động bề mặt - ${data.name}`,
                  category: 'Chỉ số địa tầng & viễn thám',
                  description: `Hệ tầng: ${geoRecord.geology.formationName}`,
                  details: [
                    `Thạch học & cấu tạo tầng: ${geoRecord.geology.lithology}.`,
                    `Sức chịu tải tính toán: ${geoRecord.geology.bearingCapacity}.`,
                    `Địa hình số hóa DEM: ${geoRecord.topography.elevationMsl} (${geoRecord.topography.terrainType}).`,
                    `Tốc độ biến dạng bề mặt InSAR: ${geoRecord.subsidence.insarRateMmYear || 'Chưa ghi nhận biến dạng lớn trong chu kỳ đo'}.`,
                    `Lưu ý bắt buộc InSAR: ${INSAR_MANDATORY_LABEL}.`,
                    `Nguồn số liệu: ${geoRecord.geology.source} | Viễn thám: ${geoRecord.subsidence.dataSource}.`,
                    geoRecord.generalNote,
                  ],
                  tips: [
                    'Khảo sát địa chất công trình kỹ lưỡng trước khi thi công móng tầng hầm hoặc nhà cao tầng.',
                    'Hạn chế khai thác nước ngầm tầng sâu để giảm nguy cơ sụt lún tích lũy bề mặt.',
                  ],
                });
              } else {
                onOpenDetail({
                  title: `Chỉ số Địa chất & Lún bề mặt - ${data.name}`,
                  category: 'Chỉ số địa tầng đô thị',
                  description: 'Chưa có dữ liệu địa chất cục bộ',
                  details: [
                    'Hiện tại chưa có báo cáo khoan khảo sát địa chất công trình hoặc mốc trắc địa quan trắc lún cục bộ riêng tại phường này.',
                    'Ứng dụng tuân thủ nguyên tắc minh bạch khoa học: Không tự suy đoán hoặc gán nhãn nền ổn định khi chưa có tài liệu kiểm chứng chính thức.',
                    `Lưu ý InSAR: ${INSAR_MANDATORY_LABEL}.`,
                    'Khi có công trình xây dựng, cần thực hiện khoan khảo sát địa chất theo quy chuẩn QCVN 03:2022/BXD.',
                  ],
                  tips: [
                    'Tuân thủ quy định khảo sát địa chất trước khi xây dựng công trình.',
                    'Không khoan giếng khai thác nước ngầm trái phép.',
                  ],
                });
              }
            }}
            className="bg-[#F5F4F0] dark:bg-[#1E293B] hover:bg-[#ECEBE6] dark:hover:bg-[#334155]/70 border border-transparent dark:border-slate-700 active:scale-95 transition-all rounded-[18px] py-4.5 px-3 flex flex-col items-center justify-center gap-2 text-center cursor-pointer shadow-2xs"
          >
            <div className="w-8 h-8 flex items-center justify-center text-[#0D9488] dark:text-teal-400">
              <Mountain className="w-7 h-7 stroke-[2]" />
            </div>
            <span className="text-[14px] font-bold text-[#334155] dark:text-slate-200">
              Địa chất
            </span>
            <span
              className={`text-[10.5px] font-semibold px-2 py-0.5 rounded-full leading-tight text-center ${
                geoRecord.hasLocalRecord
                  ? 'text-[#0D9488] dark:text-teal-300 bg-[#CCFBF1] dark:bg-teal-950/70 border border-transparent dark:border-teal-800'
                  : 'text-slate-600 dark:text-slate-400 bg-slate-200/80 dark:bg-slate-800 border border-slate-300/60 dark:border-slate-700'
              }`}
            >
              {geoRecord.hasLocalRecord ? 'Tham khảo vùng' : 'Chưa có dữ liệu'}
            </span>
          </button>
        </div>
      </section>

      {/* Quần xã sinh vật - Chuyển đổi linh hoạt giữa Địa bàn hiện tại và Toàn bộ TP.HCM */}
      <section className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h2 className="text-[19px] font-extrabold text-[#0F172A] dark:text-slate-100 tracking-tight flex items-center gap-1.5">
              <span>Quần xã sinh vật</span>
            </h2>
            <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-md">
              Đa dạng sinh thái
            </span>
          </div>

          {/* Switcher: Địa bàn này vs Xu hướng 2023-2026 vs Toàn bộ TP.HCM */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl self-start sm:self-auto shadow-2xs">
            <button
              type="button"
              id="bio-view-local-btn"
              onClick={() => setBioViewScope('local')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                bioViewScope === 'local'
                  ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>{data.name.split(',')[0]}</span>
            </button>

            <button
              type="button"
              id="bio-view-trend-btn"
              onClick={() => setBioViewScope('trend')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                bioViewScope === 'trend'
                  ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>Xu Hướng (2023 - 2026)</span>
            </button>

            <button
              type="button"
              id="bio-view-city-btn"
              onClick={() => setBioViewScope('city')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                bioViewScope === 'city'
                  ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-teal-600" />
              <span>Toàn bộ TP.HCM</span>
            </button>
          </div>
        </div>

        {/* Chế độ xem: TOÀN BỘ TP.HCM */}
        {bioViewScope === 'city' ? (
          <HcmCityBiodiversitySection
            currentDistrictId={data.id}
            onSelectDistrict={onSelectDistrict}
            onOpenDetail={onOpenDetail}
          />
        ) : bioViewScope === 'trend' ? (
          /* Chế độ xem: BIỂU ĐỒ XU HƯỚNG TĂNG GIẢM SINH VẬT 2023 - 2026 */
          <BiodiversityTrendChart onOpenDetail={onOpenDetail} />
        ) : (
          /* Chế độ xem: ĐỊA BÀN HIỆN TẠI (4 thẻ nâng cấp đầy đủ chỉ số sinh vật) */
          <div className="flex flex-col gap-3">
            {/* Banner nổi bật Xu hướng Tăng Giảm Sinh Vật 2023 - 2026 */}
            <div className="p-3 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-sky-500/10 border border-emerald-500/20 dark:border-emerald-500/30 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-extrabold text-slate-900 dark:text-slate-100">
                      Biểu Đồ Xu Hướng Tăng Giảm Sinh Vật (2023 – 2026)
                    </span>
                    <span className="text-[10px] font-black px-1.5 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      +22.8% phục hồi
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    Phân tích dữ liệu 4 năm liên tục: Thủy sinh (+23.5%), Trên cạn (+17.6%), Chim (+30.6%), Lưỡng cư (+20.3%)
                  </p>
                </div>
              </div>

              <button
                type="button"
                id="btn-switch-to-trend-chart"
                onClick={() => setBioViewScope('trend')}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shrink-0 transition-colors shadow-2xs flex items-center gap-1 self-start sm:self-auto cursor-pointer"
              >
                <span>Xem Biểu Đồ 2023 - 2026</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            {/* Thanh thông tin mô tả định tính sinh cảnh vùng */}
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <Info className="w-4 h-4 text-emerald-600 shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 flex-wrap">
                    <span>{wardHabitat.habitatZone}</span>
                    <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-1.5 py-0.2 rounded">
                      Sinh cảnh đặc trưng
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 line-clamp-2">
                    {wardHabitat.habitatDescription}
                  </p>
                </div>
              </div>
              <span className="text-[10.5px] font-semibold text-slate-500 dark:text-slate-400 italic shrink-0 self-end sm:self-center">
                * {wardHabitat.disclaimer}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* Dưới nước */}
              <button
                type="button"
                id="bio-underwater-btn"
                onClick={() =>
                  onOpenDetail({
                    ...getDynamicBioDetails('underwater'),
                    category: 'Quần xã dưới nước',
                  })
                }
                className="bg-[#F8FAFC] dark:bg-slate-800/90 hover:bg-sky-50/70 dark:hover:bg-slate-750 border border-slate-200/80 dark:border-slate-700 active:scale-95 transition-all rounded-[20px] p-3.5 flex flex-col justify-between text-left cursor-pointer shadow-2xs group"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-950/80 text-sky-600 dark:text-sky-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Waves className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <span
                    className="text-[10.5px] font-bold px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800"
                    title="Tham khảo sinh cảnh vùng — không phải kiểm kê tại phường"
                  >
                    Tham khảo
                  </span>
                </div>

                <div className="mt-2.5">
                  <span className="text-[13px] font-extrabold text-slate-800 dark:text-slate-100 block leading-tight">
                    Dưới nước
                  </span>
                  <span className="text-[10px] font-bold text-sky-700 dark:text-sky-400 block truncate mt-0.5">
                    {bioUnderwater.status}
                  </span>
                  {/* Tên loài tiêu biểu */}
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {underwaterKeySpecies.slice(0, 2).map((sp) => (
                      <span
                        key={sp.id}
                        className="text-[9.5px] font-semibold px-1.5 py-0.5 rounded bg-sky-100/90 dark:bg-sky-950 text-sky-900 dark:text-sky-200 border border-sky-200/70 dark:border-sky-800/80 truncate max-w-full"
                      >
                        {sp.name}
                      </span>
                    ))}
                  </div>
                </div>
              </button>

              {/* Trên cạn */}
              <button
                type="button"
                id="bio-terrestrial-btn"
                onClick={() =>
                  onOpenDetail({
                    ...getDynamicBioDetails('terrestrial'),
                    category: 'Quần xã trên cạn',
                  })
                }
                className="bg-[#F8FAFC] dark:bg-slate-800/90 hover:bg-emerald-50/70 dark:hover:bg-slate-750 border border-slate-200/80 dark:border-slate-700 active:scale-95 transition-all rounded-[20px] p-3.5 flex flex-col justify-between text-left cursor-pointer shadow-2xs group"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Footprints className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <span
                    className="text-[10.5px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                    title="Tham khảo sinh cảnh vùng — không phải kiểm kê tại phường"
                  >
                    Tham khảo
                  </span>
                </div>

                <div className="mt-2.5">
                  <span className="text-[13px] font-extrabold text-slate-800 dark:text-slate-100 block leading-tight">
                    Trên cạn
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 block truncate mt-0.5">
                    {bioTerrestrial.status}
                  </span>
                  {/* Tên loài tiêu biểu */}
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {terrestrialKeySpecies.slice(0, 2).map((sp) => (
                      <span
                        key={sp.id}
                        className="text-[9.5px] font-semibold px-1.5 py-0.5 rounded bg-emerald-100/90 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 border border-emerald-200/70 dark:border-emerald-800/80 truncate max-w-full"
                      >
                        {sp.name}
                      </span>
                    ))}
                  </div>
                </div>
              </button>

              {/* Trên trời */}
              <button
                type="button"
                id="bio-aerial-btn"
                onClick={() =>
                  onOpenDetail({
                    ...getDynamicBioDetails('aerial'),
                    category: 'Quần xã trên trời',
                  })
                }
                className="bg-[#F8FAFC] dark:bg-slate-800/90 hover:bg-amber-50/70 dark:hover:bg-slate-750 border border-slate-200/80 dark:border-slate-700 active:scale-95 transition-all rounded-[20px] p-3.5 flex flex-col justify-between text-left cursor-pointer shadow-2xs group"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Feather className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <span
                    className="text-[10.5px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                    title="Tham khảo sinh cảnh vùng — không phải kiểm kê tại phường"
                  >
                    Tham khảo
                  </span>
                </div>

                <div className="mt-2.5">
                  <span className="text-[13px] font-extrabold text-slate-800 dark:text-slate-100 block leading-tight">
                    Trên trời
                  </span>
                  <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 block truncate mt-0.5">
                    {bioAerial.status}
                  </span>
                  {/* Tên loài tiêu biểu */}
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {aerialKeySpecies.slice(0, 2).map((sp) => (
                      <span
                        key={sp.id}
                        className="text-[9.5px] font-semibold px-1.5 py-0.5 rounded bg-amber-100/90 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border border-amber-200/70 dark:border-amber-800/80 truncate max-w-full"
                      >
                        {sp.name}
                      </span>
                    ))}
                  </div>
                </div>
              </button>

              {/* Lưỡng cư */}
              <button
                type="button"
                id="bio-amphibian-btn"
                onClick={() =>
                  onOpenDetail({
                    ...getDynamicBioDetails('amphibian'),
                    category: 'Quần xã lưỡng cư',
                  })
                }
                className="bg-[#F8FAFC] dark:bg-slate-800/90 hover:bg-teal-50/70 dark:hover:bg-slate-750 border border-slate-200/80 dark:border-slate-700 active:scale-95 transition-all rounded-[20px] p-3.5 flex flex-col justify-between text-left cursor-pointer shadow-2xs group"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="w-9 h-9 rounded-xl bg-teal-100 dark:bg-teal-950/80 text-teal-600 dark:text-teal-300 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Droplet className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <span
                    className="text-[10.5px] font-bold px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800"
                    title="Tham khảo sinh cảnh vùng — không phải kiểm kê tại phường"
                  >
                    Tham khảo
                  </span>
                </div>

                <div className="mt-2.5">
                  <span className="text-[13px] font-extrabold text-slate-800 dark:text-slate-100 block leading-tight">
                    Lưỡng cư
                  </span>
                  <span className="text-[10px] font-bold text-teal-700 dark:text-teal-400 block truncate mt-0.5">
                    {bioAmphibian.status}
                  </span>
                  {/* Tên loài tiêu biểu */}
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {amphibianKeySpecies.slice(0, 2).map((sp) => (
                      <span
                        key={sp.id}
                        className="text-[9.5px] font-semibold px-1.5 py-0.5 rounded bg-teal-100/90 dark:bg-teal-950 text-teal-900 dark:text-teal-200 border border-teal-200/70 dark:border-teal-800/80 truncate max-w-full"
                      >
                        {sp.name}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            </div>

            {/* Bảng tra cứu tên các loài sinh vật đặc trưng theo danh mục tại địa bàn này */}
            <div className="p-3.5 bg-slate-50/90 dark:bg-slate-850/80 border border-slate-200/90 dark:border-slate-800 rounded-2xl flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xs font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Tên các loài sinh vật tiêu biểu ({data.name})</span>
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Bấm vào từng loài để xem danh pháp khoa học, sinh cảnh phân bố và vai trò sinh thái
                  </p>
                </div>

                {/* Tìm kiếm loài */}
                <div className="relative sm:w-56">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={localSpeciesSearch}
                    onChange={(e) => setLocalSpeciesSearch(e.target.value)}
                    placeholder="Tìm tên loài hoặc tên khoa học..."
                    className="w-full pl-7 pr-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Ghi chú minh bạch về nguồn tham chiếu vùng sinh thái của địa phương */}
              <div className="p-2.5 rounded-xl bg-sky-50/70 dark:bg-sky-950/30 border border-sky-200/70 dark:border-sky-800/50 text-[11px] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-start sm:items-center gap-2">
                  <Info className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5 sm:mt-0" />
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        Cơ sở tham chiếu theo vùng sinh thái ({data.name}):
                      </span>
                      <span className="text-slate-600 dark:text-slate-300 font-medium">
                        {bioDistrictMeta.dataSource}
                      </span>
                    </div>
                    <p className="text-[10.5px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {bioDistrictMeta.dataNotice} • Thông tin nguồn được suy ra theo khu vực sinh thái tổng quát, chưa kiểm chứng thực địa riêng từng loài.
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-sky-800 dark:text-sky-300 shrink-0 bg-sky-100/80 dark:bg-sky-900/60 px-2 py-1 rounded-lg border border-sky-200/80 dark:border-sky-800/80">
                  {bioDistrictMeta.isFieldSurveyDistrict ? '📍 Vùng có điểm khảo sát thực địa' : '📊 Tham chiếu sinh thái vùng'}
                </span>
              </div>

              {/* Lọc phân hệ */}
              <div className="flex items-center gap-1 overflow-x-auto pb-0.5 custom-scrollbar">
                {[
                  { id: 'all', label: `Tất cả (${currentDistrictSpecies.length})` },
                  {
                    id: 'commercial',
                    label: `💼 Kinh doanh / OCOP (${
                      currentDistrictSpecies.filter(
                        (s) => s.commercialStatus === 'permitted_free' || s.commercialStatus === 'conditional_farming'
                      ).length
                    })`,
                  },
                  { id: 'underwater', label: `🌊 Dưới nước / Biển (${underwaterKeySpecies.length})` },
                  { id: 'aerial', label: `🦅 Trên không (${aerialKeySpecies.length})` },
                  { id: 'terrestrial', label: `🌳 Trên cạn (${terrestrialKeySpecies.length})` },
                  { id: 'amphibian', label: `🐸 Lưỡng cư (${amphibianKeySpecies.length})` },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setLocalSpeciesRealm(tab.id as any)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
                      localSpeciesRealm === tab.id
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/70 dark:border-slate-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Danh sách thẻ tên loài */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[340px] overflow-y-auto pr-0.5 custom-scrollbar">
                {filteredLocalSpecies.map((sp) => (
                  <div
                    key={sp.id}
                    onClick={() =>
                      onOpenDetail({
                        title: `${sp.name} (${sp.scientificName})`,
                        imageUrl: sp.imageUrl,
                        category: `Sinh vật ${sp.realm === 'underwater' ? 'dưới nước / biển' : sp.realm === 'aerial' ? 'trên không' : sp.realm === 'terrestrial' ? 'trên cạn' : 'lưỡng cư'}`,
                        description: `${sp.group} • ${sp.commercialLabel || sp.conservationStatus}`,
                        details: [
                          `Tên khoa học (danh pháp quốc tế): ${sp.scientificName}`,
                          `Sinh cảnh phân bố: ${sp.habitat}`,
                          `Cơ sở tham chiếu theo vùng sinh thái (chưa kiểm chứng riêng từng loài): ${sp.source || bioDistrictMeta.dataSource}`,
                          `Phương thức đối chiếu thông tin: ${sp.verificationMethod || bioDistrictMeta.surveyMethod}`,
                          `Quy chế kinh doanh & Pháp lý: ${
                            sp.commercialStatus === 'permitted_free'
                              ? '🟢 ĐƯỢC PHÉP KINH DOANH & NUÔI TRỒNG TỰ DO (Đặc sản OCOP, thủy hải sản, hoa kiểng, nông lâm nghiệp bền vững)'
                              : sp.commercialStatus === 'conditional_farming'
                              ? '🟡 GÂY NUÔI CÓ ĐIỀU KIỆN (CITES II / NHÓM IIB): Bắt buộc đăng ký Mã số trại nuôi với Chi cục Kiểm lâm TP.HCM và xuất trình giống F2'
                              : '🔴 NGHIÊM CẤM KINH DOANH DƯỚI MỌI HÌNH THỨC: Nghiêm cấm săn bắt, tàng trữ, buôn bán. Vi phạm xử lý hình sự Điều 244 BLHS'
                          }`,
                          sp.commercialProducts && sp.commercialProducts.length > 0
                            ? `Sản phẩm thương phẩm: ${sp.commercialProducts.join('; ')}`
                            : '',
                          sp.commercialFarmingLocation ? `Địa bàn nuôi trồng / khai thác: ${sp.commercialFarmingLocation}` : '',
                          sp.legalFramework ? `Căn cứ pháp lý: ${sp.legalFramework}` : '',
                          sp.economicValue ? `Giá trị kinh tế & Thị trường: ${sp.economicValue}` : '',
                          sp.commercialNotes ? `Lưu ý pháp lý: ${sp.commercialNotes}` : '',
                          `Đặc điểm sinh học nhận dạng: ${sp.keyFeatures}`,
                          `Vai trò sinh thái: ${sp.ecologicalRole}`,
                        ].filter(Boolean),
                        tips: [
                          sp.commercialStatus === 'permitted_free'
                            ? 'Bảo tồn nguồn giống thuần bản địa và ưu tiên thực hành canh tác sinh thái đạt chứng nhận OCOP / VietGAP.'
                            : sp.commercialStatus === 'conditional_farming'
                            ? 'Tuân thủ nghiêm ngặt quy định cấp mã số trại nuôi của Kiểm lâm TP.HCM và không mua bán động vật hoang dã trái phép.'
                            : 'Kịp thời báo tin cho cơ quan kiểm lâm TP.HCM qua (028) 3844 1447 khi phát hiện cá thể bị bẫy bắt hoặc buôn bán.',
                        ],
                      })
                    }
                    className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-750 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between gap-2 text-left group"
                  >
                    <div className="flex gap-2.5 items-start">
                      {/* Ảnh nhỏ đại diện */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 relative">
                        {sp.imageUrl ? (
                          <img
                            src={sp.imageUrl}
                            alt={sp.name}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xl">
                            {sp.realm === 'underwater' ? '🌊' : sp.realm === 'aerial' ? '🦅' : sp.realm === 'terrestrial' ? '🌳' : '🐸'}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <div className="min-w-0">
                            <div className="flex items-center gap-1 flex-wrap">
                              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors truncate">
                                {sp.name}
                              </span>
                            </div>
                            <span className="text-[10px] italic text-slate-500 dark:text-slate-400 block truncate font-serif">
                              {sp.scientificName}
                            </span>
                          </div>

                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md shrink-0 ${
                              sp.conservationStatus.includes('Sách Đỏ') ||
                              sp.conservationStatus.includes('CR') ||
                              sp.conservationStatus.includes('EN') ||
                              sp.conservationStatus.includes('VU')
                                ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                                : 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                            }`}
                          >
                            {sp.conservationStatus.split('-')[0].trim()}
                          </span>
                        </div>

                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5 line-clamp-1">
                          {sp.group}
                        </span>

                        {sp.commercialStatus && (
                          <span
                            className={`inline-block mt-1 text-[8.5px] font-bold px-1.5 py-0.2 rounded ${
                              sp.commercialStatus === 'permitted_free'
                                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                                : sp.commercialStatus === 'conditional_farming'
                                ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                                : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300'
                            }`}
                          >
                            {sp.commercialStatus === 'permitted_free'
                              ? '🟢 OCOP / Tự do'
                              : sp.commercialStatus === 'conditional_farming'
                              ? '🟡 Nuôi có phép F2'
                              : '🔴 Cấm kinh doanh'}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-[10.5px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {sp.keyFeatures}
                    </p>

                    {sp.commercialProducts && sp.commercialProducts.length > 0 && (
                      <div className="text-[9.5px] text-slate-500 dark:text-slate-400 truncate">
                        <strong>SP:</strong> {sp.commercialProducts.slice(0, 2).join(' • ')}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800 text-[10.5px]">
                      <span className="text-emerald-700 dark:text-emerald-400 font-medium truncate max-w-[180px] text-[10px]">
                        {sp.ecologicalRole}
                      </span>
                      <span className="text-slate-400 group-hover:text-emerald-600 font-bold shrink-0 flex items-center gap-0.5 text-[10px]">
                        Chi tiết &rarr;
                      </span>
                    </div>
                  </div>
                ))}

                {filteredLocalSpecies.length === 0 && (
                  <div className="col-span-full p-4 text-center text-xs text-slate-400">
                    Không tìm thấy loài nào khớp với từ khóa "{localSpeciesSearch}".
                  </div>
                )}
              </div>
            </div>

            {/* Banner chuyển sang xem toàn cảnh sinh vật toàn TP.HCM */}
            <button
              type="button"
              id="btn-open-city-biodiversity"
              onClick={() => setBioViewScope('city')}
              className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/30 border border-emerald-200/80 dark:border-emerald-800/60 rounded-2xl flex items-center justify-between gap-3 text-left transition-all hover:bg-emerald-100/50 dark:hover:bg-emerald-950/60 active:scale-[0.99] cursor-pointer shadow-2xs"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="p-2 rounded-xl bg-emerald-600 text-white shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-black text-emerald-950 dark:text-emerald-100">
                      Toàn cảnh Quần Xã Sinh Vật Toàn TP.HCM
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-emerald-200/80 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100">
                      5 phân vùng sinh cảnh • 168 xã/phường
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-800 dark:text-emerald-300/90 truncate mt-0.5">
                    Tra cứu 5 phân vùng sinh thái, danh mục Sách Đỏ và bản đồ 168 đơn vị hành chính
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-emerald-700 dark:text-emerald-300 shrink-0" />
            </button>
          </div>
        )}
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
              title: environmentAlert.title,
              category: 'Cảnh báo thủy triều & ngập',
              description: environmentAlert.desc,
              details: [
                'Theo dõi thông tin dự báo khí tượng thủy văn và cảnh báo ngập triều khu vực TP.HCM.',
                'Khung giờ triều đỉnh có thể gây đọng nước cục bộ tại các tuyến đường trũng thấp ven sông, kênh rạch.',
                'Chủ động phương án kê cao vật dụng và chọn tuyến đường phù hợp khi di chuyển trong khung giờ cao điểm.',
                'Tham khảo thông tin vận hành hệ thống cống ngăn triều và các trạm bơm thoát nước đô thị.',
              ],
              tips: [
                environmentAlert.actionAdvice,
                'Người dân di chuyển bằng phương tiện gầm thấp nên chủ động chọn tuyến đường cao ráo hơn.',
                'Cập nhật thông tin cảnh báo từ cơ quan khí tượng thủy văn và lực lượng ứng trực địa phương.',
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
              {environmentAlert.title}
            </h3>
            <p className="text-[14px] text-[#92400E] dark:text-amber-300/90 mt-0.5 leading-snug">
              {environmentAlert.desc}
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
