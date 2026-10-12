import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SHARED_IMPORTS, SkeletonBlockComponent } from '../../../../shared';

@Component({
  selector: 'app-dashboard-skeleton',
  imports: [...SHARED_IMPORTS, SkeletonBlockComponent],
  templateUrl: './dashboard-skeleton.html',
  host: { class: 'row g-6' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardSkeletonComponent {
  placeholders = [1, 2, 3, 4];
}
