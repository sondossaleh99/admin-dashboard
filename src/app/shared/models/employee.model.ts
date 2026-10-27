import { EmployeeRole } from '../enum/employee-role';

export interface Employee {
  id: string;
  name: string;
  role: EmployeeRole;
  location: string;
  hiredAt: string;
  reportsTo: string;
}
