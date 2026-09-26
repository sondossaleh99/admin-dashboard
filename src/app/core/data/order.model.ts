import { OrderStatus } from '../../shared';

/** A row in the recent orders table. */
export interface Order {
  id: string;
  customer: string;
  item: string;
  /** ISO date string; formatted at render time, never stored pre-formatted. */
  placedAt: string;
  total: number;
  status: OrderStatus;
}
