import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
  withJsonpSupport,
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthInterceptor } from './http-interceptors/auth.interceptor';
import { provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withHttpTransferCacheOptions({ includeRequestsWithAuthHeaders: true}) ),
    provideHttpClient(withInterceptorsFromDi(), withJsonpSupport(), withFetch()),
    importProvidersFrom(FormsModule, ReactiveFormsModule),
    provideAnimationsAsync(),
    
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
};
