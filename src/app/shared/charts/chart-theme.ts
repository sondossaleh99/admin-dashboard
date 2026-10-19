import { ApexOptions } from 'ng-apexcharts';

import { ChartInk } from '../models/chart-ink.model';

function cssVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export function seriesColors(count: number): string[] {
  return Array.from({ length: count }, (_, i) => cssVar(`--chart-series-${i + 1}`));
}

export function chartInk(): ChartInk {
  return {
    text: cssVar('--color-text'),
    muted: cssVar('--chart-axis-text'),
    grid: cssVar('--chart-grid'),
    surface: cssVar('--color-surface'),
    fontFamily: cssVar('--font-family-base')
  };
}

export function baseOptions(): ApexOptions {
  const ink = chartInk();

  return {
    chart: {
      fontFamily: ink.fontFamily,
      foreColor: ink.muted,
      toolbar: { show: false },
      zoom: { enabled: false },
      parentHeightOffset: 0,
      animations: {
        enabled: !prefersReducedMotion(),
        speed: 400
      }
    },
    grid: {
      borderColor: ink.grid,
      strokeDashArray: 0,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
      padding: { top: 0, right: 0, bottom: 0, left: 8 }
    },
    dataLabels: { enabled: false },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      fontSize: '12px',
      markers: { size: 6, strokeWidth: 0 },
      itemMargin: { horizontal: 10, vertical: 4 },
      labels: { colors: ink.text }
    },
    tooltip: {
      theme: 'dark',
      style: { fontSize: '12px', fontFamily: ink.fontFamily }
    },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { fontSize: '11px', colors: ink.muted } },
      crosshairs: { stroke: { color: ink.grid, width: 1, dashArray: 3 } }
    },
    yaxis: {
      labels: { style: { fontSize: '11px', colors: ink.muted } }
    },
    states: {
      hover: { filter: { type: 'lighten' } }
    }
  };
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function compactNumber(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  if (abs >= 1_000) {
    return `${(value / 1_000).toFixed(abs >= 10_000 ? 0 : 1)}k`;
  }
  return `${value}`;
}
