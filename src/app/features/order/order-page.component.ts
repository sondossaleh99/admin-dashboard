import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { EmptyStateComponent, SHARED_IMPORTS, SectionHeaderComponent } from '../../shared';
import { OrderTableComponent } from './components';
import { OrderService } from './service';

@Component({
  selector: 'app-order-page',
  imports: [...SHARED_IMPORTS, SectionHeaderComponent, EmptyStateComponent, OrderTableComponent],
  providers: [OrderService],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderPageComponent {
  service = inject(OrderService);
}
