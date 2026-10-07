import { OrderStatus } from '../enum/order-status';

export class OrderStatusLookup {
  static getLabels(): Record<OrderStatus, string> {
    return {
      [OrderStatus.Paid]: 'Paid',
      [OrderStatus.Pending]: 'Pending',
      [OrderStatus.Refunded]: 'Refunded',
      [OrderStatus.Cancelled]: 'Cancelled'
    };
  }
}
