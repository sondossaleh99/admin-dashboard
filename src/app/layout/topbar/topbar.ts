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
  private readonly layout = inject(LayoutService);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly userButton = viewChild<ElementRef<HTMLButtonElement>>('userButton');

  readonly user = CURRENT_USER;
  readonly search = signal('');
  readonly userMenuOpen = signal(false);

  readonly actions: TopbarAction[] = TopbarActionsLookup.getActions();

  readonly userMenu: UserMenuItem[] = UserMenuLookup.getItems();

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
