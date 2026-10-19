import { TestBed } from '@angular/core/testing';

import { RevenuePoint, RevenueRange } from '../../../../shared';
import { RevenueUpdatesCardComponent } from './revenue-updates-card';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const POINTS: RevenuePoint[] = MONTHS.map((period, i) => ({
  period,
  budget: (i + 1) * 100,
  expense: (i + 1) * 10
}));

function setup() {
  TestBed.configureTestingModule({ imports: [RevenueUpdatesCardComponent] });
  TestBed.overrideComponent(RevenueUpdatesCardComponent, { set: { template: '', imports: [] } });

  const fixture = TestBed.createComponent(RevenueUpdatesCardComponent);
  fixture.componentRef.setInput('points', POINTS);
  fixture.detectChanges();

  return { card: fixture.componentInstance };
}

describe('RevenueUpdatesCardComponent', () => {
  it('offers the six- and twelve-month ranges, in that order', () => {
    const { card } = setup();

    expect(card.ranges.map((range) => range.id)).toEqual([
      RevenueRange.SixMonths,
      RevenueRange.TwelveMonths
    ]);
    expect(card.ranges.map((range) => range.label)).toEqual(['6 months', '12 months']);
  });

  it('shows all twelve months by default', () => {
    const { card } = setup();

    expect(card.range()).toBe(RevenueRange.TwelveMonths);
    expect(card.periods()).toEqual(MONTHS);
  });

  it('keeps only the last six months for the six-month range', () => {
    const { card } = setup();

    card.range.set(RevenueRange.SixMonths);

    expect(card.periods()).toEqual(['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
    expect(card.series()).toEqual([
      { name: 'Budget', data: [700, 800, 900, 1000, 1100, 1200] },
      { name: 'Expense', data: [70, 80, 90, 100, 110, 120] }
    ]);
  });

  it('recomputes the totals and margin for the selected range', () => {
    const { card } = setup();

    expect(card.totals()).toEqual([
      { label: 'Budget', value: 7800 },
      { label: 'Expense', value: 780 },
      { label: 'Margin', value: 7020 }
    ]);

    card.range.set(RevenueRange.SixMonths);
    expect(card.totals()).toEqual([
      { label: 'Budget', value: 5700 },
      { label: 'Expense', value: 570 },
      { label: 'Margin', value: 5130 }
    ]);
  });

  it('never mutates the source series', () => {
    const { card } = setup();

    card.range.set(RevenueRange.SixMonths);

    expect(card.points().length).toBe(12);
  });
});
