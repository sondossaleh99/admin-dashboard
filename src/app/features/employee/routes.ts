import { Routes } from '@angular/router';

export const EMPLOYEE_ROUTES: Routes = [
  {
    path: '',
    title: 'titles.employees',
    loadComponent: () => import('./employee-page.component').then((m) => m.EmployeePageComponent)
  }
];
