import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { Kpi, KpiValuePipe, StatCardComponent } from '../../../../shared';

@Component({
  selector: 'app-kpi-row',
  imports: [StatCardComponent, KpiValuePipe, TranslatePipe],
  templateUrl: './kpi-row.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KpiRowComponent {
  kpis = input.required<Kpi[]>();
}
