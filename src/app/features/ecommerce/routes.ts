import { Routes } from '@angular/router';

export const ECOMMERCE_ROUTES: Routes = [
  {
    path: '',
    title: 'titles.ecommerce',
    loadComponent: () => import('./ecommerce-page').then((m) => m.EcommercePageComponent)
  }
];
