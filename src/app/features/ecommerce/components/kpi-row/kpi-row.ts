import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { StatCard } from '../../../../shared';
import { KpiViewModel } from './kpi-row.model';

/** The four-tile KPI grid. Formatting is the caller's job — see EcommercePage. */
@Component({
  selector: 'app-kpi-row',
  imports: [StatCard],
  template: `
    <div class="row g-4">
      @for (kpi of kpis(); track kpi.id) {
        <div class="col-12 col-sm-6 col-xl-3">
          <app-stat-card
            [label]="kpi.label"
            [value]="kpi.display"
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
export class KpiRow {
  kpis = input.required<KpiViewModel[]>();
}
