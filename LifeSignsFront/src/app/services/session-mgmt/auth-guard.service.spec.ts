import { HttpClientTestingModule } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';

import { AuthGuardService } from './auth-guard.service';

describe('AuthGuardService', () => {
  let injector: TestBed;
  let authService: AuthGuardService;
  let userService: UserService;
  let guard: AuthGuardService;
  let routeMock: any = { snapshot: {}};
  let routeStateMock: any = { snapshot: {}, url: '/profiles'};
  let routerMock = {navigate: jasmine.createSpy('navigate')}

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuardService, { provide: Router, userValue: routerMock }, ],
      imports: [HttpClientTestingModule]
    });
    injector: getTestBed();
    authService = TestBed.inject(AuthGuardService);
    userService = TestBed.inject(UserService);
    guard = injector.get(AuthGuardService);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should redirect an unauthenticated user to the login route', () => {
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should allow the authenticated user to access the app', () => {
    spyOn(userService, 'isUserLoggedIn').and.returnValue(true);
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(true);
  });

  it('should redirect an unauthenticated user to the login route', () => {
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  // it('should allow the authenticated user to access the app', () => {
  //   spyOn(service, 'isUserLoggedIn').and.returnValue(true);
  //   expect(guard.canActivate(routeMock, routeStateMock)).toEqual(true);
  // });
});
