import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, input, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Table, TableModule } from 'primeng/table';

import { Order, OrderStatus } from '../../../../core/models/dashboard.model';
import { UiCard } from '../../../../shared/ui/ui-card/ui-card';

const SEARCH_DEBOUNCE_MS = 250;

/**
 * Sortable, paginated, searchable orders table.
 *
 * PrimeNG owns this component's interactivity — sorting, pagination and the
 * filter predicate — which is exactly the kind of weight the plan reserves
 * PrimeNG for (see Stage 2's decision to drop it from the topbar dropdown).
 */
@Component({
  selector: 'app-recent-orders-table',
  imports: [CurrencyPipe, DatePipe, TableModule, UiCard],
  templateUrl: './recent-orders-table.html',
  styleUrl: './recent-orders-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentOrdersTable {
  private readonly destroyRef = inject(DestroyRef);
  private debounceHandle?: ReturnType<typeof setTimeout>;

  readonly orders = input.required<readonly Order[]>();

  /** p-table's `value` input wants a mutable array; the source stays readonly. */
  readonly tableValue = computed(() => [...this.orders()]);

  readonly searchTerm = signal('');
  readonly rows = 6;

  private readonly statusLabel: Record<OrderStatus, string> = {
    paid: 'Paid',
    pending: 'Pending',
    refunded: 'Refunded',
    cancelled: 'Cancelled'
  };

  /**
   * Takes a plain string rather than `OrderStatus`: PrimeNG's named `#body`
   * template outlet has no `ngTemplateContextGuard`, so Angular's template
   * checker can't narrow `let-row` to `Order` and widens its fields to
   * `string`. A method boundary is simpler than fighting that inference.
   */
  statusLabelFor(status: string): string {
    return this.statusLabel[status as OrderStatus] ?? status;
  }

  readonly subtitle = computed(() => `${this.orders().length} orders`);

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
