import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Table } from 'primeng/table';

import { Order, OrderStatus } from '../../../../shared';
import { RecentOrdersTableComponent } from './recent-orders-table';

function order(id: string, customer: string, status = OrderStatus.Paid): Order {
  return {
    id,
    customer,
    item: `Item ${id}`,
    placedAt: '2026-09-14',
    total: 100,
    status
  };
}

function render() {
  TestBed.configureTestingModule({ imports: [RecentOrdersTableComponent] });

  const fixture = TestBed.createComponent(RecentOrdersTableComponent);
  fixture.componentRef.setInput('orders', [
    order('1', 'Amelia'),
    order('2', 'Noah', OrderStatus.Pending)
  ]);
  fixture.detectChanges();

  const element: HTMLElement = fixture.nativeElement;
  const delay = fixture.componentInstance.searchDelay;
  const table = (): Table => fixture.debugElement.query(By.directive(Table)).componentInstance;
  const rows = () => element.querySelectorAll('tbody tr');

  const type = (value: string) => {
    const input = element.querySelector('input[type="search"]') as HTMLInputElement;
    input.value = value;
    input.dispatchEvent(new Event('input'));
  };

  const settle = (ms: number) => {
    tick(ms);
    fixture.detectChanges();
  };

  return { fixture, element, delay, table, rows, type, settle };
}

describe('RecentOrdersTableComponent', () => {
  it('counts the orders in its subtitle', () => {
    const { fixture } = render();

    expect(fixture.componentInstance.subtitle()).toBe('2 orders');
  });

  it('hands the typed value to the table as a global contains filter', () => {
    const { table, type } = render();
    const filterGlobal = spyOn(table(), 'filterGlobal');

    type('Amelia');

    expect(filterGlobal).toHaveBeenCalledOnceWith('Amelia', 'contains');
  });

  it('delays filtering by the search delay', () => {
    const { delay, table } = render();

    expect(table().filterDelay).toBe(delay);
  });

  it('filters the rows only after the search settles', fakeAsync(() => {
    const { delay, rows, type, settle } = render();
    expect(rows().length).toBe(2);

    type('Noah');
    settle(delay - 1);
    expect(rows().length).toBe(2);

    settle(1);
    expect(rows().length).toBe(1);
    expect(rows()[0].textContent).toContain('Noah');
  }));

  it('applies only the last value typed within the delay', fakeAsync(() => {
    const { delay, rows, type, settle } = render();

    type('Amelia');
    settle(100);
    type('Noah');
    settle(delay - 1);
    expect(rows().length).toBe(2);

    settle(1);
    expect(rows().length).toBe(1);
    expect(rows()[0].textContent).toContain('Noah');
  }));

  it('shows the empty message when nothing matches', fakeAsync(() => {
    const { delay, element, type, settle } = render();

    type('Zara');
    settle(delay);

    expect(element.querySelector('tbody')?.textContent).toContain('No orders found.');
  }));

  it('finds orders by their status label', fakeAsync(() => {
    const { delay, rows, type, settle } = render();

    type('pend');
    settle(delay);

    expect(rows().length).toBe(1);
    expect(rows()[0].textContent).toContain('Noah');
  }));

  it('labels and colours each status by its tone', () => {
    const { element } = render();

    const badges = [...element.querySelectorAll<HTMLElement>('.status')];
    expect(badges.map((badge) => badge.textContent?.trim())).toEqual(['Paid', 'Pending']);
    expect(badges[0].classList).toContain('status--success');
    expect(badges[1].classList).toContain('status--warning');
  });
});
