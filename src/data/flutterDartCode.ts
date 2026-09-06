export const FLUTTER_PUBSPEC = `name: eco_app_offline
description: "Ứng dụng Môi trường & Thời tiết Offline bằng Flutter / Dart xuất APK"
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.6

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true
`;

export const FLUTTER_MAIN_DART = `import 'package:flutter/material.dart';

void main() {
  runApp(const EcoOfflineApp());
}

class EcoOfflineApp extends StatelessWidget {
  const EcoOfflineApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'EcoApp Offline',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF1E3A8A),
          surface: const Color(0xFFF8F9FA),
        ),
        scaffoldBackgroundColor: const Color(0xFFF5F6F8),
        useMaterial3: true,
        fontFamily: 'Roboto',
      ),
      home: const MainNavigationScreen(),
    );
  }
}

class MainNavigationScreen extends StatefulWidget {
  const MainNavigationScreen({super.key});

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  int _currentIndex = 0;
  String _selectedDistrict = 'Quận 1, TP.HCM';
  bool _isGpsActive = false;
  String _currentGpsCoords = '10.7769° N, 106.7009° E';
  double? _altitude = 12.0;

  final List<String> _districts = [
    'Quận 1, TP.HCM',
    'Quận 3, TP.HCM',
    'TP. Thủ Đức, TP.HCM',
    'Quận 7, TP.HCM',
  ];

  // Hộp thoại định vị người dùng (User Geolocation)
  void _locateUser() {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(24)),
        title: const Row(
          children: [
            Icon(Icons.my_location, color: Color(0xFF1E3A8A)),
            SizedBox(width: 8),
            Text('Định vị người dùng', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.all(14),
              decoration: BoxDecoration(
                color: const Color(0xFFEFF6FF),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: const Color(0xFFBFDBFE)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: const [
                      Icon(Icons.gps_fixed, size: 16, color: Color(0xFF1E40AF)),
                      SizedBox(width: 6),
                      Text('TỌA ĐỘ GPS THIẾT BỊ', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFF1E40AF))),
                    ],
                  ),
                  const SizedBox(height: 6),
                  Text(_currentGpsCoords, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold, fontFamily: 'monospace')),
                  const SizedBox(height: 4),
                  const Text('Độ chính xác: ±15m • Gần trạm: Quận 1 (~0.4km)', style: TextStyle(fontSize: 12, color: Color(0xFF475569))),
                ],
              ),
            ),
            const SizedBox(height: 12),
            const Text(
              'Ứng dụng tự động kết nối trạm vi khí hậu và dữ liệu bảo vệ môi trường gần bạn nhất mà không cần truyền dữ liệu ra Internet.',
              style: TextStyle(fontSize: 13, color: Color(0xFF475569)),
            ),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Đóng'),
          ),
          ElevatedButton.icon(
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF1E3A8A),
              foregroundColor: Colors.white,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            ),
            onPressed: () {
              setState(() {
                _isGpsActive = true;
                _selectedDistrict = 'Quận 1, TP.HCM';
              });
              Navigator.pop(ctx);
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text('Đã kết nối trạm quan trắc gần vị trí GPS của bạn!'),
                  duration: Duration(seconds: 2),
                ),
              );
            },
            icon: const Icon(Icons.navigation, size: 18),
            label: const Text('Áp dụng trạm gần nhất'),
          ),
        ],
      ),
    );
  }

  void _showNotificationDialog() {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: const Row(
          children: [
            Icon(Icons.notifications_active_outlined, color: Color(0xFF1E3A8A)),
            SizedBox(width: 8),
            Text('Thông báo Offline', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: const [
            Text('• Dữ liệu quan trắc đã được lưu ngoại tuyến.'),
            SizedBox(height: 6),
            Text('• Cảnh báo chất lượng không khí: PM2.5 ở mức 42 µg/m³.'),
            SizedBox(height: 6),
            Text('• Triều cường dự kiến dâng lúc 17:30 tại trạm Phú An.'),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Đã hiểu', style: TextStyle(fontWeight: FontWeight.bold)),
          )
        ],
      ),
    );
  }

  void _showDistrictPicker() {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (ctx) => SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 16),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Chọn khu vực theo dõi',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 12),
              // Nút định vị nhanh
              Container(
                margin: const EdgeInsets.only(bottom: 8),
                decoration: BoxDecoration(
                  color: const Color(0xFFEFF6FF),
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: const Color(0xFFBFDBFE)),
                ),
                child: ListTile(
                  leading: const CircleAvatar(
                    backgroundColor: Color(0xFF1E3A8A),
                    child: Icon(Icons.my_location, color: Colors.white, size: 20),
                  ),
                  title: const Text('Định vị GPS vị trí của tôi', style: TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF1E3A8A), fontSize: 14)),
                  subtitle: const Text('Tự động chọn trạm gần bạn nhất', style: TextStyle(fontSize: 12)),
                  onTap: () {
                    Navigator.pop(ctx);
                    _locateUser();
                  },
                ),
              ),
              ..._districts.map(
                (district) => ListTile(
                  title: Text(district, style: TextStyle(
                    fontWeight: _selectedDistrict == district ? FontWeight.bold : FontWeight.normal,
                    color: _selectedDistrict == district ? const Color(0xFF1E3A8A) : Colors.black87,
                  )),
                  trailing: _selectedDistrict == district
                      ? const Icon(Icons.check_circle, color: Color(0xFF1E3A8A))
                      : null,
                  onTap: () {
                    setState(() => _selectedDistrict = district);
                    Navigator.pop(ctx);
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _showDetailModal(String title, String desc, List<String> bullets) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (ctx) => Padding(
        padding: const EdgeInsets.fromLTRB(20, 16, 20, 32),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: Container(
                width: 40,
                height: 4,
                margin: const EdgeInsets.bottom(16),
                decoration: BoxDecoration(
                  color: Colors.grey.shade300,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
            ),
            Text(title, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Color(0xFF0F172A))),
            const SizedBox(height: 8),
            Text(desc, style: TextStyle(color: Colors.grey.shade700, fontSize: 14)),
            const Divider(height: 24),
            ...bullets.map((b) => Padding(
              padding: const EdgeInsets.symmetric(vertical: 4),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('• ', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                  Expanded(child: Text(b, style: const TextStyle(fontSize: 14))),
                ],
              ),
            )),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: IndexedStack(
          index: _currentIndex,
          children: [
            _buildWeatherTab(),
            _buildEnvironmentTab(),
            _buildEnterpriseTab(),
            _buildProtectionTab(),
          ],
        ),
      ),
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          border: Border(top: BorderSide(color: Colors.grey.shade200, width: 1)),
        ),
        child: BottomNavigationBar(
          currentIndex: _currentIndex,
          onTap: (index) => setState(() => _currentIndex = index),
          type: BottomNavigationBarType.fixed,
          backgroundColor: Colors.white,
          selectedItemColor: const Color(0xFF1E3A8A),
          unselectedItemColor: const Color(0xFF64748B),
          selectedLabelStyle: const TextStyle(fontWeight: FontWeight.w700, fontSize: 12),
          unselectedLabelStyle: const TextStyle(fontWeight: FontWeight.w500, fontSize: 12),
          elevation: 0,
          items: const [
            BottomNavigationBarItem(
              icon: Icon(Icons.wb_sunny_outlined),
              activeIcon: Icon(Icons.wb_sunny),
              label: 'Thời tiết',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.public_outlined),
              activeIcon: Icon(Icons.public),
              label: 'Môi trường',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.storefront_outlined),
              activeIcon: Icon(Icons.storefront),
              label: 'Doanh nghiệp',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.eco_outlined),
              activeIcon: Icon(Icons.eco),
              label: 'Bảo vệ MT',
            ),
          ],
        ),
      ),
    );
  }

  // Header chung theo thiết kế
  Widget _buildHeader(String subtitle) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 16, 20, 12),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          GestureDetector(
            onTap: _showDistrictPicker,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Text(
                      subtitle,
                      style: const TextStyle(fontSize: 14, color: Color(0xFF64748B), fontWeight: FontWeight.w500),
                    ),
                    if (_isGpsActive) ...[
                      const SizedBox(width: 6),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 1),
                        decoration: BoxDecoration(
                          color: const Color(0xFFDCFCE7),
                          borderRadius: BorderRadius.circular(6),
                          border: Border.all(color: const Color(0xFF86EFAC)),
                        ),
                        child: const Text(
                          'GPS',
                          style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Color(0xFF15803D)),
                        ),
                      ),
                    ],
                  ],
                ),
                const SizedBox(height: 2),
                Row(
                  children: [
                    Text(
                      _selectedDistrict,
                      style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
                    ),
                    const SizedBox(width: 4),
                    const Icon(Icons.arrow_drop_down, color: Color(0xFF64748B)),
                  ],
                ),
              ],
            ),
          ),
          Row(
            children: [
              IconButton(
                onPressed: _locateUser,
                tooltip: 'Định vị người dùng',
                icon: Icon(
                  _isGpsActive ? Icons.gps_fixed : Icons.my_location,
                  size: 24,
                  color: _isGpsActive ? const Color(0xFF1E3A8A) : const Color(0xFF64748B),
                ),
              ),
              IconButton(
                onPressed: _showNotificationDialog,
                icon: const Icon(Icons.notifications_none_rounded, size: 28, color: Color(0xFF334155)),
              ),
            ],
          ),
        ],
      ),
    );
  }

  // TAB 1: THỜI TIẾT
  Widget _buildWeatherTab() {
    return ListView(
      padding: EdgeInsets.zero,
      children: [
        _buildHeader('Khu vực hiện tại'),
        // Card thời tiết hôm nay
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 22),
            decoration: BoxDecoration(
              color: const Color(0xFFEBF5FF),
              borderRadius: BorderRadius.circular(24),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: const [
                    Text(
                      'Thời tiết hôm nay',
                      style: TextStyle(fontSize: 15, color: Color(0xFF1E40AF), fontWeight: FontWeight.w600),
                    ),
                    SizedBox(height: 6),
                    Text(
                      '31°C, nắng nhẹ',
                      style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800, color: Color(0xFF0F3B73)),
                    ),
                  ],
                ),
                const Icon(Icons.wb_sunny_outlined, size: 42, color: Color(0xFF1D4ED8)),
              ],
            ),
          ),
        ),
        // Thông số thời tiết & vị trí người dùng: Độ ẩm, Độ cao, Tia UV
        const Padding(
          padding: EdgeInsets.fromLTRB(20, 20, 20, 12),
          child: Text(
            'Thông số thời tiết & vị trí',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
          ),
        ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Row(
            children: [
              Expanded(
                child: _buildMetricButton(
                  'Độ ẩm',
                  '68%',
                  'Tương đối',
                  Icons.water_drop_outlined,
                  const Color(0xFF0284C7),
                  () {
                    _showDetailModal('Độ ẩm Không khí', 'Đo đạc từ cảm biến ẩm kế trạm quan trắc', [
                      'Độ ẩm tương đối: 68%',
                      'Điểm sương: 24.2°C',
                      'Cảm giác: Thoải mái, cơ thể thoát mồ hôi tự nhiên tốt',
                      'Tầm nhìn xa: Trên 10 km',
                    ]);
                  },
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: _buildMetricButton(
                  'Độ cao',
                  _altitude != null ? '\${_altitude!.round()} m' : '12 m',
                  'Mực nước biển',
                  Icons.terrain_outlined,
                  const Color(0xFF0D9488),
                  () {
                    _showDetailModal('Độ cao Người dùng', 'Dữ liệu cao độ địa hình & GPS', [
                      'Độ cao: \${_altitude != null ? \'\\\${_altitude!.round()} m\' : \'12 m\'} so với mực nước biển',
                      'Khí áp tương ứng: 1011.8 hPa',
                      'Địa hình: Đồng bằng trũng ven sông Sài Gòn',
                      'Nguy cơ ngập triều: An toàn',
                    ]);
                  },
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: _buildMetricButton(
                  'Tia UV',
                  'UV 5.4',
                  'Trung bình',
                  Icons.wb_sunny_outlined,
                  const Color(0xFFEA580C),
                  () {
                    _showDetailModal('Chỉ số Bức xạ Tia UV', 'Quan trắc quang phổ mặt trời', [
                      'Chỉ số UV đo được: 5.4 (Mức trung bình)',
                      'Bức xạ nhiệt: 680 W/m²',
                      'Khung giờ UV cao: 11:30 - 13:30',
                      'Khuyến nghị: Đeo kính râm và thoa kem chống nắng khi ra ngoài',
                    ]);
                  },
                ),
              ),
            ],
          ),
        ),
        // Cảnh báo biến cố
        const Padding(
          padding: EdgeInsets.fromLTRB(20, 24, 20, 12),
          child: Text(
            'Cảnh báo biến cố',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
          ),
        ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: GestureDetector(
            onTap: () {
              _showDetailModal('Chi tiết cảnh báo không khí', 'Mức độ ô nhiễm bụi mịn PM2.5 vào giờ tan tầm', [
                'Chỉ số AQI đo được: 115 (Mức kém)',
                'Khu vực ảnh hưởng chính: Trục đường Mai Chí Thọ - Tôn Đức Thắng',
                'Khuyến nghị: Hạn chế tập thể dục ngoài trời, dùng khẩu trang đạt chuẩn N95',
              ]);
            },
            child: Container(
              padding: const EdgeInsets.all(18),
              decoration: BoxDecoration(
                color: const Color(0xFFFDF2E4),
                borderRadius: BorderRadius.circular(20),
              ),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Icon(Icons.warning_amber_rounded, color: Color(0xFF9A5B13), size: 28),
                  const SizedBox(width: 14),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text(
                          'Chất lượng không khí giảm',
                          style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: Color(0xFF78350F)),
                        ),
                        SizedBox(height: 4),
                        Text(
                          'Khu vực phía Đông, mức trung bình kém',
                          style: TextStyle(fontSize: 14, color: Color(0xFF92400E)),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
        const SizedBox(height: 30),
      ],
    );
  }

  // TAB 2: MÔI TRƯỜNG
  Widget _buildEnvironmentTab() {
    return ListView(
      padding: EdgeInsets.zero,
      children: [
        _buildHeader('Môi trường khu vực'),
        // Card đánh giá thời tiết
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 22),
            decoration: BoxDecoration(
              color: const Color(0xFFEBF5FF),
              borderRadius: BorderRadius.circular(24),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: const [
                Text(
                  'Đánh giá thời tiết',
                  style: TextStyle(fontSize: 15, color: Color(0xFF1E40AF), fontWeight: FontWeight.w600),
                ),
                SizedBox(height: 6),
                Text(
                  'Ổn định, ít biến động',
                  style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800, color: Color(0xFF0F3B73)),
                ),
              ],
            ),
          ),
        ),
        // Chỉ số môi trường (3 nút)
        const Padding(
          padding: EdgeInsets.fromLTRB(20, 20, 20, 12),
          child: Text(
            'Chỉ số môi trường',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
          ),
        ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Row(
            children: [
              Expanded(child: _buildSquareButton('Nước', Icons.water_drop_outlined, () {
                _showDetailModal('Chỉ số Nguồn nước', 'Trạm quan trắc tự động rạch Bến Nghé', [
                  'Chỉ số WQI: 72/100 (Khá tốt)',
                  'Độ mặn: 0.15 g/L (An toàn sinh hoạt)',
                  'Lưu lượng nước lưu thông thông suốt',
                ]);
              })),
              const SizedBox(width: 10),
              Expanded(child: _buildSquareButton('Ánh sáng', Icons.lightbulb_outline, () {
                _showDetailModal('Chỉ số Ánh sáng & Bức xạ', 'Trạm khí tượng Lê Duẩn', [
                  'Chỉ số tia cực tím UV: 5.2 (Trung bình)',
                  'Thời gian chiếu sáng: 8.5 giờ/ngày',
                  'Mật độ bóng mát đô thị: 38%',
                ]);
              })),
              const SizedBox(width: 10),
              Expanded(child: _buildSquareButton('Địa chất', Icons.terrain_outlined, () {
                _showDetailModal('Chỉ số Địa chất & Nền đất', 'Bản đồ lún mặt đất TP.HCM', [
                  'Tầng địa chất: Phù sa cổ Pleistocen',
                  'Độ lún tích lũy: < 4 mm/năm (Rất thấp)',
                  'Độ rung chấn công trình: Nằm trong ngưỡng cho phép',
                ]);
              })),
            ],
          ),
        ),
        // Quần xã sinh vật (4 nút)
        const Padding(
          padding: EdgeInsets.fromLTRB(20, 20, 20, 12),
          child: Text(
            'Quần xã sinh vật',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
          ),
        ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Row(
            children: [
              Expanded(child: _buildSquareButton('Dưới nước', Icons.water, () {
                _showDetailModal('Quần xã dưới nước', 'Hệ sinh thái thủy sinh sông Sài Gòn & kênh Nhiêu Lộc', [
                  'Cá bảy màu, cá chép, cá mè dinh',
                  'Thực vật thủy sinh lọc nước tự nhiên',
                  'Môi trường thủy vực đạt tiêu chuẩn loại B1',
                ]);
              })),
              const SizedBox(width: 10),
              Expanded(child: _buildSquareButton('Trên cạn', Icons.pest_control_rodent_outlined, () {
                _showDetailModal('Quần xã trên cạn', 'Hệ động thực vật công viên và mảng xanh trung tâm', [
                  '85 loài thực vật thân gỗ (sao đen, lim xẹt)',
                  'Sóc đuôi đỏ, các loài bướm thảo cầm viên',
                  'Mật độ che phủ cây xanh 4.2 m²/người',
                ]);
              })),
              const SizedBox(width: 10),
              Expanded(child: _buildSquareButton('Trên trời', Icons.flutter_dash_outlined, () {
                _showDetailModal('Quần xã trên trời', 'Các loài chim và sinh vật bay đô thị', [
                  'Chim yến hàng ven các tòa nhà cao tầng',
                  'Bồ câu Tao Đàn, chim sâu, sẻ quạt',
                  'Đường bay di cư mùa khô an toàn',
                ]);
              })),
              const SizedBox(width: 10),
              Expanded(child: _buildSquareButton('Lưỡng cư', Icons.opacity_outlined, () {
                _showDetailModal('Quần xã lưỡng cư', 'Các sinh vật vùng trũng và bờ kè', [
                  'Ếch đồng, cóc nhà ven rạch Thị Nghè',
                  'Nhái bén bãi ngập nước',
                  'Độ ẩm nền đất thích hợp duy trì giống loài',
                ]);
              })),
            ],
          ),
        ),
        // Cảnh báo biến cố
        const Padding(
          padding: EdgeInsets.fromLTRB(20, 24, 20, 12),
          child: Text(
            'Cảnh báo biến cố',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
          ),
        ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Container(
            padding: const EdgeInsets.all(18),
            decoration: BoxDecoration(
              color: const Color(0xFFFDF2E4),
              borderRadius: BorderRadius.circular(20),
            ),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Icon(Icons.warning_amber_rounded, color: Color(0xFF9A5B13), size: 28),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: const [
                      Text(
                        'Mực nước kênh dâng nhẹ',
                        style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: Color(0xFF78350F)),
                      ),
                      SizedBox(height: 4),
                      Text(
                        'Khu vực trũng thấp, theo dõi thêm',
                        style: TextStyle(fontSize: 14, color: Color(0xFF92400E)),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
        // Ứng phó
        const Padding(
          padding: EdgeInsets.fromLTRB(20, 24, 20, 12),
          child: Text(
            'Ứng phó',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
          ),
        ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Column(
            children: [
              _buildWideActionCard(Icons.shield_outlined, 'Phương thức bảo vệ', () {
                _showDetailModal('Phương thức bảo vệ cá nhân & cộng đồng', 'Cẩm nang ứng phó thiên tai đô thị', [
                  'Kê cao vật dụng tại tầng trệt nếu triều cường vượt mức báo động 2',
                  'Đóng kín cửa và dùng máy lọc khí khi AQI > 100',
                  'Ngắt aptomat điện tại các ổ cắm sát chân tường ngập',
                ]);
              }),
              const SizedBox(height: 10),
              _buildWideActionCard(Icons.local_hospital_outlined, 'Cứu nạn cứu hộ', () {
                _showDetailModal('Cứu nạn cứu hộ khẩn cấp (Offline)', 'Danh bạ đường dây nóng khẩn cấp', [
                  'Trung tâm Cứu nạn 114 (Hoạt động cả khi mất sóng 4G)',
                  'Cấp cứu Y tế: 115',
                  'Tổng đài Dịch vụ Công ích Quận 1: 028.3827.2345',
                ]);
              }),
            ],
          ),
        ),
        const SizedBox(height: 30),
      ],
    );
  }

  // TAB 3: DOANH NGHIỆP
  Widget _buildEnterpriseTab() {
    return ListView(
      padding: EdgeInsets.zero,
      children: [
        _buildHeader('Phát triển doanh nghiệp'),
        // Card đánh giá tổng quát (Màu tím nhạt)
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 22),
            decoration: BoxDecoration(
              color: const Color(0xFFF0EDFD),
              borderRadius: BorderRadius.circular(24),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: const [
                Text(
                  'Đánh giá tổng quát',
                  style: TextStyle(fontSize: 15, color: Color(0xFF4C1D95), fontWeight: FontWeight.w600),
                ),
                SizedBox(height: 6),
                Text(
                  'Điều kiện thuận lợi để mở rộng',
                  style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800, color: Color(0xFF2E1065)),
                ),
              ],
            ),
          ),
        ),
        // Mức độ ảnh hưởng
        const Padding(
          padding: EdgeInsets.fromLTRB(20, 20, 20, 12),
          child: Text(
            'Mức độ ảnh hưởng',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
          ),
        ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Column(
            children: [
              _buildImpactBarCard(
                icon: Icons.terrain_outlined,
                title: 'Ảnh hưởng địa chất',
                level: 'Thấp',
                progress: 0.3,
                barColor: const Color(0xFF65A30D),
              ),
              const SizedBox(height: 12),
              _buildImpactBarCard(
                icon: Icons.water_drop_outlined,
                title: 'Ảnh hưởng nguồn nước',
                level: 'Trung bình',
                progress: 0.55,
                barColor: const Color(0xFFF59E0B),
              ),
              const SizedBox(height: 12),
              _buildImpactBarCard(
                icon: Icons.air_outlined,
                title: 'Ảnh hưởng không khí',
                level: 'Trung bình',
                progress: 0.5,
                barColor: const Color(0xFFF59E0B),
              ),
            ],
          ),
        ),
        // Định hướng
        const Padding(
          padding: EdgeInsets.fromLTRB(20, 24, 20, 12),
          child: Text(
            'Định hướng',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
          ),
        ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: _buildWideActionCard(Icons.eco_outlined, 'Bảo vệ môi trường trong sản xuất', () {
            _showDetailModal('Định hướng xanh cho Doanh nghiệp', 'Tiêu chí phát triển bền vững ESG', [
              'Chuyển đổi hệ thống chiếu sáng LED và năng lượng mặt trời áp mái',
              'Đầu tư hệ thống lọc tuần hoàn nước thải trước khi xả ra cống chung',
              'Chứng nhận doanh nghiệp xanh nhận ưu đãi thuế từ thành phố',
            ]);
          }),
        ),
        const SizedBox(height: 30),
      ],
    );
  }

  // TAB 4: BẢO VỆ MÔI TRƯỜNG
  Widget _buildProtectionTab() {
    return ListView(
      padding: EdgeInsets.zero,
      children: [
        _buildHeader('Bảo vệ môi trường'),
        // Card đánh giá tổng quát (Màu xanh lá nhạt)
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 22),
            decoration: BoxDecoration(
              color: const Color(0xFFEDF7ED),
              borderRadius: BorderRadius.circular(24),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: const [
                Text(
                  'Đánh giá tổng quát',
                  style: TextStyle(fontSize: 15, color: Color(0xFF166534), fontWeight: FontWeight.w600),
                ),
                SizedBox(height: 6),
                Text(
                  'Khu vực đạt mức khá',
                  style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800, color: Color(0xFF14532D)),
                ),
              ],
            ),
          ),
        ),
        // Rác phân thải khu vực (Lưới 2x2)
        const Padding(
          padding: EdgeInsets.fromLTRB(20, 20, 20, 12),
          child: Text(
            'Rác phân thải khu vực',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
          ),
        ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Column(
            children: [
              Row(
                children: [
                  Expanded(child: _buildSquareButton('Ô nhiễm môi trường', Icons.delete_outline, () {
                    _showDetailModal('Kiểm soát ô nhiễm', 'Điểm nóng thu gom rác trên địa bàn', [
                      'Giảm 75% các bãi rác tự phát ven cầu Thị Nghè',
                      'Hệ thống camera giám sát xử phạt hành vi xả rác bừa bãi',
                    ]);
                  })),
                  const SizedBox(width: 12),
                  Expanded(child: _buildSquareButton('Phân loại rác thải', Icons.recycling_outlined, () {
                    _showDetailModal('Hướng dẫn phân loại', 'Quy tắc 3 thùng rác tại nguồn', [
                      'Rác hữu cơ: Vỏ trái cây, thức ăn thừa -> Thùng xanh',
                      'Rác tái chế: Chai nhựa, bìa carton, lon nhôm -> Thùng trắng',
                      'Rác còn lại: Thùng xám',
                    ]);
                  })),
                ],
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  Expanded(child: _buildSquareButton('Thu gom rác thải', Icons.local_shipping_outlined, () {
                    _showDetailModal('Lịch trình thu gom', 'Hệ thống xe ép rác chuyên dụng', [
                      'Ca sáng: 05:00 - 07:30',
                      'Ca chiều: 17:30 - 20:00',
                      'Đăng ký thu gom rác cồng kềnh miễn phí qua tổng đài',
                    ]);
                  })),
                  const SizedBox(width: 12),
                  Expanded(child: _buildSquareButton('Nhiên liệu từ rác', Icons.lightbulb_outline, () {
                    _showDetailModal('Nhiên liệu từ rác', 'Kinh tế tuần hoàn năng lượng tái tạo', [
                      'Chuyển hóa 42% rác hữu cơ thành viên nén đốt công nghiệp',
                      'Nhà máy phát điện từ khí sinh học bãi rác Đa Phước',
                    ]);
                  })),
                ],
              ),
            ],
          ),
        ),
        // Cộng đồng
        const Padding(
          padding: EdgeInsets.fromLTRB(20, 24, 20, 12),
          child: Text(
            'Cộng đồng',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: Color(0xFF0F172A)),
          ),
        ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Column(
            children: [
              _buildWideActionCard(Icons.groups_outlined, 'Hoạt động tự nguyện', () {
                _showDetailModal('Hoạt động tình nguyện', 'Chương trình Chủ Nhật Xanh', [
                  'Dọn sạch rác dọc tuyến kênh Bến Nghé mỗi sáng Chủ Nhật',
                  'Phát tặng cây xanh miễn phí cho người dân phân loại đúng',
                  'Đã có 1.450 tình nguyện viên đăng ký',
                ]);
              }),
              const SizedBox(height: 10),
              _buildWideActionCard(Icons.campaign_outlined, 'Tuyên truyền nâng cao ý thức', () {
                _showDetailModal('Chiến dịch tuyên truyền', 'Xây dựng khu phố xanh, văn minh', [
                  'Tuyên truyền không sử dụng túi nilon dùng 1 lần tại các chợ truyền thống',
                  'Tập huấn phân loại rác cho học sinh các trường tiểu học',
                ]);
              }),
            ],
          ),
        ),
        const SizedBox(height: 30),
      ],
    );
  }

  // WIDGET HELPER: Nút vuông bo tròn mềm mại
  Widget _buildSquareButton(String label, IconData icon, VoidCallback onTap) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(18),
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 8),
        decoration: BoxDecoration(
          color: const Color(0xFFF5F4F0),
          borderRadius: BorderRadius.circular(18),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, size: 28, color: const Color(0xFF475569)),
            const SizedBox(height: 10),
            Text(
              label,
              textAlign: TextAlign.center,
              style: const TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w600,
                color: Color(0xFF334155),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // WIDGET HELPER: Thẻ thông số thời tiết kèm giá trị lớn & phụ đề
  Widget _buildMetricButton(
    String label,
    String value,
    String sub,
    IconData icon,
    Color iconColor,
    VoidCallback onTap,
  ) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(18),
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 6),
        decoration: BoxDecoration(
          color: const Color(0xFFF5F4F0),
          borderRadius: BorderRadius.circular(18),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, size: 26, color: iconColor),
            const SizedBox(height: 6),
            Text(
              label,
              textAlign: TextAlign.center,
              style: const TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w700,
                color: Color(0xFF334155),
              ),
            ),
            const SizedBox(height: 3),
            Text(
              value,
              textAlign: TextAlign.center,
              style: const TextStyle(
                fontSize: 15,
                fontWeight: FontWeight.w900,
                color: Color(0xFF0F3B73),
              ),
            ),
            const SizedBox(height: 2),
            Text(
              sub,
              textAlign: TextAlign.center,
              style: const TextStyle(
                fontSize: 10,
                fontWeight: FontWeight.w500,
                color: Color(0xFF64748B),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // WIDGET HELPER: Thẻ hành động dài ngang
  Widget _buildWideActionCard(IconData icon, String title, VoidCallback onTap) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(18),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 16),
        decoration: BoxDecoration(
          color: const Color(0xFFF5F4F0),
          borderRadius: BorderRadius.circular(18),
        ),
        child: Row(
          children: [
            Icon(icon, size: 24, color: const Color(0xFF334155)),
            const SizedBox(width: 14),
            Expanded(
              child: Text(
                title,
                style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w600, color: Color(0xFF1E293B)),
              ),
            ),
            const Icon(Icons.chevron_right, color: Color(0xFF94A3B8)),
          ],
        ),
      ),
    );
  }

  // WIDGET HELPER: Thẻ thanh đo mức độ ảnh hưởng (Doanh nghiệp)
  Widget _buildImpactBarCard({
    required IconData icon,
    required String title,
    required String level,
    required double progress,
    required Color barColor,
  }) {
    return Container(
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        color: const Color(0xFFF5F4F0),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(icon, size: 22, color: const Color(0xFF475569)),
              const SizedBox(width: 10),
              Expanded(
                child: Text(
                  title,
                  style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w600, color: Color(0xFF1E293B)),
                ),
              ),
              Text(
                level,
                style: const TextStyle(fontSize: 14, color: Color(0xFF64748B), fontWeight: FontWeight.w500),
              ),
            ],
          ),
          const SizedBox(height: 12),
          ClipRRect(
            borderRadius: BorderRadius.circular(6),
            child: LinearProgressIndicator(
              value: progress,
              backgroundColor: Colors.transparent,
              valueColor: AlwaysStoppedAnimation<Color>(barColor),
              minHeight: 6,
            ),
          ),
        ],
      ),
    );
  }
}
`;

