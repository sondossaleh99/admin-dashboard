import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { Avatar } from 'primeng/avatar';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';

import {
  ActivityToneLookup,
  OrderActivityLookup,
  OrderListItem,
  OrderStatusLookup,
  PageRequest,
  SHARED_IMPORTS
} from '../../../../shared';

@Component({
  selector: 'app-order-table',
  imports: [...SHARED_IMPORTS, TableModule, Avatar],
  templateUrl: './order-table.component.html',
  styleUrl: './order-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderTableComponent {
  orders = input.required<OrderListItem[]>();
  totalRecords = input.required<number>();
  loading = input(false);
  first = input(0);
  rows = input(10);

  pageChange = output<PageRequest>();

  rowsPerPageOptions = [5, 10, 20];

  tableValue = computed(() => {
    const activity = OrderActivityLookup.getActivity();
    return this.orders().map((order) => ({
      ...order,
      statusLabel: OrderStatusLookup.getLabel(order.status),
      statusTone: ActivityToneLookup.getLabel(activity[order.status].tone)
    }));
  });

  subtitle = computed(() => `${this.totalRecords()} orders`);

  onLazyLoad(event: TableLazyLoadEvent): void {
    this.pageChange.emit({ first: event.first ?? 0, rows: event.rows ?? this.rows() });
  }
}
