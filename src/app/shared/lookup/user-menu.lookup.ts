import { UserMenuItem } from '../models/user-menu-item.model';

export class UserMenuLookup {
  static getItems(): UserMenuItem[] {
    return [
      { label: 'Profile', icon: 'pi-user' },
      { label: 'Account settings', icon: 'pi-cog' },
      { label: 'Sign out', icon: 'pi-sign-out' }
    ];
  }
}
