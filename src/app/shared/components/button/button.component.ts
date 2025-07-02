import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';
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
  @Input() type: string = 'button';

  @Output() onClick = new EventEmitter<Event>();

  handleClick(event: Event): void {
    event.preventDefault();
    this.onClick.emit(event);
  }
}
