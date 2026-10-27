import { EmployeeRole } from '../enum/employee-role';

export class EmployeeRoleLookup {
  static getAll(): { id: EmployeeRole; label: string }[] {
    return [
      { id: EmployeeRole.StoreManager, label: 'enums.employeeRole.storeManager' },
      { id: EmployeeRole.SalesRepresentative, label: 'enums.employeeRole.salesRepresentative' },
      { id: EmployeeRole.CustomerSupport, label: 'enums.employeeRole.customerSupport' },
      { id: EmployeeRole.WarehouseSpecialist, label: 'enums.employeeRole.warehouseSpecialist' },
      { id: EmployeeRole.MarketingSpecialist, label: 'enums.employeeRole.marketingSpecialist' },
      { id: EmployeeRole.DeliveryCoordinator, label: 'enums.employeeRole.deliveryCoordinator' },
      { id: EmployeeRole.HumanResources, label: 'enums.employeeRole.humanResources' }
    ];
  }

  static getLabel(id: EmployeeRole): string {
    return EmployeeRoleLookup.getAll().find((item) => item.id === id)?.label ?? '';
  }
}
