import { IconChipSize } from '../enum/icon-chip-size';
import { IconChipSizeLookup } from './icon-chip-size.lookup';

describe('IconChipSizeLookup', () => {
  it('lists every size once, in order', () => {
    expect(IconChipSizeLookup.getAll().map((item) => item.id)).toEqual([
      IconChipSize.Small,
      IconChipSize.Medium,
      IconChipSize.Large
    ]);
  });

  it('labels every size with its CSS name', () => {
    expect(IconChipSizeLookup.getLabel(IconChipSize.Small)).toBe('sm');
    expect(IconChipSizeLookup.getLabel(IconChipSize.Medium)).toBe('md');
    expect(IconChipSizeLookup.getLabel(IconChipSize.Large)).toBe('lg');
  });
});
