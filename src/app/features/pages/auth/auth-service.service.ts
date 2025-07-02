import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthTokenResponse } from './types/auth.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private httpClient: HttpClient) {}

  signin(email: string, password: string) {
    return this.httpClient.post<any>('/user/signin', { email, password });
  }

  signup(name: string, email: string, password: string) {
    return this.httpClient
      .post<AuthTokenResponse>('/user/signup', { name, email, password })
      .pipe(
        tap((value) => {
          localStorage.setItem('auth-token', value.Token);
        })
      );
  }

  recoveryPassword(email: string) {
    return this.httpClient
      .post<AuthTokenResponse>('/user/recover-password', { email })
      .pipe(
        tap((value) => {
          localStorage.setItem('/auth-token', value.Token);
        })
      );
  }

  resetPasswordForm(password: string, Token: string) {
    return this.httpClient.patch<AuthTokenResponse>(
      `/user/reset-password?token=${Token}`,
      {
        password,
      }
    );
  }
}
