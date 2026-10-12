import { DEFAULT_CURRENCY_CODE } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AppCurrencyPipe } from './app-currency.pipe';

function createPipe(currencyCode = 'USD') {
  TestBed.configureTestingModule({
    providers: [{ provide: DEFAULT_CURRENCY_CODE, useValue: currencyCode }]
  });
  return TestBed.runInInjectionContext(() => new AppCurrencyPipe());
}

describe('AppCurrencyPipe', () => {
  it('formats whole dollars by default', () => {
    expect(createPipe().transform(424438.4)).toBe('$424,438');
  });

  it('shows the requested number of decimals', () => {
    expect(createPipe().transform(63448.784, 2)).toBe('$63,448.78');
  });

  it('uses the app-wide default currency', () => {
    expect(createPipe('EUR').transform(1234)).toBe('€1,234');
  });
});
