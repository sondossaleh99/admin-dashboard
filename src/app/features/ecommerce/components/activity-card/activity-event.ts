import { ActivityTone } from '../../../../shared';

/** One line in the activity feed. */
export interface ActivityEvent {
  id: string;
  icon: string;
  tone: ActivityTone;
  title: string;
  detail: string;
  timestamp: string;
}
