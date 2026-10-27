import { Routes } from '@angular/router';

export const ECOMMERCE_ROUTES: Routes = [
  {
    path: '',
    title: 'Ecommerce · Deskly',
    loadComponent: () => import('./ecommerce-page').then((m) => m.EcommercePageComponent)
  }
];
