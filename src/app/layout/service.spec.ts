import { TestBed } from '@angular/core/testing';

import { LayoutService } from './service';

const COLLAPSED_KEY = 'admin-dashboard.sidebar-collapsed';

describe('LayoutService', () => {
  beforeEach(() => {
    localStorage.removeItem(COLLAPSED_KEY);
    TestBed.resetTestingModule();
  });

  afterEach(() => localStorage.removeItem(COLLAPSED_KEY));

  it('starts expanded with the drawer closed', () => {
    const layout = TestBed.inject(LayoutService);

    expect(layout.sidebarCollapsed()).toBeFalse();
    expect(layout.drawerOpen()).toBeFalse();
  });

  it('toggles the sidebar and persists the preference', () => {
    const layout = TestBed.inject(LayoutService);

    layout.toggleSidebar();
    expect(layout.sidebarCollapsed()).toBeTrue();
    expect(localStorage.getItem(COLLAPSED_KEY)).toBe('true');

    layout.toggleSidebar();
    expect(layout.sidebarCollapsed()).toBeFalse();
    expect(localStorage.getItem(COLLAPSED_KEY)).toBe('false');
  });

  it('restores a collapsed sidebar on the next load', () => {
    localStorage.setItem(COLLAPSED_KEY, 'true');

    expect(TestBed.inject(LayoutService).sidebarCollapsed()).toBeTrue();
  });

  it('opens and closes the drawer', () => {
    const layout = TestBed.inject(LayoutService);

    layout.openDrawer();
    expect(layout.drawerOpen()).toBeTrue();

    layout.closeDrawer();
    expect(layout.drawerOpen()).toBeFalse();
  });

  it('still works when storage is unavailable', () => {
    spyOn(Storage.prototype, 'getItem').and.throwError('blocked');
    spyOn(Storage.prototype, 'setItem').and.throwError('blocked');

    const layout = TestBed.inject(LayoutService);
    expect(layout.sidebarCollapsed()).toBeFalse();

    layout.toggleSidebar();
    expect(layout.sidebarCollapsed()).toBeTrue();
  });
});
