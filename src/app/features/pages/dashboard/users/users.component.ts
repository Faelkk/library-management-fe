import { Component, computed, Inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DashboardLayoutComponent } from '../components/dashboard-layout/dashboard-layout.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { InputComponent } from '../components/input/input.component';
import { ButtonComponent } from '../components/button/button.component';
import { ModalComponent } from '../components/modal/modal.component';
import { DashboardServiceService } from '../services/dashboard-service.service';
import { ClientCardComponent } from '../clients/components/clients/client-card/client-card.component';
import { ToastrService } from 'ngx-toastr';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';

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
  imports: [
    DashboardLayoutComponent,
    UserCardComponent,
    InputComponent,
    ButtonComponent,
    ModalComponent,
    ReactiveFormsModule,
    SpinnerComponent,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  constructor(
    private dashboardService: DashboardServiceService,
    private toastService: ToastrService
  ) {
    this.loadUsers();
  }
  users = signal<User[]>([]);

  showAddModal = signal(false);
  showEditModal = signal(false);
  showDeleteModal = signal(false);
  selectedUser: User | null = null;
  isCreating: boolean = false;
  isEditing: boolean = false;
  isDeleting: boolean = false;
  isLoadingUsers = signal<boolean>(false);

  search = signal<string>('');

  createForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\(?\d{2}\)?\s?\d{4,5}\-?\d{4}$/),
    ]),
    role: new FormControl('User', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  editForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\(?\d{2}\)?\s?\d{4,5}\-?\d{4}$/),
    ]),
    role: new FormControl('User', [Validators.required]),
  });

  filteredUsers = computed(() => {
    const term = this.search().toLowerCase().trim();
    if (!term) return this.users();

    return this.users().filter(
      (user) =>
        user.id.toString().includes(term) ||
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.role.toLowerCase().includes(term) ||
        user.phoneNumber.includes(term)
    );
  });

  updateSearch(value: string) {
    this.search.set(value);
  }

  openModal() {
    this.showAddModal.set(true);
    this.createForm.reset();
  }

  openEditModal(user: User) {
    this.selectedUser = user;
    this.editForm.patchValue(user);
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

    this.isCreating = false;
    this.isEditing = false;
    this.isDeleting = false;

    this.createForm.reset();
    this.editForm.reset();
  }

  saveUser() {
    if (this.createForm.invalid) return;

    const token = localStorage.getItem('auth-token');
    if (!token) return;

    this.isCreating = true;

    const payload = {
      name: this.createForm.value.name!,
      email: this.createForm.value.email!,
      phoneNumber: this.createForm.value.phoneNumber!,
      role: this.createForm.value.role!,
      password: this.createForm.value.password!,
    };

    this.dashboardService.createUser(payload, token).subscribe({
      next: (newUser: User) => {
        this.toastService.success('Usuário criado com sucesso');
        this.users.update((prev) => [...prev, newUser]);
        this.closeModal();
      },
      error: () => {
        this.toastService.error('Erro ao criar usuário');
        this.isCreating = false;
        this.closeModal();
      },
      complete: () => {
        this.isCreating = false;
      },
    });
  }

  updateUser() {
    if (this.editForm.invalid || !this.selectedUser) return;

    const token = localStorage.getItem('auth-token');
    if (!token) return;

    this.isEditing = true;

    const payload = {
      name: this.editForm.value.name!,
      email: this.editForm.value.email!,
      phoneNumber: this.editForm.value.phoneNumber!,
      role: this.editForm.value.role!,
    };

    const hasChanged =
      payload.name !== this.selectedUser.name ||
      payload.email !== this.selectedUser.email ||
      payload.phoneNumber !== this.selectedUser.phoneNumber ||
      payload.role !== this.selectedUser.role;

    if (!hasChanged) {
      this.closeModal();
      return;
    }

    this.dashboardService
      .editUser(this.selectedUser.id, payload, token)
      .subscribe({
        next: (updatedUser: User) => {
          this.toastService.success('Usuário editado com sucesso');
          this.users.update((prev) =>
            prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
          );
          this.closeModal();
        },
        error: () => {
          this.toastService.error('Erro ao editar usuário');
          this.isEditing = false;
          this.closeModal();
        },
        complete: () => {
          this.isEditing = false;
        },
      });
  }

  confirmDelete() {
    if (!this.selectedUser) return;

    const token = localStorage.getItem('auth-token');
    if (!token) return;

    this.isDeleting = true;

    this.dashboardService.deleteUser(this.selectedUser.id, token).subscribe({
      next: () => {
        this.toastService.success('Usuário deletado com sucesso');
        this.users.update((prev) =>
          prev.filter((u) => u.id !== this.selectedUser?.id)
        );
        this.closeModal();
      },
      error: () => {
        this.toastService.error('Erro ao deletar usuário');
        this.isDeleting = false;
        this.closeModal();
      },
      complete: () => {
        this.isDeleting = false;
      },
    });
  }

  loadUsers() {
    const token = localStorage.getItem('auth-token');

    if (!token) return;

    this.isLoadingUsers.set(true);

    this.dashboardService.getAllUsers(token).subscribe({
      next: (res: any) => {
        const usersFromApi = res as User[];
        this.users.set(usersFromApi);
      },
      error: (err) => {
        this.toastService.error('Erro ao buscar livros');
        this.isLoadingUsers.set(false);
      },
      complete: () => {
        this.isLoadingUsers.set(false);
      },
    });
  }
}
