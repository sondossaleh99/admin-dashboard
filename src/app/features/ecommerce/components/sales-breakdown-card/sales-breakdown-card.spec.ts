import { TestBed } from '@angular/core/testing';

import { SalesBreakdownCardComponent } from './sales-breakdown-card';

function setup() {
  TestBed.configureTestingModule({ imports: [SalesBreakdownCardComponent] });
  TestBed.overrideComponent(SalesBreakdownCardComponent, { set: { template: '', imports: [] } });

  const fixture = TestBed.createComponent(SalesBreakdownCardComponent);
  fixture.componentRef.setInput('slices', [
    { label: 'Online', value: 300 },
    { label: 'Retail', value: 200 }
  ]);
  fixture.detectChanges();

  return { card: fixture.componentInstance, fixture };
}

describe('SalesBreakdownCardComponent', () => {
  it('totals the slices', () => {
    const { card } = setup();

    expect(card.total()).toBe(500);
  });

  it('recomputes the total when the slices change', () => {
    const { card, fixture } = setup();

    fixture.componentRef.setInput('slices', [{ label: 'Online', value: 120 }]);

    expect(card.total()).toBe(120);
  });

  it('totals an empty breakdown as zero', () => {
    const { card, fixture } = setup();

    fixture.componentRef.setInput('slices', []);

    expect(card.total()).toBe(0);
  });
});
