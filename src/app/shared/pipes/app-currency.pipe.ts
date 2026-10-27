import { DEFAULT_CURRENCY_CODE, LOCALE_ID, Pipe, PipeTransform, inject } from '@angular/core';
import { formatCurrency, getCurrencySymbol } from '@angular/common';

@Pipe({ name: 'appCurrency' })
export class AppCurrencyPipe implements PipeTransform {
  locale = inject(LOCALE_ID);
  currencyCode = inject(DEFAULT_CURRENCY_CODE);
  symbol = getCurrencySymbol(this.currencyCode, 'wide', this.locale);
  display = /^[A-Za-z]+$/.test(this.symbol) ? `${this.symbol} ` : this.symbol;

  transform(value: number, decimals = 0): string {
    return formatCurrency(
      value,
      this.locale,
      this.display,
      this.currencyCode,
      `1.${decimals}-${decimals}`
    );
  }
}
