import { Component, computed, Inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardLayoutComponent } from '../components/dashboard-layout/dashboard-layout.component';
import { DashboardServiceService } from '../services/dashboard-service.service';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersHeaderComponent } from './components/users-header/users-header.component';
import { UserCreateModalComponent } from './components/user-create-modal/user-create-modal.component';
import { UserEditModalComponent } from './components/user-edit-modal/user-edit-modal.component';
import { UserDeleteModalComponent } from './components/user-delete-modal/user-delete-modal.component';
import { UsersService } from './users.service';

export interface User {
  id: number;
  name: string;
  role: string;
  email: string;
  phoneNumber: string;
  password: string;
}

@Inject(DashboardServiceService)
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    DashboardLayoutComponent,
    ReactiveFormsModule,
    UsersListComponent,
    UsersHeaderComponent,
    UserCreateModalComponent,
    UserEditModalComponent,
    UserDeleteModalComponent,
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  constructor(public userService: UsersService) {
    this.userService.loadUsers();
  }

  get users() {
    return this.userService.users;
  }

  get filteredUsers() {
    return this.userService.filteredUsers;
  }

  get isLoadingUsers() {
    return this.userService.isLoadingUsers;
  }

  showAddModal = signal(false);
  showEditModal = signal(false);
  showDeleteModal = signal(false);
  selectedUser: User | null = null;

  isCreating = signal(false);
  isEditing = signal(false);
  isDeleting = signal(false);

  updateSearch(value: string) {
    this.userService.updateSearch(value);
  }

  openModal() {
    this.showAddModal.set(true);
    this.userService.createForm.reset();
  }

  openEditModal(user: User) {
    this.selectedUser = user;
    this.userService.editForm.patchValue(user);
    this.showEditModal.set(true);
  }

  openDeleteModal(user: User) {
    this.selectedUser = user;
    this.showDeleteModal.set(true);
  }

  closeModal() {
    this.showAddModal.set(false);
    this.showEditModal.set(false);
    this.showDeleteModal.set(false);
    this.selectedUser = null;

    this.isCreating.set(false);
    this.isEditing.set(false);
    this.isDeleting.set(false);

    this.userService.createForm.reset();
    this.userService.editForm.reset();
  }

  saveUser() {
    this.isCreating.set(true);
    this.userService.createUser(
      () => {
        this.closeModal();
        this.isCreating.set(false);
      },
      () => {
        this.isCreating.set(false);
      }
    );
  }

  updateUser() {
    if (!this.selectedUser) return;

    this.isEditing.set(true);
    this.userService.updateUser(
      this.selectedUser,
      () => {
        this.closeModal();
        this.isEditing.set(false);
      },
      () => {
        this.isEditing.set(false);
      }
    );
  }

  confirmDelete() {
    if (!this.selectedUser) return;

    this.isDeleting.set(true);
    this.userService.deleteUser(
      this.selectedUser.id,
      () => {
        this.closeModal();
        this.isDeleting.set(false);
      },
      () => {
        this.isDeleting.set(false);
      }
    );
  }
}
