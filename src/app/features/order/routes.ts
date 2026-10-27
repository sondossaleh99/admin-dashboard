import { Routes } from '@angular/router';

export const ORDER_ROUTES: Routes = [
  {
    path: '',
    title: 'Orders · Deskly',
    loadComponent: () => import('./order-page.component').then((m) => m.OrderPageComponent)
  }
];
