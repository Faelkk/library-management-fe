import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-header',
  imports: [],
  templateUrl: './auth-header.component.html',
  styleUrl: './auth-header.component.css',
})
export class AuthHeaderComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() linkText = '';
  @Input() link = '';

  constructor(private router: Router) {}

  navigate() {
    if (this.link) {
      this.router.navigate([this.link]);
    }
  }
}
