import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  @Input() title: string = '';

  onClose() {
    this.close.emit();
  }
}
