import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-books-header',
  imports: [],
  templateUrl: './books-header.component.html',
  styleUrl: './books-header.component.css',
})
export class BooksHeaderComponent {
  @Input() totalBooks = 0;
}
