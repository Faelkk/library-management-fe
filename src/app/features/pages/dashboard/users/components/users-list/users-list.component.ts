import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../users.component';
import { InputComponent } from '../../../components/input/input.component';
import { UserCardComponent } from '../user-card/user-card.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { SpinnerComponent } from '../../../../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    InputComponent,
    UserCardComponent,
    ButtonComponent,
    SpinnerComponent,
  ],
  templateUrl: './users-list.component.html',
})
export class UsersListComponent {
  @Input() users: User[] = [];
  @Input() isLoading = false;

  @Output() searchChange = new EventEmitter<string>();
  @Output() editUser = new EventEmitter<User>();
  @Output() deleteUser = new EventEmitter<User>();
  @Output() addUser = new EventEmitter<void>();

  onSearchChange(value: string) {
    this.searchChange.emit(value);
  }

  onEdit(user: User) {
    this.editUser.emit(user);
  }

  onDelete(user: User) {
    this.deleteUser.emit(user);
  }

  onAddUser() {
    this.addUser.emit();
  }
}
