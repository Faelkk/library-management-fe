import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../../books.component';
import { SpinnerComponent } from '../../../../../../shared/components/spinner/spinner.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { InputComponent } from '../../../components/input/input.component';
import { BookByCardComponent } from '../book-by-card/book-by-card.component';

@Component({
  selector: 'app-books-list',
  imports: [
    SpinnerComponent,
    ButtonComponent,
    InputComponent,
    BookByCardComponent,
  ],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.css',
})
export class BooksListComponent {
  @Input() books: Book[] = [];
  @Input() isLoading = false;

  @Output() searchChange = new EventEmitter<string>();
  @Output() editBook = new EventEmitter<Book>();
  @Output() deleteBook = new EventEmitter<Book>();
  @Output() addBook = new EventEmitter<void>();
  @Output() seeMore = new EventEmitter<Book>();

  onSearchChange(value: string) {
    this.searchChange.emit(value);
  }

  onEdit(book: Book) {
    this.editBook.emit(book);
  }

  onDelete(book: Book) {
    this.deleteBook.emit(book);
  }

  openSeeMoreModal(book: Book) {
    this.seeMore.emit(book);
  }

  onAddBook() {
    this.addBook.emit();
  }
}
