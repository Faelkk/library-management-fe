import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-genre-header',
  imports: [],
  templateUrl: './genre-header.component.html',
  styleUrl: './genre-header.component.css',
})
export class GenreHeaderComponent {
  @Input() totalGenres = 0;
}
