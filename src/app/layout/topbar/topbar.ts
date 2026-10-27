import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Avatar } from 'primeng/avatar';
import { ButtonDirective, ButtonIcon, ButtonLabel } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { OverlayBadge } from 'primeng/overlaybadge';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

import { CURRENT_USER, LanguageService, translateMenuItems } from '../../core';
import { LanguageLookup, TopbarAction, TopbarActionsLookup, UserMenuLookup } from '../../shared';
import { LayoutService } from '../service';

@Component({
  selector: 'app-topbar',
  imports: [Avatar, ButtonDirective, ButtonIcon, ButtonLabel, Menu, OverlayBadge, TranslatePipe],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopbarComponent {
  layout = inject(LayoutService);
  language = inject(LanguageService);
  translate = inject(TranslateService);

  otherLabel = computed(() => LanguageLookup.getLabel(this.language.otherLanguage()));
  otherCode = computed(() => LanguageLookup.getCodes()[this.language.otherLanguage()]);

  user = CURRENT_USER;
  userMenuOpen = signal(false);

  actions: TopbarAction[] = TopbarActionsLookup.getActions();

  userMenu = computed<MenuItem[]>(() => {
    this.language.language();
    return translateMenuItems(UserMenuLookup.getItems(), this.translate);
  });

  openDrawer(): void {
    this.layout.openDrawer();
  }
}
