import { TestBed } from '@angular/core/testing';

import { DeltaBadgeComponent } from './delta-badge';

function setup(value: number) {
  TestBed.configureTestingModule({ imports: [DeltaBadgeComponent] });
  TestBed.overrideComponent(DeltaBadgeComponent, { set: { template: '' } });

  const fixture = TestBed.createComponent(DeltaBadgeComponent);
  fixture.componentRef.setInput('value', value);
  fixture.detectChanges();

  return { fixture, badge: fixture.componentInstance, host: fixture.nativeElement as HTMLElement };
}

describe('DeltaBadgeComponent', () => {
  it('reads a positive change as up', () => {
    const { badge, host } = setup(12.4);

    expect(badge.isUp()).toBeTrue();
    expect(badge.magnitude()).toBe(12.4);
    expect(host.classList).toContain('delta-badge--up');
    expect(host.classList).not.toContain('delta-badge--down');
    expect(host.getAttribute('aria-label')).toBe('Up 12.4 percent');
  });

  it('reads a negative change as down and drops the sign from the magnitude', () => {
    const { badge, host } = setup(-12);

    expect(badge.isUp()).toBeFalse();
    expect(badge.magnitude()).toBe(12);
    expect(host.classList).toContain('delta-badge--down');
    expect(host.classList).not.toContain('delta-badge--up');
    expect(host.getAttribute('aria-label')).toBe('Down 12 percent');
  });

  it('counts no change as up', () => {
    const { badge, host } = setup(0);

    expect(badge.isUp()).toBeTrue();
    expect(host.getAttribute('aria-label')).toBe('Up 0 percent');
  });

  it('follows a new value', () => {
    const { fixture, badge, host } = setup(5);

    fixture.componentRef.setInput('value', -3.5);
    fixture.detectChanges();

    expect(badge.isUp()).toBeFalse();
    expect(host.classList).toContain('delta-badge--down');
    expect(host.getAttribute('aria-label')).toBe('Down 3.5 percent');
  });
});
