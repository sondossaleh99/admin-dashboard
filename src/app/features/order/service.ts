import { Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Observable, of } from 'rxjs';

import { orders } from '../../core';
import { Order, PageRequest, PagedResult } from '../../shared';

@Injectable()
export class OrderService {
  page = signal<PageRequest>({ first: 0, rows: 10 });

  getOrders(request: PageRequest): Observable<PagedResult<Order>> {
    const data = {
      items: orders.slice(request.first, request.first + request.rows),
      total: orders.length
    };

    return of(data);
  }

  orders = rxResource({
    params: () => this.page(),
    stream: ({ params }) => this.getOrders(params)
  });

  setPage(request: PageRequest): void {
    this.page.set(request);
  }
}
