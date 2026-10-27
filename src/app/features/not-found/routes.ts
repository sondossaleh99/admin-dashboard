import { Routes } from '@angular/router';

export const NOT_FOUND_ROUTES: Routes = [
  {
    path: '',
    title: 'titles.notFound',
    loadComponent: () => import('./not-found').then((m) => m.NotFoundComponent)
  }
];
