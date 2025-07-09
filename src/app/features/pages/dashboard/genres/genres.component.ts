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
import { GenresService } from './genres.service';
import { GenreHeaderComponent } from './components/genre-header/genre-header.component';
import { GenreListComponent } from './components/genre-list/genre-list.component';
import { GenreCreateModalComponent } from './components/genre-create-modal/genre-create-modal.component';
import { GenreEditModalComponent } from './components/genre-edit-modal/genre-edit-modal.component';
import { GenreDeleteModalComponent } from './components/genre-delete-modal/genre-delete-modal.component';

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
    ReactiveFormsModule,
    GenreHeaderComponent,
    GenreListComponent,
    GenreCreateModalComponent,
    GenreEditModalComponent,
    GenreDeleteModalComponent,
  ],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.css',
})
export class GenresComponent {
  constructor(public genreService: GenresService) {
    this.genreService.loadGenres();
  }

  get genres() {
    return this.genreService.genres;
  }

  get filteredGenres() {
    return this.genreService.filteredGenres;
  }

  get isLoadingGenres() {
    return this.genreService.isLoadingGenres;
  }

  showAddModal = signal(false);
  showEditModal = signal(false);
  showDeleteModal = signal(false);
  isCreating = signal(false);
  isEditing = signal(false);
  isDeleting = signal(false);

  selectedGenre: Genre | null = null;

  updateSearch(value: string) {
    this.genreService.updateSearch(value);
  }

  openModal() {
    this.showAddModal.set(true);
    this.genreService.editGenreForm.reset();
  }

  openEditModal(genre: Genre) {
    this.selectedGenre = genre;
    this.genreService.editGenreForm.patchValue(genre);
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
    this.isCreating.set(true);

    this.genreService.createGenre(
      () => {
        this.closeModal();
        this.isCreating.set(false);
      },
      () => {
        this.isCreating.set(false);
      }
    );
  }

  updateGenre() {
    if (!this.selectedGenre) return;

    this.isEditing.set(true);

    this.genreService.updateGenre(
      this.selectedGenre,
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
    if (!this.selectedGenre) return;

    this.isDeleting.set(true);
    this.genreService.deleteGenre(
      this.selectedGenre.id,
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
