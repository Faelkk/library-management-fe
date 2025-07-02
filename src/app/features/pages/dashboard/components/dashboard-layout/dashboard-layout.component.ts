import { Component } from '@angular/core';
import { NavDashboardLayoutComponent } from '../nav-dashboard-layout/nav-dashboard-layout.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
  imports: [NavDashboardLayoutComponent],
})
export class DashboardLayoutComponent {}
