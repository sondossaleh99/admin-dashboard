import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { EmptyStateComponent, SHARED_IMPORTS, SectionHeaderComponent } from '../../shared';
import { EcommerceService } from './service';
import {
  ActivityCardComponent,
  DashboardSkeletonComponent,
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
    EmptyStateComponent,
    DashboardSkeletonComponent,
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
