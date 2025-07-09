import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../components/button/button.component';
import { InputComponent } from '../../../components/input/input.component';
import { ModalComponent } from '../../../components/modal/modal.component';

@Component({
  selector: 'app-genre-create-modal',
  imports: [
    ButtonComponent,
    InputComponent,
    ModalComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './genre-create-modal.component.html',
  styleUrl: './genre-create-modal.component.css',
})
export class GenreCreateModalComponent {
  @Input() show = false;
  @Input() form!: FormGroup;
  @Input() isLoading = false;
  @Input() isValidClassName = false;

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    this.save.emit();
  }
}
