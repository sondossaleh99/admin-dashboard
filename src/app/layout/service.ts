import { Injectable, signal } from '@angular/core';

const COLLAPSED_KEY = 'admin-dashboard.sidebar-collapsed';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private get isCollapsed(): boolean {
    return localStorage.getItem(COLLAPSED_KEY) === 'true';
  }

  private set isCollapsed(value: boolean) {
    localStorage.setItem(COLLAPSED_KEY, String(value));
  }

  private collapsed = signal(this.isCollapsed);
  private drawer = signal(false);

  sidebarCollapsed = this.collapsed.asReadonly();
  drawerOpen = this.drawer.asReadonly();

  toggleSidebar(): void {
    this.collapsed.update((value) => {
      const next = !value;
      this.isCollapsed = next;
      return next;
    });
  }

  openDrawer(): void {
    this.drawer.set(true);
  }

  closeDrawer(): void {
    this.drawer.set(false);
  }
}
