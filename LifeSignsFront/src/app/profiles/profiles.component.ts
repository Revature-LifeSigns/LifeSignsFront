import { Component, OnInit } from '@angular/core';
import { NurseService } from '../services/nurse/nurse.service';
import { UserService } from '../services/user/user.service';
import { User } from '../services/util/user';
import { AdminService } from '../services/admin/admin.service';
import { StringLiteralLike } from 'typescript';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  currentUser!:User;
  unitName:String;

  constructor(private userServ:UserService, private nurseServ:NurseService, private adminServ:AdminService) { }

  ngOnInit(): void {
    this.currentUser = this.userServ.getLoggedInUser();
    console.log(this.currentUser);
    this.loadPhoto();
    this.getAssignedUnit();
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

  getAssignedUnit(){
    console.log(this.currentUser.userid);
    this.adminServ.getUnit(this.currentUser.userid).subscribe(
      response =>{
        console.log(response.unit);
        this.unitName = response.unit;
      }
    );
}
}
