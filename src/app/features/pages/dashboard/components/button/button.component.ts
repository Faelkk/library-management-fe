import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SpinnerComponent } from '../../../../../shared/components/spinner/spinner.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  imports: [SpinnerComponent, CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() disabled: boolean = false;
  @Input() isLoading: boolean = false;
  @Input() variant: string = '';
  @Input() className: string = '';
  @Output() onClick = new EventEmitter<Event>();

  get allClasses(): string {
    const base =
      'flex items-center justify-center px-2 h-10 rounded-2xl capitalize transition-all font-poppins w-full';
    const disabledClasses =
      this.disabled || this.isLoading
        ? 'bg-gray-500 cursor-not-allowed text-gray-400 cursor-disabled'
        : 'cursor-pointer';

    return [
      base,
      !this.disabled || !this.isLoading ? this.className : '',
      disabledClasses,
    ]
      .filter(Boolean)
      .join(' ');
  }

  handleClick() {
    this.onClick.emit();
  }
}
