import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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

  navigationGroups = NAVIGATION_GROUPS;
  menuTokens = {
    root: { background: 'transparent', borderColor: 'transparent' },
    list: { gap: '0.25rem' },
    item: { padding: '0.75rem 1rem', gap: '0.75rem' },
    submenuLabel: { padding: '1rem 1rem 0.5rem' }
  };
  collapsed = this.layout.sidebarCollapsed;

  toggle(): void {
    this.layout.toggleSidebar();
  }

  closeDrawer(): void {
    this.layout.closeDrawer();
  }
}
