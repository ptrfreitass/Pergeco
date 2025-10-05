import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoqueConjunto } from './estoque-conjunto';

describe('EstoqueConjunto', () => {
  let component: EstoqueConjunto;
  let fixture: ComponentFixture<EstoqueConjunto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstoqueConjunto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstoqueConjunto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
