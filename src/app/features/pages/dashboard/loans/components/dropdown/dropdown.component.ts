import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
})
export class DropdownComponent {
  @Input() showDropdown = false;
  @Input() options: { value: number; label: string }[] = [];
  @Input() selectedValue: number | null = null;
  @Output() select = new EventEmitter<number>();
  @Output() close = new EventEmitter<void>();

  onSelect(value: number) {
    this.select.emit(value);
    this.close.emit();
  }
}
