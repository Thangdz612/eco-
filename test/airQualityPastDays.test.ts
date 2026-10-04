import assert from 'node:assert';
import {
  computeAirQualityAverages,
  parseOpenMeteoAirQualityData,
  buildOpenMeteoAirQualityUrl,
} from '../src/utils/liveWeatherApi';

console.log('🧪 Bắt đầu kiểm thử tính toán chất lượng không khí với past_days=1 và dữ liệu giả lập 48 giờ...');

// 1. Kiểm tra URL đã có past_days: '1'
const testUrl = buildOpenMeteoAirQualityUrl(10.7769, 106.7009);
assert(testUrl.includes('past_days=1'), 'URL phải chứa tham số past_days=1');
console.log('✅ 1. buildOpenMeteoAirQualityUrl tạo URL có chứa past_days=1:', testUrl);

// 2. Tạo tập dữ liệu giả lập 48 giờ (24 giờ hôm qua + 24 giờ hôm nay)
// Hôm qua: 2026-10-03 (00:00 -> 23:00, 24 giờ, index 0..23)
// Hôm nay: 2026-10-04 (00:00 -> 23:00, 24 giờ, index 24..47)
const hourlyTimes: string[] = [];
const hourlyPm25: number[] = [];
const hourlyPm10: number[] = [];
const hourlyNo2: number[] = [];
const hourlySo2: number[] = [];
const hourlyO3: number[] = [];
const hourlyCo: number[] = [];
const hourlyUsAqi: number[] = [];
const hourlyEuAqi: number[] = [];

for (let h = 0; h < 24; h++) {
  hourlyTimes.push(`2026-10-03T${String(h).padStart(2, '0')}:00`);
  hourlyPm25.push(22 + (h % 5));
  hourlyPm10.push(40 + (h % 8));
  hourlyNo2.push(30 + (h % 6));
  hourlySo2.push(10 + (h % 4));
  hourlyO3.push(45 + (h % 7));
  hourlyCo.push(500 + (h % 100));
  hourlyUsAqi.push(70 + (h % 10));
  hourlyEuAqi.push(40 + (h % 5));
}

for (let h = 0; h < 24; h++) {
  hourlyTimes.push(`2026-10-04T${String(h).padStart(2, '0')}:00`);
  hourlyPm25.push(26 + (h % 5));
  hourlyPm10.push(45 + (h % 8));
  hourlyNo2.push(32 + (h % 6));
  hourlySo2.push(12 + (h % 4));
  hourlyO3.push(50 + (h % 7));
  hourlyCo.push(550 + (h % 100));
  hourlyUsAqi.push(75 + (h % 10));
  hourlyEuAqi.push(42 + (h % 5));
}

assert.strictEqual(hourlyTimes.length, 48, 'Mảng chuỗi thời gian phải đủ 48 giờ');

// Giả lập thời điểm hiện tại là 10:00 sáng hôm nay (2026-10-04T10:00)
const currentTime = '2026-10-04T10:00';
const mockAirQuality48h = {
  latitude: 10.7769,
  longitude: 106.7009,
  generationtime_ms: 0.12,
  utc_offset_seconds: 25200,
  timezone: 'Asia/Ho_Chi_Minh',
  timezone_abbreviation: 'GMT+7',
  current: {
    time: currentTime,
    interval: 3600,
    european_aqi: 45,
    us_aqi: 78,
    pm10: 48.0,
    pm2_5: 28.5,
    carbon_monoxide: 580,
    nitrogen_dioxide: 34.0,
    sulphur_dioxide: 14.0,
    ozone: 52.0,
  },
  hourly: {
    time: hourlyTimes,
    pm10: hourlyPm10,
    pm2_5: hourlyPm25,
    carbon_monoxide: hourlyCo,
    nitrogen_dioxide: hourlyNo2,
    sulphur_dioxide: hourlySo2,
    ozone: hourlyO3,
    us_aqi: hourlyUsAqi,
    european_aqi: hourlyEuAqi,
  },
};

// 3. Tính toán các chỉ số trung bình từ hàm computeAirQualityAverages
const stats = computeAirQualityAverages(mockAirQuality48h);

