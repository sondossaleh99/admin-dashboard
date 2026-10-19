import { OrderStatus } from '../enum/order-status';
import { OrderStatusLookup } from './order-status.lookup';

describe('OrderStatusLookup', () => {
  it('lists every status once, in order', () => {
    expect(OrderStatusLookup.getAll().map((item) => item.id)).toEqual([
      OrderStatus.Paid,
      OrderStatus.Pending,
      OrderStatus.Refunded,
      OrderStatus.Cancelled
    ]);
  });

  it('labels every status', () => {
    expect(OrderStatusLookup.getLabel(OrderStatus.Paid)).toBe('Paid');
    expect(OrderStatusLookup.getLabel(OrderStatus.Pending)).toBe('Pending');
    expect(OrderStatusLookup.getLabel(OrderStatus.Refunded)).toBe('Refunded');
    expect(OrderStatusLookup.getLabel(OrderStatus.Cancelled)).toBe('Cancelled');
  });
});
