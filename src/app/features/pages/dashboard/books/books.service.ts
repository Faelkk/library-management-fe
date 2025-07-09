import { computed, Injectable, signal } from '@angular/core';
import { DashboardServiceService } from '../services/dashboard-service.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Genre } from '../../../../shared/types/dashboard/dashboard-type';
import { Book } from './books.component';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(
    private dashboardService: DashboardServiceService,
    private toastService: ToastrService
  ) {
    this.loadBooks();
    this.loadGenres();
  }
  books = signal<Book[]>([]);
  genres = signal<Genre[]>([]);
  search = signal<string>('');
  isLoadingBooks = signal<boolean>(false);
  isLoadingGenres = signal<boolean>(false);
  selectedBook: Book | null = null;
  selectedImageFile: File | null = null;

  createBookForm = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    publishYear: new FormControl<number | null>(null, Validators.required),
    description: new FormControl('', Validators.required),
    quantity: new FormControl<number | null>(null, Validators.required),
    imageFile: new FormControl<File | null>(null, Validators.required),
    GenreIds: new FormControl<number[]>([], Validators.required),
  });

  editBookForm = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    publishYear: new FormControl<number | null>(null, Validators.required),
    description: new FormControl('', Validators.required),
    quantity: new FormControl<number | null>(null, Validators.required),
    imageUrl: new FormControl('', Validators.required),
    GenreIds: new FormControl<number[]>([], [Validators.required]),
  });

  filteredBooks = computed(() => {
    const term = this.search().toLowerCase().trim();
    if (!term) return this.books();

    return this.books().filter(
      (book) =>
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term) ||
        book.publishYear.toString().toLowerCase().includes(term) ||
        book.id.toString().includes(term)
    );
  });

  updateSearch(value: string) {
    this.search.set(value);
  }
  createBook(onSuccess: () => void, onError: () => void) {
    if (this.createBookForm.invalid || !this.selectedImageFile) return;

    const token = localStorage.getItem('auth-token');
    if (!token) return;

    const formData = new FormData();
    formData.append('Title', this.createBookForm.value.title!);
    formData.append('Author', this.createBookForm.value.author!);
    formData.append(
      'PublishYear',
      this.createBookForm.value.publishYear!.toString()
    );
    formData.append('Description', this.createBookForm.value.description!);
    formData.append('Quantity', this.createBookForm.value.quantity!.toString());
    formData.append('ImageFile', this.selectedImageFile!);

    const genreIds = this.createBookForm.value.GenreIds || [];
    genreIds.forEach((id, index) => {
      formData.append(`GenreIds[${index}]`, id.toString());
    });

    this.dashboardService.createBook(formData, token).subscribe({
      next: (createdBook) => {
        this.toastService.success('Livro criado com sucesso');
        this.books.update((books) => [...books, createdBook]);
        onSuccess();
      },
      error: (err) => {
        this.toastService.error('Erro ao criar livro');
        onError();
      },
    });
  }

  updateBook(selectedBook: Book, onSuccess: () => void, onError: () => void) {
    if (this.editBookForm.invalid) return;

    const token = localStorage.getItem('auth-token');
    if (!token) return;

    const formData = new FormData();
    formData.append('Title', this.editBookForm.value.title!);
    formData.append('Author', this.editBookForm.value.author!);
    formData.append(
      'PublishYear',
      this.editBookForm.value.publishYear!.toString()
    );
    formData.append('Description', this.editBookForm.value.description!);
    formData.append('Quantity', this.editBookForm.value.quantity!.toString());

    if (this.selectedImageFile) {
      formData.append('ImageFile', this.selectedImageFile);
    }

    this.dashboardService.editBook(selectedBook.id, formData, token).subscribe({
      next: (updatedBook) => {
        this.toastService.success('Livro editado com sucesso');
        this.books.update((books) =>
          books.map((book) => (book.id === updatedBook.id ? updatedBook : book))
        );
        onSuccess();
      },
      error: (err) => {
        this.toastService.error('Erro ao editar livro');
        onError();
      },
    });
  }

  deleteBook(bookId: number, onSuccess: () => void, onError: () => void) {
    if (!this.selectedBook) return;

    const token = localStorage.getItem('auth-token');
    if (!token) return;

    this.dashboardService.deleteBook(this.selectedBook.id, token).subscribe({
      next: () => {
        this.toastService.success('Livro deletado com sucesso');
        this.books.update((books) =>
          books.filter((book) => book.id !== this.selectedBook!.id)
        );
        onSuccess();
      },
      error: (err) => {
        this.toastService.error('Erro ao deletar livro');
        onError();
      },
    });
  }

  loadBooks() {
    const token = localStorage.getItem('auth-token');
    if (!token) return;

    this.isLoadingBooks.set(true);
    this.dashboardService.getAllBooks(token).subscribe({
      next: (res: Book[]) => {
        this.books.set(res);
      },
      error: () => {
        this.toastService.error('Erro ao buscar livros');
      },
      complete: () => {
        this.isLoadingBooks.set(false);
      },
    });
  }

  loadGenres() {
    const token = localStorage.getItem('auth-token');
    if (!token) return;

    this.isLoadingGenres.set(true);
    this.dashboardService.getAllGenres(token).subscribe({
      next: (res: Genre[]) => {
        this.genres.set(res);
      },
      error: () => {
        this.toastService.error('Erro ao buscar genêros');
      },
      complete: () => {
        this.isLoadingGenres.set(false);
      },
    });
  }
}
