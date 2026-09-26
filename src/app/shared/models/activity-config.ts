import { ActivityTone } from '../enum/activity-tone';

/**
 * How one order status renders in the recent-activity feed.
 *
 * This is order/ecommerce vocabulary, but it stays here rather than in
 * features/ecommerce/models: its only consumer is OrderActivityLookup in
 * shared/lookup, and shared must not import from features.
 */
export interface ActivityConfig {
  icon: string;
  tone: ActivityTone;
  verb: string;
}
