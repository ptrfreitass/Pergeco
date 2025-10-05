import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Familia } from './familia';

describe('Familia', () => {
  let component: Familia;
  let fixture: ComponentFixture<Familia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Familia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Familia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
