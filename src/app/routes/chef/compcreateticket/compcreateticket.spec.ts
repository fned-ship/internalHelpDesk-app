import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Compcreateticket } from './compcreateticket';

describe('Compcreateticket', () => {
  let component: Compcreateticket;
  let fixture: ComponentFixture<Compcreateticket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Compcreateticket]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Compcreateticket);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
