import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Avatar } from 'primeng/avatar';
import { ButtonDirective, ButtonIcon } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { OverlayBadge } from 'primeng/overlaybadge';

import { CURRENT_USER } from '../../core';
import { TopbarAction, TopbarActionsLookup, UserMenuLookup } from '../../shared';
import { LayoutService } from '../service';

@Component({
  selector: 'app-topbar',
  imports: [Avatar, ButtonDirective, ButtonIcon, Menu, OverlayBadge],
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
