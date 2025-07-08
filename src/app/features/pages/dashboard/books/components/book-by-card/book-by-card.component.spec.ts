import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookByCardComponent } from './book-by-card.component';

describe('BookByCardComponent', () => {
  let component: BookByCardComponent;
  let fixture: ComponentFixture<BookByCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookByCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookByCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
