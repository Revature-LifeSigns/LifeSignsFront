import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NurseService } from '../services/nurse/nurse.service';
import { UserService } from '../services/user/user.service';
import { User } from '../services/util/user';
import { AdminService } from '../services/admin/admin.service';
import { Chart } from "../services/util/chart";

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  street1!:string;
  street2!:string;
  city!:string;
  state!:string;
  zip!:string;

  photoGroup = new FormGroup({
    newPhoto: new FormControl('')
  })

  aboutMeGroup = new FormGroup({
    aboutMe: new FormControl('')
  })

  currentUser!:any;
  isNurse:boolean = false;

  myCharts:Chart[] = [];
  unassignedCharts:Chart[] = [];
  myChartsVis:boolean = false;
  unassignedChartsVis:boolean = false;

  file: any;
  unitName:string = "";

  @Output()
  isEditChart: boolean = true;

  @Output()
  chartToEdit: Chart;

  constructor(private userServ:UserService, private nurseServ:NurseService, private adminServ:AdminService) { }

  ngOnInit(): void {
    this.currentUser = this.userServ.getLoggedInUser();
    let address:string[] = this.currentUser.address.split(';');
    this.street1 = address[0];
    this.street2 = address[1];
    this.city = address[2];
    this.state = address[3];
    this.zip = address[4];
    if(this.currentUser._role === 'nurse') {
      this.isNurse = true;
    }
    else {
      this.isNurse = false;
    }
    this.loadPhoto();
    // this.getAssignedUnit();
    this.nurseServ.getAllCharts().subscribe(
      response => {
        for(let i=0; i<response.length; i++){
          if (response[i].doctor == null || response[i].nurse == null){
            this.unassignedCharts.push(response[i]);
          } else if (response[i].doctor.userid == this.currentUser.userid || response[i].nurse.userid == this.currentUser.userid){
            this.myCharts.push(response[i]);
          }
        }
      }
    )
  }

  loadPhoto(){
    this.nurseServ.getPhoto(this.currentUser as User).subscribe(
      res => {
        this.currentUser.image = String("http://s3.amazonaws.com/lifesigns/" + res.imageFileName);
      }
    )
  }

  //onChange, create formdata object, then append file
  updatePhoto(event:any) {
    this.file = event.target.files[0];
    let formData = new FormData();
    formData.append("file", this.file);
    formData.append("uploader", String(this.currentUser.userid));
    console.log(this.currentUser.userid);
    this.nurseServ.uploadPhoto(formData).subscribe(
      response => {
        this.loadPhoto();
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

      }
    )
  }

  getChartToEdit(chart:Chart){
    this.chartToEdit = chart;
    console.log(chart);
  }

  displayMyCharts() {

    this.myChartsVis = !this.myChartsVis;
    this.nurseServ.getAllCharts();
  }
  displayUnassignedCharts() {
    this.unassignedChartsVis = !this.unassignedChartsVis;
    this.nurseServ.getAllCharts();
  }
}




