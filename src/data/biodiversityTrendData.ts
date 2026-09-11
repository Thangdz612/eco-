// Dữ liệu xu hướng biến động đa dạng sinh học TP.HCM & Côn Đảo giai đoạn 2023 - 2026
// Nguồn tham chiếu: Chi cục Kiểm lâm TP.HCM, Ban Quản lý Khu DTSQ Cần Giờ, Vườn Quốc gia Côn Đảo & Sở TN&MT TP.HCM

export interface AnnualBiodiversityRecord {
  year: number;
  label: string;
  underwater: number; // Chỉ số quần thể thủy sinh & sinh vật biển (thang 100)
  aerial: number; // Chỉ số quần thể chim & sinh vật trên không
  terrestrial: number; // Chỉ số động thực vật trên cạn
  amphibian: number; // Chỉ số lưỡng cư & bò sát
  overallScore: number; // Điểm đa dạng sinh thái trung bình
  speciesCount: number; // Tổng số loài được khảo sát & định danh
  endangeredProtected: number; // Số cá thể nguy cấp Sách Đỏ được bảo vệ/nhân giống
  mangroveForestHa: number; // Diện tích rừng ngập mặn & thảm xanh bảo tồn (ha)
  milestone: string;
  stressFactor: string;
  conservationAction: string;
}

export const BIODIVERSITY_ANNUAL_TRENDS: AnnualBiodiversityRecord[] = [
  {
    year: 2023,
    label: '2023',
    underwater: 68.2,
    aerial: 62.0,
    terrestrial: 74.0,
    amphibian: 59.0,
    overallScore: 65.8,
    speciesCount: 1420,
    endangeredProtected: 3120,
    mangroveForestHa: 37800,
    milestone: 'Khởi động điều tra tổng thể đa dạng sinh thái TP.HCM mở rộng và Côn Đảo sau đại dịch',
    stressFactor: 'Áp lực mở rộng hạ tầng ven biển và xả thải sinh hoạt kênh rạch',
    conservationAction: 'Thiết lập mạng lưới 12 trạm quan trắc tự động và cắm mốc vùng lõi sinh quyển Cần Giờ',
  },
  {
    year: 2024,
    label: '2024',
    underwater: 65.4,
    aerial: 66.8,
    terrestrial: 75.6,
    amphibian: 56.2,
    overallScore: 66.0,
    speciesCount: 1435,
    endangeredProtected: 3340,
    mangroveForestHa: 38050,
    milestone: 'Vận hành 14 trạm sục khí oxy liên tục kênh Nhiêu Lộc; khoanh vùng 4 bãi đẻ rùa biển Côn Đảo',
    stressFactor: 'Hiện tượng El Niño khô hạn gay gắt và xâm nhập mặn kỷ lục làm giảm nhẹ cá nước ngọt ven rạch Tây Bắc',
    conservationAction: 'Điều tiết nước hồ Dầu Tiếng đẩy mặn; cứu hộ 1.850 tổ trứng rùa biển thành công',
  },
  {
    year: 2025,
    label: '2025',
    underwater: 76.5,
    aerial: 74.2,
    terrestrial: 80.8,
    amphibian: 64.5,
    overallScore: 74.0,
    speciesCount: 1512,
    endangeredProtected: 4180,
    mangroveForestHa: 38420,
    milestone: 'Nghị quyết 98 thúc đẩy kinh tế tuần hoàn và Đề án Cần Giờ Net-Zero; chim bồ nông chân xám quay lại làm tổ',
    stressFactor: 'Sóng nhiệt đô thị cục bộ và biến động dòng chảy sông Đồng Nai',
    conservationAction: 'Trồng mới 370 ha rừng đước phục hồi; cấy ghép 45 ha rạn san hô Côn Đảo; thả 2.400 rùa con về biển',
  },
  {
    year: 2026,
    label: '2026 (Hiện tại)',
    underwater: 84.2,
    aerial: 81.0,
    terrestrial: 87.0,
    amphibian: 71.0,
    overallScore: 80.8,
    speciesCount: 1586,
    endangeredProtected: 5250,
    mangroveForestHa: 38900,
    milestone: 'Đạt mốc 1.586 loài định danh; phục hồi 65% sinh vật tầng đáy benthos; diện tích rừng ngập mặn chạm mốc 38.900 ha',
    stressFactor: 'Thách thức vi nhựa biển và biến đổi vi khí hậu vùng cửa sông',
    conservationAction: 'Tuần tra thông minh ứng dụng máy bay không người lái (UAV) và cấm đánh bắt mùa cá sinh sản',
  },
];

