import { HttpClient } from '@angular/common/http';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable, Subscriber } from 'rxjs';
import { ChartsComponent } from '../charts/charts.component';
import { NurseService } from '../services/nurse/nurse.service';
import { UserService } from '../services/user/user.service';
import { Chart } from '../services/util/chart';
import { User } from '../services/util/user';
import { Survey } from '../survey/survey.component';

import { ProfilesComponent } from './profiles.component';

describe('ProfilesComponent', () => {
  let component: ProfilesComponent;
  let fixture: ComponentFixture<ProfilesComponent>;
  let userServ: UserService;
  let nurseServ: NurseService;
  let mockClient: {get: jasmine.Spy, post: jasmine.Spy};

  const imgStr = 'src';
  const dummyUser: User = {

  role:'doctor',
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
  }

  class MockServiceNurse {
    updatePhoto(){}
    getPhoto(user: User): Observable<Object>{
      return new Observable(subscriber => {
        subscriber.next({
          imageFileName: imgStr
        })
        subscriber.complete();
      })
    }
    getAllCharts(): Observable<Object>{
      return new Observable(subscriber => {
        subscriber.next({
          dummyCharts
        })
        subscriber.complete();
      })
    }
  }

  @Component({selector: 'app-charts', template: ''})
class ChartComponentStub{
}

@Component({selector: 'app-survey', template: ''})
class SurveyStub {
}

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilesComponent, SurveyStub, ChartComponentStub ],
      schemas: [NO_ERRORS_SCHEMA],
      providers:[
        {provide: UserService, useClass: MockServiceUser},
        {provide: NurseService, useClass: MockServiceNurse},
        {provide: HttpClient, useValue: mockClient}
      ]
    })
      .compileComponents();

    userServ = TestBed.inject(UserService);
    nurseServ = TestBed.inject(NurseService);
    mockClient =  TestBed.get(HttpClient);
    fixture = TestBed.createComponent(ProfilesComponent);
    component = fixture.componentInstance;
    component.currentUser = dummyUser;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have current user image with proper alt atribute',  () => {

    component.currentUser.image= "http://s3.amazonaws.com/lifesigns/trees-adobespark.jpg"
    component.ngOnInit();
     fixture.whenStable();
    let userImage = fixture.debugElement.query(By.css('#img')).nativeElement
    expect(userImage.alt).toBe(dummyUser.firstName + " " + dummyUser.lastName);
  });

  it('should have current user image with proper src atribute', () => {
    component.currentUser = dummyUser;
    component.ngOnInit();
     fixture.whenStable();
    let userImage = fixture.nativeElement.querySelector('#img');
    expect(userImage.src).toBe("http://s3.amazonaws.com/lifesigns/trees-adobespark.jpg");
  });

  it('should have current user span tag with id: "lastName" has proper innerHTML', () => {
    fixture.detectChanges();
    let span = fixture.debugElement.query(By.css('#lastName')).nativeElement;
    expect(span.innerHTML).toBe("First Name: " + dummyUser.firstName);
  });

  it('should have current user span tag with id: "firstName" has proper innerHTML', () => {
    fixture.detectChanges();
    let span = fixture.debugElement.query(By.css('#firstName')).nativeElement;
    expect(span.innerHTML).toBe("Last Name: " + dummyUser.lastName);
  });

  it('should have current user div tag with id: "professionDetails" has proper innerHTML', () => {
    fixture.detectChanges();
    let div = fixture.debugElement.query(By.css('#professionDetails')).nativeElement;
    expect(div.innerHTML).toBe(" Type: " + dummyUser.role + " ");
  });

  it('should have current user div tag with id: "covid" has proper innerHTML', () => {
    fixture.detectChanges();
    let div = fixture.debugElement.query(By.css('#covid')).nativeElement;
    expect(div.innerHTML).toBe(" Covid Status: " + dummyUser.covidStatus + " ");
  });

  it('should have current user div tag with id: "dob" has proper innerHTML', () => {
    fixture.detectChanges();
    let div = fixture.debugElement.query(By.css('#dob')).nativeElement;
    expect(div.innerHTML).toBe(" DOB: " + dummyUser.dob + " ");
  });

  it('should have current user p tag in div with id: "aboutContainer" has proper innerHTML', () => {
    fixture.detectChanges();
    let p = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(p.innerHTML).toBe(" " + dummyUser.aboutMe + " ");
  });

//   it('should call updatePhoto method', () => {
//     fixture.detectChanges();
//     let button =  fixture.debugElement.query(By.css('button')).nativeElement;
//     spyOn(component, 'updatePhoto');
//     button.click();
//     fixture.whenStable().then(()=>{
//       expect(component.updatePhoto).toHaveBeenCalled();
//     })
//   });
});
