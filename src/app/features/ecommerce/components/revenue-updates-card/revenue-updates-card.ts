import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { RevenueRange } from '../../../../shared/enum/revenue-range';
import { ComboSeries, RevenueTotals } from '../../../../shared/interface';
import { ChartCombo } from '../../../../shared/charts/chart-combo';
import { UiCard } from '../../../../shared/ui/ui-card/ui-card';

/**
 * Budget-vs-expense combo chart with a period filter.
 *
 * The filter is presentational only: `range` reflects the parent's signal and
 * `rangeChange` reports the click. EcommercePage owns deriving the filtered
 * series, so this component never mutates the source data.
 */
@Component({
  selector: 'app-revenue-updates-card',
  imports: [CurrencyPipe, UiCard, ChartCombo],
  templateUrl: './revenue-updates-card.html',
  styleUrl: './revenue-updates-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RevenueUpdatesCard {
  /** Exposed so the template can reference members directly, e.g. `RevenueRange.SixMonths`. */
  readonly RevenueRange = RevenueRange;

  readonly periods = input.required<readonly string[]>();
  readonly series = input.required<readonly ComboSeries[]>();
  readonly totals = input.required<RevenueTotals>();
  readonly range = input.required<RevenueRange>();

  readonly rangeChange = output<RevenueRange>();

  setRange(range: RevenueRange): void {
    this.rangeChange.emit(range);
  }
}
