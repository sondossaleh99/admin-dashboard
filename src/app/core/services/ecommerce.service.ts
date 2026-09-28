import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

import { ECOMMERCE_DASHBOARD } from '../data/ecommerce.data';
import { EcommerceDashboard } from '../../features/ecommerce/ecommerce-dashboard';

/**
 * Supplies the ecommerce dashboard's data.
 *
 * Backed by fixtures for now, but deliberately shaped like the eventual HTTP
 * call: it returns an Observable and takes a real moment to resolve, so the
 * loading states downstream are exercised rather than theoretical. Swapping to
 * a real endpoint means replacing the body of this one method.
 */
@Injectable({ providedIn: 'root' })
export class EcommerceService {
  latencyMs = 300;

  getDashboard(): Observable<EcommerceDashboard> {
    return of(ECOMMERCE_DASHBOARD).pipe(delay(this.latencyMs));
  }
}
