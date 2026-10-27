import { EmployeeRole } from '../enum/employee-role';

export class EmployeeRoleLookup {
  static getAll(): { id: EmployeeRole; label: string }[] {
    return [
      { id: EmployeeRole.StoreManager, label: 'Store Manager' },
      { id: EmployeeRole.SalesRepresentative, label: 'Sales Representative' },
      { id: EmployeeRole.CustomerSupport, label: 'Customer Support' },
      { id: EmployeeRole.WarehouseSpecialist, label: 'Warehouse Specialist' },
      { id: EmployeeRole.MarketingSpecialist, label: 'Marketing Specialist' },
      { id: EmployeeRole.DeliveryCoordinator, label: 'Delivery Coordinator' },
      { id: EmployeeRole.HumanResources, label: 'HR Specialist' }
    ];
  }

  static getLabel(id: EmployeeRole): string {
    return EmployeeRoleLookup.getAll().find((item) => item.id === id)?.label ?? '';
  }
}
