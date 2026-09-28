import { Earnings } from './components/earnings-hero/earnings';
import { Kpi } from './components/kpi-row/kpi';
import { RevenuePoint } from './components/revenue-updates-card/revenue-point';
import { SalesSlice } from './components/sales-breakdown-card/sales-slice';
import { WeeklyStat } from './components/weekly-stats-card/weekly-stat';
import { Order } from './components/recent-orders-table/order';

/** Everything the ecommerce page renders, resolved in one call. */
export interface EcommerceDashboard {
  earnings: Earnings;
  kpis: Kpi[];
  revenue: RevenuePoint[];
  salesBreakdown: SalesSlice[];
  weeklyStats: WeeklyStat[];
  recentOrders: Order[];
}
