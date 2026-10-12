import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { ChartDonutComponent, SHARED_IMPORTS, SalesSlice } from '../../../../shared';

@Component({
  selector: 'app-sales-breakdown-card',
  imports: [...SHARED_IMPORTS, ChartDonutComponent],
  templateUrl: './sales-breakdown-card.html',
  styleUrl: './sales-breakdown-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SalesBreakdownCardComponent {
  slices = input.required<SalesSlice[]>();

  total = computed(() => this.slices().reduce((sum, slice) => sum + slice.value, 0));
}
