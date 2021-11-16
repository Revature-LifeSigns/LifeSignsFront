import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { NurseService } from './nurse.service';
import { Nurse } from '../util/nurse';

describe('ApiService', () => {
  let service: NurseService;
  let httpMock: HttpTestingController;
  const dummyNurseProfile:Nurse = {
    user_id: 1,
    email: "test@test.com",
    username: "testNurse",
    firstname: "Test",
    dob: '2018-12-27T13:37:00.83' as unknown as Date,
    lastname: "Nurse",
    about_me: "This is my totally cool description of me.",
    view_preference: false,
    covid_status: "unknown"
  }


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[NurseService]
    });
    service = TestBed.inject(NurseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
