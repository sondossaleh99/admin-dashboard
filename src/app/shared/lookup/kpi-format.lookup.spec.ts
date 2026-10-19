import { KpiFormat } from '../enum/kpi-format';
import { KpiFormatLookup } from './kpi-format.lookup';

describe('KpiFormatLookup', () => {
  it('lists every format once, in order', () => {
    expect(KpiFormatLookup.getAll().map((item) => item.id)).toEqual([
      KpiFormat.Currency,
      KpiFormat.Number,
      KpiFormat.Percent
    ]);
  });

  it('labels every format', () => {
    expect(KpiFormatLookup.getLabel(KpiFormat.Currency)).toBe('Currency');
    expect(KpiFormatLookup.getLabel(KpiFormat.Number)).toBe('Number');
    expect(KpiFormatLookup.getLabel(KpiFormat.Percent)).toBe('Percent');
  });
});
