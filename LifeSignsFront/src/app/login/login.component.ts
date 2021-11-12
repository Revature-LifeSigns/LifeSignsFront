import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../services/util/user';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  invalidLogin:boolean = false;

  constructor(private userService:UserService, private router: Router) { }

  userLogin(input: FormGroup){
    let errMess:any = document.getElementById('errorMessage');

    let user = JSON.stringify(input.value);
    this.userService.loginUser(user).subscribe(
      loginResp => {
        const userLogin = new User(
          loginResp.username,
          loginResp.pwd,
          loginResp.email,
          loginResp.roleid,
          loginResp.userid
        );
        this.userService.userLoginStatus(userLogin);
        this.invalidLogin = false;

        // store url memory for userlogin then reset to null
        if (this.userService.returnUrl) {
          this.router.navigate([this.userService.returnUrl]);
          this.userService.returnUrl = null;
        }
        else {
          // user navigated after successful login
          this.router.navigate(['/profiles']);
        }
      },
      error => {
        console.log(error);
        errMess.innerHTML = 'Invalid login.  Please try again.'
        this.invalidLogin = true;
      }
    );
  }

  ngOnInit(): void {
  }

}
