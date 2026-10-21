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
        loadChildren: () => import('./features/ecommerce').then((m) => m.ECOMMERCE_ROUTES)
      },
      {
        path: '**',
        loadChildren: () => import('./features/not-found').then((m) => m.NOT_FOUND_ROUTES)
      }
    ]
  }
];
