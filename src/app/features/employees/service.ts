import { Injectable, computed } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Observable, delay, of } from 'rxjs';

import { EMPLOYEES } from './mock-data';
import { Employee } from '../../shared';

@Injectable()
export class EmployeesService {
  latencyMs = 300;

  getEmployees(): Observable<Employee[]> {
    return of(EMPLOYEES).pipe(delay(this.latencyMs));
  }

  employees = rxResource({
    stream: () => this.getEmployees()
  });

  data = computed(() => (this.employees.hasValue() ? this.employees.value() : undefined));
  loading = computed(() => this.employees.status() === 'loading');
  error = computed(() => this.employees.status() === 'error');

  retry(): void {
    this.employees.reload();
  }
}
