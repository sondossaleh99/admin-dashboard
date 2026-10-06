import { IconChipTone } from '../enum/icon-chip-tone';
import { KpiFormat } from '../enum/kpi-format';

export interface Kpi {
  id: string;
  label: string;
  value: number;
  format: KpiFormat;
  delta: number;
  icon: string;
  tone: IconChipTone;
}
