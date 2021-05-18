import {HTTP_INTERCEPTORS, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent} from '@angular/common/http';

import { TokenStorageService } from '../_service/token-storage.service';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

const HEADER_TOKEN_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private token: TokenStorageService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    const token = this.token.getToken();
    if (token != null){
      return next.handle(req.clone({
        headers: req.headers.set(HEADER_TOKEN_KEY, 'Bearer_' + token)
      })).pipe(
        catchError((err: HttpErrorResponse) => {
          retry(2);
          this.token.signOut();
          window.location.replace('/#/login');
          return throwError(err);
        })
      );
    }
    return next.handle(req);
  }
}

export const authInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];
