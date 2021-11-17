import { inject, TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { DoctorService } from './doctor.service';
import { User } from '../util/user';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Photo } from '../util/photo';
import { Chart } from '../util/chart';

describe('DoctorService', () => {
  let service: DoctorService;
  let httpMock: HttpTestingController;
  let HttpClient: HttpClient;

  beforeEach(() => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'patch']);
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        {provide: HttpClient, useValue: httpClientSpy}
        ]
    });
    service = new DoctorService(httpClientSpy as any);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get photo',inject([HttpTestingController, DoctorService],
    (httpMock: HttpTestingController, service: DoctorService) => {
    let fakeUser:User = new User('','','','','','','','','','',true,'','',1);
    let fakePhoto:Photo = {
      photoId: 1,
      imagePath: '',
      imageFileName: '',
      uploader: fakeUser
    }
    service.getPhoto(fakeUser).subscribe(photo => expect(photo).toEqual(fakePhoto))
    const req = httpMock.expectOne('http://localhost:9025/LifeSigns/photo/1');
    expect(req.request.method).toEqual("GET");
    req.flush(fakePhoto);
    httpMock.verify;
    })
  );

  it('should get patient chart',inject([HttpTestingController, DoctorService],
    (httpMock: HttpTestingController, service: DoctorService) => {
    let fakeChart:Chart = {
      firstname: '',
      lastname: '',
      dob: undefined,
      address: '',
      email: '',
      insuranceId: 1,
      room: 1,
      notes: ''
    }
    service.getPatientChart(fakeChart).subscribe(chart => expect(chart).toEqual(fakeChart))
    const req = httpMock.expectOne('http://localhost:9025/LifeSigns/chart');
    expect(req.request.method).toEqual("GET");
    req.flush(fakeChart);
    httpMock.verify;
    })
  );

});
