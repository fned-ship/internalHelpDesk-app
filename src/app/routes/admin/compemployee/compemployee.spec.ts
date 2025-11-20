import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Compemployee } from './compemployee';

describe('Compemployee', () => {
  let component: Compemployee;
  let fixture: ComponentFixture<Compemployee>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Compemployee]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Compemployee);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
