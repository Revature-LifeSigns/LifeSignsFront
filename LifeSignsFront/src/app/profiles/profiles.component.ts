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
    this.currentUser = JSON.parse(sessionStorage.getItem("currentUser")!);
    // this.nurseServ.getNurseProfile(currentUser.user_id).subscribe(
    //   response => {
    //     console.log(currentUser);
    //   }
    // )
  }

}
