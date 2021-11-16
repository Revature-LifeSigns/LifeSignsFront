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
import { Survey } from './survey/survey.component';
import { AuthGuardService } from './services/session-mgmt/auth-guard.service';
import { ModeDirective } from './mode/mode.directive';
import { NurseService } from './services/nurse/nurse.service';




@NgModule({
  declarations: [
    AppComponent,
    ModeDirective,
    ProfilesComponent,
    ChartsComponent,
    LoginComponent,
    Survey,
    RegisterComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot([
      {path: "home", component: LoginComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {
        path: "profiles", component: ProfilesComponent,
        // canActivate: [AuthGuardService] *-* keep commented out until needed
      },
      {
        path: "charts", component: ChartsComponent,
        // canActivate: [AuthGuardService] *-* keep commented out until needed + add to all routes except home/login/register
      },
      {path: "chat", component: AppComponent}, //TODO: fill in correct component for chat
      {path: "**", redirectTo: "home"}  //TODO fill in correct catch-all route

    ])
  ],

  providers: [UserService, NurseService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
