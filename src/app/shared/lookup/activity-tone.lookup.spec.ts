import { ActivityTone } from '../enum/activity-tone';
import { ActivityToneLookup } from './activity-tone.lookup';

describe('ActivityToneLookup', () => {
  it('lists every tone once, in order', () => {
    expect(ActivityToneLookup.getAll().map((item) => item.id)).toEqual([
      ActivityTone.Success,
      ActivityTone.Warning,
      ActivityTone.Info,
      ActivityTone.Danger
    ]);
  });

  it('labels every tone with its CSS name', () => {
    expect(ActivityToneLookup.getLabel(ActivityTone.Success)).toBe('success');
    expect(ActivityToneLookup.getLabel(ActivityTone.Warning)).toBe('warning');
    expect(ActivityToneLookup.getLabel(ActivityTone.Info)).toBe('info');
    expect(ActivityToneLookup.getLabel(ActivityTone.Danger)).toBe('danger');
  });
});
