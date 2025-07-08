import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-users-header',
  imports: [],
  templateUrl: './users-header.component.html',
  styleUrl: './users-header.component.css',
})
export class UsersHeaderComponent {
  @Input() totalUsers = 0;
}
