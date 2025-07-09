import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreDeleteModalComponent } from './genre-delete-modal.component';

describe('GenreDeleteModalComponent', () => {
  let component: GenreDeleteModalComponent;
  let fixture: ComponentFixture<GenreDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenreDeleteModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenreDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
