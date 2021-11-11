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
    roleID: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmed: new FormControl('', [Validators.required])
  })

  constructor(private userServ:UserService, private router: Router) { }

  ngOnInit(): void {
  }

  public submitUser(user: FormGroup) {
    let errMess:any = document.getElementById('errorMessage');
    // Validate user input
    if (this.validateEmail(user.get('email')?.value)) {
      if (this.validateUsername(user.get('username')?.value)) {
        if (this.validatePwd(user.get('password')?.value)) {
          // Check that password and confirmation password match
          if (user.get('password')?.value == user.get('confirmed')?.value) {
            // Remove unnecessary field from control form
            user.removeControl('confirmed');
            // Create JSON object to send to backend
            let newUser = JSON.stringify(user.value);
            this.userServ.insertUser(newUser).subscribe(
              response => {
                if (response) {
                  // Success
                  errMess.innerHTML = '';
                  this.router.navigateByUrl('/login');
                } else {
                  // Failure
                  errMess.innerHTML = 'Username already exists. Please try a different one.';
                }
              }
            );
          } else {
            // Passwords no not match
            errMess.innerHTML = 'Passwords entered do not match. Please try again.';
          }
        } else {
          // Invalid Password
          errMess.innerHTML = 'Invalid password. Please try again.';
        }
      } else {
        // Invalid Username
        errMess.innerHTML = 'Invalid username. Please try again.';
      }
    } else {
      // Invalid Email
      errMess.innerHTML = 'Invalid input. Please try again.';
    }
  }

  // Username requirement: Must be lowercase, start with a letter, and can 
  // contain numbers, underscores, and periods (5-20 characters).
  private validateUsername(theUsername:string) {
    const re = /^[a-z]{1}[a-z0-9_.]{4,20}$/;
    return re.test(String(theUsername));
  }

  // Password requirement: Must include at least 1 lowercase, 1 uppercase, 
  // 1 number, and 1 special character (8-20 characters).
  private validatePwd(thePwd:string) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,20}$/;
    return re.test(String(thePwd));
  }

  // Email requirement: Must be a valid email [name@domain] (3-50 characters).
  private validateEmail(theEmail:string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(theEmail).toLowerCase());
  }
}
