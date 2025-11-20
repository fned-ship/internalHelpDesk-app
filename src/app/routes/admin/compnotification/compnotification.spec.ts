import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Compnotification } from './compnotification';

describe('Compnotification', () => {
  let component: Compnotification;
  let fixture: ComponentFixture<Compnotification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Compnotification]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Compnotification);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
