import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    role: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    address: new FormControl(''),
    street1: new FormControl('', [Validators.required]),
    street2: new FormControl(''),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zipcode: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmed: new FormControl('', [Validators.required])
  });

  constructor(private userServ: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  public submitUser(user: FormGroup) {
    let errMess: any = document.getElementById('errorMessage');
    // Check that all fields were manipulated
    if (user.get('firstname')!.value == '' || user.get('lastname')!.value == '' ||
      user.get('dob')!.value == '' || user.get('email')!.value == '' ||
      user.get('street1')!.value == '' || user.get('city')!.value == '' ||
      user.get('state')!.value == '' || user.get('zipcode')!.value == '' ||
      user.get('role')!.value == '' || user.get('username')!.value == '' ||
      user.get('password')!.value == '' || user.get('confirmed')!.value == '') {
      errMess.innerHTML = 'All fields are required.'
    } else {
      // Validate user input
      if (this.validateName(user.get('firstname')?.value, user.get('lastname')?.value)) {
        if (this.validateEmail(user.get('email')?.value)) {
          if (this.validateZip(user.get('zipcode')?.value)) {
            if (this.validateUsername(user.get('username')?.value)) {
              if (this.validatePwd(user.get('password')?.value)) {
                // Check that password and confirmation password match
                if (user.get('password')?.value == user.get('confirmed')?.value) {

                  // Reformat address
                  var street1 = user.get('street1')!.value;
                  var street2 = user.get('street2')!.value;
                  var city = user.get('city')!.value;
                  var state = user.get('state')!.value;
                  var zip = user.get('zipcode')!.value;
                  user.get('address')!.setValue(street1 + "; " + street2 + "; " + city + "; " + state + "; " + zip);

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
            }
          } else {
            // Invalid zip code
            errMess.innerHTML = 'Invalid zip code. Please try again.'
          }
        } else {
          // Invalid email
          errMess.innerHTML = 'Invalid email. Please try again.';
        }
      } else {
        // Invalid name
        errMess.innerHTML = 'Invalid name. Please try again.'
      }
    }
  }

  // Validate name
  public validateName(fname: string, lname: string) {
    return /^[a-zA-Z]+ [a-zA-Z]+$/.test(fname + " " + lname);
  }
  // Validate zipcode
  public validateZip(theZipcode: string) {
    return /^\d{5}(-\d{4})?$/.test(theZipcode);
  }

  // Username requirement: Must be lowercase, start with a letter, and can
  // contain numbers, underscores, and periods (5-20 characters).
  public validateUsername(theUsername: string) {
    const re = /^[a-z]{1}[a-z0-9_.]{4,20}$/;
    return re.test(String(theUsername));
  }

  // Password requirement: Must include at least 1 lowercase, 1 uppercase,
  // 1 number, and 1 special character (8-20 characters).
  public validatePwd(thePwd: string) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,20}$/;
    return re.test(String(thePwd));
  }

  // Email requirement: Must be a valid email [name@domain] (3-50 characters).
  public validateEmail(theEmail: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(theEmail).toLowerCase());
  }
}
