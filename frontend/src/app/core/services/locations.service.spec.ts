/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { LocationsService } from './locations.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {environment as env} from '../../../environments/environment';

describe('Service: Locations', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [LocationsService]
    });
  });

  it('should perform a get locationsInRange', inject([LocationsService, HttpTestingController],
    (service: LocationsService, httpMock: HttpTestingController) => {
    const startDate = new Date('2020-06-01');
    const endDate = new Date('2020-06-10');
    const dummyLocations = [
      {
        latitude: 46,
        longitude: 73,
        app_id: 'IOS_MATE',
        downloaded_at: {$date: 1591366035000},
        country: 'KZ',
        id: '5ee5001ea4c30b0e9fc76e31'
      },
      {
        latitude: 25,
        longitude: -4,
        app_id: 'ANDROID_ALERT',
        downloaded_at: {$date: 1591401287000},
        country: 'DZ',
        id: '5ee5f701f2889d8b2cec3a7d'
      }
    ];

    service.getLocationsInRange(startDate, endDate).subscribe(locations => {
      expect(locations.length).toBe(2);
      expect(locations).toEqual(dummyLocations);
    });

    const req = httpMock.expectOne(`${env.serverBaseUrl}/locationsInRange?startDate=2020-06-01T00:00:00.000Z&endDate=2020-06-10T00:00:00.000Z`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyLocations);
  }));
});
