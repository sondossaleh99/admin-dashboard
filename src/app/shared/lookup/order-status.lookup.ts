import { OrderStatus } from '../enum/order-status';

export class OrderStatusLookup {
  static getAll(): { id: OrderStatus; label: string }[] {
    return [
      { id: OrderStatus.Paid, label: 'enums.orderStatus.paid' },
      { id: OrderStatus.Pending, label: 'enums.orderStatus.pending' },
      { id: OrderStatus.Refunded, label: 'enums.orderStatus.refunded' },
      { id: OrderStatus.Cancelled, label: 'enums.orderStatus.cancelled' }
    ];
  }

  static getLabel(id: OrderStatus): string {
    return OrderStatusLookup.getAll().find((item) => item.id === id)?.label ?? '';
  }
}
