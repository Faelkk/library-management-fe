import { Component, Inject, Optional } from '@angular/core';

@Component({
  selector: 'app-bag',
  templateUrl: './bag.component.html',
  styleUrl: './bag.component.css',
  standalone: true,
})
export class BagComponent {
  color = '#495057';

  constructor(@Optional() @Inject('color') color: string) {
    if (color) {
      this.color = color;
    }
  }
}
