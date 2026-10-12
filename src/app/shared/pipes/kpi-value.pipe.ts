import { LOCALE_ID, Pipe, PipeTransform, inject } from '@angular/core';
import { formatNumber, formatPercent } from '@angular/common';

import { KpiFormat } from '../enum/kpi-format';
import { AppCurrencyPipe } from './app-currency.pipe';

@Pipe({ name: 'kpiValue' })
export class KpiValuePipe implements PipeTransform {
  locale = inject(LOCALE_ID);
  currency = new AppCurrencyPipe();

  transform(value: number, format: KpiFormat): string {
    switch (format) {
      case KpiFormat.Currency:
        return this.currency.transform(value);
      case KpiFormat.Percent:
        return formatPercent(value / 100, this.locale, '1.0-1');
      default:
        return formatNumber(value, this.locale, '1.0-0');
    }
  }
}
