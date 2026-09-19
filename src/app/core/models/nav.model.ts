/** A single sidebar destination. */
export interface NavItem {
  readonly label: string;
  /** PrimeIcons class, e.g. `pi-shopping-cart`. */
  readonly icon: string;
  readonly route: string;
  /** Count shown as a pill on the right of the row. */
  readonly badge?: number;
  /**
   * Rendered but not navigable. Used for destinations the sidebar shows for
   * visual completeness but that this build does not implement yet.
   */
  readonly disabled?: boolean;
}

/** A captioned run of nav items. */
export interface NavGroup {
  readonly label: string;
  readonly items: readonly NavItem[];
}
