import { Order, OrderStatus } from '../../shared';

export const ORDERS: Order[] = [
  {
    id: '10248',
    customer: 'Vinet',
    item: 'Fresh Tomato',
    placedAt: '2026-10-20',
    total: 32.38,
    status: OrderStatus.Pending,
    location: 'USA'
  },
  {
    id: '345653',
    customer: 'Carson Darrin',
    item: 'Butter Scotch',
    placedAt: '2026-10-19',
    total: 56.34,
    status: OrderStatus.Paid,
    location: 'Delhi'
  },
  {
    id: '390457',
    customer: 'Fran Perez',
    item: 'Candy Gucci',
    placedAt: '2026-10-19',
    total: 93.31,
    status: OrderStatus.Paid,
    location: 'New York'
  },
  {
    id: '893486',
    customer: 'Anika Viseer',
    item: 'Night Lamp',
    placedAt: '2026-10-18',
    total: 93.31,
    status: OrderStatus.Cancelled,
    location: 'Germany'
  },
  {
    id: '748975',
    customer: 'Miron Vitold',
    item: 'Sneakers',
    placedAt: '2026-10-18',
    total: 120.5,
    status: OrderStatus.Refunded,
    location: 'Spain'
  },
  {
    id: '94757',
    customer: 'Omar Darobe',
    item: 'Red Headphones',
    placedAt: '2026-10-17',
    total: 74.99,
    status: OrderStatus.Paid,
    location: 'USA'
  },
  {
    id: '944895',
    customer: 'Lulia Albu',
    item: 'Wooden Chair',
    placedAt: '2026-10-16',
    total: 148.0,
    status: OrderStatus.Pending,
    location: 'Canada'
  },
  {
    id: '845954',
    customer: 'Penjani Inyene',
    item: 'Leather Wallet',
    placedAt: '2026-10-16',
    total: 41.2,
    status: OrderStatus.Paid,
    location: 'Nigeria'
  },
  {
    id: '845689',
    customer: 'Nasimiyu Danai',
    item: 'Desk Lamp',
    placedAt: '2026-10-15',
    total: 58.75,
    status: OrderStatus.Cancelled,
    location: 'Kenya'
  },
  {
    id: '874534',
    customer: 'Nancy Davolio',
    item: 'Coffee Grinder',
    placedAt: '2026-10-14',
    total: 89.9,
    status: OrderStatus.Paid,
    location: 'United Kingdom'
  },
  {
    id: '38489',
    customer: 'Siegbert Gottfried',
    item: 'Smart Watch',
    placedAt: '2026-10-13',
    total: 199.0,
    status: OrderStatus.Refunded,
    location: 'Germany'
  },
  {
    id: '24546',
    customer: 'Sunil Joshi',
    item: 'Yoga Mat',
    placedAt: '2026-10-12',
    total: 27.5,
    status: OrderStatus.Pending,
    location: 'India'
  },
  {
    id: '874213',
    customer: 'Andrew McDowell',
    item: 'Water Bottle',
    placedAt: '2026-10-11',
    total: 18.4,
    status: OrderStatus.Paid,
    location: 'USA'
  },
  {
    id: '765432',
    customer: 'Christopher Jamil',
    item: 'Backpack',
    placedAt: '2026-10-10',
    total: 64.0,
    status: OrderStatus.Paid,
    location: 'Saudi Arabia'
  }
];
