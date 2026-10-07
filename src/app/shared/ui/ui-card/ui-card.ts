import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-ui-card',
  templateUrl: './ui-card.html',
  styleUrl: './ui-card.scss',
  host: { '[class.ui-card--flush]': 'flush()' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiCardComponent {
  title = input<string>();
  subtitle = input<string>();

  flush = input(false);
}
