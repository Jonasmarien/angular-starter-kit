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

  requestCall<T>(endpoint: string, method: ApiMethod, data?: any): Observable<T> {
    let response: Observable<any>;
    switch (method) {
      case ApiMethod.GET:
        response = this.http.get<T>(environment.baseDomain + endpoint)
          .pipe(catchError((err) => this.handleError(err)));
        break;
      case ApiMethod.POST:
        response = this.http.post<T>(environment.baseDomain + endpoint, data)
          .pipe(catchError((err) => this.handleError(err)));
        break;
      case ApiMethod.PUT:
        response = this.http.put<T>(environment.baseDomain + endpoint, data)
          .pipe(catchError((err) => this.handleError(err)));
        break;
      case ApiMethod.DELETE:
        response = this.http.delete<T>(environment.baseDomain + endpoint)
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
