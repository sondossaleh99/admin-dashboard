import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';

import { CURRENT_USER } from '../../core';
import { TopbarAction, TopbarActionsLookup, UserMenuLookup } from '../../shared';
import { LayoutService } from '../service';

@Component({
  selector: 'app-topbar',
  imports: [Menu],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopbarComponent {
  layout = inject(LayoutService);

  user = CURRENT_USER;
  userMenuOpen = signal(false);

  actions: TopbarAction[] = TopbarActionsLookup.getActions();

  userMenu: MenuItem[] = UserMenuLookup.getItems();

  openDrawer(): void {
    this.layout.openDrawer();
  }
}
