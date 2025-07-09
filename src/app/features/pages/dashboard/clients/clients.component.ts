import { Component, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardLayoutComponent } from '../components/dashboard-layout/dashboard-layout.component';
import { ClientsService } from './clients.service';
import { ClientsHeaderComponent } from './components/clients-header/clients-header.component';
import { ClientsListComponent } from './components/clients-list/clients-list.component';
import { ClientCreateModalComponent } from './components/client-create-modal/client-create-modal.component';
import { ClientEditModalComponent } from './components/client-edit-modal/client-edit-modal.component';
import { ClientsDeleteModalComponent } from './components/clients-delete-modal/clients-delete-modal.component';

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
    ReactiveFormsModule,
    ClientsHeaderComponent,
    ClientsListComponent,
    ClientCreateModalComponent,
    ClientEditModalComponent,
    ClientsDeleteModalComponent,
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css',
})
export class ClientsComponent {
  constructor(public clientService: ClientsService) {
    this.clientService.loadClients();
  }

  get clients() {
    return this.clientService.clients;
  }

  get filteredClients() {
    return this.clientService.filteredClients;
  }

  get isLoadingClients() {
    return this.clientService.isLoadingClients;
  }

  showAddModal = signal(false);
  showEditModal = signal(false);
  showDeleteModal = signal(false);
  selectedClient: Client | null = null;
  isCreating = signal(false);
  isEditing = signal(false);
  isDeleting = signal(false);

  updateSearch(value: string) {
    this.clientService.updateSearch(value);
  }

  openModal() {
    this.showAddModal.set(true);
    this.clientService.createForm.reset();
  }

  openEditModal(client: Client) {
    this.selectedClient = client;
    this.clientService.editForm.patchValue(client);
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
    this.isCreating.set(true);

    this.clientService.createClient(
      () => {
        this.closeModal();
        this.isCreating.set(false);
      },
      () => {
        this.isCreating.set(false);
      }
    );
  }

  updateClient() {
    if (!this.selectedClient) return;

    this.isEditing.set(true);

    this.clientService.updateClient(
      this.selectedClient,
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
    if (!this.selectedClient) return;

    this.isDeleting.set(true);
    this.clientService.deleteClient(
      this.selectedClient.id,
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
