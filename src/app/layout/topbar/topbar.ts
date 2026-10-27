import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Avatar } from 'primeng/avatar';
import { ButtonDirective, ButtonIcon, ButtonLabel } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { OverlayBadge } from 'primeng/overlaybadge';

import { CURRENT_USER, LanguageService } from '../../core';
import { LanguageLookup, TopbarAction, TopbarActionsLookup, UserMenuLookup } from '../../shared';
import { LayoutService } from '../service';

@Component({
  selector: 'app-topbar',
  imports: [Avatar, ButtonDirective, ButtonIcon, ButtonLabel, Menu, OverlayBadge],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopbarComponent {
  layout = inject(LayoutService);
  language = inject(LanguageService);

  otherLabel = computed(() => LanguageLookup.getLabel(this.language.otherLanguage()));
  otherCode = computed(() => LanguageLookup.getCode(this.language.otherLanguage()));

  user = CURRENT_USER;
  userMenuOpen = signal(false);

  actions: TopbarAction[] = TopbarActionsLookup.getActions();

  userMenu: MenuItem[] = UserMenuLookup.getItems();

  openDrawer(): void {
    this.layout.openDrawer();
  }
}
