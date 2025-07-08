import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenresCardComponent } from './genres-card.component';

describe('GenresCardComponent', () => {
  let component: GenresCardComponent;
  let fixture: ComponentFixture<GenresCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenresCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenresCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
