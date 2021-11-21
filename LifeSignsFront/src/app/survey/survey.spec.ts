
// import { HttpClient } from '@angular/common/http';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { By } from '@angular/platform-browser';
// import { Observable } from 'rxjs';
// import { SurveyService } from '../services/survey/survey.service';
// import { UserService } from '../services/user/user.service';
// import { User } from '../services/util/user';

// import { Survey } from './survey.component';

// describe('SurveyComponent', () => {
//   let component: Survey;
//   let fixture: ComponentFixture<Survey>;
//   let userServ: UserService;
//   let surveyServ: SurveyService;
//   let mockClient: {get: jasmine.Spy, post: jasmine.Spy};

//   const imgStr = 'src';

//   const dummyUser: User = {
//     role:"doctor",
//     username:"TestUsername",
//     password: "TestPassword",
//     email: "TestEmail",
//     firstname: "TestFirstname",
//     lastname: "TestLastname",
//     dob: "TestDob",
//     address: "TestAddress",
//     image: "http://s3.amazonaws.com/lifesigns/" + imgStr,
//     aboutMe:"TestAbout",
//     specialty: "TestSpecialty",
//     viewPref: false,
//     covidStatus: "TestCovidStatus",
//     userid:1
//   };

//   class UserServiceMock {
//     getLoggedInUser(): User{
//       return dummyUser;
//     }
//   }

//   class SurveyServiceMock {
//     insertSurvey(surveyJson: String): Observable<Object> {
//       return new Observable();
//     }
//   }


//   beforeEach(() => {

//     TestBed.configureTestingModule({
//       declarations: [ Survey ],
//       imports: [ReactiveFormsModule, FormsModule],
//       providers:[
//         {provide: UserService, useClass: UserServiceMock},
//         {provide: SurveyService, useClass: SurveyServiceMock},
//         {provide: HttpClient, useValue: mockClient}
//       ]
//     })
//     .compileComponents();

//     userServ = TestBed.inject(UserService);
//     surveyServ = TestBed.inject(SurveyService);
//     mockClient =  TestBed.get(HttpClient);

//     fixture = TestBed.createComponent(Survey);
//     component = fixture.componentInstance;


//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });


//   it('should set today date after init', () => {
//     component.ngOnInit();
//     expect(component.today).toBe(new Date().getDay());
//   });

//   it('should set "hasDisplayed = false" if it is not a proper day after init', () => {
//     component.hasDisplayed = true;
//     component.today = 1;
//     component.dayToDisplay = 2;
//     component.ngOnInit();
//     expect(component.hasDisplayed).toBe(false);
//   });

//   it('should not set "hasDisplayed = false" if it is not a proper day after init', () => {
//     component.hasDisplayed = true;
//     component.today = 1;
//     component.dayToDisplay = 1;
//     component.ngOnInit();
//     expect(component.hasDisplayed).toBe(true);
//   });

//   it('should show modal when the date is correct', () => {
//     component.hasDisplayed = false;
//     component.today = new Date().getDay();
//     component.dayToDisplay =  new Date().getDay();
//     spyOn(component, "displayModal");
//     component.ngOnInit();
//     fixture.whenStable().then(()=>{
//       expect(component.displayModal).toHaveBeenCalled();
//     })
//   });

//   it('should not show modal when the date is not correct', () => {
//     component.hasDisplayed = false;
//     component.today = 1;
//     component.dayToDisplay =  2;
//     spyOn(component, "displayModal");
//     component.ngOnInit();
//     fixture.whenStable().then(()=>{
//       expect(component.displayModal).toHaveBeenCalled();
//     })
//   });

//   it('covidStatusForm invalid when empty', () => {
//     component.ngOnInit();
//     expect(component.covidStatusForm.valid).toBeFalsy();
//   });

//   it('submitting a covidStatusForm updates covidSurvey', () => {
//     component.ngOnInit();
//     expect(component.covidStatusForm.valid).toBeFalsy();
//     component.covidStatusForm.controls['hasSymptoms'].setValue("yes");
//     component.covidStatusForm.controls['isExposed'].setValue("yes");
//     component.covidStatusForm.controls['hasTraveled'].setValue("yes");
//     expect(component.covidStatusForm.valid).toBeTruthy();
//     expect(component.covidSurvey.hasSymptoms).toBeFalse();
//     expect(component.covidSurvey.isExposed).toBeFalse();
//     expect(component.covidSurvey.hasTraveled).toBeFalse();
//     expect(component.covidSurvey.userId).toBe(null);
//     component.submit();
//     expect(component.covidSurvey.hasSymptoms).toBeTrue();
//     expect(component.covidSurvey.isExposed).toBeTrue();
//     expect(component.covidSurvey.hasTraveled).toBeTrue();
//     expect(component.covidSurvey.userId).toBe(dummyUser.userid);
//   });

// });

