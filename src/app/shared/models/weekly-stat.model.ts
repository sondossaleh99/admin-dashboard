export interface WeeklyStat {
  id: string;
  label: string;
  caption: string;
  value: number;
  delta: number;
  icon: string;
  trend: number[];
}
