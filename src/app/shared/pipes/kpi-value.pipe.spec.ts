import { TestBed } from '@angular/core/testing';

import { KpiFormat } from '../enum/kpi-format';
import { KpiValuePipe } from './kpi-value.pipe';

describe('KpiValuePipe', () => {
  let pipe: KpiValuePipe;

  beforeEach(() => {
    pipe = TestBed.runInInjectionContext(() => new KpiValuePipe());
  });

  it('formats a number with grouping and no decimals', () => {
    expect(pipe.transform(39354, KpiFormat.Number)).toBe('39,354');
  });

  it('formats a currency in US dollars', () => {
    expect(pipe.transform(42339, KpiFormat.Currency)).toBe('$42,339');
  });

  it('formats a percent from a whole-number value', () => {
    expect(pipe.transform(12.5, KpiFormat.Percent)).toBe('12.5%');
  });
});
