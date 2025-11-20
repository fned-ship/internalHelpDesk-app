import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpHeader } from './emp-header';

describe('EmpHeader', () => {
  let component: EmpHeader;
  let fixture: ComponentFixture<EmpHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
