import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';

import { ActivityEvent, UiCard } from '../../../../shared';

/**
 * Recent-activity feed.
 *
 * The plan's page inventory calls this a "media card" with read-more links —
 * a format that would need real images and copy the reference site has, none
 * of which exists in this build's data model. Rather than invent marketing
 * content, this renders a feed derived from real order data (see
 * EcommercePage), which is the same information already on the page shown a
 * different way — an activity log rather than a media card. [verify] against
 * the reference once it is reachable; this is a documented substitution, not
 * a guess at unseen visual content.
 */
@Component({
  selector: 'app-activity-card',
  imports: [DatePipe, UiCard],
  templateUrl: './activity-card.html',
  styleUrl: './activity-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityCard {
  events = input.required<ActivityEvent[]>();
}
