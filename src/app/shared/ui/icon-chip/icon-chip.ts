import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { IconChipSize } from '../../enum/icon-chip-size';
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
export class IconChipComponent {
  icon = input.required<string>();
  tone = input<IconChipTone>(IconChipTone.Primary);
  size = input<IconChipSize>(IconChipSize.Medium);

  hostClasses = computed(() => `icon-chip icon-chip--${this.size()}`);

  color = computed(() => IconChipToneLookup.getColors()[this.tone()]);
}
