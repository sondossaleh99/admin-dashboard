import { Kpi } from './kpi';

/** A KPI with its figure already formatted for display. */
export interface KpiViewModel extends Kpi {
  display: string;
}
