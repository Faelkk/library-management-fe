import { computed, Injectable, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Client } from './clients.component';
import { DashboardServiceService } from '../services/dashboard-service.service';
import { ToastrService } from 'ngx-toastr';
import {
  CreateClientPayload,
  EditClientPayload,
} from '../../../../shared/types/dashboard/dashboard-type';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(
    private dashboardService: DashboardServiceService,
    private toastService: ToastrService
  ) {}
  clients = signal<Client[]>([]);
  search = signal<string>('');
  isLoadingClients = signal<boolean>(false);

  createForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\(?\d{2}\)?\s?\d{4,5}\-?\d{4}$/),
    ]),
  });

  editForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\(?\d{2}\)?\s?\d{4,5}\-?\d{4}$/),
    ]),
  });

  filteredClients = computed(() => {
    const term = this.search().toLowerCase().trim();
    if (!term) return this.clients();

    return this.clients().filter(
      (client) =>
        client.id.toString().includes(term) ||
        client.name.toLowerCase().includes(term) ||
        client.email.toLowerCase().includes(term) ||
        client.phoneNumber.includes(term)
    );
  });

  updateSearch(value: string) {
    this.search.set(value);
  }

  loadClients() {
    const token = localStorage.getItem('auth-token');
    if (!token) return;

    this.isLoadingClients.set(true);
    this.dashboardService.getAllClients(token).subscribe({
      next: (res: Client[]) => {
        this.clients.set(res);
      },
      error: () => {
        this.toastService.error('Erro ao buscar clientes');
      },
      complete: () => {
        this.isLoadingClients.set(false);
      },
    });
  }

  createClient(onSuccess: () => void, onError: () => void) {
    if (this.createForm.invalid) return;

    const token = localStorage.getItem('auth-token');

    if (!token) return;

    const value = this.createForm.value;

    if (!value.name || !value.email || !value.phoneNumber) {
      this.toastService.error('Erro ao pegar valores pra criar cliente');
      return;
    }

    const payload: CreateClientPayload = {
      name: value.name,
      email: value.email,
      phoneNumber: value.phoneNumber,
    };

    this.dashboardService.createClient(payload, token).subscribe({
      next: (newClient) => {
        this.toastService.success('Cliente criado com sucesso');
        this.clients.update((prev) => [...prev, newClient]);
        onSuccess();
      },
      error: () => {
        this.toastService.error('Erro ao criar cliente');
        onError();
      },
    });
  }

  updateClient(
    selectedClient: Client,
    onSuccess: () => void,
    onError: () => void
  ) {
    if (this.editForm.invalid) return;

    const token = localStorage.getItem('auth-token');
    if (!token) return;

    const value = this.editForm.value;

    if (!value.name || !value.email || !value.phoneNumber) {
      this.toastService.error('Erro ao pegar valores pra editar cliente');
      return;
    }

    const payload: EditClientPayload = {
      name: value.name,
      email: value.email,
      phoneNumber: value.phoneNumber,
    };

    const hasChanged =
      payload.name !== selectedClient.name ||
      payload.email !== selectedClient.email ||
      payload.phoneNumber !== selectedClient.phoneNumber;

    if (!hasChanged) {
      onSuccess();
      return;
    }

    this.dashboardService
      .editClient(selectedClient.id, payload, token)
      .subscribe({
        next: (updatedClient) => {
          this.toastService.success('Cliente editado com sucesso');
          this.clients.update((prev) =>
            prev.map((u) => (u.id === updatedClient.id ? updatedClient : u))
          );
          onSuccess();
        },
        error: () => {
          this.toastService.error('Erro ao editar cliente');
          onError();
        },
      });
  }

  deleteClient(clientId: number, onSuccess: () => void, onError: () => void) {
    const token = localStorage.getItem('auth-token');
    if (!token) return;

    this.dashboardService.deleteClient(clientId, token).subscribe({
      next: () => {
        this.toastService.success('Cliente deletado com sucesso');
        this.clients.update((prev) => prev.filter((u) => u.id !== clientId));
        onSuccess();
      },
      error: () => {
        this.toastService.error('Erro ao deletar cliente');
        onError();
      },
    });
  }
}
