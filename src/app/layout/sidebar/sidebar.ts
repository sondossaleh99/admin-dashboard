import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonDirective, ButtonIcon } from 'primeng/button';
import { Menu } from 'primeng/menu';

import { NAVIGATION_GROUPS } from '../../core';
import { LayoutService } from '../service';

@Component({
  selector: 'app-sidebar',
  imports: [ButtonDirective, ButtonIcon, Menu],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  host: { '[class.sidebar--collapsed]': 'collapsed()' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  layout = inject(LayoutService);

  navigationGroups = NAVIGATION_GROUPS;
  collapsed = this.layout.sidebarCollapsed;

  toggle(): void {
    this.layout.toggleSidebar();
  }

  closeDrawer(): void {
    this.layout.closeDrawer();
  }
}
