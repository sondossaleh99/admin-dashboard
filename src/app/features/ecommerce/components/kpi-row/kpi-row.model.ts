import { Kpi } from '../../../../core';

/** A KPI with its figure already formatted for display. */
export interface KpiViewModel extends Kpi {
  display: string;
}
