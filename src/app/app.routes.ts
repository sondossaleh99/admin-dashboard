import { Routes } from '@angular/router';
import { MainLayout } from './layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'ecommerce' },
      {
        path: 'ecommerce',
        title: 'Ecommerce · Admin Dashboard',
        loadComponent: () => import('./features/ecommerce').then((m) => m.EcommercePage)
      },
      {
        path: '**',
        title: 'Not found · Admin Dashboard',
        loadComponent: () => import('./features/not-found').then((m) => m.NotFound)
      }
    ]
  }
];
