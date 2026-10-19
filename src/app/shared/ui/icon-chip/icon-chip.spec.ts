import { TestBed } from '@angular/core/testing';

import { IconChipSize } from '../../enum/icon-chip-size';
import { IconChipTone } from '../../enum/icon-chip-tone';
import { IconChipComponent } from './icon-chip';

function setup() {
  TestBed.configureTestingModule({ imports: [IconChipComponent] });
  TestBed.overrideComponent(IconChipComponent, { set: { template: '' } });

  const fixture = TestBed.createComponent(IconChipComponent);
  fixture.componentRef.setInput('icon', 'pi-user');
  fixture.detectChanges();

  return { fixture, chip: fixture.componentInstance };
}

describe('IconChipComponent', () => {
  it('is a medium primary chip by default', () => {
    const { chip } = setup();

    expect(chip.hostClasses()).toContain('icon-chip--md');
    expect(chip.color()).toBe('var(--color-primary)');
  });

  it('turns its size into the matching CSS modifier', () => {
    const { fixture, chip } = setup();

    fixture.componentRef.setInput('size', IconChipSize.Small);
    expect(chip.hostClasses()).toContain('icon-chip--sm');

    fixture.componentRef.setInput('size', IconChipSize.Large);
    expect(chip.hostClasses()).toContain('icon-chip--lg');
  });

  it('colours itself by its tone', () => {
    const { fixture, chip } = setup();

    fixture.componentRef.setInput('tone', IconChipTone.Series3);

    expect(chip.color()).toBe('var(--chart-series-3)');
  });
});
