import { TopbarAction } from './topbar-action.model';

/** Icon buttons shown on the right side of the topbar. */
export class TopbarActionsLookup {
  static getActions(): TopbarAction[] {
    return [
      { icon: 'pi-envelope', label: 'Messages', badge: 3 },
      { icon: 'pi-bell', label: 'Notifications', badge: 5 },
      { icon: 'pi-cog', label: 'Settings' }
    ];
  }
}
