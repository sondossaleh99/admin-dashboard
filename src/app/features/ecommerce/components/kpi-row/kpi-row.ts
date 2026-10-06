import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { KpiViewModel, StatCardComponent } from '../../../../shared';

@Component({
  selector: 'app-kpi-row',
  imports: [StatCardComponent],
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
export class KpiRowComponent {
  kpis = input.required<KpiViewModel[]>();
}
