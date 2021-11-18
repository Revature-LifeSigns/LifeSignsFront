import { inject, TestBed } from '@angular/core/testing';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Doctor } from '../util/doctorInterface';
import { DoctorService } from './doctor.service';
import { User } from '../util/user';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Photo } from '../util/photo';
import { Chart } from '../util/chart';

describe('DoctorService', () => {
  let service: DoctorService;
  let mockStream: jasmine.SpyObj<DoctorService>;
  let httpClientSpy: { get: jasmine.Spy };
  let fakeDoctor: any;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    const spy = jasmine.createSpyObj('DoctorService', ['getDoctor']);
    TestBed.configureTestingModule({
      providers: [{provide: DoctorService, useValue: spy}]
    });
    service = new DoctorService(httpClientSpy as any);
    mockStream = TestBed.inject(DoctorService) as jasmine.SpyObj<DoctorService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get photo',inject([HttpTestingController, DoctorService],
    (httpMock: HttpTestingController, service: DoctorService) => {
    let fakeUser: User = {
      role:"",
      username:"",
      password: "",
      email: "",
      firstname: "",
      lastname: "",
      dob: "",
      address: "",
      image: "",
      aboutMe:"",
      specialty: "",
      viewPref: true,
      covidStatus: "",
      userid:1
    };
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
      doctor: '',
      nurse: '',
      firstname: '',
      lastname: '',
      dob: undefined,
      address: '',
      email: '',
      insuranceId: 1,
      room: 1,
      diagnosis: '',
      notes: ''
    }
    service.getPatientChart(fakeChart).subscribe(chart => expect(chart).toEqual(fakeChart))
    const req = httpMock.expectOne('http://localhost:9025/LifeSigns/chart');
    expect(req.request.method).toEqual("GET");
    req.flush(fakeChart);
    httpMock.verify;
    })
  );
  it('should return doctor', () => {
    const fakeDoctor:Doctor = {
      userId: 1,
      firstName: 'Real',
      lastName: 'Doctor',
      dob: new Date('1900-01-01'),
      address: '123 Fake Street',
      picture: '',
      aboutMe: '',
      specialty: '',
      viewPreference: true,
      covidStatus: ''
    }
    // service.setDoctor(fakeDoctor);
    // expect(service.getDoctor().firstName).toEqual(fakeDoctor.firstName);
  });

});
