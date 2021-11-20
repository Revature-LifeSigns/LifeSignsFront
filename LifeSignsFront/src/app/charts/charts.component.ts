import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NurseService } from '../services/nurse/nurse.service';
import { UserService } from '../services/user/user.service';
import { Chart } from '../services/util/chart';
import { User } from '../services/util/user';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  chartsList: Chart[] = [];
  doctorList: User[] = [];
  nurseList: User[] = [];

  chartGroup = new FormGroup({
    doctor: new FormControl(''),
    nurse: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    dob: new FormControl(''),
    address: new FormControl(''),
    email: new FormControl(''),
    insuranceId: new FormControl(''),
    // room: new FormControl(''),
    diagnosis: new FormControl(''),
    notes: new FormControl('')
  });

  // adding for redirect to patient's id once logged in
  patientID$: Observable<number>;
  isVisible: boolean = false;
  currentUser!: User;

  constructor(private route: ActivatedRoute, private nurseServ: NurseService, private userServ: UserService) {
    this.patientID$ = this.route.params.pipe(
      map((params) => params['patientID'])
    );
  }

  ngOnInit(): void {
    this.currentUser = this.userServ.getLoggedInUser();
    this.patientID$.pipe().subscribe((id) => {
      console.log(id);
      // call api to retrieve patient's chart data
    });
    this.getDoctors();
  }

  public getDoctors(){
    this.userServ.getUsers().subscribe(
      res => {
        for(let i=0; i<res.length; i++){
          if(res[i].role == "doctor"){
            this.doctorList.push(res[i]);
          }
          if(res[i].role == 'nurse'){
            this.nurseList.push(res[i]);
          }
        }
      }
    )
    console.log(this.doctorList);
  }

  public submitChart(chart: FormGroup) {

    let formData = new FormData();
    formData.append("doctor", "unassign");
    formData.append("nurse", JSON.stringify(this.currentUser));//we need to add current user.


    let formValues = this.chartGroup.value;
    //type formKey = 'hasSymptoms' | 'isExposed' | 'hasTraveled';
    for (let key in formValues) {
      formData.append(key, formValues[key]);
      //console.log(key + value)

    }

    let formDataString = JSON.stringify(formData);
    console.log(formDataString);
    this.nurseServ.sendPatientChart(formDataString).subscribe(

      (response) => {

        console.log(response);
        window.alert('your form has been submitted!');
      },
      (error) => {
        console.warn('Error Submitting Chart', error);
      }
    );
  }

  toggleForm() {
  //console.log('button clicked');
    this.isVisible = !this.isVisible;
  }
}
