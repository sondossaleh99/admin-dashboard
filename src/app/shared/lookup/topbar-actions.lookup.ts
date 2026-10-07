import { TopbarAction } from '../models/topbar-action.model';

export class TopbarActionsLookup {
  static getActions(): TopbarAction[] {
    return [
      { icon: 'pi-envelope', label: 'Messages', badge: 3 },
      { icon: 'pi-bell', label: 'Notifications', badge: 5 },
      { icon: 'pi-cog', label: 'Settings' }
    ];
  }
}
