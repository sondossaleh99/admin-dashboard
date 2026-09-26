import { IconChipTone } from '../../../shared';

/** A KPI tile's figures. */
export interface Kpi {
  id: string;
  label: string;
  value: number;
  /** Controls how `value` is rendered: as money, a plain count, or a percentage. */
  format: 'currency' | 'number' | 'percent';
  /** Signed percentage change against the previous period. */
  delta: number;
  icon: string;
  tone: IconChipTone;
}
