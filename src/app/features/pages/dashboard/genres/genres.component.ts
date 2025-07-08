import { Component, computed, signal } from '@angular/core';
import { DashboardLayoutComponent } from '../components/dashboard-layout/dashboard-layout.component';
import { InputComponent } from '../components/input/input.component';
import { ButtonComponent } from '../components/button/button.component';
import { ModalComponent } from '../components/modal/modal.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GenresCardComponent } from './components/genres-card/genres-card.component';
import { DashboardServiceService } from '../services/dashboard-service.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';

interface Genre {
  id: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-genres',
  imports: [
    DashboardLayoutComponent,
    DashboardLayoutComponent,
    InputComponent,
    ButtonComponent,
    ModalComponent,
    ReactiveFormsModule,
    GenresCardComponent,
    SpinnerComponent,
  ],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.css',
})
export class GenresComponent {
  constructor(
    private dashboardService: DashboardServiceService,
    private toastService: ToastrService
  ) {
    this.loadGenres();
  }
  genres = signal<Genre[]>([]);

  showAddModal = signal(false);
  showEditModal = signal(false);
  showDeleteModal = signal(false);
  isLoadingGenres = signal<boolean>(false);
  isCreating: boolean = false;
  isEditing: boolean = false;
  isDeleting: boolean = false;

  selectedGenre: Genre | null = null;

  search = signal<string>('');

  createGenreForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  editGenreForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  filteredGenres = computed(() => {
    const term = this.search().toLowerCase().trim();
    if (!term) return this.genres();

    return this.genres().filter(
      (genre) =>
        genre.id.toString().includes(term) ||
        genre.name.toLowerCase().includes(term) ||
        genre.description.toLowerCase().includes(term)
    );
  });

  updateSearch(value: string) {
    this.search.set(value);
  }

  openModal() {
    this.showAddModal.set(true);
    this.editGenreForm.reset();
  }

  openEditModal(genre: Genre) {
    this.selectedGenre = genre;
    this.editGenreForm.patchValue(genre);
    this.showEditModal.set(true);
  }

  openDeleteModal(genre: Genre) {
    this.selectedGenre = genre;
    this.showDeleteModal.set(true);
  }

  closeModal() {
    this.showAddModal.set(false);
    this.showEditModal.set(false);
    this.showDeleteModal.set(false);
    this.selectedGenre = null;
  }

  saveGenre() {
    if (this.createGenreForm.invalid) return;

    const token = localStorage.getItem('auth-token');
    if (!token) return;

    this.isCreating = true;

    const payload = {
      name: this.createGenreForm.value.name!,
      description: this.createGenreForm.value.description!,
    };

    this.dashboardService.createGenre(payload, token).subscribe({
      next: (newGenre: Genre) => {
        this.toastService.success('Gênero criado com sucesso');

        this.genres.update((genres) => [...genres, newGenre]);

        this.closeModal();
      },
      error: () => {
        this.toastService.error('Erro ao criar gênero');
        this.isCreating = false;
        this.closeModal();
      },
      complete: () => {
        this.isCreating = false;
      },
    });
  }

  updateGenre() {
    if (this.editGenreForm.invalid || !this.selectedGenre) return;

    const token = localStorage.getItem('auth-token');
    if (!token) return;

    this.isEditing = true;

    const payload = {
      name: this.editGenreForm.value.name!,
      description: this.editGenreForm.value.description!,
    };

    const hasChanged =
      payload.name !== this.selectedGenre.name ||
      payload.description !== this.selectedGenre.description;

    if (!hasChanged) {
      this.closeModal();
      return;
    }

    this.dashboardService
      .editGenre(this.selectedGenre.id, payload, token)
      .subscribe({
        next: (updatedGenre: Genre) => {
          this.toastService.success('Gênero editado com sucesso');
          this.genres.update((genres) =>
            genres.map((g) => (g.id === updatedGenre.id ? updatedGenre : g))
          );
          this.closeModal();
        },
        error: () => {
          this.toastService.error('Erro ao editar gênero');
          this.isEditing = false;
          this.closeModal();
        },
        complete: () => {
          this.isEditing = false;
        },
      });
  }

  confirmDelete() {
    if (!this.selectedGenre) return;

    const token = localStorage.getItem('auth-token');
    if (!token) return;

    this.isDeleting = true;

    this.dashboardService.deleteGenre(this.selectedGenre.id, token).subscribe({
      next: () => {
        this.toastService.success('Gênero deletado com sucesso');

        this.genres.update((genres) =>
          genres.filter((g) => g.id !== this.selectedGenre!.id)
        );

        this.closeModal();
      },
      error: () => {
        this.toastService.error('Erro ao deletar gênero');
        this.isDeleting = false;
        this.closeModal();
      },
      complete: () => {
        this.isDeleting = false;
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

        this.isLoadingGenres.set(false);
      },
      error: (err) => {
        this.toastService.error('Erro ao buscar generos');
        console.error('Erro ao buscar generos', err);
      },
      complete: () => {
        this.isLoadingGenres.set(false);
      },
    });
  }
}
