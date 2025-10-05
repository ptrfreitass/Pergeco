import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarExclusaoModal } from './confirmar-exclusao-modal';

describe('ConfirmarExclusaoModal', () => {
  let component: ConfirmarExclusaoModal;
  let fixture: ComponentFixture<ConfirmarExclusaoModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmarExclusaoModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmarExclusaoModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
