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
    label: 'Customers',
    value: 39354,
    format: KpiFormat.Number,
    delta: 4,
    icon: 'pi-users',
    tone: IconChipTone.Primary
  },
  {
    id: 'products',
    label: 'Products',
    value: 4396,
    format: KpiFormat.Number,
    delta: 23,
    icon: 'pi-box',
    tone: IconChipTone.Series2
  },
  {
    id: 'sales',
    label: 'Sales',
    value: 42339,
    format: KpiFormat.Currency,
    delta: 38,
    icon: 'pi-chart-bar',
    tone: IconChipTone.Series3
  },
  {
    id: 'refunds',
    label: 'Refunds',
    value: 1274,
    format: KpiFormat.Number,
    delta: -12,
    icon: 'pi-replay',
    tone: IconChipTone.Series4
  }
];

const REVENUE: RevenuePoint[] = [
  { period: 'Jan', budget: 38000, expense: 24000 },
  { period: 'Feb', budget: 42000, expense: 27500 },
  { period: 'Mar', budget: 46500, expense: 31000 },
  { period: 'Apr', budget: 41000, expense: 28500 },
  { period: 'May', budget: 52000, expense: 34000 },
  { period: 'Jun', budget: 57500, expense: 36500 },
  { period: 'Jul', budget: 54000, expense: 39000 },
  { period: 'Aug', budget: 61000, expense: 41500 },
  { period: 'Sep', budget: 66500, expense: 43000 },
  { period: 'Oct', budget: 71000, expense: 46500 },
  { period: 'Nov', budget: 78500, expense: 49000 },
  { period: 'Dec', budget: 93438, expense: 52500 }
];

const SALES_BREAKDOWN: SalesSlice[] = [
  { label: 'Online store', value: 18450 },
  { label: 'Marketplace', value: 12300 },
  { label: 'Retail', value: 8720 },
  { label: 'Wholesale', value: 3776 }
];

const WEEKLY_STATS: WeeklyStat[] = [
  {
    id: 'top-sales',
    label: 'Top sales',
    caption: 'Johnathan Doe',
    value: 12500,
    delta: 18,
    icon: 'pi-trophy',
    trend: [12, 18, 15, 22, 19, 27, 31]
  },
  {
    id: 'best-seller',
    label: 'Best seller',
    caption: 'Wireless headphones',
    value: 8420,
    delta: 12,
    icon: 'pi-star',
    trend: [20, 17, 22, 19, 24, 23, 28]
  },
  {
    id: 'most-commented',
    label: 'Most commented',
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
    label: 'Earnings',
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
