import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { ChartSparkline, DeltaBadge, IconChip, UiCard, WeeklyStat } from '../../../../shared';

/** A short list of standout figures, each with its own trend line. */
@Component({
  selector: 'app-weekly-stats-card',
  imports: [UiCard, IconChip, DeltaBadge, ChartSparkline],
  templateUrl: './weekly-stats-card.html',
  styleUrl: './weekly-stats-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeeklyStatsCard {
  readonly stats = input.required<readonly WeeklyStat[]>();
}
