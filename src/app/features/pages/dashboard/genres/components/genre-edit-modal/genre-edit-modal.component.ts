import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../components/input/input.component';
import { ModalComponent } from '../../../components/modal/modal.component';
import { ButtonComponent } from '../../../components/button/button.component';

@Component({
  selector: 'app-genre-edit-modal',
  imports: [
    InputComponent,
    ModalComponent,
    ReactiveFormsModule,
    ButtonComponent,
  ],
  templateUrl: './genre-edit-modal.component.html',
  styleUrl: './genre-edit-modal.component.css',
})
export class GenreEditModalComponent {
  @Input() show = false;
  @Input() form!: FormGroup;
  @Input() isLoading = false;

  @Output() close = new EventEmitter<void>();
  @Output() update = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    this.update.emit();
  }
}
