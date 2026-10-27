import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { SHARED_IMPORTS } from '../../imports/shared-imports';

@Component({
  selector: 'app-delta-badge',
  imports: [...SHARED_IMPORTS],
  templateUrl: './delta-badge.html',
  styleUrl: './delta-badge.scss',
  host: {
    dir: 'ltr',
    class: 'd-inline-flex align-items-center gap-1 fs-xs fw-semibold',
    '[class.delta-badge--up]': 'isUp()',
    '[class.delta-badge--down]': '!isUp()',
    '[attr.aria-label]': 'label()'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeltaBadgeComponent {
  translate = inject(TranslateService);

  value = input.required<number>();

  isUp = computed(() => this.value() >= 0);
  magnitude = computed(() => Math.abs(this.value()));
  label = computed(() =>
    String(
      this.translate.instant(this.isUp() ? 'common.deltaUp' : 'common.deltaDown', {
        value: this.magnitude()
      })
    )
  );
}
