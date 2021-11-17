import { inject, TestBed } from '@angular/core/testing';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Doctor } from '../util/doctorInterface';
import { DoctorService } from './doctor.service';

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

  it('should return doctor', () => {
    const fakeDoctor:Doctor = {
      userId: 1,
      firstName: 'Real',
      lastName: 'Doctor',
      dob: new Date('1900-01-01'),
      address: '123 Fake Street',
      picture: '',
      aboutMe: '',
      viewPreference: true,
      covidStatus: ''
    }
    service.setDoctor(fakeDoctor);
    expect(service.getDoctor().firstName).toEqual(fakeDoctor.firstName);
  });

});
