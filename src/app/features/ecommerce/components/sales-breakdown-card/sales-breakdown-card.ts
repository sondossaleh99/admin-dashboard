import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { ChartDonut, DonutSlice, SHARED_IMPORTS } from '../../../../shared';
import { SalesSlice } from '../../../../core';

/**
 * Composition-of-a-whole donut plus its legend.
 *
 * The legend carries a value beside every swatch — required "relief" per the
 * validated chart palette, since identity must never be colour-alone.
 */
@Component({
  selector: 'app-sales-breakdown-card',
  imports: [...SHARED_IMPORTS, ChartDonut],
  templateUrl: './sales-breakdown-card.html',
  styleUrl: './sales-breakdown-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SalesBreakdownCard {
  slices = input.required<SalesSlice[]>();
  total = input.required<number>();

  asDonutSlices(slices: SalesSlice[]): DonutSlice[] {
    return slices.map((s) => ({ label: s.label, value: s.value }));
  }
}
