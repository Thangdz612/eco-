// Dữ liệu xu hướng biến động đa dạng sinh học TP.HCM & Côn Đảo giai đoạn 2023 - 2026
// NGUYÊN TẮC MINH BẠCH & TRUNG THỰC KHOA HỌC:
// - Do chưa có đường dẫn, tên văn bản, năm và số hiệu báo cáo chính thức kèm theo, toàn bộ các chỉ số
//   được hạ nhãn thành "Ước tính tham khảo — chưa có tài liệu đối chiếu", không ghi tên cơ quan như thể đã xác nhận.
// - Không sử dụng số liệu này để cộng dồn cơ học cho từng phường.

export interface AnnualBiodiversityRecord {
  year: number;
  label: string;
  speciesRecorded: number;
  speciesEstimated: number;
  endangeredProtected: number;
  mangroveForestHa: number;
  underwaterSpecies: number;
  aerialSpecies: number;
  terrestrialSpecies: number;
  amphibianSpecies: number;
  milestone: string;
  stressFactor: string;
  conservationAction: string;
  dataSource: string;
  verificationMethod: string;
  // Để tương thích ngược với các biểu đồ recharts:
  speciesCount: number;
  overallScore: number;
  underwater: number;
  aerial: number;
  terrestrial: number;
  amphibian: number;
}

export const BIODIVERSITY_ANNUAL_TRENDS: AnnualBiodiversityRecord[] = [
  {
    year: 2023,
    label: '2023',
    speciesRecorded: 1420,
    speciesEstimated: 2150,
    endangeredProtected: 3120,
    mangroveForestHa: 37800,
    underwaterSpecies: 360,
    aerialSpecies: 245,
    terrestrialSpecies: 720,
    amphibianSpecies: 95,
    milestone: 'Nghiên cứu tham khảo mở rộng hệ sinh thái TP.HCM và Côn Đảo',
    stressFactor: 'Áp lực mở rộng hạ tầng ven biển và xả thải sinh hoạt kênh rạch',
    conservationAction: 'Thiết lập mạng lưới trạm quan trắc và cắm mốc vùng lõi sinh thái',
    dataSource: 'Ước tính tham khảo — chưa có tài liệu đối chiếu',
    verificationMethod: 'Tài liệu sinh thái tham khảo tổng quát',
    speciesCount: 1420,
    overallScore: 65.8,
    underwater: 360,
    aerial: 245,
    terrestrial: 720,
    amphibian: 95,
  },
  {
    year: 2024,
    label: '2024',
    speciesRecorded: 1435,
    speciesEstimated: 2160,
    endangeredProtected: 3340,
    mangroveForestHa: 38050,
    underwaterSpecies: 368,
    aerialSpecies: 252,
    terrestrialSpecies: 722,
    amphibianSpecies: 93,
    milestone: 'Vận hành các trạm sục khí oxy kênh Nhiêu Lộc; theo dõi bãi đẻ rùa biển Côn Đảo',
    stressFactor: 'Hiện tượng El Niño khô hạn gay gắt và xâm nhập mặn ảnh hưởng cá nội địa',
    conservationAction: 'Điều tiết nước hồ Dầu Tiếng đẩy mặn; bảo tồn rùa biển',
    dataSource: 'Ước tính tham khảo — chưa có tài liệu đối chiếu',
    verificationMethod: 'Tài liệu sinh thái tham khảo tổng quát',
    speciesCount: 1435,
    overallScore: 66.0,
    underwater: 368,
    aerial: 252,
    terrestrial: 722,
    amphibian: 93,
  },
  {
    year: 2025,
    label: '2025',
    speciesRecorded: 1512,
    speciesEstimated: 2200,
    endangeredProtected: 4180,
    mangroveForestHa: 38420,
    underwaterSpecies: 395,
    aerialSpecies: 270,
    terrestrialSpecies: 745,
    amphibianSpecies: 102,
    milestone: 'Chương trình bảo tồn sinh thái và phục hồi rừng ngập mặn',
    stressFactor: 'Sóng nhiệt đô thị cục bộ và biến động dòng chảy sông Đồng Nai',
    conservationAction: 'Trồng phục hồi rừng ngập mặn; tái tạo rạn san hô Côn Đảo',
    dataSource: 'Ước tính tham khảo — chưa có tài liệu đối chiếu',
    verificationMethod: 'Tài liệu sinh thái tham khảo tổng quát',
    speciesCount: 1512,
    overallScore: 74.0,
    underwater: 395,
    aerial: 270,
    terrestrial: 745,
    amphibian: 102,
  },
  {
    year: 2026,
    label: '2026 (Hiện tại)',
    speciesRecorded: 1586,
    speciesEstimated: 2250,
    endangeredProtected: 5250,
    mangroveForestHa: 38900,
    underwaterSpecies: 418,
    aerialSpecies: 285,
    terrestrialSpecies: 774,
    amphibianSpecies: 109,
    milestone: 'Danh lục loài định danh ước tính tham khảo trên toàn vùng',
    stressFactor: 'Thách thức vi nhựa biển và biến đổi vi khí hậu vùng cửa sông',
    conservationAction: 'Giám sát bảo tồn sinh thái tổng hợp và tuần tra bảo vệ rừng',
    dataSource: 'Ước tính tham khảo — chưa có tài liệu đối chiếu',
    verificationMethod: 'Tài liệu sinh thái tham khảo tổng quát',
    speciesCount: 1586,
    overallScore: 80.8,
    underwater: 418,
    aerial: 285,
    terrestrial: 774,
    amphibian: 109,
  },
];