// Chỉ số 10:00 hôm nay phải nằm ở index 34 (24 giờ hôm qua + 10 giờ hôm nay)
assert.strictEqual(
  stats.currentHourIdx,
  34,
  `currentHourIdx phải bằng 34 trong chuỗi 48 giờ (nhận được: ${stats.currentHourIdx})`
);
console.log(`✅ 2. currentHourIdx tìm chính xác: index ${stats.currentHourIdx} cho thời điểm ${currentTime}`);

// Kiểm tra PM2.5: lúc 10:00 phải ra isAveraged: true, nhãn 'TB 24h'
assert.strictEqual(
  stats.pm25Stat.isAveraged,
  true,
  `pm25Stat.isAveraged phải là true (nhận được: ${stats.pm25Stat.isAveraged})`
);
assert.strictEqual(
  stats.pm25Stat.label,
  'TB 24h',
  `pm25Stat.label phải là 'TB 24h' (nhận được: ${stats.pm25Stat.label})`
);
assert(
  typeof stats.pm25Stat.value === 'number' && stats.pm25Stat.value > 0,
  'Giá trị trung bình 24h PM2.5 phải là số dương hợp lệ'
);
console.log(`✅ 3. PM2.5 lúc 10:00 tính trung bình 24h thành công:`, stats.pm25Stat);

// Kiểm tra PM10, NO2, SO2 cũng tính TB 24h
assert.strictEqual(stats.pm10Stat.isAveraged, true);
assert.strictEqual(stats.pm10Stat.label, 'TB 24h');
assert.strictEqual(stats.no2Stat.isAveraged, true);
assert.strictEqual(stats.no2Stat.label, 'TB 24h');
assert.strictEqual(stats.so2Stat.isAveraged, true);
assert.strictEqual(stats.so2Stat.label, 'TB 24h');
console.log('✅ 4. PM10, NO2, SO2 đều tính được trung bình 24h đầy đủ');

// Kiểm tra CO tính TB 8h và O3 tính TB trượt 8h lớn nhất
assert.strictEqual(stats.coStat.isAveraged, true);
assert.strictEqual(stats.coStat.label, 'TB 8h');
assert.strictEqual(stats.o3Stat.isAveraged, true);
assert.strictEqual(stats.o3Stat.label, 'TB trượt 8h lớn nhất');
console.log('✅ 5. CO tính TB 8h và O3 tính TB trượt 8h lớn nhất thành công');

// 4. Kiểm tra parseOpenMeteoAirQualityData chuẩn hóa hiển thị
const parsed = parseOpenMeteoAirQualityData(mockAirQuality48h);
assert.strictEqual(parsed.isAvailable, true);
const pm25Detail = parsed.details.find((d) => d.code === 'pm2_5');
assert(pm25Detail !== undefined, 'Phải có chi tiết PM2.5 trong parsed details');
assert(
  pm25Detail.evaluation.includes('TB 24h'),
  `Đánh giá PM2.5 phải chứa nhãn '(TB 24h)': ${pm25Detail.evaluation}`
);
console.log(`✅ 6. parseOpenMeteoAirQualityData xuất đánh giá QCVN chuẩn: "${pm25Detail.evaluation}"`);

// 5. Kiểm tra trường hợp thiếu past_days (chỉ có 11 giờ từ 00:00 đến 10:00 hôm nay)
const mockOnlyToday11h = {
  ...mockAirQuality48h,
  hourly: {
    ...mockAirQuality48h.hourly,
    time: hourlyTimes.slice(24, 35), // chỉ 11 giờ từ 00:00 đến 10:00 hôm nay
    pm2_5: hourlyPm25.slice(24, 35),
  },
};
const statsNoPastDays = computeAirQualityAverages(mockOnlyToday11h);
assert.strictEqual(
  statsNoPastDays.pm25Stat.isAveraged,
  false,
  'Nếu chỉ có 11 giờ, isAveraged phải là false vì chưa đủ 24 giờ so chuẩn'
);
assert.strictEqual(
  statsNoPastDays.pm25Stat.label,
  'tức thời, chưa so chuẩn',
  'Khi thiếu giờ, nhãn phải là "tức thời, chưa so chuẩn"'
);
console.log('✅ 7. Xác nhận khi không có past_days=1 (chỉ 11 giờ), hệ thống chuyển sang chế độ tức thời an toàn');

console.log('\n🎉 TẤT CẢ CÁC BÀI TEST CHẤT LƯỢNG KHÔNG KHÍ PAST_DAYS ĐỀU THÀNH CÔNG VƯỢT TRỘI!');
