import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LayoutService } from '../../core';
import { SidebarComponent } from '../sidebar';
import { TopbarComponent } from '../topbar';

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
