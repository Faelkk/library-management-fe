import { Injectable, signal, computed } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from './users/users.component';
import { DashboardServiceService } from './services/dashboard-service.service';
import {
  CreateUserPayload,
  EditUserPayload,
} from '../../../shared/types/dashboard/dashboard-type';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private dashboardService: DashboardServiceService,
    private toastService: ToastrService
  ) {}

  users = signal<User[]>([]);
  isLoadingUsers = signal(false);

  search = signal('');
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

  updateSearch(value: string) {
    this.search.set(value);
  }

  loadUsers() {
    const token = localStorage.getItem('auth-token');
    if (!token) return;

    this.isLoadingUsers.set(true);
    this.dashboardService.getAllUsers(token).subscribe({
      next: (res: User[]) => {
        this.users.set(res);
      },
      error: () => {
        this.toastService.error('Erro ao buscar usuários');
      },
      complete: () => {
        this.isLoadingUsers.set(false);
      },
    });
  }

  createUser(onSuccess: () => void, onError: () => void) {
    if (this.createForm.invalid) return;

    const token = localStorage.getItem('auth-token');

    if (!token) return;

    const value = this.createForm.value;

    if (
      !value.name ||
      !value.email ||
      !value.phoneNumber ||
      !value.role ||
      !value.password
    ) {
      this.toastService.error('Erro ao pegar valores pra criar usuario');
      return;
    }

    const payload: CreateUserPayload = {
      name: value.name,
      email: value.email,
      phoneNumber: value.phoneNumber,
      role: value.role,
      password: value.password,
    };

    this.dashboardService.createUser(payload, token).subscribe({
      next: (newUser) => {
        this.toastService.success('Usuário criado com sucesso');
        this.users.update((prev) => [...prev, newUser]);
        onSuccess();
      },
      error: () => {
        this.toastService.error('Erro ao criar usuário');
        onError();
      },
    });
  }

  updateUser(selectedUser: User, onSuccess: () => void, onError: () => void) {
    if (this.editForm.invalid) return;

    const token = localStorage.getItem('auth-token');
    if (!token) return;

    const value = this.editForm.value;

    if (!value.name || !value.email || !value.phoneNumber || !value.role) {
      this.toastService.error('Erro ao pegar valores pra editar usuario');
      return;
    }

    const payload: EditUserPayload = {
      name: value.name,
      email: value.email,
      phoneNumber: value.phoneNumber,
      role: value.role,
    };

    const hasChanged =
      payload.name !== selectedUser.name ||
      payload.email !== selectedUser.email ||
      payload.phoneNumber !== selectedUser.phoneNumber ||
      payload.role !== selectedUser.role;

    if (!hasChanged) {
      onSuccess();
      return;
    }

    this.dashboardService.editUser(selectedUser.id, payload, token).subscribe({
      next: (updatedUser) => {
        this.toastService.success('Usuário editado com sucesso');
        this.users.update((prev) =>
          prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
        );
        onSuccess();
      },
      error: () => {
        this.toastService.error('Erro ao editar usuário');
        onError();
      },
    });
  }

  deleteUser(userId: number, onSuccess: () => void, onError: () => void) {
    const token = localStorage.getItem('auth-token');
    if (!token) return;

    this.dashboardService.deleteUser(userId, token).subscribe({
      next: () => {
        this.toastService.success('Usuário deletado com sucesso');
        this.users.update((prev) => prev.filter((u) => u.id !== userId));
        onSuccess();
      },
      error: () => {
        this.toastService.error('Erro ao deletar usuário');
        onError();
      },
    });
  }
}
