import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../services/user/user.service';
import { User } from '../services/util/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnChanges {
  storedUser!:string;
  currentUser!:any;
  street1!:string;
  street2!:string;
  city!:string;
  state!:string;
  zip!:string;

  emailForm = new FormGroup({
    newEmail: new FormControl('')
  });

  passwordForm = new FormGroup({
    username: new FormControl(''),
    currentPassword: new FormControl(''),
    newPassword: new FormControl(''),
    passwordAgain: new FormControl('')
  });

  constructor(private modalServ:NgbModal, private userServ:UserService) { }

  ngOnInit(): void {
    this.storedUser = window.localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(this.storedUser);
    let address:string[] = this.currentUser._address.split(';');
    console.log(address);
    this.street1 = address[0];
    this.street2 = address[1];
    this.city = address[2];
    this.state = address[3];
    this.zip = address[4];
  }

  ngOnChanges(): void {

  }

  open(content:any) {
    this.modalServ.open(content);
  }

  updateEmail(emails:FormGroup) {
    let message: any = document.getElementById('message');
    if (this.validateEmail(emails.get('newEmail')!.value)) {
      
    } else {
      // Invalid email
      message.setAttribute("style", "color:red");
      message.innerHTML = 'Invalid email. Please try again.'
    }
  }

  updatePwd(passwords:FormGroup) {
    let message: any = document.getElementById('message');
    if (this.validatePwd(passwords.get('currentPassword')!.value) && 
        this.validatePwd(passwords.get('newPassword')!.value)) {
      if (passwords.get('newPassword')!.value == passwords.get('passwordAgain')!.value) {
        passwords.get('username')!.setValue(this.currentUser.username);
        this.userServ.updatePassword(JSON.stringify(passwords.value)).subscribe(
          response => {
            if (response) {
              message.setAttribute("style", "color:mediumseagreen");
              message.innerHTML = 'Successfully changed password.';
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

  private validateEmail(theEmail: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(theEmail).toLowerCase());
  }

  private validatePwd(thePwd: string) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,20}$/;
    return re.test(String(thePwd));
  }
}
