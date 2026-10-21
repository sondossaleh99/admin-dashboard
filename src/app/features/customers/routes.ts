import { Routes } from '@angular/router';

export const CUSTOMERS_ROUTES: Routes = [
  {
    path: '',
    title: 'Customers · Admin Dashboard',
    loadComponent: () => import('./customers-page').then((m) => m.CustomersPageComponent)
  }
];
