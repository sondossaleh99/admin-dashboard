import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { ChartSparkline, DeltaBadge, IconChip, SHARED_IMPORTS, WeeklyStat } from '../../../../shared';

/** A short list of standout figures, each with its own trend line. */
@Component({
  selector: 'app-weekly-stats-card',
  imports: [...SHARED_IMPORTS, IconChip, DeltaBadge, ChartSparkline],
  templateUrl: './weekly-stats-card.html',
  styleUrl: './weekly-stats-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeeklyStatsCard {
  stats = input.required<WeeklyStat[]>();
}
