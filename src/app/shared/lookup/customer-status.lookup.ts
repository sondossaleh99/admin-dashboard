import { ActivityTone } from '../enum/activity-tone';
import { CustomerStatus } from '../enum/customer-status';

export class CustomerStatusLookup {
  static getAll(): { id: CustomerStatus; label: string }[] {
    return [
      { id: CustomerStatus.Active, label: 'Active' },
      { id: CustomerStatus.Pending, label: 'Pending' },
      { id: CustomerStatus.Completed, label: 'Completed' },
      { id: CustomerStatus.Cancelled, label: 'Cancelled' }
    ];
  }

  static getLabel(id: CustomerStatus): string {
    return CustomerStatusLookup.getAll().find((item) => item.id === id)?.label ?? '';
  }

  static getTone(id: CustomerStatus): ActivityTone {
    return {
      [CustomerStatus.Active]: ActivityTone.Success,
      [CustomerStatus.Pending]: ActivityTone.Warning,
      [CustomerStatus.Completed]: ActivityTone.Info,
      [CustomerStatus.Cancelled]: ActivityTone.Danger
    }[id];
  }
}
