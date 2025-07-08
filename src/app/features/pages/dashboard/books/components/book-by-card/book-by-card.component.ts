import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-book-by-card',
  templateUrl: './book-by-card.component.html',
  styleUrl: './book-by-card.component.css',
})
export class BookByCardComponent implements OnChanges {
  @Input() id!: number;
  @Input() title!: string;
  @Input() author!: string;
  @Input() publishYear!: number;
  @Input() imageUrl!: string;

  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Output() seeMore = new EventEmitter<void>();

  bookImageUrl = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['imageUrl'] && this.imageUrl) {
      this.bookImageUrl = `http://localhost:5010${this.imageUrl}`;
    }
  }
}
