import { ActivityTone } from '../enum/activity-tone';

export interface ActivityEvent {
  id: string;
  icon: string;
  tone: ActivityTone;
  title: string;
  detail: string;
  timestamp: string;
}
