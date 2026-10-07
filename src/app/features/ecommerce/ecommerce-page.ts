import {
  ChangeDetectionStrategy,
  Component,
  LOCALE_ID,
  computed,
  inject,
  signal
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { formatCurrency, formatNumber, formatPercent } from '@angular/common';

import {
  ActivityEvent,
  ComboSeries,
  EmptyStateComponent,
  KpiFormat,
  KpiViewModel,
  Order,
  OrderActivityLookup,
  RevenueRange,
  RevenueTotals,
  SHARED_IMPORTS,
  SectionHeaderComponent,
  SkeletonBlockComponent
} from '../../shared';
import { EcommerceService } from './service';
import {
  ActivityCardComponent,
  EarningsHeroComponent,
  KpiRowComponent,
  RecentOrdersTableComponent,
  RevenueUpdatesCardComponent,
  SalesBreakdownCardComponent,
  WeeklyStatsCardComponent
} from './components';

/**
 * Route target for `/ecommerce`.
 *
 * Assembles the dashboard sections from the shared UI primitives and chart
 * wrappers. This component owns data fetching, derived state and formatting;
 * every section below it is presentational.
 */
@Component({
  selector: 'app-ecommerce-page',
  imports: [
    ...SHARED_IMPORTS,
    SectionHeaderComponent,
    SkeletonBlockComponent,
    EmptyStateComponent,
    EarningsHeroComponent,
    KpiRowComponent,
    RevenueUpdatesCardComponent,
    SalesBreakdownCardComponent,
    WeeklyStatsCardComponent,
    RecentOrdersTableComponent,
    ActivityCardComponent
  ],
  templateUrl: './ecommerce-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EcommercePageComponent {
  service = inject(EcommerceService);
  locale = inject(LOCALE_ID);

  /** Owns loading, error and value as signals, and gives retry a `reload()`. */
  dashboard = rxResource({
    stream: () => this.service.getDashboard()
  });

  /**
   * The loaded dashboard, or `undefined` while loading or after a failure.
   *
   * `dashboard.value()` throws while the resource is in an error state, so it
   * is only read once `hasValue()` confirms there is something to read. That
   * keeps every `?? []` fallback below meaningful.
   */
  data = computed(() => (this.dashboard.hasValue() ? this.dashboard.value() : undefined));
  loading = computed(() => this.dashboard.status() === 'loading');
  error = computed(() => this.dashboard.status() === 'error');

  /** Revenue card's period filter. */
  range = signal<RevenueRange>(RevenueRange.TwelveMonths);

  /** Derived, not stored: changing the range never mutates the source series. */
  revenue = computed(() => {
    const points = this.data()?.revenue ?? [];
    return this.range() === RevenueRange.SixMonths ? points.slice(-6) : points;
  });

  revenueTotals = computed<RevenueTotals>(() => {
    const points = this.revenue();
    const budget = points.reduce((sum, p) => sum + p.budget, 0);
    const expense = points.reduce((sum, p) => sum + p.expense, 0);
    return { budget, expense, margin: budget - expense };
  });

  revenuePeriods = computed(() => this.revenue().map((p) => p.period));

  revenueSeries = computed<ComboSeries[]>(() => [
    { name: 'Budget', data: this.revenue().map((p) => p.budget) },
    { name: 'Expense', data: this.revenue().map((p) => p.expense) }
  ]);

  /**
   * KPIs with their figures already rendered for display.
   *
   * Formatting lives here rather than as a branch in any child's template:
   * the rule differs per KPI, and Angular's own format functions (the ones
   * the pipes call) keep it locale-aware rather than hand-rolled.
   */
  kpis = computed<KpiViewModel[]>(() =>
    (this.data()?.kpis ?? []).map((kpi) => ({
      ...kpi,
      display: this.format(kpi.value, kpi.format)
    }))
  );

  salesTotal = computed(() =>
    (this.data()?.salesBreakdown ?? []).reduce((sum, slice) => sum + slice.value, 0)
  );

  /**
   * Recent activity, derived from the same order data the table shows.
   *
   * See ActivityCardComponent's doc comment: this stands in for a media/blog card the
   * reference site may use, which this build has no real content for.
   */
  activity = computed<ActivityEvent[]>(() =>
    (this.data()?.recentOrders ?? []).slice(0, 5).map((order) => this.toActivityEvent(order))
  );

  setRange(range: RevenueRange): void {
    this.range.set(range);
  }

  retry(): void {
    this.dashboard.reload();
  }

  toActivityEvent(order: Order): ActivityEvent {
    const meta = OrderActivityLookup.getActivity()[order.status];
    return {
      id: order.id,
      icon: meta.icon,
      tone: meta.tone,
      title: `Order #${order.id} ${meta.verb}`,
      detail: `${order.customer} · ${order.item}`,
      timestamp: order.placedAt
    };
  }

  format(value: number, as: KpiFormat): string {
    switch (as) {
      case KpiFormat.Currency:
        return formatCurrency(value, this.locale, '$', 'USD', '1.0-0');
      case KpiFormat.Percent:
        return formatPercent(value / 100, this.locale, '1.0-1');
      default:
        return formatNumber(value, this.locale, '1.0-0');
    }
  }
}
