import { TestBed } from '@angular/core/testing';

import { ActivityTone, Order, OrderStatus } from '../../../../shared';
import { OrdersTableComponent } from './orders-table';

function order(id: string, status: OrderStatus): Order {
  return {
    id,
    customer: `Customer ${id}`,
    item: `Item ${id}`,
    placedAt: '2026-10-20',
    total: 10,
    status,
    location: 'USA'
  };
}

function setup(orders: Order[]) {
  TestBed.configureTestingModule({ imports: [OrdersTableComponent] });
  TestBed.overrideComponent(OrdersTableComponent, { set: { template: '', imports: [] } });

  const fixture = TestBed.createComponent(OrdersTableComponent);
  fixture.componentRef.setInput('orders', orders);
  fixture.detectChanges();

  return { fixture, table: fixture.componentInstance };
}

describe('OrdersTableComponent', () => {
  it('labels and tones every status', () => {
    const { table } = setup([
      order('1', OrderStatus.Paid),
      order('2', OrderStatus.Pending),
      order('3', OrderStatus.Refunded),
      order('4', OrderStatus.Cancelled)
    ]);

    expect(table.tableValue().map((row) => [row.statusLabel, row.statusTone])).toEqual([
      ['Paid', ActivityTone.Success],
      ['Pending', ActivityTone.Warning],
      ['Refunded', ActivityTone.Info],
      ['Cancelled', ActivityTone.Danger]
    ]);
  });

  it('keeps every order field on its row', () => {
    const { table } = setup([order('10248', OrderStatus.Paid)]);

    expect(table.tableValue()[0]).toEqual(
      jasmine.objectContaining({ id: '10248', item: 'Item 10248', location: 'USA', total: 10 })
    );
  });

  it('counts the orders in its subtitle and follows new data', () => {
    const { fixture, table } = setup([order('1', OrderStatus.Paid), order('2', OrderStatus.Paid)]);

    expect(table.subtitle()).toBe('2 orders');

    fixture.componentRef.setInput('orders', [order('3', OrderStatus.Pending)]);

    expect(table.subtitle()).toBe('1 orders');
  });
});
