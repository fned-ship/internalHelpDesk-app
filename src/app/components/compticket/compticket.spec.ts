import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Compticket } from './compticket';

describe('Compticket', () => {
  let component: Compticket;
  let fixture: ComponentFixture<Compticket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Compticket]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Compticket);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
