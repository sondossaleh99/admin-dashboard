import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { NavItem } from '../../../../core/models/nav.model';

/**
 * One sidebar row.
 *
 * Renders as a link when navigable and as a plain element when disabled, so a
 * dead destination is never focusable or announced as a link.
 */
@Component({
  selector: 'app-sidebar-nav-item',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-nav-item.html',
  styleUrl: './sidebar-nav-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarNavItem {
  readonly item = input.required<NavItem>();
  readonly collapsed = input(false);

  /** Emitted so the mobile drawer can close itself after a navigation. */
  readonly navigate = output<void>();
}
