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
    InputComponent,
    ButtonComponent,
    ModalComponent,
    ReactiveFormsModule,
    LoanCardComponent,
    DropdownComponent,
    SpinnerComponent,
  ],
  templateUrl: './loans.component.html',
  styleUrl: './loans.component.css',
})
export class LoansComponent {
  constructor(
    private dashboardService: DashboardServiceService,
    private toastService: ToastrService
  ) {
    this.loadBooks();
    this.loadClients();
    this.loadLoans();
  }

  clients = signal<Client[]>([]);
  books = signal<Book[]>([]);
  loans = signal<Loan[]>([]);

  showDropdownYearOpen = signal(false);
  showDropdownMonthOpen = signal(false);
  showAddModal = signal(false);
  showEditModal = signal(false);
  showDeleteModal = signal(false);
  isCreating: boolean = false;
  isEditing: boolean = false;
  isDeleting: boolean = false;
  isLoadingLoans = signal<boolean>(false);
  isLoadingBooks = signal<boolean>(true);
  isLoadingClients = signal<boolean>(true);

  selectedLoan: Loan | null = null;

  search = signal<string>('');
  selectedMonth = signal(new Date().getMonth() + 1);
  selectedYear = signal(new Date().getFullYear());

  months = [
    { value: 1, label: 'Janeiro' },
    { value: 2, label: 'Fevereiro' },
    { value: 3, label: 'Março' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Maio' },
    { value: 6, label: 'Junho' },
    { value: 7, label: 'Julho' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Setembro' },
    { value: 10, label: 'Outubro' },
    { value: 11, label: 'Novembro' },
    { value: 12, label: 'Dezembro' },
  ];

  years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

  createLoanForm = new FormGroup({
    bookId: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
    ]),
    clientId: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
    ]),
    loanDate: new FormControl('', [Validators.required]),
    returnDate: new FormControl('', [Validators.required]),
  });

  editLoanForm = new FormGroup({
    bookId: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
    ]),
    clientId: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
    ]),
    loanDate: new FormControl('', [Validators.required]),
    returnDate: new FormControl('', [Validators.required]),
    returnedAt: new FormControl(''),
  });

  filteredLoans = computed(() => {
    const term = this.search().toLowerCase().trim();
    const selectedMonth = this.selectedMonth();
    const selectedYear = this.selectedYear();

    return this.loans().filter((loan) => {
      const matchesSearch =
        !term ||
        loan.id.toString().includes(term) ||
        this.getBookName(loan.bookId).toLowerCase().includes(term) ||
        this.getUserName(loan.clientId).toLowerCase().includes(term);

      const matchesMonth =
        !selectedMonth ||
        new Date(loan.loanDate).getMonth() + 1 === selectedMonth;

      const matchesYear =
        !selectedYear || new Date(loan.loanDate).getFullYear() === selectedYear;

      return matchesSearch && matchesMonth && matchesYear;
    });
  });

  getBookName(bookId: number) {
    return (
      this.books().find((b) => b.id === bookId)?.title || 'Livro desconhecido'
    );
  }

  getUserName(clientId: number) {
    return (
      this.clients().find((u) => u.id === clientId)?.name ||
      'Usuário desconhecido'
    );
  }

  updateSearch(value: string) {
    this.search.set(value);
  }

  filterLoans() {
    this.search.set(this.search());
  }

  openAddModal() {
    this.showAddModal.set(true);
    this.createLoanForm.reset();
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
    this.selectedMonth()
      ? this.months.find((m) => m.value === this.selectedMonth())?.label ??
        'Mês'
      : 'Mês'
  );

  displayYear = computed(() => this.selectedYear().toString() ?? 'Ano');

  yearOptions = computed(() =>
    this.years.map((y) => ({ value: y, label: y.toString() }))
  );

  onSelectMonth(value: number) {
    this.selectedMonth.set(value);
    this.filterLoans();
    this.showDropdownMonthOpen.set(false);
  }

  onSelectYear(value: number) {
    this.selectedYear.set(value);
    this.filterLoans();
    this.showDropdownYearOpen.set(false);
  }

  openEditModal(loan: Loan) {
    this.selectedLoan = loan;
    this.editLoanForm.patchValue({
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
    this.createLoanForm
      .get('loanDate')
      ?.setValue(formatted, { emitEvent: false });
  }

  onCreateReturnDateInput(value: string) {
    const formatted = this.formatDateInput(value);
    this.createLoanForm
      .get('returnDate')
      ?.setValue(formatted, { emitEvent: false });
  }

  onEditLoanDateInput(value: string) {
    const formatted = this.formatDateInput(value);
    this.editLoanForm
      .get('loanDate')
      ?.setValue(formatted, { emitEvent: false });
  }

  onEditReturnDateInput(value: string) {
    const formatted = this.formatDateInput(value);
    this.editLoanForm
      .get('returnDate')
      ?.setValue(formatted, { emitEvent: false });
  }

  onEditReturnDateAtInput(value: string) {
    const formatted = this.formatDateInput(value);
    this.editLoanForm
      .get('returnedAt')
      ?.setValue(formatted, { emitEvent: false });
  }

  parseDateString(dateStr: string): Date | null {
    const parts = dateStr.split('/');
    if (parts.length !== 3) return null;

    const day = Number(parts[0]);
    const month = Number(parts[1]) - 1;
    const year = Number(parts[2]);

    const date = new Date(year, month, day);

    if (
      date.getFullYear() === year &&
      date.getMonth() === month &&
      date.getDate() === day
    ) {
      return date;
    }
    return null;
  }

  saveLoan() {
    if (this.createLoanForm.invalid) return;

    const token = localStorage.getItem('auth-token');
    if (!token) return;

    this.isCreating = true;

    const loanDate = this.parseDateString(this.createLoanForm.value.loanDate!);
    const returnDate = this.parseDateString(
      this.createLoanForm.value.returnDate!
    );

    if (!loanDate || !returnDate) {
      this.toastService.error('Datas inválidas. Use o formato dd/mm/aaaa.');
      return;
    }

    this.dashboardService
      .createLoan(
        {
          bookId: this.createLoanForm.value.bookId!,
          clientId: this.createLoanForm.value.clientId!,
          loanDate: loanDate.toISOString(),
          returnDate: returnDate.toISOString(),
        },
        token
      )
      .subscribe({
        next: (createdLoan: Loan) => {
          this.toastService.success('Empréstimo criado com sucesso!');
          this.loans.update((loans) => [...loans, createdLoan]);
          this.closeModal();
        },
        error: (err) => {
          this.toastService.error('Erro ao criar empréstimo');
          this.isCreating = false;
          this.closeModal();
        },
        complete: () => {
          this.isCreating = false;
        },
      });
  }

  updateLoan() {
    if (this.editLoanForm.invalid || !this.selectedLoan) return;

    const token = localStorage.getItem('auth-token');
    if (!token) return;

    this.isEditing = true;

    const loanDateValue = this.editLoanForm.value.loanDate;
    const returnDateValue = this.editLoanForm.value.returnDate;
    const returnedAtValue = this.editLoanForm.value.returnedAt;

    if (!loanDateValue || !returnDateValue) {
      this.toastService.error(
        'Datas de empréstimo e retorno não podem estar vazias.'
      );
      return;
    }

    const loanDate = this.parseDateString(loanDateValue);
    const returnDate = this.parseDateString(returnDateValue);
    const returnedAt = returnedAtValue
      ? this.parseDateString(returnedAtValue)
      : null;

    if (!loanDate || !returnDate || (returnedAtValue && !returnedAt)) {
      this.toastService.error('Datas inválidas. Use o formato dd/mm/aaaa.');
      return;
    }

    this.dashboardService
      .editLoan(
        this.selectedLoan.id,
        {
          bookId: this.editLoanForm.value.bookId!,
          clientId: this.editLoanForm.value.clientId!,
          LoanDate: loanDate.toISOString(),
          returnDate: returnDate.toISOString(),
          returnedAt: returnedAt ? returnedAt.toISOString() : undefined,
        },
        token
      )
      .subscribe({
        next: (updatedLoan: Loan) => {
          this.toastService.success('Empréstimo editado com sucesso!');
          this.loans.update((loans) =>
            loans.map((loan) =>
              loan.id === updatedLoan.id ? updatedLoan : loan
            )
          );
          this.closeModal();
        },
        error: (err) => {
          this.toastService.error('Erro ao editar empréstimo');
          this.isEditing = false;
          this.closeModal();
        },
        complete: () => {
          this.isEditing = false;
        },
      });
  }

  confirmDelete() {
    if (!this.selectedLoan) return;

    const token = localStorage.getItem('auth-token');
    if (!token) return;

    this.isDeleting = true;

    this.dashboardService.deleteLoan(this.selectedLoan.id, token).subscribe({
      next: () => {
        this.toastService.success('Empréstimo deletado com sucesso!');
        this.loans.update((loans) =>
          loans.filter((loan) => loan.id !== this.selectedLoan!.id)
        );
        this.closeModal();
      },
      error: (err) => {
        this.toastService.error('Erro ao deletar empréstimo');
        this.isDeleting = false;
        this.closeModal();
      },
      complete: () => {
        this.isDeleting = false;
      },
    });
  }

  loadBooks() {
    const token = localStorage.getItem('auth-token');

    if (!token) return;

    this.isLoadingBooks.set(true);

    this.dashboardService.getAllBooks(token).subscribe({
      next: (res: any) => {
        const booksFromApi = res as Book[];
        this.books.set(booksFromApi);
      },
      error: (err) => {
        this.toastService.error('Erro ao buscar livros');
        this.isLoadingBooks.set(false);
      },
      complete: () => {
        this.isLoadingBooks.set(false);
      },
    });
  }

  loadClients() {
    const token = localStorage.getItem('auth-token');

    if (!token) return;

    this.isLoadingClients.set(true);

    this.dashboardService.getAllClients(token).subscribe({
      next: (res: any) => {
        const clientsFromApi = res as Client[];
        this.clients.set(clientsFromApi);
      },
      error: (err) => {
        this.toastService.error('Erro ao buscar clientes');
        this.isLoadingClients.set(false);
      },
      complete: () => {
        this.isLoadingClients.set(false);
      },
    });
  }

  loadLoans() {
    const token = localStorage.getItem('auth-token');

    if (!token) return;

    this.isLoadingLoans.set(true);

    this.dashboardService.getAllLoans(token).subscribe({
      next: (res: any) => {
        const loansFromApi = res as Loan[];
        this.loans.set(loansFromApi);
      },
      error: (err) => {
        this.toastService.error('Erro ao buscar empréstimos');
        this.isLoadingLoans.set(false);
      },
      complete: () => {
        this.isLoadingLoans.set(false);
      },
    });
  }
}
