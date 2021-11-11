import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../services/util/user';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    role: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmed: new FormControl('', [Validators.required])
  });
  constructor(private userServ:UserService, private router: Router) { }

  ngOnInit(): void {
  }

  public submitUser(user: FormGroup) {
    let roleid:number = 0;
    switch(user.get('role')?.value) {
      case 'Doctor':
        roleid=1;
        break;
      case 'Nurse':
        roleid=2;
        break;
      case 'Patient':
        roleid=3;
        break;
    }
    let newUser:User = new User('', '', '', roleid);
    newUser.email = user.get('email')?.value;
    newUser.username = user.get('username')?.value;
    if (user.get('password')?.value == user.get('confirmed')?.value) {
      newUser.pwd = user.get('password')?.value;
    }

    let stringUser = JSON.stringify(newUser);
    // call user service insertUser method
  }
}
