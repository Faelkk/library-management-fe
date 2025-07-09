import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSeeModalComponent } from './book-see-modal.component';

describe('BookSeeModalComponent', () => {
  let component: BookSeeModalComponent;
  let fixture: ComponentFixture<BookSeeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookSeeModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookSeeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
