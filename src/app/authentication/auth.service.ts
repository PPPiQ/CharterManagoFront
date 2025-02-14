import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { effect, EffectRef, Injectable, OnDestroy, Signal, signal, WritableSignal } from '@angular/core';
import { AuthSessionData, UserCredentials } from '../models/Auth';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements  OnDestroy {
  private isAuthenticated: WritableSignal<boolean> = signal(false);
  private TOKEN_KEY: string | null = null;
  private _destiantionUrl: string | null = null;
  private authEffect: EffectRef;
  public $isAuthorized: Signal<boolean> = this.getAuthState();

  constructor(private http: HttpClient) {
    this.authEffect = effect(() => {
      console.log(`The isAuthenticated is: ${this.isAuthenticated()}`);
    });
  }

  ngOnDestroy(): void {
    this.authEffect.destroy();
  }

  refresh(id?: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post(
        '/api/v1/refresh',
        {},
        {
          headers,
          withCredentials: true,
        }
      )
      .pipe(
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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    console.log('Loged out start.');
    this.setUserSessionState({ accessToken: null });
    return this.http
      .post(
        'http://127.0.0.1:5000/api/v1/logout',
        {},
        {
          headers,
          withCredentials: true,
        }
      )
      .pipe(tap((response) => {}));
  }

  login(email: string, password: string): Observable<any> {
    const body: UserCredentials = {
      email,
      password,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post('http://127.0.0.1:5000/api/v1/login', body, {
        headers,
      })
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

  public getAuthState(): Signal<boolean> {
    return this.isAuthenticated.asReadonly();
  }
}
