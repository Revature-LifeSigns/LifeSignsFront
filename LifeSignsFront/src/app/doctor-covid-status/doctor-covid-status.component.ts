import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-doctor-covid-status',
  templateUrl: './doctor-covid-status.component.html',
  styleUrls: ['./doctor-covid-status.component.css']
})
export class DoctorCovidStatusComponent implements OnInit {

  //Fields
  covidStatusForm = new FormGroup({
    status: new FormControl('', Validators.required)
  });

  //Constructor
  constructor() { }

  //Methods
  ngOnInit(): void {
    //gets the current day of the week as a number type(1-7);
    let today:number = new Date().getDay();
    //if today is Monday(1) this will display the modal.
    today === 1 && this.displayModal();
    //TODO: Needs to not display more than once on Monday. Displays with every login if its Monday right now.
  }

  //get value selected on submit.
  submit(){
    console.log(this.covidStatusForm.value);
  }

  //Have to click a button with Bootstrap's data attributes to show modal.
  //This simulates the button being clicked, the button is hidden in the view.
  //There is probably a better way to do this.
  displayModal() {
    document.getElementById('showModal')?.click();
  }

}
