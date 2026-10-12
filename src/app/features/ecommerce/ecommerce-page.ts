import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import {
  ActivityEvent,
  EmptyStateComponent,
  Order,
  OrderActivityLookup,
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

  activity = computed<ActivityEvent[]>(() =>
    (this.data()?.recentOrders ?? []).slice(0, 5).map((order) => this.toActivityEvent(order))
  );

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
