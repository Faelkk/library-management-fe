import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreCreateModalComponent } from './genre-create-modal.component';

describe('GenreCreateModalComponent', () => {
  let component: GenreCreateModalComponent;
  let fixture: ComponentFixture<GenreCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenreCreateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenreCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
