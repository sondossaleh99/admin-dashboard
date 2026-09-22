import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { ChartSparkline, DeltaBadge, Earnings, UiCard } from '../../../../shared';

/**
 * The dashboard's headline banner: total earnings, its trend, and the
 * budget/expense split behind it.
 *
 * The trend is rendered as a sparkline rather than a full area chart because
 * `Earnings.trend` carries no period labels — an axis would have to invent
 * categories the data model doesn't have. [verify] against the reference for
 * exact proportions and any decorative treatment.
 */
@Component({
  selector: 'app-earnings-hero',
  imports: [CurrencyPipe, UiCard, ChartSparkline, DeltaBadge],
  templateUrl: './earnings-hero.html',
  styleUrl: './earnings-hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EarningsHero {
  readonly earnings = input.required<Earnings>();
}
