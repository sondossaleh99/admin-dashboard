import { Earnings } from './components/earnings-hero/earnings.model';
import { Kpi } from './components/kpi-row/kpi.model';
import { RevenuePoint } from './components/revenue-updates-card/revenue-point.model';
import { SalesSlice } from './components/sales-breakdown-card/sales-slice.model';
import { WeeklyStat } from './components/weekly-stats-card/weekly-stat.model';
import { Order } from './components/recent-orders-table/order.model';

/** Everything the ecommerce page renders, resolved in one call. */
export interface EcommerceDashboard {
  earnings: Earnings;
  kpis: Kpi[];
  revenue: RevenuePoint[];
  salesBreakdown: SalesSlice[];
  weeklyStats: WeeklyStat[];
  recentOrders: Order[];
}
