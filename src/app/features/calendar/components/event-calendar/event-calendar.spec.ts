import { TestBed } from '@angular/core/testing';
import { DatesSetArg } from '@fullcalendar/core';

import { CalendarEvent, CalendarView } from '../../../../shared';
import { EventCalendarComponent } from './event-calendar';

const EVENT: CalendarEvent = {
  id: 7,
  title: 'Sky Gazers',
  location: 'Greenland',
  start: '2026-10-23T11:00:00',
  end: '2026-10-23T12:30:00'
};

function setup(events: CalendarEvent[] = [EVENT]) {
  TestBed.configureTestingModule({ imports: [EventCalendarComponent] });
  TestBed.overrideComponent(EventCalendarComponent, { set: { template: '', imports: [] } });

  const fixture = TestBed.createComponent(EventCalendarComponent);
  fixture.componentRef.setInput('events', events);
  fixture.detectChanges();

  return { fixture, calendar: fixture.componentInstance };
}

describe('EventCalendarComponent', () => {
  it('opens on the day view on small screens and the week view otherwise', () => {
    const { calendar } = setup();
    const small = window.matchMedia('(max-width: 767.98px)').matches;

    expect(calendar.view()).toBe(small ? CalendarView.Day : CalendarView.Week);
    expect(calendar.options().initialView).toBe(small ? 'timeGridDay' : 'timeGridWeek');
  });

  it('hands every event to the calendar with its location', () => {
    const { calendar } = setup();

    expect(calendar.options().events).toEqual([
      {
        id: '7',
        title: 'Sky Gazers',
        start: EVENT.start,
        end: EVENT.end,
        extendedProps: { location: 'Greenland' }
      }
    ]);
  });

  it('defines the work week as five days', () => {
    const { calendar } = setup();

    expect(calendar.options().views?.['timeGridWorkWeek']).toEqual(
      jasmine.objectContaining({ type: 'timeGrid', weekends: false })
    );
  });

  it('offers the five views in order', () => {
    const { calendar } = setup();

    expect(calendar.views.map((view) => view.label)).toEqual([
      'Day',
      'Week',
      'Work week',
      'Month',
      'Agenda'
    ]);
  });

  it('remembers the chosen view', () => {
    const { calendar } = setup();

    calendar.changeView(CalendarView.Month);

    expect(calendar.view()).toBe(CalendarView.Month);
  });

  it('shows the title of the visible range', () => {
    const { calendar } = setup();
    const datesSet = calendar.options().datesSet as (arg: DatesSetArg) => void;

    datesSet({ view: { title: 'Oct 18 – 24, 2026' } } as DatesSetArg);

    expect(calendar.title()).toBe('Oct 18 – 24, 2026');
  });
});
