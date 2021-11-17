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
  street1!:string;
  street2!:string;
  city!:string;
  state!:string;
  zip!:string;

  passwordForm = new FormGroup({
    username: new FormControl(''),
    currentPassword: new FormControl(''),
    newPassword: new FormControl(''),
    passwordAgain: new FormControl('')
  });

  constructor(private modalServ:NgbModal, private userServ:UserService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.userServ.getLoggedInUser();
    let address:string[] = this.currentUser.address.split(';');
    if (address.length == 4) {
      // address does not have a street2 field
      this.street1 = address[0];
      this.street2 = '';
      this.city = address[1];
      this.state = address[2];
      this.zip = address[3];
    } else if (address.length == 5) {
      // address does have a street2 field
      this.street1 = address[0];
      this.street2 = address[1];
      this.city = address[2];
      this.state = address[3];
      this.zip = address[4];
    }
  }

  ngOnChanges(): void {
    // this.currentUser = this.userServ.getLoggedInUser();
    // console.log(this.currentUser);
    console.log("change made");
  }

  open(content:any) {
    this.modalServ.open(content);
  }

  updatePwd(passwords:FormGroup) {
    let message: any = document.getElementById('message');
    if (this.validatePwd(passwords.get('currentPassword')!.value),
        this.validatePwd(passwords.get('newPassword')!.value)) {
      if (passwords.get('newPassword')!.value == passwords.get('passwordAgain')!.value) {
        passwords.get('username')!.setValue(this.currentUser.username);
        this.userServ.updatePassword(JSON.stringify(passwords.value)).subscribe(
          response => {
            if (response) {
              message.setAttribute("style", "color:mediumseagreen");
              message.innerHTML = 'Successfully changed password.';
              console.log(response);
            } else {
              message.setAttribute("style", "color:red");
              message.innerHTML = 'Current password does not match. Please try again.';
            }
          }
        );
      } else {
        // New password and confirmation don't match
        message.setAttribute("style", "color:red");
        message.innerHTML = 'Passwords do not match. Please try again.'
      }
    } else {
      // Invalid fields
      message.setAttribute("style", "color:red");
      message.innerHTML = 'Invalid password. Please try again.'
    }
  }

  private validatePwd(thePwd: string) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,20}$/;
    return re.test(String(thePwd));
  }
}
