import { RevenueTotals } from '../models/revenue-totals.model';

export class RevenueTotalsLookup {
  static getLabels(): Record<keyof RevenueTotals, string> {
    return {
      budget: 'Budget',
      expense: 'Expense',
      margin: 'Margin'
    };
  }
}
