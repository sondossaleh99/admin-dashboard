import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <div class="not-found">
      <p class="not-found__code">404</p>
      <h1>Page not found</h1>
      <p class="not-found__hint">That destination does not exist yet.</p>
      <a routerLink="/ecommerce" class="not-found__link">Back to the dashboard</a>
    </div>
  `,
  styleUrl: './not-found.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {}
