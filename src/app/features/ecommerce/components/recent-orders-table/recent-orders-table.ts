import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

import { Order, OrderActivityLookup, OrderStatusLookup, SHARED_IMPORTS } from '../../../../shared';

@Component({
  selector: 'app-recent-orders-table',
  imports: [...SHARED_IMPORTS, TableModule, IconField, InputIcon, InputText],
  templateUrl: './recent-orders-table.html',
  styleUrl: './recent-orders-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentOrdersTableComponent {
  orders = input.required<Order[]>();

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
