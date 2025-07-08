import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthServiceService } from '../../features/pages/auth/services/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthServiceService
  ) {}

  canActivate(): Observable<boolean> {
    const token = localStorage.getItem('auth-token');

    if (!token) {
      return of(true);
    }

    return this.authService.isTokenValid(token).pipe(
      map((res) => {
        if (res.isValid) {
          this.router.navigate(['dashboard/books']);
          return false;
        } else {
          localStorage.removeItem('auth-token');
          return true;
        }
      }),
      catchError((err) => {
        if (err.status === 401) {
          localStorage.removeItem('auth-token');
        }
        return of(true);
      })
    );
  }
}
