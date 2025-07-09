import { computed, Injectable, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  CreateGenrePayload,
  EditGenrePayload,
  Genre,
} from '../../../../shared/types/dashboard/dashboard-type';
import { DashboardServiceService } from '../services/dashboard-service.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class GenresService {
  constructor(
    private dashboardService: DashboardServiceService,
    private toastService: ToastrService
  ) {}

  genres = signal<Genre[]>([]);
  search = signal<string>('');
  isLoadingGenres = signal<boolean>(false);

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

  createGenre(onSuccess: () => void, onError: () => void) {
    if (this.createGenreForm.invalid) return;

    const token = localStorage.getItem('auth-token');

    if (!token) return;

    const value = this.createGenreForm.value;

    if (!value.name || !value.description) {
      this.toastService.error('Erro ao pegar valores pra criar genêros');
      return;
    }

    const payload: CreateGenrePayload = {
      name: value.name,
      description: value.description,
    };

    this.dashboardService.createGenre(payload, token).subscribe({
      next: (newGenre) => {
        this.toastService.success('Genêros criado com sucesso');
        this.genres.update((prev) => [...prev, newGenre]);
        onSuccess();
      },
      error: () => {
        this.toastService.error('Erro ao criar genêros');
        onError();
      },
    });
  }

  updateGenre(
    selectedGenre: Genre,
    onSuccess: () => void,
    onError: () => void
  ) {
    if (this.editGenreForm.invalid) return;

    const token = localStorage.getItem('auth-token');
    if (!token) return;

    const value = this.editGenreForm.value;

    if (!value.name || !value.description) {
      this.toastService.error('Erro ao pegar valores pra editar genêros');
      return;
    }

    const payload: EditGenrePayload = {
      name: value.name,
      description: value.description,
    };

    const hasChanged =
      payload.name !== selectedGenre.name ||
      payload.description !== selectedGenre.description;

    if (!hasChanged) {
      onSuccess();
      return;
    }

    this.dashboardService
      .editGenre(selectedGenre.id, payload, token)
      .subscribe({
        next: (updatedGenre) => {
          this.toastService.success('Genêros editado com sucesso');
          this.genres.update((prev) =>
            prev.map((u) => (u.id === updatedGenre.id ? updatedGenre : u))
          );
          onSuccess();
        },
        error: () => {
          this.toastService.error('Erro ao editar genêros');
          onError();
        },
      });
  }

  deleteGenre(genreId: number, onSuccess: () => void, onError: () => void) {
    const token = localStorage.getItem('auth-token');
    if (!token) return;

    this.dashboardService.deleteGenre(genreId, token).subscribe({
      next: () => {
        this.toastService.success('Genêros deletado com sucesso');
        this.genres.update((prev) => prev.filter((u) => u.id !== genreId));
        onSuccess();
      },
      error: () => {
        this.toastService.error('Erro ao deletar genêros');
        onError();
      },
    });
  }
}
