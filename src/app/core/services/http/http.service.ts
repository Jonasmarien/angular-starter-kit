import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiMethod} from './const';
import {environment} from '@env';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) { }

  requestCall(endpoint: string, method: ApiMethod, data?: any): Observable<any> {
    let response: Observable<any>;
    switch (method) {
      case ApiMethod.GET:
        response = this.http.get(environment.apiUrl + endpoint);
        break;
      case ApiMethod.POST:
        response = this.http.post(environment.apiUrl + endpoint, data);
        break;
      case ApiMethod.PUT:
        response = this.http.put(environment.apiUrl + endpoint, data);
        break;
      case ApiMethod.DELETE:
        response = this.http.delete(environment.apiUrl + endpoint);
        break;
    }
    return response;
  }
}
