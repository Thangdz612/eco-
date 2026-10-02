/**
 * Danh bạ 168 Đơn vị hành chính cấp xã (TP.HCM mở rộng)
 * Bao gồm: 113 Phường, 54 Xã, 1 Đặc khu Côn Đảo
 * Chuẩn hóa theo Nghị quyết 1685/NQ-UBTVQH15
 * 
 * Mỗi đơn vị chỉ lưu trữ các thuộc tính định danh & trắc địa:
 * { id, name, subTitle, districtGroup, adminType, lat, lng }
 * Dữ liệu khí tượng & chất lượng không khí được nạp động từ Open-Meteo API.
 */

export interface AdminUnit {
  id: string;
  name: string;
  subTitle: string;
  districtGroup: string;
  adminType: 'phường' | 'xã' | 'đặc khu';
  lat: number;
  lng: number;
}

export type AdminUnitInfo = AdminUnit;

export const ADMIN_UNITS: AdminUnit[] = [
  {
    "id": "quan-1",
    "name": "Phường Sài Gòn, Quận 1",
    "subTitle": "Trung tâm hành chính & tài chính TP.HCM",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.7769,
    "lng": 106.7009
  },
  {
    "id": "hcm-q1-tandinh",
    "name": "Phường Tân Định, Quận 1",
    "subTitle": "Khu dân cư lịch sử & Chợ Tân Định",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.7915,
    "lng": 106.6912
  },
  {
    "id": "hcm-q1-benthanh",
    "name": "Phường Bến Thành, Quận 1",
    "subTitle": "Chợ Bến Thành & Công viên 23/9",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.7725,
    "lng": 106.698
  },
  {
    "id": "hcm-q1-cauonglanh",
    "name": "Phường Cầu Ông Lãnh, Quận 1",
    "subTitle": "Bến Chương Dương & đại lộ Võ Văn Kiệt",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.763,
    "lng": 106.6975
  },
  {
    "id": "hcm-q1-choquan",
    "name": "Phường Chợ Quán, Quận 1",
    "subTitle": "Di tích lịch sử Bệnh viện Chợ Quán",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.758,
    "lng": 106.685
  },
  {
    "id": "hcm-q3-banco",
    "name": "Phường Bàn Cờ, Quận 3",
    "subTitle": "Mạng lưới phố bàn cờ & di sản ẩm thực",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.7712,
    "lng": 106.6815
  },
  {
    "id": "hcm-q3-xuanhoa",
    "name": "Phường Xuân Hòa, Quận 3",
    "subTitle": "Khu biệt thự cổ & Công viên Lê Văn Tám",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.7834,
    "lng": 106.689
  },
  {
    "id": "hcm-q3-nhieuloc",
    "name": "Phường Nhiêu Lộc, Quận 3",
    "subTitle": "Hành lang sinh thái kênh Nhiêu Lộc - Thị Nghè",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.7891,
    "lng": 106.6772
  },
  {
    "id": "hcm-q4-xomchieu",
    "name": "Phường Xóm Chiếu, Quận 4",
    "subTitle": "Khu thương mại cảng & ẩm thực truyền thống",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.7621,
    "lng": 106.7082
  },
  {
    "id": "hcm-q4-khanhhoi",
    "name": "Phường Khánh Hội, Quận 4",
    "subTitle": "Công viên Khánh Hội & đường Hoàng Diệu",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.758,
    "lng": 106.702
  },
  {
    "id": "hcm-q4-vinhhoi",
    "name": "Phường Vĩnh Hội, Quận 4",
    "subTitle": "Khu dân cư bờ nam kênh Bến Nghé - Tẻ",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.754,
    "lng": 106.6985
  },
  {
    "id": "hcm-q5-cholon",
    "name": "Phường Chợ Lớn, Quận 5",
    "subTitle": "Di sản phố cổ Chợ Lớn & Chợ Bình Tây",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.7538,
    "lng": 106.6579
  },
  {
    "id": "hcm-q5-andong",
    "name": "Phường An Đông, Quận 5",
    "subTitle": "Chợ An Đông & trung tâm y tế hàng đầu",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.757,
    "lng": 106.6702
  },
  {
    "id": "hcm-q5-haithuong",
    "name": "Phường Hải Thượng Lãn Ông, Quận 5",
    "subTitle": "Phố đông y truyền thống & kiến trúc người Hoa",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.7512,
    "lng": 106.6621
  },
  {
    "id": "hcm-q5-nguyentrai",
    "name": "Phường Nguyễn Trãi, Quận 5",
    "subTitle": "Trục thương mại thời trang & mua sắm sầm uất",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.7555,
    "lng": 106.6765
  },
  {
    "id": "hcm-q6-binhtay",
    "name": "Phường Bình Tây, Quận 6",
    "subTitle": "Đầu mối bán buôn nông sản & hàng tiêu dùng",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.7495,
    "lng": 106.6495
  },
  {
    "id": "hcm-q6-phulam",
    "name": "Phường Phú Lâm, Quận 6",
    "subTitle": "Vòng xoay Phú Lâm & công viên sinh thái",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.746,
    "lng": 106.638
  },
  {
    "id": "hcm-q6-binhtien",
    "name": "Phường Bình Tiên, Quận 6",
    "subTitle": "Khu thương mại tiểu thủ công nghiệp",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.7435,
    "lng": 106.6465
  },
  {
    "id": "hcm-q6-hungvuong",
    "name": "Phường Hùng Vương, Quận 6",
    "subTitle": "Trục giao thương huyết mạch phía tây thành phố",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.751,
    "lng": 106.632
  },
  {
    "id": "hcm-q6-binhphu",
    "name": "Phường Bình Phú, Quận 6",
    "subTitle": "Khu đô thị sinh thái xanh Bình Phú",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.741,
    "lng": 106.629
  },
  {
    "id": "hcm-q6-chautho",
    "name": "Phường Hậu Giang, Quận 6",
    "subTitle": "Khu dân cư đường Hậu Giang & Chợ Minh Phụng",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.748,
    "lng": 106.641
  },
  {
    "id": "hcm-q6-chotap",
    "name": "Phường Cây Gõ, Quận 6",
    "subTitle": "Khu vực bến xe Chợ Lớn & cầu Cây Gõ",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.755,
    "lng": 106.648
  },
  {
    "id": "hcm-q7-tanthuandong",
    "name": "Phường Tân Thuận Đông, Quận 7",
    "subTitle": "Khu chế xuất Tân Thuận & cảng biển Bến Nghé",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.768,
    "lng": 106.732
  },
  {
    "id": "hcm-q7-tanthuantay",
    "name": "Phường Tân Thuận Tây, Quận 7",
    "subTitle": "Đô thị ven sông Sài Gòn & cầu Tân Thuận",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.754,
    "lng": 106.721
  },
  {
    "id": "hcm-q7-tankieng",
    "name": "Phường Tân Kiểng, Quận 7",
    "subTitle": "Khu dân cư hiện đại & trục đường Trần Xuân Soạn",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.7485,
    "lng": 106.7115
  },
  {
    "id": "hcm-q7-tanhung",
    "name": "Phường Tân Hưng, Quận 7",
    "subTitle": "Khu phức hợp Sunrise City & cầu Kênh Tẻ",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.746,
    "lng": 106.702
  },
  {
    "id": "hcm-q7-binhthuan",
    "name": "Phường Bình Thuận, Quận 7",
    "subTitle": "Nút giao thông Nguyễn Thị Thập - Huỳnh Tấn Phát",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.741,
    "lng": 106.725
  },
  {
    "id": "hcm-q7-tanquy",
    "name": "Phường Tân Quy, Quận 7",
    "subTitle": "Khu thương mại dịch vụ sầm uất Nguyễn Thị Thập",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.7415,
    "lng": 106.712
  },
  {
    "id": "hcm-q7-phuthuan",
    "name": "Phường Phú Thuận, Quận 7",
    "subTitle": "Khu đô thị sinh thái ven sông Mũi Đèn Đỏ",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.73,
    "lng": 106.741
  },
  {
    "id": "hcm-q7-tanphu",
    "name": "Phường Tân Phú, Quận 7",
    "subTitle": "Trung tâm tài chính Quốc tế Phú Mỹ Hưng",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.733,
    "lng": 106.722
  },
  {
    "id": "hcm-q7-tanphong",
    "name": "Phường Tân Phong, Quận 7",
    "subTitle": "Khu đô thị kiểu mẫu Phú Mỹ Hưng & Hồ Bán Nguyệt",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.7285,
    "lng": 106.705
  },
  {
    "id": "hcm-q7-phumy",
    "name": "Phường Phú Mỹ, Quận 7",
    "subTitle": "Khu dân cư sinh thái xanh ven sông Nhà Bè",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.712,
    "lng": 106.732
  },
  {
    "id": "hcm-q8-chanhhung",
    "name": "Phường Chánh Hưng, Quận 8",
    "subTitle": "Khu trung tâm hành chính Quận 8",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.742,
    "lng": 106.678
  },
  {
    "id": "hcm-q8-rachong",
    "name": "Phường Rạch Ông, Quận 8",
    "subTitle": "Khu vực cầu chữ Y & chợ Rạch Ông",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.748,
    "lng": 106.689
  },
  {
    "id": "hcm-q8-xomcui",
    "name": "Phường Xóm Củi, Quận 8",
    "subTitle": "Chợ Xóm Củi & ngã ba kênh Tàu Hủ",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.749,
    "lng": 106.663
  },
  {
    "id": "hcm-q8-hungphu",
    "name": "Phường Hưng Phú, Quận 8",
    "subTitle": "Dọc đại lộ Võ Văn Kiệt bờ nam kênh Tàu Hủ",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.7465,
    "lng": 106.672
  },
  {
    "id": "hcm-q8-binhdong",
    "name": "Phường Bình Đông, Quận 8",
    "subTitle": "Bến Bình Đông - Chợ hoa xuân di sản ven sông",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.735,
    "lng": 106.645
  },
  {
    "id": "hcm-q8-phudinh",
    "name": "Phường Phú Định, Quận 8",
    "subTitle": "Cảng sông Phú Định & đầu mối giao thương miền Tây",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.723,
    "lng": 106.631
  },
  {
    "id": "hcm-q8-rachcat",
    "name": "Phường Rạch Cát, Quận 8",
    "subTitle": "Khu sinh thái đầm ngập nước & kênh Đôi",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.731,
    "lng": 106.638
  },
  {
    "id": "hcm-q8-baphun",
    "name": "Phường Ba Tơ, Quận 8",
    "subTitle": "Khu dân cư mới Nam Hòa Hưng & đại lộ Nguyễn Văn Linh",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.718,
    "lng": 106.649
  },
  {
    "id": "hcm-q10-chiha",
    "name": "Phường Chí Hòa, Quận 10",
    "subTitle": "Khu vực Công viên Lê Thị Riêng & ngã sáu Dân Chủ",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.781,
    "lng": 106.668
  },
  {
    "id": "hcm-q10-vuonlai",
    "name": "Phường Vườn Lài, Quận 10",
    "subTitle": "Khu thương mại ẩm thực Sư Vạn Hạnh",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.771,
    "lng": 106.671
  },
  {
    "id": "hcm-q10-dienhong",
    "name": "Phường Diên Hồng, Quận 10",
    "subTitle": "Khu dân cư văn hóa & các trường đại học lớn",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.765,
    "lng": 106.666
  },
  {
    "id": "hcm-q10-nhattao",
    "name": "Phường Nhật Tảo, Quận 10",
    "subTitle": "Chợ linh kiện điện tử Nhật Tảo & BV Chợ Rẫy",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.7595,
    "lng": 106.662
  },
  {
    "id": "hcm-q10-dongdo",
    "name": "Phường Đông Đô, Quận 10",
    "subTitle": "Khu dân cư Thành Thái & Viện Tim TP.HCM",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.774,
    "lng": 106.661
  },
  {
    "id": "hcm-q10-baclan",
    "name": "Phường Bắc Hải, Quận 10",
    "subTitle": "Khu biệt thự cư xá Bắc Hải cây xanh rợp bóng",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.782,
    "lng": 106.659
  },
  {
    "id": "hcm-q10-lythuongkiet",
    "name": "Phường Lý Thường Kiệt, Quận 10",
    "subTitle": "Trục Lý Thường Kiệt đối diện SVĐ Thống Nhất",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.762,
    "lng": 106.658
  },
  {
    "id": "hcm-q11-minhphung",
    "name": "Phường Minh Phụng, Quận 11",
    "subTitle": "Trục đường Minh Phụng & Chợ Bình Thới",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.762,
    "lng": 106.648
  },
  {
    "id": "hcm-q11-binhthoi",
    "name": "Phường Bình Thới, Quận 11",
    "subTitle": "Khu trung tâm hành chính Quận 11",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.769,
    "lng": 106.652
  },
  {
    "id": "hcm-q11-hoabinh",
    "name": "Phường Hòa Bình, Quận 11",
    "subTitle": "Công viên văn hóa Đầm Sen & hồ điều hòa",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.772,
    "lng": 106.643
  },
  {
    "id": "hcm-q11-phutho",
    "name": "Phường Phú Thọ, Quận 11",
    "subTitle": "Khu thể thao Phú Thọ & ĐH Bách Khoa TP.HCM",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.7655,
    "lng": 106.659
  },
  {
    "id": "hcm-q12-thoian",
    "name": "Phường Thới An, Quận 12",
    "subTitle": "Trung tâm hành chính Quận 12 & Quốc lộ 1A",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.865,
    "lng": 106.659
  },
  {
    "id": "hcm-q12-anphudong",
    "name": "Phường An Phú Đông, Quận 12",
    "subTitle": "Bán đảo sinh thái vườn cây trái sông Sài Gòn",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.86,
    "lng": 106.702
  },
  {
    "id": "hcm-q12-hiepthanh",
    "name": "Phường Hiệp Thành, Quận 12",
    "subTitle": "Khu dân cư Hiệp Thành City & hồ sinh thái",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.875,
    "lng": 106.643
  },
  {
    "id": "hcm-q12-tanchanhhiep",
    "name": "Phường Tân Chánh Hiệp, Quận 12",
    "subTitle": "Công viên phần mềm Quang Trung (QTSC)",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.858,
    "lng": 106.628
  },
  {
    "id": "hcm-q12-tanhungthuan",
    "name": "Phường Tân Hưng Thuận, Quận 12",
    "subTitle": "Khu đô thị ngã tư An Sương kết nối Tây Ninh",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.842,
    "lng": 106.621
  },
  {
    "id": "hcm-q12-tanthoihiep",
    "name": "Phường Tân Thới Hiệp, Quận 12",
    "subTitle": "Khu công nghiệp Tân Thới Hiệp kiểu mẫu",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.859,
    "lng": 106.641
  },
  {
    "id": "hcm-q12-tanthoinhat",
    "name": "Phường Tân Thới Nhất, Quận 12",
    "subTitle": "Ga đầu mối Metro số 2 Tham Lương",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.835,
    "lng": 106.615
  },
  {
    "id": "hcm-q12-thanhloc",
    "name": "Phường Thạnh Lộc, Quận 12",
    "subTitle": "Vùng nông nghiệp sinh thái ven sông Sài Gòn",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.875,
    "lng": 106.685
  },
  {
    "id": "hcm-q12-thanhxuan",
    "name": "Phường Thạnh Xuân, Quận 12",
    "subTitle": "Vùng trũng sinh thái & kênh thủy lợi điều tiết lũ",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.885,
    "lng": 106.671
  },
  {
    "id": "hcm-q12-trungmytay",
    "name": "Phường Trung Mỹ Tây, Quận 12",
    "subTitle": "Bến xe An Sương & trung tâm vận tải hành khách",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.852,
    "lng": 106.612
  },
  {
    "id": "hcm-bt-giadinh",
    "name": "Phường Gia Định, Bình Thạnh",
    "subTitle": "Lăng Tả quân Lê Văn Duyệt & Chợ Bà Chiểu",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.802,
    "lng": 106.695
  },
  {
    "id": "hcm-bt-binhthanh",
    "name": "Phường Bình Thạnh, Bình Thạnh",
    "subTitle": "Trung tâm hành chính quận & đường Nơ Trang Long",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.801,
    "lng": 106.702
  },
  {
    "id": "hcm-bt-binhloitrung",
    "name": "Phường Bình Lợi Trung, Bình Thạnh",
    "subTitle": "Khu dân cư đường Phạm Văn Đồng & cầu Bình Lợi",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.821,
    "lng": 106.708
  },
  {
    "id": "hcm-bt-thanhmyday",
    "name": "Phường Thạnh Mỹ Tây, Bình Thạnh",
    "subTitle": "Landmark 81 & Công viên Vinhomes Central Park",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.793,
    "lng": 106.721
  },
  {
    "id": "hcm-bt-binhquoi",
    "name": "Phường Bình Quới, Bình Thạnh",
    "subTitle": "Bán đảo sinh thái du lịch sinh thái Thanh Đa - Bình Quới",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.835,
    "lng": 106.732
  },
  {
    "id": "hcm-gv-hanhthong",
    "name": "Phường Hạnh Thông, Gò Vấp",
    "subTitle": "Nhà thờ cổ Hạnh Thông Tây & Chợ đêm",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.829,
    "lng": 106.678
  },
  {
    "id": "hcm-gv-anhoitay",
    "name": "Phường An Hội Tây, Gò Vấp",
    "subTitle": "Khu dân cư Phạm Văn Chiêu & bờ kênh",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.849,
    "lng": 106.649
  },
  {
    "id": "hcm-gv-anhoidong",
    "name": "Phường An Hội Đông, Gò Vấp",
    "subTitle": "Khu dân cư Lê Đức Thọ & công viên sinh thái",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.851,
    "lng": 106.662
  },
  {
    "id": "hcm-gv-ducnhuan",
    "name": "Phường Đức Nhuận, Gò Vấp",
    "subTitle": "Trục Nguyễn Kiệm & cầu vượt Nguyễn Oanh",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.838,
    "lng": 106.685
  },
  {
    "id": "hcm-gv-annhon",
    "name": "Phường An Nhơn, Gò Vấp",
    "subTitle": "Khu vực Chùa Kỳ Quang 2 & rạch Bến Cát",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.845,
    "lng": 106.679
  },
  {
    "id": "hcm-gv-govap",
    "name": "Phường Gò Vấp, Gò Vấp",
    "subTitle": "Trung tâm hành chính quận & Công viên Gia Định",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.835,
    "lng": 106.669
  },
  {
    "id": "hcm-pn-caukieu",
    "name": "Phường Cầu Kiệu, Phú Nhuận",
    "subTitle": "Chợ Phú Nhuận & cầu Kiệu kết nối Quận 1",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.795,
    "lng": 106.684
  },
  {
    "id": "hcm-pn-ducchinh",
    "name": "Phường Đức Chính, Phú Nhuận",
    "subTitle": "Khu dân cư Hoàng Văn Thụ & công viên",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.802,
    "lng": 106.675
  },
  {
    "id": "hcm-pn-phunhuan",
    "name": "Phường Phú Nhuận, Phú Nhuận",
    "subTitle": "Phố ẩm thực Phan Xích Long & trung tâm quận",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.798,
    "lng": 106.679
  },
  {
    "id": "hcm-tb-tansonnhat",
    "name": "Phường Tân Sơn Nhất, Tân Bình",
    "subTitle": "Sân bay Quốc tế Tân Sơn Nhất & ga T3",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.808,
    "lng": 106.661
  },
  {
    "id": "hcm-tb-bayhien",
    "name": "Phường Bảy Hiền, Tân Bình",
    "subTitle": "Ngã tư Bảy Hiền & làng dệt truyền thống",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.792,
    "lng": 106.654
  },
  {
    "id": "hcm-tb-laclongquan",
    "name": "Phường Lạc Long Quân, Tân Bình",
    "subTitle": "Trục Lạc Long Quân & Chợ Tân Bình",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.785,
    "lng": 106.649
  },
  {
    "id": "hcm-tb-hoangvanthu",
    "name": "Phường Hoàng Văn Thụ, Tân Bình",
    "subTitle": "Công viên Hoàng Văn Thụ & SVĐ Quân khu 7",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.801,
    "lng": 106.669
  },
  {
    "id": "hcm-tb-conghoa",
    "name": "Phường Cộng Hòa, Tân Bình",
    "subTitle": "Hành lang tài chính văn phòng đường Cộng Hòa",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.805,
    "lng": 106.645
  },
  {
    "id": "hcm-tp-taythanh",
    "name": "Phường Tây Thạnh, Tân Phú",
    "subTitle": "Khu công nghiệp Tân Bình & công viên sinh thái",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.819,
    "lng": 106.629
  },
  {
    "id": "hcm-tp-tansonnhi",
    "name": "Phường Tân Sơn Nhì, Tân Phú",
    "subTitle": "Khu ẩm thực Aeon Mall Tân Phú & Celedon City",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.802,
    "lng": 106.631
  },
  {
    "id": "hcm-tp-phuthohoa",
    "name": "Phường Phú Thọ Hòa, Tân Phú",
    "subTitle": "Địa đạo Phú Thọ Hòa di tích lịch sử",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.786,
    "lng": 106.628
  },
  {
    "id": "hcm-tp-hieptan",
    "name": "Phường Hiệp Tân, Tân Phú",
    "subTitle": "Khu dân cư giáp Đầm Sen & đường Hòa Bình",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.772,
    "lng": 106.629
  },
  {
    "id": "hcm-btan-anlac",
    "name": "Phường An Lạc, Bình Tân",
    "subTitle": "Bến xe Miền Tây & cửa ngõ miền Tây",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.732,
    "lng": 106.611
  },
  {
    "id": "hcm-btan-anlaca",
    "name": "Phường An Lạc A, Bình Tân",
    "subTitle": "Khu đô thị Tên Lửa & Bệnh viện Triều An",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.748,
    "lng": 106.618
  },
  {
    "id": "hcm-btan-binhhunghoa",
    "name": "Phường Bình Hưng Hòa, Bình Tân",
    "subTitle": "Khu công viên sinh thái mới & Tân Kỳ Tân Quý",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.795,
    "lng": 106.608
  },
  {
    "id": "hcm-btan-binhhunghoaa",
    "name": "Phường Bình Hưng Hòa A, Bình Tân",
    "subTitle": "Khu dân cư kết nối Tân Phú & kênh 19/5",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.782,
    "lng": 106.602
  },
  {
    "id": "hcm-btan-binhhunghoab",
    "name": "Phường Bình Hưng Hòa B, Bình Tân",
    "subTitle": "Khu công nghiệp Vĩnh Lộc giáp Quốc lộ 1A",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.799,
    "lng": 106.591
  },
  {
    "id": "hcm-btan-binhtridong",
    "name": "Phường Bình Trị Đông, Bình Tân",
    "subTitle": "Chợ Bình Trị Đông & khu dân cư truyền thống",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.768,
    "lng": 106.609
  },
  {
    "id": "hcm-btan-binhtridonga",
    "name": "Phường Bình Trị Đông A, Bình Tân",
    "subTitle": "Khu đô thị mở rộng trục Mã Lò",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.771,
    "lng": 106.598
  },
  {
    "id": "hcm-btan-binhtridongb",
    "name": "Phường Bình Trị Đông B, Bình Tân",
    "subTitle": "Trung tâm thương mại Aeon Mall Bình Tân",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.755,
    "lng": 106.605
  },
  {
    "id": "hcm-btan-tantao",
    "name": "Phường Tân Tạo, Bình Tân",
    "subTitle": "Khu công nghiệp Tân Tạo & tuyến cao tốc",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.745,
    "lng": 106.589
  },
  {
    "id": "hcm-btan-tantaoa",
    "name": "Phường Tân Tạo A, Bình Tân",
    "subTitle": "Vùng trũng sinh thái ven sông Chợ Đệm",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.738,
    "lng": 106.578
  },
  {
    "id": "hcm-td-thuduc",
    "name": "Phường Thủ Đức, TP. Thủ Đức",
    "subTitle": "Trung tâm hành chính cũ, Làng đại học & Chợ Thủ Đức",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.849,
    "lng": 106.768
  },
  {
    "id": "hcm-td-ankhanh",
    "name": "Phường An Khánh, TP. Thủ Đức",
    "subTitle": "Khu đô thị mới Thủ Thiêm & bán đảo Thảo Điền",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.787,
    "lng": 106.728
  },
  {
    "id": "hcm-td-binhtrung",
    "name": "Phường Bình Trưng, TP. Thủ Đức",
    "subTitle": "Khu dân cư sinh thái Bình Trưng & Đỗ Xuân Hợp",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.792,
    "lng": 106.772
  },
  {
    "id": "hcm-td-catlai",
    "name": "Phường Cát Lái, TP. Thủ Đức",
    "subTitle": "Tân Cảng Cát Lái lớn nhất Việt Nam & Vành Đai 2",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.762,
    "lng": 106.779
  },
  {
    "id": "hcm-td-hiepbinh",
    "name": "Phường Hiệp Bình, TP. Thủ Đức",
    "subTitle": "Khu đô thị sinh thái ven sông Sài Gòn & QL 13",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.842,
    "lng": 106.725
  },
  {
    "id": "hcm-td-hiepphu",
    "name": "Phường Hiệp Phú, TP. Thủ Đức",
    "subTitle": "Khu Công nghệ cao TP.HCM (SHTP) & Xa lộ Hà Nội",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.848,
    "lng": 106.782
  },
  {
    "id": "hcm-td-linhxuan",
    "name": "Phường Linh Xuân, TP. Thủ Đức",
    "subTitle": "Đại học Quốc gia TP.HCM & Khu chế xuất Linh Trung",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.884,
    "lng": 106.775
  },
  {
    "id": "hcm-td-longbinh",
    "name": "Phường Long Bình, TP. Thủ Đức",
    "subTitle": "Công viên Lịch sử Văn hóa Dân tộc & Depot Suối Tiên",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.871,
    "lng": 106.842
  },
  {
    "id": "hcm-td-longphuoc",
    "name": "Phường Long Phước, TP. Thủ Đức",
    "subTitle": "Cù lao sinh thái nhà vườn ven sông Đồng Nai",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.812,
    "lng": 106.849
  },
  {
    "id": "hcm-td-longtruong",
    "name": "Phường Long Trường, TP. Thủ Đức",
    "subTitle": "Khu đô thị sinh thái cảng Phú Hữu & rạch Trau Trảu",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.808,
    "lng": 106.812
  },
  {
    "id": "hcm-td-tambinh",
    "name": "Phường Tam Bình, TP. Thủ Đức",
    "subTitle": "Chợ đầu mối Nông sản Thủ Đức & KCN Bình Chiểu",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.869,
    "lng": 106.735
  },
  {
    "id": "hcm-td-tangnhonphu",
    "name": "Phường Tăng Nhơn Phú, TP. Thủ Đức",
    "subTitle": "Khu đại đô thị Vinhomes Grand Park & SHTP giai đoạn 2",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "phường",
    "lat": 10.841,
    "lng": 106.792
  },
  {
    "id": "hcm-cc-annhontay",
    "name": "Xã An Nhơn Tây, Huyện Củ Chi",
    "subTitle": "Đền tưởng niệm Bến Dược & Di tích Địa đạo Củ Chi",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 11.085,
    "lng": 106.512
  },
  {
    "id": "hcm-cc-anphu",
    "name": "Xã An Phú, Huyện Củ Chi",
    "subTitle": "Khu bảo tồn sinh thái động vật hoang dã Củ Chi",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 11.135,
    "lng": 106.541
  },
  {
    "id": "hcm-cc-binhmy",
    "name": "Xã Bình Mỹ, Huyện Củ Chi",
    "subTitle": "Vùng đệm cây ăn trái sinh thái ven sông Sài Gòn",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.942,
    "lng": 106.649
  },
  {
    "id": "hcm-cc-hoaphu",
    "name": "Xã Hòa Phú, Huyện Củ Chi",
    "subTitle": "Khu công nghiệp Đông Nam ứng dụng công nghệ cao",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.985,
    "lng": 106.632
  },
  {
    "id": "hcm-cc-nhuanduc",
    "name": "Xã Nhuận Đức, Huyện Củ Chi",
    "subTitle": "Nông trại sinh thái bò sữa & vườn rau hữu cơ sạch",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 11.042,
    "lng": 106.535
  },
  {
    "id": "hcm-cc-phamvancoi",
    "name": "Xã Phạm Văn Cội, Huyện Củ Chi",
    "subTitle": "Khu Nông nghiệp Công nghệ cao TP.HCM trọng điểm",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 11.065,
    "lng": 106.568
  },
  {
    "id": "hcm-cc-phuhoadong",
    "name": "Xã Phú Hòa Đông, Huyện Củ Chi",
    "subTitle": "Làng nghề bánh tráng truyền thống Phú Hòa Đông",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 11.025,
    "lng": 106.602
  },
  {
    "id": "hcm-cc-phumyhung",
    "name": "Xã Phú Mỹ Hưng, Huyện Củ Chi",
    "subTitle": "Rừng phòng hộ đầu nguồn sông Sài Gòn",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 11.148,
    "lng": 106.498
  },
  {
    "id": "hcm-cc-tananhoi",
    "name": "Xã Tân An Hội, Huyện Củ Chi",
    "subTitle": "Khu công nghiệp Tây Bắc Củ Chi xanh",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.965,
    "lng": 106.482
  },
  {
    "id": "hcm-cc-tanphutrung",
    "name": "Xã Tân Phú Trung, Huyện Củ Chi",
    "subTitle": "KCN Tân Phú Trung & Bệnh viện Xuyên Á cửa ngõ",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.925,
    "lng": 106.542
  },
  {
    "id": "hcm-cc-tanthanhdong",
    "name": "Xã Tân Thạnh Đông, Huyện Củ Chi",
    "subTitle": "Vùng chuyên canh nông nghiệp bò sữa hữu cơ",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.961,
    "lng": 106.589
  },
  {
    "id": "hcm-cc-tanthanhtay",
    "name": "Xã Tân Thạnh Tây, Huyện Củ Chi",
    "subTitle": "Khu vực Tỉnh lộ 8 kết nối vùng kinh tế Đông Nam Bộ",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.995,
    "lng": 106.572
  },
  {
    "id": "hcm-cc-tanthonghoi",
    "name": "Xã Tân Thông Hội, Huyện Củ Chi",
    "subTitle": "Xã nông thôn mới kiểu mẫu đầu tiên của TP.HCM",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.942,
    "lng": 106.518
  },
  {
    "id": "hcm-cc-thaimy",
    "name": "Xã Thái Mỹ, Huyện Củ Chi",
    "subTitle": "Làng nghề đan lát mây tre truyền thống ven kênh",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.992,
    "lng": 106.415
  },
  {
    "id": "hcm-cc-trungan",
    "name": "Xã Trung An, Huyện Củ Chi",
    "subTitle": "Vườn sinh thái chôm chôm, măng cụt ven sông Sài Gòn",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 11.018,
    "lng": 106.638
  },
  {
    "id": "hcm-cc-trunglaph",
    "name": "Xã Trung Lập Hạ, Huyện Củ Chi",
    "subTitle": "Cánh đồng lúa hữu cơ & hệ thống kênh Đông thủy lợi",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 11.022,
    "lng": 106.468
  },
  {
    "id": "hcm-cc-trunglapt",
    "name": "Xã Trung Lập Thượng, Huyện Củ Chi",
    "subTitle": "Rừng tràm sinh thái & vùng chuyên canh sen",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 11.068,
    "lng": 106.442
  },
  {
    "id": "hcm-cc-phuochiep",
    "name": "Xã Phước Hiệp, Huyện Củ Chi",
    "subTitle": "Khu du lịch nông nghiệp trải nghiệm sinh thái",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.985,
    "lng": 106.452
  },
  {
    "id": "hcm-cc-phuocthanh",
    "name": "Xã Phước Thạnh, Huyện Củ Chi",
    "subTitle": "Vùng trồng dưa lưới, rau quả VietGAP ứng dụng IoT",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 11.015,
    "lng": 106.425
  },
  {
    "id": "hcm-hm-badiem",
    "name": "Xã Bà Điểm, Huyện Hóc Môn",
    "subTitle": "Di tích Ngã Ba Giồng & vườn cau Bà Điểm lịch sử",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.835,
    "lng": 106.602
  },
  {
    "id": "hcm-hm-dongthanh",
    "name": "Xã Đông Thạnh, Huyện Hóc Môn",
    "subTitle": "Cánh đồng hoa mai & cây kiểng ven sông Sài Gòn",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.895,
    "lng": 106.658
  },
  {
    "id": "hcm-hm-nhibinh",
    "name": "Xã Nhị Bình, Huyện Hóc Môn",
    "subTitle": "Bán đảo du lịch sinh thái sông nước Nhị Bình",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.912,
    "lng": 106.678
  },
  {
    "id": "hcm-hm-tanhiep",
    "name": "Xã Tân Hiệp, Huyện Hóc Môn",
    "subTitle": "Nhà máy nước sạch Tân Hiệp nguồn nước an toàn",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.902,
    "lng": 106.565
  },
  {
    "id": "hcm-hm-tanthoinhi",
    "name": "Xã Tân Thới Nhì, Huyện Hóc Môn",
    "subTitle": "Chùa Hoằng Pháp & không gian tâm linh sinh thái",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.898,
    "lng": 106.552
  },
  {
    "id": "hcm-hm-tanxuan",
    "name": "Xã Tân Xuân, Huyện Hóc Môn",
    "subTitle": "Chợ đầu mối nông sản thực phẩm Hóc Môn lớn nhất",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.875,
    "lng": 106.605
  },
  {
    "id": "hcm-hm-thoitamt hon",
    "name": "Xã Thới Tam Thôn, Huyện Hóc Môn",
    "subTitle": "Vùng rau an toàn VietGAP truyền thống",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.881,
    "lng": 106.621
  },
  {
    "id": "hcm-hm-trungchanh",
    "name": "Xã Trung Chánh, Huyện Hóc Môn",
    "subTitle": "Khu đô thị ngã tư Trung Chánh kết nối cửa ngõ",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.852,
    "lng": 106.615
  },
  {
    "id": "hcm-hm-xuanthoidong",
    "name": "Xã Xuân Thới Đông, Huyện Hóc Môn",
    "subTitle": "Trục Quốc lộ 22 & làng nghề mộc mỹ nghệ",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.865,
    "lng": 106.582
  },
  {
    "id": "hcm-hm-xuanthoidon",
    "name": "Xã Xuân Thới Sơn, Huyện Hóc Môn",
    "subTitle": "Kênh An Hạ điều hòa môi trường sinh thái",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.875,
    "lng": 106.562
  },
  {
    "id": "hcm-hm-xuanthoithuong",
    "name": "Xã Xuân Thới Thượng, Huyện Hóc Môn",
    "subTitle": "Công viên tưởng niệm Ngã Ba Giồng rợp bóng cây xanh",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.849,
    "lng": 106.565
  },
  {
    "id": "hcm-bc-anphutay",
    "name": "Xã An Phú Tây, Huyện Bình Chánh",
    "subTitle": "Cửa ngõ ga đường sắt tốc độ cao tương lai",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.682,
    "lng": 106.592
  },
  {
    "id": "hcm-bc-binhchanh",
    "name": "Xã Bình Chánh, Huyện Bình Chánh",
    "subTitle": "Chợ Bình Chánh & Quốc lộ 1A kết nối Tây Nam Bộ",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.665,
    "lng": 106.558
  },
  {
    "id": "hcm-bc-binhhung",
    "name": "Xã Bình Hưng, Huyện Bình Chánh",
    "subTitle": "Khu đô thị Trung Sơn & Mizuki Park sông nước hữu tình",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.725,
    "lng": 106.672
  },
  {
    "id": "hcm-bc-binhloi",
    "name": "Xã Bình Lợi, Huyện Bình Chánh",
    "subTitle": "Làng mai vàng Bình Lợi trù phú lớn nhất miền Nam",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.742,
    "lng": 106.495
  },
  {
    "id": "hcm-bc-daphuoc",
    "name": "Xã Đa Phước, Huyện Bình Chánh",
    "subTitle": "Khu liên hợp xử lý chất thải công nghệ hiện đại Đa Phước",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.668,
    "lng": 106.645
  },
  {
    "id": "hcm-bc-hunglong",
    "name": "Xã Hưng Long, Huyện Bình Chánh",
    "subTitle": "Vùng trũng sinh thái canh tác nông nghiệp công nghệ cao",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.635,
    "lng": 106.582
  },
  {
    "id": "hcm-bc-leminhxuan",
    "name": "Xã Lê Minh Xuân, Huyện Bình Chánh",
    "subTitle": "Khu công nghiệp sinh thái Lê Minh Xuân & Kênh Xáng",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.741,
    "lng": 106.529
  },
  {
    "id": "hcm-bc-phamvanhai",
    "name": "Xã Phạm Văn Hai, Huyện Bình Chánh",
    "subTitle": "Cánh đồng thơm tràm sinh thái & vùng đệm xanh",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.785,
    "lng": 106.518
  },
  {
    "id": "hcm-bc-phongphu",
    "name": "Xã Phong Phú, Huyện Bình Chánh",
    "subTitle": "Khu đô thị xanh Lovera Park & Làng đại học phía Nam",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.702,
    "lng": 106.652
  },
  {
    "id": "hcm-bc-quyduc",
    "name": "Xã Quy Đức, Huyện Bình Chánh",
    "subTitle": "Vùng đồng quê yên bình giáp ranh Long An",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.628,
    "lng": 106.615
  },
  {
    "id": "hcm-nb-hiepphuoc",
    "name": "Xã Hiệp Phước, Huyện Nhà Bè",
    "subTitle": "Khu đô thị Cảng Hiệp Phước vươn ra biển Đông",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.625,
    "lng": 106.762
  },
  {
    "id": "hcm-nb-longthoi",
    "name": "Xã Long Thới, Huyện Nhà Bè",
    "subTitle": "Khu công nghiệp Hiệp Phước & trường Quốc tế AIS",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.655,
    "lng": 106.745
  },
  {
    "id": "hcm-nb-nhonduc",
    "name": "Xã Nhơn Đức, Huyện Nhà Bè",
    "subTitle": "Đại đô thị thông minh GS Metrocity Zeitgeist",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.662,
    "lng": 106.708
  },
  {
    "id": "hcm-nb-phuxuan",
    "name": "Xã Phú Xuân, Huyện Nhà Bè",
    "subTitle": "Trung tâm hành chính huyện Nhà Bè ven sông Mương Chuối",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.685,
    "lng": 106.732
  },
  {
    "id": "hcm-nb-phuockien",
    "name": "Xã Phước Kiển, Huyện Nhà Bè",
    "subTitle": "Khu đô thị sinh thái kết nối đại lộ Nguyễn Hữu Thọ",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.715,
    "lng": 106.712
  },
  {
    "id": "hcm-nb-phuocloc",
    "name": "Xã Phước Lộc, Huyện Nhà Bè",
    "subTitle": "Vùng trũng sinh thái ngập mặn tự nhiên sông Cần Giuộc",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.688,
    "lng": 106.692
  },
  {
    "id": "hcm-cg-anthoidong",
    "name": "Xã An Thới Đông, Huyện Cần Giờ",
    "subTitle": "Vùng đệm Khu dự trữ sinh quyển thế giới Rừng ngập mặn",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.535,
    "lng": 106.845
  },
  {
    "id": "hcm-cg-binhkhanh",
    "name": "Xã Bình Khánh, Huyện Cần Giờ",
    "subTitle": "Bến phà Bình Khánh kết nối tương lai cầu Cần Giờ",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.672,
    "lng": 106.782
  },
  {
    "id": "hcm-cg-longhoa",
    "name": "Xã Long Hòa, Huyện Cần Giờ",
    "subTitle": "Bãi biển Ba Mươi Tháng Tư & khu du lịch 30/4",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.445,
    "lng": 106.912
  },
  {
    "id": "hcm-cg-lynhon",
    "name": "Xã Lý Nhơn, Huyện Cần Giờ",
    "subTitle": "Vựa muối trắng Cần Giờ & đầm nuôi tôm sinh thái sạch",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.485,
    "lng": 106.775
  },
  {
    "id": "hcm-cg-tamthonhiep",
    "name": "Xã Tam Thôn Hiệp, Huyện Cần Giờ",
    "subTitle": "Khu bảo tồn động vật hoang dã & nghề nuôi yến sào",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.595,
    "lng": 106.882
  },
  {
    "id": "hcm-cg-thanhan",
    "name": "Xã Thạnh An, Huyện Cần Giờ",
    "subTitle": "Xã đảo tiền tiêu Thạnh An giữ nguyên hiện trạng theo Nghị quyết 1685",
    "districtGroup": "Khu vực TP.HCM cũ",
    "adminType": "xã",
    "lat": 10.495,
    "lng": 106.995
  },
  {
    "id": "hcm-vt-longson",
    "name": "Xã Long Sơn",
    "subTitle": "Xã đảo sinh thái nuôi hàu & Tổ hợp Hóa dầu Long Sơn",
    "districtGroup": "Khu vực Bà Rịa – Vũng Tàu cũ",
    "adminType": "xã",
    "lat": 10.456,
    "lng": 107.098
  },
  {
    "id": "hcm-dac-khu-condao",
    "name": "Đặc khu Côn Đảo",
    "subTitle": "Vườn Quốc gia Côn Đảo - Di sản lịch sử & thiên nhiên quốc gia",
    "districtGroup": "Khu vực Bà Rịa – Vũng Tàu cũ",
    "adminType": "đặc khu",
    "lat": 8.6835,
    "lng": 106.6075
  },
  {
    "id": "hcm-an-dien",
    "name": "Phường An Điền",
    "subTitle": "Đô thị công nghiệp sinh thái & công nghệ cao (Bến Cát)",
    "districtGroup": "Khu vực Bình Dương cũ",
    "adminType": "phường",
    "lat": 11.1325,
    "lng": 106.578
  },
  {
    "id": "hcm-tay-nam",
    "name": "Phường Tây Nam",
    "subTitle": "Đô thị cảng sông logistics & công nghiệp ven sông Sài Gòn (119.8 km²)",
    "districtGroup": "Khu vực Bình Dương cũ",
    "adminType": "phường",
    "lat": 11.1352,
    "lng": 106.5241
  },
  {
    "id": "hcm-my-phuoc",
    "name": "Phường Mỹ Phước",
    "subTitle": "Trung tâm hành chính thương mại & KCN Mỹ Phước 1, 2, 3",
    "districtGroup": "Khu vực Bình Dương cũ",
    "adminType": "phường",
    "lat": 11.1448,
    "lng": 106.6112
  },
  {
    "id": "hcm-thoi-hoa",
    "name": "Phường Thới Hòa",
    "subTitle": "Đô thị đại học (ĐH Việt Đức VGU) & KCN Mỹ Phước 4",
    "districtGroup": "Khu vực Bình Dương cũ",
    "adminType": "phường",
    "lat": 11.1125,
    "lng": 106.6218
  },
  {
    "id": "hcm-chanh-phu-hoa",
    "name": "Phường Chánh Phú Hòa",
    "subTitle": "Đô thị công nghiệp công nghệ cao & logistics phía Đông",
    "districtGroup": "Khu vực Bình Dương cũ",
    "adminType": "phường",
    "lat": 11.162,
    "lng": 106.6625
  },
  {
    "id": "hcm-hoa-loi",
    "name": "Phường Hòa Lợi",
    "subTitle": "Đô thị kết nối Thành phố Mới & KCN VSIP 2",
    "districtGroup": "Khu vực Bình Dương cũ",
    "adminType": "phường",
    "lat": 11.0872,
    "lng": 106.6548
  },
  {
    "id": "hcm-tan-dinh",
    "name": "Phường Tân Định (Bến Cát)",
    "subTitle": "Cửa ngõ phía Nam, trục QL13 & kết nối KDL Đại Nam",
    "districtGroup": "Khu vực Bình Dương cũ",
    "adminType": "phường",
    "lat": 11.0543,
    "lng": 106.6321
  },
  {
    "id": "hcm-phu-an",
    "name": "Xã Phú An",
    "subTitle": "Làng tre sinh thái Phú An ven sông Thị Tính & du lịch sinh thái",
    "districtGroup": "Khu vực Bình Dương cũ",
    "adminType": "xã",
    "lat": 11.1095,
    "lng": 106.5684
  }
];

export const ADMIN_UNITS_DATA: Record<string, AdminUnit> = Object.fromEntries(
  ADMIN_UNITS.map((unit) => [unit.id, unit])
);
