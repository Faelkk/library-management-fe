import { computed, Injectable, signal } from '@angular/core';
import { DashboardServiceService } from '../services/dashboard-service.service';
import { ToastrService } from 'ngx-toastr';
import { Loan } from '../../../../shared/types/dashboard/dashboard-type';
import { Client } from '../clients/clients.component';
import { Book } from '../books/books.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class LoansService {
  constructor(
    private dashboardService: DashboardServiceService,
    private toastService: ToastrService
  ) {
    this.loadBooks();
    this.loadClients();
    this.loadLoans();
  }
  books = signal<Book[]>([]);
  clients = signal<Client[]>([]);
  loans = signal<Loan[]>([]);
  search = signal<string>('');

  isLoadingBooks = signal<boolean>(false);
  isLoadingClients = signal<boolean>(false);
  isLoadingLoans = signal<boolean>(false);

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

  createLoan(onSuccess: () => void, onError: () => void) {
    if (this.createLoanForm.invalid) return;

    const token = localStorage.getItem('auth-token');
    if (!token) return;

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
          onSuccess();
        },
        error: (err) => {
          this.toastService.error('Erro ao criar empréstimo');
          onError();
        },
      });
  }

  updateLoan(selectedLoan: Loan, onSuccess: () => void, onError: () => void) {
    if (this.editLoanForm.invalid) return;

    const token = localStorage.getItem('auth-token');
    if (!token) return;

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
        selectedLoan.id,
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
          onSuccess();
        },
        error: (err) => {
          this.toastService.error('Erro ao editar empréstimo');
          onError();
        },
      });
  }

  deleteLoan(loanId: number, onSuccess: () => void, onError: () => void) {
    const token = localStorage.getItem('auth-token');
    if (!token) return;

    this.dashboardService.deleteLoan(loanId, token).subscribe({
      next: () => {
        this.toastService.success('Empréstimo deletado com sucesso!');
        this.loans.update((loans) =>
          loans.filter((loan) => loan.id !== loanId)
        );
        onSuccess();
      },
      error: (err) => {
        this.toastService.error('Erro ao deletar empréstimo');
        onError();
      },
    });
  }

  loadBooks() {
    const token = localStorage.getItem('auth-token');
    if (!token) return;

    this.isLoadingBooks.set(true);
    this.dashboardService.getAllBooks(token).subscribe({
      next: (res: Book[]) => {
        this.books.set(res);
      },
      error: () => {
        this.toastService.error('Erro ao buscar livros');
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
      next: (res: Client[]) => {
        this.clients.set(res);
      },
      error: () => {
        this.toastService.error('Erro ao buscar clientes');
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
