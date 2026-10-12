import { DatePipe, DecimalPipe } from '@angular/common';

import { MoneyPipe } from '../pipes/money.pipe';
import { UiCardComponent } from '../ui/ui-card';

export const SHARED_IMPORTS = [MoneyPipe, DatePipe, DecimalPipe, UiCardComponent];
