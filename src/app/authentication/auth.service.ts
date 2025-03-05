import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  effect,
  EffectRef,
  Injectable,
  OnDestroy,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  AccountData,
  AuthSessionData,
  UserAccount,
  UserCredentials,
} from '../models/auth';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private isAuthenticated: WritableSignal<boolean> = signal(false);
  private TOKEN_KEY: string | null = null;
  private _destiantionUrl: string | null = null;
  private authEffect: EffectRef;
  public $isAuthorized: Signal<boolean> = this.isAuthenticated.asReadonly();
  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true,
  };

  constructor(private http: HttpClient) {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      this.TOKEN_KEY = token;
      this.isAuthenticated.set(true);
    } else {
      this.TOKEN_KEY = null;
    }
    this.authEffect = effect(() => {
      console.log(`The isAuthenticated is: ${this.isAuthenticated()}`);
    });
  }

  ngOnDestroy(): void {
    this.authEffect.destroy();
  }

  refresh(id?: string): Observable<any> {
    return this.http.post('/api/v1/refresh', {}, this.options).pipe(
      tap((authPayload) => {
        console.log('tap on refresh setting session');
        try {
          const authData = authPayload as AuthSessionData;
          if (authData.accessToken) {
            console.log('setting session');
            this.setUserSessionState(authData);
          } else {
            console.log('Authentication failure');
          }
        } catch (error) {
          console.log('Error on reciving and converting auth session data');
        }
      })
    );
  }

  logout(): Observable<any> {
    this.setUserSessionState({ accessToken: null });
    return this.http
      .post('http://127.0.0.1:5000/api/v1/logout', {}, this.options)
      .pipe(tap((response) => {}));
  }

  login(email: string, password: string): Observable<any> {
    const body: UserCredentials = {
      email,
      password,
    };

    const customOptions = this.options;
    customOptions.withCredentials = false;

    return this.http
      .post('http://127.0.0.1:5000/api/v1/login', body, customOptions)
      .pipe(
        tap((authPayload: any) => {
          try {
            const authData = authPayload as AuthSessionData;

            if (authData.accessToken) {
              this.setUserSessionState(authData);
            } else {
              console.log('Authentication failure');
            }
          } catch (error) {
            console.log('Error on reciving and converting auth session data');
          }
        })
      );
  }

  getUserRights(id: string) {
    return this.http.get(
      'http://127.0.0.1:5000/api/v1/user-roles',
      this.options
    );
  }


  private setSessionCookie(state: string) {
    sessionStorage.setItem('accessToken', state);
  }

  private setUserSessionState(authPayload: AuthSessionData) {
    if (authPayload?.accessToken) {
      this.setSessionCookie(authPayload.accessToken);
      this.setToken(authPayload.accessToken);
      this.isAuthenticated.set(true);
    } else {
      this.setSessionCookie('');
      this.setToken('');
      this.isAuthenticated.set(false);
    }
  }
  

  public getDestiantionUrl(): string | null {
    return this._destiantionUrl;
  }
  public setDestiantionUrl(value: string) {
    this._destiantionUrl = value;
  }

  public setToken(token: string): void {
    this.TOKEN_KEY = token;
  }

  public getToken(): string | null {
    return this.TOKEN_KEY;
  }

  public removeToken(): void {
    this.TOKEN_KEY = null;
  }

  public setAccessTokenCookie(value: string) {
    sessionStorage.setItem('accessToken', value);
  }

  public getAccessTokenCookie() {
    return sessionStorage.getItem('accessToken');
  }
}
