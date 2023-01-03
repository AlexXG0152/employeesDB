import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRequestInterceptor } from './http.interceptor';
import { ErrorInterceptor } from './error.interceptor';
import { AuthInterceptor } from './auth.interceptor';

export const interceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];
