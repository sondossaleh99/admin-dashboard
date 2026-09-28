import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { IconChipTone } from '../../enum/icon-chip-tone';
import { SHARED_IMPORTS } from '../../imports/shared-imports';
import { DeltaBadgeComponent } from '../delta-badge';
import { IconChipComponent } from '../icon-chip';

/** A KPI tile: icon chip, headline figure, period-over-period change, label. */
@Component({
  selector: 'app-stat-card',
  imports: [...SHARED_IMPORTS, IconChipComponent, DeltaBadgeComponent],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatCardComponent {
  label = input.required<string>();
  /** Pre-formatted by the caller, so currency and compact forms both fit. */
  value = input.required<string>();
  icon = input.required<string>();
  tone = input<IconChipTone>(IconChipTone.Primary);
  /** Signed percentage. Omit when there is no comparison period. */
  delta = input<number>();
  caption = input<string>();
}
