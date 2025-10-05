import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelFamiliar } from './painel-familiar';

describe('PainelFamiliar', () => {
  let component: PainelFamiliar;
  let fixture: ComponentFixture<PainelFamiliar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelFamiliar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PainelFamiliar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
