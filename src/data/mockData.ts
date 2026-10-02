import { DistrictData } from '../types';
import { ADMIN_UNITS, ADMIN_UNITS_DATA, AdminUnitInfo } from './adminUnits';

// 168 đơn vị hành chính: 113 Phường + 54 Xã + 1 Đặc khu Côn Đảo
// Chuẩn hóa theo Nghị quyết 1685/NQ-UBTVQH15
export const DISTRICTS_DATA: Record<string, DistrictData> = ADMIN_UNITS_DATA as unknown as Record<string, DistrictData>;

// 3 khu vực hành chính theo Nghị quyết 1685/NQ-UBTVQH15
export const HCM_DISTRICT_GROUPS = [
  'Tất cả',
  'Khu vực TP.HCM cũ',
  'Khu vực Bình Dương cũ',
  'Khu vực Bà Rịa – Vũng Tàu cũ',
] as const;

export type { AdminUnitInfo };
export { ADMIN_UNITS, ADMIN_UNITS_DATA };
