import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import { Observable, of, Subscription, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { SpinnerOverlayService } from '../services/spinner-overlay.service';

const TOKEN_HEADER_KEY = 'x-access-token';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router,
    private readonly spinnerOverlayService: SpinnerOverlayService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
 
  const spinnerSubscription: Subscription = this.spinnerOverlayService.spinner$.subscribe();
  
    let authReq = req;
    return next
      .handle(authReq)
      .pipe(finalize(() => spinnerSubscription.unsubscribe()),catchError((x) => this.handleAuthError(x)));
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (err.status === 401 || err.status === 403) {
      //navigate /delete cookies or whatever
      this.router.navigateByUrl(`/login`);
      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      return of(err.message); // or EMPTY may be appropriate here
    }
    return throwError(err);
  }
}
