import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * A loading placeholder.
 *
 * Callers size it to the content it stands in for — a skeleton shaped like the
 * real card avoids the layout jump a generic spinner causes on load.
 */
@Component({
  selector: 'app-skeleton-block',
  template: '',
  styleUrl: './skeleton-block.scss',
  host: {
    '[style.width]': 'width()',
    '[style.height]': 'height()',
    '[style.border-radius]': 'radius()',
    role: 'presentation'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonBlock {
  width = input('100%');
  height = input('16px');
  radius = input('var(--radius-sm)');
}
