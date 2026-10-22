import { Order } from './order.model';

export interface OrderListItem extends Order {
  location: string;
}