export interface SpeciesTrendItem {
  id: string;
  name: string;
  scientificName: string;
  realm: 'underwater' | 'aerial' | 'terrestrial' | 'amphibian';
  realmLabel: string;
  region: string;
  trendType: 'increase_strong' | 'increase_stable' | 'decrease_temporary' | 'recovered_high';
  trendLabel: string;
  val2023: string;
  val2026: string;
  statusText: string;
  cause: string;
  protectiveSolution: string;
  iucnStatus: string;
  recordType: 'recorded' | 'estimated' | 'actual_total';
  recordTypeLabel: string;
  recordedLocation: string;
  recordedYear: string;
  source: string;
  verificationMethod: string;
  percentageChange?: number;
}

export const SPECIES_TREND_DETAILS: SpeciesTrendItem[] = [
  {
    id: 'vich-con-dao',
    name: 'Rùa biển Vích',
    scientificName: 'Chelonia mydas',
    realm: 'underwater',
    realmLabel: 'Biển & Thủy sinh',
    region: 'Vùng biển Côn Đảo (Bãi Cát Lớn, Bãi Dương, Hòn Bảy Cạnh)',
    trendType: 'increase_strong',
    trendLabel: 'TĂNG GHI NHẬN ↗',
    val2023: '1.850 ổ trứng ước tính',
    val2026: '2.632 ổ trứng ước tính',
    statusText: 'Ghi nhận số lượng rùa con thả về biển theo mùa sinh sản',
    cause: 'Công tác tuần tra bãi đẻ và bảo vệ trứng rùa khỏi triều ngập',
    protectiveSolution: 'Bảo vệ các bãi đẻ rùa biển tự nhiên, hạn chế ánh sáng đèn biển mùa rùa lên bãi',
    iucnStatus: 'EN (Nguy cấp - Sách Đỏ)',
    recordType: 'estimated',
    recordTypeLabel: 'Ước tính tham khảo sinh cảnh vùng',
    recordedLocation: 'Bãi Cát Lớn, Bãi Dương, Hòn Bảy Cạnh, VQG Côn Đảo',
    recordedYear: '2023 - 2026',
    source: 'Ước tính tham khảo — chưa có tài liệu đối chiếu',
    verificationMethod: 'Tài liệu sinh quyển vùng Côn Đảo',
  },
  {
    id: 'ca-thoi-loi-can-gio',
    name: 'Cá thòi lòi bãi bồi',
    scientificName: 'Periophthalmodon schlosseri',
    realm: 'amphibian',
    realmLabel: 'Lưỡng cư & Bò sát',
    region: 'Vùng bãi bồi cửa sông ven biển Cần Giờ & Nhà Bè',
    trendType: 'increase_stable',
    trendLabel: 'ỔN ĐỊNH ↗',
    val2023: 'Mật độ 18 - 22 cá thể / 100m² bãi bồi',
    val2026: 'Mật độ 24 - 28 cá thể / 100m² bãi bồi ven rừng',
    statusText: 'Sinh sống tại các bãi bùn cửa sông Lòng Tàu và Soài Rạp',
    cause: 'Giữ gìn thảm bùn tự nhiên vùng ngập mặn',
    protectiveSolution: 'Duy trì dải rừng mắm tiên phong chắn sóng và bảo tồn bãi triều',
    iucnStatus: 'LC (Ít quan tâm - Loài chỉ thị)',
    recordType: 'estimated',
    recordTypeLabel: 'Ước tính tham khảo sinh cảnh vùng',
    recordedLocation: 'Bãi bồi cửa sông Soài Rạp và sông Lòng Tàu',
    recordedYear: '2023 - 2026',
    source: 'Ước tính tham khảo — chưa có tài liệu đối chiếu',
    verificationMethod: 'Tài liệu sinh thái rừng ngập mặn',
  },
  {
    id: 'khi-duoi-dai-can-gio',
    name: 'Khỉ đuôi dài Cần Giờ',
    scientificName: 'Macaca fascicularis',
    realm: 'terrestrial',
    realmLabel: 'Trên cạn',
    region: 'Khu vực rừng ngập mặn Cần Giờ',
    trendType: 'increase_stable',
    trendLabel: 'ỔN ĐỊNH ↗',
    val2023: '~1.860 cá thể ước tính',
    val2026: '~2.204 cá thể ước tính',
    statusText: 'Quần thể thích nghi tự nhiên trên thảm rừng đước',
    cause: 'Bảo vệ nghiêm ngặt diện tích rừng phòng hộ ngập mặn',
    protectiveSolution: 'Bảo vệ nguồn thức ăn tự nhiên trên tán rừng, ngăn ngừa can thiệp nhân tạo',
    iucnStatus: 'VU (Sắp nguy cấp)',
    recordType: 'estimated',
    recordTypeLabel: 'Ước tính tham khảo sinh cảnh vùng',
    recordedLocation: 'Rừng phòng hộ ngập mặn Cần Giờ',
    recordedYear: '2023 - 2026',
    source: 'Ước tính tham khảo — chưa có tài liệu đối chiếu',
    verificationMethod: 'Tài liệu sinh quyển vùng Cần Giờ',
  },
  {
    id: 'bo-nong-chan-xam',
    name: 'Bồ nông chân xám',
    scientificName: 'Pelecanus philippensis',
    realm: 'aerial',
    realmLabel: 'Trên không',
    region: 'Vùng đầm lầy cửa sông Cần Giờ',
    trendType: 'recovered_high',
    trendLabel: 'TÁI XUẤT HIỆN ★',
    val2023: 'Ghi nhận cá thể di cư tạm trú',
    val2026: 'Xuất hiện các đàn di cư theo mùa',
    statusText: 'Loài chim nước di cư quay lại các bãi ăn tự nhiên',
    cause: 'Nguồn thủy sản vùng ngập mặn được phục hồi tự nhiên',
    protectiveSolution: 'Bảo vệ vùng đất ngập nước, ngăn ngừa săn bắt chim hoang dã',
    iucnStatus: 'NT (Sắp bị đe dọa)',
    recordType: 'estimated',
    recordTypeLabel: 'Ước tính tham khảo sinh cảnh vùng',
    recordedLocation: 'Đầm lầy ngập mặn ven biển Cần Giờ',
    recordedYear: '2024 - 2026',
    source: 'Ước tính tham khảo — chưa có tài liệu đối chiếu',
    verificationMethod: 'Tài liệu chim di cư vùng ngập mặn',
  },
  {
    id: 'ca-thuy-sinh-song-sai-gon',
    name: 'Cá bản địa sông Sài Gòn & Kênh rạch',
    scientificName: 'Cyprinidae / Pangasiidae',
    realm: 'underwater',
    realmLabel: 'Biển & Thủy sinh',
    region: 'Hành lang sông Sài Gòn & kênh Nhiêu Lộc - Thị Nghè',
    trendType: 'recovered_high',
    trendLabel: 'PHỤC HỒI TỰ NHIÊN ★',
    val2023: 'Chỉ số oxy hòa tan (DO) cải thiện nhẹ',
    val2026: 'Tăng mật độ thủy sinh bản địa sau xử lý nước thải',
    statusText: 'Hệ vi sinh và thủy sản thích nghi môi trường nước cải thiện',
    cause: 'Vận hành sục khí oxy và thu gom xử lý nước thải sinh hoạt',
    protectiveSolution: 'Bảo tồn bờ kè sinh thái tự nhiên, cấm xả thải chưa qua xử lý',
    iucnStatus: 'VU/LC (Nhóm loài hồi sinh)',
    recordType: 'estimated',
    recordTypeLabel: 'Ước tính tham khảo sinh cảnh vùng',
    recordedLocation: 'Hành lang sông Sài Gòn và tuyến kênh rạch đô thị',
    recordedYear: '2023 - 2026',
    source: 'Ước tính tham khảo — chưa có tài liệu đối chiếu',
    verificationMethod: 'Tài liệu thủy sinh lưu vực sông',
  },
  {
    id: 'ca-nuoc-ngot-tay-bac',
    name: 'Cá nước ngọt vùng nông nghiệp Tây Bắc',
    scientificName: 'Anabas testudineus, Channa striata',
    realm: 'underwater',
    realmLabel: 'Biển & Thủy sinh',
    region: 'Vùng nông nghiệp sinh thái Củ Chi, Hóc Môn, Bình Chánh, Bến Cát',
    trendType: 'decrease_temporary',
    trendLabel: 'BIẾN ĐỘNG HẠN MẶN ↘',
    val2023: 'Quần thể cá đồng nội địa duy trì trong mương rạch',
    val2026: 'Hồi phục sau đợt biến động xâm nhập mặn 2024',
    statusText: 'Chịu tác động mùa khô hạn, phục hồi vào mùa mưa',
    cause: 'Biến động dòng chảy và xâm nhập mặn theo mùa',
    protectiveSolution: 'Duy trì dòng chảy sông kênh rạch nông nghiệp',
    iucnStatus: 'LC (Ổn định trở lại)',
    recordType: 'estimated',
    recordTypeLabel: 'Ước tính tham khảo sinh cảnh vùng',
    recordedLocation: 'Hệ thống kênh rạch nông nghiệp ngoại thành',
    recordedYear: '2023 - 2026',
    source: 'Ước tính tham khảo — chưa có tài liệu đối chiếu',
    verificationMethod: 'Tài liệu thủy sinh nội địa',
  },
  {
    id: 'soc-den-con-dao',
    name: 'Sóc đen Côn Đảo',
    scientificName: 'Ratufa bicolor condorensis',
    realm: 'terrestrial',
    realmLabel: 'Trên cạn',
    region: 'Rừng nguyên sinh hải đảo Côn Đảo',
    trendType: 'increase_stable',
    trendLabel: 'ỔN ĐỊNH ↗',
    val2023: 'Quần thể đặc hữu trên tán rừng',
    val2026: 'Ghi nhận phân bố ổn định trên tán cây gỗ lớn',
    statusText: 'Loài phân loài đặc hữu Côn Đảo sống trên tán rừng',
    cause: 'Sinh cảnh rừng nguyên sinh hải đảo được giữ gìn trọn vẹn',
    protectiveSolution: 'Bảo vệ cây cổ thụ và thảm rừng nguyên sinh Côn Đảo',
    iucnStatus: 'EN (Nguy cấp - Đặc hữu)',
    recordType: 'estimated',
    recordTypeLabel: 'Ước tính tham khảo sinh cảnh vùng',
    recordedLocation: 'Rừng nguyên sinh VQG Côn Đảo',
    recordedYear: '2023 - 2026',
    source: 'Ước tính tham khảo — chưa có tài liệu đối chiếu',
    verificationMethod: 'Tài liệu động vật rừng hải đảo',
  },
  {
    id: 'ran-san-ho-con-dao',
    name: 'Rạn san hô cành tự nhiên',
    scientificName: 'Acropora formosa / Porites',
    realm: 'underwater',
    realmLabel: 'Biển & Thủy sinh',
    region: 'Vùng biển Côn Đảo (Hòn Cau, Hòn Tre, Hòn Tài)',
    trendType: 'increase_strong',
    trendLabel: 'PHỤC HỒI RẠN ↗',
    val2023: 'Độ phủ san hô sống phục hồi cục bộ',
    val2026: 'Tăng diện tích tái tạo san hô trên giá thể tự nhiên',
    statusText: 'Hồi phục nhờ bảo vệ rạn và cấm thả neo cơ giới',
    cause: 'Kiểm soát neo đậu tàu thuyền và bảo vệ thềm san hô',
    protectiveSolution: 'Lắp phao neo nổi chuyên dụng, cấm cào xới đáy biển rạn san hô',
    iucnStatus: 'VU (Sắp nguy cấp)',
    recordType: 'estimated',
    recordTypeLabel: 'Ước tính tham khảo sinh cảnh vùng',
    recordedLocation: 'Vùng biển bảo tồn rạn san hô Côn Đảo',
    recordedYear: '2023 - 2026',
    source: 'Ước tính tham khảo — chưa có tài liệu đối chiếu',
    verificationMethod: 'Tài liệu khảo sát rạn san hô vùng biển',
  },
  {
    id: 'chim-boi-ca-kenh-do-thi',
    name: 'Chim Bói cá & Vạc sậy',
    scientificName: 'Alcedo atthis / Nycticorax nycticorax',
    realm: 'aerial',
    realmLabel: 'Trên không',
    region: 'Hành lang sông Sài Gòn & bán đảo Thanh Đa',
    trendType: 'increase_strong',
    trendLabel: 'TĂNG GHI NHẬN ↗',
    val2023: 'Xuất hiện rải rác dọc mép rạch',
    val2026: 'Thường xuyên ghi nhận kiếm ăn dọc thảm thực vật bờ sông',
    statusText: 'Loài chim nước săn cá nhỏ tại vùng ven sông',
    cause: 'Giữ gìn thảm thực vật dừa nước, lục bình ven bờ kè',
    protectiveSolution: 'Bảo vệ dải cây ven bờ sông tạo chỗ đậu rình mồi cho chim',
    iucnStatus: 'LC (Chỉ thị sinh thái)',
    recordType: 'estimated',
    recordTypeLabel: 'Ước tính tham khảo sinh cảnh vùng',
    recordedLocation: 'Bán đảo Thanh Đa và rạch ven sông Sài Gòn',
    recordedYear: '2023 - 2026',
    source: 'Ước tính tham khảo — chưa có tài liệu đối chiếu',
    verificationMethod: 'Tài liệu chim nước đô thị',
  },
  {
    id: 'duoc-doi-can-gio',
    name: 'Rừng cây Đước đôi & Bần trắng',
    scientificName: 'Rhizophora apiculata / Sonneratia alba',
    realm: 'terrestrial',
    realmLabel: 'Trên cạn',
    region: 'Toàn bộ thảm rừng ngập mặn Cần Giờ ven biển',
    trendType: 'increase_stable',
    trendLabel: 'MỞ RỘNG DIỆN TÍCH ↗',
    val2023: 'Diện tích rừng ngập mặn duy trì rộng lớn',
    val2026: 'Phục hồi bổ sung các diện tích bãi bồi ven biển',
    statusText: 'Rừng ngập mặn hấp thụ carbon và chắn triều cường',
    cause: 'Chương trình trồng phục hồi và bảo vệ rừng ngập mặn',
    protectiveSolution: 'Bảo vệ nghiêm ngặt thảm rừng đước, mắm và bần ven biển',
    iucnStatus: 'LC (Loài ưu thế)',
    recordType: 'estimated',
    recordTypeLabel: 'Ước tính tham khảo sinh cảnh vùng',
    recordedLocation: 'Thảm rừng ngập mặn ven biển Cần Giờ',
    recordedYear: '2023 - 2026',
    source: 'Ước tính tham khảo — chưa có tài liệu đối chiếu',
    verificationMethod: 'Tài liệu sinh quyển rừng ngập mặn',
  },
];

