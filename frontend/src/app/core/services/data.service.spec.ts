/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { DataService } from './data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {environment as env} from '../../../environments/environment';

describe('Service: Data', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [DataService]
    });
  });

  it('should perform a get getTimeRanges', inject([DataService, HttpTestingController],
    (service: DataService, httpMock: HttpTestingController) => {

    const dummyTimeRanges = [
      { name: 'Night',
        range: [0, 5]},
      { name: 'Morning',
        range: [6, 11]},
      { name: 'Afternoon',
        range: [12, 17]},
      { name: 'Evening',
        range: [18, 23]}
    ];

    service.getTimeRanges().subscribe(timeRanges => {
      expect(timeRanges.length).toBe(4);
      expect(timeRanges).toEqual(dummyTimeRanges);
    });

    const req = httpMock.expectOne(`${env.serverBaseUrl}/timeRanges`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTimeRanges);
  }));

  it('should perform a get getCountries', inject([DataService, HttpTestingController],
    (service: DataService, httpMock: HttpTestingController) => {

    const dummyCountries = [
      { name: 'Italy',
        code: 'it'},
      { name: 'France',
        code: 'fr'},
      { name: 'Spain',
        code: 'es'},
      { name: 'Germany',
        code: 'de'},
      { name: 'United Kingdom',
        code: 'uk'},
      { name: 'USA',
        code: 'usa'},
      { name: 'China',
        code: 'ch'}
      ];

    service.getCountries().subscribe(countries => {
      expect(countries.length).toBe(7);
      expect(countries).toEqual(dummyCountries);
    });

    const req = httpMock.expectOne(`${env.serverBaseUrl}/countries`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyCountries);
  }));
});
