import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild
} from '@angular/core';

import { CURRENT_USER, LayoutService } from '../../core';
import { TopbarAction, TopbarActionsLookup, UserMenuItem, UserMenuLookup } from '../../shared';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
  host: {
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown.escape)': 'onEscape()'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopbarComponent {
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
  onDocumentClick(event: MouseEvent): void {
    if (!this.userMenuOpen()) {
      return;
    }
    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.userMenuOpen.set(false);
    }
  }

  /** Escape closes and returns focus to the trigger, so keyboard users are not stranded. */
  onEscape(): void {
    if (this.userMenuOpen()) {
      this.userMenuOpen.set(false);
      this.userButton()?.nativeElement.focus();
    }
  }
}
