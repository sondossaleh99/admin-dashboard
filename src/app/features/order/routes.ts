import { Routes } from '@angular/router';

export const ORDER_ROUTES: Routes = [
  {
    path: '',
    title: 'titles.orders',
    loadComponent: () => import('./order-page.component').then((m) => m.OrderPageComponent)
  }
];
