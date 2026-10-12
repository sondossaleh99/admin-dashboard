import { OrderStatus } from '../enum/order-status';

export class OrderStatusLookup {
  static getAll(): { id: OrderStatus; label: string }[] {
    return [
      { id: OrderStatus.Paid, label: 'Paid' },
      { id: OrderStatus.Pending, label: 'Pending' },
      { id: OrderStatus.Refunded, label: 'Refunded' },
      { id: OrderStatus.Cancelled, label: 'Cancelled' }
    ];
  }

  static getLabel(id: OrderStatus): string {
    return OrderStatusLookup.getAll().find((item) => item.id === id)?.label ?? '';
  }
}
