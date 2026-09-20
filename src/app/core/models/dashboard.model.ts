/** A KPI tile's figures. */
export interface Kpi {
  readonly id: string;
  readonly label: string;
  readonly value: number;
  /** Controls how `value` is rendered: as money, a plain count, or a percentage. */
  readonly format: 'currency' | 'number' | 'percent';
  /** Signed percentage change against the previous period. */
  readonly delta: number;
  readonly icon: string;
  readonly tone: 'primary' | 'series-2' | 'series-3' | 'series-4';
}

/** One point on the revenue chart's shared category axis. */
export interface RevenuePoint {
  /** Short month label, e.g. `Jan`. */
  readonly period: string;
  readonly budget: number;
  readonly expense: number;
}

/** A slice of the sales breakdown donut. */
export interface SalesSlice {
  readonly label: string;
  readonly value: number;
}

/** A row in the weekly stats list, with its own sparkline series. */
export interface WeeklyStat {
  readonly id: string;
  readonly label: string;
  readonly caption: string;
  readonly value: number;
  readonly delta: number;
  readonly icon: string;
  readonly trend: readonly number[];
}

export type OrderStatus = 'paid' | 'pending' | 'refunded' | 'cancelled';

/** A row in the recent orders table. */
export interface Order {
  readonly id: string;
  readonly customer: string;
  readonly item: string;
  /** ISO date string; formatted at render time, never stored pre-formatted. */
  readonly placedAt: string;
  readonly total: number;
  readonly status: OrderStatus;
}

/** The hero banner's headline figures. */
export interface Earnings {
  readonly label: string;
  readonly total: number;
  readonly delta: number;
  readonly budget: number;
  readonly expense: number;
  /** Sparkline series behind the headline figure. */
  readonly trend: readonly number[];
}

/** Everything the ecommerce page renders, resolved in one call. */
export interface EcommerceDashboard {
  readonly earnings: Earnings;
  readonly kpis: readonly Kpi[];
  readonly revenue: readonly RevenuePoint[];
  readonly salesBreakdown: readonly SalesSlice[];
  readonly weeklyStats: readonly WeeklyStat[];
  readonly recentOrders: readonly Order[];
}

/** Period filter on the revenue card. */
export type RevenueRange = '6m' | '12m';
