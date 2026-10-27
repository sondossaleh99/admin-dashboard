import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem, PassThroughContext } from 'primeng/api';
import { ButtonDirective, ButtonIcon } from 'primeng/button';
import { Menu, MenuPassThrough } from 'primeng/menu';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { filter, map } from 'rxjs';

import { LanguageService, NAVIGATION_GROUPS, translateMenuItems } from '../../core';
import { LayoutService } from '../service';

type MenuItemLinkContext = PassThroughContext & { context: { item: MenuItem } };

@Component({
  selector: 'app-sidebar',
  imports: [ButtonDirective, ButtonIcon, Menu, TranslatePipe],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  host: { '[class.sidebar--collapsed]': 'collapsed()' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  layout = inject(LayoutService);
  router = inject(Router);
  language = inject(LanguageService);
  translate = inject(TranslateService);

  navigationGroups = computed(() => {
    this.language.language();
    return translateMenuItems(NAVIGATION_GROUPS, this.translate);
  });
  collapsed = this.layout.sidebarCollapsed;

  collapseIcon = computed(() =>
    this.collapsed() === (this.language.direction() === 'rtl')
      ? 'pi-angle-double-left'
      : 'pi-angle-double-right'
  );

  url = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.router.url)
    ),
    { initialValue: this.router.url }
  );

  menuPt = computed<MenuPassThrough>(() => {
    this.url();
    return {
      itemLink: (options) => ({
        'aria-current': this.isActive((options as MenuItemLinkContext).context.item) ? 'page' : null
      })
    };
  });

  isActive(item: MenuItem): boolean {
    return (
      typeof item.routerLink === 'string' &&
      this.router.isActive(item.routerLink, {
        paths: 'subset',
        queryParams: 'subset',
        fragment: 'ignored',
        matrixParams: 'ignored'
      })
    );
  }

  toggle(): void {
    this.layout.toggleSidebar();
  }

  closeDrawer(): void {
    this.layout.closeDrawer();
  }
}
