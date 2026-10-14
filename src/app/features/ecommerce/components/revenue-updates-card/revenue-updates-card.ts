import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

import {
  ChartComboComponent,
  ComboSeries,
  RevenuePoint,
  RevenueRange,
  RevenueRangeLookup,
  RevenueTotals,
  RevenueTotalsLookup,
  SHARED_IMPORTS
} from '../../../../shared';

@Component({
  selector: 'app-revenue-updates-card',
  imports: [...SHARED_IMPORTS, ChartComboComponent],
  templateUrl: './revenue-updates-card.html',
  styleUrl: './revenue-updates-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RevenueUpdatesCardComponent {
  ranges = RevenueRangeLookup.getAll();
  months = RevenueRangeLookup.getMonths();

  totalKeys: (keyof RevenueTotals)[] = ['budget', 'expense', 'margin'];
  totalLabels = RevenueTotalsLookup.getLabels();

  points = input.required<RevenuePoint[]>();

  range = signal<RevenueRange>(RevenueRange.TwelveMonths);

  visiblePoints = computed(() => this.points().slice(-this.months[this.range()]));

  periods = computed(() => this.visiblePoints().map((p) => p.period));

  series = computed<ComboSeries[]>(() => [
    { name: this.totalLabels.budget, data: this.visiblePoints().map((p) => p.budget) },
    { name: this.totalLabels.expense, data: this.visiblePoints().map((p) => p.expense) }
  ]);

  totals = computed<RevenueTotals>(() => {
    const points = this.visiblePoints();
    const budget = points.reduce((sum, p) => sum + p.budget, 0);
    const expense = points.reduce((sum, p) => sum + p.expense, 0);
    return { budget, expense, margin: budget - expense };
  });

  setRange(range: RevenueRange): void {
    this.range.set(range);
  }
}
