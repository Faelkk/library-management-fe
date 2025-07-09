import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Genre } from '../../../../../../shared/types/dashboard/dashboard-type';
import { SpinnerComponent } from '../../../../../../shared/components/spinner/spinner.component';
import { GenresCardComponent } from '../genres-card/genres-card.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { InputComponent } from '../../../components/input/input.component';

@Component({
  selector: 'app-genre-list',
  imports: [
    SpinnerComponent,
    GenresCardComponent,
    ButtonComponent,
    InputComponent,
  ],
  templateUrl: './genre-list.component.html',
  styleUrl: './genre-list.component.css',
})
export class GenreListComponent {
  @Input() genres: Genre[] = [];
  @Input() isLoading = false;

  @Output() searchChange = new EventEmitter<string>();
  @Output() editUser = new EventEmitter<Genre>();
  @Output() deleteUser = new EventEmitter<Genre>();
  @Output() addUser = new EventEmitter<void>();

  onSearchChange(value: string) {
    this.searchChange.emit(value);
  }

  onEdit(genre: Genre) {
    this.editUser.emit(genre);
  }

  onDelete(genre: Genre) {
    this.deleteUser.emit(genre);
  }

  onAddGenre() {
    this.addUser.emit();
  }
}
