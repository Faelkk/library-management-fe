import { Component } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';
import { formatPhoneNumber } from '../../../../../../shared/utils/phone-number-format';

@Component({
  selector: 'app-client-card',
  imports: [],
  templateUrl: './client-card.component.html',
  styleUrl: './client-card.component.css',
})
export class ClientCardComponent {
  @Input() name!: string;
  @Input() role!: string;
  @Input() id!: number;
  @Input() email!: string;
  @Input() phoneNumber!: string;

  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  get formattedPhone() {
    return formatPhoneNumber(this.phoneNumber);
  }
}
