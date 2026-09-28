import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** A heading above a group of cards, with room for controls on the right. */
@Component({
  selector: 'app-section-header',
  template: `
    <div class="section-header__titles">
      <h2 class="section-header__title">{{ title() }}</h2>
      @if (subtitle()) {
        <p class="section-header__subtitle">{{ subtitle() }}</p>
      }
    </div>
    <div class="section-header__actions">
      <ng-content />
    </div>
  `,
  styleUrl: './section-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionHeaderComponent {
  title = input.required<string>();
  subtitle = input<string>();
}
