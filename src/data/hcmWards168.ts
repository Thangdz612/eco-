import { DistrictData } from '../types';

export interface AdminUnitInfo {
  id: string;
  name: string;
  subTitle: string;
  districtGroup: string;
  adminType: 'phường' | 'xã' | 'đặc khu';
  lat: number;
  lng: number;
}

export const HCM_DISTRICT_GROUPS = [
  'Tất cả',
  'Quận 1',
  'Quận 3',
  'Quận 4',
  'Quận 5',
  'Quận 6',
  'Quận 7',
  'Quận 8',
  'Quận 10',
  'Quận 11',
  'Quận 12',
  'Bình Thạnh',
  'Gò Vấp',
  'Phú Nhuận',
  'Tân Bình',
  'Tân Phú',
  'Bình Tân',
  'TP. Thủ Đức',
  'Huyện Củ Chi',
  'Huyện Hóc Môn',
  'Huyện Bình Chánh',
  'Huyện Nhà Bè',
  'Huyện Cần Giờ',
  'Đặc khu Côn Đảo'
] as const;

export const DISTRICTS_DATA: Record<string, DistrictData> = {
  'quan-1': {
    id: 'quan-1',
    name: 'Phường Sài Gòn, Quận 1',
    subTitle: 'Trung tâm hành chính & tài chính TP.HCM',
    districtGroup: 'Quận 1',
    adminType: 'phường',
    lat: 10.7769,
    lng: 106.7009,
    weather: {
      temp: '31°C',
      condition: 'nắng nhẹ',
      description: 'Phường Sài Gòn, Quận 1 - Độ ẩm 64%, gió 8km/h, vi khí hậu ổn định',
      humidity: '64%',
      altitude: '10 m',
      uvIndex: 'UV 5.0',
      uvLevel: 'Thấp',
      lightIntensity: '600 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 18,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 65,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 28,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 12,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 62',
        quality: 'Trung bình',
        progress: 62,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 5.0',
        quality: 'Tốt',
        progress: 50,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 88,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Sài Gòn, Quận 1, khu vực Quận 1',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Sài Gòn, Quận 1',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Rất thấp',
        percent: 25,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 80% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 40% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Sài Gòn, Quận 1',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q1-tandinh': {
    id: 'hcm-q1-tandinh',
    name: 'Phường Tân Định, Quận 1',
    subTitle: 'Khu dân cư lịch sử & Chợ Tân Định',
    districtGroup: 'Quận 1',
    adminType: 'phường',
    lat: 10.7915,
    lng: 106.6912,
    weather: {
      temp: '32°C',
      condition: 'mây rải rác',
      description: 'Phường Tân Định, Quận 1 - Độ ẩm 65%, gió 9km/h, vi khí hậu ổn định',
      humidity: '65%',
      altitude: '11 m',
      uvIndex: 'UV 5.3',
      uvLevel: 'Trung bình',
      lightIntensity: '617 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 19,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 66,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 29,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 13,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 63',
        quality: 'Trung bình',
        progress: 63,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 5.3',
        quality: 'Tốt',
        progress: 53,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 88,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Tân Định, Quận 1, khu vực Quận 1',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Tân Định, Quận 1',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Rất thấp',
        percent: 25,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 81% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 41% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Tân Định, Quận 1',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q1-benthanh': {
    id: 'hcm-q1-benthanh',
    name: 'Phường Bến Thành, Quận 1',
    subTitle: 'Chợ Bến Thành & Công viên 23/9',
    districtGroup: 'Quận 1',
    adminType: 'phường',
    lat: 10.7725,
    lng: 106.698,
    weather: {
      temp: '33°C',
      condition: 'nắng dịu',
      description: 'Phường Bến Thành, Quận 1 - Độ ẩm 66%, gió 10km/h, vi khí hậu ổn định',
      humidity: '66%',
      altitude: '12 m',
      uvIndex: 'UV 5.6',
      uvLevel: 'Trung bình',
      lightIntensity: '634 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 20,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 67,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 30,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 14,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 64',
        quality: 'Trung bình',
        progress: 64,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 5.6',
        quality: 'Trung bình',
        progress: 56,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 88,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Bến Thành, Quận 1, khu vực Quận 1',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Bến Thành, Quận 1',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Rất thấp',
        percent: 25,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 82% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 42% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Bến Thành, Quận 1',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q1-cauonglanh': {
    id: 'hcm-q1-cauonglanh',
    name: 'Phường Cầu Ông Lãnh, Quận 1',
    subTitle: 'Bến Chương Dương & đại lộ Võ Văn Kiệt',
    districtGroup: 'Quận 1',
    adminType: 'phường',
    lat: 10.763,
    lng: 106.6975,
    weather: {
      temp: '34°C',
      condition: 'nắng nhẹ',
      description: 'Phường Cầu Ông Lãnh, Quận 1 - Độ ẩm 67%, gió 11km/h, vi khí hậu ổn định',
      humidity: '67%',
      altitude: '13 m',
      uvIndex: 'UV 5.9',
      uvLevel: 'Trung bình',
      lightIntensity: '651 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 21,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 68,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 31,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 15,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 65',
        quality: 'Khá tốt',
        progress: 65,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 5.9',
        quality: 'Trung bình',
        progress: 59,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 88,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Cầu Ông Lãnh, Quận 1, khu vực Quận 1',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Cầu Ông Lãnh, Quận 1',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Rất thấp',
        percent: 25,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 83% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 43% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Cầu Ông Lãnh, Quận 1',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q1-choquan': {
    id: 'hcm-q1-choquan',
    name: 'Phường Chợ Quán, Quận 1',
    subTitle: 'Di tích lịch sử Bệnh viện Chợ Quán',
    districtGroup: 'Quận 1',
    adminType: 'phường',
    lat: 10.758,
    lng: 106.685,
    weather: {
      temp: '31°C',
      condition: 'mây rải rác',
      description: 'Phường Chợ Quán, Quận 1 - Độ ẩm 68%, gió 12km/h, vi khí hậu ổn định',
      humidity: '68%',
      altitude: '14 m',
      uvIndex: 'UV 6.2',
      uvLevel: 'Trung bình',
      lightIntensity: '668 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 22,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 69,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 32,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 16,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 66',
        quality: 'Khá tốt',
        progress: 66,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 6.2',
        quality: 'Trung bình',
        progress: 62,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 88,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Chợ Quán, Quận 1, khu vực Quận 1',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Chợ Quán, Quận 1',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Rất thấp',
        percent: 25,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 84% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 44% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Chợ Quán, Quận 1',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q3-banco': {
    id: 'hcm-q3-banco',
    name: 'Phường Bàn Cờ, Quận 3',
    subTitle: 'Mạng lưới phố bàn cờ & di sản ẩm thực',
    districtGroup: 'Quận 3',
    adminType: 'phường',
    lat: 10.7712,
    lng: 106.6815,
    weather: {
      temp: '32°C',
      condition: 'nắng dịu',
      description: 'Phường Bàn Cờ, Quận 3 - Độ ẩm 69%, gió 13km/h, vi khí hậu ổn định',
      humidity: '69%',
      altitude: '15 m',
      uvIndex: 'UV 6.5',
      uvLevel: 'Trung bình',
      lightIntensity: '685 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 23,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 70,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 33,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 17,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 67',
        quality: 'Khá tốt',
        progress: 67,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 6.5',
        quality: 'Trung bình',
        progress: 65,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 88,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Bàn Cờ, Quận 3, khu vực Quận 3',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Bàn Cờ, Quận 3',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Rất thấp',
        percent: 25,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 85% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 45% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Bàn Cờ, Quận 3',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q3-xuanhoa': {
    id: 'hcm-q3-xuanhoa',
    name: 'Phường Xuân Hòa, Quận 3',
    subTitle: 'Khu biệt thự cổ & Công viên Lê Văn Tám',
    districtGroup: 'Quận 3',
    adminType: 'phường',
    lat: 10.7834,
    lng: 106.689,
    weather: {
      temp: '33°C',
      condition: 'nắng nhẹ',
      description: 'Phường Xuân Hòa, Quận 3 - Độ ẩm 70%, gió 14km/h, vi khí hậu ổn định',
      humidity: '70%',
      altitude: '10 m',
      uvIndex: 'UV 6.8',
      uvLevel: 'Trung bình',
      lightIntensity: '702 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 24,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 71,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 34,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 18,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 68',
        quality: 'Khá tốt',
        progress: 68,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 6.8',
        quality: 'Trung bình',
        progress: 68,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 88,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Xuân Hòa, Quận 3, khu vực Quận 3',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Xuân Hòa, Quận 3',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Rất thấp',
        percent: 25,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 86% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 46% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Xuân Hòa, Quận 3',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q3-nhieuloc': {
    id: 'hcm-q3-nhieuloc',
    name: 'Phường Nhiêu Lộc, Quận 3',
    subTitle: 'Hành lang sinh thái kênh Nhiêu Lộc - Thị Nghè',
    districtGroup: 'Quận 3',
    adminType: 'phường',
    lat: 10.7891,
    lng: 106.6772,
    weather: {
      temp: '34°C',
      condition: 'mây rải rác',
      description: 'Phường Nhiêu Lộc, Quận 3 - Độ ẩm 71%, gió 8km/h, vi khí hậu ổn định',
      humidity: '71%',
      altitude: '11 m',
      uvIndex: 'UV 7.1',
      uvLevel: 'Cao',
      lightIntensity: '719 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 25,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 72,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 35,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 19,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 69',
        quality: 'Khá tốt',
        progress: 69,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 7.1',
        quality: 'Trung bình',
        progress: 71,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 88,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Nhiêu Lộc, Quận 3, khu vực Quận 3',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Nhiêu Lộc, Quận 3',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Rất thấp',
        percent: 25,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 87% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 47% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Nhiêu Lộc, Quận 3',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q4-xomchieu': {
    id: 'hcm-q4-xomchieu',
    name: 'Phường Xóm Chiếu, Quận 4',
    subTitle: 'Khu thương mại cảng & ẩm thực truyền thống',
    districtGroup: 'Quận 4',
    adminType: 'phường',
    lat: 10.7621,
    lng: 106.7082,
    weather: {
      temp: '31°C',
      condition: 'nắng dịu',
      description: 'Phường Xóm Chiếu, Quận 4 - Độ ẩm 64%, gió 9km/h, vi khí hậu ổn định',
      humidity: '64%',
      altitude: '12 m',
      uvIndex: 'UV 7.4',
      uvLevel: 'Cao',
      lightIntensity: '736 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 26,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 73,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 36,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 12,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 70',
        quality: 'Khá tốt',
        progress: 70,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 7.4',
        quality: 'Trung bình',
        progress: 74,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 88,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Xóm Chiếu, Quận 4, khu vực Quận 4',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Xóm Chiếu, Quận 4',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Rất thấp',
        percent: 25,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 88% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 48% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Xóm Chiếu, Quận 4',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q4-khanhhoi': {
    id: 'hcm-q4-khanhhoi',
    name: 'Phường Khánh Hội, Quận 4',
    subTitle: 'Công viên Khánh Hội & đường Hoàng Diệu',
    districtGroup: 'Quận 4',
    adminType: 'phường',
    lat: 10.758,
    lng: 106.702,
    weather: {
      temp: '32°C',
      condition: 'nắng nhẹ',
      description: 'Phường Khánh Hội, Quận 4 - Độ ẩm 65%, gió 10km/h, vi khí hậu ổn định',
      humidity: '65%',
      altitude: '13 m',
      uvIndex: 'UV 7.7',
      uvLevel: 'Cao',
      lightIntensity: '753 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 27,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 74,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 37,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 13,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 71',
        quality: 'Khá tốt',
        progress: 71,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 7.7',
        quality: 'Trung bình',
        progress: 77,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 88,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Khánh Hội, Quận 4, khu vực Quận 4',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Khánh Hội, Quận 4',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Rất thấp',
        percent: 25,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 89% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 49% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Khánh Hội, Quận 4',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q4-vinhhoi': {
    id: 'hcm-q4-vinhhoi',
    name: 'Phường Vĩnh Hội, Quận 4',
    subTitle: 'Khu dân cư bờ nam kênh Bến Nghé - Tẻ',
    districtGroup: 'Quận 4',
    adminType: 'phường',
    lat: 10.754,
    lng: 106.6985,
    weather: {
      temp: '33°C',
      condition: 'mây rải rác',
      description: 'Phường Vĩnh Hội, Quận 4 - Độ ẩm 66%, gió 11km/h, vi khí hậu ổn định',
      humidity: '66%',
      altitude: '14 m',
      uvIndex: 'UV 8.0',
      uvLevel: 'Cao',
      lightIntensity: '770 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 28,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 75,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 28,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 14,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 72',
        quality: 'Khá tốt',
        progress: 72,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 8.0',
        quality: 'Trung bình',
        progress: 80,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 88,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Vĩnh Hội, Quận 4, khu vực Quận 4',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Vĩnh Hội, Quận 4',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Rất thấp',
        percent: 25,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 90% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 50% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Vĩnh Hội, Quận 4',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q5-cholon': {
    id: 'hcm-q5-cholon',
    name: 'Phường Chợ Lớn, Quận 5',
    subTitle: 'Di sản phố cổ Chợ Lớn & Chợ Bình Tây',
    districtGroup: 'Quận 5',
    adminType: 'phường',
    lat: 10.7538,
    lng: 106.6579,
    weather: {
      temp: '34°C',
      condition: 'nắng dịu',
      description: 'Phường Chợ Lớn, Quận 5 - Độ ẩm 67%, gió 12km/h, vi khí hậu ổn định',
      humidity: '67%',
      altitude: '15 m',
      uvIndex: 'UV 8.3',
      uvLevel: 'Cao',
      lightIntensity: '787 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 29,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 76,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 29,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 15,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 73',
        quality: 'Khá tốt',
        progress: 73,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 8.3',
        quality: 'Trung bình',
        progress: 83,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 88,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Chợ Lớn, Quận 5, khu vực Quận 5',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Chợ Lớn, Quận 5',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Rất thấp',
        percent: 25,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 91% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 51% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Chợ Lớn, Quận 5',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q5-andong': {
    id: 'hcm-q5-andong',
    name: 'Phường An Đông, Quận 5',
    subTitle: 'Chợ An Đông & trung tâm y tế hàng đầu',
    districtGroup: 'Quận 5',
    adminType: 'phường',
    lat: 10.757,
    lng: 106.6702,
    weather: {
      temp: '31°C',
      condition: 'nắng nhẹ',
      description: 'Phường An Đông, Quận 5 - Độ ẩm 68%, gió 13km/h, vi khí hậu ổn định',
      humidity: '68%',
      altitude: '10 m',
      uvIndex: 'UV 8.6',
      uvLevel: 'Cao',
      lightIntensity: '804 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 18,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 77,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 30,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 16,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 74',
        quality: 'Khá tốt',
        progress: 74,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 8.6',
        quality: 'Trung bình',
        progress: 86,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 88,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường An Đông, Quận 5, khu vực Quận 5',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường An Đông, Quận 5',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Rất thấp',
        percent: 25,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 92% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 52% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường An Đông, Quận 5',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q5-haithuong': {
    id: 'hcm-q5-haithuong',
    name: 'Phường Hải Thượng Lãn Ông, Quận 5',
    subTitle: 'Phố đông y truyền thống & kiến trúc người Hoa',
    districtGroup: 'Quận 5',
    adminType: 'phường',
    lat: 10.7512,
    lng: 106.6621,
    weather: {
      temp: '32°C',
      condition: 'mây rải rác',
      description: 'Phường Hải Thượng Lãn Ông, Quận 5 - Độ ẩm 69%, gió 14km/h, vi khí hậu ổn định',
      humidity: '69%',
      altitude: '11 m',
      uvIndex: 'UV 8.9',
      uvLevel: 'Cao',
      lightIntensity: '821 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 19,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 78,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 31,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 17,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 75',
        quality: 'Rất tốt',
        progress: 75,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 8.9',
        quality: 'Trung bình',
        progress: 89,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 88,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Hải Thượng Lãn Ông, Quận 5, khu vực Quận 5',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Hải Thượng Lãn Ông, Quận 5',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Rất thấp',
        percent: 25,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 93% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 53% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Hải Thượng Lãn Ông, Quận 5',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q5-nguyentrai': {
    id: 'hcm-q5-nguyentrai',
    name: 'Phường Nguyễn Trãi, Quận 5',
    subTitle: 'Trục thương mại thời trang & mua sắm sầm uất',
    districtGroup: 'Quận 5',
    adminType: 'phường',
    lat: 10.7555,
    lng: 106.6765,
    weather: {
      temp: '33°C',
      condition: 'nắng dịu',
      description: 'Phường Nguyễn Trãi, Quận 5 - Độ ẩm 70%, gió 8km/h, vi khí hậu ổn định',
      humidity: '70%',
      altitude: '12 m',
      uvIndex: 'UV 5.2',
      uvLevel: 'Trung bình',
      lightIntensity: '838 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 20,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 79,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 32,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 18,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 62',
        quality: 'Trung bình',
        progress: 62,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 5.2',
        quality: 'Tốt',
        progress: 52,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 88,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Nguyễn Trãi, Quận 5, khu vực Quận 5',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Nguyễn Trãi, Quận 5',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Rất thấp',
        percent: 25,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 94% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 54% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Nguyễn Trãi, Quận 5',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q6-binhtay': {
    id: 'hcm-q6-binhtay',
    name: 'Phường Bình Tây, Quận 6',
    subTitle: 'Đầu mối bán buôn nông sản & hàng tiêu dùng',
    districtGroup: 'Quận 6',
    adminType: 'phường',
    lat: 10.7495,
    lng: 106.6495,
    weather: {
      temp: '34°C',
      condition: 'nắng nhẹ',
      description: 'Phường Bình Tây, Quận 6 - Độ ẩm 71%, gió 9km/h, vi khí hậu ổn định',
      humidity: '71%',
      altitude: '13 m',
      uvIndex: 'UV 5.5',
      uvLevel: 'Trung bình',
      lightIntensity: '605 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 21,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 80,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 33,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 19,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 63',
        quality: 'Trung bình',
        progress: 63,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 5.5',
        quality: 'Tốt',
        progress: 55,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Bình Tây, Quận 6, khu vực Quận 6',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Bình Tây, Quận 6',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 95% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 55% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Bình Tây, Quận 6',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q6-phulam': {
    id: 'hcm-q6-phulam',
    name: 'Phường Phú Lâm, Quận 6',
    subTitle: 'Vòng xoay Phú Lâm & công viên sinh thái',
    districtGroup: 'Quận 6',
    adminType: 'phường',
    lat: 10.746,
    lng: 106.638,
    weather: {
      temp: '31°C',
      condition: 'mây rải rác',
      description: 'Phường Phú Lâm, Quận 6 - Độ ẩm 64%, gió 10km/h, vi khí hậu ổn định',
      humidity: '64%',
      altitude: '14 m',
      uvIndex: 'UV 5.8',
      uvLevel: 'Trung bình',
      lightIntensity: '622 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 22,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 81,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 34,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 12,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 64',
        quality: 'Trung bình',
        progress: 64,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 5.8',
        quality: 'Trung bình',
        progress: 58,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Phú Lâm, Quận 6, khu vực Quận 6',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Phú Lâm, Quận 6',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 96% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 56% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Phú Lâm, Quận 6',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q6-binhtien': {
    id: 'hcm-q6-binhtien',
    name: 'Phường Bình Tiên, Quận 6',
    subTitle: 'Khu thương mại tiểu thủ công nghiệp',
    districtGroup: 'Quận 6',
    adminType: 'phường',
    lat: 10.7435,
    lng: 106.6465,
    weather: {
      temp: '32°C',
      condition: 'nắng dịu',
      description: 'Phường Bình Tiên, Quận 6 - Độ ẩm 65%, gió 11km/h, vi khí hậu ổn định',
      humidity: '65%',
      altitude: '15 m',
      uvIndex: 'UV 6.1',
      uvLevel: 'Trung bình',
      lightIntensity: '639 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 23,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 82,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 35,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 13,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 65',
        quality: 'Khá tốt',
        progress: 65,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 6.1',
        quality: 'Trung bình',
        progress: 61,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Bình Tiên, Quận 6, khu vực Quận 6',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Bình Tiên, Quận 6',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 97% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 57% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Bình Tiên, Quận 6',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q6-hungvuong': {
    id: 'hcm-q6-hungvuong',
    name: 'Phường Hùng Vương, Quận 6',
    subTitle: 'Trục giao thương huyết mạch phía tây thành phố',
    districtGroup: 'Quận 6',
    adminType: 'phường',
    lat: 10.751,
    lng: 106.632,
    weather: {
      temp: '33°C',
      condition: 'nắng nhẹ',
      description: 'Phường Hùng Vương, Quận 6 - Độ ẩm 66%, gió 12km/h, vi khí hậu ổn định',
      humidity: '66%',
      altitude: '10 m',
      uvIndex: 'UV 6.4',
      uvLevel: 'Trung bình',
      lightIntensity: '656 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 24,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 83,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 36,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 14,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 66',
        quality: 'Khá tốt',
        progress: 66,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 6.4',
        quality: 'Trung bình',
        progress: 64,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Hùng Vương, Quận 6, khu vực Quận 6',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Hùng Vương, Quận 6',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 80% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 58% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Hùng Vương, Quận 6',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q6-binhphu': {
    id: 'hcm-q6-binhphu',
    name: 'Phường Bình Phú, Quận 6',
    subTitle: 'Khu đô thị sinh thái xanh Bình Phú',
    districtGroup: 'Quận 6',
    adminType: 'phường',
    lat: 10.741,
    lng: 106.629,
    weather: {
      temp: '34°C',
      condition: 'mây rải rác',
      description: 'Phường Bình Phú, Quận 6 - Độ ẩm 67%, gió 13km/h, vi khí hậu ổn định',
      humidity: '67%',
      altitude: '11 m',
      uvIndex: 'UV 6.7',
      uvLevel: 'Trung bình',
      lightIntensity: '673 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 25,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 84,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 37,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 15,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 67',
        quality: 'Khá tốt',
        progress: 67,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 6.7',
        quality: 'Trung bình',
        progress: 67,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Bình Phú, Quận 6, khu vực Quận 6',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Bình Phú, Quận 6',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 81% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 59% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Bình Phú, Quận 6',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q6-chautho': {
    id: 'hcm-q6-chautho',
    name: 'Phường Hậu Giang, Quận 6',
    subTitle: 'Khu dân cư đường Hậu Giang & Chợ Minh Phụng',
    districtGroup: 'Quận 6',
    adminType: 'phường',
    lat: 10.748,
    lng: 106.641,
    weather: {
      temp: '31°C',
      condition: 'nắng dịu',
      description: 'Phường Hậu Giang, Quận 6 - Độ ẩm 68%, gió 14km/h, vi khí hậu ổn định',
      humidity: '68%',
      altitude: '12 m',
      uvIndex: 'UV 7.0',
      uvLevel: 'Trung bình',
      lightIntensity: '690 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 26,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 85,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 28,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 16,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 68',
        quality: 'Khá tốt',
        progress: 68,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 7.0',
        quality: 'Trung bình',
        progress: 70,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Hậu Giang, Quận 6, khu vực Quận 6',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Hậu Giang, Quận 6',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 82% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 60% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Hậu Giang, Quận 6',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q6-chotap': {
    id: 'hcm-q6-chotap',
    name: 'Phường Cây Gõ, Quận 6',
    subTitle: 'Khu vực bến xe Chợ Lớn & cầu Cây Gõ',
    districtGroup: 'Quận 6',
    adminType: 'phường',
    lat: 10.755,
    lng: 106.648,
    weather: {
      temp: '32°C',
      condition: 'nắng nhẹ',
      description: 'Phường Cây Gõ, Quận 6 - Độ ẩm 69%, gió 8km/h, vi khí hậu ổn định',
      humidity: '69%',
      altitude: '13 m',
      uvIndex: 'UV 7.3',
      uvLevel: 'Cao',
      lightIntensity: '707 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 27,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 86,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 29,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 17,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 69',
        quality: 'Khá tốt',
        progress: 69,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 7.3',
        quality: 'Trung bình',
        progress: 73,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Cây Gõ, Quận 6, khu vực Quận 6',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Cây Gõ, Quận 6',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 83% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 61% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Cây Gõ, Quận 6',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q7-tanthuandong': {
    id: 'hcm-q7-tanthuandong',
    name: 'Phường Tân Thuận Đông, Quận 7',
    subTitle: 'Khu chế xuất Tân Thuận & cảng biển Bến Nghé',
    districtGroup: 'Quận 7',
    adminType: 'phường',
    lat: 10.768,
    lng: 106.732,
    weather: {
      temp: '33°C',
      condition: 'mây rải rác',
      description: 'Phường Tân Thuận Đông, Quận 7 - Độ ẩm 70%, gió 9km/h, vi khí hậu ổn định',
      humidity: '70%',
      altitude: '14 m',
      uvIndex: 'UV 7.6',
      uvLevel: 'Cao',
      lightIntensity: '724 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 28,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 87,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 30,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 18,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 70',
        quality: 'Khá tốt',
        progress: 70,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 7.6',
        quality: 'Trung bình',
        progress: 76,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Tân Thuận Đông, Quận 7, khu vực Quận 7',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Tân Thuận Đông, Quận 7',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 84% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 62% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Tân Thuận Đông, Quận 7',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q7-tanthuantay': {
    id: 'hcm-q7-tanthuantay',
    name: 'Phường Tân Thuận Tây, Quận 7',
    subTitle: 'Đô thị ven sông Sài Gòn & cầu Tân Thuận',
    districtGroup: 'Quận 7',
    adminType: 'phường',
    lat: 10.754,
    lng: 106.721,
    weather: {
      temp: '34°C',
      condition: 'nắng dịu',
      description: 'Phường Tân Thuận Tây, Quận 7 - Độ ẩm 71%, gió 10km/h, vi khí hậu ổn định',
      humidity: '71%',
      altitude: '15 m',
      uvIndex: 'UV 7.9',
      uvLevel: 'Cao',
      lightIntensity: '741 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 29,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 88,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 31,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 19,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 71',
        quality: 'Khá tốt',
        progress: 71,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 7.9',
        quality: 'Trung bình',
        progress: 79,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Tân Thuận Tây, Quận 7, khu vực Quận 7',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Tân Thuận Tây, Quận 7',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 85% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 63% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Tân Thuận Tây, Quận 7',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q7-tankieng': {
    id: 'hcm-q7-tankieng',
    name: 'Phường Tân Kiểng, Quận 7',
    subTitle: 'Khu dân cư hiện đại & trục đường Trần Xuân Soạn',
    districtGroup: 'Quận 7',
    adminType: 'phường',
    lat: 10.7485,
    lng: 106.7115,
    weather: {
      temp: '31°C',
      condition: 'nắng nhẹ',
      description: 'Phường Tân Kiểng, Quận 7 - Độ ẩm 64%, gió 11km/h, vi khí hậu ổn định',
      humidity: '64%',
      altitude: '10 m',
      uvIndex: 'UV 8.2',
      uvLevel: 'Cao',
      lightIntensity: '758 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 18,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 89,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 32,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 12,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 72',
        quality: 'Khá tốt',
        progress: 72,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 8.2',
        quality: 'Trung bình',
        progress: 82,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Tân Kiểng, Quận 7, khu vực Quận 7',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Tân Kiểng, Quận 7',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 86% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 64% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Tân Kiểng, Quận 7',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q7-tanhung': {
    id: 'hcm-q7-tanhung',
    name: 'Phường Tân Hưng, Quận 7',
    subTitle: 'Khu phức hợp Sunrise City & cầu Kênh Tẻ',
    districtGroup: 'Quận 7',
    adminType: 'phường',
    lat: 10.746,
    lng: 106.702,
    weather: {
      temp: '32°C',
      condition: 'mây rải rác',
      description: 'Phường Tân Hưng, Quận 7 - Độ ẩm 65%, gió 12km/h, vi khí hậu ổn định',
      humidity: '65%',
      altitude: '11 m',
      uvIndex: 'UV 8.5',
      uvLevel: 'Cao',
      lightIntensity: '775 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 19,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 65,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 33,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 13,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 73',
        quality: 'Khá tốt',
        progress: 73,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 8.5',
        quality: 'Trung bình',
        progress: 85,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Tân Hưng, Quận 7, khu vực Quận 7',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Tân Hưng, Quận 7',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 87% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 40% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Tân Hưng, Quận 7',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q7-binhthuan': {
    id: 'hcm-q7-binhthuan',
    name: 'Phường Bình Thuận, Quận 7',
    subTitle: 'Nút giao thông Nguyễn Thị Thập - Huỳnh Tấn Phát',
    districtGroup: 'Quận 7',
    adminType: 'phường',
    lat: 10.741,
    lng: 106.725,
    weather: {
      temp: '33°C',
      condition: 'nắng dịu',
      description: 'Phường Bình Thuận, Quận 7 - Độ ẩm 66%, gió 13km/h, vi khí hậu ổn định',
      humidity: '66%',
      altitude: '12 m',
      uvIndex: 'UV 8.8',
      uvLevel: 'Cao',
      lightIntensity: '792 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 20,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 66,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 34,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 14,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 74',
        quality: 'Khá tốt',
        progress: 74,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 8.8',
        quality: 'Trung bình',
        progress: 88,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Bình Thuận, Quận 7, khu vực Quận 7',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Bình Thuận, Quận 7',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 88% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 41% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Bình Thuận, Quận 7',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q7-tanquy': {
    id: 'hcm-q7-tanquy',
    name: 'Phường Tân Quy, Quận 7',
    subTitle: 'Khu thương mại dịch vụ sầm uất Nguyễn Thị Thập',
    districtGroup: 'Quận 7',
    adminType: 'phường',
    lat: 10.7415,
    lng: 106.712,
    weather: {
      temp: '34°C',
      condition: 'nắng nhẹ',
      description: 'Phường Tân Quy, Quận 7 - Độ ẩm 67%, gió 14km/h, vi khí hậu ổn định',
      humidity: '67%',
      altitude: '13 m',
      uvIndex: 'UV 5.1',
      uvLevel: 'Trung bình',
      lightIntensity: '809 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 21,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 67,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 35,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 15,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 75',
        quality: 'Rất tốt',
        progress: 75,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 5.1',
        quality: 'Tốt',
        progress: 51,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Tân Quy, Quận 7, khu vực Quận 7',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Tân Quy, Quận 7',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 89% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 42% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Tân Quy, Quận 7',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q7-phuthuan': {
    id: 'hcm-q7-phuthuan',
    name: 'Phường Phú Thuận, Quận 7',
    subTitle: 'Khu đô thị sinh thái ven sông Mũi Đèn Đỏ',
    districtGroup: 'Quận 7',
    adminType: 'phường',
    lat: 10.73,
    lng: 106.741,
    weather: {
      temp: '31°C',
      condition: 'mây rải rác',
      description: 'Phường Phú Thuận, Quận 7 - Độ ẩm 68%, gió 8km/h, vi khí hậu ổn định',
      humidity: '68%',
      altitude: '14 m',
      uvIndex: 'UV 5.4',
      uvLevel: 'Trung bình',
      lightIntensity: '826 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 22,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 68,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 36,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 16,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 62',
        quality: 'Trung bình',
        progress: 62,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 5.4',
        quality: 'Tốt',
        progress: 54,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Phú Thuận, Quận 7, khu vực Quận 7',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Phú Thuận, Quận 7',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 90% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 43% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Phú Thuận, Quận 7',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q7-tanphu': {
    id: 'hcm-q7-tanphu',
    name: 'Phường Tân Phú, Quận 7',
    subTitle: 'Trung tâm tài chính Quốc tế Phú Mỹ Hưng',
    districtGroup: 'Quận 7',
    adminType: 'phường',
    lat: 10.733,
    lng: 106.722,
    weather: {
      temp: '32°C',
      condition: 'nắng dịu',
      description: 'Phường Tân Phú, Quận 7 - Độ ẩm 69%, gió 9km/h, vi khí hậu ổn định',
      humidity: '69%',
      altitude: '15 m',
      uvIndex: 'UV 5.7',
      uvLevel: 'Trung bình',
      lightIntensity: '843 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 23,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 69,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 37,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 17,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 63',
        quality: 'Trung bình',
        progress: 63,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 5.7',
        quality: 'Trung bình',
        progress: 57,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Tân Phú, Quận 7, khu vực Quận 7',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Tân Phú, Quận 7',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 91% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 44% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Tân Phú, Quận 7',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q7-tanphong': {
    id: 'hcm-q7-tanphong',
    name: 'Phường Tân Phong, Quận 7',
    subTitle: 'Khu đô thị kiểu mẫu Phú Mỹ Hưng & Hồ Bán Nguyệt',
    districtGroup: 'Quận 7',
    adminType: 'phường',
    lat: 10.7285,
    lng: 106.705,
    weather: {
      temp: '33°C',
      condition: 'nắng nhẹ',
      description: 'Phường Tân Phong, Quận 7 - Độ ẩm 70%, gió 10km/h, vi khí hậu ổn định',
      humidity: '70%',
      altitude: '10 m',
      uvIndex: 'UV 6.0',
      uvLevel: 'Trung bình',
      lightIntensity: '610 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 24,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 70,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 28,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 18,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 64',
        quality: 'Trung bình',
        progress: 64,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 6.0',
        quality: 'Trung bình',
        progress: 60,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Tân Phong, Quận 7, khu vực Quận 7',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Tân Phong, Quận 7',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 92% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 45% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Tân Phong, Quận 7',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q7-phumy': {
    id: 'hcm-q7-phumy',
    name: 'Phường Phú Mỹ, Quận 7',
    subTitle: 'Khu dân cư sinh thái xanh ven sông Nhà Bè',
    districtGroup: 'Quận 7',
    adminType: 'phường',
    lat: 10.712,
    lng: 106.732,
    weather: {
      temp: '34°C',
      condition: 'mây rải rác',
      description: 'Phường Phú Mỹ, Quận 7 - Độ ẩm 71%, gió 11km/h, vi khí hậu ổn định',
      humidity: '71%',
      altitude: '11 m',
      uvIndex: 'UV 6.3',
      uvLevel: 'Trung bình',
      lightIntensity: '627 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 25,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 71,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 29,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 19,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 65',
        quality: 'Khá tốt',
        progress: 65,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 6.3',
        quality: 'Trung bình',
        progress: 63,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Phú Mỹ, Quận 7, khu vực Quận 7',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Phú Mỹ, Quận 7',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 93% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 46% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Phú Mỹ, Quận 7',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q8-chanhhung': {
    id: 'hcm-q8-chanhhung',
    name: 'Phường Chánh Hưng, Quận 8',
    subTitle: 'Khu trung tâm hành chính Quận 8',
    districtGroup: 'Quận 8',
    adminType: 'phường',
    lat: 10.742,
    lng: 106.678,
    weather: {
      temp: '31°C',
      condition: 'nắng dịu',
      description: 'Phường Chánh Hưng, Quận 8 - Độ ẩm 64%, gió 12km/h, vi khí hậu ổn định',
      humidity: '64%',
      altitude: '12 m',
      uvIndex: 'UV 6.6',
      uvLevel: 'Trung bình',
      lightIntensity: '644 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 26,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 72,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 30,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 12,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 66',
        quality: 'Khá tốt',
        progress: 66,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 6.6',
        quality: 'Trung bình',
        progress: 66,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Chánh Hưng, Quận 8, khu vực Quận 8',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Chánh Hưng, Quận 8',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 94% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 47% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Chánh Hưng, Quận 8',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q8-rachong': {
    id: 'hcm-q8-rachong',
    name: 'Phường Rạch Ông, Quận 8',
    subTitle: 'Khu vực cầu chữ Y & chợ Rạch Ông',
    districtGroup: 'Quận 8',
    adminType: 'phường',
    lat: 10.748,
    lng: 106.689,
    weather: {
      temp: '32°C',
      condition: 'nắng nhẹ',
      description: 'Phường Rạch Ông, Quận 8 - Độ ẩm 65%, gió 13km/h, vi khí hậu ổn định',
      humidity: '65%',
      altitude: '13 m',
      uvIndex: 'UV 6.9',
      uvLevel: 'Trung bình',
      lightIntensity: '661 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 27,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 73,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 31,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 13,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 67',
        quality: 'Khá tốt',
        progress: 67,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 6.9',
        quality: 'Trung bình',
        progress: 69,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Rạch Ông, Quận 8, khu vực Quận 8',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Rạch Ông, Quận 8',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 95% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 48% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Rạch Ông, Quận 8',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q8-xomcui': {
    id: 'hcm-q8-xomcui',
    name: 'Phường Xóm Củi, Quận 8',
    subTitle: 'Chợ Xóm Củi & ngã ba kênh Tàu Hủ',
    districtGroup: 'Quận 8',
    adminType: 'phường',
    lat: 10.749,
    lng: 106.663,
    weather: {
      temp: '33°C',
      condition: 'mây rải rác',
      description: 'Phường Xóm Củi, Quận 8 - Độ ẩm 66%, gió 14km/h, vi khí hậu ổn định',
      humidity: '66%',
      altitude: '14 m',
      uvIndex: 'UV 7.2',
      uvLevel: 'Cao',
      lightIntensity: '678 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 28,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 74,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 32,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 14,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 68',
        quality: 'Khá tốt',
        progress: 68,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 7.2',
        quality: 'Trung bình',
        progress: 72,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Xóm Củi, Quận 8, khu vực Quận 8',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Xóm Củi, Quận 8',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 96% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 49% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Xóm Củi, Quận 8',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q8-hungphu': {
    id: 'hcm-q8-hungphu',
    name: 'Phường Hưng Phú, Quận 8',
    subTitle: 'Dọc đại lộ Võ Văn Kiệt bờ nam kênh Tàu Hủ',
    districtGroup: 'Quận 8',
    adminType: 'phường',
    lat: 10.7465,
    lng: 106.672,
    weather: {
      temp: '34°C',
      condition: 'nắng dịu',
      description: 'Phường Hưng Phú, Quận 8 - Độ ẩm 67%, gió 8km/h, vi khí hậu ổn định',
      humidity: '67%',
      altitude: '15 m',
      uvIndex: 'UV 7.5',
      uvLevel: 'Cao',
      lightIntensity: '695 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 29,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 75,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 33,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 15,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 69',
        quality: 'Khá tốt',
        progress: 69,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 7.5',
        quality: 'Trung bình',
        progress: 75,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Hưng Phú, Quận 8, khu vực Quận 8',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Hưng Phú, Quận 8',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 97% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 50% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Hưng Phú, Quận 8',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q8-binhdong': {
    id: 'hcm-q8-binhdong',
    name: 'Phường Bình Đông, Quận 8',
    subTitle: 'Bến Bình Đông - Chợ hoa xuân di sản ven sông',
    districtGroup: 'Quận 8',
    adminType: 'phường',
    lat: 10.735,
    lng: 106.645,
    weather: {
      temp: '31°C',
      condition: 'nắng nhẹ',
      description: 'Phường Bình Đông, Quận 8 - Độ ẩm 68%, gió 9km/h, vi khí hậu ổn định',
      humidity: '68%',
      altitude: '10 m',
      uvIndex: 'UV 7.8',
      uvLevel: 'Cao',
      lightIntensity: '712 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 18,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 76,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 34,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 16,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 70',
        quality: 'Khá tốt',
        progress: 70,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 7.8',
        quality: 'Trung bình',
        progress: 78,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Bình Đông, Quận 8, khu vực Quận 8',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Bình Đông, Quận 8',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 80% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 51% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Bình Đông, Quận 8',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q8-phudinh': {
    id: 'hcm-q8-phudinh',
    name: 'Phường Phú Định, Quận 8',
    subTitle: 'Cảng sông Phú Định & đầu mối giao thương miền Tây',
    districtGroup: 'Quận 8',
    adminType: 'phường',
    lat: 10.723,
    lng: 106.631,
    weather: {
      temp: '32°C',
      condition: 'mây rải rác',
      description: 'Phường Phú Định, Quận 8 - Độ ẩm 69%, gió 10km/h, vi khí hậu ổn định',
      humidity: '69%',
      altitude: '11 m',
      uvIndex: 'UV 8.1',
      uvLevel: 'Cao',
      lightIntensity: '729 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 19,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 77,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 35,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 17,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 71',
        quality: 'Khá tốt',
        progress: 71,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 8.1',
        quality: 'Trung bình',
        progress: 81,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Phú Định, Quận 8, khu vực Quận 8',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Phú Định, Quận 8',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 81% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 52% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Phú Định, Quận 8',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q8-rachcat': {
    id: 'hcm-q8-rachcat',
    name: 'Phường Rạch Cát, Quận 8',
    subTitle: 'Khu sinh thái đầm ngập nước & kênh Đôi',
    districtGroup: 'Quận 8',
    adminType: 'phường',
    lat: 10.731,
    lng: 106.638,
    weather: {
      temp: '33°C',
      condition: 'nắng dịu',
      description: 'Phường Rạch Cát, Quận 8 - Độ ẩm 70%, gió 11km/h, vi khí hậu ổn định',
      humidity: '70%',
      altitude: '12 m',
      uvIndex: 'UV 8.4',
      uvLevel: 'Cao',
      lightIntensity: '746 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 20,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 78,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 36,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 18,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 72',
        quality: 'Khá tốt',
        progress: 72,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 8.4',
        quality: 'Trung bình',
        progress: 84,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Rạch Cát, Quận 8, khu vực Quận 8',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Rạch Cát, Quận 8',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 82% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 53% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Rạch Cát, Quận 8',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q8-baphun': {
    id: 'hcm-q8-baphun',
    name: 'Phường Ba Tơ, Quận 8',
    subTitle: 'Khu dân cư mới Nam Hòa Hưng & đại lộ Nguyễn Văn Linh',
    districtGroup: 'Quận 8',
    adminType: 'phường',
    lat: 10.718,
    lng: 106.649,
    weather: {
      temp: '34°C',
      condition: 'nắng nhẹ',
      description: 'Phường Ba Tơ, Quận 8 - Độ ẩm 71%, gió 12km/h, vi khí hậu ổn định',
      humidity: '71%',
      altitude: '13 m',
      uvIndex: 'UV 8.7',
      uvLevel: 'Cao',
      lightIntensity: '763 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 21,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 79,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 37,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 19,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 73',
        quality: 'Khá tốt',
        progress: 73,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 8.7',
        quality: 'Trung bình',
        progress: 87,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Ba Tơ, Quận 8, khu vực Quận 8',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Ba Tơ, Quận 8',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 83% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 54% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Ba Tơ, Quận 8',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q10-chiha': {
    id: 'hcm-q10-chiha',
    name: 'Phường Chí Hòa, Quận 10',
    subTitle: 'Khu vực Công viên Lê Thị Riêng & ngã sáu Dân Chủ',
    districtGroup: 'Quận 10',
    adminType: 'phường',
    lat: 10.781,
    lng: 106.668,
    weather: {
      temp: '31°C',
      condition: 'mây rải rác',
      description: 'Phường Chí Hòa, Quận 10 - Độ ẩm 64%, gió 13km/h, vi khí hậu ổn định',
      humidity: '64%',
      altitude: '14 m',
      uvIndex: 'UV 5.0',
      uvLevel: 'Thấp',
      lightIntensity: '780 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 22,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 80,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 28,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 12,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 74',
        quality: 'Khá tốt',
        progress: 74,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 5.0',
        quality: 'Tốt',
        progress: 50,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 88,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Chí Hòa, Quận 10, khu vực Quận 10',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Chí Hòa, Quận 10',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Rất thấp',
        percent: 25,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 84% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 55% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Chí Hòa, Quận 10',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q10-vuonlai': {
    id: 'hcm-q10-vuonlai',
    name: 'Phường Vườn Lài, Quận 10',
    subTitle: 'Khu thương mại ẩm thực Sư Vạn Hạnh',
    districtGroup: 'Quận 10',
    adminType: 'phường',
    lat: 10.771,
    lng: 106.671,
    weather: {
      temp: '32°C',
      condition: 'nắng dịu',
      description: 'Phường Vườn Lài, Quận 10 - Độ ẩm 65%, gió 14km/h, vi khí hậu ổn định',
      humidity: '65%',
      altitude: '15 m',
      uvIndex: 'UV 5.3',
      uvLevel: 'Trung bình',
      lightIntensity: '797 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 23,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 81,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 29,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 13,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 75',
        quality: 'Rất tốt',
        progress: 75,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 5.3',
        quality: 'Tốt',
        progress: 53,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 88,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Vườn Lài, Quận 10, khu vực Quận 10',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Vườn Lài, Quận 10',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Rất thấp',
        percent: 25,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 85% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 56% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Vườn Lài, Quận 10',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q10-dienhong': {
    id: 'hcm-q10-dienhong',
    name: 'Phường Diên Hồng, Quận 10',
    subTitle: 'Khu dân cư văn hóa & các trường đại học lớn',
    districtGroup: 'Quận 10',
    adminType: 'phường',
    lat: 10.765,
    lng: 106.666,
    weather: {
      temp: '33°C',
      condition: 'nắng nhẹ',
      description: 'Phường Diên Hồng, Quận 10 - Độ ẩm 66%, gió 8km/h, vi khí hậu ổn định',
      humidity: '66%',
      altitude: '10 m',
      uvIndex: 'UV 5.6',
      uvLevel: 'Trung bình',
      lightIntensity: '814 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 24,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 82,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 30,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 14,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 62',
        quality: 'Trung bình',
        progress: 62,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 5.6',
        quality: 'Trung bình',
        progress: 56,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 88,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Diên Hồng, Quận 10, khu vực Quận 10',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Diên Hồng, Quận 10',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Rất thấp',
        percent: 25,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 86% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 57% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Diên Hồng, Quận 10',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q10-nhattao': {
    id: 'hcm-q10-nhattao',
    name: 'Phường Nhật Tảo, Quận 10',
    subTitle: 'Chợ linh kiện điện tử Nhật Tảo & BV Chợ Rẫy',
    districtGroup: 'Quận 10',
    adminType: 'phường',
    lat: 10.7595,
    lng: 106.662,
    weather: {
      temp: '34°C',
      condition: 'mây rải rác',
      description: 'Phường Nhật Tảo, Quận 10 - Độ ẩm 67%, gió 9km/h, vi khí hậu ổn định',
      humidity: '67%',
      altitude: '11 m',
      uvIndex: 'UV 5.9',
      uvLevel: 'Trung bình',
      lightIntensity: '831 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 25,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 83,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 31,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 15,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 63',
        quality: 'Trung bình',
        progress: 63,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 5.9',
        quality: 'Trung bình',
        progress: 59,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 88,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Nhật Tảo, Quận 10, khu vực Quận 10',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Nhật Tảo, Quận 10',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Rất thấp',
        percent: 25,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 87% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 58% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Nhật Tảo, Quận 10',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q10-dongdo': {
    id: 'hcm-q10-dongdo',
    name: 'Phường Đông Đô, Quận 10',
    subTitle: 'Khu dân cư Thành Thái & Viện Tim TP.HCM',
    districtGroup: 'Quận 10',
    adminType: 'phường',
    lat: 10.774,
    lng: 106.661,
    weather: {
      temp: '31°C',
      condition: 'nắng dịu',
      description: 'Phường Đông Đô, Quận 10 - Độ ẩm 68%, gió 10km/h, vi khí hậu ổn định',
      humidity: '68%',
      altitude: '12 m',
      uvIndex: 'UV 6.2',
      uvLevel: 'Trung bình',
      lightIntensity: '848 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 26,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 84,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 32,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 16,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 64',
        quality: 'Trung bình',
        progress: 64,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 6.2',
        quality: 'Trung bình',
        progress: 62,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 88,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Đông Đô, Quận 10, khu vực Quận 10',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Đông Đô, Quận 10',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Rất thấp',
        percent: 25,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 88% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 59% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Đông Đô, Quận 10',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q10-baclan': {
    id: 'hcm-q10-baclan',
    name: 'Phường Bắc Hải, Quận 10',
    subTitle: 'Khu biệt thự cư xá Bắc Hải cây xanh rợp bóng',
    districtGroup: 'Quận 10',
    adminType: 'phường',
    lat: 10.782,
    lng: 106.659,
    weather: {
      temp: '32°C',
      condition: 'nắng nhẹ',
      description: 'Phường Bắc Hải, Quận 10 - Độ ẩm 69%, gió 11km/h, vi khí hậu ổn định',
      humidity: '69%',
      altitude: '13 m',
      uvIndex: 'UV 6.5',
      uvLevel: 'Trung bình',
      lightIntensity: '615 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 27,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 85,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 33,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 17,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 65',
        quality: 'Khá tốt',
        progress: 65,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 6.5',
        quality: 'Trung bình',
        progress: 65,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 88,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Bắc Hải, Quận 10, khu vực Quận 10',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Bắc Hải, Quận 10',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Rất thấp',
        percent: 25,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 89% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 60% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Bắc Hải, Quận 10',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q10-lythuongkiet': {
    id: 'hcm-q10-lythuongkiet',
    name: 'Phường Lý Thường Kiệt, Quận 10',
    subTitle: 'Trục Lý Thường Kiệt đối diện SVĐ Thống Nhất',
    districtGroup: 'Quận 10',
    adminType: 'phường',
    lat: 10.762,
    lng: 106.658,
    weather: {
      temp: '33°C',
      condition: 'mây rải rác',
      description: 'Phường Lý Thường Kiệt, Quận 10 - Độ ẩm 70%, gió 12km/h, vi khí hậu ổn định',
      humidity: '70%',
      altitude: '14 m',
      uvIndex: 'UV 6.8',
      uvLevel: 'Trung bình',
      lightIntensity: '632 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 28,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 86,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 34,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 18,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 66',
        quality: 'Khá tốt',
        progress: 66,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 6.8',
        quality: 'Trung bình',
        progress: 68,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 88,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Lý Thường Kiệt, Quận 10, khu vực Quận 10',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Lý Thường Kiệt, Quận 10',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Rất thấp',
        percent: 25,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 90% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 61% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Lý Thường Kiệt, Quận 10',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q11-minhphung': {
    id: 'hcm-q11-minhphung',
    name: 'Phường Minh Phụng, Quận 11',
    subTitle: 'Trục đường Minh Phụng & Chợ Bình Thới',
    districtGroup: 'Quận 11',
    adminType: 'phường',
    lat: 10.762,
    lng: 106.648,
    weather: {
      temp: '34°C',
      condition: 'nắng dịu',
      description: 'Phường Minh Phụng, Quận 11 - Độ ẩm 71%, gió 13km/h, vi khí hậu ổn định',
      humidity: '71%',
      altitude: '15 m',
      uvIndex: 'UV 7.1',
      uvLevel: 'Cao',
      lightIntensity: '649 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 29,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 87,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 35,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 19,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 67',
        quality: 'Khá tốt',
        progress: 67,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 7.1',
        quality: 'Trung bình',
        progress: 71,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Minh Phụng, Quận 11, khu vực Quận 11',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Minh Phụng, Quận 11',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 91% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 62% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Minh Phụng, Quận 11',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q11-binhthoi': {
    id: 'hcm-q11-binhthoi',
    name: 'Phường Bình Thới, Quận 11',
    subTitle: 'Khu trung tâm hành chính Quận 11',
    districtGroup: 'Quận 11',
    adminType: 'phường',
    lat: 10.769,
    lng: 106.652,
    weather: {
      temp: '31°C',
      condition: 'nắng nhẹ',
      description: 'Phường Bình Thới, Quận 11 - Độ ẩm 64%, gió 14km/h, vi khí hậu ổn định',
      humidity: '64%',
      altitude: '10 m',
      uvIndex: 'UV 7.4',
      uvLevel: 'Cao',
      lightIntensity: '666 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 18,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 88,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 36,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 12,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 68',
        quality: 'Khá tốt',
        progress: 68,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 7.4',
        quality: 'Trung bình',
        progress: 74,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Bình Thới, Quận 11, khu vực Quận 11',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Bình Thới, Quận 11',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 92% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 63% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Bình Thới, Quận 11',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q11-hoabinh': {
    id: 'hcm-q11-hoabinh',
    name: 'Phường Hòa Bình, Quận 11',
    subTitle: 'Công viên văn hóa Đầm Sen & hồ điều hòa',
    districtGroup: 'Quận 11',
    adminType: 'phường',
    lat: 10.772,
    lng: 106.643,
    weather: {
      temp: '32°C',
      condition: 'mây rải rác',
      description: 'Phường Hòa Bình, Quận 11 - Độ ẩm 65%, gió 8km/h, vi khí hậu ổn định',
      humidity: '65%',
      altitude: '11 m',
      uvIndex: 'UV 7.7',
      uvLevel: 'Cao',
      lightIntensity: '683 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 19,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 89,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 37,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 13,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 69',
        quality: 'Khá tốt',
        progress: 69,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 7.7',
        quality: 'Trung bình',
        progress: 77,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Hòa Bình, Quận 11, khu vực Quận 11',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Hòa Bình, Quận 11',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 93% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 64% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Hòa Bình, Quận 11',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q11-phutho': {
    id: 'hcm-q11-phutho',
    name: 'Phường Phú Thọ, Quận 11',
    subTitle: 'Khu thể thao Phú Thọ & ĐH Bách Khoa TP.HCM',
    districtGroup: 'Quận 11',
    adminType: 'phường',
    lat: 10.7655,
    lng: 106.659,
    weather: {
      temp: '33°C',
      condition: 'nắng dịu',
      description: 'Phường Phú Thọ, Quận 11 - Độ ẩm 66%, gió 9km/h, vi khí hậu ổn định',
      humidity: '66%',
      altitude: '12 m',
      uvIndex: 'UV 8.0',
      uvLevel: 'Cao',
      lightIntensity: '700 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 20,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 65,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 28,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 14,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 70',
        quality: 'Khá tốt',
        progress: 70,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 8.0',
        quality: 'Trung bình',
        progress: 80,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Phú Thọ, Quận 11, khu vực Quận 11',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Phú Thọ, Quận 11',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 94% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 40% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Phú Thọ, Quận 11',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q12-thoian': {
    id: 'hcm-q12-thoian',
    name: 'Phường Thới An, Quận 12',
    subTitle: 'Trung tâm hành chính Quận 12 & Quốc lộ 1A',
    districtGroup: 'Quận 12',
    adminType: 'phường',
    lat: 10.865,
    lng: 106.659,
    weather: {
      temp: '34°C',
      condition: 'nắng nhẹ',
      description: 'Phường Thới An, Quận 12 - Độ ẩm 67%, gió 10km/h, vi khí hậu ổn định',
      humidity: '67%',
      altitude: '13 m',
      uvIndex: 'UV 8.3',
      uvLevel: 'Cao',
      lightIntensity: '717 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 21,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 66,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 29,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 15,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 71',
        quality: 'Khá tốt',
        progress: 71,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 8.3',
        quality: 'Trung bình',
        progress: 83,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Thới An, Quận 12, khu vực Quận 12',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Thới An, Quận 12',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 95% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 41% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Thới An, Quận 12',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q12-anphudong': {
    id: 'hcm-q12-anphudong',
    name: 'Phường An Phú Đông, Quận 12',
    subTitle: 'Bán đảo sinh thái vườn cây trái sông Sài Gòn',
    districtGroup: 'Quận 12',
    adminType: 'phường',
    lat: 10.86,
    lng: 106.702,
    weather: {
      temp: '31°C',
      condition: 'mây rải rác',
      description: 'Phường An Phú Đông, Quận 12 - Độ ẩm 68%, gió 11km/h, vi khí hậu ổn định',
      humidity: '68%',
      altitude: '14 m',
      uvIndex: 'UV 8.6',
      uvLevel: 'Cao',
      lightIntensity: '734 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 22,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 67,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 30,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 16,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 72',
        quality: 'Khá tốt',
        progress: 72,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 8.6',
        quality: 'Trung bình',
        progress: 86,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường An Phú Đông, Quận 12, khu vực Quận 12',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường An Phú Đông, Quận 12',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 96% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 42% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường An Phú Đông, Quận 12',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q12-hiepthanh': {
    id: 'hcm-q12-hiepthanh',
    name: 'Phường Hiệp Thành, Quận 12',
    subTitle: 'Khu dân cư Hiệp Thành City & hồ sinh thái',
    districtGroup: 'Quận 12',
    adminType: 'phường',
    lat: 10.875,
    lng: 106.643,
    weather: {
      temp: '32°C',
      condition: 'nắng dịu',
      description: 'Phường Hiệp Thành, Quận 12 - Độ ẩm 69%, gió 12km/h, vi khí hậu ổn định',
      humidity: '69%',
      altitude: '15 m',
      uvIndex: 'UV 8.9',
      uvLevel: 'Cao',
      lightIntensity: '751 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 23,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 68,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 31,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 17,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 73',
        quality: 'Khá tốt',
        progress: 73,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 8.9',
        quality: 'Trung bình',
        progress: 89,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Hiệp Thành, Quận 12, khu vực Quận 12',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Hiệp Thành, Quận 12',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 97% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 43% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Hiệp Thành, Quận 12',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q12-tanchanhhiep': {
    id: 'hcm-q12-tanchanhhiep',
    name: 'Phường Tân Chánh Hiệp, Quận 12',
    subTitle: 'Công viên phần mềm Quang Trung (QTSC)',
    districtGroup: 'Quận 12',
    adminType: 'phường',
    lat: 10.858,
    lng: 106.628,
    weather: {
      temp: '33°C',
      condition: 'nắng nhẹ',
      description: 'Phường Tân Chánh Hiệp, Quận 12 - Độ ẩm 70%, gió 13km/h, vi khí hậu ổn định',
      humidity: '70%',
      altitude: '10 m',
      uvIndex: 'UV 5.2',
      uvLevel: 'Trung bình',
      lightIntensity: '768 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 24,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 69,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 32,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 18,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 74',
        quality: 'Khá tốt',
        progress: 74,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 5.2',
        quality: 'Tốt',
        progress: 52,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Tân Chánh Hiệp, Quận 12, khu vực Quận 12',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Tân Chánh Hiệp, Quận 12',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 80% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 44% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Tân Chánh Hiệp, Quận 12',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q12-tanhungthuan': {
    id: 'hcm-q12-tanhungthuan',
    name: 'Phường Tân Hưng Thuận, Quận 12',
    subTitle: 'Khu đô thị ngã tư An Sương kết nối Tây Ninh',
    districtGroup: 'Quận 12',
    adminType: 'phường',
    lat: 10.842,
    lng: 106.621,
    weather: {
      temp: '34°C',
      condition: 'mây rải rác',
      description: 'Phường Tân Hưng Thuận, Quận 12 - Độ ẩm 71%, gió 14km/h, vi khí hậu ổn định',
      humidity: '71%',
      altitude: '11 m',
      uvIndex: 'UV 5.5',
      uvLevel: 'Trung bình',
      lightIntensity: '785 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 25,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 70,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 33,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 19,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 75',
        quality: 'Rất tốt',
        progress: 75,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 5.5',
        quality: 'Tốt',
        progress: 55,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Tân Hưng Thuận, Quận 12, khu vực Quận 12',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Tân Hưng Thuận, Quận 12',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 81% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 45% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Tân Hưng Thuận, Quận 12',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q12-tanthoihiep': {
    id: 'hcm-q12-tanthoihiep',
    name: 'Phường Tân Thới Hiệp, Quận 12',
    subTitle: 'Khu công nghiệp Tân Thới Hiệp kiểu mẫu',
    districtGroup: 'Quận 12',
    adminType: 'phường',
    lat: 10.859,
    lng: 106.641,
    weather: {
      temp: '31°C',
      condition: 'nắng dịu',
      description: 'Phường Tân Thới Hiệp, Quận 12 - Độ ẩm 64%, gió 8km/h, vi khí hậu ổn định',
      humidity: '64%',
      altitude: '12 m',
      uvIndex: 'UV 5.8',
      uvLevel: 'Trung bình',
      lightIntensity: '802 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 26,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 71,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 34,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 12,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 62',
        quality: 'Trung bình',
        progress: 62,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 5.8',
        quality: 'Trung bình',
        progress: 58,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Tân Thới Hiệp, Quận 12, khu vực Quận 12',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Tân Thới Hiệp, Quận 12',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 82% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 46% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Tân Thới Hiệp, Quận 12',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q12-tanthoinhat': {
    id: 'hcm-q12-tanthoinhat',
    name: 'Phường Tân Thới Nhất, Quận 12',
    subTitle: 'Ga đầu mối Metro số 2 Tham Lương',
    districtGroup: 'Quận 12',
    adminType: 'phường',
    lat: 10.835,
    lng: 106.615,
    weather: {
      temp: '32°C',
      condition: 'nắng nhẹ',
      description: 'Phường Tân Thới Nhất, Quận 12 - Độ ẩm 65%, gió 9km/h, vi khí hậu ổn định',
      humidity: '65%',
      altitude: '13 m',
      uvIndex: 'UV 6.1',
      uvLevel: 'Trung bình',
      lightIntensity: '819 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 27,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 72,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 35,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 13,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 63',
        quality: 'Trung bình',
        progress: 63,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 6.1',
        quality: 'Trung bình',
        progress: 61,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Tân Thới Nhất, Quận 12, khu vực Quận 12',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Tân Thới Nhất, Quận 12',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 83% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 47% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Tân Thới Nhất, Quận 12',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q12-thanhloc': {
    id: 'hcm-q12-thanhloc',
    name: 'Phường Thạnh Lộc, Quận 12',
    subTitle: 'Vùng nông nghiệp sinh thái ven sông Sài Gòn',
    districtGroup: 'Quận 12',
    adminType: 'phường',
    lat: 10.875,
    lng: 106.685,
    weather: {
      temp: '33°C',
      condition: 'mây rải rác',
      description: 'Phường Thạnh Lộc, Quận 12 - Độ ẩm 66%, gió 10km/h, vi khí hậu ổn định',
      humidity: '66%',
      altitude: '14 m',
      uvIndex: 'UV 6.4',
      uvLevel: 'Trung bình',
      lightIntensity: '836 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 28,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 73,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 36,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 14,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 64',
        quality: 'Trung bình',
        progress: 64,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 6.4',
        quality: 'Trung bình',
        progress: 64,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Thạnh Lộc, Quận 12, khu vực Quận 12',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Thạnh Lộc, Quận 12',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 84% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 48% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Thạnh Lộc, Quận 12',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q12-thanhxuan': {
    id: 'hcm-q12-thanhxuan',
    name: 'Phường Thạnh Xuân, Quận 12',
    subTitle: 'Vùng trũng sinh thái & kênh thủy lợi điều tiết lũ',
    districtGroup: 'Quận 12',
    adminType: 'phường',
    lat: 10.885,
    lng: 106.671,
    weather: {
      temp: '34°C',
      condition: 'nắng dịu',
      description: 'Phường Thạnh Xuân, Quận 12 - Độ ẩm 67%, gió 11km/h, vi khí hậu ổn định',
      humidity: '67%',
      altitude: '15 m',
      uvIndex: 'UV 6.7',
      uvLevel: 'Trung bình',
      lightIntensity: '603 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 29,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 74,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 37,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 15,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 65',
        quality: 'Khá tốt',
        progress: 65,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 6.7',
        quality: 'Trung bình',
        progress: 67,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Thạnh Xuân, Quận 12, khu vực Quận 12',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Thạnh Xuân, Quận 12',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 85% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 49% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Thạnh Xuân, Quận 12',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q12-trungmytay': {
    id: 'hcm-q12-trungmytay',
    name: 'Phường Trung Mỹ Tây, Quận 12',
    subTitle: 'Bến xe An Sương & trung tâm vận tải hành khách',
    districtGroup: 'Quận 12',
    adminType: 'phường',
    lat: 10.852,
    lng: 106.612,
    weather: {
      temp: '31°C',
      condition: 'nắng nhẹ',
      description: 'Phường Trung Mỹ Tây, Quận 12 - Độ ẩm 68%, gió 12km/h, vi khí hậu ổn định',
      humidity: '68%',
      altitude: '10 m',
      uvIndex: 'UV 7.0',
      uvLevel: 'Trung bình',
      lightIntensity: '620 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 18,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 75,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 28,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 16,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 66',
        quality: 'Khá tốt',
        progress: 66,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 7.0',
        quality: 'Trung bình',
        progress: 70,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Trung Mỹ Tây, Quận 12, khu vực Quận 12',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Trung Mỹ Tây, Quận 12',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 86% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 50% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Trung Mỹ Tây, Quận 12',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-q12-donghungthuan': {
    id: 'hcm-q12-donghungthuan',
    name: 'Phường Đông Hưng Thuận, Quận 12',
    subTitle: 'Khu công nghiệp đô thị sinh thái mới',
    districtGroup: 'Quận 12',
    adminType: 'phường',
    lat: 10.839,
    lng: 106.628,
    weather: {
      temp: '32°C',
      condition: 'mây rải rác',
      description: 'Phường Đông Hưng Thuận, Quận 12 - Độ ẩm 69%, gió 13km/h, vi khí hậu ổn định',
      humidity: '69%',
      altitude: '11 m',
      uvIndex: 'UV 7.3',
      uvLevel: 'Cao',
      lightIntensity: '637 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 19,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 76,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 29,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 17,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 67',
        quality: 'Khá tốt',
        progress: 67,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 7.3',
        quality: 'Trung bình',
        progress: 73,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Đông Hưng Thuận, Quận 12, khu vực Quận 12',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Đông Hưng Thuận, Quận 12',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 87% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 51% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Đông Hưng Thuận, Quận 12',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-bt-giadinh': {
    id: 'hcm-bt-giadinh',
    name: 'Phường Gia Định, Bình Thạnh',
    subTitle: 'Lăng Tả quân Lê Văn Duyệt & Chợ Bà Chiểu',
    districtGroup: 'Bình Thạnh',
    adminType: 'phường',
    lat: 10.802,
    lng: 106.695,
    weather: {
      temp: '33°C',
      condition: 'nắng dịu',
      description: 'Phường Gia Định, Bình Thạnh - Độ ẩm 70%, gió 14km/h, vi khí hậu ổn định',
      humidity: '70%',
      altitude: '12 m',
      uvIndex: 'UV 7.6',
      uvLevel: 'Cao',
      lightIntensity: '654 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 20,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 77,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 30,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 18,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 68',
        quality: 'Khá tốt',
        progress: 68,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 7.6',
        quality: 'Trung bình',
        progress: 76,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Gia Định, Bình Thạnh, khu vực Bình Thạnh',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Gia Định, Bình Thạnh',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 88% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 52% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Gia Định, Bình Thạnh',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-bt-binhthanh': {
    id: 'hcm-bt-binhthanh',
    name: 'Phường Bình Thạnh, Bình Thạnh',
    subTitle: 'Trung tâm hành chính quận & đường Nơ Trang Long',
    districtGroup: 'Bình Thạnh',
    adminType: 'phường',
    lat: 10.801,
    lng: 106.702,
    weather: {
      temp: '34°C',
      condition: 'nắng nhẹ',
      description: 'Phường Bình Thạnh, Bình Thạnh - Độ ẩm 71%, gió 8km/h, vi khí hậu ổn định',
      humidity: '71%',
      altitude: '13 m',
      uvIndex: 'UV 7.9',
      uvLevel: 'Cao',
      lightIntensity: '671 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 21,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 78,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 31,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 19,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 69',
        quality: 'Khá tốt',
        progress: 69,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 7.9',
        quality: 'Trung bình',
        progress: 79,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Bình Thạnh, Bình Thạnh, khu vực Bình Thạnh',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Bình Thạnh, Bình Thạnh',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 89% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 53% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Bình Thạnh, Bình Thạnh',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-bt-binhloitrung': {
    id: 'hcm-bt-binhloitrung',
    name: 'Phường Bình Lợi Trung, Bình Thạnh',
    subTitle: 'Khu dân cư đường Phạm Văn Đồng & cầu Bình Lợi',
    districtGroup: 'Bình Thạnh',
    adminType: 'phường',
    lat: 10.821,
    lng: 106.708,
    weather: {
      temp: '31°C',
      condition: 'mây rải rác',
      description: 'Phường Bình Lợi Trung, Bình Thạnh - Độ ẩm 64%, gió 9km/h, vi khí hậu ổn định',
      humidity: '64%',
      altitude: '14 m',
      uvIndex: 'UV 8.2',
      uvLevel: 'Cao',
      lightIntensity: '688 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 22,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 79,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 32,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 12,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 70',
        quality: 'Khá tốt',
        progress: 70,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 8.2',
        quality: 'Trung bình',
        progress: 82,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Bình Lợi Trung, Bình Thạnh, khu vực Bình Thạnh',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Bình Lợi Trung, Bình Thạnh',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 90% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 54% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Bình Lợi Trung, Bình Thạnh',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-bt-thanhmyday': {
    id: 'hcm-bt-thanhmyday',
    name: 'Phường Thạnh Mỹ Tây, Bình Thạnh',
    subTitle: 'Landmark 81 & Công viên Vinhomes Central Park',
    districtGroup: 'Bình Thạnh',
    adminType: 'phường',
    lat: 10.793,
    lng: 106.721,
    weather: {
      temp: '32°C',
      condition: 'nắng dịu',
      description: 'Phường Thạnh Mỹ Tây, Bình Thạnh - Độ ẩm 65%, gió 10km/h, vi khí hậu ổn định',
      humidity: '65%',
      altitude: '15 m',
      uvIndex: 'UV 8.5',
      uvLevel: 'Cao',
      lightIntensity: '705 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 23,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 80,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 33,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 13,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 71',
        quality: 'Khá tốt',
        progress: 71,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 8.5',
        quality: 'Trung bình',
        progress: 85,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Thạnh Mỹ Tây, Bình Thạnh, khu vực Bình Thạnh',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Thạnh Mỹ Tây, Bình Thạnh',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 91% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 55% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Thạnh Mỹ Tây, Bình Thạnh',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-bt-binhquoi': {
    id: 'hcm-bt-binhquoi',
    name: 'Phường Bình Quới, Bình Thạnh',
    subTitle: 'Bán đảo sinh thái du lịch sinh thái Thanh Đa - Bình Quới',
    districtGroup: 'Bình Thạnh',
    adminType: 'phường',
    lat: 10.835,
    lng: 106.732,
    weather: {
      temp: '33°C',
      condition: 'nắng nhẹ',
      description: 'Phường Bình Quới, Bình Thạnh - Độ ẩm 66%, gió 11km/h, vi khí hậu ổn định',
      humidity: '66%',
      altitude: '10 m',
      uvIndex: 'UV 8.8',
      uvLevel: 'Cao',
      lightIntensity: '722 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 24,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 81,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 34,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 14,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 72',
        quality: 'Khá tốt',
        progress: 72,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 8.8',
        quality: 'Trung bình',
        progress: 88,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Bình Quới, Bình Thạnh, khu vực Bình Thạnh',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Bình Quới, Bình Thạnh',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 92% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 56% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Bình Quới, Bình Thạnh',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-gv-hanhthong': {
    id: 'hcm-gv-hanhthong',
    name: 'Phường Hạnh Thông, Gò Vấp',
    subTitle: 'Nhà thờ cổ Hạnh Thông Tây & Chợ đêm',
    districtGroup: 'Gò Vấp',
    adminType: 'phường',
    lat: 10.829,
    lng: 106.678,
    weather: {
      temp: '34°C',
      condition: 'mây rải rác',
      description: 'Phường Hạnh Thông, Gò Vấp - Độ ẩm 67%, gió 12km/h, vi khí hậu ổn định',
      humidity: '67%',
      altitude: '11 m',
      uvIndex: 'UV 5.1',
      uvLevel: 'Trung bình',
      lightIntensity: '739 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 25,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 82,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 35,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 15,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 73',
        quality: 'Khá tốt',
        progress: 73,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 5.1',
        quality: 'Tốt',
        progress: 51,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Hạnh Thông, Gò Vấp, khu vực Gò Vấp',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Hạnh Thông, Gò Vấp',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 93% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 57% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Hạnh Thông, Gò Vấp',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-gv-anhoitay': {
    id: 'hcm-gv-anhoitay',
    name: 'Phường An Hội Tây, Gò Vấp',
    subTitle: 'Khu dân cư Phạm Văn Chiêu & bờ kênh',
    districtGroup: 'Gò Vấp',
    adminType: 'phường',
    lat: 10.849,
    lng: 106.649,
    weather: {
      temp: '31°C',
      condition: 'nắng dịu',
      description: 'Phường An Hội Tây, Gò Vấp - Độ ẩm 68%, gió 13km/h, vi khí hậu ổn định',
      humidity: '68%',
      altitude: '12 m',
      uvIndex: 'UV 5.4',
      uvLevel: 'Trung bình',
      lightIntensity: '756 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 26,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 83,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 36,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 16,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 74',
        quality: 'Khá tốt',
        progress: 74,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 5.4',
        quality: 'Tốt',
        progress: 54,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường An Hội Tây, Gò Vấp, khu vực Gò Vấp',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường An Hội Tây, Gò Vấp',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 94% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 58% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường An Hội Tây, Gò Vấp',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-gv-anhoidong': {
    id: 'hcm-gv-anhoidong',
    name: 'Phường An Hội Đông, Gò Vấp',
    subTitle: 'Khu dân cư Lê Đức Thọ & công viên sinh thái',
    districtGroup: 'Gò Vấp',
    adminType: 'phường',
    lat: 10.851,
    lng: 106.662,
    weather: {
      temp: '32°C',
      condition: 'nắng nhẹ',
      description: 'Phường An Hội Đông, Gò Vấp - Độ ẩm 69%, gió 14km/h, vi khí hậu ổn định',
      humidity: '69%',
      altitude: '13 m',
      uvIndex: 'UV 5.7',
      uvLevel: 'Trung bình',
      lightIntensity: '773 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 27,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 84,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 37,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 17,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 75',
        quality: 'Rất tốt',
        progress: 75,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 5.7',
        quality: 'Trung bình',
        progress: 57,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường An Hội Đông, Gò Vấp, khu vực Gò Vấp',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường An Hội Đông, Gò Vấp',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 95% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 59% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường An Hội Đông, Gò Vấp',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-gv-ducnhuan': {
    id: 'hcm-gv-ducnhuan',
    name: 'Phường Đức Nhuận, Gò Vấp',
    subTitle: 'Trục Nguyễn Kiệm & cầu vượt Nguyễn Oanh',
    districtGroup: 'Gò Vấp',
    adminType: 'phường',
    lat: 10.838,
    lng: 106.685,
    weather: {
      temp: '33°C',
      condition: 'mây rải rác',
      description: 'Phường Đức Nhuận, Gò Vấp - Độ ẩm 70%, gió 8km/h, vi khí hậu ổn định',
      humidity: '70%',
      altitude: '14 m',
      uvIndex: 'UV 6.0',
      uvLevel: 'Trung bình',
      lightIntensity: '790 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 28,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 85,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 28,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 18,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 62',
        quality: 'Trung bình',
        progress: 62,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 6.0',
        quality: 'Trung bình',
        progress: 60,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Đức Nhuận, Gò Vấp, khu vực Gò Vấp',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Đức Nhuận, Gò Vấp',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 96% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 60% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Đức Nhuận, Gò Vấp',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-gv-annhon': {
    id: 'hcm-gv-annhon',
    name: 'Phường An Nhơn, Gò Vấp',
    subTitle: 'Khu vực Chùa Kỳ Quang 2 & rạch Bến Cát',
    districtGroup: 'Gò Vấp',
    adminType: 'phường',
    lat: 10.845,
    lng: 106.679,
    weather: {
      temp: '34°C',
      condition: 'nắng dịu',
      description: 'Phường An Nhơn, Gò Vấp - Độ ẩm 71%, gió 9km/h, vi khí hậu ổn định',
      humidity: '71%',
      altitude: '15 m',
      uvIndex: 'UV 6.3',
      uvLevel: 'Trung bình',
      lightIntensity: '807 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 29,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 86,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 29,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 19,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 63',
        quality: 'Trung bình',
        progress: 63,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 6.3',
        quality: 'Trung bình',
        progress: 63,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường An Nhơn, Gò Vấp, khu vực Gò Vấp',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường An Nhơn, Gò Vấp',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 97% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 61% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường An Nhơn, Gò Vấp',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-gv-govap': {
    id: 'hcm-gv-govap',
    name: 'Phường Gò Vấp, Gò Vấp',
    subTitle: 'Trung tâm hành chính quận & Công viên Gia Định',
    districtGroup: 'Gò Vấp',
    adminType: 'phường',
    lat: 10.835,
    lng: 106.669,
    weather: {
      temp: '31°C',
      condition: 'nắng nhẹ',
      description: 'Phường Gò Vấp, Gò Vấp - Độ ẩm 64%, gió 10km/h, vi khí hậu ổn định',
      humidity: '64%',
      altitude: '10 m',
      uvIndex: 'UV 6.6',
      uvLevel: 'Trung bình',
      lightIntensity: '824 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 18,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 87,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 30,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 12,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 64',
        quality: 'Trung bình',
        progress: 64,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 6.6',
        quality: 'Trung bình',
        progress: 66,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Gò Vấp, Gò Vấp, khu vực Gò Vấp',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Gò Vấp, Gò Vấp',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 80% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 62% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Gò Vấp, Gò Vấp',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-pn-caukieu': {
    id: 'hcm-pn-caukieu',
    name: 'Phường Cầu Kiệu, Phú Nhuận',
    subTitle: 'Chợ Phú Nhuận & cầu Kiệu kết nối Quận 1',
    districtGroup: 'Phú Nhuận',
    adminType: 'phường',
    lat: 10.795,
    lng: 106.684,
    weather: {
      temp: '32°C',
      condition: 'mây rải rác',
      description: 'Phường Cầu Kiệu, Phú Nhuận - Độ ẩm 65%, gió 11km/h, vi khí hậu ổn định',
      humidity: '65%',
      altitude: '11 m',
      uvIndex: 'UV 6.9',
      uvLevel: 'Trung bình',
      lightIntensity: '841 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 19,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 88,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 31,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 13,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 65',
        quality: 'Khá tốt',
        progress: 65,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 6.9',
        quality: 'Trung bình',
        progress: 69,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 88,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Cầu Kiệu, Phú Nhuận, khu vực Phú Nhuận',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Cầu Kiệu, Phú Nhuận',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Rất thấp',
        percent: 25,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 81% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 63% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Cầu Kiệu, Phú Nhuận',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-pn-ducchinh': {
    id: 'hcm-pn-ducchinh',
    name: 'Phường Đức Chính, Phú Nhuận',
    subTitle: 'Khu dân cư Hoàng Văn Thụ & công viên',
    districtGroup: 'Phú Nhuận',
    adminType: 'phường',
    lat: 10.802,
    lng: 106.675,
    weather: {
      temp: '33°C',
      condition: 'nắng dịu',
      description: 'Phường Đức Chính, Phú Nhuận - Độ ẩm 66%, gió 12km/h, vi khí hậu ổn định',
      humidity: '66%',
      altitude: '12 m',
      uvIndex: 'UV 7.2',
      uvLevel: 'Cao',
      lightIntensity: '608 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 20,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 89,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 32,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 14,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 66',
        quality: 'Khá tốt',
        progress: 66,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 7.2',
        quality: 'Trung bình',
        progress: 72,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 88,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Đức Chính, Phú Nhuận, khu vực Phú Nhuận',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Đức Chính, Phú Nhuận',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Rất thấp',
        percent: 25,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 82% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 64% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Đức Chính, Phú Nhuận',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-pn-phunhuan': {
    id: 'hcm-pn-phunhuan',
    name: 'Phường Phú Nhuận, Phú Nhuận',
    subTitle: 'Phố ẩm thực Phan Xích Long & trung tâm quận',
    districtGroup: 'Phú Nhuận',
    adminType: 'phường',
    lat: 10.798,
    lng: 106.679,
    weather: {
      temp: '34°C',
      condition: 'nắng nhẹ',
      description: 'Phường Phú Nhuận, Phú Nhuận - Độ ẩm 67%, gió 13km/h, vi khí hậu ổn định',
      humidity: '67%',
      altitude: '13 m',
      uvIndex: 'UV 7.5',
      uvLevel: 'Cao',
      lightIntensity: '625 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 21,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 65,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 33,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 15,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 67',
        quality: 'Khá tốt',
        progress: 67,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 7.5',
        quality: 'Trung bình',
        progress: 75,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 88,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Phú Nhuận, Phú Nhuận, khu vực Phú Nhuận',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Phú Nhuận, Phú Nhuận',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Rất thấp',
        percent: 25,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 83% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 40% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Phú Nhuận, Phú Nhuận',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-tb-tansonnhat': {
    id: 'hcm-tb-tansonnhat',
    name: 'Phường Tân Sơn Nhất, Tân Bình',
    subTitle: 'Sân bay Quốc tế Tân Sơn Nhất & ga T3',
    districtGroup: 'Tân Bình',
    adminType: 'phường',
    lat: 10.808,
    lng: 106.661,
    weather: {
      temp: '31°C',
      condition: 'mây rải rác',
      description: 'Phường Tân Sơn Nhất, Tân Bình - Độ ẩm 68%, gió 14km/h, vi khí hậu ổn định',
      humidity: '68%',
      altitude: '14 m',
      uvIndex: 'UV 7.8',
      uvLevel: 'Cao',
      lightIntensity: '642 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 22,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 66,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 34,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 16,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 68',
        quality: 'Khá tốt',
        progress: 68,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 7.8',
        quality: 'Trung bình',
        progress: 78,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Tân Sơn Nhất, Tân Bình, khu vực Tân Bình',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Tân Sơn Nhất, Tân Bình',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 84% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 41% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Tân Sơn Nhất, Tân Bình',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-tb-bayhien': {
    id: 'hcm-tb-bayhien',
    name: 'Phường Bảy Hiền, Tân Bình',
    subTitle: 'Ngã tư Bảy Hiền & làng dệt truyền thống',
    districtGroup: 'Tân Bình',
    adminType: 'phường',
    lat: 10.792,
    lng: 106.654,
    weather: {
      temp: '32°C',
      condition: 'nắng dịu',
      description: 'Phường Bảy Hiền, Tân Bình - Độ ẩm 69%, gió 8km/h, vi khí hậu ổn định',
      humidity: '69%',
      altitude: '15 m',
      uvIndex: 'UV 8.1',
      uvLevel: 'Cao',
      lightIntensity: '659 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 23,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 67,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 35,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 17,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 69',
        quality: 'Khá tốt',
        progress: 69,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 8.1',
        quality: 'Trung bình',
        progress: 81,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Bảy Hiền, Tân Bình, khu vực Tân Bình',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Bảy Hiền, Tân Bình',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 85% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 42% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Bảy Hiền, Tân Bình',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-tb-laclongquan': {
    id: 'hcm-tb-laclongquan',
    name: 'Phường Lạc Long Quân, Tân Bình',
    subTitle: 'Trục Lạc Long Quân & Chợ Tân Bình',
    districtGroup: 'Tân Bình',
    adminType: 'phường',
    lat: 10.785,
    lng: 106.649,
    weather: {
      temp: '33°C',
      condition: 'nắng nhẹ',
      description: 'Phường Lạc Long Quân, Tân Bình - Độ ẩm 70%, gió 9km/h, vi khí hậu ổn định',
      humidity: '70%',
      altitude: '10 m',
      uvIndex: 'UV 8.4',
      uvLevel: 'Cao',
      lightIntensity: '676 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 24,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 68,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 36,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 18,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 70',
        quality: 'Khá tốt',
        progress: 70,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 8.4',
        quality: 'Trung bình',
        progress: 84,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Lạc Long Quân, Tân Bình, khu vực Tân Bình',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Lạc Long Quân, Tân Bình',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 86% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 43% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Lạc Long Quân, Tân Bình',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-tb-hoangvanthu': {
    id: 'hcm-tb-hoangvanthu',
    name: 'Phường Hoàng Văn Thụ, Tân Bình',
    subTitle: 'Công viên Hoàng Văn Thụ & SVĐ Quân khu 7',
    districtGroup: 'Tân Bình',
    adminType: 'phường',
    lat: 10.801,
    lng: 106.669,
    weather: {
      temp: '34°C',
      condition: 'mây rải rác',
      description: 'Phường Hoàng Văn Thụ, Tân Bình - Độ ẩm 71%, gió 10km/h, vi khí hậu ổn định',
      humidity: '71%',
      altitude: '11 m',
      uvIndex: 'UV 8.7',
      uvLevel: 'Cao',
      lightIntensity: '693 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 25,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 69,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 37,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 19,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 71',
        quality: 'Khá tốt',
        progress: 71,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 8.7',
        quality: 'Trung bình',
        progress: 87,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Hoàng Văn Thụ, Tân Bình, khu vực Tân Bình',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Hoàng Văn Thụ, Tân Bình',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 87% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 44% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Hoàng Văn Thụ, Tân Bình',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-tb-conghoa': {
    id: 'hcm-tb-conghoa',
    name: 'Phường Cộng Hòa, Tân Bình',
    subTitle: 'Hành lang tài chính văn phòng đường Cộng Hòa',
    districtGroup: 'Tân Bình',
    adminType: 'phường',
    lat: 10.805,
    lng: 106.645,
    weather: {
      temp: '31°C',
      condition: 'nắng dịu',
      description: 'Phường Cộng Hòa, Tân Bình - Độ ẩm 64%, gió 11km/h, vi khí hậu ổn định',
      humidity: '64%',
      altitude: '12 m',
      uvIndex: 'UV 5.0',
      uvLevel: 'Thấp',
      lightIntensity: '710 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 26,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 70,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 28,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 12,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 72',
        quality: 'Khá tốt',
        progress: 72,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 5.0',
        quality: 'Tốt',
        progress: 50,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Cộng Hòa, Tân Bình, khu vực Tân Bình',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Cộng Hòa, Tân Bình',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 88% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 45% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Cộng Hòa, Tân Bình',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-tp-taythanh': {
    id: 'hcm-tp-taythanh',
    name: 'Phường Tây Thạnh, Tân Phú',
    subTitle: 'Khu công nghiệp Tân Bình & công viên sinh thái',
    districtGroup: 'Tân Phú',
    adminType: 'phường',
    lat: 10.819,
    lng: 106.629,
    weather: {
      temp: '32°C',
      condition: 'nắng nhẹ',
      description: 'Phường Tây Thạnh, Tân Phú - Độ ẩm 65%, gió 12km/h, vi khí hậu ổn định',
      humidity: '65%',
      altitude: '13 m',
      uvIndex: 'UV 5.3',
      uvLevel: 'Trung bình',
      lightIntensity: '727 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 27,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 71,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 29,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 13,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 73',
        quality: 'Khá tốt',
        progress: 73,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 5.3',
        quality: 'Tốt',
        progress: 53,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Tây Thạnh, Tân Phú, khu vực Tân Phú',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Tây Thạnh, Tân Phú',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 89% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 46% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Tây Thạnh, Tân Phú',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-tp-tansonnhi': {
    id: 'hcm-tp-tansonnhi',
    name: 'Phường Tân Sơn Nhì, Tân Phú',
    subTitle: 'Khu ẩm thực Aeon Mall Tân Phú & Celedon City',
    districtGroup: 'Tân Phú',
    adminType: 'phường',
    lat: 10.802,
    lng: 106.631,
    weather: {
      temp: '33°C',
      condition: 'mây rải rác',
      description: 'Phường Tân Sơn Nhì, Tân Phú - Độ ẩm 66%, gió 13km/h, vi khí hậu ổn định',
      humidity: '66%',
      altitude: '14 m',
      uvIndex: 'UV 5.6',
      uvLevel: 'Trung bình',
      lightIntensity: '744 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 28,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 72,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 30,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 14,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 74',
        quality: 'Khá tốt',
        progress: 74,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 5.6',
        quality: 'Trung bình',
        progress: 56,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Tân Sơn Nhì, Tân Phú, khu vực Tân Phú',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Tân Sơn Nhì, Tân Phú',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 90% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 47% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Tân Sơn Nhì, Tân Phú',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-tp-phuthohoa': {
    id: 'hcm-tp-phuthohoa',
    name: 'Phường Phú Thọ Hòa, Tân Phú',
    subTitle: 'Địa đạo Phú Thọ Hòa di tích lịch sử',
    districtGroup: 'Tân Phú',
    adminType: 'phường',
    lat: 10.786,
    lng: 106.628,
    weather: {
      temp: '34°C',
      condition: 'nắng dịu',
      description: 'Phường Phú Thọ Hòa, Tân Phú - Độ ẩm 67%, gió 14km/h, vi khí hậu ổn định',
      humidity: '67%',
      altitude: '15 m',
      uvIndex: 'UV 5.9',
      uvLevel: 'Trung bình',
      lightIntensity: '761 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 29,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 73,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 31,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 15,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 75',
        quality: 'Rất tốt',
        progress: 75,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 5.9',
        quality: 'Trung bình',
        progress: 59,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Phú Thọ Hòa, Tân Phú, khu vực Tân Phú',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Phú Thọ Hòa, Tân Phú',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 91% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 48% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Phú Thọ Hòa, Tân Phú',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-tp-hieptan': {
    id: 'hcm-tp-hieptan',
    name: 'Phường Hiệp Tân, Tân Phú',
    subTitle: 'Khu dân cư giáp Đầm Sen & đường Hòa Bình',
    districtGroup: 'Tân Phú',
    adminType: 'phường',
    lat: 10.772,
    lng: 106.629,
    weather: {
      temp: '31°C',
      condition: 'nắng nhẹ',
      description: 'Phường Hiệp Tân, Tân Phú - Độ ẩm 68%, gió 8km/h, vi khí hậu ổn định',
      humidity: '68%',
      altitude: '10 m',
      uvIndex: 'UV 6.2',
      uvLevel: 'Trung bình',
      lightIntensity: '778 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 18,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 74,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 32,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 16,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 62',
        quality: 'Trung bình',
        progress: 62,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 6.2',
        quality: 'Trung bình',
        progress: 62,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Hiệp Tân, Tân Phú, khu vực Tân Phú',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Hiệp Tân, Tân Phú',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 92% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 49% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Hiệp Tân, Tân Phú',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-btan-anlac': {
    id: 'hcm-btan-anlac',
    name: 'Phường An Lạc, Bình Tân',
    subTitle: 'Bến xe Miền Tây & cửa ngõ miền Tây',
    districtGroup: 'Bình Tân',
    adminType: 'phường',
    lat: 10.732,
    lng: 106.611,
    weather: {
      temp: '32°C',
      condition: 'mây rải rác',
      description: 'Phường An Lạc, Bình Tân - Độ ẩm 69%, gió 9km/h, vi khí hậu ổn định',
      humidity: '69%',
      altitude: '11 m',
      uvIndex: 'UV 6.5',
      uvLevel: 'Trung bình',
      lightIntensity: '795 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 19,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 75,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 33,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 17,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 63',
        quality: 'Trung bình',
        progress: 63,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 6.5',
        quality: 'Trung bình',
        progress: 65,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường An Lạc, Bình Tân, khu vực Bình Tân',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường An Lạc, Bình Tân',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 93% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 50% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường An Lạc, Bình Tân',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-btan-anlaca': {
    id: 'hcm-btan-anlaca',
    name: 'Phường An Lạc A, Bình Tân',
    subTitle: 'Khu đô thị Tên Lửa & Bệnh viện Triều An',
    districtGroup: 'Bình Tân',
    adminType: 'phường',
    lat: 10.748,
    lng: 106.618,
    weather: {
      temp: '33°C',
      condition: 'nắng dịu',
      description: 'Phường An Lạc A, Bình Tân - Độ ẩm 70%, gió 10km/h, vi khí hậu ổn định',
      humidity: '70%',
      altitude: '12 m',
      uvIndex: 'UV 6.8',
      uvLevel: 'Trung bình',
      lightIntensity: '812 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 20,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 76,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 34,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 18,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 64',
        quality: 'Trung bình',
        progress: 64,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 6.8',
        quality: 'Trung bình',
        progress: 68,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường An Lạc A, Bình Tân, khu vực Bình Tân',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường An Lạc A, Bình Tân',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 94% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 51% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường An Lạc A, Bình Tân',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-btan-binhhunghoa': {
    id: 'hcm-btan-binhhunghoa',
    name: 'Phường Bình Hưng Hòa, Bình Tân',
    subTitle: 'Khu công viên sinh thái mới & Tân Kỳ Tân Quý',
    districtGroup: 'Bình Tân',
    adminType: 'phường',
    lat: 10.795,
    lng: 106.608,
    weather: {
      temp: '34°C',
      condition: 'nắng nhẹ',
      description: 'Phường Bình Hưng Hòa, Bình Tân - Độ ẩm 71%, gió 11km/h, vi khí hậu ổn định',
      humidity: '71%',
      altitude: '13 m',
      uvIndex: 'UV 7.1',
      uvLevel: 'Cao',
      lightIntensity: '829 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 21,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 77,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 35,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 19,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 65',
        quality: 'Khá tốt',
        progress: 65,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 7.1',
        quality: 'Trung bình',
        progress: 71,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Bình Hưng Hòa, Bình Tân, khu vực Bình Tân',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Bình Hưng Hòa, Bình Tân',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 95% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 52% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Bình Hưng Hòa, Bình Tân',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-btan-binhhunghoaa': {
    id: 'hcm-btan-binhhunghoaa',
    name: 'Phường Bình Hưng Hòa A, Bình Tân',
    subTitle: 'Khu dân cư kết nối Tân Phú & kênh 19/5',
    districtGroup: 'Bình Tân',
    adminType: 'phường',
    lat: 10.782,
    lng: 106.602,
    weather: {
      temp: '31°C',
      condition: 'mây rải rác',
      description: 'Phường Bình Hưng Hòa A, Bình Tân - Độ ẩm 64%, gió 12km/h, vi khí hậu ổn định',
      humidity: '64%',
      altitude: '14 m',
      uvIndex: 'UV 7.4',
      uvLevel: 'Cao',
      lightIntensity: '846 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 22,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 78,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 36,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 12,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 66',
        quality: 'Khá tốt',
        progress: 66,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 7.4',
        quality: 'Trung bình',
        progress: 74,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Bình Hưng Hòa A, Bình Tân, khu vực Bình Tân',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Bình Hưng Hòa A, Bình Tân',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 96% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 53% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Bình Hưng Hòa A, Bình Tân',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-btan-binhhunghoab': {
    id: 'hcm-btan-binhhunghoab',
    name: 'Phường Bình Hưng Hòa B, Bình Tân',
    subTitle: 'Khu công nghiệp Vĩnh Lộc giáp Quốc lộ 1A',
    districtGroup: 'Bình Tân',
    adminType: 'phường',
    lat: 10.799,
    lng: 106.591,
    weather: {
      temp: '32°C',
      condition: 'nắng dịu',
      description: 'Phường Bình Hưng Hòa B, Bình Tân - Độ ẩm 65%, gió 13km/h, vi khí hậu ổn định',
      humidity: '65%',
      altitude: '15 m',
      uvIndex: 'UV 7.7',
      uvLevel: 'Cao',
      lightIntensity: '613 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 23,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 79,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 37,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 13,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 67',
        quality: 'Khá tốt',
        progress: 67,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 7.7',
        quality: 'Trung bình',
        progress: 77,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Bình Hưng Hòa B, Bình Tân, khu vực Bình Tân',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Bình Hưng Hòa B, Bình Tân',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 97% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 54% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Bình Hưng Hòa B, Bình Tân',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-btan-binhtridong': {
    id: 'hcm-btan-binhtridong',
    name: 'Phường Bình Trị Đông, Bình Tân',
    subTitle: 'Chợ Bình Trị Đông & khu dân cư truyền thống',
    districtGroup: 'Bình Tân',
    adminType: 'phường',
    lat: 10.768,
    lng: 106.609,
    weather: {
      temp: '33°C',
      condition: 'nắng nhẹ',
      description: 'Phường Bình Trị Đông, Bình Tân - Độ ẩm 66%, gió 14km/h, vi khí hậu ổn định',
      humidity: '66%',
      altitude: '10 m',
      uvIndex: 'UV 8.0',
      uvLevel: 'Cao',
      lightIntensity: '630 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 24,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 80,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 28,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 14,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 68',
        quality: 'Khá tốt',
        progress: 68,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 8.0',
        quality: 'Trung bình',
        progress: 80,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Bình Trị Đông, Bình Tân, khu vực Bình Tân',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Bình Trị Đông, Bình Tân',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 80% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 55% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Bình Trị Đông, Bình Tân',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-btan-binhtridonga': {
    id: 'hcm-btan-binhtridonga',
    name: 'Phường Bình Trị Đông A, Bình Tân',
    subTitle: 'Khu đô thị mở rộng trục Mã Lò',
    districtGroup: 'Bình Tân',
    adminType: 'phường',
    lat: 10.771,
    lng: 106.598,
    weather: {
      temp: '34°C',
      condition: 'mây rải rác',
      description: 'Phường Bình Trị Đông A, Bình Tân - Độ ẩm 67%, gió 8km/h, vi khí hậu ổn định',
      humidity: '67%',
      altitude: '11 m',
      uvIndex: 'UV 8.3',
      uvLevel: 'Cao',
      lightIntensity: '647 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 25,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 81,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 29,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 15,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 69',
        quality: 'Khá tốt',
        progress: 69,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 8.3',
        quality: 'Trung bình',
        progress: 83,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Bình Trị Đông A, Bình Tân, khu vực Bình Tân',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Bình Trị Đông A, Bình Tân',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 81% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 56% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Bình Trị Đông A, Bình Tân',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-btan-binhtridongb': {
    id: 'hcm-btan-binhtridongb',
    name: 'Phường Bình Trị Đông B, Bình Tân',
    subTitle: 'Trung tâm thương mại Aeon Mall Bình Tân',
    districtGroup: 'Bình Tân',
    adminType: 'phường',
    lat: 10.755,
    lng: 106.605,
    weather: {
      temp: '31°C',
      condition: 'nắng dịu',
      description: 'Phường Bình Trị Đông B, Bình Tân - Độ ẩm 68%, gió 9km/h, vi khí hậu ổn định',
      humidity: '68%',
      altitude: '12 m',
      uvIndex: 'UV 8.6',
      uvLevel: 'Cao',
      lightIntensity: '664 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 26,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 82,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 30,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 16,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 70',
        quality: 'Khá tốt',
        progress: 70,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 8.6',
        quality: 'Trung bình',
        progress: 86,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Bình Trị Đông B, Bình Tân, khu vực Bình Tân',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Bình Trị Đông B, Bình Tân',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 82% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 57% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Bình Trị Đông B, Bình Tân',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-btan-tantao': {
    id: 'hcm-btan-tantao',
    name: 'Phường Tân Tạo, Bình Tân',
    subTitle: 'Khu công nghiệp Tân Tạo & tuyến cao tốc',
    districtGroup: 'Bình Tân',
    adminType: 'phường',
    lat: 10.745,
    lng: 106.589,
    weather: {
      temp: '32°C',
      condition: 'nắng nhẹ',
      description: 'Phường Tân Tạo, Bình Tân - Độ ẩm 69%, gió 10km/h, vi khí hậu ổn định',
      humidity: '69%',
      altitude: '13 m',
      uvIndex: 'UV 8.9',
      uvLevel: 'Cao',
      lightIntensity: '681 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 27,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 83,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 31,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 17,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 71',
        quality: 'Khá tốt',
        progress: 71,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 8.9',
        quality: 'Trung bình',
        progress: 89,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Tân Tạo, Bình Tân, khu vực Bình Tân',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Tân Tạo, Bình Tân',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 83% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 58% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Tân Tạo, Bình Tân',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-btan-tantaoa': {
    id: 'hcm-btan-tantaoa',
    name: 'Phường Tân Tạo A, Bình Tân',
    subTitle: 'Vùng trũng sinh thái ven sông Chợ Đệm',
    districtGroup: 'Bình Tân',
    adminType: 'phường',
    lat: 10.738,
    lng: 106.578,
    weather: {
      temp: '33°C',
      condition: 'mây rải rác',
      description: 'Phường Tân Tạo A, Bình Tân - Độ ẩm 70%, gió 11km/h, vi khí hậu ổn định',
      humidity: '70%',
      altitude: '14 m',
      uvIndex: 'UV 5.2',
      uvLevel: 'Trung bình',
      lightIntensity: '698 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 28,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 84,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 32,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 18,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 72',
        quality: 'Khá tốt',
        progress: 72,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 5.2',
        quality: 'Tốt',
        progress: 52,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Tân Tạo A, Bình Tân, khu vực Bình Tân',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Tân Tạo A, Bình Tân',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 84% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 59% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Tân Tạo A, Bình Tân',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-td-thuduc': {
    id: 'hcm-td-thuduc',
    name: 'Phường Thủ Đức, TP. Thủ Đức',
    subTitle: 'Trung tâm hành chính cũ, Làng đại học & Chợ Thủ Đức',
    districtGroup: 'TP. Thủ Đức',
    adminType: 'phường',
    lat: 10.849,
    lng: 106.768,
    weather: {
      temp: '34°C',
      condition: 'nắng dịu',
      description: 'Phường Thủ Đức, TP. Thủ Đức - Độ ẩm 71%, gió 12km/h, vi khí hậu ổn định',
      humidity: '71%',
      altitude: '15 m',
      uvIndex: 'UV 5.5',
      uvLevel: 'Trung bình',
      lightIntensity: '715 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 29,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 85,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 33,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 19,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 73',
        quality: 'Khá tốt',
        progress: 73,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 5.5',
        quality: 'Tốt',
        progress: 55,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Thủ Đức, TP. Thủ Đức, khu vực TP. Thủ Đức',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Thủ Đức, TP. Thủ Đức',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 85% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 60% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Thủ Đức, TP. Thủ Đức',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-td-ankhanh': {
    id: 'hcm-td-ankhanh',
    name: 'Phường An Khánh, TP. Thủ Đức',
    subTitle: 'Khu đô thị mới Thủ Thiêm & bán đảo Thảo Điền',
    districtGroup: 'TP. Thủ Đức',
    adminType: 'phường',
    lat: 10.787,
    lng: 106.728,
    weather: {
      temp: '31°C',
      condition: 'nắng nhẹ',
      description: 'Phường An Khánh, TP. Thủ Đức - Độ ẩm 64%, gió 13km/h, vi khí hậu ổn định',
      humidity: '64%',
      altitude: '10 m',
      uvIndex: 'UV 5.8',
      uvLevel: 'Trung bình',
      lightIntensity: '732 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 18,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 86,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 34,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 12,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 74',
        quality: 'Khá tốt',
        progress: 74,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 5.8',
        quality: 'Trung bình',
        progress: 58,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường An Khánh, TP. Thủ Đức, khu vực TP. Thủ Đức',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường An Khánh, TP. Thủ Đức',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 86% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 61% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường An Khánh, TP. Thủ Đức',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-td-binhtrung': {
    id: 'hcm-td-binhtrung',
    name: 'Phường Bình Trưng, TP. Thủ Đức',
    subTitle: 'Khu dân cư sinh thái Bình Trưng & Đỗ Xuân Hợp',
    districtGroup: 'TP. Thủ Đức',
    adminType: 'phường',
    lat: 10.792,
    lng: 106.772,
    weather: {
      temp: '32°C',
      condition: 'mây rải rác',
      description: 'Phường Bình Trưng, TP. Thủ Đức - Độ ẩm 65%, gió 14km/h, vi khí hậu ổn định',
      humidity: '65%',
      altitude: '11 m',
      uvIndex: 'UV 6.1',
      uvLevel: 'Trung bình',
      lightIntensity: '749 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 19,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 87,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 35,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 13,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 75',
        quality: 'Rất tốt',
        progress: 75,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 6.1',
        quality: 'Trung bình',
        progress: 61,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Bình Trưng, TP. Thủ Đức, khu vực TP. Thủ Đức',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Bình Trưng, TP. Thủ Đức',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 87% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 62% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Bình Trưng, TP. Thủ Đức',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-td-catlai': {
    id: 'hcm-td-catlai',
    name: 'Phường Cát Lái, TP. Thủ Đức',
    subTitle: 'Tân Cảng Cát Lái lớn nhất Việt Nam & Vành Đai 2',
    districtGroup: 'TP. Thủ Đức',
    adminType: 'phường',
    lat: 10.762,
    lng: 106.779,
    weather: {
      temp: '33°C',
      condition: 'nắng dịu',
      description: 'Phường Cát Lái, TP. Thủ Đức - Độ ẩm 66%, gió 8km/h, vi khí hậu ổn định',
      humidity: '66%',
      altitude: '12 m',
      uvIndex: 'UV 6.4',
      uvLevel: 'Trung bình',
      lightIntensity: '766 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 20,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 88,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 36,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 14,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 62',
        quality: 'Trung bình',
        progress: 62,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 6.4',
        quality: 'Trung bình',
        progress: 64,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Cát Lái, TP. Thủ Đức, khu vực TP. Thủ Đức',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Cát Lái, TP. Thủ Đức',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 88% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 63% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Cát Lái, TP. Thủ Đức',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-td-hiepbinh': {
    id: 'hcm-td-hiepbinh',
    name: 'Phường Hiệp Bình, TP. Thủ Đức',
    subTitle: 'Khu đô thị sinh thái ven sông Sài Gòn & QL 13',
    districtGroup: 'TP. Thủ Đức',
    adminType: 'phường',
    lat: 10.842,
    lng: 106.725,
    weather: {
      temp: '34°C',
      condition: 'nắng nhẹ',
      description: 'Phường Hiệp Bình, TP. Thủ Đức - Độ ẩm 67%, gió 9km/h, vi khí hậu ổn định',
      humidity: '67%',
      altitude: '13 m',
      uvIndex: 'UV 6.7',
      uvLevel: 'Trung bình',
      lightIntensity: '783 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 21,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 89,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 37,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 15,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 63',
        quality: 'Trung bình',
        progress: 63,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 6.7',
        quality: 'Trung bình',
        progress: 67,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Hiệp Bình, TP. Thủ Đức, khu vực TP. Thủ Đức',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Hiệp Bình, TP. Thủ Đức',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 89% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 64% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Hiệp Bình, TP. Thủ Đức',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-td-hiepphu': {
    id: 'hcm-td-hiepphu',
    name: 'Phường Hiệp Phú, TP. Thủ Đức',
    subTitle: 'Khu Công nghệ cao TP.HCM (SHTP) & Xa lộ Hà Nội',
    districtGroup: 'TP. Thủ Đức',
    adminType: 'phường',
    lat: 10.848,
    lng: 106.782,
    weather: {
      temp: '31°C',
      condition: 'mây rải rác',
      description: 'Phường Hiệp Phú, TP. Thủ Đức - Độ ẩm 68%, gió 10km/h, vi khí hậu ổn định',
      humidity: '68%',
      altitude: '14 m',
      uvIndex: 'UV 7.0',
      uvLevel: 'Trung bình',
      lightIntensity: '800 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 22,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 65,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 28,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 16,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 64',
        quality: 'Trung bình',
        progress: 64,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 7.0',
        quality: 'Trung bình',
        progress: 70,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Hiệp Phú, TP. Thủ Đức, khu vực TP. Thủ Đức',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Hiệp Phú, TP. Thủ Đức',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 90% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 40% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Hiệp Phú, TP. Thủ Đức',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-td-linhxuan': {
    id: 'hcm-td-linhxuan',
    name: 'Phường Linh Xuân, TP. Thủ Đức',
    subTitle: 'Đại học Quốc gia TP.HCM & Khu chế xuất Linh Trung',
    districtGroup: 'TP. Thủ Đức',
    adminType: 'phường',
    lat: 10.884,
    lng: 106.775,
    weather: {
      temp: '32°C',
      condition: 'nắng dịu',
      description: 'Phường Linh Xuân, TP. Thủ Đức - Độ ẩm 69%, gió 11km/h, vi khí hậu ổn định',
      humidity: '69%',
      altitude: '15 m',
      uvIndex: 'UV 7.3',
      uvLevel: 'Cao',
      lightIntensity: '817 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 23,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 66,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 29,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 17,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 65',
        quality: 'Khá tốt',
        progress: 65,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 7.3',
        quality: 'Trung bình',
        progress: 73,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Linh Xuân, TP. Thủ Đức, khu vực TP. Thủ Đức',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Linh Xuân, TP. Thủ Đức',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 91% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 41% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Linh Xuân, TP. Thủ Đức',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-td-longbinh': {
    id: 'hcm-td-longbinh',
    name: 'Phường Long Bình, TP. Thủ Đức',
    subTitle: 'Công viên Lịch sử Văn hóa Dân tộc & Depot Suối Tiên',
    districtGroup: 'TP. Thủ Đức',
    adminType: 'phường',
    lat: 10.871,
    lng: 106.842,
    weather: {
      temp: '33°C',
      condition: 'nắng nhẹ',
      description: 'Phường Long Bình, TP. Thủ Đức - Độ ẩm 70%, gió 12km/h, vi khí hậu ổn định',
      humidity: '70%',
      altitude: '10 m',
      uvIndex: 'UV 7.6',
      uvLevel: 'Cao',
      lightIntensity: '834 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 24,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 67,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 30,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 18,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 66',
        quality: 'Khá tốt',
        progress: 66,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 7.6',
        quality: 'Trung bình',
        progress: 76,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Long Bình, TP. Thủ Đức, khu vực TP. Thủ Đức',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Long Bình, TP. Thủ Đức',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 92% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 42% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Long Bình, TP. Thủ Đức',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-td-longphuoc': {
    id: 'hcm-td-longphuoc',
    name: 'Phường Long Phước, TP. Thủ Đức',
    subTitle: 'Cù lao sinh thái nhà vườn ven sông Đồng Nai',
    districtGroup: 'TP. Thủ Đức',
    adminType: 'phường',
    lat: 10.812,
    lng: 106.849,
    weather: {
      temp: '34°C',
      condition: 'mây rải rác',
      description: 'Phường Long Phước, TP. Thủ Đức - Độ ẩm 71%, gió 13km/h, vi khí hậu ổn định',
      humidity: '71%',
      altitude: '11 m',
      uvIndex: 'UV 7.9',
      uvLevel: 'Cao',
      lightIntensity: '601 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 25,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 68,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 31,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 19,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 67',
        quality: 'Khá tốt',
        progress: 67,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 7.9',
        quality: 'Trung bình',
        progress: 79,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Long Phước, TP. Thủ Đức, khu vực TP. Thủ Đức',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Long Phước, TP. Thủ Đức',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 93% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 43% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Long Phước, TP. Thủ Đức',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-td-longtruong': {
    id: 'hcm-td-longtruong',
    name: 'Phường Long Trường, TP. Thủ Đức',
    subTitle: 'Khu đô thị sinh thái cảng Phú Hữu & rạch Trau Trảu',
    districtGroup: 'TP. Thủ Đức',
    adminType: 'phường',
    lat: 10.808,
    lng: 106.812,
    weather: {
      temp: '31°C',
      condition: 'nắng dịu',
      description: 'Phường Long Trường, TP. Thủ Đức - Độ ẩm 64%, gió 14km/h, vi khí hậu ổn định',
      humidity: '64%',
      altitude: '12 m',
      uvIndex: 'UV 8.2',
      uvLevel: 'Cao',
      lightIntensity: '618 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 26,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 69,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 32,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 12,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 68',
        quality: 'Khá tốt',
        progress: 68,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 8.2',
        quality: 'Trung bình',
        progress: 82,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Long Trường, TP. Thủ Đức, khu vực TP. Thủ Đức',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Long Trường, TP. Thủ Đức',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 94% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 44% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Long Trường, TP. Thủ Đức',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-td-tambinh': {
    id: 'hcm-td-tambinh',
    name: 'Phường Tam Bình, TP. Thủ Đức',
    subTitle: 'Chợ đầu mối Nông sản Thủ Đức & KCN Bình Chiểu',
    districtGroup: 'TP. Thủ Đức',
    adminType: 'phường',
    lat: 10.869,
    lng: 106.735,
    weather: {
      temp: '32°C',
      condition: 'nắng nhẹ',
      description: 'Phường Tam Bình, TP. Thủ Đức - Độ ẩm 65%, gió 8km/h, vi khí hậu ổn định',
      humidity: '65%',
      altitude: '13 m',
      uvIndex: 'UV 8.5',
      uvLevel: 'Cao',
      lightIntensity: '635 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 27,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 70,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 33,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 13,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 69',
        quality: 'Khá tốt',
        progress: 69,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 8.5',
        quality: 'Trung bình',
        progress: 85,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Tam Bình, TP. Thủ Đức, khu vực TP. Thủ Đức',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Tam Bình, TP. Thủ Đức',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 95% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 45% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Tam Bình, TP. Thủ Đức',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-td-tangnhonphu': {
    id: 'hcm-td-tangnhonphu',
    name: 'Phường Tăng Nhơn Phú, TP. Thủ Đức',
    subTitle: 'Khu đại đô thị Vinhomes Grand Park & SHTP giai đoạn 2',
    districtGroup: 'TP. Thủ Đức',
    adminType: 'phường',
    lat: 10.841,
    lng: 106.792,
    weather: {
      temp: '33°C',
      condition: 'mây rải rác',
      description: 'Phường Tăng Nhơn Phú, TP. Thủ Đức - Độ ẩm 66%, gió 9km/h, vi khí hậu ổn định',
      humidity: '66%',
      altitude: '14 m',
      uvIndex: 'UV 8.8',
      uvLevel: 'Cao',
      lightIntensity: '652 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 28,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 71,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 34,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 14,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 70',
        quality: 'Khá tốt',
        progress: 70,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 8.8',
        quality: 'Trung bình',
        progress: 88,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Phường Tăng Nhơn Phú, TP. Thủ Đức, khu vực TP. Thủ Đức',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Tăng Nhơn Phú, TP. Thủ Đức',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 96% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 46% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Tăng Nhơn Phú, TP. Thủ Đức',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-td-thoihoa': {
    id: 'hcm-td-thoihoa',
    name: 'Phường Thới Hòa, TP. Thủ Đức',
    subTitle: 'Đơn vị hành chính giữ nguyên hiện trạng theo Nghị quyết 1685',
    districtGroup: 'TP. Thủ Đức',
    adminType: 'phường',
    lat: 11.082,
    lng: 106.615,
    weather: {
      temp: '34°C',
      condition: 'nắng dịu',
      description: 'Phường Thới Hòa, TP. Thủ Đức - Độ ẩm 67%, gió 10km/h, vi khí hậu ổn định',
      humidity: '67%',
      altitude: '15 m',
      uvIndex: 'UV 5.1',
      uvLevel: 'Trung bình',
      lightIntensity: '669 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 29,
        status: 'Phục hồi tự nhiên',
        highlights: [
          'Cá chép, cá bảy màu',
          'Thủy sinh kênh rạch đô thị',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 72,
        status: 'Mảng xanh công viên đô thị',
        highlights: [
          'Cây xanh bóng mát, xà cừ, sao đen',
          'Chim chích bông, bồ câu',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 35,
        status: 'Ổn định theo mùa',
        highlights: [
          'Yến hàng, chim sẻ nhà',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 15,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cóc nhà, thạch sùng',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 71',
        quality: 'Khá tốt',
        progress: 71,
        note: 'Dòng chảy thông thoáng, chỉ số COD/BOD ổn định'
      },
      light: {
        value: 'UV: 5.1',
        quality: 'Tốt',
        progress: 51,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Vững chắc',
        progress: 76,
        note: 'Địa tầng đô thị kiên cố, độ lún an toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Phường Thới Hòa, TP. Thủ Đức, khu vực TP. Thủ Đức',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Phường Thới Hòa, TP. Thủ Đức',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Kinh tế dịch vụ, thương mại & chuyển đổi số',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Đô thị đạt chuẩn bảo vệ môi trường',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 97% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 47% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Phường Thới Hòa, TP. Thủ Đức',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-cc-ttcuchi': {
    id: 'hcm-cc-ttcuchi',
    name: 'Thị trấn Củ Chi, Huyện Củ Chi',
    subTitle: 'Trung tâm hành chính huyện Củ Chi & Quốc lộ 22',
    districtGroup: 'Huyện Củ Chi',
    adminType: 'phường',
    lat: 10.972,
    lng: 106.495,
    weather: {
      temp: '30°C',
      condition: 'nắng nhẹ',
      description: 'Thị trấn Củ Chi, Huyện Củ Chi - Độ ẩm 76%, gió 11km/h, vi khí hậu ổn định',
      humidity: '76%',
      altitude: '16 m',
      uvIndex: 'UV 5.4',
      uvLevel: 'Trung bình',
      lightIntensity: '686 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 32,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 138,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 48,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 25,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 73',
        quality: 'Khá tốt',
        progress: 73,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 5.4',
        quality: 'Tốt',
        progress: 54,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Thị trấn Củ Chi, Huyện Củ Chi, khu vực Huyện Củ Chi',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Thị trấn Củ Chi, Huyện Củ Chi',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 80% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 48% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Thị trấn Củ Chi, Huyện Củ Chi',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-hm-tthocmon': {
    id: 'hcm-hm-tthocmon',
    name: 'Thị trấn Hóc Môn, Huyện Hóc Môn',
    subTitle: 'Trung tâm hành chính Mười Tám Thôn Vườn Trầu',
    districtGroup: 'Huyện Hóc Môn',
    adminType: 'phường',
    lat: 10.885,
    lng: 106.592,
    weather: {
      temp: '31°C',
      condition: 'mây rải rác',
      description: 'Thị trấn Hóc Môn, Huyện Hóc Môn - Độ ẩm 77%, gió 12km/h, vi khí hậu ổn định',
      humidity: '77%',
      altitude: '17 m',
      uvIndex: 'UV 5.7',
      uvLevel: 'Trung bình',
      lightIntensity: '703 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 33,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 139,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 49,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 26,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 74',
        quality: 'Khá tốt',
        progress: 74,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 5.7',
        quality: 'Trung bình',
        progress: 57,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Thị trấn Hóc Môn, Huyện Hóc Môn, khu vực Huyện Hóc Môn',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Thị trấn Hóc Môn, Huyện Hóc Môn',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 81% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 49% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Thị trấn Hóc Môn, Huyện Hóc Môn',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-bc-tttantuc': {
    id: 'hcm-bc-tttantuc',
    name: 'Thị trấn Tân Túc, Huyện Bình Chánh',
    subTitle: 'Trung tâm hành chính huyện Bình Chánh & nút giao cao tốc',
    districtGroup: 'Huyện Bình Chánh',
    adminType: 'phường',
    lat: 10.695,
    lng: 106.575,
    weather: {
      temp: '32°C',
      condition: 'nắng dịu',
      description: 'Thị trấn Tân Túc, Huyện Bình Chánh - Độ ẩm 78%, gió 13km/h, vi khí hậu ổn định',
      humidity: '78%',
      altitude: '18 m',
      uvIndex: 'UV 6.0',
      uvLevel: 'Trung bình',
      lightIntensity: '720 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 34,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 140,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 50,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 27,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 75',
        quality: 'Rất tốt',
        progress: 75,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 6.0',
        quality: 'Trung bình',
        progress: 60,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Thị trấn Tân Túc, Huyện Bình Chánh, khu vực Huyện Bình Chánh',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Thị trấn Tân Túc, Huyện Bình Chánh',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 82% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 50% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Thị trấn Tân Túc, Huyện Bình Chánh',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-nb-ttnhabe': {
    id: 'hcm-nb-ttnhabe',
    name: 'Thị trấn Nhà Bè, Huyện Nhà Bè',
    subTitle: 'Trung tâm huyện lỵ Nhà Bè & Tổng kho Xăng dầu',
    districtGroup: 'Huyện Nhà Bè',
    adminType: 'phường',
    lat: 10.695,
    lng: 106.745,
    weather: {
      temp: '29°C',
      condition: 'nắng nhẹ',
      description: 'Thị trấn Nhà Bè, Huyện Nhà Bè - Độ ẩm 79%, gió 14km/h, vi khí hậu ổn định',
      humidity: '79%',
      altitude: '6 m',
      uvIndex: 'UV 6.3',
      uvLevel: 'Trung bình',
      lightIntensity: '737 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 56,
        status: 'Đa dạng sinh học ven biển cao',
        highlights: [
          'Cá đối, cá bống thòi lòi, nghêu lụa',
          'Rừng đước, mắm ngập mặn ven bờ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 111,
        status: 'Rừng phòng hộ sinh quyển',
        highlights: [
          'Đước đôi, vẹt đen, bần trắng',
          'Khỉ đuôi dài, sóc đất, chồn hương',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 66,
        status: 'Ổn định theo mùa',
        highlights: [
          'Cò trắng, bồ nông chân xám, bói cá',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 34,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cua đá, cá thòi lòi leo cây',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 81',
        quality: 'Rất tốt',
        progress: 81,
        note: 'Độ mặn tự nhiên cân bằng, giàu phù sa ven biển'
      },
      light: {
        value: 'UV: 6.3',
        quality: 'Trung bình',
        progress: 63,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Đất ngập mặn ven biển',
        progress: 76,
        note: 'Địa chất ven biển bồi tụ tự nhiên'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Thị trấn Nhà Bè, Huyện Nhà Bè, khu vực Huyện Nhà Bè',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Theo dõi triều cường ven biển',
        desc: 'Trạm vi khí hậu tự động Thị trấn Nhà Bè, Huyện Nhà Bè',
        level: 'warning',
        actionAdvice: 'Kiểm tra mức triều buổi chiều trước khi ra các bến cảng.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Tiềm năng kinh tế biển & logistics xanh',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Bảo tồn sinh thái ven biển & hải đảo',
      wasteStatus: {
        pollution: 'Kiểm soát tốt rác biển',
        sorting: 'Đã triển khai 83% hộ dân',
        collection: 'Tần suất 1 lượt/ngày',
        wasteToFuel: 'Đạt 51% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Thị trấn Nhà Bè, Huyện Nhà Bè',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-cg-ttcanthanh': {
    id: 'hcm-cg-ttcanthanh',
    name: 'Thị trấn Cần Thạnh, Huyện Cần Giờ',
    subTitle: 'Thị trấn biển du lịch & Di sản Lễ hội Nghinh Ông',
    districtGroup: 'Huyện Cần Giờ',
    adminType: 'phường',
    lat: 10.408,
    lng: 106.962,
    weather: {
      temp: '30°C',
      condition: 'mây rải rác',
      description: 'Thị trấn Cần Thạnh, Huyện Cần Giờ - Độ ẩm 80%, gió 8km/h, vi khí hậu ổn định',
      humidity: '80%',
      altitude: '3 m',
      uvIndex: 'UV 6.6',
      uvLevel: 'Trung bình',
      lightIntensity: '754 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 57,
        status: 'Đa dạng sinh học ven biển cao',
        highlights: [
          'Cá đối, cá bống thòi lòi, nghêu lụa',
          'Rừng đước, mắm ngập mặn ven bờ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 112,
        status: 'Rừng phòng hộ sinh quyển',
        highlights: [
          'Đước đôi, vẹt đen, bần trắng',
          'Khỉ đuôi dài, sóc đất, chồn hương',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 67,
        status: 'Ổn định theo mùa',
        highlights: [
          'Cò trắng, bồ nông chân xám, bói cá',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 35,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cua đá, cá thòi lòi leo cây',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 82',
        quality: 'Rất tốt',
        progress: 82,
        note: 'Độ mặn tự nhiên cân bằng, giàu phù sa ven biển'
      },
      light: {
        value: 'UV: 6.6',
        quality: 'Trung bình',
        progress: 66,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Đất ngập mặn ven biển',
        progress: 76,
        note: 'Địa chất ven biển bồi tụ tự nhiên'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Thị trấn Cần Thạnh, Huyện Cần Giờ, khu vực Huyện Cần Giờ',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Theo dõi triều cường ven biển',
        desc: 'Trạm vi khí hậu tự động Thị trấn Cần Thạnh, Huyện Cần Giờ',
        level: 'warning',
        actionAdvice: 'Kiểm tra mức triều buổi chiều trước khi ra các bến cảng.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Tiềm năng kinh tế biển & logistics xanh',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Bảo tồn sinh thái ven biển & hải đảo',
      wasteStatus: {
        pollution: 'Kiểm soát tốt rác biển',
        sorting: 'Đã triển khai 84% hộ dân',
        collection: 'Tần suất 1 lượt/ngày',
        wasteToFuel: 'Đạt 52% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Thị trấn Cần Thạnh, Huyện Cần Giờ',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-cc-annhontay': {
    id: 'hcm-cc-annhontay',
    name: 'Xã An Nhơn Tây, Huyện Củ Chi',
    subTitle: 'Đền tưởng niệm Bến Dược & Di tích Địa đạo Củ Chi',
    districtGroup: 'Huyện Củ Chi',
    adminType: 'xã',
    lat: 11.085,
    lng: 106.512,
    weather: {
      temp: '32°C',
      condition: 'nắng dịu',
      description: 'Xã An Nhơn Tây, Huyện Củ Chi - Độ ẩm 73%, gió 9km/h, vi khí hậu ổn định',
      humidity: '73%',
      altitude: '21 m',
      uvIndex: 'UV 6.9',
      uvLevel: 'Trung bình',
      lightIntensity: '771 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 37,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 143,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 53,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 30,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 78',
        quality: 'Rất tốt',
        progress: 78,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 6.9',
        quality: 'Trung bình',
        progress: 69,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Xã An Nhơn Tây, Huyện Củ Chi, khu vực Huyện Củ Chi',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã An Nhơn Tây, Huyện Củ Chi',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 85% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 53% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã An Nhơn Tây, Huyện Củ Chi',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-cc-anphu': {
    id: 'hcm-cc-anphu',
    name: 'Xã An Phú, Huyện Củ Chi',
    subTitle: 'Khu bảo tồn sinh thái động vật hoang dã Củ Chi',
    districtGroup: 'Huyện Củ Chi',
    adminType: 'xã',
    lat: 11.135,
    lng: 106.541,
    weather: {
      temp: '30°C',
      condition: 'nắng nhẹ',
      description: 'Xã An Phú, Huyện Củ Chi - Độ ẩm 74%, gió 10km/h, vi khí hậu ổn định',
      humidity: '74%',
      altitude: '22 m',
      uvIndex: 'UV 7.2',
      uvLevel: 'Cao',
      lightIntensity: '788 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 38,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 144,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 54,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 31,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 79',
        quality: 'Rất tốt',
        progress: 79,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 7.2',
        quality: 'Trung bình',
        progress: 72,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Xã An Phú, Huyện Củ Chi, khu vực Huyện Củ Chi',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã An Phú, Huyện Củ Chi',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 86% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 54% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã An Phú, Huyện Củ Chi',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-cc-binhmy': {
    id: 'hcm-cc-binhmy',
    name: 'Xã Bình Mỹ, Huyện Củ Chi',
    subTitle: 'Vùng đệm cây ăn trái sinh thái ven sông Sài Gòn',
    districtGroup: 'Huyện Củ Chi',
    adminType: 'xã',
    lat: 10.942,
    lng: 106.649,
    weather: {
      temp: '31°C',
      condition: 'mây rải rác',
      description: 'Xã Bình Mỹ, Huyện Củ Chi - Độ ẩm 75%, gió 11km/h, vi khí hậu ổn định',
      humidity: '75%',
      altitude: '23 m',
      uvIndex: 'UV 7.5',
      uvLevel: 'Cao',
      lightIntensity: '805 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 39,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 145,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 55,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 32,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 80',
        quality: 'Rất tốt',
        progress: 80,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 7.5',
        quality: 'Trung bình',
        progress: 75,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Xã Bình Mỹ, Huyện Củ Chi, khu vực Huyện Củ Chi',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã Bình Mỹ, Huyện Củ Chi',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 87% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 55% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Bình Mỹ, Huyện Củ Chi',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-cc-hoaphu': {
    id: 'hcm-cc-hoaphu',
    name: 'Xã Hòa Phú, Huyện Củ Chi',
    subTitle: 'Khu công nghiệp Đông Nam ứng dụng công nghệ cao',
    districtGroup: 'Huyện Củ Chi',
    adminType: 'xã',
    lat: 10.985,
    lng: 106.632,
    weather: {
      temp: '32°C',
      condition: 'nắng dịu',
      description: 'Xã Hòa Phú, Huyện Củ Chi - Độ ẩm 76%, gió 12km/h, vi khí hậu ổn định',
      humidity: '76%',
      altitude: '24 m',
      uvIndex: 'UV 7.8',
      uvLevel: 'Cao',
      lightIntensity: '822 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 40,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 146,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 56,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 33,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 81',
        quality: 'Rất tốt',
        progress: 81,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 7.8',
        quality: 'Trung bình',
        progress: 78,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Xã Hòa Phú, Huyện Củ Chi, khu vực Huyện Củ Chi',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã Hòa Phú, Huyện Củ Chi',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 88% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 56% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Hòa Phú, Huyện Củ Chi',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-cc-nhuanduc': {
    id: 'hcm-cc-nhuanduc',
    name: 'Xã Nhuận Đức, Huyện Củ Chi',
    subTitle: 'Nông trại sinh thái bò sữa & vườn rau hữu cơ sạch',
    districtGroup: 'Huyện Củ Chi',
    adminType: 'xã',
    lat: 11.042,
    lng: 106.535,
    weather: {
      temp: '30°C',
      condition: 'nắng nhẹ',
      description: 'Xã Nhuận Đức, Huyện Củ Chi - Độ ẩm 77%, gió 13km/h, vi khí hậu ổn định',
      humidity: '77%',
      altitude: '25 m',
      uvIndex: 'UV 8.1',
      uvLevel: 'Cao',
      lightIntensity: '839 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 41,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 147,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 57,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 34,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 82',
        quality: 'Rất tốt',
        progress: 82,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 8.1',
        quality: 'Trung bình',
        progress: 81,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Xã Nhuận Đức, Huyện Củ Chi, khu vực Huyện Củ Chi',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã Nhuận Đức, Huyện Củ Chi',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 89% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 57% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Nhuận Đức, Huyện Củ Chi',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-cc-phamvancoi': {
    id: 'hcm-cc-phamvancoi',
    name: 'Xã Phạm Văn Cội, Huyện Củ Chi',
    subTitle: 'Khu Nông nghiệp Công nghệ cao TP.HCM trọng điểm',
    districtGroup: 'Huyện Củ Chi',
    adminType: 'xã',
    lat: 11.065,
    lng: 106.568,
    weather: {
      temp: '31°C',
      condition: 'mây rải rác',
      description: 'Xã Phạm Văn Cội, Huyện Củ Chi - Độ ẩm 78%, gió 14km/h, vi khí hậu ổn định',
      humidity: '78%',
      altitude: '26 m',
      uvIndex: 'UV 8.4',
      uvLevel: 'Cao',
      lightIntensity: '606 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 42,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 148,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 58,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 35,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 83',
        quality: 'Rất tốt',
        progress: 83,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 8.4',
        quality: 'Trung bình',
        progress: 84,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Xã Phạm Văn Cội, Huyện Củ Chi, khu vực Huyện Củ Chi',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã Phạm Văn Cội, Huyện Củ Chi',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 90% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 58% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Phạm Văn Cội, Huyện Củ Chi',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-cc-phuhoadong': {
    id: 'hcm-cc-phuhoadong',
    name: 'Xã Phú Hòa Đông, Huyện Củ Chi',
    subTitle: 'Làng nghề bánh tráng truyền thống Phú Hòa Đông',
    districtGroup: 'Huyện Củ Chi',
    adminType: 'xã',
    lat: 11.025,
    lng: 106.602,
    weather: {
      temp: '32°C',
      condition: 'nắng dịu',
      description: 'Xã Phú Hòa Đông, Huyện Củ Chi - Độ ẩm 79%, gió 8km/h, vi khí hậu ổn định',
      humidity: '79%',
      altitude: '27 m',
      uvIndex: 'UV 8.7',
      uvLevel: 'Cao',
      lightIntensity: '623 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 43,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 149,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 59,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 36,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 84',
        quality: 'Rất tốt',
        progress: 84,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 8.7',
        quality: 'Trung bình',
        progress: 87,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Xã Phú Hòa Đông, Huyện Củ Chi, khu vực Huyện Củ Chi',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã Phú Hòa Đông, Huyện Củ Chi',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 91% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 59% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Phú Hòa Đông, Huyện Củ Chi',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-cc-phumyhung': {
    id: 'hcm-cc-phumyhung',
    name: 'Xã Phú Mỹ Hưng, Huyện Củ Chi',
    subTitle: 'Rừng phòng hộ đầu nguồn sông Sài Gòn',
    districtGroup: 'Huyện Củ Chi',
    adminType: 'xã',
    lat: 11.148,
    lng: 106.498,
    weather: {
      temp: '30°C',
      condition: 'nắng nhẹ',
      description: 'Xã Phú Mỹ Hưng, Huyện Củ Chi - Độ ẩm 72%, gió 9km/h, vi khí hậu ổn định',
      humidity: '72%',
      altitude: '16 m',
      uvIndex: 'UV 5.0',
      uvLevel: 'Thấp',
      lightIntensity: '640 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 44,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 110,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 60,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 25,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 70',
        quality: 'Khá tốt',
        progress: 70,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 5.0',
        quality: 'Tốt',
        progress: 50,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Xã Phú Mỹ Hưng, Huyện Củ Chi, khu vực Huyện Củ Chi',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã Phú Mỹ Hưng, Huyện Củ Chi',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 92% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 60% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Phú Mỹ Hưng, Huyện Củ Chi',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-cc-tananhoi': {
    id: 'hcm-cc-tananhoi',
    name: 'Xã Tân An Hội, Huyện Củ Chi',
    subTitle: 'Khu công nghiệp Tây Bắc Củ Chi xanh',
    districtGroup: 'Huyện Củ Chi',
    adminType: 'xã',
    lat: 10.965,
    lng: 106.482,
    weather: {
      temp: '31°C',
      condition: 'mây rải rác',
      description: 'Xã Tân An Hội, Huyện Củ Chi - Độ ẩm 73%, gió 10km/h, vi khí hậu ổn định',
      humidity: '73%',
      altitude: '17 m',
      uvIndex: 'UV 5.3',
      uvLevel: 'Trung bình',
      lightIntensity: '657 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 45,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 111,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 61,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 26,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 71',
        quality: 'Khá tốt',
        progress: 71,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 5.3',
        quality: 'Tốt',
        progress: 53,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Xã Tân An Hội, Huyện Củ Chi, khu vực Huyện Củ Chi',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã Tân An Hội, Huyện Củ Chi',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 93% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 61% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Tân An Hội, Huyện Củ Chi',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-cc-tanphutrung': {
    id: 'hcm-cc-tanphutrung',
    name: 'Xã Tân Phú Trung, Huyện Củ Chi',
    subTitle: 'KCN Tân Phú Trung & Bệnh viện Xuyên Á cửa ngõ',
    districtGroup: 'Huyện Củ Chi',
    adminType: 'xã',
    lat: 10.925,
    lng: 106.542,
    weather: {
      temp: '32°C',
      condition: 'nắng dịu',
      description: 'Xã Tân Phú Trung, Huyện Củ Chi - Độ ẩm 74%, gió 11km/h, vi khí hậu ổn định',
      humidity: '74%',
      altitude: '18 m',
      uvIndex: 'UV 5.6',
      uvLevel: 'Trung bình',
      lightIntensity: '674 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 46,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 112,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 62,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 27,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 72',
        quality: 'Khá tốt',
        progress: 72,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 5.6',
        quality: 'Trung bình',
        progress: 56,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Xã Tân Phú Trung, Huyện Củ Chi, khu vực Huyện Củ Chi',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã Tân Phú Trung, Huyện Củ Chi',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 94% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 62% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Tân Phú Trung, Huyện Củ Chi',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-cc-tanthanhdong': {
    id: 'hcm-cc-tanthanhdong',
    name: 'Xã Tân Thạnh Đông, Huyện Củ Chi',
    subTitle: 'Vùng chuyên canh nông nghiệp bò sữa hữu cơ',
    districtGroup: 'Huyện Củ Chi',
    adminType: 'xã',
    lat: 10.961,
    lng: 106.589,
    weather: {
      temp: '30°C',
      condition: 'nắng nhẹ',
      description: 'Xã Tân Thạnh Đông, Huyện Củ Chi - Độ ẩm 75%, gió 12km/h, vi khí hậu ổn định',
      humidity: '75%',
      altitude: '19 m',
      uvIndex: 'UV 5.9',
      uvLevel: 'Trung bình',
      lightIntensity: '691 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 47,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 113,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 63,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 28,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 73',
        quality: 'Khá tốt',
        progress: 73,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 5.9',
        quality: 'Trung bình',
        progress: 59,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Xã Tân Thạnh Đông, Huyện Củ Chi, khu vực Huyện Củ Chi',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã Tân Thạnh Đông, Huyện Củ Chi',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 95% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 63% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Tân Thạnh Đông, Huyện Củ Chi',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-cc-tanthanhtay': {
    id: 'hcm-cc-tanthanhtay',
    name: 'Xã Tân Thạnh Tây, Huyện Củ Chi',
    subTitle: 'Khu vực Tỉnh lộ 8 kết nối vùng kinh tế Đông Nam Bộ',
    districtGroup: 'Huyện Củ Chi',
    adminType: 'xã',
    lat: 10.995,
    lng: 106.572,
    weather: {
      temp: '31°C',
      condition: 'mây rải rác',
      description: 'Xã Tân Thạnh Tây, Huyện Củ Chi - Độ ẩm 76%, gió 13km/h, vi khí hậu ổn định',
      humidity: '76%',
      altitude: '20 m',
      uvIndex: 'UV 6.2',
      uvLevel: 'Trung bình',
      lightIntensity: '708 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 48,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 114,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 64,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 29,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 74',
        quality: 'Khá tốt',
        progress: 74,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 6.2',
        quality: 'Trung bình',
        progress: 62,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Xã Tân Thạnh Tây, Huyện Củ Chi, khu vực Huyện Củ Chi',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã Tân Thạnh Tây, Huyện Củ Chi',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 96% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 64% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Tân Thạnh Tây, Huyện Củ Chi',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-cc-tanthonghoi': {
    id: 'hcm-cc-tanthonghoi',
    name: 'Xã Tân Thông Hội, Huyện Củ Chi',
    subTitle: 'Xã nông thôn mới kiểu mẫu đầu tiên của TP.HCM',
    districtGroup: 'Huyện Củ Chi',
    adminType: 'xã',
    lat: 10.942,
    lng: 106.518,
    weather: {
      temp: '32°C',
      condition: 'nắng dịu',
      description: 'Xã Tân Thông Hội, Huyện Củ Chi - Độ ẩm 77%, gió 14km/h, vi khí hậu ổn định',
      humidity: '77%',
      altitude: '21 m',
      uvIndex: 'UV 6.5',
      uvLevel: 'Trung bình',
      lightIntensity: '725 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 49,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 115,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 65,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 30,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 75',
        quality: 'Rất tốt',
        progress: 75,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 6.5',
        quality: 'Trung bình',
        progress: 65,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Xã Tân Thông Hội, Huyện Củ Chi, khu vực Huyện Củ Chi',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã Tân Thông Hội, Huyện Củ Chi',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 97% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 40% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Tân Thông Hội, Huyện Củ Chi',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-cc-thaimy': {
    id: 'hcm-cc-thaimy',
    name: 'Xã Thái Mỹ, Huyện Củ Chi',
    subTitle: 'Làng nghề đan lát mây tre truyền thống ven kênh',
    districtGroup: 'Huyện Củ Chi',
    adminType: 'xã',
    lat: 10.992,
    lng: 106.415,
    weather: {
      temp: '30°C',
      condition: 'nắng nhẹ',
      description: 'Xã Thái Mỹ, Huyện Củ Chi - Độ ẩm 78%, gió 8km/h, vi khí hậu ổn định',
      humidity: '78%',
      altitude: '22 m',
      uvIndex: 'UV 6.8',
      uvLevel: 'Trung bình',
      lightIntensity: '742 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 32,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 116,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 48,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 31,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 76',
        quality: 'Rất tốt',
        progress: 76,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 6.8',
        quality: 'Trung bình',
        progress: 68,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Xã Thái Mỹ, Huyện Củ Chi, khu vực Huyện Củ Chi',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã Thái Mỹ, Huyện Củ Chi',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 80% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 41% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Thái Mỹ, Huyện Củ Chi',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-cc-trungan': {
    id: 'hcm-cc-trungan',
    name: 'Xã Trung An, Huyện Củ Chi',
    subTitle: 'Vườn sinh thái chôm chôm, măng cụt ven sông Sài Gòn',
    districtGroup: 'Huyện Củ Chi',
    adminType: 'xã',
    lat: 11.018,
    lng: 106.638,
    weather: {
      temp: '31°C',
      condition: 'mây rải rác',
      description: 'Xã Trung An, Huyện Củ Chi - Độ ẩm 79%, gió 9km/h, vi khí hậu ổn định',
      humidity: '79%',
      altitude: '23 m',
      uvIndex: 'UV 7.1',
      uvLevel: 'Cao',
      lightIntensity: '759 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 33,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 117,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 49,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 32,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 77',
        quality: 'Rất tốt',
        progress: 77,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 7.1',
        quality: 'Trung bình',
        progress: 71,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Xã Trung An, Huyện Củ Chi, khu vực Huyện Củ Chi',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã Trung An, Huyện Củ Chi',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 81% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 42% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Trung An, Huyện Củ Chi',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-cc-trunglaph': {
    id: 'hcm-cc-trunglaph',
    name: 'Xã Trung Lập Hạ, Huyện Củ Chi',
    subTitle: 'Cánh đồng lúa hữu cơ & hệ thống kênh Đông thủy lợi',
    districtGroup: 'Huyện Củ Chi',
    adminType: 'xã',
    lat: 11.022,
    lng: 106.468,
    weather: {
      temp: '32°C',
      condition: 'nắng dịu',
      description: 'Xã Trung Lập Hạ, Huyện Củ Chi - Độ ẩm 72%, gió 10km/h, vi khí hậu ổn định',
      humidity: '72%',
      altitude: '24 m',
      uvIndex: 'UV 7.4',
      uvLevel: 'Cao',
      lightIntensity: '776 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 34,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 118,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 50,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 33,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 78',
        quality: 'Rất tốt',
        progress: 78,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 7.4',
        quality: 'Trung bình',
        progress: 74,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Xã Trung Lập Hạ, Huyện Củ Chi, khu vực Huyện Củ Chi',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã Trung Lập Hạ, Huyện Củ Chi',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 82% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 43% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Trung Lập Hạ, Huyện Củ Chi',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-cc-trunglapt': {
    id: 'hcm-cc-trunglapt',
    name: 'Xã Trung Lập Thượng, Huyện Củ Chi',
    subTitle: 'Rừng tràm sinh thái & vùng chuyên canh sen',
    districtGroup: 'Huyện Củ Chi',
    adminType: 'xã',
    lat: 11.068,
    lng: 106.442,
    weather: {
      temp: '30°C',
      condition: 'nắng nhẹ',
      description: 'Xã Trung Lập Thượng, Huyện Củ Chi - Độ ẩm 73%, gió 11km/h, vi khí hậu ổn định',
      humidity: '73%',
      altitude: '25 m',
      uvIndex: 'UV 7.7',
      uvLevel: 'Cao',
      lightIntensity: '793 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 35,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 119,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 51,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 34,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 79',
        quality: 'Rất tốt',
        progress: 79,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 7.7',
        quality: 'Trung bình',
        progress: 77,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Xã Trung Lập Thượng, Huyện Củ Chi, khu vực Huyện Củ Chi',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã Trung Lập Thượng, Huyện Củ Chi',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 83% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 44% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Trung Lập Thượng, Huyện Củ Chi',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-cc-phuochiep': {
    id: 'hcm-cc-phuochiep',
    name: 'Xã Phước Hiệp, Huyện Củ Chi',
    subTitle: 'Khu du lịch nông nghiệp trải nghiệm sinh thái',
    districtGroup: 'Huyện Củ Chi',
    adminType: 'xã',
    lat: 10.985,
    lng: 106.452,
    weather: {
      temp: '31°C',
      condition: 'mây rải rác',
      description: 'Xã Phước Hiệp, Huyện Củ Chi - Độ ẩm 74%, gió 12km/h, vi khí hậu ổn định',
      humidity: '74%',
      altitude: '26 m',
      uvIndex: 'UV 8.0',
      uvLevel: 'Cao',
      lightIntensity: '810 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 36,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 120,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 52,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 35,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 80',
        quality: 'Rất tốt',
        progress: 80,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 8.0',
        quality: 'Trung bình',
        progress: 80,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Xã Phước Hiệp, Huyện Củ Chi, khu vực Huyện Củ Chi',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã Phước Hiệp, Huyện Củ Chi',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 84% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 45% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Phước Hiệp, Huyện Củ Chi',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-cc-phuocthanh': {
    id: 'hcm-cc-phuocthanh',
    name: 'Xã Phước Thạnh, Huyện Củ Chi',
    subTitle: 'Vùng trồng dưa lưới, rau quả VietGAP ứng dụng IoT',
    districtGroup: 'Huyện Củ Chi',
    adminType: 'xã',
    lat: 11.015,
    lng: 106.425,
    weather: {
      temp: '32°C',
      condition: 'nắng dịu',
      description: 'Xã Phước Thạnh, Huyện Củ Chi - Độ ẩm 75%, gió 13km/h, vi khí hậu ổn định',
      humidity: '75%',
      altitude: '27 m',
      uvIndex: 'UV 8.3',
      uvLevel: 'Cao',
      lightIntensity: '827 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 37,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 121,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 53,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 36,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 81',
        quality: 'Rất tốt',
        progress: 81,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 8.3',
        quality: 'Trung bình',
        progress: 83,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Xã Phước Thạnh, Huyện Củ Chi, khu vực Huyện Củ Chi',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã Phước Thạnh, Huyện Củ Chi',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 85% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 46% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Phước Thạnh, Huyện Củ Chi',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-cc-phuocvinhan': {
    id: 'hcm-cc-phuocvinhan',
    name: 'Xã Phước Vĩnh An, Huyện Củ Chi',
    subTitle: 'Khu dân cư nông thôn sinh thái xanh thanh bình',
    districtGroup: 'Huyện Củ Chi',
    adminType: 'xã',
    lat: 10.971,
    lng: 106.529,
    weather: {
      temp: '30°C',
      condition: 'nắng nhẹ',
      description: 'Xã Phước Vĩnh An, Huyện Củ Chi - Độ ẩm 76%, gió 14km/h, vi khí hậu ổn định',
      humidity: '76%',
      altitude: '16 m',
      uvIndex: 'UV 8.6',
      uvLevel: 'Cao',
      lightIntensity: '844 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 38,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 122,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 54,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 25,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 82',
        quality: 'Rất tốt',
        progress: 82,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 8.6',
        quality: 'Trung bình',
        progress: 86,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Xã Phước Vĩnh An, Huyện Củ Chi, khu vực Huyện Củ Chi',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã Phước Vĩnh An, Huyện Củ Chi',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 86% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 47% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Phước Vĩnh An, Huyện Củ Chi',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-hm-badiem': {
    id: 'hcm-hm-badiem',
    name: 'Xã Bà Điểm, Huyện Hóc Môn',
    subTitle: 'Di tích Ngã Ba Giồng & vườn cau Bà Điểm lịch sử',
    districtGroup: 'Huyện Hóc Môn',
    adminType: 'xã',
    lat: 10.835,
    lng: 106.602,
    weather: {
      temp: '31°C',
      condition: 'mây rải rác',
      description: 'Xã Bà Điểm, Huyện Hóc Môn - Độ ẩm 77%, gió 8km/h, vi khí hậu ổn định',
      humidity: '77%',
      altitude: '17 m',
      uvIndex: 'UV 8.9',
      uvLevel: 'Cao',
      lightIntensity: '611 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 39,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 123,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 55,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 26,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 83',
        quality: 'Rất tốt',
        progress: 83,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 8.9',
        quality: 'Trung bình',
        progress: 89,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Xã Bà Điểm, Huyện Hóc Môn, khu vực Huyện Hóc Môn',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã Bà Điểm, Huyện Hóc Môn',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 87% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 48% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Bà Điểm, Huyện Hóc Môn',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-hm-dongthanh': {
    id: 'hcm-hm-dongthanh',
    name: 'Xã Đông Thạnh, Huyện Hóc Môn',
    subTitle: 'Cánh đồng hoa mai & cây kiểng ven sông Sài Gòn',
    districtGroup: 'Huyện Hóc Môn',
    adminType: 'xã',
    lat: 10.895,
    lng: 106.658,
    weather: {
      temp: '32°C',
      condition: 'nắng dịu',
      description: 'Xã Đông Thạnh, Huyện Hóc Môn - Độ ẩm 78%, gió 9km/h, vi khí hậu ổn định',
      humidity: '78%',
      altitude: '18 m',
      uvIndex: 'UV 5.2',
      uvLevel: 'Trung bình',
      lightIntensity: '628 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 40,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 124,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 56,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 27,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 84',
        quality: 'Rất tốt',
        progress: 84,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 5.2',
        quality: 'Tốt',
        progress: 52,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Xã Đông Thạnh, Huyện Hóc Môn, khu vực Huyện Hóc Môn',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã Đông Thạnh, Huyện Hóc Môn',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 88% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 49% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Đông Thạnh, Huyện Hóc Môn',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-hm-nhibinh': {
    id: 'hcm-hm-nhibinh',
    name: 'Xã Nhị Bình, Huyện Hóc Môn',
    subTitle: 'Bán đảo du lịch sinh thái sông nước Nhị Bình',
    districtGroup: 'Huyện Hóc Môn',
    adminType: 'xã',
    lat: 10.912,
    lng: 106.678,
    weather: {
      temp: '30°C',
      condition: 'nắng nhẹ',
      description: 'Xã Nhị Bình, Huyện Hóc Môn - Độ ẩm 79%, gió 10km/h, vi khí hậu ổn định',
      humidity: '79%',
      altitude: '19 m',
      uvIndex: 'UV 5.5',
      uvLevel: 'Trung bình',
      lightIntensity: '645 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 41,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 125,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 57,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 28,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 70',
        quality: 'Khá tốt',
        progress: 70,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 5.5',
        quality: 'Tốt',
        progress: 55,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Xã Nhị Bình, Huyện Hóc Môn, khu vực Huyện Hóc Môn',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã Nhị Bình, Huyện Hóc Môn',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 89% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 50% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Nhị Bình, Huyện Hóc Môn',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-hm-tanhiep': {
    id: 'hcm-hm-tanhiep',
    name: 'Xã Tân Hiệp, Huyện Hóc Môn',
    subTitle: 'Nhà máy nước sạch Tân Hiệp nguồn nước an toàn',
    districtGroup: 'Huyện Hóc Môn',
    adminType: 'xã',
    lat: 10.902,
    lng: 106.565,
    weather: {
      temp: '31°C',
      condition: 'mây rải rác',
      description: 'Xã Tân Hiệp, Huyện Hóc Môn - Độ ẩm 72%, gió 11km/h, vi khí hậu ổn định',
      humidity: '72%',
      altitude: '20 m',
      uvIndex: 'UV 5.8',
      uvLevel: 'Trung bình',
      lightIntensity: '662 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 42,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 126,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 58,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 29,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 71',
        quality: 'Khá tốt',
        progress: 71,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 5.8',
        quality: 'Trung bình',
        progress: 58,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Xã Tân Hiệp, Huyện Hóc Môn, khu vực Huyện Hóc Môn',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã Tân Hiệp, Huyện Hóc Môn',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 90% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 51% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Tân Hiệp, Huyện Hóc Môn',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-hm-tanthoinhi': {
    id: 'hcm-hm-tanthoinhi',
    name: 'Xã Tân Thới Nhì, Huyện Hóc Môn',
    subTitle: 'Chùa Hoằng Pháp & không gian tâm linh sinh thái',
    districtGroup: 'Huyện Hóc Môn',
    adminType: 'xã',
    lat: 10.898,
    lng: 106.552,
    weather: {
      temp: '32°C',
      condition: 'nắng dịu',
      description: 'Xã Tân Thới Nhì, Huyện Hóc Môn - Độ ẩm 73%, gió 12km/h, vi khí hậu ổn định',
      humidity: '73%',
      altitude: '21 m',
      uvIndex: 'UV 6.1',
      uvLevel: 'Trung bình',
      lightIntensity: '679 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 43,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 127,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 59,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 30,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 72',
        quality: 'Khá tốt',
        progress: 72,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 6.1',
        quality: 'Trung bình',
        progress: 61,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Xã Tân Thới Nhì, Huyện Hóc Môn, khu vực Huyện Hóc Môn',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã Tân Thới Nhì, Huyện Hóc Môn',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 91% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 52% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Tân Thới Nhì, Huyện Hóc Môn',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-hm-tanxuan': {
    id: 'hcm-hm-tanxuan',
    name: 'Xã Tân Xuân, Huyện Hóc Môn',
    subTitle: 'Chợ đầu mối nông sản thực phẩm Hóc Môn lớn nhất',
    districtGroup: 'Huyện Hóc Môn',
    adminType: 'xã',
    lat: 10.875,
    lng: 106.605,
    weather: {
      temp: '30°C',
      condition: 'nắng nhẹ',
      description: 'Xã Tân Xuân, Huyện Hóc Môn - Độ ẩm 74%, gió 13km/h, vi khí hậu ổn định',
      humidity: '74%',
      altitude: '22 m',
      uvIndex: 'UV 6.4',
      uvLevel: 'Trung bình',
      lightIntensity: '696 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 44,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 128,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 60,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 31,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 73',
        quality: 'Khá tốt',
        progress: 73,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 6.4',
        quality: 'Trung bình',
        progress: 64,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Xã Tân Xuân, Huyện Hóc Môn, khu vực Huyện Hóc Môn',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã Tân Xuân, Huyện Hóc Môn',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 92% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 53% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Tân Xuân, Huyện Hóc Môn',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-hm-thoitamt hon': {
    id: 'hcm-hm-thoitamt hon',
    name: 'Xã Thới Tam Thôn, Huyện Hóc Môn',
    subTitle: 'Vùng rau an toàn VietGAP truyền thống',
    districtGroup: 'Huyện Hóc Môn',
    adminType: 'xã',
    lat: 10.881,
    lng: 106.621,
    weather: {
      temp: '31°C',
      condition: 'mây rải rác',
      description: 'Xã Thới Tam Thôn, Huyện Hóc Môn - Độ ẩm 75%, gió 14km/h, vi khí hậu ổn định',
      humidity: '75%',
      altitude: '23 m',
      uvIndex: 'UV 6.7',
      uvLevel: 'Trung bình',
      lightIntensity: '713 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 45,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 129,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 61,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 32,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 74',
        quality: 'Khá tốt',
        progress: 74,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 6.7',
        quality: 'Trung bình',
        progress: 67,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Xã Thới Tam Thôn, Huyện Hóc Môn, khu vực Huyện Hóc Môn',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã Thới Tam Thôn, Huyện Hóc Môn',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 93% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 54% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Thới Tam Thôn, Huyện Hóc Môn',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-hm-trungchanh': {
    id: 'hcm-hm-trungchanh',
    name: 'Xã Trung Chánh, Huyện Hóc Môn',
    subTitle: 'Khu đô thị ngã tư Trung Chánh kết nối cửa ngõ',
    districtGroup: 'Huyện Hóc Môn',
    adminType: 'xã',
    lat: 10.852,
    lng: 106.615,
    weather: {
      temp: '32°C',
      condition: 'nắng dịu',
      description: 'Xã Trung Chánh, Huyện Hóc Môn - Độ ẩm 76%, gió 8km/h, vi khí hậu ổn định',
      humidity: '76%',
      altitude: '24 m',
      uvIndex: 'UV 7.0',
      uvLevel: 'Trung bình',
      lightIntensity: '730 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 46,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 130,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 62,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 33,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 75',
        quality: 'Rất tốt',
        progress: 75,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 7.0',
        quality: 'Trung bình',
        progress: 70,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Xã Trung Chánh, Huyện Hóc Môn, khu vực Huyện Hóc Môn',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã Trung Chánh, Huyện Hóc Môn',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 94% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 55% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Trung Chánh, Huyện Hóc Môn',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-hm-xuanthoidong': {
    id: 'hcm-hm-xuanthoidong',
    name: 'Xã Xuân Thới Đông, Huyện Hóc Môn',
    subTitle: 'Trục Quốc lộ 22 & làng nghề mộc mỹ nghệ',
    districtGroup: 'Huyện Hóc Môn',
    adminType: 'xã',
    lat: 10.865,
    lng: 106.582,
    weather: {
      temp: '30°C',
      condition: 'nắng nhẹ',
      description: 'Xã Xuân Thới Đông, Huyện Hóc Môn - Độ ẩm 77%, gió 9km/h, vi khí hậu ổn định',
      humidity: '77%',
      altitude: '25 m',
      uvIndex: 'UV 7.3',
      uvLevel: 'Cao',
      lightIntensity: '747 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 47,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 131,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 63,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 34,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 76',
        quality: 'Rất tốt',
        progress: 76,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 7.3',
        quality: 'Trung bình',
        progress: 73,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Xã Xuân Thới Đông, Huyện Hóc Môn, khu vực Huyện Hóc Môn',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã Xuân Thới Đông, Huyện Hóc Môn',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 95% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 56% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Xuân Thới Đông, Huyện Hóc Môn',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-hm-xuanthoidon': {
    id: 'hcm-hm-xuanthoidon',
    name: 'Xã Xuân Thới Sơn, Huyện Hóc Môn',
    subTitle: 'Kênh An Hạ điều hòa môi trường sinh thái',
    districtGroup: 'Huyện Hóc Môn',
    adminType: 'xã',
    lat: 10.875,
    lng: 106.562,
    weather: {
      temp: '31°C',
      condition: 'mây rải rác',
      description: 'Xã Xuân Thới Sơn, Huyện Hóc Môn - Độ ẩm 78%, gió 10km/h, vi khí hậu ổn định',
      humidity: '78%',
      altitude: '26 m',
      uvIndex: 'UV 7.6',
      uvLevel: 'Cao',
      lightIntensity: '764 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 48,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 132,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 64,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 35,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 77',
        quality: 'Rất tốt',
        progress: 77,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 7.6',
        quality: 'Trung bình',
        progress: 76,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Xã Xuân Thới Sơn, Huyện Hóc Môn, khu vực Huyện Hóc Môn',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã Xuân Thới Sơn, Huyện Hóc Môn',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 96% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 57% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Xuân Thới Sơn, Huyện Hóc Môn',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-hm-xuanthoithuong': {
    id: 'hcm-hm-xuanthoithuong',
    name: 'Xã Xuân Thới Thượng, Huyện Hóc Môn',
    subTitle: 'Công viên tưởng niệm Ngã Ba Giồng rợp bóng cây xanh',
    districtGroup: 'Huyện Hóc Môn',
    adminType: 'xã',
    lat: 10.849,
    lng: 106.565,
    weather: {
      temp: '32°C',
      condition: 'nắng dịu',
      description: 'Xã Xuân Thới Thượng, Huyện Hóc Môn - Độ ẩm 79%, gió 11km/h, vi khí hậu ổn định',
      humidity: '79%',
      altitude: '27 m',
      uvIndex: 'UV 7.9',
      uvLevel: 'Cao',
      lightIntensity: '781 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 49,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 133,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 65,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 36,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 78',
        quality: 'Rất tốt',
        progress: 78,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 7.9',
        quality: 'Trung bình',
        progress: 79,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Xã Xuân Thới Thượng, Huyện Hóc Môn, khu vực Huyện Hóc Môn',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã Xuân Thới Thượng, Huyện Hóc Môn',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 97% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 58% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Xuân Thới Thượng, Huyện Hóc Môn',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-bc-anphutay': {
    id: 'hcm-bc-anphutay',
    name: 'Xã An Phú Tây, Huyện Bình Chánh',
    subTitle: 'Cửa ngõ ga đường sắt tốc độ cao tương lai',
    districtGroup: 'Huyện Bình Chánh',
    adminType: 'xã',
    lat: 10.682,
    lng: 106.592,
    weather: {
      temp: '30°C',
      condition: 'nắng nhẹ',
      description: 'Xã An Phú Tây, Huyện Bình Chánh - Độ ẩm 72%, gió 12km/h, vi khí hậu ổn định',
      humidity: '72%',
      altitude: '16 m',
      uvIndex: 'UV 8.2',
      uvLevel: 'Cao',
      lightIntensity: '798 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 32,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 134,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 48,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 25,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 79',
        quality: 'Rất tốt',
        progress: 79,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 8.2',
        quality: 'Trung bình',
        progress: 82,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Xã An Phú Tây, Huyện Bình Chánh, khu vực Huyện Bình Chánh',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã An Phú Tây, Huyện Bình Chánh',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 80% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 59% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã An Phú Tây, Huyện Bình Chánh',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-bc-binhchanh': {
    id: 'hcm-bc-binhchanh',
    name: 'Xã Bình Chánh, Huyện Bình Chánh',
    subTitle: 'Chợ Bình Chánh & Quốc lộ 1A kết nối Tây Nam Bộ',
    districtGroup: 'Huyện Bình Chánh',
    adminType: 'xã',
    lat: 10.665,
    lng: 106.558,
    weather: {
      temp: '31°C',
      condition: 'mây rải rác',
      description: 'Xã Bình Chánh, Huyện Bình Chánh - Độ ẩm 73%, gió 13km/h, vi khí hậu ổn định',
      humidity: '73%',
      altitude: '17 m',
      uvIndex: 'UV 8.5',
      uvLevel: 'Cao',
      lightIntensity: '815 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 33,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 135,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 49,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 26,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 80',
        quality: 'Rất tốt',
        progress: 80,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 8.5',
        quality: 'Trung bình',
        progress: 85,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Xã Bình Chánh, Huyện Bình Chánh, khu vực Huyện Bình Chánh',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã Bình Chánh, Huyện Bình Chánh',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 81% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 60% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Bình Chánh, Huyện Bình Chánh',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-bc-binhhung': {
    id: 'hcm-bc-binhhung',
    name: 'Xã Bình Hưng, Huyện Bình Chánh',
    subTitle: 'Khu đô thị Trung Sơn & Mizuki Park sông nước hữu tình',
    districtGroup: 'Huyện Bình Chánh',
    adminType: 'xã',
    lat: 10.725,
    lng: 106.672,
    weather: {
      temp: '32°C',
      condition: 'nắng dịu',
      description: 'Xã Bình Hưng, Huyện Bình Chánh - Độ ẩm 74%, gió 14km/h, vi khí hậu ổn định',
      humidity: '74%',
      altitude: '18 m',
      uvIndex: 'UV 8.8',
      uvLevel: 'Cao',
      lightIntensity: '832 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 34,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 136,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 50,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 27,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 81',
        quality: 'Rất tốt',
        progress: 81,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 8.8',
        quality: 'Trung bình',
        progress: 88,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Xã Bình Hưng, Huyện Bình Chánh, khu vực Huyện Bình Chánh',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã Bình Hưng, Huyện Bình Chánh',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 82% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 61% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Bình Hưng, Huyện Bình Chánh',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-bc-binhloi': {
    id: 'hcm-bc-binhloi',
    name: 'Xã Bình Lợi, Huyện Bình Chánh',
    subTitle: 'Làng mai vàng Bình Lợi trù phú lớn nhất miền Nam',
    districtGroup: 'Huyện Bình Chánh',
    adminType: 'xã',
    lat: 10.742,
    lng: 106.495,
    weather: {
      temp: '30°C',
      condition: 'nắng nhẹ',
      description: 'Xã Bình Lợi, Huyện Bình Chánh - Độ ẩm 75%, gió 8km/h, vi khí hậu ổn định',
      humidity: '75%',
      altitude: '19 m',
      uvIndex: 'UV 5.1',
      uvLevel: 'Trung bình',
      lightIntensity: '849 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 35,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 137,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 51,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 28,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 82',
        quality: 'Rất tốt',
        progress: 82,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 5.1',
        quality: 'Tốt',
        progress: 51,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Xã Bình Lợi, Huyện Bình Chánh, khu vực Huyện Bình Chánh',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã Bình Lợi, Huyện Bình Chánh',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 83% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 62% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Bình Lợi, Huyện Bình Chánh',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-bc-daphuoc': {
    id: 'hcm-bc-daphuoc',
    name: 'Xã Đa Phước, Huyện Bình Chánh',
    subTitle: 'Khu liên hợp xử lý chất thải công nghệ hiện đại Đa Phước',
    districtGroup: 'Huyện Bình Chánh',
    adminType: 'xã',
    lat: 10.668,
    lng: 106.645,
    weather: {
      temp: '31°C',
      condition: 'mây rải rác',
      description: 'Xã Đa Phước, Huyện Bình Chánh - Độ ẩm 76%, gió 9km/h, vi khí hậu ổn định',
      humidity: '76%',
      altitude: '20 m',
      uvIndex: 'UV 5.4',
      uvLevel: 'Trung bình',
      lightIntensity: '616 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 36,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 138,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 52,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 29,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 83',
        quality: 'Rất tốt',
        progress: 83,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 5.4',
        quality: 'Tốt',
        progress: 54,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Xã Đa Phước, Huyện Bình Chánh, khu vực Huyện Bình Chánh',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã Đa Phước, Huyện Bình Chánh',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 84% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 63% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Đa Phước, Huyện Bình Chánh',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-bc-hunglong': {
    id: 'hcm-bc-hunglong',
    name: 'Xã Hưng Long, Huyện Bình Chánh',
    subTitle: 'Vùng trũng sinh thái canh tác nông nghiệp công nghệ cao',
    districtGroup: 'Huyện Bình Chánh',
    adminType: 'xã',
    lat: 10.635,
    lng: 106.582,
    weather: {
      temp: '32°C',
      condition: 'nắng dịu',
      description: 'Xã Hưng Long, Huyện Bình Chánh - Độ ẩm 77%, gió 10km/h, vi khí hậu ổn định',
      humidity: '77%',
      altitude: '21 m',
      uvIndex: 'UV 5.7',
      uvLevel: 'Trung bình',
      lightIntensity: '633 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 37,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 139,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 53,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 30,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 84',
        quality: 'Rất tốt',
        progress: 84,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 5.7',
        quality: 'Trung bình',
        progress: 57,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Xã Hưng Long, Huyện Bình Chánh, khu vực Huyện Bình Chánh',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã Hưng Long, Huyện Bình Chánh',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 85% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 64% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Hưng Long, Huyện Bình Chánh',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-bc-leminhxuan': {
    id: 'hcm-bc-leminhxuan',
    name: 'Xã Lê Minh Xuân, Huyện Bình Chánh',
    subTitle: 'Khu công nghiệp sinh thái Lê Minh Xuân & Kênh Xáng',
    districtGroup: 'Huyện Bình Chánh',
    adminType: 'xã',
    lat: 10.741,
    lng: 106.529,
    weather: {
      temp: '30°C',
      condition: 'nắng nhẹ',
      description: 'Xã Lê Minh Xuân, Huyện Bình Chánh - Độ ẩm 78%, gió 11km/h, vi khí hậu ổn định',
      humidity: '78%',
      altitude: '22 m',
      uvIndex: 'UV 6.0',
      uvLevel: 'Trung bình',
      lightIntensity: '650 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 38,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 140,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 54,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 31,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 70',
        quality: 'Khá tốt',
        progress: 70,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 6.0',
        quality: 'Trung bình',
        progress: 60,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Xã Lê Minh Xuân, Huyện Bình Chánh, khu vực Huyện Bình Chánh',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã Lê Minh Xuân, Huyện Bình Chánh',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 55,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 86% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 40% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Lê Minh Xuân, Huyện Bình Chánh',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-bc-phamvanhai': {
    id: 'hcm-bc-phamvanhai',
    name: 'Xã Phạm Văn Hai, Huyện Bình Chánh',
    subTitle: 'Cánh đồng thơm tràm sinh thái & vùng đệm xanh',
    districtGroup: 'Huyện Bình Chánh',
    adminType: 'xã',
    lat: 10.785,
    lng: 106.518,
    weather: {
      temp: '31°C',
      condition: 'mây rải rác',
      description: 'Xã Phạm Văn Hai, Huyện Bình Chánh - Độ ẩm 79%, gió 12km/h, vi khí hậu ổn định',
      humidity: '79%',
      altitude: '23 m',
      uvIndex: 'UV 6.3',
      uvLevel: 'Trung bình',
      lightIntensity: '667 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 39,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 141,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 55,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 32,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 71',
        quality: 'Khá tốt',
        progress: 71,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 6.3',
        quality: 'Trung bình',
        progress: 63,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Xã Phạm Văn Hai, Huyện Bình Chánh, khu vực Huyện Bình Chánh',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã Phạm Văn Hai, Huyện Bình Chánh',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 87% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 41% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Phạm Văn Hai, Huyện Bình Chánh',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-bc-phongphu': {
    id: 'hcm-bc-phongphu',
    name: 'Xã Phong Phú, Huyện Bình Chánh',
    subTitle: 'Khu đô thị xanh Lovera Park & Làng đại học phía Nam',
    districtGroup: 'Huyện Bình Chánh',
    adminType: 'xã',
    lat: 10.702,
    lng: 106.652,
    weather: {
      temp: '32°C',
      condition: 'nắng dịu',
      description: 'Xã Phong Phú, Huyện Bình Chánh - Độ ẩm 72%, gió 13km/h, vi khí hậu ổn định',
      humidity: '72%',
      altitude: '24 m',
      uvIndex: 'UV 6.6',
      uvLevel: 'Trung bình',
      lightIntensity: '684 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 40,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 142,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 56,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 33,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 72',
        quality: 'Khá tốt',
        progress: 72,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 6.6',
        quality: 'Trung bình',
        progress: 66,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Xã Phong Phú, Huyện Bình Chánh, khu vực Huyện Bình Chánh',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã Phong Phú, Huyện Bình Chánh',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 88% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 42% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Phong Phú, Huyện Bình Chánh',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-bc-quyduc': {
    id: 'hcm-bc-quyduc',
    name: 'Xã Quy Đức, Huyện Bình Chánh',
    subTitle: 'Vùng đồng quê yên bình giáp ranh Long An',
    districtGroup: 'Huyện Bình Chánh',
    adminType: 'xã',
    lat: 10.628,
    lng: 106.615,
    weather: {
      temp: '30°C',
      condition: 'nắng nhẹ',
      description: 'Xã Quy Đức, Huyện Bình Chánh - Độ ẩm 73%, gió 14km/h, vi khí hậu ổn định',
      humidity: '73%',
      altitude: '25 m',
      uvIndex: 'UV 6.9',
      uvLevel: 'Trung bình',
      lightIntensity: '701 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 41,
        status: 'Hệ thủy sinh kênh rạch phong phú',
        highlights: [
          'Cá lóc đồng, tép trấu, cá trê',
          'Bèo tấm, lục bình, rau ngổ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 143,
        status: 'Vườn cây ăn trái & sinh thái hữu cơ',
        highlights: [
          'Cây ăn trái, tre điền trúc, cau cảnh',
          'Bướm nhiệt đới, chuồn chuồn kim',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 57,
        status: 'Ổn định theo mùa',
        highlights: [
          'Chim sâu, tu hú, chích chòe',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 34,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Ếch đồng, nhái bén, cóc tía',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 73',
        quality: 'Khá tốt',
        progress: 73,
        note: 'Hàm lượng oxy hòa tan đạt chuẩn tưới tiêu sinh học'
      },
      light: {
        value: 'UV: 6.9',
        quality: 'Trung bình',
        progress: 69,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Phù sa màu mỡ',
        progress: 82,
        note: 'Tầng đất xốp giàu mùn phù sa'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Xã Quy Đức, Huyện Bình Chánh, khu vực Huyện Bình Chánh',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường đạt chuẩn an toàn',
        desc: 'Trạm vi khí hậu tự động Xã Quy Đức, Huyện Bình Chánh',
        level: 'info',
        actionAdvice: 'Chất lượng không khí và môi trường nước nằm trong ngưỡng an toàn cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Phát triển nông nghiệp công nghệ cao & sinh thái',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Khu vực nông thôn sinh thái xanh',
      wasteStatus: {
        pollution: 'Không gian sinh thái thông thoáng',
        sorting: 'Đã triển khai 89% hộ dân',
        collection: 'Tần suất 2 lượt/ngày',
        wasteToFuel: 'Đạt 43% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Quy Đức, Huyện Bình Chánh',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-nb-hiepphuoc': {
    id: 'hcm-nb-hiepphuoc',
    name: 'Xã Hiệp Phước, Huyện Nhà Bè',
    subTitle: 'Khu đô thị Cảng Hiệp Phước vươn ra biển Đông',
    districtGroup: 'Huyện Nhà Bè',
    adminType: 'xã',
    lat: 10.625,
    lng: 106.762,
    weather: {
      temp: '30°C',
      condition: 'mây rải rác',
      description: 'Xã Hiệp Phước, Huyện Nhà Bè - Độ ẩm 82%, gió 8km/h, vi khí hậu ổn định',
      humidity: '82%',
      altitude: '5 m',
      uvIndex: 'UV 7.2',
      uvLevel: 'Cao',
      lightIntensity: '718 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 49,
        status: 'Đa dạng sinh học ven biển cao',
        highlights: [
          'Cá đối, cá bống thòi lòi, nghêu lụa',
          'Rừng đước, mắm ngập mặn ven bờ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 94,
        status: 'Rừng phòng hộ sinh quyển',
        highlights: [
          'Đước đôi, vẹt đen, bần trắng',
          'Khỉ đuôi dài, sóc đất, chồn hương',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 69,
        status: 'Ổn định theo mùa',
        highlights: [
          'Cò trắng, bồ nông chân xám, bói cá',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 32,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cua đá, cá thòi lòi leo cây',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 88',
        quality: 'Rất tốt',
        progress: 88,
        note: 'Độ mặn tự nhiên cân bằng, giàu phù sa ven biển'
      },
      light: {
        value: 'UV: 7.2',
        quality: 'Trung bình',
        progress: 72,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Đất ngập mặn ven biển',
        progress: 76,
        note: 'Địa chất ven biển bồi tụ tự nhiên'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Xã Hiệp Phước, Huyện Nhà Bè, khu vực Huyện Nhà Bè',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Theo dõi triều cường ven biển',
        desc: 'Trạm vi khí hậu tự động Xã Hiệp Phước, Huyện Nhà Bè',
        level: 'warning',
        actionAdvice: 'Kiểm tra mức triều buổi chiều trước khi ra các bến cảng.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Tiềm năng kinh tế biển & logistics xanh',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Bảo tồn sinh thái ven biển & hải đảo',
      wasteStatus: {
        pollution: 'Kiểm soát tốt rác biển',
        sorting: 'Đã triển khai 90% hộ dân',
        collection: 'Tần suất 1 lượt/ngày',
        wasteToFuel: 'Đạt 44% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Hiệp Phước, Huyện Nhà Bè',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-nb-longthoi': {
    id: 'hcm-nb-longthoi',
    name: 'Xã Long Thới, Huyện Nhà Bè',
    subTitle: 'Khu công nghiệp Hiệp Phước & trường Quốc tế AIS',
    districtGroup: 'Huyện Nhà Bè',
    adminType: 'xã',
    lat: 10.655,
    lng: 106.745,
    weather: {
      temp: '31°C',
      condition: 'nắng dịu',
      description: 'Xã Long Thới, Huyện Nhà Bè - Độ ẩm 83%, gió 9km/h, vi khí hậu ổn định',
      humidity: '83%',
      altitude: '6 m',
      uvIndex: 'UV 7.5',
      uvLevel: 'Cao',
      lightIntensity: '735 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 50,
        status: 'Đa dạng sinh học ven biển cao',
        highlights: [
          'Cá đối, cá bống thòi lòi, nghêu lụa',
          'Rừng đước, mắm ngập mặn ven bờ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 95,
        status: 'Rừng phòng hộ sinh quyển',
        highlights: [
          'Đước đôi, vẹt đen, bần trắng',
          'Khỉ đuôi dài, sóc đất, chồn hương',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 70,
        status: 'Ổn định theo mùa',
        highlights: [
          'Cò trắng, bồ nông chân xám, bói cá',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 33,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cua đá, cá thòi lòi leo cây',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 89',
        quality: 'Rất tốt',
        progress: 89,
        note: 'Độ mặn tự nhiên cân bằng, giàu phù sa ven biển'
      },
      light: {
        value: 'UV: 7.5',
        quality: 'Trung bình',
        progress: 75,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Đất ngập mặn ven biển',
        progress: 76,
        note: 'Địa chất ven biển bồi tụ tự nhiên'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Xã Long Thới, Huyện Nhà Bè, khu vực Huyện Nhà Bè',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Theo dõi triều cường ven biển',
        desc: 'Trạm vi khí hậu tự động Xã Long Thới, Huyện Nhà Bè',
        level: 'warning',
        actionAdvice: 'Kiểm tra mức triều buổi chiều trước khi ra các bến cảng.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Tiềm năng kinh tế biển & logistics xanh',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Bảo tồn sinh thái ven biển & hải đảo',
      wasteStatus: {
        pollution: 'Kiểm soát tốt rác biển',
        sorting: 'Đã triển khai 91% hộ dân',
        collection: 'Tần suất 1 lượt/ngày',
        wasteToFuel: 'Đạt 45% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Long Thới, Huyện Nhà Bè',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-nb-nhonduc': {
    id: 'hcm-nb-nhonduc',
    name: 'Xã Nhơn Đức, Huyện Nhà Bè',
    subTitle: 'Đại đô thị thông minh GS Metrocity Zeitgeist',
    districtGroup: 'Huyện Nhà Bè',
    adminType: 'xã',
    lat: 10.662,
    lng: 106.708,
    weather: {
      temp: '29°C',
      condition: 'nắng nhẹ',
      description: 'Xã Nhơn Đức, Huyện Nhà Bè - Độ ẩm 84%, gió 10km/h, vi khí hậu ổn định',
      humidity: '84%',
      altitude: '3 m',
      uvIndex: 'UV 7.8',
      uvLevel: 'Cao',
      lightIntensity: '752 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 51,
        status: 'Đa dạng sinh học ven biển cao',
        highlights: [
          'Cá đối, cá bống thòi lòi, nghêu lụa',
          'Rừng đước, mắm ngập mặn ven bờ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 96,
        status: 'Rừng phòng hộ sinh quyển',
        highlights: [
          'Đước đôi, vẹt đen, bần trắng',
          'Khỉ đuôi dài, sóc đất, chồn hương',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 71,
        status: 'Ổn định theo mùa',
        highlights: [
          'Cò trắng, bồ nông chân xám, bói cá',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 34,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cua đá, cá thòi lòi leo cây',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 78',
        quality: 'Rất tốt',
        progress: 78,
        note: 'Độ mặn tự nhiên cân bằng, giàu phù sa ven biển'
      },
      light: {
        value: 'UV: 7.8',
        quality: 'Trung bình',
        progress: 78,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Đất ngập mặn ven biển',
        progress: 76,
        note: 'Địa chất ven biển bồi tụ tự nhiên'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Xã Nhơn Đức, Huyện Nhà Bè, khu vực Huyện Nhà Bè',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Theo dõi triều cường ven biển',
        desc: 'Trạm vi khí hậu tự động Xã Nhơn Đức, Huyện Nhà Bè',
        level: 'warning',
        actionAdvice: 'Kiểm tra mức triều buổi chiều trước khi ra các bến cảng.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Tiềm năng kinh tế biển & logistics xanh',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Bảo tồn sinh thái ven biển & hải đảo',
      wasteStatus: {
        pollution: 'Kiểm soát tốt rác biển',
        sorting: 'Đã triển khai 92% hộ dân',
        collection: 'Tần suất 1 lượt/ngày',
        wasteToFuel: 'Đạt 46% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Nhơn Đức, Huyện Nhà Bè',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-nb-phuxuan': {
    id: 'hcm-nb-phuxuan',
    name: 'Xã Phú Xuân, Huyện Nhà Bè',
    subTitle: 'Trung tâm hành chính huyện Nhà Bè ven sông Mương Chuối',
    districtGroup: 'Huyện Nhà Bè',
    adminType: 'xã',
    lat: 10.685,
    lng: 106.732,
    weather: {
      temp: '30°C',
      condition: 'mây rải rác',
      description: 'Xã Phú Xuân, Huyện Nhà Bè - Độ ẩm 85%, gió 11km/h, vi khí hậu ổn định',
      humidity: '85%',
      altitude: '4 m',
      uvIndex: 'UV 8.1',
      uvLevel: 'Cao',
      lightIntensity: '769 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 52,
        status: 'Đa dạng sinh học ven biển cao',
        highlights: [
          'Cá đối, cá bống thòi lòi, nghêu lụa',
          'Rừng đước, mắm ngập mặn ven bờ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 97,
        status: 'Rừng phòng hộ sinh quyển',
        highlights: [
          'Đước đôi, vẹt đen, bần trắng',
          'Khỉ đuôi dài, sóc đất, chồn hương',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 72,
        status: 'Ổn định theo mùa',
        highlights: [
          'Cò trắng, bồ nông chân xám, bói cá',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 35,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cua đá, cá thòi lòi leo cây',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 79',
        quality: 'Rất tốt',
        progress: 79,
        note: 'Độ mặn tự nhiên cân bằng, giàu phù sa ven biển'
      },
      light: {
        value: 'UV: 8.1',
        quality: 'Trung bình',
        progress: 81,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Đất ngập mặn ven biển',
        progress: 76,
        note: 'Địa chất ven biển bồi tụ tự nhiên'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Xã Phú Xuân, Huyện Nhà Bè, khu vực Huyện Nhà Bè',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Theo dõi triều cường ven biển',
        desc: 'Trạm vi khí hậu tự động Xã Phú Xuân, Huyện Nhà Bè',
        level: 'warning',
        actionAdvice: 'Kiểm tra mức triều buổi chiều trước khi ra các bến cảng.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Tiềm năng kinh tế biển & logistics xanh',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Bảo tồn sinh thái ven biển & hải đảo',
      wasteStatus: {
        pollution: 'Kiểm soát tốt rác biển',
        sorting: 'Đã triển khai 93% hộ dân',
        collection: 'Tần suất 1 lượt/ngày',
        wasteToFuel: 'Đạt 47% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Phú Xuân, Huyện Nhà Bè',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-nb-phuockien': {
    id: 'hcm-nb-phuockien',
    name: 'Xã Phước Kiển, Huyện Nhà Bè',
    subTitle: 'Khu đô thị sinh thái kết nối đại lộ Nguyễn Hữu Thọ',
    districtGroup: 'Huyện Nhà Bè',
    adminType: 'xã',
    lat: 10.715,
    lng: 106.712,
    weather: {
      temp: '31°C',
      condition: 'nắng dịu',
      description: 'Xã Phước Kiển, Huyện Nhà Bè - Độ ẩm 86%, gió 12km/h, vi khí hậu ổn định',
      humidity: '86%',
      altitude: '5 m',
      uvIndex: 'UV 8.4',
      uvLevel: 'Cao',
      lightIntensity: '786 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 53,
        status: 'Đa dạng sinh học ven biển cao',
        highlights: [
          'Cá đối, cá bống thòi lòi, nghêu lụa',
          'Rừng đước, mắm ngập mặn ven bờ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 98,
        status: 'Rừng phòng hộ sinh quyển',
        highlights: [
          'Đước đôi, vẹt đen, bần trắng',
          'Khỉ đuôi dài, sóc đất, chồn hương',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 73,
        status: 'Ổn định theo mùa',
        highlights: [
          'Cò trắng, bồ nông chân xám, bói cá',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 36,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cua đá, cá thòi lòi leo cây',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 80',
        quality: 'Rất tốt',
        progress: 80,
        note: 'Độ mặn tự nhiên cân bằng, giàu phù sa ven biển'
      },
      light: {
        value: 'UV: 8.4',
        quality: 'Trung bình',
        progress: 84,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Đất ngập mặn ven biển',
        progress: 76,
        note: 'Địa chất ven biển bồi tụ tự nhiên'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Xã Phước Kiển, Huyện Nhà Bè, khu vực Huyện Nhà Bè',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Theo dõi triều cường ven biển',
        desc: 'Trạm vi khí hậu tự động Xã Phước Kiển, Huyện Nhà Bè',
        level: 'warning',
        actionAdvice: 'Kiểm tra mức triều buổi chiều trước khi ra các bến cảng.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Tiềm năng kinh tế biển & logistics xanh',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Bảo tồn sinh thái ven biển & hải đảo',
      wasteStatus: {
        pollution: 'Kiểm soát tốt rác biển',
        sorting: 'Đã triển khai 94% hộ dân',
        collection: 'Tần suất 1 lượt/ngày',
        wasteToFuel: 'Đạt 48% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Phước Kiển, Huyện Nhà Bè',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-nb-phuocloc': {
    id: 'hcm-nb-phuocloc',
    name: 'Xã Phước Lộc, Huyện Nhà Bè',
    subTitle: 'Vùng trũng sinh thái ngập mặn tự nhiên sông Cần Giuộc',
    districtGroup: 'Huyện Nhà Bè',
    adminType: 'xã',
    lat: 10.688,
    lng: 106.692,
    weather: {
      temp: '29°C',
      condition: 'nắng nhẹ',
      description: 'Xã Phước Lộc, Huyện Nhà Bè - Độ ẩm 87%, gió 13km/h, vi khí hậu ổn định',
      humidity: '87%',
      altitude: '6 m',
      uvIndex: 'UV 8.7',
      uvLevel: 'Cao',
      lightIntensity: '803 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 54,
        status: 'Đa dạng sinh học ven biển cao',
        highlights: [
          'Cá đối, cá bống thòi lòi, nghêu lụa',
          'Rừng đước, mắm ngập mặn ven bờ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 99,
        status: 'Rừng phòng hộ sinh quyển',
        highlights: [
          'Đước đôi, vẹt đen, bần trắng',
          'Khỉ đuôi dài, sóc đất, chồn hương',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 74,
        status: 'Ổn định theo mùa',
        highlights: [
          'Cò trắng, bồ nông chân xám, bói cá',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 37,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cua đá, cá thòi lòi leo cây',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 81',
        quality: 'Rất tốt',
        progress: 81,
        note: 'Độ mặn tự nhiên cân bằng, giàu phù sa ven biển'
      },
      light: {
        value: 'UV: 8.7',
        quality: 'Trung bình',
        progress: 87,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Đất ngập mặn ven biển',
        progress: 76,
        note: 'Địa chất ven biển bồi tụ tự nhiên'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Xã Phước Lộc, Huyện Nhà Bè, khu vực Huyện Nhà Bè',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Theo dõi triều cường ven biển',
        desc: 'Trạm vi khí hậu tự động Xã Phước Lộc, Huyện Nhà Bè',
        level: 'warning',
        actionAdvice: 'Kiểm tra mức triều buổi chiều trước khi ra các bến cảng.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Tiềm năng kinh tế biển & logistics xanh',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Bảo tồn sinh thái ven biển & hải đảo',
      wasteStatus: {
        pollution: 'Kiểm soát tốt rác biển',
        sorting: 'Đã triển khai 95% hộ dân',
        collection: 'Tần suất 1 lượt/ngày',
        wasteToFuel: 'Đạt 49% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Phước Lộc, Huyện Nhà Bè',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-cg-anthoidong': {
    id: 'hcm-cg-anthoidong',
    name: 'Xã An Thới Đông, Huyện Cần Giờ',
    subTitle: 'Vùng đệm Khu dự trữ sinh quyển thế giới Rừng ngập mặn',
    districtGroup: 'Huyện Cần Giờ',
    adminType: 'xã',
    lat: 10.535,
    lng: 106.845,
    weather: {
      temp: '30°C',
      condition: 'mây rải rác',
      description: 'Xã An Thới Đông, Huyện Cần Giờ - Độ ẩm 78%, gió 14km/h, vi khí hậu ổn định',
      humidity: '78%',
      altitude: '3 m',
      uvIndex: 'UV 5.0',
      uvLevel: 'Thấp',
      lightIntensity: '820 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 55,
        status: 'Đa dạng sinh học ven biển cao',
        highlights: [
          'Cá đối, cá bống thòi lòi, nghêu lụa',
          'Rừng đước, mắm ngập mặn ven bờ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 100,
        status: 'Rừng phòng hộ sinh quyển',
        highlights: [
          'Đước đôi, vẹt đen, bần trắng',
          'Khỉ đuôi dài, sóc đất, chồn hương',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 55,
        status: 'Ổn định theo mùa',
        highlights: [
          'Cò trắng, bồ nông chân xám, bói cá',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 38,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cua đá, cá thòi lòi leo cây',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 82',
        quality: 'Rất tốt',
        progress: 82,
        note: 'Độ mặn tự nhiên cân bằng, giàu phù sa ven biển'
      },
      light: {
        value: 'UV: 5.0',
        quality: 'Tốt',
        progress: 50,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Đất ngập mặn ven biển',
        progress: 76,
        note: 'Địa chất ven biển bồi tụ tự nhiên'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Xã An Thới Đông, Huyện Cần Giờ, khu vực Huyện Cần Giờ',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Theo dõi triều cường ven biển',
        desc: 'Trạm vi khí hậu tự động Xã An Thới Đông, Huyện Cần Giờ',
        level: 'warning',
        actionAdvice: 'Kiểm tra mức triều buổi chiều trước khi ra các bến cảng.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Tiềm năng kinh tế biển & logistics xanh',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Bảo tồn sinh thái ven biển & hải đảo',
      wasteStatus: {
        pollution: 'Kiểm soát tốt rác biển',
        sorting: 'Đã triển khai 96% hộ dân',
        collection: 'Tần suất 1 lượt/ngày',
        wasteToFuel: 'Đạt 50% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã An Thới Đông, Huyện Cần Giờ',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-cg-binhkhanh': {
    id: 'hcm-cg-binhkhanh',
    name: 'Xã Bình Khánh, Huyện Cần Giờ',
    subTitle: 'Bến phà Bình Khánh kết nối tương lai cầu Cần Giờ',
    districtGroup: 'Huyện Cần Giờ',
    adminType: 'xã',
    lat: 10.672,
    lng: 106.782,
    weather: {
      temp: '31°C',
      condition: 'nắng dịu',
      description: 'Xã Bình Khánh, Huyện Cần Giờ - Độ ẩm 79%, gió 8km/h, vi khí hậu ổn định',
      humidity: '79%',
      altitude: '4 m',
      uvIndex: 'UV 5.3',
      uvLevel: 'Trung bình',
      lightIntensity: '837 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 56,
        status: 'Đa dạng sinh học ven biển cao',
        highlights: [
          'Cá đối, cá bống thòi lòi, nghêu lụa',
          'Rừng đước, mắm ngập mặn ven bờ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 101,
        status: 'Rừng phòng hộ sinh quyển',
        highlights: [
          'Đước đôi, vẹt đen, bần trắng',
          'Khỉ đuôi dài, sóc đất, chồn hương',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 56,
        status: 'Ổn định theo mùa',
        highlights: [
          'Cò trắng, bồ nông chân xám, bói cá',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 39,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cua đá, cá thòi lòi leo cây',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 83',
        quality: 'Rất tốt',
        progress: 83,
        note: 'Độ mặn tự nhiên cân bằng, giàu phù sa ven biển'
      },
      light: {
        value: 'UV: 5.3',
        quality: 'Tốt',
        progress: 53,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Đất ngập mặn ven biển',
        progress: 76,
        note: 'Địa chất ven biển bồi tụ tự nhiên'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Xã Bình Khánh, Huyện Cần Giờ, khu vực Huyện Cần Giờ',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Theo dõi triều cường ven biển',
        desc: 'Trạm vi khí hậu tự động Xã Bình Khánh, Huyện Cần Giờ',
        level: 'warning',
        actionAdvice: 'Kiểm tra mức triều buổi chiều trước khi ra các bến cảng.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Tiềm năng kinh tế biển & logistics xanh',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Bảo tồn sinh thái ven biển & hải đảo',
      wasteStatus: {
        pollution: 'Kiểm soát tốt rác biển',
        sorting: 'Đã triển khai 97% hộ dân',
        collection: 'Tần suất 1 lượt/ngày',
        wasteToFuel: 'Đạt 51% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Bình Khánh, Huyện Cần Giờ',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-cg-longhoa': {
    id: 'hcm-cg-longhoa',
    name: 'Xã Long Hòa, Huyện Cần Giờ',
    subTitle: 'Bãi biển Ba Mươi Tháng Tư & khu du lịch 30/4',
    districtGroup: 'Huyện Cần Giờ',
    adminType: 'xã',
    lat: 10.445,
    lng: 106.912,
    weather: {
      temp: '29°C',
      condition: 'nắng nhẹ',
      description: 'Xã Long Hòa, Huyện Cần Giờ - Độ ẩm 80%, gió 9km/h, vi khí hậu ổn định',
      humidity: '80%',
      altitude: '5 m',
      uvIndex: 'UV 5.6',
      uvLevel: 'Trung bình',
      lightIntensity: '604 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 57,
        status: 'Đa dạng sinh học ven biển cao',
        highlights: [
          'Cá đối, cá bống thòi lòi, nghêu lụa',
          'Rừng đước, mắm ngập mặn ven bờ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 102,
        status: 'Rừng phòng hộ sinh quyển',
        highlights: [
          'Đước đôi, vẹt đen, bần trắng',
          'Khỉ đuôi dài, sóc đất, chồn hương',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 57,
        status: 'Ổn định theo mùa',
        highlights: [
          'Cò trắng, bồ nông chân xám, bói cá',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 40,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cua đá, cá thòi lòi leo cây',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 84',
        quality: 'Rất tốt',
        progress: 84,
        note: 'Độ mặn tự nhiên cân bằng, giàu phù sa ven biển'
      },
      light: {
        value: 'UV: 5.6',
        quality: 'Trung bình',
        progress: 56,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Đất ngập mặn ven biển',
        progress: 76,
        note: 'Địa chất ven biển bồi tụ tự nhiên'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Xã Long Hòa, Huyện Cần Giờ, khu vực Huyện Cần Giờ',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Theo dõi triều cường ven biển',
        desc: 'Trạm vi khí hậu tự động Xã Long Hòa, Huyện Cần Giờ',
        level: 'warning',
        actionAdvice: 'Kiểm tra mức triều buổi chiều trước khi ra các bến cảng.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Tiềm năng kinh tế biển & logistics xanh',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Bảo tồn sinh thái ven biển & hải đảo',
      wasteStatus: {
        pollution: 'Kiểm soát tốt rác biển',
        sorting: 'Đã triển khai 80% hộ dân',
        collection: 'Tần suất 1 lượt/ngày',
        wasteToFuel: 'Đạt 52% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Long Hòa, Huyện Cần Giờ',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-cg-lynhon': {
    id: 'hcm-cg-lynhon',
    name: 'Xã Lý Nhơn, Huyện Cần Giờ',
    subTitle: 'Vựa muối trắng Cần Giờ & đầm nuôi tôm sinh thái sạch',
    districtGroup: 'Huyện Cần Giờ',
    adminType: 'xã',
    lat: 10.485,
    lng: 106.775,
    weather: {
      temp: '30°C',
      condition: 'mây rải rác',
      description: 'Xã Lý Nhơn, Huyện Cần Giờ - Độ ẩm 81%, gió 10km/h, vi khí hậu ổn định',
      humidity: '81%',
      altitude: '6 m',
      uvIndex: 'UV 5.9',
      uvLevel: 'Trung bình',
      lightIntensity: '621 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 58,
        status: 'Đa dạng sinh học ven biển cao',
        highlights: [
          'Cá đối, cá bống thòi lòi, nghêu lụa',
          'Rừng đước, mắm ngập mặn ven bờ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 103,
        status: 'Rừng phòng hộ sinh quyển',
        highlights: [
          'Đước đôi, vẹt đen, bần trắng',
          'Khỉ đuôi dài, sóc đất, chồn hương',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 58,
        status: 'Ổn định theo mùa',
        highlights: [
          'Cò trắng, bồ nông chân xám, bói cá',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 41,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cua đá, cá thòi lòi leo cây',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 85',
        quality: 'Rất tốt',
        progress: 85,
        note: 'Độ mặn tự nhiên cân bằng, giàu phù sa ven biển'
      },
      light: {
        value: 'UV: 5.9',
        quality: 'Trung bình',
        progress: 59,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Đất ngập mặn ven biển',
        progress: 76,
        note: 'Địa chất ven biển bồi tụ tự nhiên'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Xã Lý Nhơn, Huyện Cần Giờ, khu vực Huyện Cần Giờ',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Theo dõi triều cường ven biển',
        desc: 'Trạm vi khí hậu tự động Xã Lý Nhơn, Huyện Cần Giờ',
        level: 'warning',
        actionAdvice: 'Kiểm tra mức triều buổi chiều trước khi ra các bến cảng.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Tiềm năng kinh tế biển & logistics xanh',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Bảo tồn sinh thái ven biển & hải đảo',
      wasteStatus: {
        pollution: 'Kiểm soát tốt rác biển',
        sorting: 'Đã triển khai 81% hộ dân',
        collection: 'Tần suất 1 lượt/ngày',
        wasteToFuel: 'Đạt 53% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Lý Nhơn, Huyện Cần Giờ',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-cg-tamthonhiep': {
    id: 'hcm-cg-tamthonhiep',
    name: 'Xã Tam Thôn Hiệp, Huyện Cần Giờ',
    subTitle: 'Khu bảo tồn động vật hoang dã & nghề nuôi yến sào',
    districtGroup: 'Huyện Cần Giờ',
    adminType: 'xã',
    lat: 10.595,
    lng: 106.882,
    weather: {
      temp: '31°C',
      condition: 'nắng dịu',
      description: 'Xã Tam Thôn Hiệp, Huyện Cần Giờ - Độ ẩm 82%, gió 11km/h, vi khí hậu ổn định',
      humidity: '82%',
      altitude: '3 m',
      uvIndex: 'UV 6.2',
      uvLevel: 'Trung bình',
      lightIntensity: '638 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 59,
        status: 'Đa dạng sinh học ven biển cao',
        highlights: [
          'Cá đối, cá bống thòi lòi, nghêu lụa',
          'Rừng đước, mắm ngập mặn ven bờ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 104,
        status: 'Rừng phòng hộ sinh quyển',
        highlights: [
          'Đước đôi, vẹt đen, bần trắng',
          'Khỉ đuôi dài, sóc đất, chồn hương',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 59,
        status: 'Ổn định theo mùa',
        highlights: [
          'Cò trắng, bồ nông chân xám, bói cá',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 42,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cua đá, cá thòi lòi leo cây',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 86',
        quality: 'Rất tốt',
        progress: 86,
        note: 'Độ mặn tự nhiên cân bằng, giàu phù sa ven biển'
      },
      light: {
        value: 'UV: 6.2',
        quality: 'Trung bình',
        progress: 62,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Đất ngập mặn ven biển',
        progress: 76,
        note: 'Địa chất ven biển bồi tụ tự nhiên'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Xã Tam Thôn Hiệp, Huyện Cần Giờ, khu vực Huyện Cần Giờ',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Theo dõi triều cường ven biển',
        desc: 'Trạm vi khí hậu tự động Xã Tam Thôn Hiệp, Huyện Cần Giờ',
        level: 'warning',
        actionAdvice: 'Kiểm tra mức triều buổi chiều trước khi ra các bến cảng.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Tiềm năng kinh tế biển & logistics xanh',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Bảo tồn sinh thái ven biển & hải đảo',
      wasteStatus: {
        pollution: 'Kiểm soát tốt rác biển',
        sorting: 'Đã triển khai 82% hộ dân',
        collection: 'Tần suất 1 lượt/ngày',
        wasteToFuel: 'Đạt 54% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Tam Thôn Hiệp, Huyện Cần Giờ',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-cg-thanhan': {
    id: 'hcm-cg-thanhan',
    name: 'Xã Thạnh An, Huyện Cần Giờ',
    subTitle: 'Xã đảo tiền tiêu Thạnh An giữ nguyên hiện trạng theo Nghị quyết 1685',
    districtGroup: 'Huyện Cần Giờ',
    adminType: 'xã',
    lat: 10.495,
    lng: 106.995,
    weather: {
      temp: '29°C',
      condition: 'nắng nhẹ',
      description: 'Xã Thạnh An, Huyện Cần Giờ - Độ ẩm 83%, gió 12km/h, vi khí hậu ổn định',
      humidity: '83%',
      altitude: '4 m',
      uvIndex: 'UV 6.5',
      uvLevel: 'Trung bình',
      lightIntensity: '655 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 60,
        status: 'Đa dạng sinh học ven biển cao',
        highlights: [
          'Cá đối, cá bống thòi lòi, nghêu lụa',
          'Rừng đước, mắm ngập mặn ven bờ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 105,
        status: 'Rừng phòng hộ sinh quyển',
        highlights: [
          'Đước đôi, vẹt đen, bần trắng',
          'Khỉ đuôi dài, sóc đất, chồn hương',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 60,
        status: 'Ổn định theo mùa',
        highlights: [
          'Cò trắng, bồ nông chân xám, bói cá',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 28,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cua đá, cá thòi lòi leo cây',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 87',
        quality: 'Rất tốt',
        progress: 87,
        note: 'Độ mặn tự nhiên cân bằng, giàu phù sa ven biển'
      },
      light: {
        value: 'UV: 6.5',
        quality: 'Trung bình',
        progress: 65,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Đất ngập mặn ven biển',
        progress: 76,
        note: 'Địa chất ven biển bồi tụ tự nhiên'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Xã Thạnh An, Huyện Cần Giờ, khu vực Huyện Cần Giờ',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Theo dõi triều cường ven biển',
        desc: 'Trạm vi khí hậu tự động Xã Thạnh An, Huyện Cần Giờ',
        level: 'warning',
        actionAdvice: 'Kiểm tra mức triều buổi chiều trước khi ra các bến cảng.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Tiềm năng kinh tế biển & logistics xanh',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Bảo tồn sinh thái ven biển & hải đảo',
      wasteStatus: {
        pollution: 'Kiểm soát tốt rác biển',
        sorting: 'Đã triển khai 83% hộ dân',
        collection: 'Tần suất 1 lượt/ngày',
        wasteToFuel: 'Đạt 55% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Thạnh An, Huyện Cần Giờ',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-vt-longson': {
    id: 'hcm-vt-longson',
    name: 'Xã Long Sơn',
    subTitle: 'Xã đảo sinh thái nuôi hàu & Tổ hợp Hóa dầu Long Sơn',
    districtGroup: 'Vùng phụ cận',
    adminType: 'xã',
    lat: 10.456,
    lng: 107.098,
    weather: {
      temp: '30°C',
      condition: 'mây rải rác',
      description: 'Xã Long Sơn - Độ ẩm 84%, gió 13km/h, vi khí hậu ổn định',
      humidity: '84%',
      altitude: '5 m',
      uvIndex: 'UV 6.8',
      uvLevel: 'Trung bình',
      lightIntensity: '672 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Khí hậu trong lành thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 61,
        status: 'Đa dạng sinh học ven biển cao',
        highlights: [
          'Cá đối, cá bống thòi lòi, nghêu lụa',
          'Rừng đước, mắm ngập mặn ven bờ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 106,
        status: 'Rừng phòng hộ sinh quyển',
        highlights: [
          'Đước đôi, vẹt đen, bần trắng',
          'Khỉ đuôi dài, sóc đất, chồn hương',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 61,
        status: 'Ổn định theo mùa',
        highlights: [
          'Cò trắng, bồ nông chân xám, bói cá',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 29,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cua đá, cá thòi lòi leo cây',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 88',
        quality: 'Rất tốt',
        progress: 88,
        note: 'Độ mặn tự nhiên cân bằng, giàu phù sa ven biển'
      },
      light: {
        value: 'UV: 6.8',
        quality: 'Trung bình',
        progress: 68,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Đất ngập mặn ven biển',
        progress: 76,
        note: 'Địa chất ven biển bồi tụ tự nhiên'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ôn hòa',
        desc: 'Xã Long Sơn, khu vực Vùng phụ cận',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết rất tốt cho sinh hoạt và lao động ngoài trời.'
      },
      environmentAlert: {
        title: 'Theo dõi triều cường ven biển',
        desc: 'Trạm vi khí hậu tự động Xã Long Sơn',
        level: 'warning',
        actionAdvice: 'Kiểm tra mức triều buổi chiều trước khi ra các bến cảng.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Tiềm năng kinh tế biển & logistics xanh',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Bảo tồn sinh thái ven biển & hải đảo',
      wasteStatus: {
        pollution: 'Kiểm soát tốt rác biển',
        sorting: 'Đã triển khai 84% hộ dân',
        collection: 'Tần suất 1 lượt/ngày',
        wasteToFuel: 'Đạt 56% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Xã Long Sơn',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
  'hcm-dac-khu-condao': {
    id: 'hcm-dac-khu-condao',
    name: 'Đặc khu Côn Đảo',
    subTitle: 'Vườn Quốc gia Côn Đảo - Di sản lịch sử & thiên nhiên quốc gia',
    districtGroup: 'Đặc khu Côn Đảo',
    adminType: 'đặc khu',
    lat: 8.6835,
    lng: 106.6075,
    weather: {
      temp: '31°C',
      condition: 'nắng dịu',
      description: 'Đặc khu Côn Đảo - Độ ẩm 85%, gió 14km/h, vi khí hậu ổn định',
      humidity: '85%',
      altitude: '6 m',
      uvIndex: 'UV 7.1',
      uvLevel: 'Cao',
      lightIntensity: '689 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cần che chắn khi ra nắng giữa trưa',
    },
    biodiversity: {
      underwater: {
        count: 62,
        status: 'Đa dạng sinh học ven biển cao',
        highlights: [
          'Cá đối, cá bống thòi lòi, nghêu lụa',
          'Rừng đước, mắm ngập mặn ven bờ',
          'Vi sinh vật tầng bùn hữu cơ'
        ]
      },
      terrestrial: {
        count: 107,
        status: 'Rừng phòng hộ sinh quyển',
        highlights: [
          'Đước đôi, vẹt đen, bần trắng',
          'Khỉ đuôi dài, sóc đất, chồn hương',
          'Thảm thực vật tầng thấp'
        ]
      },
      aerial: {
        count: 62,
        status: 'Ổn định theo mùa',
        highlights: [
          'Cò trắng, bồ nông chân xám, bói cá',
          'Côn trùng có ích thụ phấn hoa',
          'Động vật bay tầng cao'
        ]
      },
      amphibian: {
        count: 30,
        status: 'Bảo tồn tự nhiên',
        highlights: [
          'Cua đá, cá thòi lòi leo cây',
          'Bò sát nhỏ ven nguồn nước',
          'Ấu trùng lưỡng cư tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 89',
        quality: 'Rất tốt',
        progress: 89,
        note: 'Độ mặn tự nhiên cân bằng, giàu phù sa ven biển'
      },
      light: {
        value: 'UV: 7.1',
        quality: 'Trung bình',
        progress: 71,
        note: 'Bức xạ ánh sáng tự nhiên đo đạc từ trạm cảm biến môi trường'
      },
      geology: {
        value: 'Nền ổn định',
        quality: 'Đất ngập mặn ven biển',
        progress: 76,
        note: 'Địa chất ven biển bồi tụ tự nhiên'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Cảnh báo chỉ số UV cao',
        desc: 'Đặc khu Côn Đảo, khu vực Đặc khu Côn Đảo',
        level: 'warning',
        actionAdvice: 'Nên dùng kem chống nắng và kính râm khi di chuyển buổi trưa.'
      },
      environmentAlert: {
        title: 'Theo dõi triều cường ven biển',
        desc: 'Trạm vi khí hậu tự động Đặc khu Côn Đảo',
        level: 'warning',
        actionAdvice: 'Kiểm tra mức triều buổi chiều trước khi ra các bến cảng.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Tiềm năng kinh tế biển & logistics xanh',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng sản xuất kinh doanh giảm phát thải carbon và bảo vệ sinh thái địa phương'
    },
    protection: {
      assessmentTitle: 'Đánh giá tổng quát',
      assessmentSubtitle: 'Bảo tồn sinh thái ven biển & hải đảo',
      wasteStatus: {
        pollution: 'Kiểm soát tốt rác biển',
        sorting: 'Đã triển khai 85% hộ dân',
        collection: 'Tần suất 1 lượt/ngày',
        wasteToFuel: 'Đạt 57% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Chương trình Ngày Chủ Nhật Xanh Đặc khu Côn Đảo',
        campaign: 'Chiến dịch giảm thiểu túi nilon & bảo vệ vi khí hậu'
      }
    }
  },
};
