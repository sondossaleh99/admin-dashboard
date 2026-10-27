import { DEFAULT_CURRENCY_CODE, LOCALE_ID, Pipe, PipeTransform, inject } from '@angular/core';
import { formatNumber } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Pipe({ name: 'appCurrency', pure: false })
export class AppCurrencyPipe implements PipeTransform {
  locale = inject(LOCALE_ID);
  currencyCode = inject(DEFAULT_CURRENCY_CODE);
  translate = inject(TranslateService);

  transform(value: number, decimals = 0): string {
    return String(
      this.translate.instant('common.money', {
        amount: formatNumber(value, this.locale, `1.${decimals}-${decimals}`),
        symbol: this.translate.instant(`currencies.${this.currencyCode}`)
      })
    );
  }
}
