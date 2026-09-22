import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { IconChipTone } from '../../enum/icon-chip-tone';
import { IconChipToneLookup } from '../../lookup/icon-chip-tone.lookup';

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

  readonly color = computed(() => IconChipToneLookup.getColors()[this.tone()]);
}
