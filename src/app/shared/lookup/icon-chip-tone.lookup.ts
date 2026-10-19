import { IconChipTone } from '../enum/icon-chip-tone';

export class IconChipToneLookup {
  static getAll(): { id: IconChipTone; label: string }[] {
    return [
      { id: IconChipTone.Primary, label: 'primary' },
      { id: IconChipTone.Series2, label: 'series-2' },
      { id: IconChipTone.Series3, label: 'series-3' },
      { id: IconChipTone.Series4, label: 'series-4' },
      { id: IconChipTone.Success, label: 'success' },
      { id: IconChipTone.Danger, label: 'danger' }
    ];
  }

  static getLabel(id: IconChipTone): string {
    return IconChipToneLookup.getAll().find((item) => item.id === id)?.label ?? '';
  }

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
