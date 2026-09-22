import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { NAV_GROUPS } from '../../core/data/nav.data';
import { LayoutService } from '../../core/services/layout.service';
import { SidebarNavItem } from './components';

@Component({
  selector: 'app-sidebar',
  imports: [SidebarNavItem],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  host: { '[class.sidebar--collapsed]': 'collapsed()' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Sidebar {
  private readonly layout = inject(LayoutService);

  readonly groups = NAV_GROUPS;
  readonly collapsed = this.layout.sidebarCollapsed;

  toggle(): void {
    this.layout.toggleSidebar();
  }

  /** Mobile: tapping a destination should also dismiss the drawer. */
  onNavigate(): void {
    this.layout.closeDrawer();
  }

  closeDrawer(): void {
    this.layout.closeDrawer();
  }
}
