import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private storageService: StorageService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.log('Error Event');
          } else {
            switch (error.status) {
              case 401: // Unautorized
                this.toastr.error(`${error.statusText}`, 'Authorization Error');
                break;
              case 403: // Forbidden
                this.toastr.error(`${error.statusText}`, 'Access Error');
                this.storageService.clean();
                // this.router.navigate(['/login']);
                break;
              case 404: // Not found
                this.toastr.error(`${error.statusText}`, 'Route Error');
                break;
              case 503: // Server error
                this.toastr.error(`${error.statusText}`, 'Server Error');
                break;
            }
          }
        } else {
          console.log('An error occurred');
        }
        return throwError(() => new Error(error.statusText));
      })
    );
  }
}
