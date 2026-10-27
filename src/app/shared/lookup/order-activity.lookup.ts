import { ActivityTone } from '../enum/activity-tone';
import { OrderStatus } from '../enum/order-status';
import { ActivityConfig } from '../models/activity-config.model';

export class OrderActivityLookup {
  static getActivity(): Record<OrderStatus, ActivityConfig> {
    return {
      [OrderStatus.Paid]: {
        icon: 'pi-check-circle',
        tone: ActivityTone.Success,
        title: 'activity.paid'
      },

      [OrderStatus.Pending]: {
        icon: 'pi-clock',
        tone: ActivityTone.Warning,
        title: 'activity.pending'
      },

      [OrderStatus.Refunded]: {
        icon: 'pi-replay',
        tone: ActivityTone.Info,
        title: 'activity.refunded'
      },

      [OrderStatus.Cancelled]: {
        icon: 'pi-times-circle',
        tone: ActivityTone.Danger,
        title: 'activity.cancelled'
      }
    };
  }
}
