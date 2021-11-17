import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  passwordForm = new FormGroup({
    currPwd: new FormControl(''),
    newPwd: new FormControl(''),
    pwdAgain: new FormControl('')
  });

  constructor(private modalServ:NgbModal) { }

  ngOnInit(): void {
  }

  open(content:any) {
    this.modalServ.open(content);
  }
}
