import { Injectable, signal } from '@angular/core';

const COLLAPSED_KEY = 'admin-dashboard.sidebar-collapsed';

@Injectable({ providedIn: 'root' })
export class LayoutService {
  private collapsed = signal(readCollapsed());
  private drawer = signal(false);

  sidebarCollapsed = this.collapsed.asReadonly();
  drawerOpen = this.drawer.asReadonly();

  toggleSidebar(): void {
    this.collapsed.update((value) => {
      const next = !value;
      writeCollapsed(next);
      return next;
    });
  }

  openDrawer(): void {
    this.drawer.set(true);
  }

  closeDrawer(): void {
    this.drawer.set(false);
  }

  toggleDrawer(): void {
    this.drawer.update((open) => !open);
  }
}

function readCollapsed(): boolean {
  try {
    return localStorage.getItem(COLLAPSED_KEY) === 'true';
  } catch {
    return false;
  }
}

function writeCollapsed(value: boolean): void {
  try {
    localStorage.setItem(COLLAPSED_KEY, String(value));
  } catch {}
}
