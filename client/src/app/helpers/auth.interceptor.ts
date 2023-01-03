import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  static accessToken = '';
  refresh = false;

  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const req = request.clone({
      setHeaders: { authorization: `Bearer ${AuthInterceptor.accessToken}` },
    });

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 403 && !this.refresh) {
          this.refresh = true;

          return this.authService.refresh().pipe(
            switchMap((res: any) => {
              AuthInterceptor.accessToken = res.token;

              return next.handle(
                request.clone({
                  setHeaders: {
                    authorization: `Bearer ${AuthInterceptor.accessToken}`,
                  },
                })
              );
            })
          );
        }
        this.refresh = false;
        return throwError(() => err);
      })
    );
  }
}
