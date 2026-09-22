import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { WeeklyStat } from '../../../../shared/interface';
import { ChartSparkline } from '../../../../shared/charts/chart-sparkline';
import { DeltaBadge } from '../../../../shared/ui/delta-badge/delta-badge';
import { IconChip } from '../../../../shared/ui/icon-chip/icon-chip';
import { UiCard } from '../../../../shared/ui/ui-card/ui-card';

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
