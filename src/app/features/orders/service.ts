import { Injectable, computed } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Observable, delay, of } from 'rxjs';

import { ORDERS } from './mock-data';
import { Order } from '../../shared';

@Injectable()
export class OrdersService {
  latencyMs = 300;

  getOrders(): Observable<Order[]> {
    return of(ORDERS).pipe(delay(this.latencyMs));
  }

  orders = rxResource({
    stream: () => this.getOrders()
  });

  data = computed(() => (this.orders.hasValue() ? this.orders.value() : undefined));
  loading = computed(() => this.orders.status() === 'loading');
  error = computed(() => this.orders.status() === 'error');

  retry(): void {
    this.orders.reload();
  }
}
