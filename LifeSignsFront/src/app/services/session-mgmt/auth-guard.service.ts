import { Component, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from 'src/app/login/login.component';
import { UserService } from '../user/user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // deactive once user success login
    // const userLoggedIn = this.userService.isUserLoggedIn();
    if (this.userService.getLoggedInUser()) {
      // if (userLoggedIn) {
      return true;

    }

    this.userService.returnUrl = state.url;

    // return all unauthorized attempts to login page
    this.router.navigateByUrl('/login');
    return false;
  }
}
