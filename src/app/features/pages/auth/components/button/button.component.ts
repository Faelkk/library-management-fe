import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SpinnerComponent } from '../../../../../shared/components/spinner/spinner.component';
import { CommonModule } from '@angular/common';

@Component({
  imports: [SpinnerComponent, CommonModule],
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() disabled: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() variant: string = '';
  @Input() className: string = '';
  @Output() onClick = new EventEmitter<Event>();

  get buttonClasses(): string {
    const base =
      'bg-teal-900 hover:bg-teal-800 disabled:bg-gray-500 flex items-center justify-center disabled:text-gray-400 disabled:cursor-not-allowed px-6 h-10 rounded-2xl font-medium capitalize text-white transition-all font-poppins mt-4 max-w-[20rem]';

    const danger =
      this.variant === 'danger' ? 'bg-red-900 hover:bg-red-800' : '';
    const ghost =
      this.variant === 'ghost'
        ? 'bg-transparent border border-gray-800 text-gray-800 hover:bg-gray-800/5'
        : '';

    return [base, danger, ghost, this.className].filter(Boolean).join(' ');
  }

  handleClick(): void {
    this.onClick.emit();
  }
}
