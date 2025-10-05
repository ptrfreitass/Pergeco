import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportarExtrato } from './importar-extrato';

describe('ImportarExtrato', () => {
  let component: ImportarExtrato;
  let fixture: ComponentFixture<ImportarExtrato>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportarExtrato]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportarExtrato);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
