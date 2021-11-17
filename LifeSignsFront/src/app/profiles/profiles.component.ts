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

  aboutMeGroup = new FormGroup({
    aboutMe: new FormControl('')
  })

  currentUser!:User;
  isNurse:boolean = false;

  file: any;

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

  //onChange, create formdata object, then append file
  updatePhoto(event:any) {
    alert("update photo clicked");
    console.log(event.target.files[0]);
    this.file = event.target.files[0];
    let formData = new FormData();
    formData.append("file", this.file, this.photoGroup.get("newPhoto")!.value);

    formData.append("uploader", String(this.currentUser.userid));

    this.nurseServ.uploadPhoto(formData).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  updateAboutMe() {
    this.currentUser.aboutMe = this.aboutMeGroup.value.aboutMe;
    this.userServ.updateUserProfile(this.currentUser).subscribe(
      response => {
        console.log(response);
      }
    )
  }
}
