import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith('http://localhost:8080/api')) {
      req = req.clone({
        withCredentials: true,
      });
    }
    if (req.url.startsWith('https://alexxg0152.github.io')) {
      req = req.clone({
        withCredentials: true,
      });
    }

    return next.handle(req);
  }
}
