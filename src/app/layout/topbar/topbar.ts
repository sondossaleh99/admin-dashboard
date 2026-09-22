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

interface TopbarAction {
  readonly icon: string;
  readonly label: string;
  readonly badge?: number;
}

interface UserMenuItem {
  readonly label: string;
  readonly icon: string;
}

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

  readonly actions: readonly TopbarAction[] = [
    { icon: 'pi-envelope', label: 'Messages', badge: 3 },
    { icon: 'pi-bell', label: 'Notifications', badge: 5 },
    { icon: 'pi-cog', label: 'Settings' }
  ];

  readonly userMenu: readonly UserMenuItem[] = [
    { label: 'Profile', icon: 'pi-user' },
    { label: 'Account settings', icon: 'pi-cog' },
    { label: 'Sign out', icon: 'pi-sign-out' }
  ];

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
