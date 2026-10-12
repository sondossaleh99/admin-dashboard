import { TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';

import { EcommerceDashboard, IconChipTone, KpiFormat, Order, OrderStatus } from '../../shared';
import { EcommercePageComponent } from './ecommerce-page';
import { EcommerceService } from './service';

function order(id: string, status: OrderStatus): Order {
  return {
    id,
    customer: `Customer ${id}`,
    item: `Item ${id}`,
    placedAt: '2026-09-14',
    total: 100,
    status
  };
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const DASHBOARD: EcommerceDashboard = {
  earnings: { label: 'Earnings', total: 1000, delta: 5, budget: 800, expense: 200, trend: [1, 2] },
  kpis: [
    {
      id: 'c',
      label: 'Customers',
      value: 39354,
      format: KpiFormat.Number,
      delta: 4,
      icon: 'pi-users',
      tone: IconChipTone.Primary
    },
    {
      id: 's',
      label: 'Sales',
      value: 42339,
      format: KpiFormat.Currency,
      delta: 38,
      icon: 'pi-chart-bar',
      tone: IconChipTone.Series3
    },
    {
      id: 'r',
      label: 'Rate',
      value: 12.5,
      format: KpiFormat.Percent,
      delta: 1,
      icon: 'pi-percentage',
      tone: IconChipTone.Series2
    }
  ],
  revenue: MONTHS.map((period, i) => ({ period, budget: (i + 1) * 100, expense: (i + 1) * 10 })),
  salesBreakdown: [
    { label: 'Online', value: 300 },
    { label: 'Retail', value: 200 }
  ],
  weeklyStats: [],
  recentOrders: [
    order('1', OrderStatus.Paid),
    order('2', OrderStatus.Pending),
    order('3', OrderStatus.Refunded),
    order('4', OrderStatus.Cancelled),
    order('5', OrderStatus.Paid),
    order('6', OrderStatus.Paid)
  ]
};

async function setup(response: () => Observable<EcommerceDashboard> = () => of(DASHBOARD)) {
  const getDashboard = jasmine.createSpy('getDashboard').and.callFake(response);

  TestBed.configureTestingModule({
    imports: [EcommercePageComponent],
    providers: [{ provide: EcommerceService, useValue: { getDashboard } }]
  });
  TestBed.overrideComponent(EcommercePageComponent, { set: { template: '', imports: [] } });

  const fixture = TestBed.createComponent(EcommercePageComponent);
  fixture.detectChanges();
  await fixture.whenStable();

  return { page: fixture.componentInstance, fixture, getDashboard };
}

describe('EcommercePageComponent', () => {
  it('loads the dashboard', async () => {
    const { page } = await setup();

    expect(page.loading()).toBeFalse();
    expect(page.error()).toBeFalse();
    expect(page.data()).toEqual(DASHBOARD);
  });

  describe('when the request fails', () => {
    it('reports the error and loads nothing', async () => {
      const { page } = await setup(() => throwError(() => new Error('offline')));

      expect(page.error()).toBeTrue();
      expect(page.data()).toBeUndefined();
    });

    it('asks the service again on retry', async () => {
      const { page, fixture, getDashboard } = await setup(() =>
        throwError(() => new Error('offline'))
      );

      getDashboard.and.returnValue(of(DASHBOARD));
      page.retry();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(getDashboard).toHaveBeenCalledTimes(2);
      expect(page.error()).toBeFalse();
      expect(page.data()).toEqual(DASHBOARD);
    });
  });
});
