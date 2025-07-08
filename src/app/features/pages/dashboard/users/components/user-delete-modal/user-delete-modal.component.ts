import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../users.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { ModalComponent } from '../../../components/modal/modal.component';

@Component({
  selector: 'app-user-delete-modal',
  standalone: true,
  imports: [ModalComponent, ButtonComponent],
  templateUrl: './user-delete-modal.component.html',
})
export class UserDeleteModalComponent {
  @Input() show = false;
  @Input() user: User | null = null;
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
