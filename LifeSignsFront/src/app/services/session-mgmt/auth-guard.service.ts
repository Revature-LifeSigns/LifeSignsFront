import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../user/user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // deactive once user success login
    if (this.userService.isUserLoggedIn()) {
      return true;
    }

    this.userService.returnUrl = state.url;

    // return all unauthorized attempts to login page
    this.router.navigateByUrl('/login');
    return false;
  }
}
