import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';

import { DonutSlice } from '../models/donut-slice';
import { baseOptions, chartInk, compactNumber, seriesColors } from './chart-theme';

/**
 * Composition of a whole, with the total in the middle.
 *
 * Capped at four slices because every slice sits against every other here, and
 * the palette only validates all-pairs separation to four. A fifth category
 * folds into "Other" rather than taking an unvalidated colour.
 */
@Component({
  selector: 'app-chart-donut',
  imports: [NgApexchartsModule],
  template: `<apx-chart
    [series]="$any(options().series)"
    [chart]="$any(options().chart)"
    [labels]="$any(options().labels)"
    [colors]="$any(options().colors)"
    [legend]="$any(options().legend)"
    [stroke]="$any(options().stroke)"
    [tooltip]="$any(options().tooltip)"
    [dataLabels]="$any(options().dataLabels)"
    [plotOptions]="$any(options().plotOptions)"
  />`,
  styles: [':host { display: block; }'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartDonutComponent {
  slices = input.required<DonutSlice[]>();
  centerLabel = input('Total');
  height = input(260);

  options = computed<ApexOptions>(() => {
    const base = baseOptions();
    const ink = chartInk();
    const slices = this.slices().slice(0, 4);

    return {
      ...base,
      chart: { ...base.chart, type: 'donut', height: this.height() },
      colors: seriesColors(slices.length),
      series: slices.map((slice) => slice.value),
      labels: slices.map((slice) => slice.label),
      // A 2px ring in the surface colour keeps adjacent fills from touching.
      stroke: { width: 2, colors: [ink.surface] },
      legend: { ...base.legend, show: false },
      dataLabels: { enabled: false },
      plotOptions: {
        pie: {
          donut: {
            size: '72%',
            labels: {
              show: true,
              name: { fontSize: '12px', color: ink.muted },
              value: {
                fontSize: '20px',
                fontWeight: 600,
                color: ink.text,
                formatter: (value: string) => compactNumber(Number(value))
              },
              total: {
                show: true,
                showAlways: true,
                label: this.centerLabel(),
                fontSize: '12px',
                color: ink.muted,
                formatter: (w: { globals: { seriesTotals: number[] } }) =>
                  compactNumber(w.globals.seriesTotals.reduce((a, b) => a + b, 0))
              }
            }
          }
        }
      }
    };
  });
}
