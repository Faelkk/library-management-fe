import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ClientUserPayload,
  CreateGenrePayload,
  CreateUserPayload,
  EditGenrePayload,
  EditUserPayload,
  Genre,
  Loan,
} from '../../../../shared/types/dashboard/dashboard-type';
import { Book } from '../books/books.component';
import { Client } from '../clients/clients.component';
import { User } from '../users/users.component';

@Injectable({
  providedIn: 'root',
})
export class DashboardServiceService {
  constructor(private httpClient: HttpClient) {}

  getAllUsers(token: string) {
    return this.httpClient.get<User[]>('/user', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  createUser(
    { name, email, phoneNumber, role, password }: CreateUserPayload,
    token: string
  ) {
    return this.httpClient.post<User>(
      '/user/create',
      { name, email, phoneNumber, role, password },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  editUser(
    userId: number,
    { name, email, phoneNumber, role }: EditUserPayload,
    token: string
  ) {
    return this.httpClient.patch<User>(
      `/user/${userId}`,
      { name, email, phoneNumber, role },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  deleteUser(userId: number, token: string) {
    return this.httpClient.delete(`/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  getAllClients(token: string) {
    return this.httpClient.get('/client', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  createClient(payload: ClientUserPayload, token: string) {
    return this.httpClient.post<Client>('/client', payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  editClient(clientId: number, payload: ClientUserPayload, token: string) {
    return this.httpClient.patch<Client>(`/client/${clientId}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  deleteClient(clientId: number, token: string) {
    return this.httpClient.delete(`/client/${clientId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  getAllBooks(token: string) {
    return this.httpClient.get<Book[]>('/book', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  createBook(formData: FormData, token: string) {
    return this.httpClient.post<Book>('/book', formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  editBook(id: number, formData: FormData, token: string) {
    return this.httpClient.patch<Book>(`/book/${id}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  getAllLoans(token: string) {
    return this.httpClient.get<Loan[]>('/loan', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  deleteBook(id: number, token: string) {
    return this.httpClient.delete(`/book/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  createLoan(
    payload: {
      bookId: number;
      clientId: number;
      loanDate: string;
      returnDate: string;
    },
    token: string
  ) {
    return this.httpClient.post<Loan>('/loan', payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  editLoan(
    loanId: number,
    payload: {
      bookId?: number;
      clientId?: number;
      LoanDate: string;
      returnDate?: string;
      returnedAt?: string;
    },
    token: string
  ) {
    return this.httpClient.patch<Loan>(`/loan/${loanId}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  deleteLoan(loanId: number, token: string) {
    return this.httpClient.delete(`/loan/${loanId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  getAllGenres(token: string) {
    return this.httpClient.get<Genre[]>('/genre', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  createGenre(payload: CreateGenrePayload, token: string) {
    return this.httpClient.post<Genre>('/genre', payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
  editGenre(id: number, payload: EditGenrePayload, token: string) {
    return this.httpClient.patch<Genre>(`/genre/${id}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  deleteGenre(id: number, token: string) {
    return this.httpClient.delete<void>(`/genre/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
