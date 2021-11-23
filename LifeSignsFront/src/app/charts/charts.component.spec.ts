import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { NurseService } from '../services/nurse/nurse.service';
import { UserService } from '../services/user/user.service';
import { Chart } from '../services/util/chart';
import { User } from '../services/util/user';
import { ChartsComponent } from './charts.component';

describe('ChartsComponent', () => {
  let component: ChartsComponent;
  let fixture: ComponentFixture<ChartsComponent>;
  let userServ: UserService;
  let nurseServ: NurseService;
  let mockClient: {get: jasmine.Spy, post: jasmine.Spy};

  const dummyUser: User = {

    role:'nurse',
    username:"TestUsername",
    password: "TestPassword",
    email: "TestEmail",
    firstName: "TestFirstName",
    lastName: "TestLastName",
    dob: "2020-10-10",
    address: "TestAddress",
    image: "http://s3.amazonaws.com/lifesigns/trees-adobespark.jpg",
    aboutMe:"TestAbout",
    specialty: "none",
    viewPref: false,
    covidStatus: "TestCovidStatus",
    userid:1
  };

  const dummyCharts: Chart = {

    address: "TestAddress",
    chartid: 1,
    diagnosis: "Test Diagnosis",
    diagnosis_approved: false,
    dob: "2020-10-10",
    doctor: dummyUser,
    email: "fake@test.com",
    firstName: "Test",
    insuranceid: "12345-13",
    lastName: "Patient",
    notes: "test notes here",
    nurse: dummyUser,
    treatment: "this is a treatment"
  }

  class MockServiceUser {
    getLoggedInUser(): User{
      return dummyUser;
    }
    getUsers():User[]{
      return [dummyUser];
    }
  }

  class MockServiceNurse {

    getAllCharts(): Observable<Object>{
      return new Observable(subscriber => {
        subscriber.next({
          dummyCharts
        })
        subscriber.complete();
      })
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      declarations: [ ChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartsComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should be created', () => {

    expect(component).toBeTruthy();
  });

  it('should not show chart', ()=> {
    expect(component.isVisible).toBeFalsy();
  });

  it('should toggle form', ()=> {
    let spyOnMethod = spyOn(component, "toggleForm").and.callThrough();
    component.toggleForm();
    expect(spyOnMethod).toHaveBeenCalled();
  });

  it('should return a list of doctors', ()=>{
    let spyOnMethod = spyOn(component, "getDoctors").and.callThrough();
    component.getDoctors();
    expect(spyOnMethod).toHaveBeenCalled();
  });

  it('should invoke chart submission', ()=>{
    let spyOnMethod = spyOn(component, "submitChart");
    component.submitChart(new FormGroup({
      doctor: new FormControl({}),
      nurse: new FormControl({}),
      firstName: new FormControl(),
      lastName: new FormControl(''),
      dob: new FormControl(''),
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zipcode: new FormControl(''),
      address: new FormControl(''),
      email: new FormControl(''),
      insuranceId: new FormControl(''),
      diagnosis: new FormControl(''),
      notes: new FormControl(''),
      treatment: new FormControl('')
    }));
    expect(spyOnMethod).toHaveBeenCalled();
  });

  it('should call onDoctorSelect()', ()=> {
    let spyOnMethod = spyOn(component, "onDoctorSelect").and.callThrough();
    component.onDoctorSelect('');
    expect(spyOnMethod).toHaveBeenCalled();
  });

  it('should call onNurseSelect()', ()=> {
    let spyOnMethod = spyOn(component, "onNurseSelect").and.callThrough();
    component.onNurseSelect('');
    expect(spyOnMethod).toHaveBeenCalled();
  });

});
