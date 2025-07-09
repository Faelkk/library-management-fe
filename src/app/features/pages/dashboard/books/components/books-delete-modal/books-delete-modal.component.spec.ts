import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksDeleteModalComponent } from './books-delete-modal.component';

describe('BooksDeleteModalComponent', () => {
  let component: BooksDeleteModalComponent;
  let fixture: ComponentFixture<BooksDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksDeleteModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
