import { ActivityTone } from '../enum/activity-tone';
import { OrderStatus } from '../enum/order-status';
import { ActivityConfig } from '../models/activity-config.model';

/** Maps an order's status to the activity feed's icon, tone and verb. */
export class OrderActivityLookup {
  static getActivity(): Record<OrderStatus, ActivityConfig> {
    return {
      [OrderStatus.Paid]: {
        icon: 'pi-check-circle',
        tone: ActivityTone.Success,
        verb: 'was paid'
      },

      [OrderStatus.Pending]: {
        icon: 'pi-clock',
        tone: ActivityTone.Warning,
        verb: 'is awaiting payment'
      },

      [OrderStatus.Refunded]: {
        icon: 'pi-replay',
        tone: ActivityTone.Info,
        verb: 'was refunded'
      },

      [OrderStatus.Cancelled]: {
        icon: 'pi-times-circle',
        tone: ActivityTone.Danger,
        verb: 'was cancelled'
      }
    };
  }
}
