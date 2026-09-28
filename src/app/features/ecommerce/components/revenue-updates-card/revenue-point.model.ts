/** One point on the revenue chart's shared category axis. */
export interface RevenuePoint {
  /** Short month label, e.g. `Jan`. */
  period: string;
  budget: number;
  expense: number;
}
