import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
  viewChild
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { ButtonDirective, ButtonIcon, ButtonLabel } from 'primeng/button';
import { SelectButton } from 'primeng/selectbutton';

import {
  CalendarEvent,
  CalendarView,
  CalendarViewLookup,
  SHARED_IMPORTS
} from '../../../../shared';

@Component({
  selector: 'app-event-calendar',
  imports: [
    ...SHARED_IMPORTS,
    FormsModule,
    FullCalendarModule,
    ButtonDirective,
    ButtonIcon,
    ButtonLabel,
    SelectButton
  ],
  templateUrl: './event-calendar.html',
  styleUrl: './event-calendar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventCalendarComponent {
  events = input.required<CalendarEvent[]>();

  calendar = viewChild(FullCalendarComponent);

  views = CalendarViewLookup.getAll();

  initialView = window.matchMedia('(max-width: 767.98px)').matches
    ? CalendarView.Day
    : CalendarView.Week;

  view = signal(this.initialView);

  title = signal('');

  options = computed<CalendarOptions>(() => ({
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
    initialView: CalendarViewLookup.getViewName(this.initialView),
    views: {
      timeGridWorkWeek: { type: 'timeGrid', duration: { weeks: 1 }, weekends: false }
    },
    headerToolbar: false,
    height: 'auto',
    allDaySlot: false,
    nowIndicator: true,
    slotMinTime: '08:00:00',
    slotMaxTime: '19:00:00',
    eventDisplay: 'block',
    events: this.events().map((event) => ({
      id: String(event.id),
      title: event.title,
      start: event.start,
      end: event.end,
      extendedProps: { location: event.location }
    })),
    datesSet: (range) => this.title.set(range.view.title)
  }));

  changeView(view: CalendarView): void {
    this.view.set(view);
    this.calendar()?.getApi().changeView(CalendarViewLookup.getViewName(view));
  }

  previous(): void {
    this.calendar()?.getApi().prev();
  }

  next(): void {
    this.calendar()?.getApi().next();
  }

  today(): void {
    this.calendar()?.getApi().today();
  }
}
