import { Routes } from '@angular/router';

export const CALENDAR_ROUTES: Routes = [
  {
    path: '',
    title: 'Calendar · Admin Dashboard',
    loadComponent: () => import('./calendar-page').then((m) => m.CalendarPageComponent)
  }
];
