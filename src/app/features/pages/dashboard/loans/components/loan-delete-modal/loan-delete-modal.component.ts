import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../../../components/button/button.component';
import { ModalComponent } from '../../../components/modal/modal.component';

@Component({
  selector: 'app-loan-delete-modal',
  imports: [ButtonComponent, ModalComponent],
  templateUrl: './loan-delete-modal.component.html',
  styleUrl: './loan-delete-modal.component.css',
})
export class LoanDeleteModalComponent {
  @Input() show = false;
  @Input() bookname: string | null = null;
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
