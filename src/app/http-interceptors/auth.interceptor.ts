import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../authentication/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const authToken = sessionStorage.getItem('accessToken');
    // const authToken = this.authService.getToken();
    const options = new HttpHeaders({
      'content-type': 'application/json',
      authorization: `Bearer ${authToken}`,
      withCredentials: "true"
    });
    let authReq: HttpRequest<any> = request.clone({
      headers: options,
      withCredentials: true,
    });
    // console.log('Modified request: ');

    // console.log(authReq);

    // return next.handle(authReq).pipe(
    //   tap((res) => {
    //     console.log('got an event', res);
    //     if (res instanceof HttpResponse) {
    //       console.log('event of type response', res);
    //     }
    //   })
    // );

    return next.handle(authReq);
  }
}
