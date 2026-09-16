import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CurrencyPipe, DatePipe, DecimalPipe, formatCurrency, formatNumber, formatPercent } from '@angular/common';
import { LOCALE_ID } from '@angular/core';

import { EcommerceService } from '../../core/services/ecommerce.service';
import { Kpi, RevenueRange } from '../../core/models/dashboard.model';
import { DeltaBadge } from '../../shared/ui/delta-badge/delta-badge';
import { EmptyState } from '../../shared/ui/empty-state/empty-state';
import { IconChip } from '../../shared/ui/icon-chip/icon-chip';
import { SectionHeader } from '../../shared/ui/section-header/section-header';
import { SkeletonBlock } from '../../shared/ui/skeleton-block/skeleton-block';
import { StatCard } from '../../shared/ui/stat-card/stat-card';
import { ChartCombo, ComboSeries } from '../../shared/charts/chart-combo';
import { ChartDonut, DonutSlice } from '../../shared/charts/chart-donut';
import { ChartSparkline } from '../../shared/charts/chart-sparkline';
import { UiCard } from '../../shared/ui/ui-card/ui-card';

/**
 * Route target for `/ecommerce`.
 *
 * Stage 4 wires the data layer and renders it plainly so loading, error and
 * derived values can be reviewed. The designed sections land in Stage 6, which
 * is gated on the visual audit.
 */
@Component({
  selector: 'app-ecommerce-page',
  imports: [
    CurrencyPipe,
    DatePipe,
    DecimalPipe,
    UiCard,
    StatCard,
    IconChip,
    DeltaBadge,
    SectionHeader,
    SkeletonBlock,
    EmptyState,
    ChartCombo,
    ChartDonut,
    ChartSparkline
  ],
  templateUrl: './ecommerce-page.html',
  styleUrl: './ecommerce-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EcommercePage {
  private readonly service = inject(EcommerceService);
  private readonly locale = inject(LOCALE_ID);

  /** Owns loading, error and value as signals, and gives retry a `reload()`. */
  private readonly dashboard = rxResource({
    stream: () => this.service.getDashboard()
  });

  protected readonly data = this.dashboard.value;
  protected readonly loading = computed(() => this.dashboard.status() === 'loading');
  protected readonly error = computed(() => this.dashboard.status() === 'error');

  /** Revenue card's period filter. */
  protected readonly range = signal<RevenueRange>('12m');

  /** Derived, not stored: changing the range never mutates the source series. */
  protected readonly revenue = computed(() => {
    const points = this.data()?.revenue ?? [];
    return this.range() === '6m' ? points.slice(-6) : points;
  });

  protected readonly revenueTotals = computed(() => {
    const points = this.revenue();
    const budget = points.reduce((sum, p) => sum + p.budget, 0);
    const expense = points.reduce((sum, p) => sum + p.expense, 0);
    return { budget, expense, margin: budget - expense };
  });

  /**
   * KPIs with their figures already rendered for display.
   *
   * Formatting lives here rather than as a branch in the template: the rule
   * differs per KPI, and Angular's own format functions (the ones the pipes
   * call) keep it locale-aware rather than hand-rolled.
   */
  protected readonly kpis = computed(() =>
    (this.data()?.kpis ?? []).map((kpi) => ({
      ...kpi,
      display: this.format(kpi.value, kpi.format)
    }))
  );

  protected readonly salesTotal = computed(() =>
    (this.data()?.salesBreakdown ?? []).reduce((sum, slice) => sum + slice.value, 0)
  );

  private format(value: number, as: Kpi['format']): string {
    switch (as) {
      case 'currency':
        return formatCurrency(value, this.locale, '$', 'USD', '1.0-0');
      case 'percent':
        return formatPercent(value / 100, this.locale, '1.0-1');
      default:
        return formatNumber(value, this.locale, '1.0-0');
    }
  }

  /** Category axis and the two series the combo chart takes. */
  protected readonly revenuePeriods = computed(() => this.revenue().map((p) => p.period));

  protected readonly revenueSeries = computed<ComboSeries[]>(() => [
    { name: 'Budget', data: this.revenue().map((p) => p.budget) },
    { name: 'Expense', data: this.revenue().map((p) => p.expense) }
  ]);

  protected readonly donutSlices = computed<DonutSlice[]>(() =>
    (this.data()?.salesBreakdown ?? []).map((s) => ({ label: s.label, value: s.value }))
  );

  protected setRange(range: RevenueRange): void {
    this.range.set(range);
  }

  protected retry(): void {
    this.dashboard.reload();
  }
}
