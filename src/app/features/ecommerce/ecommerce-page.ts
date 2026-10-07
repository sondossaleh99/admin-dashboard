import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import {
  ActivityEvent,
  ComboSeries,
  EmptyStateComponent,
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

  dashboard = rxResource({
    stream: () => this.service.getDashboard()
  });

  data = computed(() => (this.dashboard.hasValue() ? this.dashboard.value() : undefined));
  loading = computed(() => this.dashboard.status() === 'loading');
  error = computed(() => this.dashboard.status() === 'error');

  range = signal<RevenueRange>(RevenueRange.TwelveMonths);

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

  salesTotal = computed(() =>
    (this.data()?.salesBreakdown ?? []).reduce((sum, slice) => sum + slice.value, 0)
  );

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
}
