import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * The card surface.
 *
 * Every card on the dashboard is one of these. Border, radius, shadow and
 * padding are defined here and nowhere else, so changing the card look is a
 * one-file change rather than a search across every feature component.
 */
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

  /** Drops body padding for cards whose content owns its own edges (tables, charts). */
  flush = input(false);
}