export const FLUTTER_ANDROID_MANIFEST = `<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <!-- Quyền định vị vệ tinh GPS độ chính xác cao -->
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    
    <!-- Quyền gửi thông báo cảnh báo triều cường & môi trường (Android 13+) -->
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
    
    <!-- Quyền mạng và chạy nền -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />

    <application
        android:label="EcoApp"
        android:name="\${applicationName}"
        android:icon="@mipmap/ic_launcher">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:launchMode="singleTop"
            android:theme="@style/LaunchTheme"
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|smallestScreenSize|locale|layoutDirection|fontScale|screenLayout|density|uiMode"
            android:hardwareAccelerated="true"
            android:windowSoftInputMode="adjustResize">
            <meta-data
              android:name="io.flutter.embedding.android.NormalTheme"
              android:resource="@style/NormalTheme"
              />
            <intent-filter>
                <action android:name="android.intent.action.MAIN"/>
                <category android:name="android.intent.category.LAUNCHER"/>
            </intent-filter>
        </activity>
        <meta-data
            android:name="flutterEmbedding"
            android:value="2" />
    </application>
</manifest>
`;

export const APK_BUILD_INSTRUCTIONS = `# HƯỚNG DẪN BUILD FILE APK OFFLINE VỚI FLUTTER / DART
(KÈM ĐẦY ĐỦ QUYỀN VỊ TRÍ GPS VÀ QUYỀN THÔNG BÁO)

### Bước 1: Cài đặt Flutter SDK (Nếu máy bạn chưa có)
- Tải Flutter SDK từ: https://docs.flutter.dev/get-started/install
- Mở Terminal hoặc Command Prompt, kiểm tra:
  \`flutter doctor\`

### Bước 2: Tạo dự án Flutter mới
- Chạy lệnh sau trong thư mục làm việc của bạn:
  \`flutter create eco_app_offline\`
  \`cd eco_app_offline\`

### Bước 3: Cấu hình mã nguồn & cấp quyền hệ thống
1. Mở tệp \`pubspec.yaml\` và dán nội dung từ tab **"pubspec.yaml"**.
2. Mở tệp \`lib/main.dart\` và dán toàn bộ mã nguồn Dart từ tab **"main.dart"**.
3. **CỰC KỲ QUAN TRỌNG (Để không bị lỗi "Không có quyền nào được yêu cầu"):**
   - Mở tệp: \`android/app/src/main/AndroidManifest.xml\`
   - Dán toàn bộ nội dung từ tab **"AndroidManifest.xml"** vào.
   - Thao tác này sẽ đăng ký các quyền:
     + \`ACCESS_FINE_LOCATION\` (Định vị GPS chính xác)
     + \`ACCESS_COARSE_LOCATION\` (Định vị mạng/trạm phát)
     + \`POST_NOTIFICATIONS\` (Bật quyền thông báo trên Android 13/14/15)

### Bước 4: Tải thư viện
- Chạy lệnh:
  \`flutter pub get\`

### Bước 5: Chạy thử trên điện thoại thật
- Kết nối cáp điện thoại Android với máy tính (bật USB Debugging), chạy lệnh:
  \`flutter run\`

### Bước 6: Xuất file APK độc lập (Offline)
- Để xuất file APK cài đặt trực tiếp cho điện thoại Android:
  \`flutter build apk --release\`

- File APK sau khi build thành công sẽ nằm ở đường dẫn:
  \`build/app/outputs/flutter-apk/app-release.apk\`

- Chuyển file APK này qua điện thoại qua Zalo, Google Drive hoặc dây cáp và cài đặt. Khi cài xong, vào Thông tin ứng dụng sẽ thấy đầy đủ mục **Quyền: Vị trí** và **Quản lý thông báo: Đã bật**.

---

# CÁCH BUILD APK TỰ ĐỘNG TRÊN GITHUB (GITHUB ACTIONS)
Nếu bạn đẩy (push) mã nguồn dự án lên GitHub và muốn GitHub tự động biên dịch xuất file APK mà không cần cài Flutter hay Android Studio trên máy:

### Bước 1: Kiểm tra file Workflow trên GitHub
Đảm bảo trong kho lưu trữ GitHub của bạn có file:
.github/workflows/build-apk.yml (sao chép từ tab "Build bằng GitHub").

### Bước 2: Vì sao trước đây build trên GitHub không có quyền?
Trước đây quy trình tự động trên GitHub tạo thư mục android/ mới nhưng chưa chèn quyền ACCESS_FINE_LOCATION và POST_NOTIFICATIONS vào AndroidManifest.xml. 
File workflow mới đã được bổ sung bước "Inject Android Permissions (GPS & Notifications)" để tự động chèn các quyền này trước khi lệnh Gradle biên dịch APK.

### Bước 3: Cách tải file APK từ GitHub
1. Mở trang kho lưu trữ GitHub của bạn trên trình duyệt.
2. Bấm vào tab "Actions" ở menu trên cùng.
3. Bấm vào tên workflow "Build Android APK" (hoặc bấm nút "Run workflow" để chạy thủ công).
4. Khi quá trình build hiện tích xanh (Success), bấm vào đợt chạy đó.
5. Kéo xuống dưới cùng tại mục "Artifacts", bấm tải file "EcoApp-APK".
6. Giải nén file zip tải về sẽ có file "app-debug.apk". Cài file này vào điện thoại, Android sẽ nhận diện và cấp đầy đủ quyền Vị trí GPS và Thông báo!
`;

