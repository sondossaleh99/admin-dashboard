import { NavItem } from './nav-item';

/** A captioned run of nav items. */
export interface NavGroup {
  label: string;
  items: NavItem[];
}
