import { Injectable, computed } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Observable, delay, of } from 'rxjs';

import { ECOMMERCE_DASHBOARD } from './mock-data';
import { EcommerceDashboard } from '../../shared';

@Injectable()
export class EcommerceService {
  latencyMs = 300;

  dashboard = rxResource({
    stream: () => this.getDashboard()
  });

  data = computed(() => (this.dashboard.hasValue() ? this.dashboard.value() : undefined));
  loading = computed(() => this.dashboard.status() === 'loading');
  error = computed(() => this.dashboard.status() === 'error');

  getDashboard(): Observable<EcommerceDashboard> {
    return of(ECOMMERCE_DASHBOARD).pipe(delay(this.latencyMs));
  }

  retry(): void {
    this.dashboard.reload();
  }
}
