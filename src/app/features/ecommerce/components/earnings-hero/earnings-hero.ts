import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import {
  ChartSparklineComponent,
  DeltaBadgeComponent,
  Earnings,
  SHARED_IMPORTS
} from '../../../../shared';

@Component({
  selector: 'app-earnings-hero',
  imports: [...SHARED_IMPORTS, ChartSparklineComponent, DeltaBadgeComponent],
  templateUrl: './earnings-hero.html',
  styleUrl: './earnings-hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EarningsHeroComponent {
  earnings = input.required<Earnings>();
}
