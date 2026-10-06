import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  input,
  signal
} from '@angular/core';
import { Table, TableModule } from 'primeng/table';

import { Order, OrderStatus, OrderStatusLookup, SHARED_IMPORTS } from '../../../../shared';

const SEARCH_DEBOUNCE_MS = 250;

@Component({
  selector: 'app-recent-orders-table',
  imports: [...SHARED_IMPORTS, TableModule],
  templateUrl: './recent-orders-table.html',
  styleUrl: './recent-orders-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentOrdersTableComponent {
  destroyRef = inject(DestroyRef);
  debounceHandle?: ReturnType<typeof setTimeout>;

  orders = input.required<Order[]>();

  tableValue = computed(() => [...this.orders()]);

  searchTerm = signal('');
  rows = 6;

  statusLabelFor(status: string): string {
    return OrderStatusLookup.getLabels()[status as OrderStatus] ?? status;
  }

  subtitle = computed(() => `${this.orders().length} orders`);

  constructor() {
    this.destroyRef.onDestroy(() => clearTimeout(this.debounceHandle));
  }

  onSearchInput(value: string, dt: Table): void {
    clearTimeout(this.debounceHandle);
    this.debounceHandle = setTimeout(() => {
      this.searchTerm.set(value);
      dt.filterGlobal(value, 'contains');
    }, SEARCH_DEBOUNCE_MS);
  }
}
