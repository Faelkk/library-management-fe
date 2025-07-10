import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActiveNavDashboardLayoutComponent } from '../active-nav-dashboard-layout/active-nav-dashboard-layout.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-sidebar',
  imports: [ActiveNavDashboardLayoutComponent],
  templateUrl: './dashboard-sidebar.component.html',
  styleUrl: './dashboard-sidebar.component.css',
})
export class DashboardSidebarComponent {
  constructor(private router: Router) {}

  @Input() showCloseButton = false;
  @Output() close = new EventEmitter<void>();

  @Input() personIcon!: any;
  @Input() bookIcon!: any;
  @Input() categoryIcon!: any;
  @Input() bagIcon!: any;
  @Input() clientIcon!: any;

  logout() {
    localStorage.removeItem('auth-token');
    this.router.navigate(['auth/signin']);
  }
}
