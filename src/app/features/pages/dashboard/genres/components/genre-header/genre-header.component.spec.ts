import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreHeaderComponent } from './genre-header.component';

describe('GenreHeaderComponent', () => {
  let component: GenreHeaderComponent;
  let fixture: ComponentFixture<GenreHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenreHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenreHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
