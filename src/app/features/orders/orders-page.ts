import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import {
  EmptyStateComponent,
  SHARED_IMPORTS,
  SectionHeaderComponent,
  TableSkeletonComponent
} from '../../shared';
import { OrdersTableComponent } from './components';
import { OrdersService } from './service';

@Component({
  selector: 'app-orders-page',
  imports: [
    ...SHARED_IMPORTS,
    SectionHeaderComponent,
    EmptyStateComponent,
    TableSkeletonComponent,
    OrdersTableComponent
  ],
  providers: [OrdersService],
  templateUrl: './orders-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersPageComponent {
  service = inject(OrdersService);
}
