import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { NurseService } from './nurse.service';
import { User } from '../util/user';
import { Photo } from '../util/photo';

describe('NurseService', () => {
  let service: NurseService;
  let httpMock: HttpTestingController;
  const dummyNurseProfile: User = {

    role:'nurse',
    username:"TestUsername",
    password: "TestPassword",
    email: "TestEmail",
    firstName: "TestFirstName",
    lastName: "TestLastName",
    dob: "TestDoB",
    address: "TestAddress",
    image: "http://s3.amazonaws.com/lifesigns/example.jpg",
    aboutMe:"TestAbout",
    specialty: "none",
    viewPref: false,
    covidStatus: "TestCovidStatus",
    userid:1
  };
  const testPhoto:Photo = {
    photoId: 1,
    imagePath: "/lifesigns/",
    imageFileName: "tree.jpg",
    uploader: dummyNurseProfile
  }


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[NurseService]
    });
    service = TestBed.inject(NurseService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  let file = new FormData();

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have getPhoto() return data', () => {
    service.getPhoto(dummyNurseProfile).subscribe( response =>{
    expect(response.toString()).toEqual(testPhoto.toString());
  })
  const req = httpMock.expectOne("http://localhost:9025/LifeSigns/photo/1");
  expect(req.request.method).toBe("GET");
  req.flush(testPhoto);
})

it('should have uploadPhoto() return response', () => {
  service.uploadPhoto(file).subscribe( response =>{
  expect(response.toString()).toEqual(file.toString());
})
const req = httpMock.expectOne("http://localhost:9025/LifeSigns/photo");
expect(req.request.method).toBe("POST");
req.flush(file);
})
});
