import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanDeleteModalComponent } from './loan-delete-modal.component';

describe('LoanDeleteModalComponent', () => {
  let component: LoanDeleteModalComponent;
  let fixture: ComponentFixture<LoanDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanDeleteModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
