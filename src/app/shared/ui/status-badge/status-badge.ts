import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { ActivityTone } from '../../enum/activity-tone';
import { ActivityToneLookup } from '../../lookup/activity-tone.lookup';

@Component({
  selector: 'app-status-badge',
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusBadgeComponent {
  label = input.required<string>();
  tone = input.required<ActivityTone>();

  toneClass = computed(() => `status--${ActivityToneLookup.getLabel(this.tone())}`);
}
