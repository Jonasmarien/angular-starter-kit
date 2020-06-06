import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ApiMethod} from './const';
import {environment} from '@env';
import {Observable, throwError} from 'rxjs';
import {ErrorService} from '@core/services/error/error.service';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) { }

  requestCall(endpoint: string, method: ApiMethod, data?: any): Observable<any> {
    let response: Observable<any>;
    switch (method) {
      case ApiMethod.GET:
        response = this.http.get(environment.apiUrl + endpoint)
          .pipe(catchError((err) => this.handleError(err)));
        break;
      case ApiMethod.POST:
        response = this.http.post(environment.apiUrl + endpoint, data)
          .pipe(catchError((err) => this.handleError(err)));
        break;
      case ApiMethod.PUT:
        response = this.http.put(environment.apiUrl + endpoint, data)
          .pipe(catchError((err) => this.handleError(err)));
        break;
      case ApiMethod.DELETE:
        response = this.http.delete(environment.apiUrl + endpoint)
          .pipe(catchError((err) => this.handleError(err)));
        break;
    }
    return response;
  }

  private handleError(error: HttpErrorResponse) {
    this.errorService.log(error);
    return throwError(error);
  }
}
