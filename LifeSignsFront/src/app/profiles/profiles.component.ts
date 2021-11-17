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
    this.currentUser = this.userServ.getLoggedInUser();
    console.log(this.currentUser);

    this.loadPhoto();
<<<<<<< HEAD
  }
  loadPhoto(){
    this.nurseServ.getPhoto(this.currentUser).subscribe(
      res => {
        console.log(res);
        this.currentUser.image = "http://s3.amazonaws.com/lifesigns/" + res.imageFileName;
      }
    )
=======
>>>>>>> 3817270e4143de985388f6f808aa15024ac5b460
  }

<<<<<<< HEAD
  updatePhoto() {
    alert('clicked update photo')
  }
=======
  // updatePhoto() {
  //   alert('clicked update photo')
  // }
>>>>>>> 3817270e4143de985388f6f808aa15024ac5b460
}

}
