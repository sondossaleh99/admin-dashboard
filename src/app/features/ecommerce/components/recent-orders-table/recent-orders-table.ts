import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, input, signal } from '@angular/core';
import { Table, TableModule } from 'primeng/table';

import { Order, OrderStatus, OrderStatusLookup, SHARED_IMPORTS } from '../../../../shared';

const SEARCH_DEBOUNCE_MS = 250;

/**
 * Sortable, paginated, searchable orders table.
 *
 * PrimeNG owns this component's interactivity — sorting, pagination and the
 * filter predicate — the kind of weight PrimeNG is reserved for (the topbar
 * dropdown is hand-rolled instead because PrimeNG's menu cost 131 kB).
 */
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

  /** p-table's `value` input wants a mutable array; the input signal itself is never mutated. */
  tableValue = computed(() => [...this.orders()]);

  searchTerm = signal('');
  rows = 6;

  /**
   * Takes a plain string rather than `OrderStatus`: PrimeNG's named `#body`
   * template outlet has no `ngTemplateContextGuard`, so Angular's template
   * checker can't narrow `let-row` to `Order` and widens its fields to
   * `string`. A method boundary is simpler than fighting that inference.
   */
  statusLabelFor(status: string): string {
    return OrderStatusLookup.getLabels()[status as OrderStatus] ?? status;
  }

  subtitle = computed(() => `${this.orders().length} orders`);

  constructor() {
    this.destroyRef.onDestroy(() => clearTimeout(this.debounceHandle));
  }

  /** Debounced so a fast typist doesn't refilter the table on every keystroke. */
  onSearchInput(value: string, dt: Table): void {
    clearTimeout(this.debounceHandle);
    this.debounceHandle = setTimeout(() => {
      this.searchTerm.set(value);
      dt.filterGlobal(value, 'contains');
    }, SEARCH_DEBOUNCE_MS);
  }
}
