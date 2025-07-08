import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-genres-card',
  imports: [],
  templateUrl: './genres-card.component.html',
  styleUrl: './genres-card.component.css',
})
export class GenresCardComponent {
  @Input() name!: string;
  @Input() id!: number;
  @Input() description!: string;

  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
}
