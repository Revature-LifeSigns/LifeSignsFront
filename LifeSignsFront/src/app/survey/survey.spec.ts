// <<<<<<< HEAD
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
//   const dummyUser = new User("1","TestUsername", "TestPassword", "TestEmail", "TestFirstName",
//     "TestLastName", "TestDoB", "TestAddress", "http://s3.amazonaws.com/lifesigns/" + imgStr,
//     "TestAbout", false, "TestCovidStatus", "1");

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

// =======
// import { ComponentFixture, TestBed } from '@angular/core/testing';

// <<<<<<< HEAD:LifeSignsFront/src/app/account/account.component.spec.ts
// import { AccountComponent } from './account.component';

// describe('AccountComponent', () => {
//   let component: AccountComponent;
//   let fixture: ComponentFixture<AccountComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ AccountComponent ]
// =======
// import { Survey } from './survey.component';

// describe('DoctorCovidStatusComponent', () => {
//   let component: Survey;
//   let fixture: ComponentFixture<Survey>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ Survey ]
// >>>>>>> 57fe4813f1f247b872103a64adcbbb467a9341fa:LifeSignsFront/src/app/survey/survey.spec.ts
//     })
//     .compileComponents();
//   });

//   beforeEach(() => {
// <<<<<<< HEAD:LifeSignsFront/src/app/account/account.component.spec.ts
//     fixture = TestBed.createComponent(AccountComponent);
// =======
//     fixture = TestBed.createComponent(Survey);
// >>>>>>> 57fe4813f1f247b872103a64adcbbb467a9341fa:LifeSignsFront/src/app/survey/survey.spec.ts
//     component = fixture.componentInstance;
// >>>>>>> 57fe4813f1f247b872103a64adcbbb467a9341fa
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// <<<<<<< HEAD

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

// =======
// >>>>>>> 57fe4813f1f247b872103a64adcbbb467a9341fa
// });
