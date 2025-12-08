import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichageDetails } from './affichage-details';

describe('AffichageDetails', () => {
  let component: AffichageDetails;
  let fixture: ComponentFixture<AffichageDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffichageDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffichageDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
