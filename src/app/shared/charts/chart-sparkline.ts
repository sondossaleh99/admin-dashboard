import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';

import { baseOptions, seriesColors } from './chart-theme';

/**
 * A bare trend line — no axes, no grid, no legend.
 *
 * It sits beside a figure that already carries the value, so its only job is
 * shape. The final point is marked so the current value is locatable.
 */
@Component({
  selector: 'app-chart-sparkline',
  imports: [NgApexchartsModule],
  template: `<apx-chart
    [series]="$any(options().series)"
    [chart]="$any(options().chart)"
    [colors]="$any(options().colors)"
    [stroke]="$any(options().stroke)"
    [fill]="$any(options().fill)"
    [tooltip]="$any(options().tooltip)"
    [markers]="$any(options().markers)"
    [dataLabels]="$any(options().dataLabels)"
  />`,
  styles: [':host { display: block; }'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartSparklineComponent {
  data = input.required<number[]>();
  height = input(48);
  slot = input(1);
  filled = input(true);

  options = computed<ApexOptions>(() => {
    const base = baseOptions();
    const points = this.data();
    const color = seriesColors(6)[this.slot() - 1];
    const lastIndex = Math.max(points.length - 1, 0);

    return {
      ...base,
      chart: {
        ...base.chart,
        type: this.filled() ? 'area' : 'line',
        height: this.height(),
        sparkline: { enabled: true }
      },
      colors: [color],
      series: [{ name: 'Trend', data: [...points] }],
      stroke: { width: 2, curve: 'smooth' },
      // On a line chart ApexCharts applies fill.opacity to the STROKE, so an
      // opacity of 0 here hides the line itself rather than suppressing an
      // area fill. The unfilled variant simply has no fill to configure.
      fill: this.filled()
        ? {
            type: 'gradient',
            gradient: { shadeIntensity: 1, opacityFrom: 0.3, opacityTo: 0, stops: [0, 100] }
          }
        : { type: 'solid', opacity: 1 },
      // Only the endpoint is marked; a dot on every point would be noise.
      markers: {
        size: 0,
        discrete: [
          {
            seriesIndex: 0,
            dataPointIndex: lastIndex,
            size: 4,
            fillColor: color,
            strokeColor: color
          }
        ],
        hover: { size: 5 }
      },
      tooltip: { ...base.tooltip, fixed: { enabled: false }, marker: { show: false } }
    };
  });
}
