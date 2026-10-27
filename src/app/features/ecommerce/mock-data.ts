import { orders } from '../../core';
import {
  EcommerceDashboard,
  IconChipTone,
  Kpi,
  KpiFormat,
  Order,
  RevenuePoint,
  SalesSlice,
  WeeklyStat
} from '../../shared';

const KPIS: Kpi[] = [
  {
    id: 'customers',
    label: 'ecommerce.kpis.customers',
    value: 39354,
    format: KpiFormat.Number,
    delta: 4,
    icon: 'pi-users',
    tone: IconChipTone.Primary
  },
  {
    id: 'products',
    label: 'ecommerce.kpis.products',
    value: 4396,
    format: KpiFormat.Number,
    delta: 23,
    icon: 'pi-box',
    tone: IconChipTone.Series2
  },
  {
    id: 'sales',
    label: 'ecommerce.kpis.sales',
    value: 42339,
    format: KpiFormat.Currency,
    delta: 38,
    icon: 'pi-chart-bar',
    tone: IconChipTone.Series3
  },
  {
    id: 'refunds',
    label: 'ecommerce.kpis.refunds',
    value: 1274,
    format: KpiFormat.Number,
    delta: -12,
    icon: 'pi-replay',
    tone: IconChipTone.Series4
  }
];

const REVENUE: RevenuePoint[] = [
  { period: '2026-01-01', budget: 38000, expense: 24000 },
  { period: '2026-02-01', budget: 42000, expense: 27500 },
  { period: '2026-03-01', budget: 46500, expense: 31000 },
  { period: '2026-04-01', budget: 41000, expense: 28500 },
  { period: '2026-05-01', budget: 52000, expense: 34000 },
  { period: '2026-06-01', budget: 57500, expense: 36500 },
  { period: '2026-07-01', budget: 54000, expense: 39000 },
  { period: '2026-08-01', budget: 61000, expense: 41500 },
  { period: '2026-09-01', budget: 66500, expense: 43000 },
  { period: '2026-10-01', budget: 71000, expense: 46500 },
  { period: '2026-11-01', budget: 78500, expense: 49000 },
  { period: '2026-12-01', budget: 93438, expense: 52500 }
];

const SALES_BREAKDOWN: SalesSlice[] = [
  { label: 'ecommerce.channels.onlineStore', value: 18450 },
  { label: 'ecommerce.channels.marketplace', value: 12300 },
  { label: 'ecommerce.channels.retail', value: 8720 },
  { label: 'ecommerce.channels.wholesale', value: 3776 }
];

const WEEKLY_STATS: WeeklyStat[] = [
  {
    id: 'top-sales',
    label: 'ecommerce.weekly.topSales',
    caption: 'Johnathan Doe',
    value: 12500,
    delta: 18,
    icon: 'pi-trophy',
    trend: [12, 18, 15, 22, 19, 27, 31]
  },
  {
    id: 'best-seller',
    label: 'ecommerce.weekly.bestSeller',
    caption: 'Wireless headphones',
    value: 8420,
    delta: 12,
    icon: 'pi-star',
    trend: [20, 17, 22, 19, 24, 23, 28]
  },
  {
    id: 'most-commented',
    label: 'ecommerce.weekly.mostCommented',
    caption: 'Autumn campaign',
    value: 2310,
    delta: -4,
    icon: 'pi-comments',
    trend: [30, 28, 31, 26, 24, 25, 22]
  }
];

const RECENT_ORDERS: Order[] = orders.slice(0, 12);

export const ECOMMERCE_DASHBOARD: EcommerceDashboard = {
  earnings: {
    label: 'ecommerce.earnings',
    total: 63448.78,
    delta: 12.4,
    budget: 93438,
    expense: 42500,
    trend: [32, 38, 35, 44, 41, 52, 49, 58, 63]
  },
  kpis: KPIS,
  revenue: REVENUE,
  salesBreakdown: SALES_BREAKDOWN,
  weeklyStats: WEEKLY_STATS,
  recentOrders: RECENT_ORDERS
};
