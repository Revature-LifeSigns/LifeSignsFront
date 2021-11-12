import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NurseService } from '../services/nurse/nurse.service';
import { Chart } from '../services/util/chart';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})

export class ChartsComponent implements OnInit {

  chartsList: Chart[] = [];

  chartGroup = new FormGroup ({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    dob: new FormControl(''),
    address: new FormControl(''),
    email: new FormControl(''),
    insuranceId: new FormControl(''),
    room: new FormControl(''),
    notes: new FormControl('')
  });

  constructor(private nurseServ: NurseService) { }

  ngOnInit(): void {
  }

  public submitChart(chart: FormGroup) {

    this.nurseServ.sendPatientChart(chart.value).subscribe (
      response => {
      },
      error => {
        console.warn("Error Submitting Chart", error);
      }
    )
  }

}
