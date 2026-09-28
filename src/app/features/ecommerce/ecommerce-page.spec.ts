import { TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';

import {
  EcommerceDashboard,
  IconChipTone,
  KpiFormat,
  Order,
  OrderStatus,
  RevenueRange
} from '../../shared';
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

// Small, round figures so every expected value below can be checked by eye.
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
  // Month n has budget n * 100 and expense n * 10.
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
  // The page's own logic is under test here, not its children, so the template
  // (and the charts it would mount) is left out.
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

  describe('revenue range', () => {
    it('shows all twelve months by default', async () => {
      const { page } = await setup();

      expect(page.range()).toBe(RevenueRange.TwelveMonths);
      expect(page.revenuePeriods()).toEqual(MONTHS);
    });

    it('keeps only the last six months for the six-month range', async () => {
      const { page } = await setup();

      page.setRange(RevenueRange.SixMonths);

      expect(page.revenuePeriods()).toEqual(['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
      expect(page.revenueSeries()).toEqual([
        { name: 'Budget', data: [700, 800, 900, 1000, 1100, 1200] },
        { name: 'Expense', data: [70, 80, 90, 100, 110, 120] }
      ]);
    });

    it('recomputes the totals and margin for the selected range', async () => {
      const { page } = await setup();

      // 1 + 2 + … + 12 = 78
      expect(page.revenueTotals()).toEqual({ budget: 7800, expense: 780, margin: 7020 });

      // 7 + 8 + … + 12 = 57
      page.setRange(RevenueRange.SixMonths);
      expect(page.revenueTotals()).toEqual({ budget: 5700, expense: 570, margin: 5130 });
    });

    it('never mutates the source series', async () => {
      const { page } = await setup();

      page.setRange(RevenueRange.SixMonths);

      expect(page.data()?.revenue.length).toBe(12);
    });
  });

  it('formats each KPI by its own format', async () => {
    const { page } = await setup();

    expect(page.kpis().map((kpi) => kpi.display)).toEqual(['39,354', '$42,339', '12.5%']);
  });

  it('totals the sales breakdown', async () => {
    const { page } = await setup();

    expect(page.salesTotal()).toBe(500);
  });

  describe('activity', () => {
    it('shows the five most recent orders', async () => {
      const { page } = await setup();

      expect(page.activity().map((event) => event.id)).toEqual(['1', '2', '3', '4', '5']);
    });

    it('describes each order by its status', async () => {
      const { page } = await setup();

      expect(page.activity().map((event) => event.title)).toEqual([
        'Order #1 was paid',
        'Order #2 is awaiting payment',
        'Order #3 was refunded',
        'Order #4 was cancelled',
        'Order #5 was paid'
      ]);
      expect(page.activity()[0].detail).toBe('Customer 1 · Item 1');
      expect(page.activity()[0].timestamp).toBe('2026-09-14');
    });
  });

  describe('when the request fails', () => {
    it('reports the error and loads nothing', async () => {
      const { page } = await setup(() => throwError(() => new Error('offline')));

      expect(page.error()).toBeTrue();
      expect(page.kpis()).toEqual([]);
      expect(page.activity()).toEqual([]);
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