export interface EcoZoneTrendComparison {
  zoneId: string;
  zoneName: string;
  speciesRecorded2023: number;
  speciesRecorded2026: number;
  habitatAreaHa: string;
  dataClassification: string;
  dataSource: string;
  surveyMethod: string;
  keyHighlight: string;
  score2023: number;
  score2024: number;
  score2025: number;
  score2026: number;
  growthRate: number;
}

export const ECO_ZONES_TREND_DATA: EcoZoneTrendComparison[] = [
  {
    zoneId: 'can-gio',
    zoneName: 'Khu DTSQ Rừng ngập mặn Cần Giờ',
    speciesRecorded2023: 840,
    speciesRecorded2026: 955,
    habitatAreaHa: '38.900 ha',
    dataClassification: 'Dữ liệu sinh thái tham khảo theo vùng',
    dataSource: 'Ước tính tham khảo — chưa có tài liệu đối chiếu',
    surveyMethod: 'Tài liệu sinh thái tổng hợp vùng rừng ngập mặn',
    keyHighlight: 'Rừng đước chắn sóng, bồ nông chân xám, khỉ đuôi dài thích nghi môi trường bãi bồi.',
    score2023: 78.5,
    score2024: 80.2,
    score2025: 86.4,
    score2026: 92.0,
    growthRate: 17.2,
  },
  {
    zoneId: 'con-dao',
    zoneName: 'Vườn Quốc gia & Biển Côn Đảo',
    speciesRecorded2023: 1050,
    speciesRecorded2026: 1195,
    habitatAreaHa: '19.998 ha (gồm 5.998 ha đảo và 14.000 ha biển)',
    dataClassification: 'Dữ liệu sinh thái tham khảo theo vùng',
    dataSource: 'Ước tính tham khảo — chưa có tài liệu đối chiếu',
    surveyMethod: 'Tài liệu sinh thái tổng hợp vùng biển đảo',
    keyHighlight: 'Bãi đẻ rùa biển Vích, san hô cành, thảm cỏ biển, sóc đen và thạch sùng ngón đặc hữu.',
    score2023: 82.0,
    score2024: 84.5,
    score2025: 91.2,
    score2026: 96.5,
    growthRate: 17.7,
  },
  {
    zoneId: 'sai-gon-river',
    zoneName: 'Hành lang Sông Sài Gòn & Kênh rạch',
    speciesRecorded2023: 125,
    speciesRecorded2026: 168,
    habitatAreaHa: 'Khoảng 4.200 ha diện tích mặt nước',
    dataClassification: 'Dữ liệu sinh thái tham khảo theo vùng',
    dataSource: 'Ước tính tham khảo — chưa có tài liệu đối chiếu',
    surveyMethod: 'Tài liệu sinh thái tổng hợp lưu vực sông',
    keyHighlight: 'Hệ thủy sinh bản địa sông rạch, thảm thực vật ven kè bãi bồi phục hồi.',
    score2023: 54.0,
    score2024: 56.5,
    score2025: 66.0,
    score2026: 74.5,
    growthRate: 38.0,
  },
  {
    zoneId: 'northwest-agro',
    zoneName: 'Vùng Đệm Nông nghiệp Sinh thái Tây Bắc',
    speciesRecorded2023: 210,
    speciesRecorded2026: 245,
    habitatAreaHa: 'Khoảng 18.500 ha đất nông nghiệp sinh thái (Củ Chi, Hóc Môn, Bến Cát)',
    dataClassification: 'Dữ liệu sinh thái tham khảo theo vùng',
    dataSource: 'Ước tính tham khảo — chưa có tài liệu đối chiếu',
    surveyMethod: 'Tài liệu sinh thái nông nghiệp nông thôn',
    keyHighlight: 'Hệ sinh thái đồng ruộng, cá đồng mương rạch và vườn cây ăn trái sinh thái.',
    score2023: 63.0,
    score2024: 60.5,
    score2025: 68.0,
    score2026: 75.0,
    growthRate: 19.0,
  },
  {
    zoneId: 'urban-core',
    zoneName: 'Mảng Xanh Đô thị & Công viên Trung tâm',
    speciesRecorded2023: 95,
    speciesRecorded2026: 118,
    habitatAreaHa: 'Hơn 550 ha công viên cây xanh đô thị',
    dataClassification: 'Dữ liệu tham khảo sinh thái đô thị',
    dataSource: 'Ước tính tham khảo — chưa có tài liệu đối chiếu',
    surveyMethod: 'Tài liệu sinh thái đô thị',
    keyHighlight: 'Cây bóng mát đô thị, chim sẻ nhà, bồ câu, dơi đô thị và các loài côn trùng có ích.',
    score2023: 51.5,
    score2024: 52.2,
    score2025: 58.0,
    score2026: 66.0,
    growthRate: 28.2,
  },
];
