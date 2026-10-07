import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { NavItem } from '../../../../shared';

@Component({
  selector: 'app-sidebar-nav-item',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar-nav-item.html',
  styleUrl: './sidebar-nav-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarNavItemComponent {
  item = input.required<NavItem>();
  collapsed = input(false);

  navigate = output<void>();
}
