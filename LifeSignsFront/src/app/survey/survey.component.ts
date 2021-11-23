import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { covidSurvey } from '../services/util/covidSurvey';
import { UserService } from '../services/user/user.service';
import {SurveyService} from '../services/survey/survey.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
})
export class Survey implements OnInit {
  //Fields
  @ViewChild('showModal', { static: true })
  modal!: ElementRef;

  covidStatusForm = new FormGroup({
    hasSymptoms: new FormControl('', Validators.required),
    isExposed: new FormControl('', Validators.required),
    hasTraveled: new FormControl('', Validators.required),
  });



  covidSurvey: covidSurvey = {
    userId: 0,
    hasSymptoms: false,
    isExposed: false,
    hasTraveled: false,
  };

  hasDisplayed: boolean = false;
  today = new Date().getDay();
  dayToDisplay = 3;

  //Constructor
  constructor(private userServ: UserService, private surveyServ: SurveyService) {}

  //Methods
  ngOnInit(): void {
    //console.log(this.userServ.getLoggedInUser());
    this.hasDisplayed = false;
    if (this.today !== this.dayToDisplay) {
      this.hasDisplayed = false;
    }

    if (this.today === this.dayToDisplay && this.hasDisplayed === false) {
      this.displayModal();
      this.hasDisplayed = true;
    }
  }


  submit() {
    //get value selected on submit and update covidSurvey object.
    let formValues = this.covidStatusForm.value;
    type formKey = 'hasSymptoms' | 'isExposed' | 'hasTraveled';
    for (let key in formValues) {
      formValues[key] === 'no'
        ? (this.covidSurvey[<formKey>key] = false)
        : (this.covidSurvey[<formKey>key] = true);
    }
    //get user id from user service
    this.covidSurvey.userId = this.userServ.getLoggedInUser()!.userid as number;

    //submit to backend with survey service
    let surveyJson = JSON.stringify(this.covidSurvey);
    this.surveyServ.insertSurvey(surveyJson).subscribe(
      response => {
        // console.log(response);
      },
      error => {
        console.error(error);
      }
    )
  }

  //Have to click a button with Bootstrap's data attributes to show modal.
  //This simulates the button being clicked, the button is hidden in the view.
  displayModal() {
    this.modal.nativeElement.click();
  }
}
