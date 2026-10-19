import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { NAVIGATION_GROUPS } from '../../core';
import { LayoutService } from '../service';
import { SidebarNavItemComponent } from './components';

@Component({
  selector: 'app-sidebar',
  imports: [SidebarNavItemComponent],
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

  onNavigate(): void {
    this.layout.closeDrawer();
  }

  closeDrawer(): void {
    this.layout.closeDrawer();
  }
}
