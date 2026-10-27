import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';

import { EmployeeRoleLookup, SHARED_IMPORTS } from '../../../../shared';
import { EmployeeService } from '../../service';

@Component({
  selector: 'app-employee-table',
  imports: [...SHARED_IMPORTS, TableModule],
  templateUrl: './employee-table.component.html',
  styleUrl: './employee-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeTableComponent {
  service = inject(EmployeeService);
  translate = inject(TranslateService);
  employees = this.service.employees;
  page = this.service.page;
  totalRecords = computed(() => this.employees.value()?.total ?? 0);
  rowsPerPageOptions = [5, 10, 20];

  tableValue = computed(() =>
    (this.employees.value()?.items ?? []).map((employee) => ({
      ...employee,
      roleLabel: String(this.translate.instant(EmployeeRoleLookup.getLabel(employee.role)))
    }))
  );

  onLazyLoad(event: TableLazyLoadEvent): void {
    this.service.setPage({ first: event.first ?? 0, rows: event.rows ?? this.page().rows });
  }
}
