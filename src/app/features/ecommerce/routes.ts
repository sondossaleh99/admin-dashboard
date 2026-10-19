import { Routes } from '@angular/router';

import { EcommercePageComponent } from './ecommerce-page';

export const ECOMMERCE_ROUTES: Routes = [
  {
    path: '',
    title: 'Ecommerce · Admin Dashboard',
    component: EcommercePageComponent
  }
];
