import { ChangeDetectionStrategy, Component, LOCALE_ID, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { formatCurrency, formatNumber, formatPercent } from '@angular/common';

import { Kpi, Order, OrderStatus, RevenueRange } from '../../core/models/dashboard.model';
import { EcommerceService } from '../../core/services/ecommerce.service';
import { EmptyState } from '../../shared/ui/empty-state/empty-state';
import { SectionHeader } from '../../shared/ui/section-header/section-header';
import { SkeletonBlock } from '../../shared/ui/skeleton-block/skeleton-block';
import { UiCard } from '../../shared/ui/ui-card/ui-card';
import { ActivityCard, ActivityEvent, ActivityTone } from './components/activity-card/activity-card';
import { EarningsHero } from './components/earnings-hero/earnings-hero';
import { KpiRow, KpiViewModel } from './components/kpi-row/kpi-row';
import { ComboSeries } from '../../shared/charts/chart-combo';
import { RecentOrdersTable } from './components/recent-orders-table/recent-orders-table';
import { RevenueTotals, RevenueUpdatesCard } from './components/revenue-updates-card/revenue-updates-card';
import { SalesBreakdownCard } from './components/sales-breakdown-card/sales-breakdown-card';
import { WeeklyStatsCard } from './components/weekly-stats-card/weekly-stats-card';

/** Maps an order's status to the activity feed's icon and tone. */
const ORDER_ACTIVITY: Record<OrderStatus, { icon: string; tone: ActivityTone; verb: string }> = {
  paid: { icon: 'pi-check-circle', tone: 'success', verb: 'was paid' },
  pending: { icon: 'pi-clock', tone: 'warning', verb: 'is awaiting payment' },
  refunded: { icon: 'pi-replay', tone: 'info', verb: 'was refunded' },
  cancelled: { icon: 'pi-times-circle', tone: 'danger', verb: 'was cancelled' }
};

/**
 * Route target for `/ecommerce`.
 *
 * Stage 6: assembles the designed sections from Stage 3's primitives and
 * Stage 5's chart wrappers. This component owns data fetching, derived state
 * and formatting; every section below it is presentational.
 */
@Component({
  selector: 'app-ecommerce-page',
  imports: [
    UiCard,
    SectionHeader,
    SkeletonBlock,
    EmptyState,
    EarningsHero,
    KpiRow,
    RevenueUpdatesCard,
    SalesBreakdownCard,
    WeeklyStatsCard,
    RecentOrdersTable,
    ActivityCard
  ],
  templateUrl: './ecommerce-page.html',
  styleUrl: './ecommerce-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EcommercePage {
  private readonly service = inject(EcommerceService);
  private readonly locale = inject(LOCALE_ID);

  /** Owns loading, error and value as signals, and gives retry a `reload()`. */
  private readonly dashboard = rxResource({
    stream: () => this.service.getDashboard()
  });

  readonly data = this.dashboard.value;
  readonly loading = computed(() => this.dashboard.status() === 'loading');
  readonly error = computed(() => this.dashboard.status() === 'error');

  /** Revenue card's period filter. */
  readonly range = signal<RevenueRange>('12m');

  /** Derived, not stored: changing the range never mutates the source series. */
  readonly revenue = computed(() => {
    const points = this.data()?.revenue ?? [];
    return this.range() === '6m' ? points.slice(-6) : points;
  });

  readonly revenueTotals = computed<RevenueTotals>(() => {
    const points = this.revenue();
    const budget = points.reduce((sum, p) => sum + p.budget, 0);
    const expense = points.reduce((sum, p) => sum + p.expense, 0);
    return { budget, expense, margin: budget - expense };
  });

  readonly revenuePeriods = computed(() => this.revenue().map((p) => p.period));

  readonly revenueSeries = computed<ComboSeries[]>(() => [
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
  readonly kpis = computed<KpiViewModel[]>(() =>
    (this.data()?.kpis ?? []).map((kpi) => ({
      ...kpi,
      display: this.format(kpi.value, kpi.format)
    }))
  );

  readonly salesTotal = computed(() =>
    (this.data()?.salesBreakdown ?? []).reduce((sum, slice) => sum + slice.value, 0)
  );

  /**
   * Recent activity, derived from the same order data the table shows.
   *
   * See ActivityCard's doc comment: this stands in for a media/blog card the
   * reference site may use, which this build has no real content for.
   */
  readonly activity = computed<ActivityEvent[]>(() =>
    (this.data()?.recentOrders ?? []).slice(0, 5).map((order) => this.toActivityEvent(order))
  );

  setRange(range: RevenueRange): void {
    this.range.set(range);
  }

  retry(): void {
    this.dashboard.reload();
  }

  private toActivityEvent(order: Order): ActivityEvent {
    const meta = ORDER_ACTIVITY[order.status];
    return {
      id: order.id,
      icon: meta.icon,
      tone: meta.tone,
      title: `Order #${order.id} ${meta.verb}`,
      detail: `${order.customer} · ${order.item}`,
      timestamp: order.placedAt
    };
  }

  private format(value: number, as: Kpi['format']): string {
    switch (as) {
      case 'currency':
        return formatCurrency(value, this.locale, '$', 'USD', '1.0-0');
      case 'percent':
        return formatPercent(value / 100, this.locale, '1.0-1');
      default:
        return formatNumber(value, this.locale, '1.0-0');
    }
  }
}
