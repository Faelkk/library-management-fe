import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../../../components/button/button.component';
import { InputComponent } from '../../../components/input/input.component';
import { SpinnerComponent } from '../../../../../../shared/components/spinner/spinner.component';
import { ModalComponent } from '../../../components/modal/modal.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Book } from '../../../books/books.component';
import { Client } from '../../../clients/clients.component';

@Component({
  selector: 'app-loan-create-modal',
  imports: [
    ButtonComponent,
    InputComponent,
    SpinnerComponent,
    ModalComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './loan-create-modal.component.html',
  styleUrl: './loan-create-modal.component.css',
})
export class LoanCreateModalComponent {
  @Input() show = false;
  @Input() form!: FormGroup;
  @Input() isLoading = false;

  @Input() isLoadingBooks = false;
  @Input() books: Book[] = [];

  @Input() isLoadingClients = false;
  @Input() clients: Client[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
  @Output() returnDateInput = new EventEmitter<string>();
  @Output() loanDateInput = new EventEmitter<string>();

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    this.save.emit();
  }

  onCreateLoanDateInput(value: string) {
    this.loanDateInput.emit(value);
  }

  onCreateReturnDateInput(value: string) {
    this.returnDateInput.emit(value);
  }
}
