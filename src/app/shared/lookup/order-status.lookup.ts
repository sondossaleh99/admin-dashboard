import { OrderStatus } from '../enum/order-status';

/** Display label for each order status, e.g. shown as a table badge. */
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
