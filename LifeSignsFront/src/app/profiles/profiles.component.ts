import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NurseService } from '../services/nurse/nurse.service';
import { UserService } from '../services/user/user.service';
import { User } from '../services/util/user';
import { AdminService } from '../services/admin/admin.service';
import { StringLiteralLike } from 'typescript';
import { Chart } from "../services/util/chart";

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

  currentUser!:any;
  isNurse:boolean = false;

  charts:Chart[];

  file: any;

  unitName:string = "";


  constructor(private userServ:UserService, private nurseServ:NurseService, private adminServ:AdminService) { }

  ngOnInit(): void {
    this.currentUser = this.userServ.getLoggedInUser();
    if(this.currentUser._role === 'nurse') {
      this.isNurse = true;
    }
    else {
      this.isNurse = false;
    }
    console.log(this.currentUser);
    this.loadPhoto();
    this.getAssignedUnit();
    this.nurseServ.getAllCharts().subscribe(
      response => {
        this.charts = response;
      }
    )
  }

  loadPhoto(){
    this.nurseServ.getPhoto(this.currentUser as User).subscribe(
      res => {
        console.log(res);
        this.currentUser._image = String("http://s3.amazonaws.com/lifesigns/" + res.imageFileName);
      }
    )
  }

  //onChange, create formdata object, then append file
  updatePhoto(event:any) {
    console.log(event.target.files[0]);
    this.file = event.target.files[0];
    let formData = new FormData();
    formData.append("file", this.file);
    formData.append("uploader", String(this.currentUser.userid));


    this.nurseServ.uploadPhoto(formData).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  getAssignedUnit(){
    let currentUser:any = this.userServ.getLoggedInUser();
    this.adminServ.getUnit(currentUser.userid).subscribe(
      response =>{
        this.unitName = response.unit;
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
