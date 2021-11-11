import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../services/util/user';
import { UserService } from '../services/user/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private url = "http://localhost:9025";

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  invalidLogin:boolean = false;

  constructor(private userService:UserService, private router: Router) { }

  get userName() {
    return this.loginForm.get('userName');
  }

  get userPassword() {
    return this.loginForm.get('userPassword');
  }

  userLogin(input: FormGroup){
    let user = JSON.stringify(input.value);
    this.userService.loginUser(user).subscribe(
      loginResp => {
        console.log(loginResp);
        const userLogin = new User(
          loginResp.username,
          loginResp.pwd,
          loginResp.email,
          loginResp.roleid,
          loginResp.userid
        );
        this.userService.userLoginStatus(userLogin);
        this.invalidLogin = false;
        this.router.navigate(['/profiles']);
      },
      error => {
        console.log(error);
        this.invalidLogin = true;
      }
    )
  }

  ngOnInit(): void {
  }

}
