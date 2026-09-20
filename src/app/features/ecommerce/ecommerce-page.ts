import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { DeltaBadge } from '../../shared/ui/delta-badge/delta-badge';
import { EmptyState } from '../../shared/ui/empty-state/empty-state';
import { IconChip } from '../../shared/ui/icon-chip/icon-chip';
import { SectionHeader } from '../../shared/ui/section-header/section-header';
import { SkeletonBlock } from '../../shared/ui/skeleton-block/skeleton-block';
import { StatCard } from '../../shared/ui/stat-card/stat-card';
import { UiCard } from '../../shared/ui/ui-card/ui-card';

/**
 * Route target for `/ecommerce`.
 *
 * Stage 3 renders the UI primitives so they can be reviewed in place. The real
 * page sections land in Stage 6, which is gated on the visual audit.
 */
@Component({
  selector: 'app-ecommerce-page',
  imports: [UiCard, StatCard, IconChip, DeltaBadge, SectionHeader, SkeletonBlock, EmptyState],
  templateUrl: './ecommerce-page.html',
  styleUrl: './ecommerce-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EcommercePage {
  protected readonly retried = signal(false);

  protected readonly stats = [
    { label: 'Customers', value: '39,354', icon: 'pi-users', tone: 'primary', delta: 4 },
    { label: 'Products', value: '4,396', icon: 'pi-box', tone: 'series-2', delta: 23 },
    { label: 'Sales', value: '423,39', icon: 'pi-chart-bar', tone: 'series-3', delta: 38 },
    { label: 'Refunds', value: '39,354', icon: 'pi-replay', tone: 'series-4', delta: -12 }
  ] as const;

  protected readonly deltas = [38, 4.5, -0.8, -12] as const;
  protected readonly chips = [
    { icon: 'pi-users', tone: 'primary' },
    { icon: 'pi-box', tone: 'series-2' },
    { icon: 'pi-chart-bar', tone: 'series-3' },
    { icon: 'pi-replay', tone: 'series-4' },
    { icon: 'pi-check', tone: 'success' },
    { icon: 'pi-times', tone: 'danger' }
  ] as const;
}
