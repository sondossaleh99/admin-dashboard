import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LayoutService } from '../../core/services/layout.service';
import { Sidebar } from '../sidebar';
import { Topbar } from '../topbar';

/**
 * The app shell: sidebar, topbar and the routed content region.
 *
 * Chrome state lives in LayoutService rather than here so the topbar's toggle
 * and the sidebar's own controls act on one source of truth.
 */
@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Sidebar, Topbar],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayout {
  private readonly layout = inject(LayoutService);

  protected readonly collapsed = this.layout.sidebarCollapsed;
  protected readonly drawerOpen = this.layout.drawerOpen;

  protected closeDrawer(): void {
    this.layout.closeDrawer();
  }
}
