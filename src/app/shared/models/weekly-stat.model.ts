/** A row in the weekly stats list, with its own sparkline series. */
export interface WeeklyStat {
  id: string;
  label: string;
  caption: string;
  value: number;
  delta: number;
  icon: string;
  trend: number[];
}
