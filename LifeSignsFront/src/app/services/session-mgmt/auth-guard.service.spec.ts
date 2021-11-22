import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Route } from '@angular/compiler/src/core';
import { getTestBed, TestBed } from '@angular/core/testing';
import { Router, RouterStateSnapshot,ActivatedRouteSnapshot } from '@angular/router';
import {RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../user/user.service';
import { User } from '../util/user';



import { AuthGuardService } from './auth-guard.service';

describe('AuthGuardService', () => {
  let injector: TestBed;
  let authService: AuthGuardService;
  let userService: UserService;
  let httpMock: HttpTestingController;
  let guard: AuthGuardService;
  const dummyUser: User = {

    role:'nurse',
    username:"TestUsername",
    password: "TestPassword",
    email: "TestEmail",
    firstName: "TestFirstName",
    lastName: "TestLastName",
    dob: "TestDoB",
    address: "TestAddress",
    image: "http://s3.amazonaws.com/lifesigns/example.jpg",
    aboutMe:"TestAbout",
    specialty: "none",
    viewPref: false,
    covidStatus: "TestCovidStatus",
    userid:1
  };


  let routerMock = {navigate: jasmine.createSpy('navigate')}
  let router: Router;

  let routeMock: any = { snapshot: {}};
  let routeStateMock: any = { snapshot: {}, url: '/cookies'};

  beforeEach( () => {
     TestBed.configureTestingModule({
      // providers: [UserService, AuthGuardService, { provide: Router, userValue: routerMock }, ],
      // imports: [HttpClientTestingModule]

      imports:[HttpClientTestingModule,      RouterTestingModule.withRoutes([])],
      providers:[UserService, AuthGuardService]
    });

    authService = TestBed.inject(AuthGuardService);
    userService = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.get(Router);
    authService = new AuthGuardService(userService, router );
    spyOn(router, 'navigateByUrl');

    //guard = injector.get(AuthGuardService);
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
    expect(authService).toBeTruthy();
  });

  it('should redirect an unauthenticated user to the login route', () => {
    expect(authService.canActivate(routeMock, routeStateMock)).toEqual(false);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('should allow the authenticated user to access the app', () => {
    spyOn(userService, 'getLoggedInUser').and.returnValue(dummyUser);
    expect(authService.canActivate(routeMock, routeStateMock)).toEqual(true);
  });

  it('should invoke canActivate', ()=> {
    let route: ActivatedRouteSnapshot;
    let state: RouterStateSnapshot;
    let spyOnMethod = spyOn(authService, 'canActivate').and.callThrough();
    authService.canActivate(route, state);
    expect(spyOnMethod).toHaveBeenCalled();
  });
});

