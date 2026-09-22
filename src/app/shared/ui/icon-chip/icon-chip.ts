import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { IconChipTone } from '../../enum/icon-chip-tone';

/** The tinted rounded icon square used on stat cards and list rows. */
@Component({
  selector: 'app-icon-chip',
  template: `<i class="pi {{ icon() }}" aria-hidden="true"></i>`,
  styleUrl: './icon-chip.scss',
  host: {
    '[class]': 'hostClasses()',
    '[style.--chip-color]': 'color()'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconChip {
  readonly icon = input.required<string>();
  readonly tone = input<IconChipTone>(IconChipTone.Primary);
  readonly size = input<'sm' | 'md' | 'lg'>('md');

  readonly hostClasses = computed(() => `icon-chip icon-chip--${this.size()}`);

  readonly color = computed(() => {
    const map: Record<IconChipTone, string> = {
      primary: 'var(--color-primary)',
      'series-2': 'var(--chart-series-2)',
      'series-3': 'var(--chart-series-3)',
      'series-4': 'var(--chart-series-4)',
      success: 'var(--color-success)',
      danger: 'var(--color-danger)'
    };
    return map[this.tone()];
  });
}
