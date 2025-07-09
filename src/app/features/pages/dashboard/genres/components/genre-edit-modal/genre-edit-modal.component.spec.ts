import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreEditModalComponent } from './genre-edit-modal.component';

describe('GenreEditModalComponent', () => {
  let component: GenreEditModalComponent;
  let fixture: ComponentFixture<GenreEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenreEditModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenreEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
