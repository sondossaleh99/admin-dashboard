import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import {
  EmptyStateComponent,
  SHARED_IMPORTS,
  SectionHeaderComponent,
  SkeletonBlockComponent
} from '../../shared';
import { EventCalendarComponent } from './components';
import { CalendarService } from './service';

@Component({
  selector: 'app-calendar-page',
  imports: [
    ...SHARED_IMPORTS,
    SectionHeaderComponent,
    EmptyStateComponent,
    SkeletonBlockComponent,
    EventCalendarComponent
  ],
  providers: [CalendarService],
  templateUrl: './calendar-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarPageComponent {
  service = inject(CalendarService);
}
