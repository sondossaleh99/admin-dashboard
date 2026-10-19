import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

import {
  ChartComboComponent,
  ComboSeries,
  RevenuePoint,
  RevenueRange,
  RevenueRangeLookup,
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

  points = input.required<RevenuePoint[]>();

  range = signal<RevenueRange>(RevenueRange.TwelveMonths);

  visiblePoints = computed(() => this.points().slice(-this.range()));

  periods = computed(() => this.visiblePoints().map((p) => p.period));

  series = computed<ComboSeries[]>(() => [
    { name: 'Budget', data: this.visiblePoints().map((p) => p.budget) },
    { name: 'Expense', data: this.visiblePoints().map((p) => p.expense) }
  ]);

  totals = computed(() => {
    const points = this.visiblePoints();
    const budget = points.reduce((sum, p) => sum + p.budget, 0);
    const expense = points.reduce((sum, p) => sum + p.expense, 0);
    return [
      { label: 'Budget', value: budget },
      { label: 'Expense', value: expense },
      { label: 'Margin', value: budget - expense }
    ];
  });
}
