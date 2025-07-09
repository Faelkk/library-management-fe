import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../components/button/button.component';
import { SpinnerComponent } from '../../../../../../shared/components/spinner/spinner.component';
import { ModalComponent } from '../../../components/modal/modal.component';
import { Genre } from '../../../../../../shared/types/dashboard/dashboard-type';
import { InputComponent } from '../../../components/input/input.component';

@Component({
  selector: 'app-books-edit-modal',
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    SpinnerComponent,
    ModalComponent,
    InputComponent,
  ],
  templateUrl: './books-edit-modal.component.html',
  styleUrl: './books-edit-modal.component.css',
})
export class BooksEditModalComponent {
  @Input() show = false;
  @Input() form!: FormGroup;
  @Input() isLoading = false;
  @Input() isLoadingGenres = false;
  @Input() genres: Genre[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() update = new EventEmitter<void>();
  @Output() selectedImageFile = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    this.update.emit();
  }

  onSelect() {
    this.selectedImageFile.emit();
  }
}
