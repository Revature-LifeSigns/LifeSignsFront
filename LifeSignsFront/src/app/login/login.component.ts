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
    userName: new FormControl('', [Validators.required]),
    userPassword: new FormControl('', [Validators.required])
  });

  constructor(private userServ:UserService, private router: Router) { }
  //set up subscribe calls to user service with backend url (var in user service)
  // if logged in successfully -- redirect to..

  get userName() {
    return this.loginForm.get('_username');
  }

  get userPassword() {
    return this.loginForm.get('_pwd');
  }

  userLogin() {
    //const user = new User(this.userName?.value, this.userPassword?.value);
  }

  ngOnInit(): void {
  }

}
