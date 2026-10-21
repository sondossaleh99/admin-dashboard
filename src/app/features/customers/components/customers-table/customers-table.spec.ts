import { TestBed } from '@angular/core/testing';

import { ActivityTone, Customer, CustomerStatus } from '../../../../shared';
import { CustomersTableComponent } from './customers-table';

function customer(id: number, status = CustomerStatus.Active): Customer {
  return {
    id,
    name: `Customer ${id}`,
    email: `c${id}@mail.com`,
    project: `Project ${id}`,
    status,
    weeks: 4,
    budget: 1000,
    location: 'India'
  };
}

function setup(customers: Customer[]) {
  TestBed.configureTestingModule({ imports: [CustomersTableComponent] });
  TestBed.overrideComponent(CustomersTableComponent, { set: { template: '', imports: [] } });

  const fixture = TestBed.createComponent(CustomersTableComponent);
  fixture.componentRef.setInput('customers', customers);
  fixture.detectChanges();

  const removed: number[][] = [];
  fixture.componentInstance.remove.subscribe((ids) => removed.push(ids));

  return { table: fixture.componentInstance, removed };
}

describe('CustomersTableComponent', () => {
  it('labels and tones every status', () => {
    const { table } = setup([
      customer(1, CustomerStatus.Active),
      customer(2, CustomerStatus.Pending),
      customer(3, CustomerStatus.Completed),
      customer(4, CustomerStatus.Cancelled)
    ]);

    expect(table.tableValue().map((row) => [row.statusLabel, row.statusTone])).toEqual([
      ['Active', ActivityTone.Success],
      ['Pending', ActivityTone.Warning],
      ['Completed', ActivityTone.Info],
      ['Cancelled', ActivityTone.Danger]
    ]);
  });

  it('shows the selection count on the delete action', () => {
    const { table } = setup([customer(1), customer(2), customer(3)]);

    expect(table.deleteLabel()).toBe('Delete');

    table.selected.set([customer(1), customer(3)]);

    expect(table.deleteLabel()).toBe('Delete (2)');
  });

  it('emits the selected ids on delete and clears the selection', () => {
    const { table, removed } = setup([customer(1), customer(2), customer(3)]);

    table.selected.set([customer(1), customer(3)]);
    table.deleteSelected();

    expect(removed).toEqual([[1, 3]]);
    expect(table.selected()).toEqual([]);
    expect(table.deleteLabel()).toBe('Delete');
  });

  it('counts the customers in its subtitle', () => {
    const { table } = setup([customer(1), customer(2)]);

    expect(table.subtitle()).toBe('2 customers');
  });
});
