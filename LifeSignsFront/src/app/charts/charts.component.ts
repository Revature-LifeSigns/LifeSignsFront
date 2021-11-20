import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UpdateExpression } from 'typescript';

import { NurseService } from '../services/nurse/nurse.service';
import { UserService } from '../services/user/user.service';
import { Chart } from '../services/util/chart';
import { User } from '../services/util/user';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit, DoCheck {
  chartsList: Chart[] = [];
  doctorList: User[] = [];
  nurseList: User[] = [];

  chartGroup = new FormGroup({
    doctor: new FormControl({}),
    nurse: new FormControl({}),
    firstName: new FormControl(),
    lastName: new FormControl(''),
    dob: new FormControl(''),
    street: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    zipcode: new FormControl(''),
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
  tempDoc!:User;
  tempNurse!: User;

  @Input() isEditChart: boolean;
  @Input() chartToEdit:Chart;
  allowAutoFillChart = true;

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

  ngDoCheck() {
    if(this.allowAutoFillChart && this.isEditChart && this.chartToEdit) {
      console.log("In Edit Chart " + this.chartToEdit.firstName);
      this.chartGroup = new FormGroup({
        chartid: new FormControl(this.chartToEdit.chartid),
        doctor: new FormControl(this.chartToEdit.doctor),
        nurse: new FormControl(this.chartToEdit.nurse),
        firstName: new FormControl(this.chartToEdit.firstName),
        lastName: new FormControl(this.chartToEdit.lastName),
        dob: new FormControl(this.chartToEdit.dob),
        street: new FormControl(""),
        city: new FormControl(""),
        state: new FormControl(''),
        zipcode: new FormControl(''),
        address: new FormControl(this.chartToEdit.address),
        email: new FormControl(this.chartToEdit.email),
        insuranceId: new FormControl(this.chartToEdit.insuranceid),
        // room: new FormControl(''),
        diagnosis: new FormControl(this.chartToEdit.diagnosis),
        notes: new FormControl(this.chartToEdit.notes),
        treatment: new FormControl(this.chartToEdit.treatment)
      });
      this.allowAutoFillChart = false;
    }
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

  onDoctorSelect(doctorid: string){

    this.tempDoc = this.doctorList.find(doctor => {
      return doctor.userid == doctorid as undefined as number
    } );

  }

  onNurseSelect(nurseid: string){
    this.tempNurse = this.nurseList.find(nurse => {
      return nurse.userid == nurseid as undefined as number
    } );
  }

  public updateChart(chart:FormGroup){

  }

  public submitChart(chart: FormGroup) {
    let addressJoin= chart.get("street").value + "; " + chart.get("city").value + ", " + chart.get("state").value + " " + chart.get("zipcode").value;
    chart.removeControl("street");
    chart.removeControl("city");
    chart.removeControl("state");
    chart.removeControl("zipCode");
    chart.patchValue({address: addressJoin});
    chart.patchValue({nurse: this.tempNurse});
    chart.patchValue({doctor: this.tempDoc});


    let formDataString = JSON.stringify(chart.value);
    console.log(chart.value);

    if(this.isEditChart){
      this.nurseServ.updatePatientChart(formDataString).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.warn("Error Updating Chart", error);
        }
      )

    } else {
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
  }

  toggleForm() {
  //console.log('button clicked');
    this.isVisible = !this.isVisible;
  }
}
