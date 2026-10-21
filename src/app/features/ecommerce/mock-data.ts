import {
  EcommerceDashboard,
  IconChipTone,
  Kpi,
  KpiFormat,
  Order,
  OrderStatus,
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

const RECENT_ORDERS: Order[] = [
  {
    id: 'ORD-4821',
    customer: 'Amelia Hart',
    item: 'Wireless headphones',
    placedAt: '2026-09-14',
    total: 249.0,
    status: OrderStatus.Paid,
    location: 'USA'
  },
  {
    id: 'ORD-4820',
    customer: 'Noah Bennett',
    item: 'Mechanical keyboard',
    placedAt: '2026-09-14',
    total: 139.5,
    status: OrderStatus.Pending,
    location: 'India'
  },
  {
    id: 'ORD-4819',
    customer: 'Layla Haddad',
    item: 'Standing desk',
    placedAt: '2026-09-13',
    total: 612.0,
    status: OrderStatus.Paid,
    location: 'Germany'
  },
  {
    id: 'ORD-4818',
    customer: 'Ethan Brooks',
    item: '4K monitor',
    placedAt: '2026-09-13',
    total: 429.99,
    status: OrderStatus.Refunded,
    location: 'Canada'
  },
  {
    id: 'ORD-4817',
    customer: 'Maya Osman',
    item: 'Ergonomic chair',
    placedAt: '2026-09-12',
    total: 358.0,
    status: OrderStatus.Paid,
    location: 'United Kingdom'
  },
  {
    id: 'ORD-4816',
    customer: 'Liam Carter',
    item: 'USB-C dock',
    placedAt: '2026-09-12',
    total: 96.75,
    status: OrderStatus.Cancelled,
    location: 'UAE'
  },
  {
    id: 'ORD-4815',
    customer: 'Sara Nasser',
    item: 'Laptop stand',
    placedAt: '2026-09-11',
    total: 64.0,
    status: OrderStatus.Paid,
    location: 'Saudi Arabia'
  },
  {
    id: 'ORD-4814',
    customer: 'Owen Fletcher',
    item: 'Webcam 1080p',
    placedAt: '2026-09-11',
    total: 82.4,
    status: OrderStatus.Pending,
    location: 'France'
  },
  {
    id: 'ORD-4813',
    customer: 'Dana Aziz',
    item: 'Noise-cancelling earbuds',
    placedAt: '2026-09-10',
    total: 179.0,
    status: OrderStatus.Paid,
    location: 'Australia'
  },
  {
    id: 'ORD-4812',
    customer: 'Jack Thornton',
    item: 'Portable SSD 1TB',
    placedAt: '2026-09-10',
    total: 143.2,
    status: OrderStatus.Paid,
    location: 'Japan'
  },
  {
    id: 'ORD-4811',
    customer: 'Nora Khalil',
    item: 'Desk lamp',
    placedAt: '2026-09-09',
    total: 48.9,
    status: OrderStatus.Refunded,
    location: 'Brazil'
  },
  {
    id: 'ORD-4810',
    customer: 'Isaac Moore',
    item: 'Cable organiser',
    placedAt: '2026-09-09',
    total: 22.0,
    status: OrderStatus.Paid,
    location: 'Spain'
  }
];

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
