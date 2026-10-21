import { Routes } from '@angular/router';

export const NOT_FOUND_ROUTES: Routes = [
  {
    path: '',
    title: 'Not found · Admin Dashboard',
    loadComponent: () => import('./not-found').then((m) => m.NotFoundComponent)
  }
];
