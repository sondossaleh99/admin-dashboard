import { Injectable, computed } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Observable, delay, of } from 'rxjs';

import { CALENDAR_EVENTS } from './mock-data';
import { CalendarEvent } from '../../shared';

@Injectable()
export class CalendarService {
  latencyMs = 300;

  getEvents(): Observable<CalendarEvent[]> {
    return of(CALENDAR_EVENTS).pipe(delay(this.latencyMs));
  }

  events = rxResource({
    stream: () => this.getEvents()
  });

  data = computed(() => (this.events.hasValue() ? this.events.value() : undefined));
  loading = computed(() => this.events.status() === 'loading');
  error = computed(() => this.events.status() === 'error');

  retry(): void {
    this.events.reload();
  }
}
