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
    userName: new FormControl('', [Validators.required]),
    userPassword: new FormControl('', [Validators.required])
  });

  constructor(private userService:UserService, private router: Router) { }

  get userName() {
    return this.loginForm.get('userName');
  }

  get userPassword() {
    return this.loginForm.get('userPassword');
  }

  userLogin(){
    const user = new User(this.userName?.value, this.userPassword?.value,)
  }

  ngOnInit(): void {
  }

}
