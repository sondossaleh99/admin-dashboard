import { Injectable, signal } from '@angular/core';

const COLLAPSED_KEY = 'admin-dashboard.sidebar-collapsed';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private get isCollapsed(): boolean {
    try {
      return localStorage.getItem(COLLAPSED_KEY) === 'true';
    } catch {
      return false;
    }
  }

  private set isCollapsed(value: boolean) {
    try {
      localStorage.setItem(COLLAPSED_KEY, String(value));
    } catch {}
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
