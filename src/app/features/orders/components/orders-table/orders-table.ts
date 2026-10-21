import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Avatar } from 'primeng/avatar';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

import {
  InitialsPipe,
  Order,
  OrderActivityLookup,
  OrderStatusLookup,
  SHARED_IMPORTS,
  StatusBadgeComponent
} from '../../../../shared';

@Component({
  selector: 'app-orders-table',
  imports: [
    ...SHARED_IMPORTS,
    TableModule,
    Avatar,
    IconField,
    InputIcon,
    InputText,
    InitialsPipe,
    StatusBadgeComponent
  ],
  templateUrl: './orders-table.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersTableComponent {
  orders = input.required<Order[]>();

  pageSize = 10;

  tableValue = computed(() => {
    const activity = OrderActivityLookup.getActivity();
    return this.orders().map((order) => ({
      ...order,
      statusLabel: OrderStatusLookup.getLabel(order.status),
      statusTone: activity[order.status].tone
    }));
  });

  subtitle = computed(() => `${this.orders().length} orders`);
}
