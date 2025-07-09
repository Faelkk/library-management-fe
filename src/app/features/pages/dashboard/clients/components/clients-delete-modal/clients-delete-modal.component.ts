import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Client } from '../../clients.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../../../components/modal/modal.component';
import { ButtonComponent } from '../../../components/button/button.component';

@Component({
  selector: 'app-clients-delete-modal',
  imports: [ReactiveFormsModule, ModalComponent, ButtonComponent],
  templateUrl: './clients-delete-modal.component.html',
  styleUrl: './clients-delete-modal.component.css',
})
export class ClientsDeleteModalComponent {
  @Input() show = false;
  @Input() client: Client | null = null;
  @Input() isLoading = false;

  @Output() close = new EventEmitter<void>();
  @Output() confirmDelete = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  onConfirm() {
    this.confirmDelete.emit();
  }
}
