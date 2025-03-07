import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
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

    console.log(request);
    if (request.url.includes('register')) {
      return next.handle(request);
    }

    let authReq: HttpRequest<any> = request.clone({
      headers: options,
      withCredentials: true,
    });
    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse, caught) => {
        if (
          err &&
          (err.status > 400 || err.status < 499) &&
          err.error?.success === false &&
          err.error?.msg === AUTH_STATE.UNAUTHORISED
        ) {
          this.authService.setAccessTokenCookie('');
          this.router.navigate(['/login'], {
            relativeTo: this.activatedRoute,
          });
        }

        return throwError(() => console.error(err));
      })
    );
  }
}
