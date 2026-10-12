import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
  viewChild
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Table, TableModule } from 'primeng/table';
import { Subject, debounceTime } from 'rxjs';

import {
  Order,
  OrderActivityLookup,
  OrderStatusLabelPipe,
  OrderStatusLookup,
  SHARED_IMPORTS
} from '../../../../shared';

const SEARCH_DEBOUNCE_MS = 250;

@Component({
  selector: 'app-recent-orders-table',
  imports: [...SHARED_IMPORTS, TableModule, OrderStatusLabelPipe],
  templateUrl: './recent-orders-table.html',
  styleUrl: './recent-orders-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentOrdersTableComponent {
  orders = input.required<Order[]>();

  table = viewChild.required<Table>('dt');

  tableValue = computed(() => {
    const activity = OrderActivityLookup.getActivity();
    return this.orders().map((order) => ({
      ...order,
      statusLabel: OrderStatusLookup.getLabel(order.status),
      statusTone: activity[order.status].tone
    }));
  });

  subtitle = computed(() => `${this.orders().length} orders`);

  searchInput = new Subject<string>();
  searchTerm = signal('');
  rows = 6;

  constructor() {
    this.searchInput
      .pipe(debounceTime(SEARCH_DEBOUNCE_MS), takeUntilDestroyed())
      .subscribe((value) => {
        this.searchTerm.set(value);
        this.table().filterGlobal(value, 'contains');
      });
  }

  onSearchInput(value: string): void {
    this.searchInput.next(value);
  }
}
