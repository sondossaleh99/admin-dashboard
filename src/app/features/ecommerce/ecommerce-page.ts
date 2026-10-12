import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import {
  EmptyStateComponent,
  SHARED_IMPORTS,
  SectionHeaderComponent,
  SkeletonBlockComponent
} from '../../shared';
import { EcommerceService } from './service';
import {
  ActivityCardComponent,
  EarningsHeroComponent,
  KpiRowComponent,
  RecentOrdersTableComponent,
  RevenueUpdatesCardComponent,
  SalesBreakdownCardComponent,
  WeeklyStatsCardComponent
} from './components';

@Component({
  selector: 'app-ecommerce-page',
  imports: [
    ...SHARED_IMPORTS,
    SectionHeaderComponent,
    SkeletonBlockComponent,
    EmptyStateComponent,
    EarningsHeroComponent,
    KpiRowComponent,
    RevenueUpdatesCardComponent,
    SalesBreakdownCardComponent,
    WeeklyStatsCardComponent,
    RecentOrdersTableComponent,
    ActivityCardComponent
  ],
  providers: [EcommerceService],
  templateUrl: './ecommerce-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EcommercePageComponent {
  service = inject(EcommerceService);
}
