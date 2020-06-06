import { Injectable } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  // Implement your own logging method
  log(error: Error): void {
    switch (error.constructor) {
      case HttpErrorResponse:
        console.error((error as HttpErrorResponse).message);
        break;
      default:
        console.error(error.message);
        break;
    }
  }
}
