import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanHeaderComponent } from './loan-header.component';

describe('LoanHeaderComponent', () => {
  let component: LoanHeaderComponent;
  let fixture: ComponentFixture<LoanHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoanHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
