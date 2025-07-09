import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanCreateModalComponent } from './loan-create-modal.component';

describe('LoanCreateModalComponent', () => {
  let component: LoanCreateModalComponent;
  let fixture: ComponentFixture<LoanCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanCreateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
