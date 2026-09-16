import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Root component.
 *
 * Stage 1 ships the design-token foundation only, so this renders a smoke test
 * that proves the tokens resolve and Inter actually loaded. Stage 2 replaces it
 * with the routed app shell.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  protected readonly chartSlots = [1, 2, 3, 4, 5, 6];
}
