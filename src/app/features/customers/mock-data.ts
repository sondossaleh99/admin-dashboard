import { Customer, CustomerStatus } from '../../shared';

export const CUSTOMERS: Customer[] = [
  {
    id: 1001,
    name: 'Nirav Joshi',
    email: 'nirav@gmail.com',
    project: 'Hosting Press HTML',
    status: CustomerStatus.Active,
    weeks: 40,
    budget: 2400,
    location: 'India'
  },
  {
    id: 1002,
    name: 'Sunil Joshi',
    email: 'sunil@gmail.com',
    project: 'Elite Admin',
    status: CustomerStatus.Active,
    weeks: 11,
    budget: 3900,
    location: 'India'
  },
  {
    id: 1003,
    name: 'Andrew McDowell',
    email: 'andrew@gmail.com',
    project: 'Real Homes WP Theme',
    status: CustomerStatus.Pending,
    weeks: 19,
    budget: 24500,
    location: 'USA'
  },
  {
    id: 1004,
    name: 'Christopher Jamil',
    email: 'jamil@gmail.com',
    project: 'MedicalPro WP Theme',
    status: CustomerStatus.Completed,
    weeks: 34,
    budget: 16500,
    location: 'USA'
  },
  {
    id: 1005,
    name: 'Michael Brown',
    email: 'michael@gmail.com',
    project: 'Weekly WP Theme',
    status: CustomerStatus.Cancelled,
    weeks: 34,
    budget: 16500,
    location: 'USA'
  },
  {
    id: 1006,
    name: 'Layla Haddad',
    email: 'layla@gmail.com',
    project: 'Storefront Redesign',
    status: CustomerStatus.Active,
    weeks: 22,
    budget: 8200,
    location: 'Saudi Arabia'
  },
  {
    id: 1007,
    name: 'Omar Darobe',
    email: 'omar@gmail.com',
    project: 'Mobile Banking App',
    status: CustomerStatus.Pending,
    weeks: 16,
    budget: 31000,
    location: 'UAE'
  },
  {
    id: 1008,
    name: 'Fran Perez',
    email: 'fran@gmail.com',
    project: 'Portfolio Site',
    status: CustomerStatus.Completed,
    weeks: 6,
    budget: 1800,
    location: 'Spain'
  },
  {
    id: 1009,
    name: 'Anika Viseer',
    email: 'anika@gmail.com',
    project: 'Inventory Dashboard',
    status: CustomerStatus.Active,
    weeks: 28,
    budget: 12750,
    location: 'Germany'
  },
  {
    id: 1010,
    name: 'Carson Darrin',
    email: 'carson@gmail.com',
    project: 'Booking Platform',
    status: CustomerStatus.Cancelled,
    weeks: 9,
    budget: 5400,
    location: 'Canada'
  },
  {
    id: 1011,
    name: 'Iulia Albu',
    email: 'iulia@gmail.com',
    project: 'HR Portal',
    status: CustomerStatus.Completed,
    weeks: 24,
    budget: 9600,
    location: 'Romania'
  },
  {
    id: 1012,
    name: 'Penjani Inyene',
    email: 'penjani@gmail.com',
    project: 'Delivery Tracker',
    status: CustomerStatus.Pending,
    weeks: 13,
    budget: 7300,
    location: 'Nigeria'
  }
];
