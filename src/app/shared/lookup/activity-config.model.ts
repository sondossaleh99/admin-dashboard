import { ActivityTone } from '../enum/activity-tone';

/** How one order status renders in the recent-activity feed. */
export interface ActivityConfig {
  icon: string;
  tone: ActivityTone;
  verb: string;
}
