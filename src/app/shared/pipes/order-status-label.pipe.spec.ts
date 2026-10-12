import { OrderStatus } from '../enum/order-status';
import { OrderStatusLabelPipe } from './order-status-label.pipe';

describe('OrderStatusLabelPipe', () => {
  let pipe: OrderStatusLabelPipe;

  beforeEach(() => {
    pipe = new OrderStatusLabelPipe();
  });

  it('labels every order status', () => {
    expect(pipe.transform(OrderStatus.Paid)).toBe('Paid');
    expect(pipe.transform(OrderStatus.Pending)).toBe('Pending');
    expect(pipe.transform(OrderStatus.Refunded)).toBe('Refunded');
    expect(pipe.transform(OrderStatus.Cancelled)).toBe('Cancelled');
  });
});
