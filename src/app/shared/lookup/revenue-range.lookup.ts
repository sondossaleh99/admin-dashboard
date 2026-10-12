import { RevenueRange } from '../enum/revenue-range';
import { RevenueRangeConfig } from '../models/revenue-range-config.model';

export class RevenueRangeLookup {
  static getOptions(): Record<RevenueRange, RevenueRangeConfig> {
    return {
      [RevenueRange.SixMonths]: { label: '6 months', months: 6 },
      [RevenueRange.TwelveMonths]: { label: '12 months', months: 12 }
    };
  }
}
