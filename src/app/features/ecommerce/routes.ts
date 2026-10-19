import { Routes } from '@angular/router';

export const ECOMMERCE_ROUTES: Routes = [
  {
    path: '',
    title: 'Ecommerce · Admin Dashboard',
    loadComponent: () => import('./ecommerce-page').then((m) => m.EcommercePageComponent)
  }
];
