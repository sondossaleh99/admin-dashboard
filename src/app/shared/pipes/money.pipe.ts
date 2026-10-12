import { DEFAULT_CURRENCY_CODE, LOCALE_ID, Pipe, PipeTransform, inject } from '@angular/core';
import { formatCurrency, getCurrencySymbol } from '@angular/common';

@Pipe({ name: 'money' })
export class MoneyPipe implements PipeTransform {
  locale = inject(LOCALE_ID);
  currencyCode = inject(DEFAULT_CURRENCY_CODE);

  transform(value: number, decimals = 0): string {
    return formatCurrency(
      value,
      this.locale,
      getCurrencySymbol(this.currencyCode, 'wide', this.locale),
      this.currencyCode,
      `1.${decimals}-${decimals}`
    );
  }
}
