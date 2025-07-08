import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../components/button/button.component';
import { InputComponent } from '../../../components/input/input.component';
import { ModalComponent } from '../../../components/modal/modal.component';

@Component({
  selector: 'app-user-create-modal',
  standalone: true,
  imports: [
    ModalComponent,
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './user-create-modal.component.html',
})
export class UserCreateModalComponent {
  @Input() show = false;
  @Input() form!: FormGroup;
  @Input() isLoading = false;

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    this.save.emit();
  }
}
