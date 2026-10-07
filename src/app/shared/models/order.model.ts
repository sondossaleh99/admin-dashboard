import { OrderStatus } from '../enum/order-status';

export interface Order {
  id: string;
  customer: string;
  item: string;
  placedAt: string;
  total: number;
  status: OrderStatus;
}
