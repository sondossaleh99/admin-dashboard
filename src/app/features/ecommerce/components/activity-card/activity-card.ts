import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { ActivityEvent, Order, OrderActivityLookup, SHARED_IMPORTS } from '../../../../shared';

@Component({
  selector: 'app-activity-card',
  imports: [...SHARED_IMPORTS],
  templateUrl: './activity-card.html',
  styleUrl: './activity-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityCardComponent {
  orders = input.required<Order[]>();

  events = computed<ActivityEvent[]>(() =>
    this.orders()
      .slice(0, 5)
      .map((order) => this.toActivityEvent(order))
  );

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
