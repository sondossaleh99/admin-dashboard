import { RevenueRange } from '../enum/revenue-range';

export class RevenueRangeLookup {
  static getAll(): { id: RevenueRange; label: string }[] {
    return [
      { id: RevenueRange.SixMonths, label: 'enums.revenueRange.sixMonths' },
      { id: RevenueRange.TwelveMonths, label: 'enums.revenueRange.twelveMonths' }
    ];
  }

  static getLabel(id: RevenueRange): string {
    return RevenueRangeLookup.getAll().find((item) => item.id === id)?.label ?? '';
  }
}
