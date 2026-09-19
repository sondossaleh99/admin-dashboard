import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Route target for `/ecommerce`.
 *
 * Stage 2 ships the shell only. The page's own sections land in Stage 6, which
 * is gated on the visual audit of the reference dashboard.
 */
@Component({
  selector: 'app-ecommerce-page',
  templateUrl: './ecommerce-page.html',
  styleUrl: './ecommerce-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EcommercePage {}
