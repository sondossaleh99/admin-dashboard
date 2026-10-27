import { MenuItem } from 'primeng/api';

export class UserMenuLookup {
  static getItems(): MenuItem[] {
    return [
      { separator: true },
      { label: 'topbar.profile', icon: 'pi pi-user' },
      { label: 'topbar.accountSettings', icon: 'pi pi-cog' },
      { label: 'topbar.signOut', icon: 'pi pi-sign-out' }
    ];
  }
}