export const GITHUB_ACTIONS_WORKFLOW = `name: Build Android APK

on:
  workflow_dispatch:
  push:
    branches:
      - main
      - master

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22
          
      - name: Install dependencies
        run: npm install

      - name: Build Web App
        run: npm run build

      - name: Install Capacitor & Plugins
        run: |
          npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/geolocation @capacitor/local-notifications

      - name: Initialize Capacitor
        run: |
          npx cap init "EcoApp" "com.ecoapp.environment" --web-dir=dist

      - name: Add Android
        run: npx cap add android

      - name: Sync Android
        run: npx cap sync android

      - name: Inject Android Permissions (GPS & Notifications)
        run: |
          node -e '
            const fs = require("fs");
            const manifestPath = "android/app/src/main/AndroidManifest.xml";
            if (fs.existsSync(manifestPath)) {
              let content = fs.readFileSync(manifestPath, "utf8");
              const permissions = "\\n" +
                "    <!-- 1. Quyen dinh vi GPS ve tinh chinh xac & do cao -->\\n" +
                "    <uses-permission android:name=\\"android.permission.ACCESS_FINE_LOCATION\\" />\\n" +
                "    <uses-permission android:name=\\"android.permission.ACCESS_COARSE_LOCATION\\" />\\n" +
                "    <uses-feature android:name=\\"android.hardware.location.gps\\" android:required=\\"false\\" />\\n\\n" +
                "    <!-- 2. Quyen gui thong bao canh bao trieu cuong & UV (Android 13+) -->\\n" +
                "    <uses-permission android:name=\\"android.permission.POST_NOTIFICATIONS\\" />\\n\\n" +
                "    <!-- 3. Quyen mang va rung canh bao -->\\n" +
                "    <uses-permission android:name=\\"android.permission.INTERNET\\" />\\n" +
                "    <uses-permission android:name=\\"android.permission.ACCESS_NETWORK_STATE\\" />\\n" +
                "    <uses-permission android:name=\\"android.permission.VIBRATE\\" />\\n" +
                "    <uses-permission android:name=\\"android.permission.WAKE_LOCK\\" />\\n";

              if (!content.includes("ACCESS_FINE_LOCATION")) {
                content = content.replace("<application", permissions + "    <application");
                fs.writeFileSync(manifestPath, content, "utf8");
                console.log("==> Successfully injected GPS & Notification permissions into AndroidManifest.xml!");
              }
            } else {
              console.error("==> Manifest file not found at " + manifestPath);
            }
          '

      - name: Setup Java
        uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: '21'

      - name: Setup Android SDK
        uses: android-actions/setup-android@v3

      - name: Make gradlew executable
        working-directory: android
        run: chmod +x ./gradlew

      - name: Build APK
        working-directory: android
        run: ./gradlew assembleDebug

      - name: Upload APK
        uses: actions/upload-artifact@v4
        with:
          name: EcoApp-APK
          path: android/app/build/outputs/apk/debug/app-debug.apk
`;
