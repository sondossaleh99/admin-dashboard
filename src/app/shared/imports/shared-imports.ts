import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';

/**
 * Angular/PrimeNG dependencies repeated across three or more standalone
 * components. Spread into a component's own `imports` array, e.g.
 * `imports: [...SHARED_IMPORTS, RecentOrdersTable]`.
 */
export const SHARED_IMPORTS = [CurrencyPipe, DatePipe, DecimalPipe];
