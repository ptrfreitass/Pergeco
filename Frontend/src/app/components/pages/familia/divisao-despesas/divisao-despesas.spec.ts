import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisaoDespesas } from './divisao-despesas';

describe('DivisaoDespesas', () => {
  let component: DivisaoDespesas;
  let fixture: ComponentFixture<DivisaoDespesas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DivisaoDespesas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DivisaoDespesas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
