import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

import { ECOMMERCE_DASHBOARD } from './mock-data';
import { EcommerceDashboard } from '../../shared';

@Injectable({ providedIn: 'root' })
export class EcommerceService {
  latencyMs = 300;

  getDashboard(): Observable<EcommerceDashboard> {
    return of(ECOMMERCE_DASHBOARD).pipe(delay(this.latencyMs));
  }
}
