import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../../../components/button/button.component';
import { ClientCardComponent } from '../client-card/client-card.component';
import { InputComponent } from '../../../components/input/input.component';
import { Client } from '../../clients.component';
import { SpinnerComponent } from '../../../../../../shared/components/spinner/spinner.component';

@Component({
  selector: 'app-clients-list',
  imports: [
    ButtonComponent,
    ClientCardComponent,
    InputComponent,
    SpinnerComponent,
  ],
  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.css',
})
export class ClientsListComponent {
  @Input() clients: Client[] = [];
  @Input() isLoading = false;

  @Output() searchChange = new EventEmitter<string>();
  @Output() editUser = new EventEmitter<Client>();
  @Output() deleteUser = new EventEmitter<Client>();
  @Output() addUser = new EventEmitter<void>();

  onSearchChange(value: string) {
    this.searchChange.emit(value);
  }

  onEdit(client: Client) {
    this.editUser.emit(client);
  }

  onDelete(client: Client) {
    this.deleteUser.emit(client);
  }

  onAddClient() {
    this.addUser.emit();
  }
}
