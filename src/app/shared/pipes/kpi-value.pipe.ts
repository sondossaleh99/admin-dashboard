import { LOCALE_ID, Pipe, PipeTransform, inject } from '@angular/core';
import { formatCurrency, formatNumber, formatPercent } from '@angular/common';

import { KpiFormat } from '../enum/kpi-format';

@Pipe({ name: 'kpiValue' })
export class KpiValuePipe implements PipeTransform {
  locale = inject(LOCALE_ID);

  transform(value: number, format: KpiFormat): string {
    switch (format) {
      case KpiFormat.Currency:
        return formatCurrency(value, this.locale, '$', 'USD', '1.0-0');
      case KpiFormat.Percent:
        return formatPercent(value / 100, this.locale, '1.0-1');
      default:
        return formatNumber(value, this.locale, '1.0-0');
    }
  }
}
