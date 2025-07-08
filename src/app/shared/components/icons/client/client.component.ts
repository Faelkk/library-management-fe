import { Component, Inject, Input, Optional } from '@angular/core';

@Component({
  selector: 'app-client',
  imports: [],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent {
  @Input() color: string = '#495057';

  constructor(@Optional() @Inject('color') color: string) {
    if (color) {
      this.color = color;
    }
  }
}
