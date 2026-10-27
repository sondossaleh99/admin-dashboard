import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';

import {
  ActivityToneLookup,
  OrderActivityLookup,
  OrderStatusLookup,
  SHARED_IMPORTS
} from '../../../../shared';
import { OrderService } from '../../service';

@Component({
  selector: 'app-order-table',
  imports: [...SHARED_IMPORTS, TableModule],
  templateUrl: './order-table.component.html',
  styleUrl: './order-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderTableComponent {
  service = inject(OrderService);
  translate = inject(TranslateService);
  orders = this.service.orders;
  page = this.service.page;
  totalRecords = computed(() => this.orders.value()?.total ?? 0);
  rowsPerPageOptions = [5, 10, 20];

  tableValue = computed(() => {
    const activity = OrderActivityLookup.getActivity();
    return (this.orders.value()?.items ?? []).map((order) => ({
      ...order,
      statusLabel: String(this.translate.instant(OrderStatusLookup.getLabel(order.status))),
      statusTone: ActivityToneLookup.getLabel(activity[order.status].tone)
    }));
  });

  onLazyLoad(event: TableLazyLoadEvent): void {
    this.service.setPage({ first: event.first ?? 0, rows: event.rows ?? this.page().rows });
  }
}
