import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { Avatar } from 'primeng/avatar';
import { ButtonDirective, ButtonIcon, ButtonLabel } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

import {
  Customer,
  CustomerStatusLookup,
  InitialsPipe,
  SHARED_IMPORTS,
  StatusBadgeComponent
} from '../../../../shared';

@Component({
  selector: 'app-customers-table',
  imports: [
    ...SHARED_IMPORTS,
    TableModule,
    Avatar,
    ButtonDirective,
    ButtonIcon,
    ButtonLabel,
    IconField,
    InputIcon,
    InputText,
    InitialsPipe,
    StatusBadgeComponent
  ],
  templateUrl: './customers-table.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomersTableComponent {
  customers = input.required<Customer[]>();

  remove = output<number[]>();

  pageSize = 10;

  selected = signal<Customer[]>([]);

  tableValue = computed(() =>
    this.customers().map((customer) => ({
      ...customer,
      statusLabel: CustomerStatusLookup.getLabel(customer.status),
      statusTone: CustomerStatusLookup.getTone(customer.status)
    }))
  );

  subtitle = computed(() => `${this.customers().length} customers`);

  deleteLabel = computed(() =>
    this.selected().length ? `Delete (${this.selected().length})` : 'Delete'
  );

  deleteSelected(): void {
    this.remove.emit(this.selected().map((customer) => customer.id));
    this.selected.set([]);
  }
}
