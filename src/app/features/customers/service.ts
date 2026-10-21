import { Injectable, computed } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Observable, delay, of } from 'rxjs';

import { CUSTOMERS } from './mock-data';
import { Customer } from '../../shared';

@Injectable()
export class CustomersService {
  latencyMs = 300;

  getCustomers(): Observable<Customer[]> {
    return of(CUSTOMERS).pipe(delay(this.latencyMs));
  }

  customers = rxResource({
    stream: () => this.getCustomers()
  });

  data = computed(() => (this.customers.hasValue() ? this.customers.value() : undefined));
  loading = computed(() => this.customers.status() === 'loading');
  error = computed(() => this.customers.status() === 'error');

  retry(): void {
    this.customers.reload();
  }

  remove(ids: number[]): void {
    this.customers.update((customers) =>
      customers?.filter((customer) => !ids.includes(customer.id))
    );
  }
}