// Chi tiết biến động từng loài sinh vật tiêu biểu (Tăng / Giảm từ 2023 đến 2026)
export interface SpeciesTrendItem {
  id: string;
  name: string;
  scientificName: string;
  realm: 'underwater' | 'aerial' | 'terrestrial' | 'amphibian';
  realmLabel: string;
  region: string;
  trendType: 'increase_strong' | 'increase_stable' | 'decrease_temporary' | 'recovered_high';
  trendLabel: string;
  percentageChange: number; // % biến động từ 2023 đến 2026
  val2023: string;
  val2026: string;
  statusText: string;
  cause: string;
  protectiveSolution: string;
  iucnStatus: string;
}

export const SPECIES_TREND_DETAILS: SpeciesTrendItem[] = [
  {
    id: 'vich-con-dao',
    name: 'Rùa biển Vích',
    scientificName: 'Chelonia mydas',
    realm: 'underwater',
    realmLabel: 'Biển & Thủy sinh',
    region: 'Đặc khu Côn Đảo (Bãi Cát Lớn, Bãi Dương, Hòn Bảy Cạnh)',
    trendType: 'increase_strong',
    trendLabel: 'TĂNG MẠNH ↗',
    percentageChange: 42.3,
    val2023: '1.850 ổ trứng (khoảng 148.000 rùa con nở)',
    val2026: '2.632 ổ trứng (hơn 210.000 rùa con về biển an toàn)',
    statusText: 'Đạt kỷ lục số cá thể nở tự nhiên cao nhất 10 năm qua',
    cause: 'Mạng lưới kiểm lâm túc trực di dời trứng tránh triều cường ngập và chống trộm trứng tuyệt đối',
    protectiveSolution: 'Bảo vệ nghiêm ngặt 14 bãi đẻ rùa biển, tắt đèn pha tàu thuyền ven bờ mùa rùa lên đẻ trứng',
    iucnStatus: 'EN (Nguy cấp - Sách Đỏ)',
  },
  {
    id: 'ca-thoi-loi-can-gio',
    name: 'Cá thòi lòi bãi bồi',
    scientificName: 'Periophthalmodon schlosseri',
    realm: 'amphibian',
    realmLabel: 'Lưỡng cư & Bò sát',
    region: 'Cần Giờ (Tam Thôn Hiệp, Lý Nhơn, Cần Thạnh) & Nhà Bè',
    trendType: 'increase_stable',
    trendLabel: 'TĂNG ỔN ĐỊNH ↗',
    percentageChange: 22.1,
    val2023: 'Mật độ 18 - 22 cá thể / 100m² bãi bồi',
    val2026: 'Mật độ 24 - 28 cá thể / 100m² bãi bồi ven rừng',
    statusText: 'Sinh sản mạnh tại các cửa sông Lòng Tàu và Soài Rạp',
    cause: 'Giữ gìn nguyên vẹn bùn hữu cơ bãi triều, cấm nạo vét phá hủy hang đào ngầm',
    protectiveSolution: 'Duy trì dải cây mắm tiên phong giữ bùn phù sa, ngăn chặn đánh bắt bằng hóa chất',
    iucnStatus: 'LC (Ít quan tâm - Loài chỉ thị)',
  },
  {
    id: 'khi-duoi-dai-can-gio',
    name: 'Khỉ đuôi dài Cần Giờ',
    scientificName: 'Macaca fascicularis',
    realm: 'terrestrial',
    realmLabel: 'Trên cạn',
    region: 'Khu du lịch Rừng Sác Cần Giờ & Đảo Khỉ',
    trendType: 'increase_stable',
    trendLabel: 'TĂNG ỔN ĐỊNH ↗',
    percentageChange: 18.5,
    val2023: 'Khoảng 1.860 cá thể',
    val2026: 'Hơn 2.204 cá thể phân bố 8 đàn lớn',
    statusText: 'Quần thể ổn định, sức khỏe tốt, hạn chế xung đột với du khách',
    cause: 'Kiểm soát tốt nguồn thức ăn tự nhiên trên tán đước, tiêm phòng và giám sát y tế định kỳ',
    protectiveSolution: 'Nghiêm cấm cho khỉ ăn rác thải nhựa và đồ ngọt công nghiệp, thiết lập ranh giới an toàn',
    iucnStatus: 'VU (Sắp nguy cấp)',
  },
  {
    id: 'bo-nong-chan-xam',
    name: 'Bồ nông chân xám',
    scientificName: 'Pelecanus philippensis',
    realm: 'aerial',
    realmLabel: 'Trên không',
    region: 'Vùng lõi Khu dự trữ sinh quyển Cần Giờ',
    trendType: 'recovered_high',
    trendLabel: 'HỒI PHỤC VƯỢT BẬC ★',
    percentageChange: 35.0,
    val2023: 'Ghi nhận 42 cá thể di cư tạm trú',
    val2026: 'Ghi nhận 68 cá thể, bắt đầu ghi nhận 6 cặp làm tổ sinh sản',
    statusText: 'Loài chim nước quý hiếm toàn cầu quay lại định cư',
    cause: 'Nguồn cá tôm đầm ngập mặn phục hồi dồi dào và vùng lõi cấm hoàn toàn tàu cá cơ giới gây ồn',
    protectiveSolution: 'Thiết lập vùng cấm bay tầm thấp của thiết bị bay không người lái và cấm săn bắt lưới mờ',
    iucnStatus: 'NT (Sắp bị đe dọa)',
  },
  {
    id: 'ca-thuy-sinh-song-sai-gon',
    name: 'Cá bản địa sông Sài Gòn & Kênh rạch',
    scientificName: 'Cyprinidae / Pangasiidae',
    realm: 'underwater',
    realmLabel: 'Biển & Thủy sinh',
    region: 'Sông Sài Gòn (Thủ Đức, Củ Chi, Q1) & Kênh Nhiêu Lộc - Thị Nghè',
    trendType: 'recovered_high',
    trendLabel: 'HỒI PHỤC VƯỢT BẬC ★',
    percentageChange: 31.4,
    val2023: '14 loài cá tự nhiên, mật độ oxy hòa tan (DO) 3.1 mg/L',
    val2026: '26 loài cá tự nhiên, mật độ oxy hòa tan (DO) 4.8 - 5.4 mg/L',
    statusText: 'Hồi sinh ấn tượng sau khi nhà máy xử lý nước thải vận hành',
    cause: '14 trạm sục khí oxy mini hoạt động 24/7 và giảm 70% nước thải sinh hoạt xả thẳng',
    protectiveSolution: 'Thả cá tái tạo nguồn lợi thủy sản hàng quý; phạt nặng hành vi chích điện và lưới mắt dày',
    iucnStatus: 'VU/LC (Nhóm loài hồi sinh)',
  },
  {
    id: 'ca-nuoc-ngot-tay-bac',
    name: 'Cá nước ngọt vùng nông nghiệp Tây Bắc',
    scientificName: 'Anabas testudineus, Channa striata',
    realm: 'underwater',
    realmLabel: 'Biển & Thủy sinh',
    region: 'Củ Chi, Hóc Môn, Bình Chánh, Bến Cát (kênh Thầy Cai, An Hạ)',
    trendType: 'decrease_temporary',
    trendLabel: 'GIẢM TẠM THỜI (2024) ↘',
    percentageChange: 7.8, // Giảm -4.8% trong 2024, sau đó phục hồi ròng +7.8% đến 2026
    val2023: 'Chỉ số quần thể 72 điểm',
    val2026: 'Chỉ số chạm đáy 68.5 (2024) trước khi hồi phục lên 77.6 (2026)',
    statusText: 'Chịu đợt sốc nhiệt & xâm nhập mặn El Niño 2024, đã phục hồi nhờ thau chua rửa mặn',
    cause: 'Hạn hán kỷ lục 2024 làm giảm lưu lượng nước ngọt kênh mương nông nghiệp',
    protectiveSolution: 'Xả nước định kỳ từ hồ Dầu Tiếng, nạo vét kênh mương tạo hố trữ nước sinh thái mùa khô',
    iucnStatus: 'LC (Ổn định trở lại)',
  },
  {
    id: 'soc-den-con-dao',
    name: 'Sóc đen Côn Đảo',
    scientificName: 'Ratufa bicolor condorensis',
    realm: 'terrestrial',
    realmLabel: 'Trên cạn',
    region: 'Vườn Quốc gia Côn Đảo (Rừng Sở Rẫy, Hòn Bà, Núi Thánh Giá)',
    trendType: 'increase_stable',
    trendLabel: 'TĂNG ỔN ĐỊNH ↗',
    percentageChange: 14.2,
    val2023: 'Khoảng 480 cá thể ghi nhận qua bẫy ảnh',
    val2026: 'Ước tính hơn 548 cá thể khỏe mạnh',
    statusText: 'Loài đặc hữu Côn Đảo phát triển mạnh trên tán cây dầu, dẹp',
    cause: 'Tán rừng nguyên sinh hải đảo được giữ trọn vẹn 100%, không bị chia cắt sinh cảnh',
    protectiveSolution: 'Cầu dây sinh thái cho sóc qua đường nội đảo, cấm hoàn toàn hoạt động chặt tỉa cây cổ thụ',
    iucnStatus: 'EN (Nguy cấp - Đặc hữu)',
  },
  {
    id: 'ran-san-ho-con-dao',
    name: 'Rạn san hô cành tự nhiên',
    scientificName: 'Acropora formosa / Porites',
    realm: 'underwater',
    realmLabel: 'Biển & Thủy sinh',
    region: 'Vịnh Côn Sơn, Hòn Cau, Hòn Tre Lớn, Hòn Tài (Côn Đảo)',
    trendType: 'increase_strong',
    trendLabel: 'TĂNG MẠNH ↗',
    percentageChange: 28.0,
    val2023: 'Độ che phủ san hô sống 48.2%',
    val2026: 'Độ che phủ phục hồi đạt 61.7% (tăng +13.5% độ che phủ tuyệt đối)',
    statusText: 'Hồi phục nhanh nhờ công nghệ ươm cấy giá thể nhân tạo',
    cause: 'Chiến dịch thu gom sao biển gai ăn san hô và kiểm soát nghiêm neo đậu tàu du lịch',
    protectiveSolution: 'Lắp đặt 120 phao neo nổi chuyên dụng, cấm tàu du lịch thả neo cày xới đáy rạn san hô',
    iucnStatus: 'VU (Sắp nguy cấp)',
  },
  {
    id: 'chim-boi-ca-kenh-do-thi',
    name: 'Chim Bói cá & Vạc sậy',
    scientificName: 'Alcedo atthis / Nycticorax nycticorax',
    realm: 'aerial',
    realmLabel: 'Trên không',
    region: 'Hành lang sông Sài Gòn, bán đảo Thanh Đa, Cần Giờ',
    trendType: 'increase_strong',
    trendLabel: 'TĂNG MẠNH ↗',
    percentageChange: 26.5,
    val2023: 'Xuất hiện rải rác 110 - 130 cá thể dọc kênh',
    val2026: 'Hơn 165 cá thể thường xuyên săn mồi trên rạch Láng Le và sông Sài Gòn',
    statusText: 'Minh chứng cho nguồn cá con và nước mặt kênh rạch được cải thiện',
    cause: 'Dải cây thủy sinh lộc vừng, dừa nước ven bờ kè được giữ gìn làm cành đậu rình mồi',
    protectiveSolution: 'Không bêtông hóa trắng bờ kè rạch, trồng xen thảm thực vật bản địa',
    iucnStatus: 'LC (Chỉ thị sinh thái)',
  },
  {
    id: 'duoc-doi-can-gio',
    name: 'Rừng cây Đước đôi & Bần trắng',
    scientificName: 'Rhizophora apiculata / Sonneratia alba',
    realm: 'terrestrial',
    realmLabel: 'Trên cạn',
    region: 'Toàn bộ 7 xã huyện Cần Giờ ven biển Đông',
    trendType: 'increase_stable',
    trendLabel: 'TĂNG ỔN ĐỊNH ↗',
    percentageChange: 2.9,
    val2023: '37.800 ha diện tích có rừng che phủ',
    val2026: '38.900 ha (Trồng bổ sung thành công 1.100 ha rừng mới)',
    statusText: 'Bức tường xanh vững chắc hấp thụ CO2 và chắn triều dâng',
    cause: 'Chương trình "Trồng 1 triệu cây xanh" và giao khoán bảo vệ rừng gắn quyền lợi người dân',
    protectiveSolution: 'Lực lượng bảo vệ rừng tuần tra 24/7, ứng dụng viễn thám GIS phát hiện sớm suy thoái rừng',
    iucnStatus: 'LC (Loài ưu thế)',
  },
];

