import { Earnings } from './earnings';
import { Kpi } from './kpi';
import { RevenuePoint } from './revenue-point';
import { SalesSlice } from './sales-slice';
import { WeeklyStat } from './weekly-stat';
import { Order } from './order';

/** Everything the ecommerce page renders, resolved in one call. */
export interface EcommerceDashboard {
  earnings: Earnings;
  kpis: Kpi[];
  revenue: RevenuePoint[];
  salesBreakdown: SalesSlice[];
  weeklyStats: WeeklyStat[];
  recentOrders: Order[];
}
