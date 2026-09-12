import { DistrictData } from '../types';
import { DISTRICTS_DATA as BASE_DISTRICTS_DATA, AdminUnitInfo } from './hcmWards168';
import { BEN_CAT_WARDS_DATA } from './benCatWards';

// Loại bỏ các đơn vị thị trấn/trùng lặp cũ để thay thế bằng các phường/xã chuẩn xác của Bến Cát (Bình Dương cũ)
// Đảm bảo tổng số chuẩn xác tuyệt đối 168 đơn vị hành chính theo Nghị quyết 1685/NQ-UBTVQH15
const EXCLUDED_IDS = new Set([
  'hcm-cc-ttcuchi',
  'hcm-hm-tthocmon',
  'hcm-bc-tttantuc',
  'hcm-nb-ttnhabe',
  'hcm-cg-ttcanthanh',
  'hcm-td-thoihoa',
  'hcm-q12-donghungthuan',
  'hcm-cc-phuocvinhan',
]);

const processedBaseData: Record<string, DistrictData> = {};

for (const [key, item] of Object.entries(BASE_DISTRICTS_DATA)) {
  if (EXCLUDED_IDS.has(key)) continue;

  let regionGroup = 'Khu vực TP.HCM cũ';
  if (key === 'hcm-vt-longson' || key === 'hcm-dac-khu-condao') {
    regionGroup = 'Khu vực Bà Rịa – Vũng Tàu cũ';
  }

  processedBaseData[key] = {
    ...item,
    districtGroup: regionGroup,
  };
}

// 168 đơn vị hành chính: 113 Phường + 54 Xã + 1 Đặc khu Côn Đảo
export const DISTRICTS_DATA: Record<string, DistrictData> = {
  ...processedBaseData,
  ...BEN_CAT_WARDS_DATA,
};

// 3 khu vực hành chính theo Nghị quyết 1685/NQ-UBTVQH15
export const HCM_DISTRICT_GROUPS = [
  'Tất cả',
  'Khu vực TP.HCM cũ',
  'Khu vực Bình Dương cũ',
  'Khu vực Bà Rịa – Vũng Tàu cũ',
] as const;

export type { AdminUnitInfo };
