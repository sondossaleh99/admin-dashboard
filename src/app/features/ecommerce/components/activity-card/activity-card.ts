import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { LanguageService } from '../../../../core';

import {
  ActivityEvent,
  ActivityToneLookup,
  Order,
  OrderActivityLookup,
  SHARED_IMPORTS
} from '../../../../shared';

@Component({
  selector: 'app-activity-card',
  imports: [...SHARED_IMPORTS],
  templateUrl: './activity-card.html',
  styleUrl: './activity-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityCardComponent {
  translate = inject(TranslateService);
  language = inject(LanguageService);

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
      tone: ActivityToneLookup.getLabel(meta.tone),
      title: String(this.translate.instant(meta.title, { id: order.id })),
      detail: `${order.customer} · ${order.item}`,
      timestamp: order.placedAt
    };
  }
}
