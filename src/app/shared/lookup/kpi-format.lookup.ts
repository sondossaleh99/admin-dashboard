import { KpiFormat } from '../enum/kpi-format';

export class KpiFormatLookup {
  static getAll(): { id: KpiFormat; label: string }[] {
    return [
      { id: KpiFormat.Currency, label: 'Currency' },
      { id: KpiFormat.Number, label: 'Number' },
      { id: KpiFormat.Percent, label: 'Percent' }
    ];
  }

  static getLabel(id: KpiFormat): string {
    return KpiFormatLookup.getAll().find((item) => item.id === id)?.label ?? '';
  }
}
