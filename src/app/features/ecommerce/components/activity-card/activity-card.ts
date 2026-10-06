import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { ActivityEvent, SHARED_IMPORTS } from '../../../../shared';

@Component({
  selector: 'app-activity-card',
  imports: [...SHARED_IMPORTS],
  templateUrl: './activity-card.html',
  styleUrl: './activity-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityCardComponent {
  events = input.required<ActivityEvent[]>();
}
