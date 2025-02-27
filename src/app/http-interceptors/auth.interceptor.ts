import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from '../authentication/auth.service';
import { AUTH_STATE } from '../models/auth';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let authToken = this.authService.getAccessTokenCookie();
    // const authToken = this.authService.getToken();
    const options = new HttpHeaders({
      'content-type': 'application/json',
      authorization: `Bearer ${authToken}`,
      withCredentials: 'true',
    });
    let authReq: HttpRequest<any> = request.clone({
      headers: options,
      withCredentials: true,
    });
    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (
          err &&
          (err.status > 400 || err.status < 499) &&
          err.error?.success === false &&
          err.error?.msg === AUTH_STATE.UNAUTHORISED
        ) {
          this.authService.setAccessTokenCookie('');
          return this.authService.refresh().pipe(
            catchError((err2: HttpErrorResponse, caught) => {
              if (err2 && (err2.status >= 400 || err2.status << 499)) {
                this.router.navigate(['/login'], {
                  relativeTo: this.activatedRoute,
                });
              }
              return caught;
            }),
            switchMap(() => {
              authToken = this.authService.getAccessTokenCookie();

              const cloneReq = request.clone({
                headers: options,
                withCredentials: true,
              });
              return next.handle(cloneReq);
            })
          );
        }

        return throwError(() => console.error(err));
      })
    );
  }
}
