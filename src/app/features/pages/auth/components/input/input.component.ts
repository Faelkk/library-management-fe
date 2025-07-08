import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { formatPhoneNumber } from '../../../../../shared/utils/phone-number-format';

type InputTypes = 'text' | 'email' | 'password' | 'number';

@Component({
  selector: 'app-input',
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  @Input() type: InputTypes = 'text';
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() inputName: string = '';
  @Input() maxlength?: number;
  @Output() valueChange = new EventEmitter<string>();
  value: string = '';

  onChange: any = () => {};
  onTouched: any = () => {};

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let formattedValue = input.value;

    if (this.inputName === 'phoneNumber') {
      formattedValue = formatPhoneNumber(formattedValue);
      input.value = formattedValue;
    }

    this.value = formattedValue;
    this.onChange(formattedValue);
    this.onTouched();
    this.valueChange.emit(formattedValue);
  }

  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
