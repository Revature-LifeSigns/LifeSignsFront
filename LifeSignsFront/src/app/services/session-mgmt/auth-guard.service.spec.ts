import { HttpClientTestingModule } from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthGuardService } from './auth-guard.service';

describe('AuthGuardService', () => {
  let injector: TestBed;
  let service: AuthGuardService;
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
    service = TestBed.inject(AuthGuardService);
    guard = injector.get(AuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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
