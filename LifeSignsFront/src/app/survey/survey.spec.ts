import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Survey } from './survey.component';

describe('DoctorCovidStatusComponent', () => {
  let component: Survey;
  let fixture: ComponentFixture<Survey>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Survey ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Survey);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
