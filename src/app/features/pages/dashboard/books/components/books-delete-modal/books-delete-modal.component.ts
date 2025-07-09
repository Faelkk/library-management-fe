import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../books.component';
import { ModalComponent } from '../../../components/modal/modal.component';
import { ButtonComponent } from '../../../components/button/button.component';

@Component({
  selector: 'app-books-delete-modal',
  imports: [ModalComponent, ButtonComponent],
  templateUrl: './books-delete-modal.component.html',
  styleUrl: './books-delete-modal.component.css',
})
export class BooksDeleteModalComponent {
  @Input() show = false;
  @Input() book: Book | null = null;
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
