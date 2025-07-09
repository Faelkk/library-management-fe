import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Genre } from '../../../../../../shared/types/dashboard/dashboard-type';
import { ButtonComponent } from '../../../components/button/button.component';
import { ModalComponent } from '../../../components/modal/modal.component';

@Component({
  selector: 'app-genre-delete-modal',
  imports: [ButtonComponent, ModalComponent],
  templateUrl: './genre-delete-modal.component.html',
  styleUrl: './genre-delete-modal.component.css',
})
export class GenreDeleteModalComponent {
  @Input() show = false;
  @Input() genre: Genre | null = null;
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
