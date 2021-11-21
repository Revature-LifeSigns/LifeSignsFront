import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable, Subscriber } from 'rxjs';
import { NurseService } from '../services/nurse/nurse.service';
import { UserService } from '../services/user/user.service';
import { User } from '../services/util/user';

import { ProfilesComponent } from './profiles.component';

describe('ProfilesComponent', () => {
  let component: ProfilesComponent;
  let fixture: ComponentFixture<ProfilesComponent>;
  let userServ: UserService;
  let nurseServ: NurseService;
  let mockClient: { get: jasmine.Spy, post: jasmine.Spy };

  const imgStr = 'src';
  const dummyUser: User = {

  role:'doctor',
  username:"TestUsername",
  password: "TestPassword",
  email: "TestEmail",
  firstName: "TestFirstName",
  lastName: "TestLastName",
  dob: "TestDoB",
  address: "TestAddress",
  image: "http://s3.amazonaws.com/lifesigns/" + imgStr,
  aboutMe:"TestAbout",
  specialty: "none",
  viewPref: false,
  covidStatus: "TestCovidStatus",
  userid:1
};

    class MockServiceUser {
    getLoggedInUser(): User{
      return dummyUser;
    }
  }

  class MockServiceNurse {
    getPhoto(user: User): Observable<Object>{
      return new Observable(/*subscriber => {
        subscriber.next({
          imageFileName: imgStr
        })
        subscriber.complete();
      }*/)
    }
  }


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilesComponent ],
      imports: [HttpClientTestingModule],
      providers:[
        {provide: UserService, useClass: MockServiceUser},
        {provide: NurseService, useClass: MockServiceNurse}
      ]
    })
    .compileComponents();
    userServ = TestBed.inject(UserService);
    nurseServ = TestBed.inject(NurseService);

    fixture = TestBed.createComponent(ProfilesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

//   it('should have current user image with proper alt atribute', () => {
//     fixture.detectChanges();
//     let img = fixture.debugElement.query(By.css('.user-image')).nativeElement;
//     expect(img.alt).toBe(dummyUser.firstName + " " + dummyUser.lastName);
//     // let userImage = fixture.debugElement.query(By.css('img')).nativeElement;
//     // expect(userImage.alt).toBe(dummyUser.firstName + " " + dummyUser.lastName);
//   });

//   it('should have current user image with proper src atribute', () => {
//     fixture.detectChanges();
//     let userImage = fixture.debugElement.query(By.css('img')).nativeElement;
//     expect(userImage.src).toBe("http://s3.amazonaws.com/lifesigns/" + imgStr);
//   });

//   it('should have current user span tag with id: "lastName" has proper innerHTML', () => {
//     fixture.detectChanges();
//     let span = fixture.debugElement.query(By.css('#lastName')).nativeElement;
//     expect(span.innerHTML).toBe("First Name: " + dummyUser.firstName);
//   });

//   it('should have current user span tag with id: "firstName" has proper innerHTML', () => {
//     fixture.detectChanges();
//     let span = fixture.debugElement.query(By.css('#firstName')).nativeElement;
//     expect(span.innerHTML).toBe("Last Name: " + dummyUser.lastName);
//   });

//   it('should have current user div tag with id: "professionDetails" has proper innerHTML', () => {
//     fixture.detectChanges();
//     let div = fixture.debugElement.query(By.css('#professionDetails')).nativeElement;
//     expect(div.innerHTML).toBe(" Type: " + dummyUser.role + " ");
//   });

//   it('should have current user div tag with id: "covid" has proper innerHTML', () => {
//     fixture.detectChanges();
//     let div = fixture.debugElement.query(By.css('#covid')).nativeElement;
//     expect(div.innerHTML).toBe(" Covid Status: " + dummyUser.covidStatus + " ");
//   });

//   it('should have current user div tag with id: "dob" has proper innerHTML', () => {
//     fixture.detectChanges();
//     let div = fixture.debugElement.query(By.css('#dob')).nativeElement;
//     expect(div.innerHTML).toBe(" DOB: " + dummyUser.dob + " ");
//   });

//   it('should have current user p tag in div with id: "aboutContainer" has proper innerHTML', () => {
//     fixture.detectChanges();
//     let p = fixture.debugElement.query(By.css('#aboutContainer p')).nativeElement;
//     expect(p.innerHTML).toBe(" " + dummyUser.aboutMe + " ");
//   });

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
