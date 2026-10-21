import { CustomerStatus } from '../enum/customer-status';

export interface Customer {
  id: number;
  name: string;
  email: string;
  project: string;
  status: CustomerStatus;
  weeks: number;
  budget: number;
  location: string;
}
