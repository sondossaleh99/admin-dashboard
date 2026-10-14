import { IconChipTone } from '../enum/icon-chip-tone';
import { IconChipToneLookup } from './icon-chip-tone.lookup';

describe('IconChipToneLookup', () => {
  it('lists every tone once, in order', () => {
    expect(IconChipToneLookup.getAll().map((item) => item.id)).toEqual([
      IconChipTone.Primary,
      IconChipTone.Series2,
      IconChipTone.Series3,
      IconChipTone.Series4,
      IconChipTone.Success,
      IconChipTone.Danger
    ]);
  });

  it('labels every tone', () => {
    expect(IconChipToneLookup.getAll().map((item) => IconChipToneLookup.getLabel(item.id))).toEqual(
      ['primary', 'series-2', 'series-3', 'series-4', 'success', 'danger']
    );
  });

  it('gives every tone a colour token', () => {
    expect(IconChipToneLookup.getColors()[IconChipTone.Primary]).toBe('var(--color-primary)');
    expect(IconChipToneLookup.getColors()[IconChipTone.Series4]).toBe('var(--chart-series-4)');
  });
});
