import { IconChipTone } from '../enum/icon-chip-tone';
import { KpiFormat } from '../enum/kpi-format';

/** A KPI tile's figures. */
export interface Kpi {
  id: string;
  label: string;
  value: number;
  format: KpiFormat;
  /** Signed percentage change against the previous period. */
  delta: number;
  icon: string;
  tone: IconChipTone;
}
