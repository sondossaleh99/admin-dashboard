import { Injectable, signal } from '@angular/core';

const COLLAPSED_KEY = 'admin-dashboard.sidebar-collapsed';

const storage = {
  get(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch {}
  }
};

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private collapsed = signal(storage.get(COLLAPSED_KEY) === 'true');
  private drawer = signal(false);

  sidebarCollapsed = this.collapsed.asReadonly();
  drawerOpen = this.drawer.asReadonly();

  toggleSidebar(): void {
    this.collapsed.update((collapsed) => !collapsed);
    storage.set(COLLAPSED_KEY, String(this.collapsed()));
  }

  openDrawer(): void {
    this.drawer.set(true);
  }

  closeDrawer(): void {
    this.drawer.set(false);
  }
}
