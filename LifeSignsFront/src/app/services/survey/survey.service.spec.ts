import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { covidSurvey } from '../util/covidSurvey';


import { SurveyService } from './survey.service';

describe('SurveyService', () => {
  let service: SurveyService;
  let httpMock: HttpTestingController;
  const dummySurvey: covidSurvey = {
    userId: 1,
    hasSymptoms: true,
    isExposed: true,
    hasTraveled: true
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[SurveyService]
    });
    service = TestBed.inject(SurveyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have insertSurvey() return response', () => {
    service.insertSurvey(dummySurvey.toString()).subscribe(response => {
      expect(response.toString()).toEqual(dummySurvey.toString());
    })
    const req = httpMock.expectOne("http://3.84.182.36:9025/LifeSigns/survey/insert");
    expect(req.request.method).toBe("POST");
    req.flush(dummySurvey);
  });
});
