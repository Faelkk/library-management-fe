import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../components/button/button.component';
import { InputComponent } from '../../../components/input/input.component';
import { ModalComponent } from '../../../components/modal/modal.component';

@Component({
  selector: 'app-user-edit-modal',
  standalone: true,
  imports: [
    ModalComponent,
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './user-edit-modal.component.html',
})
export class UserEditModalComponent {
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
