import { TestBed } from '@angular/core/testing';
import { TranslateService, provideTranslateService } from '@ngx-translate/core';

import en from '../../../../../../public/i18n/en.json';

import { SalesBreakdownCardComponent } from './sales-breakdown-card';

function setup() {
  TestBed.configureTestingModule({
    imports: [SalesBreakdownCardComponent],
    providers: [provideTranslateService({ fallbackLang: 'en' })]
  });
  TestBed.overrideComponent(SalesBreakdownCardComponent, { set: { template: '', imports: [] } });
  TestBed.inject(TranslateService).setTranslation('en', en);

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

  it('translates the slice labels for the chart', () => {
    const { card, fixture } = setup();

    fixture.componentRef.setInput('slices', [{ label: 'ecommerce.channels.retail', value: 80 }]);

    expect(card.chartSlices()).toEqual([{ label: 'Retail', value: 80 }]);
  });

  it('totals an empty breakdown as zero', () => {
    const { card, fixture } = setup();

    fixture.componentRef.setInput('slices', []);

    expect(card.total()).toBe(0);
  });
});
