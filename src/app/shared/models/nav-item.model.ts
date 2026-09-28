/** A single sidebar destination. */
export interface NavItem {
  label: string;
  /** PrimeIcons class, e.g. `pi-shopping-cart`. */
  icon: string;
  route: string;
  /** Count shown as a pill on the right of the row. */
  badge?: number;
  /**
   * Rendered but not navigable. Used for destinations the sidebar shows for
   * visual completeness but that this build does not implement yet.
   */
  disabled?: boolean;
}
