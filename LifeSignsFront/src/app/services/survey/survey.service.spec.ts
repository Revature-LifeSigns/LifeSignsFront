import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';


import { SurveyService } from './survey.service';

describe('SurveyService', () => {
  let service: SurveyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should have insertSurvey() return response', () => {
  //   service.insertSurvey(dummySurvey).subscribe(response => {
  //     expect(response.toString()).toEqual(dummySurvey);
  //   })
  //   const req = httpMock.expectOne(urlBase + "/survey/insert");
  //   expect(req.request.method).toBe("POST");
  //   req.flush(dummySurvey);
  // })
});
