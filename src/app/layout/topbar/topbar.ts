import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  signal,
  viewChild
} from '@angular/core';

import { CURRENT_USER } from '../../core/data/user.data';
import { LayoutService } from '../../core/services/layout.service';
import { TopbarAction, TopbarActionsLookup, UserMenuItem, UserMenuLookup } from '../../shared';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Topbar {
  layout = inject(LayoutService);
  host = inject(ElementRef<HTMLElement>);
  userButton = viewChild<ElementRef<HTMLButtonElement>>('userButton');

  user = CURRENT_USER;
  search = signal('');
  userMenuOpen = signal(false);

  actions: TopbarAction[] = TopbarActionsLookup.getActions();

  userMenu: UserMenuItem[] = UserMenuLookup.getItems();

  openDrawer(): void {
    this.layout.openDrawer();
  }

  toggleUserMenu(): void {
    this.userMenuOpen.update((open) => !open);
  }

  /** Clicking anywhere outside the topbar dismisses the menu. */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.userMenuOpen()) {
      return;
    }
    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.userMenuOpen.set(false);
    }
  }

  /** Escape closes and returns focus to the trigger, so keyboard users are not stranded. */
  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.userMenuOpen()) {
      this.userMenuOpen.set(false);
      this.userButton()?.nativeElement.focus();
    }
  }
}
