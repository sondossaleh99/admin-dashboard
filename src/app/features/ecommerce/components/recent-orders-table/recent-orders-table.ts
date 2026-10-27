import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

import {
  ActivityToneLookup,
  Order,
  OrderActivityLookup,
  OrderStatusLookup,
  SHARED_IMPORTS
} from '../../../../shared';
import { LanguageService } from '../../../../core';

@Component({
  selector: 'app-recent-orders-table',
  imports: [...SHARED_IMPORTS, TableModule, IconField, InputIcon, InputText],
  templateUrl: './recent-orders-table.html',
  styleUrl: './recent-orders-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentOrdersTableComponent {
  translate = inject(TranslateService);
  language = inject(LanguageService);

  orders = input.required<Order[]>();

  tableValue = computed(() => {
    const activity = OrderActivityLookup.getActivity();
    return this.orders().map((order) => ({
      ...order,
      statusLabel: String(this.translate.instant(OrderStatusLookup.getLabel(order.status))),
      statusTone: ActivityToneLookup.getLabel(activity[order.status].tone)
    }));
  });
}
