import { TopbarAction } from '../models/topbar-action.model';

export class TopbarActionsLookup {
  static getActions(): TopbarAction[] {
    return [
      { icon: 'pi pi-envelope', label: 'topbar.messages', badge: 3 },
      { icon: 'pi pi-bell', label: 'topbar.notifications', badge: 5 },
      { icon: 'pi pi-cog', label: 'topbar.settings' }
    ];
  }
}
