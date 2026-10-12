import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Kpi, KpiValuePipe, StatCardComponent } from '../../../../shared';

@Component({
  selector: 'app-kpi-row',
  imports: [StatCardComponent, KpiValuePipe],
  templateUrl: './kpi-row.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KpiRowComponent {
  kpis = input.required<Kpi[]>();
}
