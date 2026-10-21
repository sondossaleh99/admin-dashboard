import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { SkeletonBlockComponent } from '../skeleton-block/skeleton-block';
import { UiCardComponent } from '../ui-card/ui-card';

@Component({
  selector: 'app-table-skeleton',
  imports: [SkeletonBlockComponent, UiCardComponent],
  templateUrl: './table-skeleton.html',
  host: { class: 'd-block', 'aria-busy': 'true' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableSkeletonComponent {
  rows = input(8);

  placeholders = computed(() => Array.from({ length: this.rows() }, (_, i) => i));
}
