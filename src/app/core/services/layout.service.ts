import { Injectable, signal } from '@angular/core';

const COLLAPSED_KEY = 'admin-dashboard.sidebar-collapsed';

/**
 * Owns app-shell chrome state.
 *
 * Two independent things, deliberately not merged: `sidebarCollapsed` is the
 * desktop icon-rail preference and persists; `drawerOpen` is the mobile
 * off-canvas panel and is always closed on load.
 */
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

/**
 * Storage access is wrapped because it throws in private windows and when site
 * data is blocked. A failed read is not an error worth surfacing — the sidebar
 * just starts expanded.
 */
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
  } catch {
    // Preference is best-effort; losing it must not break the toggle.
  }
}
