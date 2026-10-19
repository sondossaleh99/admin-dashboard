import { MenuItem } from 'primeng/api';

export class UserMenuLookup {
  static getItems(): MenuItem[] {
    return [
      { separator: true },
      { label: 'Profile', icon: 'pi pi-user' },
      { label: 'Account settings', icon: 'pi pi-cog' },
      { label: 'Sign out', icon: 'pi pi-sign-out' }
    ];
  }
}
