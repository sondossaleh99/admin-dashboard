import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';

import { ComboSeries } from '../models/combo-series.model';
import { baseOptions, compactNumber, seriesColors } from './chart-theme';

@Component({
  selector: 'app-chart-combo',
  imports: [NgApexchartsModule],
  template: `<apx-chart
    [series]="$any(options().series)"
    [chart]="$any(options().chart)"
    [xaxis]="$any(options().xaxis)"
    [yaxis]="$any(options().yaxis)"
    [grid]="$any(options().grid)"
    [colors]="$any(options().colors)"
    [legend]="$any(options().legend)"
    [stroke]="$any(options().stroke)"
    [tooltip]="$any(options().tooltip)"
    [plotOptions]="$any(options().plotOptions)"
    [dataLabels]="$any(options().dataLabels)"
    [markers]="$any(options().markers)"
    [states]="$any(options().states)"
  />`,
  styles: [':host { display: block; }'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComboComponent {
  categories = input.required<string[]>();
  series = input.required<ComboSeries[]>();
  height = input(320);

  options = computed<ApexOptions>(() => {
    const base = baseOptions();
    const [columns, line] = this.series();
    const colors = seriesColors(2);

    return {
      ...base,
      chart: { ...base.chart, type: 'line', height: this.height(), stacked: false },
      colors,
      series: [
        { name: columns.name, type: 'column', data: [...columns.data] },
        ...(line ? [{ name: line.name, type: 'line', data: [...line.data] }] : [])
      ],
      xaxis: { ...base.xaxis, categories: [...this.categories()] },
      yaxis: {
        ...base.yaxis,
        labels: {
          ...(base.yaxis as { labels?: object }).labels,
          formatter: (value: number) => compactNumber(value)
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '42%',
          borderRadius: 4,
          borderRadiusApplication: 'end'
        }
      },
      stroke: { width: [0, 2], curve: 'smooth' },
      markers: { size: 0, hover: { size: 6 } },
      tooltip: { ...base.tooltip, shared: true, intersect: false }
    };
  });
}
