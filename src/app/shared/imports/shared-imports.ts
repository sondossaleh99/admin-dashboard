import { DatePipe, DecimalPipe } from '@angular/common';

import { AppCurrencyPipe } from '../pipes/app-currency.pipe';
import { UiCardComponent } from '../ui/ui-card';

export const SHARED_IMPORTS = [AppCurrencyPipe, DatePipe, DecimalPipe, UiCardComponent];
