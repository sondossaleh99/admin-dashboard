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
        path: 'orders',
        loadChildren: () => import('./features/order').then((m) => m.ORDER_ROUTES)
      },
      {
        path: 'employees',
        loadChildren: () => import('./features/employee').then((m) => m.EMPLOYEE_ROUTES)
      },
      {
        path: '**',
        loadChildren: () => import('./features/not-found').then((m) => m.NOT_FOUND_ROUTES)
      }
    ]
  }
];
