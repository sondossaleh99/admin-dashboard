import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';

import { NAVIGATION_GROUPS } from '../../core';
import { LayoutService } from '../service';

@Component({
  selector: 'app-sidebar',
  imports: [Menu],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  host: { '[class.sidebar--collapsed]': 'collapsed()' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  layout = inject(LayoutService);

  navigationItems: MenuItem[] = NAVIGATION_GROUPS.map((group) => ({
    ...group,
    items: group.items?.map((item) => ({
      ...item,
      title: item.label,
      badge: item.disabled ? 'Soon' : undefined,
      badgeStyleClass: 'p-badge-secondary',
      command: () => this.closeDrawer()
    }))
  }));
  collapsed = this.layout.sidebarCollapsed;

  toggle(): void {
    this.layout.toggleSidebar();
  }

  closeDrawer(): void {
    this.layout.closeDrawer();
  }
}
