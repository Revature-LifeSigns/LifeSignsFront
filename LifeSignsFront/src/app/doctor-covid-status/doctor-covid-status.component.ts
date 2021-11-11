import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { covidSurvey } from '../services/util/covidSurvey';

@Component({
  selector: 'app-doctor-covid-status',
  templateUrl: './doctor-covid-status.component.html',
  styleUrls: ['./doctor-covid-status.component.css'],
})
export class DoctorCovidStatusComponent implements OnInit {
  //Fields
  covidStatusForm = new FormGroup({
    headache: new FormControl('', Validators.required),
    noSmellTaste: new FormControl('', Validators.required),
    fever: new FormControl('', Validators.required),
    cough: new FormControl('', Validators.required),
    breathingDifficulties: new FormControl('', Validators.required),
    exposed: new FormControl('', Validators.required),
    hasTraveled: new FormControl('', Validators.required),
  });

  covidSurvey: covidSurvey = {
    headache: false,
    noSmellTaste: false,
    fever: false,
    cough: false,
    breathingDifficulties: false,
    exposed: false,
    hasTraveled: false
  };

  //hasDisplayed = false;

  //Constructor
  constructor() {}

  //Methods
  ngOnInit(): void {


      let today: number = new Date().getDay();
      today === 4 && this.displayModal();


  }

  //get value selected on submit.
  submit() {
    let formValues = this.covidStatusForm.value;
    for(let key in formValues) {
       if(formValues[key] !== "" || formValues[key] !== "no") {
         //this.covidSurvey[key] = true;
       }
    }

    console.log(this.covidStatusForm.value);
    console.log(this.covidSurvey);
  }

  //Have to click a button with Bootstrap's data attributes to show modal.
  //This simulates the button being clicked, the button is hidden in the view.
  //There is probably a better way to do this.
  displayModal() {
    document.getElementById('showModal')?.click();
  }
}
