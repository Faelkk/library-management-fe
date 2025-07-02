import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvironmentService } from '../services/environment.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private env: EnvironmentService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.startsWith('http')) {
      return next.handle(request);
    }

    const apiRequest = request.clone({
      url: `${this.env.apiUrl}${request.url}`,
    });

    return next.handle(apiRequest);
  }
}
