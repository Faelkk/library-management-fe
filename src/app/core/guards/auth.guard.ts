import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthServiceService } from '../../features/pages/auth/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthServiceService
  ) {}

  canActivate(): Observable<boolean> {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      this.router.navigate(['auth/signin']);
      return of(false);
    }

    return this.authService.isTokenValid(token).pipe(
      map((res) => {
        if (res.isValid) {
          return true;
        } else {
          localStorage.removeItem('auth-token');
          this.router.navigate(['auth/signin']);
          return false;
        }
      }),
      catchError((err) => {
        if (err.status === 401) {
          localStorage.removeItem('auth-token');
        }
        this.router.navigate(['auth/signin']);
        return of(false);
      })
    );
  }
}
