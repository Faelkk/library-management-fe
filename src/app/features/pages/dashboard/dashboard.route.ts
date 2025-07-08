import { Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { GenresComponent } from './genres/genres.component';
import { UsersComponent } from './users/users.component';
import { LoansComponent } from './loans/loans.component';
import { AuthGuard } from '../../../core/guards/auth.guard';
import { ClientsComponent } from './clients/clients.component';

export const dashboardRoutes: Routes = [
  { path: 'books', component: BooksComponent, canActivate: [AuthGuard] },
  { path: 'genres', component: GenresComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'loans', component: LoansComponent, canActivate: [AuthGuard] },
  { path: 'clients', component: ClientsComponent, canActivate: [AuthGuard] },
];
