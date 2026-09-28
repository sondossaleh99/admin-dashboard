import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';

import { UiCardComponent } from '../ui/ui-card';

/**
 * Angular pipes and shared UI building blocks repeated across standalone
 * components project-wide. Spread into a component's own `imports` array,
 * e.g. `imports: [...SHARED_IMPORTS, RecentOrdersTableComponent]`.
 *
 * `UiCardComponent` earns its place here (rather than staying an explicit,
 * per-component import like `DeltaBadgeComponent` or `IconChipComponent`) because it is the
 * one dependency every card-shaped surface in the app sits on — 8 of the
 * project's ~14 feature/UI components use it, more than any single pipe.
 */
export const SHARED_IMPORTS = [CurrencyPipe, DatePipe, DecimalPipe, UiCardComponent];
