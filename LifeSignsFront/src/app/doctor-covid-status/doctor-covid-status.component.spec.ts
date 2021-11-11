import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorCovidStatusComponent } from './doctor-covid-status.component';

describe('DoctorCovidStatusComponent', () => {
  let component: DoctorCovidStatusComponent;
  let fixture: ComponentFixture<DoctorCovidStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorCovidStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorCovidStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
