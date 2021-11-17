import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take, catchError } from 'rxjs/operators';

import { User } from '../services/util/user';
import { UserService } from '../services/user/user.service';
import { error } from '@angular/compiler/src/util';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  invalidLogin: boolean = false;

  //storing user loc stor
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private userService: UserService, private router: Router) {
    this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  userLogin(input: FormGroup) {
    let errMess: any = document.getElementById('errorMessage');

    let user = JSON.stringify(input.value);
    this.userService
      .loginUser(user)
      .pipe(
        take(1),
        // catchError((error) => {
        //   console.log(error);
        //   errMess.innerHTML = 'Invalid login.  Please try again.';
        //   this.invalidLogin = true;
        //   return null;
        // })
      )
      .subscribe((loginResp: any) => {
        if (loginResp) {
          const userLogin = new User(
            loginResp.role,
            loginResp.username,
            loginResp.pwd,
            loginResp.email,
            loginResp.firstName,
            loginResp.lastName,
            loginResp.dob,
            loginResp.address,
            loginResp.profile_image,
            loginResp.aboutMe,
            loginResp.viewPreference,
            loginResp.specialty,
            loginResp.covidStatus,
            loginResp.userid
          );
          this.userService.userLoginStatus(userLogin);
          console.log(this.userService.getLoggedInUser());
          this.invalidLogin = false;
          // store url memory for userlogin then reset to null
          if (this.userService.returnUrl) {
            this.router.navigate([this.userService.returnUrl]);
            this.userService.returnUrl = '';
          } else {
            // user navigated after successful login
            if (userLogin.role == 'doctor' || userLogin.role == 'nurse') {
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.router.navigate(['/profiles']);
              // user session

            } else if (userLogin.role == 'admin') {
              this.router.navigate(['/admin']);
              // user session
              localStorage.setItem('currentUser', JSON.stringify(user));
            } else {
              this.router.navigate(['/charts/' + userLogin.userid]);
            }
          }

        }
      });
  }

  ngOnInit(): void {
    if (this.userService.getLoggedInUser()) {
      if (this.userService.getLoggedInUser().role == 'doctor' || this.userService.getLoggedInUser().role == 'nurse') {
        this.router.navigate(['/profiles']);
      } else if (this.userService.getLoggedInUser().role == 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/login']);
      }
    }
  }
}
