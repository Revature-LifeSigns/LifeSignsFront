import { Component, OnInit } from '@angular/core';
import { NurseService } from '../services/nurse/nurse.service';
import { UserService } from '../services/user/user.service';
import { User } from '../services/util/user';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  currentUser!:User;

  constructor(private userServ:UserService, private nurseServ:NurseService) { }

  ngOnInit(): void {
<<<<<<< HEAD
    let currentUser:Nurse = JSON.parse(sessionStorage.getItem("currentUser")!);
    // this.nurseServ.getNurseProfile(currentUser.user_id).subscribe(
    //   response => {
    //     console.log(currentUser);
    //   }
    // )
=======
    this.currentUser = this.userServ.getLoggedInUser();
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

>>>>>>> a856c36ba5bc36b3c91df713676e907281c9c5b8
  }

}


