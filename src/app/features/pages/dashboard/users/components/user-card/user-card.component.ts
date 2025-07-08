import { Component, EventEmitter, Input, Output } from '@angular/core';
import { formatPhoneNumber } from '../../../../../../shared/utils/phone-number-format';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent {
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
