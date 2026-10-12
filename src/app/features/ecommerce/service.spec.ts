import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable, Subject, of, throwError } from 'rxjs';

import { EcommerceDashboard } from '../../shared';
import { ECOMMERCE_DASHBOARD } from './mock-data';
import { EcommerceService } from './service';

async function setup(
  response: () => Observable<EcommerceDashboard> = () => of(ECOMMERCE_DASHBOARD)
) {
  TestBed.configureTestingModule({ providers: [EcommerceService] });

  const service = TestBed.inject(EcommerceService);
  const getDashboard = spyOn(service, 'getDashboard').and.callFake(response);
  await TestBed.inject(ApplicationRef).whenStable();

  return { service, getDashboard };
}

describe('EcommerceService', () => {
  it('loads the dashboard', async () => {
    const { service } = await setup();

    expect(service.loading()).toBeFalse();
    expect(service.error()).toBeFalse();
    expect(service.data()).toEqual(ECOMMERCE_DASHBOARD);
  });

  it('reports loading until the request resolves', async () => {
    const response = new Subject<EcommerceDashboard>();
    TestBed.configureTestingModule({ providers: [EcommerceService] });
    const service = TestBed.inject(EcommerceService);
    spyOn(service, 'getDashboard').and.returnValue(response);

    TestBed.tick();
    expect(service.loading()).toBeTrue();
    expect(service.data()).toBeUndefined();

    response.next(ECOMMERCE_DASHBOARD);
    response.complete();
    await TestBed.inject(ApplicationRef).whenStable();

    expect(service.loading()).toBeFalse();
    expect(service.data()).toEqual(ECOMMERCE_DASHBOARD);
  });

  describe('when the request fails', () => {
    it('reports the error and loads nothing', async () => {
      const { service } = await setup(() => throwError(() => new Error('offline')));

      expect(service.error()).toBeTrue();
      expect(service.data()).toBeUndefined();
    });

    it('asks again on retry', async () => {
      const { service, getDashboard } = await setup(() => throwError(() => new Error('offline')));

      getDashboard.and.returnValue(of(ECOMMERCE_DASHBOARD));
      service.retry();
      await TestBed.inject(ApplicationRef).whenStable();

      expect(getDashboard).toHaveBeenCalledTimes(2);
      expect(service.error()).toBeFalse();
      expect(service.data()).toEqual(ECOMMERCE_DASHBOARD);
    });
  });
});
