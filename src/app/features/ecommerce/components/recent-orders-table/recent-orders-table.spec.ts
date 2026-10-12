import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { Order, OrderStatus } from '../../../../shared';
import { RecentOrdersTableComponent } from './recent-orders-table';

const SEARCH_DEBOUNCE_MS = 250;

function order(id: string, customer: string): Order {
  return {
    id,
    customer,
    item: `Item ${id}`,
    placedAt: '2026-09-14',
    total: 100,
    status: OrderStatus.Paid
  };
}

function render() {
  TestBed.configureTestingModule({ imports: [RecentOrdersTableComponent] });

  const fixture = TestBed.createComponent(RecentOrdersTableComponent);
  fixture.componentRef.setInput('orders', [order('1', 'Amelia'), order('2', 'Noah')]);
  fixture.detectChanges();

  return fixture;
}

function setup() {
  const table = render().componentInstance;
  const filterGlobal = spyOn(table.table(), 'filterGlobal');

  return { table, filterGlobal };
}

describe('RecentOrdersTableComponent', () => {
  it('counts the orders in its subtitle', () => {
    const { table } = setup();

    expect(table.subtitle()).toBe('2 orders');
  });

  it('filters the table only after the search settles', fakeAsync(() => {
    const { table, filterGlobal } = setup();

    table.onSearchInput('Amelia');
    tick(SEARCH_DEBOUNCE_MS - 1);
    expect(filterGlobal).not.toHaveBeenCalled();
    expect(table.searchTerm()).toBe('');

    tick(1);
    expect(filterGlobal).toHaveBeenCalledOnceWith('Amelia', 'contains');
    expect(table.searchTerm()).toBe('Amelia');
  }));

  it('applies only the last value typed within the debounce window', fakeAsync(() => {
    const { table, filterGlobal } = setup();

    table.onSearchInput('A');
    tick(100);
    table.onSearchInput('Am');
    tick(SEARCH_DEBOUNCE_MS);

    expect(filterGlobal).toHaveBeenCalledOnceWith('Am', 'contains');
  }));

  it('shows only the matching rows once the search settles', fakeAsync(() => {
    const fixture = render();
    const rows = () => fixture.nativeElement.querySelectorAll('tbody tr').length;
    expect(rows()).toBe(2);

    fixture.componentInstance.onSearchInput('Noah');
    tick(SEARCH_DEBOUNCE_MS);
    fixture.detectChanges();

    expect(rows()).toBe(1);
    expect(fixture.nativeElement.querySelector('tbody').textContent).toContain('Noah');
  }));
});
