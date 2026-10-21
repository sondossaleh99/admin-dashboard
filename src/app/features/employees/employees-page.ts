import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import {
  EmptyStateComponent,
  SHARED_IMPORTS,
  SectionHeaderComponent,
  TableSkeletonComponent
} from '../../shared';
import { EmployeesTableComponent } from './components';
import { EmployeesService } from './service';

@Component({
  selector: 'app-employees-page',
  imports: [
    ...SHARED_IMPORTS,
    SectionHeaderComponent,
    EmptyStateComponent,
    TableSkeletonComponent,
    EmployeesTableComponent
  ],
  providers: [EmployeesService],
  templateUrl: './employees-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesPageComponent {
  service = inject(EmployeesService);
}
