import { IconChipTone } from '../enum/icon-chip-tone';

/** CSS colour token for each icon-chip tone. */
export class IconChipToneLookup {
  static getColors(): Record<IconChipTone, string> {
    return {
      [IconChipTone.Primary]: 'var(--color-primary)',
      [IconChipTone.Series2]: 'var(--chart-series-2)',
      [IconChipTone.Series3]: 'var(--chart-series-3)',
      [IconChipTone.Series4]: 'var(--chart-series-4)',
      [IconChipTone.Success]: 'var(--color-success)',
      [IconChipTone.Danger]: 'var(--color-danger)'
    };
  }
}
