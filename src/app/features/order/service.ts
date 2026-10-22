import { Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Observable, of } from 'rxjs';

import { OrderListItem, OrderStatus, PageRequest, PagedResult } from '../../shared';

const orders: OrderListItem[] = [
  {
    id: '10248',
    customer: 'Vinet',
    item: 'Fresh Tomato',
    placedAt: '2026-10-21',
    total: 32.38,
    status: OrderStatus.Pending,
    location: 'USA'
  },
  {
    id: '345653',
    customer: 'Carson Darrin',
    item: 'Butter Scotch',
    placedAt: '2026-10-21',
    total: 56.34,
    status: OrderStatus.Paid,
    location: 'Delhi'
  },
  {
    id: '390457',
    customer: 'Fran Perez',
    item: 'Candy Gucci',
    placedAt: '2026-10-20',
    total: 93.31,
    status: OrderStatus.Paid,
    location: 'New York'
  },
  {
    id: '893486',
    customer: 'Anika Viseer',
    item: 'Night Lamp',
    placedAt: '2026-10-20',
    total: 93.31,
    status: OrderStatus.Cancelled,
    location: 'Germany'
  },
  {
    id: '748975',
    customer: 'Miron Vitold',
    item: 'Healthcare Erbology',
    placedAt: '2026-10-19',
    total: 23.99,
    status: OrderStatus.Refunded,
    location: 'Spain'
  },
  {
    id: '94757',
    customer: 'Omar Darobe',
    item: 'Makeup Lancome Rouge',
    placedAt: '2026-10-19',
    total: 95.99,
    status: OrderStatus.Pending,
    location: 'USA'
  },
  {
    id: '944895',
    customer: 'Lulia Albu',
    item: 'Skincare',
    placedAt: '2026-10-18',
    total: 24.99,
    status: OrderStatus.Paid,
    location: 'USA'
  },
  {
    id: '845954',
    customer: 'Penjani Inyene',
    item: 'Headphone',
    placedAt: '2026-10-18',
    total: 63.99,
    status: OrderStatus.Pending,
    location: 'USA'
  },
  {
    id: '845849',
    customer: 'Nasimiyu Danai',
    item: 'Smart Watch',
    placedAt: '2026-10-17',
    total: 199,
    status: OrderStatus.Paid,
    location: 'Kenya'
  },
  {
    id: '874534',
    customer: 'Nancy Davolio',
    item: 'Coffee Grinder',
    placedAt: '2026-10-17',
    total: 89.9,
    status: OrderStatus.Cancelled,
    location: 'United Kingdom'
  },
  {
    id: '38489',
    customer: 'Siegbert Gottfried',
    item: 'Desk Lamp',
    placedAt: '2026-10-16',
    total: 58.75,
    status: OrderStatus.Paid,
    location: 'Germany'
  },
  {
    id: '24546',
    customer: 'Sunil Joshi',
    item: 'Yoga Mat',
    placedAt: '2026-10-16',
    total: 27.5,
    status: OrderStatus.Pending,
    location: 'India'
  },
  {
    id: '874213',
    customer: 'Andrew McDowell',
    item: 'Water Bottle',
    placedAt: '2026-10-15',
    total: 18.4,
    status: OrderStatus.Paid,
    location: 'USA'
  },
  {
    id: '765432',
    customer: 'Christopher Jamil',
    item: 'Backpack',
    placedAt: '2026-10-15',
    total: 64,
    status: OrderStatus.Refunded,
    location: 'Saudi Arabia'
  },
  {
    id: '512398',
    customer: 'Layla Haddad',
    item: 'Wooden Chair',
    placedAt: '2026-10-14',
    total: 148,
    status: OrderStatus.Paid,
    location: 'UAE'
  },
  {
    id: '623874',
    customer: 'Michael Brown',
    item: 'Leather Wallet',
    placedAt: '2026-10-14',
    total: 41.2,
    status: OrderStatus.Pending,
    location: 'Canada'
  },
  {
    id: '439201',
    customer: 'Nirav Joshi',
    item: 'Sneakers',
    placedAt: '2026-10-13',
    total: 120.5,
    status: OrderStatus.Paid,
    location: 'India'
  },
  {
    id: '287365',
    customer: 'Iulia Pop',
    item: 'Red Headphones',
    placedAt: '2026-10-13',
    total: 74.99,
    status: OrderStatus.Cancelled,
    location: 'Romania'
  },
  {
    id: '918273',
    customer: 'Noah Bennett',
    item: 'Mechanical Keyboard',
    placedAt: '2026-10-12',
    total: 139.5,
    status: OrderStatus.Paid,
    location: 'USA'
  },
  {
    id: '564738',
    customer: 'Amelia Hart',
    item: 'Wireless Earbuds',
    placedAt: '2026-10-12',
    total: 89,
    status: OrderStatus.Refunded,
    location: 'Australia'
  },
  {
    id: '382910',
    customer: 'Ethan Brooks',
    item: '4K Monitor',
    placedAt: '2026-10-11',
    total: 429.99,
    status: OrderStatus.Paid,
    location: 'Canada'
  },
  {
    id: '192837',
    customer: 'Maya Osman',
    item: 'Ergonomic Chair',
    placedAt: '2026-10-11',
    total: 358,
    status: OrderStatus.Pending,
    location: 'Egypt'
  },
  {
    id: '746382',
    customer: 'Liam Carter',
    item: 'USB-C Dock',
    placedAt: '2026-10-10',
    total: 96.75,
    status: OrderStatus.Paid,
    location: 'Ireland'
  },
  {
    id: '655443',
    customer: 'Sara Ali',
    item: 'Standing Desk',
    placedAt: '2026-10-10',
    total: 612,
    status: OrderStatus.Cancelled,
    location: 'Jordan'
  }
];

@Injectable()
export class OrderService {
  page = signal<PageRequest>({ first: 0, rows: 10 });

  getOrders(request: PageRequest): Observable<PagedResult<OrderListItem>> {
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
