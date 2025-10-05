import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtribuicaoTarefas } from './atribuicao-tarefas';

describe('AtribuicaoTarefas', () => {
  let component: AtribuicaoTarefas;
  let fixture: ComponentFixture<AtribuicaoTarefas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtribuicaoTarefas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtribuicaoTarefas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
