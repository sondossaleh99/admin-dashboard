import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.html',
  styleUrl: './section-header.scss',
  host: { class: 'd-flex align-items-start gap-4 flex-wrap' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionHeaderComponent {
  title = input.required<string>();
  subtitle = input<string>();
}
