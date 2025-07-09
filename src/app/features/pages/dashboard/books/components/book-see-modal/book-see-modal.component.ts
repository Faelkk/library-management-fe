import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../books.component';
import { ModalComponent } from '../../../components/modal/modal.component';

@Component({
  selector: 'app-book-see-modal',
  imports: [ModalComponent],
  templateUrl: './book-see-modal.component.html',
  styleUrl: './book-see-modal.component.css',
})
export class BookSeeModalComponent {
  @Input() bookSelected!: Book;

  @Input() show = false;

  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
