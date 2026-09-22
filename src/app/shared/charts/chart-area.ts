import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';

import { baseOptions, compactNumber, seriesColors } from './chart-theme';

/** A single trend over time, with a gradient fill and a crosshair tooltip. */
@Component({
  selector: 'app-chart-area',
  imports: [NgApexchartsModule],
  template: `<apx-chart
    [series]="$any(options().series)"
    [chart]="$any(options().chart)"
    [xaxis]="$any(options().xaxis)"
    [yaxis]="$any(options().yaxis)"
    [grid]="$any(options().grid)"
    [colors]="$any(options().colors)"
    [stroke]="$any(options().stroke)"
    [fill]="$any(options().fill)"
    [tooltip]="$any(options().tooltip)"
    [dataLabels]="$any(options().dataLabels)"
    [markers]="$any(options().markers)"
    [legend]="$any(options().legend)"
  />`,
  styles: [':host { display: block; }'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartArea {
  readonly name = input.required<string>();
  readonly categories = input.required<readonly string[]>();
  readonly data = input.required<readonly number[]>();
  readonly height = input(240);
  /** Palette slot, so an area chart can match the KPI it belongs to. */
  readonly slot = input(1);

  readonly options = computed<ApexOptions>(() => {
    const base = baseOptions();
    const color = seriesColors(6)[this.slot() - 1];

    return {
      ...base,
      chart: { ...base.chart, type: 'area', height: this.height() },
      colors: [color],
      series: [{ name: this.name(), data: [...this.data()] }],
      xaxis: { ...base.xaxis, categories: [...this.categories()] },
      yaxis: {
        ...base.yaxis,
        labels: {
          ...(base.yaxis as { labels?: object }).labels,
          formatter: (value: number) => compactNumber(value)
        }
      },
      stroke: { width: 2, curve: 'smooth' },
      fill: {
        type: 'gradient',
        gradient: { shadeIntensity: 1, opacityFrom: 0.28, opacityTo: 0.02, stops: [0, 100] }
      },
      markers: { size: 0, hover: { size: 6 } },
      // A single series needs no legend box — the card title names it.
      legend: { ...base.legend, show: false },
      tooltip: { ...base.tooltip, intersect: false, shared: false }
    };
  });
}
