import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../../components/input/input.component';
import { ModalComponent } from '../../../components/modal/modal.component';
import { ButtonComponent } from '../../../components/button/button.component';

@Component({
  selector: 'app-client-edit-modal',
  imports: [
    InputComponent,
    ModalComponent,
    ReactiveFormsModule,
    ButtonComponent,
  ],
  templateUrl: './client-edit-modal.component.html',
  styleUrl: './client-edit-modal.component.css',
})
export class ClientEditModalComponent {
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
