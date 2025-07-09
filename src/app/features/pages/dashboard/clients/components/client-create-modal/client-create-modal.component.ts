import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../components/button/button.component';
import { InputComponent } from '../../../components/input/input.component';
import { ModalComponent } from '../../../components/modal/modal.component';

@Component({
  selector: 'app-client-create-modal',
  imports: [
    ButtonComponent,
    InputComponent,
    ModalComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './client-create-modal.component.html',
  styleUrl: './client-create-modal.component.css',
})
export class ClientCreateModalComponent {
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
