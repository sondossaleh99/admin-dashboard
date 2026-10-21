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
        loadChildren: () => import('./features/orders').then((m) => m.ORDERS_ROUTES)
      },
      {
        path: 'employees',
        loadChildren: () => import('./features/employees').then((m) => m.EMPLOYEES_ROUTES)
      },
      {
        path: 'customers',
        loadChildren: () => import('./features/customers').then((m) => m.CUSTOMERS_ROUTES)
      },
      {
        path: 'calendar',
        loadChildren: () => import('./features/calendar').then((m) => m.CALENDAR_ROUTES)
      },
      {
        path: '**',
        loadChildren: () => import('./features/not-found').then((m) => m.NOT_FOUND_ROUTES)
      }
    ]
  }
];
