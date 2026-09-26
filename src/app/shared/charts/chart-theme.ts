import { ApexOptions } from 'ng-apexcharts';

import { ChartInk } from './chart-ink.model';

/**
 * One place where charts learn what the design system looks like.
 *
 * Every value is read from the CSS custom properties emitted in Stage 1, so a
 * token change reaches the charts without touching TypeScript, and no hex code
 * is ever restated in a chart config.
 */

function cssVar(name: string, fallback = ''): string {
  if (typeof document === 'undefined') {
    return fallback;
  }
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

/**
 * Categorical series colours, in the validated fixed order.
 *
 * Slots are assigned by position and never cycled: a fifth series on an
 * all-pairs form (donut, scatter) folds into "Other" instead of wrapping back
 * to slot 1.
 */
export function seriesColors(count: number): string[] {
  return Array.from({ length: count }, (_, i) => cssVar(`--chart-series-${i + 1}`));
}

export function chartInk(): ChartInk {
  return {
    text: cssVar('--color-text', '#1f2937'),
    muted: cssVar('--chart-axis-text', '#9ca3af'),
    grid: cssVar('--chart-grid', '#eef2f6'),
    surface: cssVar('--color-surface', '#ffffff'),
    tooltipBg: cssVar('--chart-tooltip-bg', '#1f2937'),
    tooltipText: cssVar('--chart-tooltip-text', '#ffffff'),
    fontFamily: cssVar('--font-family-base', 'Inter, sans-serif')
  };
}

/**
 * Shared chassis for every chart.
 *
 * Axes and grid are deliberately recessive, and all chart text takes an ink
 * token rather than a series colour — the coloured mark beside a label is what
 * carries identity, not the label itself.
 */
export function baseOptions(): ApexOptions {
  const ink = chartInk();

  return {
    chart: {
      fontFamily: ink.fontFamily,
      foreColor: ink.muted,
      toolbar: { show: false },
      zoom: { enabled: false },
      // Sized by its container, never by fixed pixels, so the responsive pass
      // in Stage 7 is a CSS change rather than a config change.
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

/** Charts animate once on load, unless the viewer asked them not to. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return false;
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Compact axis labels: 93438 reads as 93.4k in an 11px tick. */
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
