import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import {
  ChartComboComponent,
  ComboSeries,
  RevenueRange,
  RevenueTotals,
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
