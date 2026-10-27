import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { SHARED_IMPORTS } from '../../imports/shared-imports';

@Component({
  selector: 'app-delta-badge',
  imports: [...SHARED_IMPORTS],
  templateUrl: './delta-badge.html',
  styleUrl: './delta-badge.scss',
  host: {
    dir: 'ltr',
    class: 'd-inline-flex align-items-center gap-1 fs-xs fw-semibold',
    '[class.delta-badge--up]': 'isUp()',
    '[class.delta-badge--down]': '!isUp()',
    '[attr.aria-label]': 'label()'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeltaBadgeComponent {
  value = input.required<number>();

  isUp = computed(() => this.value() >= 0);
  magnitude = computed(() => Math.abs(this.value()));
  label = computed(() => `${this.isUp() ? 'Up' : 'Down'} ${this.magnitude()} percent`);
}
