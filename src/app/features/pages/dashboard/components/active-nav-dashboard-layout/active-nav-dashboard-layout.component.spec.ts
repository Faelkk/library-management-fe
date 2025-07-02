import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveNavDashboardLayoutComponent } from './active-nav-dashboard-layout.component';

describe('ActiveNavDashboardLayoutComponent', () => {
  let component: ActiveNavDashboardLayoutComponent;
  let fixture: ComponentFixture<ActiveNavDashboardLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveNavDashboardLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveNavDashboardLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
