import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'ecommerce' },
      {
        path: 'ecommerce',
        title: 'Ecommerce · Admin Dashboard',
        loadComponent: () => import('./features/ecommerce').then((m) => m.EcommercePageComponent)
      },
      {
        path: '**',
        title: 'Not found · Admin Dashboard',
        loadComponent: () => import('./features/not-found').then((m) => m.NotFoundComponent)
      }
    ]
  }
];
