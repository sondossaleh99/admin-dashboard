import { Routes } from '@angular/router';

export const ORDER_ROUTES: Routes = [
  {
    path: '',
    title: 'Orders · Admin Dashboard',
    loadComponent: () => import('./order-page.component').then((m) => m.OrderPageComponent)
  }
];
