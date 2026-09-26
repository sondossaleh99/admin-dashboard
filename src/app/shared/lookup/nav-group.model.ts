import { NavItem } from './nav-item.model';

/** A captioned run of nav items. */
export interface NavGroup {
  label: string;
  items: NavItem[];
}
