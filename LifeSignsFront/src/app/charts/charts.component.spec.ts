import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
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
      imports: [ HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule ],
      declarations: [ ChartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    const fixture = TestBed.createComponent(ChartsComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });
});
