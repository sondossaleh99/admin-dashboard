import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { LayoutService } from '../../core';
import { NavigationLookup } from '../../shared';
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
  layout = inject(LayoutService);

  groups = NavigationLookup.getGroups();
  collapsed = this.layout.sidebarCollapsed;

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
