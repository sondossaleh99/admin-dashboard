import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import {
  ChartSparklineComponent,
  DeltaBadgeComponent,
  IconChipComponent,
  IconChipSize,
  SHARED_IMPORTS,
  WeeklyStat
} from '../../../../shared';

@Component({
  selector: 'app-weekly-stats-card',
  imports: [...SHARED_IMPORTS, IconChipComponent, DeltaBadgeComponent, ChartSparklineComponent],
  templateUrl: './weekly-stats-card.html',
  styleUrl: './weekly-stats-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeeklyStatsCardComponent {
  iconChipSize = IconChipSize;

  stats = input.required<WeeklyStat[]>();
}
