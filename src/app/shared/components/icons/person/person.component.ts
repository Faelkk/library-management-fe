import { Component, Inject, Input, Optional } from '@angular/core';

@Component({
  selector: 'app-person',
  imports: [],
  templateUrl: './person.component.html',
  styleUrl: './person.component.css',
})
export class PersonComponent {
  @Input() color: string = '#495057';

  constructor(@Optional() @Inject('color') color: string) {
    if (color) {
      this.color = color;
    }
  }
}
