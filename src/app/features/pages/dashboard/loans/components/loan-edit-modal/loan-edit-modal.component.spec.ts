import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanEditModalComponent } from './loan-edit-modal.component';

describe('LoanEditModalComponent', () => {
  let component: LoanEditModalComponent;
  let fixture: ComponentFixture<LoanEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanEditModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
