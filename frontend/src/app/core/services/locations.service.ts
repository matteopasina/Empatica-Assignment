import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment as env} from '../../../environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';
import { retry } from 'rxjs/internal/operators/retry';
import { handleError } from './error.handler';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor(private http: HttpClient) { }

  getLocationsInRange(startDate: Date, endDate: Date): Observable<any> {
    return this.http.get(`${env.serverBaseUrl}/locationsInRange`,{
      params: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      }}).pipe(
        retry(3),
        catchError(handleError)
      );
  }
}
