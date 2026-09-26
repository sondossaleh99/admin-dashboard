import { UserMenuItem } from './user-menu-item.model';

/** Rows shown in the topbar's user dropdown. */
export class UserMenuLookup {
  static getItems(): UserMenuItem[] {
    return [
      { label: 'Profile', icon: 'pi-user' },
      { label: 'Account settings', icon: 'pi-cog' },
      { label: 'Sign out', icon: 'pi-sign-out' }
    ];
  }
}
