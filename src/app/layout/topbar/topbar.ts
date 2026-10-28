import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Avatar } from 'primeng/avatar';
import { ButtonDirective, ButtonIcon } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { OverlayBadge } from 'primeng/overlaybadge';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { CURRENT_USER, translateMenuItems } from '../../core';
import { TopbarAction, TopbarActionsLookup, UserMenuLookup } from '../../shared';
import { LanguageSwitcherComponent } from '../language-switcher';
import { LayoutService } from '../service';

@Component({
  selector: 'app-topbar',
  imports: [
    Avatar,
    ButtonDirective,
    ButtonIcon,
    LanguageSwitcherComponent,
    Menu,
    OverlayBadge,
    TranslatePipe
  ],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopbarComponent {
  layout = inject(LayoutService);
  translate = inject(TranslateService);

  user = CURRENT_USER;
  userMenuOpen = signal(false);

  actions: TopbarAction[] = TopbarActionsLookup.getActions();

  userMenu = computed<MenuItem[]>(() =>
    translateMenuItems(UserMenuLookup.getItems(), this.translate)
  );

  openDrawer(): void {
    this.layout.openDrawer();
  }
}
