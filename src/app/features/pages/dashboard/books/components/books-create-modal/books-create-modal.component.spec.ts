import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksCreateModalComponent } from './books-create-modal.component';

describe('BooksCreateModalComponent', () => {
  let component: BooksCreateModalComponent;
  let fixture: ComponentFixture<BooksCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksCreateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
