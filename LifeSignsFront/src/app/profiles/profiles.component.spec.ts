import { HttpClient } from '@angular/common/http';
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
  let mockClient: {get: jasmine.Spy, post: jasmine.Spy};

  const imgStr = 'src';
  const dummyUser = new User('doctor',"TestUsername", "TestPassword", "TestEmail", "TestFirstName",
    "TestLastName", "TestDoB", "TestAddress", "http://s3.amazonaws.com/lifesigns/" + imgStr,
    "TestAbout", false, "TestCovidStatus", '1');

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
      providers:[
        {provide: UserService, useClass: MockServiceUser},
        {provide: NurseService, useClass: MockServiceNurse},
        {provide: HttpClient, useValue: mockClient}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {

    userServ = TestBed.inject(UserService);
    nurseServ = TestBed.inject(NurseService);
    mockClient =  TestBed.get(HttpClient);

    fixture = TestBed.createComponent(ProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have current user image with proper alt atribute', () => {
    fixture.detectChanges();
    let userImage = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(userImage.alt).toBe(dummyUser.firstname + " " + dummyUser.lastname);
  });

  it('should have current user image with proper src atribute', () => {
    fixture.detectChanges();
    let userImage = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(userImage.src).toBe("http://s3.amazonaws.com/lifesigns/" + imgStr);
  });
});
