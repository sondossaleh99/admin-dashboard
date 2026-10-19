import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-skeleton-block',
  templateUrl: './skeleton-block.html',
  styleUrl: './skeleton-block.scss',
  host: {
    '[style.width]': 'width()',
    '[style.height]': 'height()',
    '[style.border-radius]': 'radius()',
    role: 'presentation'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonBlockComponent {
  width = input('100%');
  height = input('16px');
  radius = input('var(--radius-sm)');
}
