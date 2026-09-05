import { DistrictData } from '../types';
import { DISTRICTS_DATA as BASE_DISTRICTS_DATA, HCM_DISTRICT_GROUPS as BASE_GROUPS, AdminUnitInfo } from './hcmWards168';
import { BEN_CAT_WARDS_DATA } from './benCatWards';

export const DISTRICTS_DATA: Record<string, DistrictData> = {
  ...BASE_DISTRICTS_DATA,
  ...BEN_CAT_WARDS_DATA,
};

export const HCM_DISTRICT_GROUPS: readonly string[] = [
  ...BASE_GROUPS,
  'Khu vực Bến Cát (Bắc TP.HCM)',
];

export type { AdminUnitInfo };