// So sánh tỷ lệ tăng trưởng theo 5 vùng sinh thái chiến lược
export interface EcoZoneTrendComparison {
  zoneId: string;
  zoneName: string;
  score2023: number;
  score2024: number;
  score2025: number;
  score2026: number;
  growthRate: number; // % tăng ròng
  keyHighlight: string;
}

export const ECO_ZONES_TREND_DATA: EcoZoneTrendComparison[] = [
  {
    zoneId: 'can-gio',
    zoneName: 'Khu DTSQ Rừng ngập mặn Cần Giờ',
    score2023: 78.5,
    score2024: 80.2,
    score2025: 86.4,
    score2026: 92.0,
    growthRate: 17.2,
    keyHighlight: 'Rừng đước đạt 38.900 ha, bồ nông chân xám quay lại, quần thể khỉ đuôi dài phát triển ổn định.',
  },
  {
    zoneId: 'con-dao',
    zoneName: 'Vườn Quốc gia & Biển Côn Đảo',
    score2023: 82.0,
    score2024: 84.5,
    score2025: 91.2,
    score2026: 96.5,
    growthRate: 17.7,
    keyHighlight: 'Hơn 2.600 ổ rùa biển Vích, san hô cành phủ 61.7%, sóc đen và chim bồ câu Nicobar sinh sản tốt.',
  },
  {
    zoneId: 'sai-gon-river',
    zoneName: 'Hành lang Sông Sài Gòn & Kênh rạch',
    score2023: 54.0,
    score2024: 56.5,
    score2025: 66.0,
    score2026: 74.5,
    growthRate: 38.0,
    keyHighlight: 'Tỷ lệ tăng trưởng cao nhất (+38%) nhờ 14 trạm sục khí oxy và nhà máy xử lý nước thải Nhiêu Lộc - Thị Nghè.',
  },
  {
    zoneId: 'northwest-agro',
    zoneName: 'Vùng Đệm Nông nghiệp Sinh thái Tây Bắc',
    score2023: 63.0,
    score2024: 60.5,
    score2025: 68.0,
    score2026: 75.0,
    growthRate: 19.0,
    keyHighlight: 'Vượt qua hạn mặn El Niño năm 2024; cá đồng và vườn cây sinh thái hữu cơ hồi sinh mạnh mẽ.',
  },
  {
    zoneId: 'urban-core',
    zoneName: 'Mảng Xanh Đô thị & Công viên Trung tâm',
    score2023: 51.5,
    score2024: 52.2,
    score2025: 58.0,
    score2026: 66.0,
    growthRate: 28.2,
    keyHighlight: 'Mở rộng 150 ha công viên cây xanh công cộng mới, chim sẻ nhà, bồ câu và dơi đô thị thích nghi tốt.',
  },
];
