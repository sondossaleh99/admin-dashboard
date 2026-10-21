import { Routes } from '@angular/router';

export const ORDERS_ROUTES: Routes = [
  {
    path: '',
    title: 'Orders · Admin Dashboard',
    loadComponent: () => import('./orders-page').then((m) => m.OrdersPageComponent)
  }
];
