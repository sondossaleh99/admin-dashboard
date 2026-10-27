import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SHARED_IMPORTS, SectionHeaderComponent } from '../../shared';
import { EmployeeTableComponent } from './components';
import { EmployeeService } from './service';

@Component({
  selector: 'app-employee-page',
  imports: [...SHARED_IMPORTS, SectionHeaderComponent, EmployeeTableComponent],
  providers: [EmployeeService],
  templateUrl: './employee-page.component.html',
  styleUrl: './employee-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeePageComponent {}
