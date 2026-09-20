import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { Kpi } from '../../../../core/models/dashboard.model';
import { StatCard } from '../../../../shared/ui/stat-card/stat-card';

/** A KPI with its figure already formatted for display. */
export interface KpiViewModel extends Kpi {
  readonly display: string;
}

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
  readonly kpis = input.required<readonly KpiViewModel[]>();
}
