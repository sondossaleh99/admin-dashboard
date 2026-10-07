import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** A heading above a group of cards, with room for controls on the right. */
@Component({
  selector: 'app-section-header',
  template: `
    <div class="flex-1 min-w-0">
      <h2 class="section-header__title fs-xl fw-semibold">{{ title() }}</h2>
      @if (subtitle()) {
        <p class="mt-1 fs-sm text-secondary">{{ subtitle() }}</p>
      }
    </div>
    <div class="flex-shrink-0 d-flex align-items-center gap-2">
      <ng-content />
    </div>
  `,
  styleUrl: './section-header.scss',
  host: { class: 'd-flex align-items-start gap-4 flex-wrap' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionHeaderComponent {
  title = input.required<string>();
  subtitle = input<string>();
}
