/** The hero banner's headline figures. */
export interface Earnings {
  label: string;
  total: number;
  delta: number;
  budget: number;
  expense: number;
  /** Sparkline series behind the headline figure. */
  trend: number[];
}
