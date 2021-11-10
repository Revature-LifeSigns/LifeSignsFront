import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DoctorCovidStatusComponent } from './doctor-covid-status/doctor-covid-status.component';

@NgModule({
  declarations: [
    AppComponent,
    DoctorCovidStatusComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
