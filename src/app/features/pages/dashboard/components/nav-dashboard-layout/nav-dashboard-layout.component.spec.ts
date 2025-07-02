import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavDashboardLayoutComponent } from './nav-dashboard-layout.component';

describe('NavDashboardLayoutComponent', () => {
  let component: NavDashboardLayoutComponent;
  let fixture: ComponentFixture<NavDashboardLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavDashboardLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavDashboardLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
