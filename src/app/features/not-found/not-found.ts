import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <div class="not-found text-center">
      <p class="fs-3xl fw-bold text-primary">404</p>
      <h1 class="fs-xl my-2">Page not found</h1>
      <p class="text-secondary mb-6">That destination does not exist yet.</p>
      <a routerLink="/ecommerce" class="not-found__link d-inline-block py-3 px-5 fw-semibold">
        Back to the dashboard
      </a>
    </div>
  `,
  styleUrl: './not-found.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {}
