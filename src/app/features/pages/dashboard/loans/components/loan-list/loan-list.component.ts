import { Component, EventEmitter, Input, Output, Signal } from '@angular/core';
import { ButtonComponent } from '../../../components/button/button.component';
import { SpinnerComponent } from '../../../../../../shared/components/spinner/spinner.component';
import { InputComponent } from '../../../components/input/input.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoanCardComponent } from '../loan-card/loan-card.component';
import { Loan } from '../../../../../../shared/types/dashboard/dashboard-type';

@Component({
  selector: 'app-loan-list',
  standalone: true,
  imports: [
    ButtonComponent,
    SpinnerComponent,
    InputComponent,
    DropdownComponent,
    ReactiveFormsModule,
    LoanCardComponent,
  ],
  templateUrl: './loan-list.component.html',
  styleUrl: './loan-list.component.css',
})
export class LoanListComponent {
  @Input() loans: Loan[] = [];
  @Input() isLoadingLoans = false;
  @Input() loanService: any;

  @Input() displayMonth!: Signal<string>;
  @Input() displayYear!: Signal<string>;
  @Input() yearOptions!: Signal<Array<{ value: number; label: string }>>;
  @Input() showDropdownMonthOpen!: Signal<boolean>;
  @Input() showDropdownYearOpen!: Signal<boolean>;

  @Output() selectMonth = new EventEmitter<number>();
  @Output() selectYear = new EventEmitter<number>();
  @Output() toggleDropdownMonth = new EventEmitter<void>();
  @Output() toggleDropdownYear = new EventEmitter<void>();
  @Output() editLoan = new EventEmitter<Loan>();
  @Output() deleteLoan = new EventEmitter<Loan>();
  @Output() addLoan = new EventEmitter<void>();
  @Output() searchChange = new EventEmitter<string>();

  onEdit(book: Loan) {
    this.editLoan.emit(book);
  }

  onDelete(book: Loan) {
    this.deleteLoan.emit(book);
  }

  onUpdateSearch(value: string) {
    this.searchChange.emit(value);
  }

  onAddLoan() {
    this.addLoan.emit();
  }

  onToggleDropdownMonth() {
    this.toggleDropdownMonth.emit();
  }

  onToggleDropdownYear() {
    this.toggleDropdownYear.emit();
  }

  onSelectYear(year: number) {
    this.selectYear.emit(year);
  }

  onSelectMonth(month: number) {
    this.selectMonth.emit(month);
  }
}
