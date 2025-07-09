import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loan-header',
  imports: [],
  templateUrl: './loan-header.component.html',
  styleUrl: './loan-header.component.css',
})
export class LoanHeaderComponent {
  @Input() totalLoans = 0;
}
