import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Kpi, KpiValuePipe, StatCardComponent } from '../../../../shared';

@Component({
  selector: 'app-kpi-row',
  imports: [StatCardComponent, KpiValuePipe],
  template: `
    <div class="row g-6">
      @for (kpi of kpis(); track kpi.id) {
        <div class="col-12 col-sm-6 col-xl-3">
          <app-stat-card
            [label]="kpi.label"
            [value]="kpi.value | kpiValue: kpi.format"
            [icon]="kpi.icon"
            [tone]="kpi.tone"
            [delta]="kpi.delta"
          />
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KpiRowComponent {
  kpis = input.required<Kpi[]>();
}
