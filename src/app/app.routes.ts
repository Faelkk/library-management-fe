import { Routes } from '@angular/router';
import { authRoutes } from './features/pages/auth/auth.route';
import { dashboardRoutes } from './features/pages/dashboard/dashboard.route';

export const routes: Routes = [
  { path: 'auth', children: authRoutes },
  { path: 'dashboard', children: dashboardRoutes },
];
