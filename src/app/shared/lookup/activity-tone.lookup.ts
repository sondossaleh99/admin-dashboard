import { ActivityTone } from '../enum/activity-tone';

export class ActivityToneLookup {
  static getAll(): { id: ActivityTone; label: string }[] {
    return [
      { id: ActivityTone.Success, label: 'success' },
      { id: ActivityTone.Warning, label: 'warning' },
      { id: ActivityTone.Info, label: 'info' },
      { id: ActivityTone.Danger, label: 'danger' }
    ];
  }

  static getLabel(id: ActivityTone): string {
    return ActivityToneLookup.getAll().find((item) => item.id === id)?.label ?? '';
  }
}
