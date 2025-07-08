import { Component, computed, signal } from '@angular/core';
import { DashboardLayoutComponent } from '../components/dashboard-layout/dashboard-layout.component';
import { InputComponent } from '../components/input/input.component';
import { ButtonComponent } from '../components/button/button.component';
import { ModalComponent } from '../components/modal/modal.component';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { BookByCardComponent } from './components/book-by-card/book-by-card.component';
import { DashboardServiceService } from '../services/dashboard-service.service';
import { Genre } from '../../../../shared/types/dashboard/dashboard-type';
import { ToastrService } from 'ngx-toastr';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';

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

@Component({
  selector: 'app-books',
  imports: [
    DashboardLayoutComponent,
    InputComponent,
    ButtonComponent,
    ModalComponent,
    ReactiveFormsModule,
    BookByCardComponent,
    SpinnerComponent,
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
})
export class BooksComponent {
  constructor(
    private dashboardService: DashboardServiceService,
    private toastService: ToastrService
  ) {
    this.loadBooks();
    this.loadGenres();
  }
  genres = signal<Genre[]>([]);
  books = signal<Book[]>([]);
  search = signal<string>('');
  showAddModal = signal(false);
  showEditModal = signal(false);
  showDeleteModal = signal(false);
  showSeeMoreModal = signal(false);
  isLoadingBooks = signal<boolean>(false);
  isLoadingGenres = signal<boolean>(false);

  isCreating: boolean = false;
  isEditing: boolean = false;
  isDeleting: boolean = false;
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

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImageFile = input.files[0];
      this.createBookForm.get('imageFile')?.setValue(this.selectedImageFile);
    } else {
      this.selectedImageFile = null;
      this.createBookForm.get('imageFile')?.setValue(null);
    }
  }

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

  openAddModal() {
    this.createBookForm.reset();
    this.selectedImageFile = null;
    this.showAddModal.set(true);
  }

  openEditModal(book: any) {
    this.selectedBook = {
      id: book.id,
      title: book.title,
      author: book.author,
      publishYear: book.publishYear,
      description: book.description,
      quantity: book.quantity,
      imageUrl: book.imageUrl,
      GenreIds: book.genres.map((genre: any) => genre.id),
    };

    this.editBookForm.patchValue({
      title: book.title,
      author: book.author,
      publishYear: book.publishYear,
      description: book.description,
      quantity: book.quantity,
      imageUrl: book.imageUrl,
      GenreIds: book.genres.map((genre: any) => genre.id),
    });

    this.selectedImageFile = null;
    this.showEditModal.set(true);
  }

  openSeeMoreModal(book: Book) {
    this.selectedBook = book;
    this.showSeeMoreModal.set(true);
  }

  openDeleteModal(book: Book) {
    this.selectedBook = book;
    this.showDeleteModal.set(true);
  }

  closeModal() {
    this.showAddModal.set(false);
    this.showEditModal.set(false);
    this.showDeleteModal.set(false);
    this.showSeeMoreModal.set(false);
    this.selectedBook = null;
  }

  saveBook() {
    if (this.createBookForm.invalid || !this.selectedImageFile) return;

    const token = localStorage.getItem('auth-token');
    if (!token) return;

    this.isCreating = true;

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
      next: () => {
        this.toastService.success('Livro criado com sucesso');
        this.loadBooks();
        this.closeModal();
      },
      error: (err) => {
        this.toastService.error('Erro ao criar livro');
        this.isEditing = false;
        this.closeModal();
      },
      complete: () => {
        this.isEditing = false;
      },
    });
  }

  updateBook() {
    if (this.editBookForm.invalid || !this.selectedBook) return;

    const token = localStorage.getItem('auth-token');
    if (!token) return;

    this.isEditing = true;

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

    this.dashboardService
      .editBook(this.selectedBook.id, formData, token)
      .subscribe({
        next: () => {
          this.toastService.success('Livro editado com sucesso');
          this.loadBooks();
          this.closeModal();
        },
        error: (err) => {
          this.toastService.error('Erro ao editar livro');
          this.isEditing = false;
          this.closeModal();
        },
        complete: () => {
          this.isEditing = false;
        },
      });
  }

  confirmDelete() {
    if (!this.selectedBook) return;

    const token = localStorage.getItem('auth-token');
    if (!token) return;

    this.isDeleting = true;

    this.dashboardService.deleteBook(this.selectedBook.id, token).subscribe({
      next: () => {
        this.toastService.success('Livro deletado com sucesso');
        this.loadBooks();
        this.closeModal();
      },
      error: (err) => {
        this.toastService.error('Erro ao deletar livro');
        this.isDeleting = false;
        this.closeModal();
      },
      complete: () => {
        this.isDeleting = false;
      },
    });
  }

  loadBooks() {
    const token = localStorage.getItem('auth-token');
    if (!token) return;

    this.isLoadingBooks.set(true);

    this.dashboardService.getAllBooks(token).subscribe({
      next: (res: any) => {
        const booksFromApi = res as Book[];
        this.books.set(booksFromApi);
      },
      error: (err) => {
        this.toastService.error('Erro ao buscar livro');
        this.isLoadingBooks.set(false);
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
      next: (res: any) => {
        const genresFromApi = res as Genre[];
        this.genres.set(genresFromApi);
      },
      error: (err) => {
        this.toastService.error('Erro ao buscar livros');
        this.isLoadingGenres.set(false);
      },
      complete: () => {
        this.isLoadingGenres.set(false);
      },
    });
  }
}
