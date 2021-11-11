import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { ChartsComponent } from './charts/charts.component';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './services/user/user.service';
import { DoctorCovidStatusComponent } from './doctor-covid-status/doctor-covid-status.component';


@NgModule({
  declarations: [
    AppComponent,
    ProfilesComponent,
    ChartsComponent,
    LoginComponent,
    DoctorCovidStatusComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot([
      {path: "home", component: LoginComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: "profiles", component: ProfilesComponent},
      {path: "charts", component: ChartsComponent},
      {path: "chat", component: AppComponent}, //TODO: fill in correct component for chat
      {path: "**", redirectTo: "home"}  //TODO fill in correct catch-all route

    ])
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
