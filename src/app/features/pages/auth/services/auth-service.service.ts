import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthTokenResponse } from '../types/auth.type';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private httpClient: HttpClient) {}

  signin(email: string, password: string) {
    return this.httpClient.post<AuthTokenResponse>('/user/login', {
      email,
      password,
    });
  }

  signup(name: string, email: string, password: string, phoneNumber: string) {
    return this.httpClient
      .post<AuthTokenResponse>('/user/create', {
        name,
        email,
        password,
        phoneNumber,
      })
      .pipe(
        tap((value) => {
          localStorage.setItem('auth-token', value.token);
        })
      );
  }

  recoveryPassword(email: string) {
    return this.httpClient
      .patch<AuthTokenResponse>('/user/recover-password', { email })
      .pipe(
        tap((value) => {
          localStorage.setItem('/auth-token', value.token);
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

  isTokenValid(token: string) {
    return this.httpClient.get<{ isValid: boolean }>('/user/validate-token', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
