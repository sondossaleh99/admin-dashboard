import { Routes } from '@angular/router';

export const EMPLOYEES_ROUTES: Routes = [
  {
    path: '',
    title: 'Employees · Admin Dashboard',
    loadComponent: () => import('./employees-page').then((m) => m.EmployeesPageComponent)
  }
];
