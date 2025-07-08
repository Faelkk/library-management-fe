import { Component, EventEmitter, Input, Output } from '@angular/core';
import { formatDate } from '../../../../../../shared/utils/format-date';

@Component({
  selector: 'app-loan-card',
  imports: [],
  templateUrl: './loan-card.component.html',
  styleUrl: './loan-card.component.css',
})
export class LoanCardComponent {
  @Input() name!: string;
  @Input() id!: number;
  @Input() description!: string;
  @Input() loanDate!: Date;
  @Input() expectedDate!: Date;
  @Input() returnedAt: Date | null | undefined;

  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  formatDate = formatDate;
}
