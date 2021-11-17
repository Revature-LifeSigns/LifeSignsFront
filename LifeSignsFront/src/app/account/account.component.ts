import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../services/user/user.service';
import { User } from '../services/util/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnChanges {
  currentUser!:User;

  passwordForm = new FormGroup({
    username: new FormControl(''),
    currentPassword: new FormControl(''),
    newPassword: new FormControl(''),
    passwordAgain: new FormControl('')
  });

  constructor(private modalServ:NgbModal, private userServ:UserService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.userServ.getLoggedInUser();
    console.log(this.currentUser);
  }

  ngOnChanges(): void {
    this.currentUser = this.userServ.getLoggedInUser();
  }

  open(content:any) {
    this.modalServ.open(content);
  }

  updatePwd(passwords:FormGroup) {
    let errMess: any = document.getElementById('errorMessage');
    if (this.validatePwd(passwords.get('currentPassword')!.value),
        this.validatePwd(passwords.get('newPassword')!.value),
        this.validatePwd(passwords.get('passwordAgain')!.value)) {
      if (passwords.get('newPassword')!.value == passwords.get('passwordAgain')!.value) {
        passwords.get('username')!.setValue(this.currentUser.username);
        this.userServ.updatePassword(JSON.stringify(passwords.value)).subscribe(
          response => {
            if (response) {
              errMess.innerHTML = '';
              document.getElementById('successMessage')!.innerHTML = 'Successfully changed password.'
              this.router.navigateByUrl('/account-details');
            } else {
              errMess.innerHTML = 'Current password does not match. Please try again.';
            }
          }
        );
      } else {
        // New password and confirmation don't match
        errMess.innerHTML = 'Passwords do not match. Please try again.'
      }
    } else {
      // Invalid fields
      errMess.innerHTML = 'Invalid password. Please try again.'
    }
  }

  private validatePwd(thePwd: string) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,20}$/;
    return re.test(String(thePwd));
  }
}
