import { DistrictData } from '../types';

export const BEN_CAT_WARDS_DATA: Record<string, DistrictData> = {
  'hcm-long-nguyen': {
    id: 'hcm-long-nguyen',
    name: 'Phường Long Nguyên',
    subTitle: 'Đô thị công nghiệp sinh thái & nông nghiệp CNC (108 km²)',
    districtGroup: 'Khu vực Bến Cát (Bắc TP.HCM)',
    adminType: 'phường',
    lat: 11.1685,
    lng: 106.5824,
    weather: {
      temp: '32°C',
      condition: 'nắng ráo',
      description: 'Phường Long Nguyên - Độ ẩm 62%, gió 11km/h, cao độ 32m',
      humidity: '62%',
      altitude: '32 m',
      uvIndex: 'UV 5.2',
      uvLevel: 'Trung bình',
      lightIntensity: '620 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Vi khí hậu vùng gò đồi thoáng đãng, chất lượng không khí trong lành',
    },
    biodiversity: {
      underwater: {
        count: 24,
        status: 'Lưu vực sông Thị Tính & suối rạch tự nhiên',
        highlights: [
          'Cá lăng, cá rô đồng sông Thị Tính',
          'Thủy sinh suối rạch tự nhiên',
          'Vi sinh vật tầng cát phù sa cổ'
        ]
      },
      terrestrial: {
        count: 92,
        status: 'Rừng cao su & cây ăn trái đặc sản',
        highlights: [
          'Rừng cao su tán rộng, dầu rái cổ thụ',
          'Vườn bưởi, sầu riêng hữu cơ',
          'Thảm cỏ vetiver chống xói mòn'
        ]
      },
      aerial: {
        count: 48,
        status: 'Đa dạng sinh thái vùng gò đồi',
        highlights: [
          'Chim cu gáy, chích chòe lửa',
          'Côn trùng thụ phấn, ong mật tự nhiên',
          'Yến đảo bay tầng cao'
        ]
      },
      amphibian: {
        count: 18,
        status: 'Sinh cảnh ẩm ven suối đồi',
        highlights: [
          'Ễnh ương, ếch đồng ven đầm',
          'Kỳ đà hoa, thạch sùng',
          'Lưỡng cư tầng cỏ tự nhiên'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 76',
        quality: 'Tốt',
        progress: 76,
        note: 'Lưu vực sông Thị Tính và hồ điều hòa đạt chuẩn sinh thái bảo vệ'
      },
      light: {
        value: 'UV: 5.2',
        quality: 'Tốt',
        progress: 52,
        note: 'Bức xạ ánh sáng dồi dào, rất thích hợp phát triển điện mặt trời áp mái KCN'
      },
      geology: {
        value: 'Thềm bazan & phù sa cổ',
        quality: 'Rất vững chắc',
        progress: 95,
        note: 'Nền địa chất gò đồi cao 32m, tầng đất chịu tải cao, hoàn toàn không ngập úng'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết nắng ráo thuận lợi',
        desc: 'Phường Long Nguyên, khu vực Bến Cát (Bắc TP.HCM)',
        level: 'info',
        actionAdvice: 'Điều kiện thuận lợi cho thi công hạ tầng công nghiệp và sản xuất nông nghiệp công nghệ cao.'
      },
      environmentAlert: {
        title: 'Môi trường sinh thái trong lành',
        desc: 'Trạm quan trắc tự động Long Nguyên',
        level: 'info',
        actionAdvice: 'Chỉ số bụi mịn PM2.5 ở ngưỡng thấp nhờ tỷ lệ bao phủ cây xanh và rừng cao su lớn.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'KCN Rạch Bắp, Long Nguyên & Nông nghiệp công nghệ cao',
      geologyImpact: {
        levelText: 'Rất thấp',
        percent: 15,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 45,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Trung bình',
        percent: 40,
        status: 'medium'
      },
      ecoProductionGuideline: 'Định hướng khu công nghiệp sinh thái thế hệ mới, tuần hoàn nước thải và giảm phát thải khí nhà kính'
    },
    protection: {
      assessmentTitle: 'Đánh giá bảo vệ môi trường',
      assessmentSubtitle: 'Đô thị công nghiệp - sinh thái bền vững',
      wasteStatus: {
        pollution: 'Kiểm soát chặt chẽ',
        sorting: 'Đã triển khai 85% hộ dân và doanh nghiệp',
        collection: 'Thu gom 100% trong ngày',
        wasteToFuel: 'Tái chế 55% chất thải công nghiệp'
      },
      communityEvents: {
        volunteering: 'Chiến dịch Phủ xanh vành đai đồi Long Nguyên',
        campaign: 'Bảo vệ hành lang thoát nước tự nhiên sông Thị Tính'
      }
    }
  },

  'hcm-tay-nam': {
    id: 'hcm-tay-nam',
    name: 'Phường Tây Nam',
    subTitle: 'Đô thị cảng sông logistics & công nghiệp ven sông Sài Gòn (119.8 km²)',
    districtGroup: 'Khu vực Bến Cát (Bắc TP.HCM)',
    adminType: 'phường',
    lat: 11.1352,
    lng: 106.5241,
    weather: {
      temp: '31°C',
      condition: 'mưa dông rải rác ven sông',
      description: 'Phường Tây Nam - Nhiệt độ 26-31°C, tỉ lệ mưa 60%, độ ẩm 68-88%, gió sông 14km/h',
      humidity: '68%',
      altitude: '22 m',
      uvIndex: 'UV 4.8',
      uvLevel: 'Vừa',
      lightIntensity: '590 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Vi khí hậu sông nước điều hòa, nhiệt độ 26-31°C, chiều có mưa dông rải rác (60%) làm dịu mát',
    },
    biodiversity: {
      underwater: {
        count: 38,
        status: 'Hệ sinh thái lưu vực sông Sài Gòn',
        highlights: [
          'Tôm càng xanh, cá bống dừa sông Sài Gòn',
          'Thảm thực vật bãi bồi ngập nước ven sông',
          'Hệ sinh vật nổi lưu vực bến cảng'
        ]
      },
      terrestrial: {
        count: 78,
        status: 'Vườn cây ven sông & đai sinh thái',
        highlights: [
          'Cây bần chua, tràm nước, dầu rái',
          'Vườn bưởi da xanh, măng cụt ven sông',
          'Thảm cỏ vetiver gia cố đê bao ven sông'
        ]
      },
      aerial: {
        count: 42,
        status: 'Khu hệ chim nước ven sông Sài Gòn',
        highlights: [
          'Cò trắng, bói cá ven sông',
          'Chim én, chích đuôi xòe vùng bãi bồi',
          'Côn trùng thụ phấn tự nhiên ven rạch'
        ]
      },
      amphibian: {
        count: 22,
        status: 'Đa dạng sinh học vùng đầm bãi',
        highlights: [
          'Cóc nước, nhái bén ven rạch',
          'Rắn nước, thằn lằn bóng',
          'Ấu trùng lưỡng cư vùng bãi triều'
        ]
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 72',
        quality: 'Tốt',
        progress: 72,
        note: 'Lưu vực sông Sài Gòn đoạn qua Tây Nam có dòng chảy mạnh, tự làm sạch tốt'
      },
      light: {
        value: 'UV: 4.8',
        quality: 'Tốt',
        progress: 48,
        note: 'Bức xạ ánh sáng tự nhiên dịu mát nhờ gió sông Sài Gòn thổi liên tục'
      },
      geology: {
        value: 'Phù sa cổ & đất bãi bồi ven sông',
        quality: 'Vững chắc',
        progress: 90,
        note: 'Nền đất cao ráo 22m, hệ thống đê bao ven sông Sài Gòn chống triều cường đồng bộ'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Gió mát ven sông Sài Gòn',
        desc: 'Phường Tây Nam, khu vực Bến Cát (Bắc TP.HCM)',
        level: 'info',
        actionAdvice: 'Điều kiện thời tiết lý tưởng cho vận tải thủy nội địa, cảng biển logistics và du lịch sinh thái.'
      },
      environmentAlert: {
        title: 'Chất lượng không khí trong lành',
        desc: 'Trạm đo lường tự động cảng An Tây - Tây Nam',
        level: 'info',
        actionAdvice: 'Nồng độ bụi và khí thải khu vực bến cảng và KCN nằm trong giới hạn an toàn theo QCVN.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Trung tâm logistics cảng sông An Tây, Vành đai 4 & Công nghiệp sạch',
      geologyImpact: {
        levelText: 'Thấp',
        percent: 20,
        status: 'low'
      },
      waterImpact: {
        levelText: 'Trung bình',
        percent: 50,
        status: 'medium'
      },
      airImpact: {
        levelText: 'Thấp',
        percent: 35,
        status: 'low'
      },
      ecoProductionGuideline: 'Phát triển chuỗi logistics xanh, vận tải container bằng sà lan điện và bảo vệ nguồn nước ngọt sông Sài Gòn'
    },
    protection: {
      assessmentTitle: 'Đánh giá bảo vệ môi trường',
      assessmentSubtitle: 'Đô thị sinh thái cảng sông bền vững',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 82% hộ dân và doanh nghiệp',
        collection: 'Thu gom 2 lượt/ngày',
        wasteToFuel: 'Tái chế 50% rác thải'
      },
      communityEvents: {
        volunteering: 'Chiến dịch Làm sạch bờ sông Sài Gòn - Tây Nam',
        campaign: 'Trồng cây chống xói mòn & bảo vệ hành lang thoát lũ ven sông'
      }
    }
  },

  'hcm-my-phuoc': {
    id: 'hcm-my-phuoc',
    name: 'Phường Mỹ Phước',
    subTitle: 'Trung tâm hành chính thương mại & KCN Mỹ Phước 1, 2, 3',
    districtGroup: 'Khu vực Bến Cát (Bắc TP.HCM)',
    adminType: 'phường',
    lat: 11.1448,
    lng: 106.6112,
    weather: {
      temp: '32°C',
      condition: 'nắng nhẹ',
      description: 'Phường Mỹ Phước - Độ ẩm 64%, gió 10km/h, cao độ 28m',
      humidity: '64%',
      altitude: '28 m',
      uvIndex: 'UV 5.4',
      uvLevel: 'Trung bình',
      lightIntensity: '630 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Thời tiết ấm áp, hạ tầng đô thị hiện đại',
    },
    biodiversity: {
      underwater: {
        count: 20,
        status: 'Kênh rạch đô thị & hồ công viên',
        highlights: ['Cá chép, cá mè hồ sinh thái', 'Thủy sinh cảnh quan công viên', 'Thảm thực vật bờ kênh thoát nước']
      },
      terrestrial: {
        count: 70,
        status: 'Cây xanh đô thị & dải cách ly KCN',
        highlights: ['Sao đen, dầu rái ven đại lộ', 'Bằng lăng, giáng hương công viên', 'Thảm cỏ cảnh quan trung tâm']
      },
      aerial: {
        count: 36,
        status: 'Chim đô thị & côn trùng',
        highlights: ['Chim sẻ, bồ câu nhà', 'Yến hàng nuôi tầng cao', 'Côn trùng công viên cây xanh']
      },
      amphibian: {
        count: 14,
        status: 'Sinh thái hồ cảnh quan',
        highlights: ['Cóc nhà, thạch sùng', 'Thằn lằn ven tường', 'Lưỡng cư hồ điều hòa']
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 70',
        quality: 'Tốt',
        progress: 70,
        note: 'Trạm xử lý nước thải tập trung KCN Mỹ Phước vận hành tự động 24/7'
      },
      light: {
        value: 'UV: 5.4',
        quality: 'Tốt',
        progress: 54,
        note: 'Bức xạ ánh sáng ổn định, tỷ lệ che mát vỉa hè đạt trên 60%'
      },
      geology: {
        value: 'Địa chất thềm gò đồi',
        quality: 'Rất vững chắc',
        progress: 96,
        note: 'Nền móng vững chắc, thích hợp xây dựng nhà xưởng tải trọng lớn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Nắng ấm thuận lợi',
        desc: 'Phường Mỹ Phước, trung tâm Bến Cát',
        level: 'info',
        actionAdvice: 'Thuận tiện cho giao thương, sản xuất kinh doanh và các sự kiện đô thị.'
      },
      environmentAlert: {
        title: 'Quan trắc khí thải tự động',
        desc: 'Hệ thống sensor giám sát liên tục KCN Mỹ Phước',
        level: 'info',
        actionAdvice: 'Nồng độ bụi SO2, NO2 trong ngưỡng cho phép.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Trung tâm công nghiệp, thương mại dịch vụ Bến Cát',
      geologyImpact: { levelText: 'Rất thấp', percent: 10, status: 'low' },
      waterImpact: { levelText: 'Trung bình', percent: 45, status: 'medium' },
      airImpact: { levelText: 'Trung bình', percent: 48, status: 'medium' },
      ecoProductionGuideline: 'Khuyến khích chuyển đổi sang nhà xưởng thông minh và công nghiệp hỗ trợ giảm phát thải'
    },
    protection: {
      assessmentTitle: 'Đánh giá bảo vệ môi trường',
      assessmentSubtitle: 'Đô thị văn minh xanh - sạch - đẹp',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 88% khu phố',
        collection: 'Thu gom 100% trong ngày',
        wasteToFuel: 'Đạt 48% tỷ lệ tái chế'
      },
      communityEvents: {
        volunteering: 'Ngày Chủ Nhật Xanh Mỹ Phước',
        campaign: 'Phân loại rác tại nguồn ở toàn bộ văn phòng & nhà xưởng'
      }
    }
  },

  'hcm-thoi-hoa': {
    id: 'hcm-thoi-hoa',
    name: 'Phường Thới Hòa',
    subTitle: 'Đô thị đại học (ĐH Việt Đức VGU) & KCN Mỹ Phước 4',
    districtGroup: 'Khu vực Bến Cát (Bắc TP.HCM)',
    adminType: 'phường',
    lat: 11.1125,
    lng: 106.6218,
    weather: {
      temp: '32°C',
      condition: 'nắng đẹp',
      description: 'Phường Thới Hòa - Độ ẩm 63%, gió 9km/h, cao độ 25m',
      humidity: '63%',
      altitude: '25 m',
      uvIndex: 'UV 5.0',
      uvLevel: 'Trung bình',
      lightIntensity: '610 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Vi khí hậu trong lành khu đô thị đại học thông minh',
    },
    biodiversity: {
      underwater: {
        count: 18,
        status: 'Hồ sinh thái khuôn viên đại học',
        highlights: ['Cá koi, cá chép hồ cảnh quan', 'Sen, súng hồ sinh thái VGU', 'Thủy sinh vi mô']
      },
      terrestrial: {
        count: 85,
        status: 'Cây xanh đại học & công viên xanh',
        highlights: ['Cây dầu rái, kèn hồng, me tây', 'Vườn hoa sinh thái khuôn viên học thuật', 'Thảm cỏ nhung Nhật xanh mướt']
      },
      aerial: {
        count: 39,
        status: 'Khu hệ chim học đường',
        highlights: ['Chim chích bông, sẻ nhà', 'Bướm hoa thụ phấn', 'Yến liệng tầng cao']
      },
      amphibian: {
        count: 15,
        status: 'Bảo tồn cảnh quan hồ',
        highlights: ['Cóc hoa, thạch sùng', 'Nhái bén ven thảm cỏ', 'Ấu trùng tự nhiên']
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 78',
        quality: 'Tốt',
        progress: 78,
        note: 'Khuôn viên Đại học Việt Đức áp dụng công nghệ lọc nước sinh thái tự nhiên'
      },
      light: {
        value: 'UV: 5.0',
        quality: 'Tốt',
        progress: 50,
        note: 'Quy hoạch kiến trúc xanh che chắn bức xạ nhiệt tự nhiên'
      },
      geology: {
        value: 'Địa tầng kiên cố',
        quality: 'Rất vững chắc',
        progress: 94,
        note: 'Nền địa chất ổn định, không ngập nước'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết mát mẻ',
        desc: 'Phường Thới Hòa, khu vực trường ĐH Việt Đức',
        level: 'info',
        actionAdvice: 'Lý tưởng cho các hoạt động học tập, nghiên cứu và thể thao ngoài trời.'
      },
      environmentAlert: {
        title: 'Môi trường giáo dục đạt chuẩn xanh',
        desc: 'Trạm quan trắc tự động Thới Hòa',
        level: 'info',
        actionAdvice: 'Chỉ số không khí rất tốt nhờ mật độ cây xanh đạt chuẩn quốc tế.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Hệ sinh thái Đổi mới sáng tạo & Công nghệ cao',
      geologyImpact: { levelText: 'Rất thấp', percent: 12, status: 'low' },
      waterImpact: { levelText: 'Thấp', percent: 28, status: 'low' },
      airImpact: { levelText: 'Thấp', percent: 25, status: 'low' },
      ecoProductionGuideline: 'Phát triển vườn ươm khởi nghiệp xanh, AI, tự động hóa và nghiên cứu khoa học'
    },
    protection: {
      assessmentTitle: 'Đánh giá bảo vệ môi trường',
      assessmentSubtitle: 'Campus đại học & Đô thị không rác thải nhựa',
      wasteStatus: {
        pollution: 'Rất tốt',
        sorting: 'Đã triển khai 95% khuôn viên',
        collection: 'Phân loại rác tại nguồn triệt để',
        wasteToFuel: 'Tái chế 65% rác thải nhựa'
      },
      communityEvents: {
        volunteering: 'Câu lạc bộ Sinh viên Xanh VGU',
        campaign: 'Nói không với đồ nhựa dùng một lần'
      }
    }
  },

  'hcm-chanh-phu-hoa': {
    id: 'hcm-chanh-phu-hoa',
    name: 'Phường Chánh Phú Hòa',
    subTitle: 'Đô thị công nghiệp công nghệ cao & logistics phía Đông',
    districtGroup: 'Khu vực Bến Cát (Bắc TP.HCM)',
    adminType: 'phường',
    lat: 11.1620,
    lng: 106.6625,
    weather: {
      temp: '32°C',
      condition: 'nắng ráo',
      description: 'Phường Chánh Phú Hòa - Độ ẩm 61%, gió 12km/h, cao độ 30m',
      humidity: '61%',
      altitude: '30 m',
      uvIndex: 'UV 5.3',
      uvLevel: 'Trung bình',
      lightIntensity: '625 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Vi khí hậu khô ráo, gió đối lưu mạnh',
    },
    biodiversity: {
      underwater: {
        count: 19,
        status: 'Lưu vực suối tự nhiên & hồ điều hòa',
        highlights: ['Cá rô, cá trê đồng', 'Thủy sinh suối tự nhiên', 'Thực vật bờ kênh']
      },
      terrestrial: {
        count: 75,
        status: 'Vành đai cây xanh cách ly & cao su',
        highlights: ['Rừng cao su, cây dầu, keo lai', 'Cây bóng mát vỉa hè KCN', 'Thảm cỏ chống bụi']
      },
      aerial: {
        count: 35,
        status: 'Chim di cư & côn trùng',
        highlights: ['Chim sẻ, cu gáy', 'Ong mật thụ phấn', 'Chuồn chuồn báo mưa']
      },
      amphibian: {
        count: 16,
        status: 'Sinh cảnh đầm suối',
        highlights: ['Cóc hoa, ếch đồng', 'Thằn lằn bóng', 'Lưỡng cư tầng cỏ']
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 71',
        quality: 'Tốt',
        progress: 71,
        note: 'Hệ thống kênh mương thoát nước được kiên cố hóa hoàn chỉnh'
      },
      light: {
        value: 'UV: 5.3',
        quality: 'Tốt',
        progress: 53,
        note: 'Ánh nắng dồi dào, tiềm năng lớn cho năng lượng tái tạo'
      },
      geology: {
        value: 'Đất phù sa cổ bazan',
        quality: 'Rất vững chắc',
        progress: 95,
        note: 'Địa hình cao 30m, địa tầng đá ong kiên cố'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Nắng ráo',
        desc: 'Phường Chánh Phú Hòa',
        level: 'info',
        actionAdvice: 'Thuận tiện cho công tác vận chuyển hàng hóa logistics và xây dựng.'
      },
      environmentAlert: {
        title: 'Quan trắc tự động định kỳ',
        desc: 'Trạm cảm biến Chánh Phú Hòa',
        level: 'info',
        actionAdvice: 'Các thông số chất lượng không khí đạt tiêu chuẩn môi trường.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Công nghiệp hỗ trợ & Kho bãi logistics liên vùng',
      geologyImpact: { levelText: 'Rất thấp', percent: 14, status: 'low' },
      waterImpact: { levelText: 'Trung bình', percent: 46, status: 'medium' },
      airImpact: { levelText: 'Trung bình', percent: 42, status: 'medium' },
      ecoProductionGuideline: 'Áp dụng các tiêu chuẩn quản lý môi trường ISO 14001 trong các nhà máy'
    },
    protection: {
      assessmentTitle: 'Đánh giá bảo vệ môi trường',
      assessmentSubtitle: 'Đô thị công nghiệp sinh thái',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đã triển khai 80%',
        collection: 'Thu gom đầy đủ',
        wasteToFuel: 'Tái chế 45%'
      },
      communityEvents: {
        volunteering: 'Phong trào trồng cây xanh các tuyến đường',
        campaign: 'Giữ gìn vệ sinh khu dân cư công nhân'
      }
    }
  },

  'hcm-hoa-loi': {
    id: 'hcm-hoa-loi',
    name: 'Phường Hòa Lợi',
    subTitle: 'Đô thị kết nối Thành phố Mới & KCN VSIP 2',
    districtGroup: 'Khu vực Bến Cát (Bắc TP.HCM)',
    adminType: 'phường',
    lat: 11.0872,
    lng: 106.6548,
    weather: {
      temp: '32°C',
      condition: 'nắng nhẹ',
      description: 'Phường Hòa Lợi - Độ ẩm 65%, gió 8km/h, cao độ 24m',
      humidity: '65%',
      altitude: '24 m',
      uvIndex: 'UV 5.1',
      uvLevel: 'Trung bình',
      lightIntensity: '615 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Vi khí hậu ổn định, liên kết trung tâm thông thoáng',
    },
    biodiversity: {
      underwater: {
        count: 17,
        status: 'Kênh rạch cảnh quan',
        highlights: ['Cá chép, cá mè', 'Thủy sinh cảnh quan KCN VSIP 2', 'Thực vật lọc nước tự nhiên']
      },
      terrestrial: {
        count: 72,
        status: 'Mảng xanh đô thị KCN VSIP',
        highlights: ['Cây bàng Đài Loan, lim xẹt', 'Thảm cỏ cảnh quan đại lộ', 'Vườn hoa khu dân cư']
      },
      aerial: {
        count: 34,
        status: 'Chim chóc đô thị',
        highlights: ['Chim sẻ, bồ câu', 'Yến hàng', 'Côn trùng cảnh quan']
      },
      amphibian: {
        count: 13,
        status: 'Sinh thái công viên',
        highlights: ['Cóc nhà', 'Thạch sùng', 'Lưỡng cư thảm cỏ']
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 74',
        quality: 'Tốt',
        progress: 74,
        note: 'Nước thải KCN VSIP 2 xử lý đạt chuẩn loại A trước khi xả thải'
      },
      light: {
        value: 'UV: 5.1',
        quality: 'Tốt',
        progress: 51,
        note: 'Độ che phủ bóng mát vỉa hè đạt mức cao'
      },
      geology: {
        value: 'Thềm đất cứng',
        quality: 'Rất vững chắc',
        progress: 93,
        note: 'Nền địa chất ổn định hoàn toàn'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Thời tiết ấm áp',
        desc: 'Phường Hòa Lợi, giáp TP Mới',
        level: 'info',
        actionAdvice: 'Thuận tiện di chuyển và làm việc tại các khu công nghệ cao.'
      },
      environmentAlert: {
        title: 'Môi trường xanh chuẩn VSIP',
        desc: 'Trạm giám sát Hòa Lợi',
        level: 'info',
        actionAdvice: 'Mật độ cây xanh cao giúp hấp thụ tiếng ồn và khói bụi hiệu quả.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Đô thị dịch vụ, thương mại phục vụ chuyên gia & KCN VSIP 2',
      geologyImpact: { levelText: 'Rất thấp', percent: 12, status: 'low' },
      waterImpact: { levelText: 'Thấp', percent: 35, status: 'low' },
      airImpact: { levelText: 'Trung bình', percent: 38, status: 'medium' },
      ecoProductionGuideline: 'Định hướng phát triển các ngành sản xuất công nghệ cao, ít thâm dụng lao động và năng lượng'
    },
    protection: {
      assessmentTitle: 'Đánh giá bảo vệ môi trường',
      assessmentSubtitle: 'Môi trường sống chất lượng cao',
      wasteStatus: {
        pollution: 'Rất tốt',
        sorting: 'Đạt 85%',
        collection: 'Thu gom hàng ngày',
        wasteToFuel: 'Tái chế 52%'
      },
      communityEvents: {
        volunteering: 'Hòa Lợi Xanh - Vì cộng đồng văn minh',
        campaign: 'Khu phố không rác thải bừa bãi'
      }
    }
  },

  'hcm-tan-dinh': {
    id: 'hcm-tan-dinh',
    name: 'Phường Tân Định (Bến Cát)',
    subTitle: 'Cửa ngõ phía Nam, trục QL13 & kết nối KDL Đại Nam',
    districtGroup: 'Khu vực Bến Cát (Bắc TP.HCM)',
    adminType: 'phường',
    lat: 11.0543,
    lng: 106.6321,
    weather: {
      temp: '32°C',
      condition: 'nắng nhẹ',
      description: 'Phường Tân Định - Độ ẩm 66%, gió 9km/h, cao độ 20m',
      humidity: '66%',
      altitude: '20 m',
      uvIndex: 'UV 5.2',
      uvLevel: 'Trung bình',
      lightIntensity: '620 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Cửa ngõ giao thương nhộn nhịp, thời tiết thuận lợi',
    },
    biodiversity: {
      underwater: {
        count: 22,
        status: 'Hồ cảnh quan Đại Nam & suối nhánh',
        highlights: ['Cá cảnh, cá chép hồ Đại Nam', 'Thủy sinh hồ nhân tạo lớn', 'Thực vật thủy sinh cảnh quan']
      },
      terrestrial: {
        count: 82,
        status: 'Mảng xanh du lịch sinh thái Đại Nam',
        highlights: ['Vườn cây ăn trái, cây cổ thụ', 'Cây xanh đại lộ Bình Dương', 'Vườn hoa phong lan cảnh quan']
      },
      aerial: {
        count: 40,
        status: 'Khu hệ chim vườn bách thú & tự nhiên',
        highlights: ['Chim bồ câu, công, sếu vườn thú', 'Chim sẻ, yến hàng', 'Côn trùng vườn hoa']
      },
      amphibian: {
        count: 17,
        status: 'Sinh thái đầm hồ',
        highlights: ['Cóc nhà, ếch hồ', 'Thằn lằn, kỳ tôm', 'Lưỡng cư ven hồ cảnh quan']
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 73',
        quality: 'Tốt',
        progress: 73,
        note: 'Hồ nước điều hòa diện tích lớn giúp cân bằng độ ẩm khu vực'
      },
      light: {
        value: 'UV: 5.2',
        quality: 'Tốt',
        progress: 52,
        note: 'Bức xạ ánh sáng tự nhiên đầy đủ cho cây trồng'
      },
      geology: {
        value: 'Địa chất chuyển tiếp phù sa cổ',
        quality: 'Vững chắc',
        progress: 92,
        note: 'Độ lún an toàn tuyệt đối'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Nắng ấm chan hòa',
        desc: 'Phường Tân Định, cửa ngõ Bến Cát',
        level: 'info',
        actionAdvice: 'Rất thuận lợi cho hoạt động du lịch, tham quan và giao thương trên trục Quốc lộ 13.'
      },
      environmentAlert: {
        title: 'Chất lượng không khí ổn định',
        desc: 'Trạm quan trắc Tân Định',
        level: 'info',
        actionAdvice: 'Môi trường xung quanh khu du lịch duy trì mức trong lành.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Dịch vụ du lịch, khách sạn, thương mại & vận tải cửa ngõ',
      geologyImpact: { levelText: 'Thấp', percent: 18, status: 'low' },
      waterImpact: { levelText: 'Trung bình', percent: 40, status: 'medium' },
      airImpact: { levelText: 'Trung bình', percent: 45, status: 'medium' },
      ecoProductionGuideline: 'Phát triển mô hình du lịch sinh thái không rác thải và dịch vụ vận chuyển xanh'
    },
    protection: {
      assessmentTitle: 'Đánh giá bảo vệ môi trường',
      assessmentSubtitle: 'Đô thị du lịch - thương mại xanh',
      wasteStatus: {
        pollution: 'Kiểm soát tốt',
        sorting: 'Đạt 82%',
        collection: 'Thu gom thường xuyên',
        wasteToFuel: 'Tái chế 46%'
      },
      communityEvents: {
        volunteering: 'Thanh niên Tân Định bảo vệ môi trường du lịch',
        campaign: 'Tuyến phố văn minh thương mại không xả rác'
      }
    }
  },

  'hcm-phu-an': {
    id: 'hcm-phu-an',
    name: 'Xã Phú An',
    subTitle: 'Làng tre sinh thái Phú An ven sông Thị Tính & du lịch sinh thái',
    districtGroup: 'Khu vực Bến Cát (Bắc TP.HCM)',
    adminType: 'xã',
    lat: 11.1095,
    lng: 106.5684,
    weather: {
      temp: '30°C',
      condition: 'mát rượi dưới tán tre',
      description: 'Xã Phú An - Độ ẩm 72%, gió sông 12km/h, cao độ 18m',
      humidity: '72%',
      altitude: '18 m',
      uvIndex: 'UV 4.2',
      uvLevel: 'Vừa',
      lightIntensity: '560 W/m²',
      statusAssessment: 'Đánh giá thời tiết',
      statusDetail: 'Vi khí hậu mát lành hiếm có nhờ rừng tre bảo tồn lớn nhất Đông Nam Á',
    },
    biodiversity: {
      underwater: {
        count: 42,
        status: 'Đa dạng sinh học sông Thị Tính & đầm lầy',
        highlights: ['Cá lăng, cá thát lát, cá chạch', 'Tôm sông tự nhiên', 'Thực vật thủy sinh ngập nước']
      },
      terrestrial: {
        count: 120,
        status: 'Bảo tàng sinh thái Tre Phú An (hơn 130 loài tre nứa)',
        highlights: ['Hơn 130 giống tre Việt Nam & Đông Nam Á', 'Cây dầu rái, bàng nước ven sông', 'Hệ nấm và thực vật cộng sinh dưới tán tre']
      },
      aerial: {
        count: 55,
        status: 'Nơi cư ngụ lý tưởng của các loài chim',
        highlights: ['Cò trắng, bìm bịp, chích chòe đất', 'Hơn 40 loài bướm tự nhiên', 'Côn trùng có ích thụ phấn hoa']
      },
      amphibian: {
        count: 28,
        status: 'Quần xã lưỡng cư phong phú',
        highlights: ['Ễnh ương đốm, nhái bầu hoa', 'Kỳ nhông cát, thằn lằn bóng', 'Rắn ráo, ba ba suối tự nhiên']
      }
    },
    environmentIndexes: {
      water: {
        value: 'WQI: 85',
        quality: 'Rất tốt',
        progress: 85,
        note: 'Nguồn nước sông Thị Tính được thanh lọc tự nhiên qua rừng rễ tre dày đặc'
      },
      light: {
        value: 'UV: 4.2',
        quality: 'Rất tốt',
        progress: 42,
        note: 'Tán tre xanh lọc bỏ 70% tia tử ngoại có hại, không khí dịu mát quanh năm'
      },
      geology: {
        value: 'Đất phù sa bãi bồi giữ chặt bởi rễ tre',
        quality: 'Rất vững chắc',
        progress: 98,
        note: 'Hệ thống rễ tre bện chặt ngàn tầng giúp chống sạt lở bờ sông tuyệt đối'
      }
    },
    alerts: {
      weatherAlert: {
        title: 'Không khí mát lành sinh thái',
        desc: 'Xã Phú An, khu bảo tồn Tre tự nhiên',
        level: 'info',
        actionAdvice: 'Địa điểm lý tưởng nhất khu vực để dã ngoại, nghiên cứu sinh học và hồi phục sức khỏe.'
      },
      environmentAlert: {
        title: 'Chỉ số chất lượng môi trường xuất sắc',
        desc: 'Trạm quan trắc Làng tre Phú An',
        level: 'info',
        actionAdvice: 'Hàm lượng oxy dồi dào, bụi mịn PM2.5 gần như bằng 0 dưới tán rừng tre.'
      }
    },
    enterprise: {
      assessmentTitle: 'Đánh giá phát triển doanh nghiệp',
      assessmentSubtitle: 'Du lịch sinh thái, Nông nghiệp hữu cơ & Kinh tế tre xanh tuần hoàn',
      geologyImpact: { levelText: 'Rất thấp', percent: 8, status: 'low' },
      waterImpact: { levelText: 'Rất thấp', percent: 15, status: 'low' },
      airImpact: { levelText: 'Rất thấp', percent: 10, status: 'low' },
      ecoProductionGuideline: 'Phát triển các sản phẩm thủ công mỹ nghệ từ tre tái sinh và mô hình trang trại giáo dục trải nghiệm'
    },
    protection: {
      assessmentTitle: 'Đánh giá bảo vệ môi trường',
      assessmentSubtitle: 'Khu bảo tồn sinh thái trọng điểm quốc tế',
      wasteStatus: {
        pollution: 'Tuyệt hảo',
        sorting: 'Đạt 96% hộ gia đình',
        collection: '100% ủ rác hữu cơ tại vườn',
        wasteToFuel: 'Tái chế 75%'
      },
      communityEvents: {
        volunteering: 'Lễ hội Trồng tre & Ngày hội Trái đất Phú An',
        campaign: 'Bảo vệ nguồn gen tre bản địa và chống biến đổi khí hậu'
      }
    }
  }
};
