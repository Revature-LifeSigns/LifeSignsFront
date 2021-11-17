import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NurseService } from '../services/nurse/nurse.service';
import { UserService } from '../services/user/user.service';
import { User } from '../services/util/user';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  photoGroup = new FormGroup({
    newPhoto: new FormControl('')
  })

  currentUser!:User;
  isNurse:boolean;
  constructor(private userServ:UserService, private nurseServ:NurseService) { }

  ngOnInit(): void {
    this.currentUser = this.userServ.getLoggedInUser();
    if(this.currentUser.role === 'nurse') {
      this.isNurse = true;
    }
    else {
      this.isNurse = false;
    }
    console.log(this.currentUser);
    this.loadPhoto();
  }

  loadPhoto(){
    this.nurseServ.getPhoto(this.currentUser).subscribe(
      res => {
        console.log(res);
        this.currentUser.image = "http://s3.amazonaws.com/lifesigns/" + res.imageFileName;
      }
    )
  }

  updatePhoto() {
    alert('clicked update photo')
  }
}



