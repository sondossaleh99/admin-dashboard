import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { DeltaBadge } from '../delta-badge/delta-badge';
import { IconChip, IconChipTone } from '../icon-chip/icon-chip';
import { UiCard } from '../ui-card/ui-card';

/** A KPI tile: icon chip, headline figure, period-over-period change, label. */
@Component({
  selector: 'app-stat-card',
  imports: [UiCard, IconChip, DeltaBadge],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatCard {
  readonly label = input.required<string>();
  /** Pre-formatted by the caller, so currency and compact forms both fit. */
  readonly value = input.required<string>();
  readonly icon = input.required<string>();
  readonly tone = input<IconChipTone>('primary');
  /** Signed percentage. Omit when there is no comparison period. */
  readonly delta = input<number>();
  readonly caption = input<string>();
}
