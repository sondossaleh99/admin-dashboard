import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { SHARED_IMPORTS } from '../../imports/shared-imports';

/**
 * Period-over-period change.
 *
 * The arrow and the sign carry the meaning, so the value still reads correctly
 * in greyscale or to someone who cannot separate the red from the green.
 */
@Component({
  selector: 'app-delta-badge',
  imports: [...SHARED_IMPORTS],
  template: `
    <i class="pi" [class.pi-arrow-up]="isUp()" [class.pi-arrow-down]="!isUp()" aria-hidden="true"></i>
    <span>{{ isUp() ? '+' : '−' }}{{ magnitude() | number: '1.0-1' }}%</span>
  `,
  styleUrl: './delta-badge.scss',
  host: {
    '[class.delta-badge--up]': 'isUp()',
    '[class.delta-badge--down]': '!isUp()',
    '[attr.aria-label]': 'label()'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeltaBadge {
  /** Signed percentage, e.g. `-12.4`. */
  value = input.required<number>();

  isUp = computed(() => this.value() >= 0);
  magnitude = computed(() => Math.abs(this.value()));
  label = computed(
    () => `${this.isUp() ? 'Up' : 'Down'} ${this.magnitude()} percent`
  );
}
