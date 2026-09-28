import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LayoutService } from '../../core';
import { SidebarComponent } from '../sidebar';
import { TopbarComponent } from '../topbar';

/**
 * The app shell: sidebar, topbar and the routed content region.
 *
 * Chrome state lives in LayoutService rather than here so the topbar's toggle
 * and the sidebar's own controls act on one source of truth.
 */
@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, SidebarComponent, TopbarComponent],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent {
  layout = inject(LayoutService);

  collapsed = this.layout.sidebarCollapsed;
  drawerOpen = this.layout.drawerOpen;

  closeDrawer(): void {
    this.layout.closeDrawer();
  }
}
