import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-clients-header',
  imports: [],
  templateUrl: './clients-header.component.html',
  styleUrl: './clients-header.component.css',
})
export class ClientsHeaderComponent {
  @Input() totalClients = 0;
}
