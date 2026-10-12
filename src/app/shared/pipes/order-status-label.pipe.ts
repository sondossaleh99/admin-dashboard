import { Pipe, PipeTransform } from '@angular/core';

import { OrderStatus } from '../enum/order-status';
import { OrderStatusLookup } from '../lookup/order-status.lookup';

@Pipe({ name: 'orderStatusLabel' })
export class OrderStatusLabelPipe implements PipeTransform {
  transform(status: OrderStatus): string {
    return OrderStatusLookup.getLabel(status);
  }
}
