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
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    ModeDirective,
    ProfilesComponent,
    ChartsComponent,
    LoginComponent,
    Survey,
    RegisterComponent,
    AccountComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule, NgbModule, RouterModule.forRoot([
      {path: "home", component: LoginComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'account-details', component: AccountComponent},
      {
        path: "profiles", component: ProfilesComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "charts", component: ChartsComponent,
        // *_* refactor below once params setup
        // path: "charts/:patientID", component: ChartsComponent,
        // canActivate: [AuthGuardService] *-* keep commented out until needed + add to all routes except home/login/register
      },
      {path: "chat", component: AppComponent}, //TODO: fill in correct component for chat
      {path: "admin", component: AdminComponent},
      {path: "**", redirectTo: "home"}  //TODO fill in correct catch-all route

    ])
  ],

  providers: [UserService, NurseService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
