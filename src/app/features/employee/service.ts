import { Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Observable, of } from 'rxjs';

import { employees } from './mock-data';
import { Employee, PageRequest, PagedResult } from '../../shared';

@Injectable()
export class EmployeeService {
  page = signal<PageRequest>({ first: 0, rows: 10 });

  getEmployees(request: PageRequest): Observable<PagedResult<Employee>> {
    const data = {
      items: employees.slice(request.first, request.first + request.rows),
      total: employees.length
    };

    return of(data);
  }

  employees = rxResource({
    params: () => this.page(),
    stream: ({ params }) => this.getEmployees(params)
  });

  setPage(request: PageRequest): void {
    this.page.set(request);
  }
}
