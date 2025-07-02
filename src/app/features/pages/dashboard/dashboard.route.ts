import { Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { GenresComponent } from './genres/genres.component';
import { ClientsComponent } from './clients/clients.component';
import { UsersComponent } from './users/users.component';
import { LoansComponent } from './loans/loans.component';

export const dashboardRoutes: Routes = [
  { path: 'books', component: BooksComponent },
  { path: 'genres', component: GenresComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'loans', component: LoansComponent },
];
