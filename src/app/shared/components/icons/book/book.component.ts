import { Component, Inject, Input, Optional } from '@angular/core';

@Component({
  selector: 'app-book',
  imports: [],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent {
  @Input() color: string = '#495057';

  constructor(@Optional() @Inject('color') color: string) {
    if (color) {
      this.color = color;
    }
  }
}
