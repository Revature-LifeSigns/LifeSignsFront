import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { covidSurvey } from '../services/util/covidSurvey';

@Component({
  selector: 'app-doctor-covid-status',
  templateUrl: './doctor-covid-status.component.html',
  styleUrls: ['./doctor-covid-status.component.css'],
})
export class DoctorCovidStatusComponent implements OnInit {
  //Fields
  //Fields
  @ViewChild("showModal", { static: true })
  modal!: ElementRef;

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
    hasTraveled: false,
  };

  hasDisplayed = false;
  today = new Date().getDay();

  //Constructor
  constructor() {

  }

  //Methods
  ngOnInit(): void {
    if(this.today !== 4) {
      this.hasDisplayed = false;
    }

    if(this.today === 4 && this.hasDisplayed === false) {
      this.displayModal();
    }

  }

  //get value selected on submit.
  submit() {
    let formValues = this.covidStatusForm.value;
    type formKey = "headache" | "noSmellTaste" | "fever" | "cough" | "breathingDifficulties" | "exposed" | "hasTraveled";
    for (let key in formValues) {
      if (formValues[key] === "" || formValues[key] === "no" || formValues[key] === false) {
        this.covidSurvey[<formKey>key] = false;
      } else {
        this.covidSurvey[<formKey>key] = true;
      }
    }

    console.log(this.covidStatusForm.value);
    console.log(this.covidSurvey);
  }

  //Have to click a button with Bootstrap's data attributes to show modal.
  //This simulates the button being clicked, the button is hidden in the view.
  //There is probably a better way to do this.
  displayModal() {
    //document.getElementById('showModal')?.click();
    this.modal.nativeElement.click();
  }
}
