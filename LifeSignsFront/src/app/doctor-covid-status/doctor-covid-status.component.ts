import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { covidSurvey } from '../services/util/covidSurvey';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-doctor-covid-status',
  templateUrl: './doctor-covid-status.component.html',
  styleUrls: ['./doctor-covid-status.component.css'],
})
export class DoctorCovidStatusComponent implements OnInit {
  //Fields
  @ViewChild('showModal', { static: true })
  modal!: ElementRef;

  private currentUserId: number = null;

  covidStatusForm = new FormGroup({
    hasSymptoms: new FormControl('', Validators.required),
    isExposed: new FormControl('', Validators.required),
    hasTraveled: new FormControl('', Validators.required),
  });

  covidSurvey: covidSurvey = {
    userId: null,
    hasSymptoms: false,
    isExposed: false,
    hasTraveled: false,
  };

  hasDisplayed = false;
  today = new Date().getDay();

  //Constructor
  constructor(private userServ: UserService) {}

  //Methods
  ngOnInit(): void {
    //uncomment this out once hooked up to backend
    //this.currentUserId = this.userServ.getLoggedInUser().userid;

    if (this.today !== 5) {
      this.hasDisplayed = false;
    }

    if (this.today === 5 && this.hasDisplayed === false) {
      this.displayModal();
    }
  }

  //get value selected on submit and update covidSurvey object.
  submit() {
    let formValues = this.covidStatusForm.value;
    type formKey = 'hasSymptoms' | 'isExposed' | 'hasTraveled';
    for (let key in formValues) {
      formValues[key] === 'no'
        ? (this.covidSurvey[<formKey>key] = false)
        : (this.covidSurvey[<formKey>key] = true);
    }
    //get user id from user service
    this.covidSurvey.userId = this.currentUserId;

    //submit to backend with user service here
    console.log(this.covidStatusForm.value);
    console.log(this.covidSurvey);
  }

  //Have to click a button with Bootstrap's data attributes to show modal.
  //This simulates the button being clicked, the button is hidden in the view.
  displayModal() {
    this.modal.nativeElement.click();
  }
}
