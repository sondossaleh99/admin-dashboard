import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import {
  EmptyStateComponent,
  SHARED_IMPORTS,
  SectionHeaderComponent,
  TableSkeletonComponent
} from '../../shared';
import { CustomersTableComponent } from './components';
import { CustomersService } from './service';

@Component({
  selector: 'app-customers-page',
  imports: [
    ...SHARED_IMPORTS,
    SectionHeaderComponent,
    EmptyStateComponent,
    TableSkeletonComponent,
    CustomersTableComponent
  ],
  providers: [CustomersService],
  templateUrl: './customers-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomersPageComponent {
  service = inject(CustomersService);
}
