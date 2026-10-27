import { TestBed } from '@angular/core/testing';

import { Order, OrderStatus } from '../../../../shared';
import { ActivityCardComponent } from './activity-card';

function order(id: string, status: OrderStatus): Order {
  return {
    id,
    customer: `Customer ${id}`,
    item: `Item ${id}`,
    placedAt: '2026-09-14',
    total: 100,
    status,
    location: 'Riyadh'
  };
}

const ORDERS: Order[] = [
  order('1', OrderStatus.Paid),
  order('2', OrderStatus.Pending),
  order('3', OrderStatus.Refunded),
  order('4', OrderStatus.Cancelled),
  order('5', OrderStatus.Paid),
  order('6', OrderStatus.Paid)
];

function setup(orders: Order[] = ORDERS) {
  TestBed.configureTestingModule({ imports: [ActivityCardComponent] });
  TestBed.overrideComponent(ActivityCardComponent, { set: { template: '', imports: [] } });

  const fixture = TestBed.createComponent(ActivityCardComponent);
  fixture.componentRef.setInput('orders', orders);
  fixture.detectChanges();

  return { card: fixture.componentInstance };
}

describe('ActivityCardComponent', () => {
  it('shows the five most recent orders', () => {
    const { card } = setup();

    expect(card.events().map((event) => event.id)).toEqual(['1', '2', '3', '4', '5']);
  });

  it('describes each order by its status', () => {
    const { card } = setup();

    expect(card.events().map((event) => event.title)).toEqual([
      'Order #1 was paid',
      'Order #2 is awaiting payment',
      'Order #3 was refunded',
      'Order #4 was cancelled',
      'Order #5 was paid'
    ]);
    expect(card.events()[0].detail).toBe('Customer 1 · Item 1');
    expect(card.events()[0].timestamp).toBe('2026-09-14');
  });

  it('tones each event by its status', () => {
    const { card } = setup();

    expect(card.events().map((event) => event.tone)).toEqual([
      'success',
      'warning',
      'info',
      'danger',
      'success'
    ]);
  });

  it('shows no events when there are no orders', () => {
    const { card } = setup([]);

    expect(card.events()).toEqual([]);
  });
});
