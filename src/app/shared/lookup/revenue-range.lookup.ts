import { RevenueRange } from '../enum/revenue-range';

export class RevenueRangeLookup {
  static getAll(): { id: RevenueRange; label: string }[] {
    return [
      { id: RevenueRange.SixMonths, label: '6 months' },
      { id: RevenueRange.TwelveMonths, label: '12 months' }
    ];
  }

  static getLabel(id: RevenueRange): string {
    return RevenueRangeLookup.getAll().find((item) => item.id === id)?.label ?? '';
  }

  static getMonths(): Record<RevenueRange, number> {
    return {
      [RevenueRange.SixMonths]: 6,
      [RevenueRange.TwelveMonths]: 12
    };
  }
}
