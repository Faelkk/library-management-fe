import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../../../components/button/button.component';
import { InputComponent } from '../../../components/input/input.component';
import { ModalComponent } from '../../../components/modal/modal.component';
import { SpinnerComponent } from '../../../../../../shared/components/spinner/spinner.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Client } from '../../../clients/clients.component';
import { Book } from '../../../books/books.component';

@Component({
  selector: 'app-loan-edit-modal',
  imports: [
    ButtonComponent,
    InputComponent,
    ModalComponent,
    SpinnerComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './loan-edit-modal.component.html',
  styleUrl: './loan-edit-modal.component.css',
})
export class LoanEditModalComponent {
  @Input() show = false;
  @Input() form!: FormGroup;
  @Input() isLoading = false;
  @Input() isLoadingClients = false;
  @Input() clients: Client[] = [];
  @Input() isLoadingBooks = false;
  @Input() books: Book[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() update = new EventEmitter<void>();
  @Output() selectedImageFile = new EventEmitter<void>();
  @Output() returnDateAtInput = new EventEmitter<string>();
  @Output() returnDateInput = new EventEmitter<string>();
  @Output() loanDateInput = new EventEmitter<string>();

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    this.update.emit();
  }

  onSelect() {
    this.selectedImageFile.emit();
  }

  onEditLoanDateInput(value: string) {
    this.loanDateInput.emit(value);
  }

  onEditReturnDateInput(value: string) {
    this.returnDateInput.emit(value);
  }

  onEditReturnDateAtInput(value: string) {
    this.returnDateAtInput.emit(value);
  }
}
