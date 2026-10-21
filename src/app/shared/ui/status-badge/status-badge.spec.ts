import { TestBed } from '@angular/core/testing';

import { ActivityTone } from '../../enum/activity-tone';
import { StatusBadgeComponent } from './status-badge';

function setup(tone: ActivityTone) {
  TestBed.configureTestingModule({ imports: [StatusBadgeComponent] });

  const fixture = TestBed.createComponent(StatusBadgeComponent);
  fixture.componentRef.setInput('label', 'Paid');
  fixture.componentRef.setInput('tone', tone);
  fixture.detectChanges();

  return { fixture, badge: fixture.nativeElement.querySelector('.status') as HTMLElement };
}

describe('StatusBadgeComponent', () => {
  it('shows its label', () => {
    const { badge } = setup(ActivityTone.Success);

    expect(badge.textContent?.trim()).toBe('Paid');
  });

  it('turns its tone into the matching modifier class, by name', () => {
    expect(setup(ActivityTone.Success).badge.classList).toContain('status--success');
    TestBed.resetTestingModule();
    expect(setup(ActivityTone.Danger).badge.classList).toContain('status--danger');
  });

  it('follows a new tone', () => {
    const { fixture, badge } = setup(ActivityTone.Warning);

    fixture.componentRef.setInput('tone', ActivityTone.Info);
    fixture.detectChanges();

    expect(badge.classList).toContain('status--info');
    expect(badge.classList).not.toContain('status--warning');
  });
});
