import { Component, computed, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DashboardLayoutComponent } from '../components/dashboard-layout/dashboard-layout.component';
import { InputComponent } from '../components/input/input.component';
import { ButtonComponent } from '../components/button/button.component';
import { ModalComponent } from '../components/modal/modal.component';
import { LoanCardComponent } from './components/loan-card/loan-card.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { DashboardServiceService } from '../services/dashboard-service.service';
import { Client } from '../clients/clients.component';
import { Book } from '../books/books.component';
import { ToastrService } from 'ngx-toastr';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { LoansService } from './loans.service';
import { LoanDeleteModalComponent } from './components/loan-delete-modal/loan-delete-modal.component';
import { LoanEditModalComponent } from './components/loan-edit-modal/loan-edit-modal.component';
import { LoanCreateModalComponent } from './components/loan-create-modal/loan-create-modal.component';
import { LoanListComponent } from './components/loan-list/loan-list.component';
import { LoanHeaderComponent } from './components/loan-header/loan-header.component';

interface Loan {
  id: number;
  bookId: number;
  clientId: number;
  loanDate: Date;
  returnDate: Date;
  returnedAt?: Date | null;
}

@Component({
  selector: 'app-loans',
  imports: [
    DashboardLayoutComponent,
    LoanDeleteModalComponent,
    LoanEditModalComponent,
    LoanCreateModalComponent,
    LoanListComponent,
    LoanHeaderComponent,
  ],
  templateUrl: './loans.component.html',
  styleUrl: './loans.component.css',
})
export class LoansComponent {
  constructor(public loanService: LoansService) {
    this.loanService.loadBooks();
    this.loanService.loadLoans();
    this.loanService.loadClients();
  }

  showDropdownYearOpen = signal(false);
  showDropdownMonthOpen = signal(false);
  showAddModal = signal(false);
  showEditModal = signal(false);
  showDeleteModal = signal(false);
  isCreating = signal(false);
  isEditing = signal(false);
  isDeleting = signal(false);

  selectedLoan: Loan | null = null;

  get books() {
    return this.loanService.books;
  }

  get clients() {
    return this.loanService.clients;
  }

  get filteredLoans() {
    return this.loanService.filteredLoans;
  }

  get isLoadingBooks() {
    return this.loanService.isLoadingBooks;
  }

  get isLoadingLoans() {
    return this.loanService.isLoadingLoans;
  }
  get isLoadingClients() {
    return this.loanService.isLoadingClients;
  }

  updateSearch(value: string) {
    this.loanService.updateSearch(value);
  }

  filterLoans() {
    this.loanService.search.set(this.loanService.search());
  }

  openAddModal() {
    this.showAddModal.set(true);
    this.loanService.createLoanForm.reset();
  }

  toggleDropdownMonth() {
    const isOpen = this.showDropdownMonthOpen();
    this.showDropdownMonthOpen.set(!isOpen);
    if (!isOpen) {
      this.showDropdownYearOpen.set(false);
    }
  }

  toggleDropdownYear() {
    const isOpen = this.showDropdownYearOpen();
    this.showDropdownYearOpen.set(!isOpen);
    if (!isOpen) {
      this.showDropdownMonthOpen.set(false);
    }
  }

  displayMonth = computed(() =>
    this.loanService.selectedMonth()
      ? this.loanService.months.find(
          (m) => m.value === this.loanService.selectedMonth()
        )?.label ?? 'Mês'
      : 'Mês'
  );

  displayYear = computed(
    () => this.loanService.selectedYear().toString() ?? 'Ano'
  );

  yearOptions = computed(() =>
    this.loanService.years.map((y) => ({ value: y, label: y.toString() }))
  );

  onSelectMonth(value: number) {
    this.loanService.selectedMonth.set(value);
    this.filterLoans();
    this.showDropdownMonthOpen.set(false);
  }

  onSelectYear(value: number) {
    this.loanService.selectedYear.set(value);
    this.filterLoans();
    this.showDropdownYearOpen.set(false);
  }

  openEditModal(loan: Loan) {
    this.selectedLoan = loan;
    this.loanService.editLoanForm.patchValue({
      bookId: loan.bookId,
      clientId: loan.clientId,
      loanDate: this.formatDateOutput(loan.loanDate),
      returnDate: this.formatDateOutput(loan.returnDate),
    });
    this.showEditModal.set(true);
  }

  openDeleteModal(loan: Loan) {
    this.selectedLoan = loan;
    this.showDeleteModal.set(true);
  }

  closeModal() {
    this.showAddModal.set(false);
    this.showEditModal.set(false);
    this.showDeleteModal.set(false);
    this.selectedLoan = null;
  }

  formatDateOutput(dateInput: string | Date): string {
    const date =
      typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  formatDateInput(value: string): string {
    let digits = value.replace(/\D/g, '');
    digits = digits.substring(0, 8);

    if (digits.length >= 5) {
      return digits.replace(/(\d{2})(\d{2})(\d{1,4})/, '$1/$2/$3');
    } else if (digits.length >= 3) {
      return digits.replace(/(\d{2})(\d{1,2})/, '$1/$2');
    } else if (digits.length >= 1) {
      return digits.replace(/(\d{1,2})/, '$1');
    }
    return digits;
  }

  onCreateLoanDateInput(value: string) {
    const formatted = this.formatDateInput(value);
    this.loanService.createLoanForm
      .get('loanDate')
      ?.setValue(formatted, { emitEvent: false });
  }

  onCreateReturnDateInput(value: string) {
    const formatted = this.formatDateInput(value);
    this.loanService.createLoanForm
      .get('returnDate')
      ?.setValue(formatted, { emitEvent: false });
  }

  onEditLoanDateInput(value: string) {
    const formatted = this.formatDateInput(value);
    this.loanService.editLoanForm
      .get('loanDate')
      ?.setValue(formatted, { emitEvent: false });
  }

  onEditReturnDateInput(value: string) {
    const formatted = this.formatDateInput(value);
    this.loanService.editLoanForm
      .get('returnDate')
      ?.setValue(formatted, { emitEvent: false });
  }

  onEditReturnDateAtInput(value: string) {
    const formatted = this.formatDateInput(value);
    this.loanService.editLoanForm
      .get('returnedAt')
      ?.setValue(formatted, { emitEvent: false });
  }

  saveLoan() {
    this.isCreating.set(true);

    this.loanService.createLoan(
      () => {
        this.closeModal();
        this.isCreating.set(false);
      },
      () => {
        this.isCreating.set(false);
      }
    );
  }

  updateLoan() {
    if (!this.selectedLoan) return;

    this.isEditing.set(true);

    this.loanService.updateLoan(
      this.selectedLoan,
      () => {
        this.closeModal();
        this.isEditing.set(false);
      },
      () => {
        this.isEditing.set(false);
      }
    );
  }

  confirmDelete() {
    if (!this.selectedLoan) return;

    this.isDeleting.set(true);
    this.loanService.deleteLoan(
      this.selectedLoan.id,
      () => {
        this.closeModal();
        this.isDeleting.set(false);
      },
      () => {
        this.isDeleting.set(false);
      }
    );
  }
}
