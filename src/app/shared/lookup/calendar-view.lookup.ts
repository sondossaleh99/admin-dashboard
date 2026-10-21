import { CalendarView } from '../enum/calendar-view';

export class CalendarViewLookup {
  static getAll(): { id: CalendarView; label: string }[] {
    return [
      { id: CalendarView.Day, label: 'Day' },
      { id: CalendarView.Week, label: 'Week' },
      { id: CalendarView.WorkWeek, label: 'Work week' },
      { id: CalendarView.Month, label: 'Month' },
      { id: CalendarView.Agenda, label: 'Agenda' }
    ];
  }

  static getLabel(id: CalendarView): string {
    return CalendarViewLookup.getAll().find((item) => item.id === id)?.label ?? '';
  }

  static getViewName(id: CalendarView): string {
    return {
      [CalendarView.Day]: 'timeGridDay',
      [CalendarView.Week]: 'timeGridWeek',
      [CalendarView.WorkWeek]: 'timeGridWorkWeek',
      [CalendarView.Month]: 'dayGridMonth',
      [CalendarView.Agenda]: 'listWeek'
    }[id];
  }
}
