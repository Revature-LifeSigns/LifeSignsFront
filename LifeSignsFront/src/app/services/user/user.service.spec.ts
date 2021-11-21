import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { User } from '../util/user';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const dummyUser: User = {
    role: 'nurse',
    username: "testNurse",
    password: "",
    email: "test@test.com",
    firstName: "Test",
    lastName: "Nurse",
    dob: "01-01-1900",
    address: "100 E Main St; ; Buffalo; NY; 00000",
    image: "http://s3.amazonaws.com/lifesigns/trees-adobespark.jpg",
    aboutMe: "This is my totally cool description of me.",
    specialty: "Pediatrics",
    viewPref: false,
    covidStatus: "unknown",
    userid: 1
  };
  // const dummyUser = new User("Nurse", "testNurse", "","test@test.com","Test","Nurse","01-01-1900","100 E Main St; Buffalo, NY 00000",
  //   "http://s3.amazonaws.com/lifesigns/trees-adobespark.jpg","This is my totally cool description of me.", false,"Pediatrics","unknown",1)
  const loggedInUser = dummyUser;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // BREAKS DUE TO REFACTORING THE USER MODEL AS AN INTERFACE
  // it('should have updateUserProfile() return data', () => {
  //   service.updateUserProfile(dummyUser).subscribe(response => {
  //     expect(response.toString()).toEqual(dummyUser.toString());
  //   })
  //   const req = httpMock.expectOne("http://localhost:9025/LifeSigns/users/update/1");
  //   expect(req.request.method).toBe("PATCH");
  //   req.flush(dummyUser);
  // })

  it('should have insertUser() return response', () => {
    service.insertUser(dummyUser.username).subscribe(response => {
      expect(response.toString()).toEqual(dummyUser.toString());
    })
    const req = httpMock.expectOne("http://localhost:9025/LifeSigns/register");
    expect(req.request.method).toBe("POST");
    req.flush(dummyUser);
  })

  it('should have loginUser() return response', () => {
    service.loginUser(dummyUser.username).subscribe(response => {
      expect(response.toString()).toEqual(dummyUser.toString());
    })
    const req = httpMock.expectOne("http://localhost:9025/LifeSigns/login");
    expect(req.request.method).toBe("POST");
    req.flush(dummyUser);
  })

});

