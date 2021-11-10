import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { ChartsComponent } from './charts/charts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    ProfilesComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot([
      {path: "home", component: AppComponent}, //TODO: fill in correct component for home
      {path: "profiles", component: ProfilesComponent},
      {path: "charts", component: ChartsComponent},
      {path: "chat", component: AppComponent}, //TODO: fill in correct component for chat
      {path: "**", redirectTo: "home"}  //TODO fill in correct catch-all route
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
