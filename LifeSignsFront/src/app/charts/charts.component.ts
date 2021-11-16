import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NurseService } from '../services/nurse/nurse.service';
import { Chart } from '../services/util/chart';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  chartsList: Chart[] = [];

  chartGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    dob: new FormControl(''),
    symptoms: new FormControl(''),
  });

  // adding for redirect to patient's id once logged in
  patientID$: Observable<number>;

  constructor(private route: ActivatedRoute, private nurseServ: NurseService) {
    this.patientID$ = this.route.params.pipe(
      map((params) => params['patientID'])
    );
  }

  ngOnInit(): void {
    this.patientID$.pipe().subscribe((id) => {
      console.log(id);
      // call api to retrieve patient's chart data
    });
  }

  public submitChart(chart: FormGroup) {
    this.nurseServ.sendPatientChart(chart.value).subscribe(
      (response) => {},
      (error) => {
        console.warn('Error Submitting Chart', error);
      }
    );
  }
}
