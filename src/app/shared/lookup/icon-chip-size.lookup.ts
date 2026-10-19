import { IconChipSize } from '../enum/icon-chip-size';

export class IconChipSizeLookup {
  static getAll(): { id: IconChipSize; label: string }[] {
    return [
      { id: IconChipSize.Small, label: 'sm' },
      { id: IconChipSize.Medium, label: 'md' },
      { id: IconChipSize.Large, label: 'lg' }
    ];
  }

  static getLabel(id: IconChipSize): string {
    return IconChipSizeLookup.getAll().find((item) => item.id === id)?.label ?? '';
  }
}
