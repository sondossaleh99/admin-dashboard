import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ChartDonutComponent, SHARED_IMPORTS, SalesSlice } from '../../../../shared';

@Component({
  selector: 'app-sales-breakdown-card',
  imports: [...SHARED_IMPORTS, ChartDonutComponent],
  templateUrl: './sales-breakdown-card.html',
  styleUrl: './sales-breakdown-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SalesBreakdownCardComponent {
  translate = inject(TranslateService);

  slices = input.required<SalesSlice[]>();

  total = computed(() => this.slices().reduce((sum, slice) => sum + slice.value, 0));

  chartSlices = computed(() =>
    this.slices().map((slice) => ({ ...slice, label: String(this.translate.instant(slice.label)) }))
  );
}
