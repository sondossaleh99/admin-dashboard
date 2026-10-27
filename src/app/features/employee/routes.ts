import { Routes } from '@angular/router';

export const EMPLOYEE_ROUTES: Routes = [
  {
    path: '',
    title: 'Employees · Deskly',
    loadComponent: () => import('./employee-page.component').then((m) => m.EmployeePageComponent)
  }
];
