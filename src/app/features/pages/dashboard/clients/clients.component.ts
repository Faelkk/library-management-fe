import { Component, computed, Inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DashboardServiceService } from '../services/dashboard-service.service';
import { DashboardLayoutComponent } from '../components/dashboard-layout/dashboard-layout.component';
import { InputComponent } from '../components/input/input.component';
import { ClientCardComponent } from './components/clients/client-card/client-card.component';
import { ButtonComponent } from '../components/button/button.component';
import { ModalComponent } from '../components/modal/modal.component';
import { ToastrService } from 'ngx-toastr';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';

export interface Client {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
}

@Component({
  selector: 'app-clients',
  imports: [
    DashboardLayoutComponent,
    ClientCardComponent,
    InputComponent,
    ButtonComponent,
    ModalComponent,
    ReactiveFormsModule,
    SpinnerComponent,
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css',
})
export class ClientsComponent {
  constructor(
    private dashboardService: DashboardServiceService,
    private toastService: ToastrService
  ) {
    this.loadClients();
  }
  clients = signal<Client[]>([]);

  showAddModal = signal(false);
  showEditModal = signal(false);
  showDeleteModal = signal(false);
  selectedClient: Client | null = null;
  isCreating: boolean = false;
  isEditing: boolean = false;
  isDeleting: boolean = false;
  isLoadingClients = signal<boolean>(false);

  search = signal<string>('');

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

  openModal() {
    this.showAddModal.set(true);
    this.createForm.reset();
  }

  openEditModal(client: Client) {
    this.selectedClient = client;
    this.editForm.patchValue(client);
    this.showEditModal.set(true);
  }

  openDeleteModal(client: Client) {
    this.selectedClient = client;
    this.showDeleteModal.set(true);
  }

  closeModal() {
    this.showAddModal.set(false);
    this.showEditModal.set(false);
    this.showDeleteModal.set(false);
    this.selectedClient = null;
  }

  saveClient() {
    if (this.createForm.invalid) return;

    const token = localStorage.getItem('auth-token');
    if (!token) return;

    this.isCreating = true;

    const payload = {
      name: this.createForm.value.name!,
      email: this.createForm.value.email!,
      phoneNumber: this.createForm.value.phoneNumber!,
    };

    this.dashboardService.createClient(payload, token).subscribe({
      next: (newClient: Client) => {
        this.toastService.success('cliente criado com sucesso');
        this.clients.update((clients) => [...clients, newClient]);
        this.closeModal();
      },
      error: (err) => {
        this.toastService.error('Erro ao editar cliente');
        this.isCreating = false;
        this.closeModal();
      },
      complete: () => {
        this.isCreating = false;
      },
    });
  }

  updateClient() {
    if (this.editForm.invalid || !this.selectedClient) return;

    const token = localStorage.getItem('auth-token');
    if (!token) return;

    this.isEditing = false;

    const payload = {
      name: this.editForm.value.name!,
      email: this.editForm.value.email!,
      phoneNumber: this.editForm.value.phoneNumber!,
    };

    const hasChanged =
      payload.name !== this.selectedClient.name ||
      payload.email !== this.selectedClient.email ||
      payload.phoneNumber !== this.selectedClient.phoneNumber;

    if (!hasChanged) {
      this.closeModal();
      return;
    }

    this.dashboardService
      .editClient(this.selectedClient.id, payload, token)
      .subscribe({
        next: (updateClient) => {
          this.toastService.success('cliente editado com sucesso');
          this.clients.update((clients) =>
            clients.map((client) =>
              client.id === updateClient.id ? updateClient : client
            )
          );
          this.closeModal();
        },
        error: (err) => {
          this.toastService.error('Erro ao editar cliente');
          this.isEditing = false;
          this.closeModal();
        },
        complete: () => {
          this.isEditing = false;
        },
      });
  }

  confirmDelete() {
    if (!this.selectedClient) return;

    const token = localStorage.getItem('auth-token');
    if (!token) return;

    this.isDeleting = true;

    this.dashboardService
      .deleteClient(this.selectedClient.id, token)
      .subscribe({
        next: () => {
          this.toastService.success('cliente deletado com sucesso');
          this.clients.update((clients) =>
            clients.filter((c) => c.id !== this.selectedClient?.id)
          );
          this.closeModal();
        },

        error: (err) => {
          this.toastService.error('Erro ao deletar cliente');
          this.isDeleting = false;
          this.closeModal();
        },
        complete: () => {
          this.isDeleting = false;
        },
      });
  }

  loadClients() {
    const token = localStorage.getItem('auth-token');
    if (!token) return;

    this.isLoadingClients.set(true);

    this.dashboardService.getAllClients(token).subscribe({
      next: (res: any) => {
        const clientsFromApi = res as Client[];
        this.clients.set(clientsFromApi);
      },
      error: (err) => {
        this.toastService.error('Erro ao buscar clientes');
        this.isLoadingClients.set(false);
      },
      complete: () => {
        this.isLoadingClients.set(false);
      },
    });
  }
}
