import { Earnings } from './earnings.model';
import { Kpi } from './kpi.model';
import { RevenuePoint } from './revenue-point.model';
import { SalesSlice } from './sales-slice.model';
import { WeeklyStat } from './weekly-stat.model';
import { Order } from './order.model';

export interface EcommerceDashboard {
  earnings: Earnings;
  kpis: Kpi[];
  revenue: RevenuePoint[];
  salesBreakdown: SalesSlice[];
  weeklyStats: WeeklyStat[];
  recentOrders: Order[];
}
