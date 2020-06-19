import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import {environment as env} from '../../../environments/environment';
import { handleError } from './error.handler';
import { catchError } from 'rxjs/internal/operators/catchError';
import { retry } from 'rxjs/internal/operators/retry';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getCountries(): Observable<any> {
    return this.http.get(`${env.serverBaseUrl}/countries`).pipe(
      retry(3),
      catchError(handleError)
    );
  }

  getTimeRanges(): Observable<any> {
    return this.http.get(`${env.serverBaseUrl}/timeRanges`).pipe(
      retry(3),
      catchError(handleError)
    );
  }

}
