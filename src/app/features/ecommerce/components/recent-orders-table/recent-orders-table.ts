import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { TableModule } from 'primeng/table';

import { Order, OrderActivityLookup, OrderStatusLookup, SHARED_IMPORTS } from '../../../../shared';

@Component({
  selector: 'app-recent-orders-table',
  imports: [...SHARED_IMPORTS, TableModule],
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

  searchTerm = signal('');
  searchDelay = 250;
  rows = 6;
}
