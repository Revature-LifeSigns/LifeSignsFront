import { Component, OnInit } from '@angular/core';
import { NurseService } from '../services/nurse/nurse.service';
import { Nurse } from '../services/util/nurse';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  constructor(private nurseServ:NurseService) { }

  ngOnInit(): void {
    let currentUser:Nurse = JSON.parse(sessionStorage.getItem("currentUser")!);
    this.nurseServ.getNurseProfile(currentUser.user_id).subscribe(
      response => {
        console.log(currentUser);
      }
    )
  }

}
