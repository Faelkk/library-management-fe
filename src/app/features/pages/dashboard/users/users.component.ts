import { Component } from '@angular/core';
import { DashboardLayoutComponent } from '../components/dashboard-layout/dashboard-layout.component';

@Component({
  selector: 'app-users',
  imports: [DashboardLayoutComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {}
