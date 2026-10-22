import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { SHARED_IMPORTS, SectionHeaderComponent } from '../../shared';
import { OrderTableComponent } from './components';
import { OrderService } from './service';

@Component({
  selector: 'app-order-page',
  imports: [...SHARED_IMPORTS, SectionHeaderComponent, OrderTableComponent],
  providers: [OrderService],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderPageComponent {
  service = inject(OrderService);
  orders = this.service.orders;
}
