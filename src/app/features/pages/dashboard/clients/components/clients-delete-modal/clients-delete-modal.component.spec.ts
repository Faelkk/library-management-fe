import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsDeleteModalComponent } from './clients-delete-modal.component';

describe('ClientsDeleteModalComponent', () => {
  let component: ClientsDeleteModalComponent;
  let fixture: ComponentFixture<ClientsDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsDeleteModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientsDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
