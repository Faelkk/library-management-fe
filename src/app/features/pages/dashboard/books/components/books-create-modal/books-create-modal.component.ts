import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../../../components/modal/modal.component';
import { SpinnerComponent } from '../../../../../../shared/components/spinner/spinner.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { Genre } from '../../../../../../shared/types/dashboard/dashboard-type';
import { InputComponent } from '../../../components/input/input.component';

@Component({
  selector: 'app-books-create-modal',
  imports: [
    ReactiveFormsModule,
    ModalComponent,
    SpinnerComponent,
    ButtonComponent,
    InputComponent,
  ],
  templateUrl: './books-create-modal.component.html',
  styleUrl: './books-create-modal.component.css',
})
export class BooksCreateModalComponent {
  @Input() show = false;
  @Input() form!: FormGroup;
  @Input() isLoading = false;

  @Input() isLoadingGenres = false;
  @Input() genres: Genre[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
  @Output() select = new EventEmitter<Event>();

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    this.save.emit();
  }

  onSelect(event: Event) {
    this.select.emit(event);
  }
}
