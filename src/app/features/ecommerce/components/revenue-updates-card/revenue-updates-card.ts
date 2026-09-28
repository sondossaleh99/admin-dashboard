import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { ChartComboComponent, ComboSeries, RevenueRange, RevenueTotals, SHARED_IMPORTS } from '../../../../shared';

/**
 * Budget-vs-expense combo chart with a period filter.
 *
 * The filter is presentational only: `range` reflects the parent's signal and
 * `rangeChange` reports the click. EcommercePageComponent owns deriving the filtered
 * series, so this component never mutates the source data.
 */
@Component({
  selector: 'app-revenue-updates-card',
  imports: [...SHARED_IMPORTS, ChartComboComponent],
  templateUrl: './revenue-updates-card.html',
  styleUrl: './revenue-updates-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RevenueUpdatesCardComponent {
  /** Exposed so the template can reference members directly, e.g. `RevenueRange.SixMonths`. */
  RevenueRange = RevenueRange;

  periods = input.required<string[]>();
  series = input.required<ComboSeries[]>();
  totals = input.required<RevenueTotals>();
  range = input.required<RevenueRange>();

  rangeChange = output<RevenueRange>();

  setRange(range: RevenueRange): void {
    this.rangeChange.emit(range);
  }
}
