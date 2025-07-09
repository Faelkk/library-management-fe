import { Component, Inject, signal } from '@angular/core';
import { DashboardLayoutComponent } from '../components/dashboard-layout/dashboard-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BooksService } from './books.service';
import { BooksHeaderComponent } from './components/books-header/books-header.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BooksCreateModalComponent } from './components/books-create-modal/books-create-modal.component';
import { BooksEditModalComponent } from './components/books-edit-modal/books-edit-modal.component';
import { BookSeeModalComponent } from './components/book-see-modal/book-see-modal.component';
import { BooksDeleteModalComponent } from './components/books-delete-modal/books-delete-modal.component';

export interface Book {
  id: number;
  title: string;
  author: string;
  publishYear: number;
  description: string;
  quantity: number;
  imageUrl: string;
  GenreIds: number[];
}

@Inject(BooksService)
@Component({
  selector: 'app-books',
  imports: [
    DashboardLayoutComponent,
    ReactiveFormsModule,
    BooksHeaderComponent,
    BooksListComponent,
    BooksCreateModalComponent,
    BooksEditModalComponent,
    BookSeeModalComponent,
    BooksDeleteModalComponent,
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent {
  constructor(public bookService: BooksService) {
    this.bookService.loadBooks();
    this.bookService.loadGenres();
  }

  get books() {
    return this.bookService.books;
  }

  get genres() {
    return this.bookService.genres;
  }

  get filteredBooks() {
    return this.bookService.filteredBooks;
  }

  get isLoadingBooks() {
    return this.bookService.isLoadingBooks;
  }

  get isLoadingGenres() {
    return this.bookService.isLoadingGenres;
  }

  showAddModal = signal(false);
  showEditModal = signal(false);
  showDeleteModal = signal(false);
  showSeeMoreModal = signal(false);

  isCreating = signal(false);
  isEditing = signal(false);
  isDeleting = signal(false);

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.bookService.selectedImageFile = input.files[0];
      this.bookService.createBookForm
        .get('imageFile')
        ?.setValue(this.bookService.selectedImageFile);
    } else {
      this.bookService.selectedImageFile = null;
      this.bookService.createBookForm.get('imageFile')?.setValue(null);
    }
  }

  updateSearch(value: string) {
    this.bookService.updateSearch(value);
  }

  openAddModal() {
    this.bookService.createBookForm.reset();
    this.bookService.selectedImageFile = null;
    this.showAddModal.set(true);
  }

  openEditModal(book: any) {
    this.bookService.selectedBook = {
      id: book.id,
      title: book.title,
      author: book.author,
      publishYear: book.publishYear,
      description: book.description,
      quantity: book.quantity,
      imageUrl: book.imageUrl,
      GenreIds: book.genres.map((genre: any) => genre.id),
    };

    this.bookService.editBookForm.patchValue({
      title: book.title,
      author: book.author,
      publishYear: book.publishYear,
      description: book.description,
      quantity: book.quantity,
      imageUrl: book.imageUrl,
      GenreIds: book.genres.map((genre: any) => genre.id),
    });

    this.bookService.selectedImageFile = null;
    this.showEditModal.set(true);
  }

  openSeeMoreModal(book: Book) {
    this.bookService.selectedBook = book;
    this.showSeeMoreModal.set(true);
  }

  openDeleteModal(book: Book) {
    this.bookService.selectedBook = book;
    this.showDeleteModal.set(true);
  }

  closeModal() {
    this.showAddModal.set(false);
    this.showEditModal.set(false);
    this.showDeleteModal.set(false);
    this.showSeeMoreModal.set(false);
    this.bookService.selectedBook = null;
  }

  saveBook() {
    this.isCreating.set(true);

    this.bookService.createBook(
      () => {
        this.closeModal();
        this.isCreating.set(false);
      },
      () => {
        this.isCreating.set(false);
      }
    );
  }

  updateBook() {
    if (!this.bookService.selectedBook) return;

    this.isEditing.set(true);

    this.bookService.updateBook(
      this.bookService.selectedBook,
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
    if (!this.bookService.selectedBook) return;

    this.isDeleting.set(true);
    this.bookService.deleteBook(
      this.bookService.selectedBook.id,
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
