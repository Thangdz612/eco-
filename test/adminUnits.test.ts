import { ADMIN_UNITS, ADMIN_UNITS_DATA, HISTORICAL_ADMIN_UNITS } from '../src/data/adminUnits';
import { DISTRICTS_DATA } from '../src/data/mockData';

console.log('🧪 Bắt đầu kiểm thử toàn diện 168 Đơn vị hành chính cấp xã theo Nghị quyết 1685/NQ-UBTVQH15...\n');

// 1. Kiểm tra số lượng và phân loại
const total = ADMIN_UNITS.length;
const phuongCount = ADMIN_UNITS.filter((u) => u.adminType === 'phường').length;
const xaCount = ADMIN_UNITS.filter((u) => u.adminType === 'xã').length;
const dacKhuCount = ADMIN_UNITS.filter((u) => u.adminType === 'đặc khu').length;

console.log(`1. Tổng số đơn vị hành chính hiện hành: ${total} (Kỳ vọng: 168)`);
console.log(`   - Phường: ${phuongCount} (Kỳ vọng: 113)`);
console.log(`   - Xã: ${xaCount} (Kỳ vọng: 54)`);
console.log(`   - Đặc khu: ${dacKhuCount} (Kỳ vọng: 1)`);

if (total !== 168 || phuongCount !== 113 || xaCount !== 54 || dacKhuCount !== 1) {
  throw new Error(`❌ Sai lệch số lượng: total=${total}, phuong=${phuongCount}, xa=${xaCount}, dacKhu=${dacKhuCount}`);
}
console.log('✅ 1. Kiểm tra số lượng và tỷ lệ đơn vị hành chính: ĐẠT');

// 2. Kiểm tra tính duy nhất của ID và Code
const idSet = new Set<string>();
const codeSet = new Set<string>();
const duplicateIds: string[] = [];
const duplicateCodes: string[] = [];

for (const u of ADMIN_UNITS) {
  if (idSet.has(u.id)) duplicateIds.push(u.id);
  idSet.add(u.id);

  if (codeSet.has(u.code)) duplicateCodes.push(u.code);
  codeSet.add(u.code);
}

if (duplicateIds.length > 0) {
  throw new Error(`❌ Phát hiện ID trùng lặp: ${duplicateIds.join(', ')}`);
}
if (duplicateCodes.length > 0) {
  throw new Error(`❌ Phát hiện Mã hành chính trùng lặp: ${duplicateCodes.join(', ')}`);
}
console.log('✅ 2. Tính duy nhất của ID và mã định danh chính thức: ĐẠT');

// 3. Kiểm tra tính hợp lệ của tọa độ
const invalidCoords: string[] = [];
for (const u of ADMIN_UNITS) {
  if (
    typeof u.lat !== 'number' ||
    typeof u.lng !== 'number' ||
    !Number.isFinite(u.lat) ||
    !Number.isFinite(u.lng) ||
    u.lat < 8.5 ||
    u.lat > 11.4 ||
    u.lng < 106.3 ||
    u.lng > 107.4
  ) {
    invalidCoords.push(`${u.name} (${u.lat}, ${u.lng})`);
  }
}

if (invalidCoords.length > 0) {
  throw new Error(`❌ Phát hiện tọa độ ngoài khung an toàn: ${invalidCoords.join('; ')}`);
}
console.log('✅ 3. Kiểm tra tọa độ không gian địa lý (lat: 8.5–11.4, lng: 106.3–107.4): ĐẠT');

// 4. Kiểm tra phân bổ khu vực
const hcmUnits = ADMIN_UNITS.filter((u) => u.formerProvince === 'TP.HCM');
const bdUnits = ADMIN_UNITS.filter((u) => u.formerProvince === 'Bình Dương');
const brvtUnits = ADMIN_UNITS.filter((u) => u.formerProvince === 'Bà Rịa – Vũng Tàu');

console.log(`4. Phân bổ theo 3 khu vực trước sáp nhập:`);
console.log(`   - TP.HCM cũ: ${hcmUnits.length} (Kỳ vọng: 128 - 76 phường, 52 xã)`);
console.log(`   - Bình Dương cũ: ${bdUnits.length} (Kỳ vọng: 25 - 24 phường, 1 xã)`);
console.log(`   - Bà Rịa – Vũng Tàu cũ: ${brvtUnits.length} (Kỳ vọng: 15 - 13 phường, 1 xã, 1 đặc khu)`);

if (hcmUnits.length !== 128 || bdUnits.length !== 25 || brvtUnits.length !== 15) {
  throw new Error(`❌ Phân bổ khu vực không khớp: hcm=${hcmUnits.length}, bd=${bdUnits.length}, brvt=${brvtUnits.length}`);
}
console.log('✅ 4. Phân bổ theo 3 khu vực địa giới hành chính: ĐẠT');

// 5. Kiểm tra các bản ghi lịch sử và cơ chế Fallback Alias
console.log(`5. Tổng số bản ghi lịch sử lưu trữ: ${HISTORICAL_ADMIN_UNITS.length}`);
const missingHistoricalTargets: string[] = [];
for (const h of HISTORICAL_ADMIN_UNITS) {
  if (h.isActive !== false) {
    throw new Error(`❌ Bản ghi lịch sử ${h.id} phải có isActive: false`);
  }
  if (!h.mergedIntoId || !ADMIN_UNITS_DATA[h.mergedIntoId]) {
    missingHistoricalTargets.push(`${h.id} -> ${h.mergedIntoId}`);
  }
}

if (missingHistoricalTargets.length > 0) {
  throw new Error(`❌ Đơn vị lịch sử trỏ tới đích không tồn tại: ${missingHistoricalTargets.join(', ')}`);
}
console.log('✅ 5. Dữ liệu lịch sử và liên kết sáp nhập (mergedIntoId): ĐẠT');

// 6. Kiểm tra khả năng tương thích ngược của DISTRICTS_DATA
console.log('6. Kiểm tra truy xuất ID cũ qua DISTRICTS_DATA:');
const testLegacyIds = [
  'quan-1',
  'quan-3',
  'quan-5',
  'quan-7',
  'ben-cat',
  'hcm-ben-cat',
  'hcm-an-dien',
  'hcm-tay-nam',
  'con-dao',
  'hcm-con-dao',
  'hcm-long-son',
  'hist-q1-ben-nghe',
  'hcm-q5-haithuong',
];

for (const legId of testLegacyIds) {
  const found = DISTRICTS_DATA[legId];
  if (!found) {
    throw new Error(`❌ Không tìm thấy ID tương thích: ${legId}`);
  }
}
console.log('✅ 6. Tương thích ngược toàn diện cho các mã cũ / bookmark người dùng: ĐẠT');

console.log('\n🎉 TẤT CẢ 6 NHÓM KIỂM THỬ ĐƠN VỊ HÀNH CHÍNH CẤP XÃ ĐỀU ĐẠT CHUẨN XÁC 100%!');
