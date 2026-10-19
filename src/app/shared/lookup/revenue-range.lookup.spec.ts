import { RevenueRange } from '../enum/revenue-range';
import { RevenueRangeLookup } from './revenue-range.lookup';

describe('RevenueRangeLookup', () => {
  it('lists every range once, in order', () => {
    expect(RevenueRangeLookup.getAll().map((item) => item.id)).toEqual([
      RevenueRange.SixMonths,
      RevenueRange.TwelveMonths
    ]);
  });

  it('labels every range', () => {
    expect(RevenueRangeLookup.getLabel(RevenueRange.SixMonths)).toBe('6 months');
    expect(RevenueRangeLookup.getLabel(RevenueRange.TwelveMonths)).toBe('12 months');
  });
});
