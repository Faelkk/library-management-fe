import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksEditModalComponent } from './books-edit-modal.component';

describe('BooksEditModalComponent', () => {
  let component: BooksEditModalComponent;
  let fixture: ComponentFixture<BooksEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksEditModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
