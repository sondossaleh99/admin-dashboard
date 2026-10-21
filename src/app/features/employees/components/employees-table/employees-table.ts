import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Avatar } from 'primeng/avatar';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

import { Employee, InitialsPipe, SHARED_IMPORTS } from '../../../../shared';

@Component({
  selector: 'app-employees-table',
  imports: [...SHARED_IMPORTS, TableModule, Avatar, IconField, InputIcon, InputText, InitialsPipe],
  templateUrl: './employees-table.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesTableComponent {
  employees = input.required<Employee[]>();

  pageSize = 10;

  subtitle = computed(() => `${this.employees().length} employees`);
}
