import { formatDate } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SelectButton } from 'primeng/selectbutton';

import {
  ChartComboComponent,
  ComboSeries,
  RevenuePoint,
  RevenueRange,
  RevenueRangeLookup,
  SHARED_IMPORTS
} from '../../../../shared';
import { LanguageService } from '../../../../core';

@Component({
  selector: 'app-revenue-updates-card',
  imports: [...SHARED_IMPORTS, ChartComboComponent, FormsModule, SelectButton],
  templateUrl: './revenue-updates-card.html',
  styleUrl: './revenue-updates-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RevenueUpdatesCardComponent {
  translate = inject(TranslateService);
  language = inject(LanguageService);

  ranges = computed(() =>
    RevenueRangeLookup.getAll().map((range) => ({
      ...range,
      label: String(this.translate.instant(range.label))
    }))
  );

  points = input.required<RevenuePoint[]>();

  range = signal<RevenueRange>(RevenueRange.TwelveMonths);

  visiblePoints = computed(() => this.points().slice(-this.range()));

  periods = computed(() =>
    this.visiblePoints().map((p) => formatDate(p.period, 'MMM', this.language.currentLanguage()))
  );

  series = computed<ComboSeries[]>(() => [
    {
      name: String(this.translate.instant('ecommerce.budget')),
      data: this.visiblePoints().map((p) => p.budget)
    },
    {
      name: String(this.translate.instant('ecommerce.expense')),
      data: this.visiblePoints().map((p) => p.expense)
    }
  ]);

  totals = computed(() => {
    const points = this.visiblePoints();
    const budget = points.reduce((sum, p) => sum + p.budget, 0);
    const expense = points.reduce((sum, p) => sum + p.expense, 0);
    return [
      { label: 'ecommerce.budget', value: budget },
      { label: 'ecommerce.expense', value: expense },
      { label: 'ecommerce.margin', value: budget - expense }
    ];
  });
}
