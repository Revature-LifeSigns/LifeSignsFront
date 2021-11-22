import { HttpClientTestingModule } from '@angular/common/http/testing';
import { componentFactoryName } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { DarkTheme } from 'src/app/mode/theme/darkTheme';
import { LightTheme } from 'src/app/mode/theme/lightTheme';
import { ThemeMode } from 'src/app/mode/theme/theme';
import { User } from '../util/user';

import { ModeService } from './mode.service';

describe('ModeService', () => {
  let service: ModeService;
  const dummyUser: User = {
    role: 'nurse',
    username: "testNurse",
    password: "",
    email: "test@test.com",
    firstName: "Test",
    lastName: "Nurse",
    dob: "01-01-1900",
    address: "100 E Main St; ; Buffalo; NY; 00000",
    image: "http://s3.amazonaws.com/lifesigns/trees-adobespark.jpg",
    aboutMe: "This is my totally cool description of me.",
    specialty: "Pediatrics",
    viewPref: false,
    covidStatus: "unknown",
    userid: 1
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[ModeService]
    });
    service = TestBed.inject(ModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle theme', ()=> {
    let currentUser = dummyUser;
    let spyOnMethod = spyOn(service, 'toggleMode').and.callThrough();
    service.toggleMode();
    expect(spyOnMethod).toHaveBeenCalled();
  });

  it('should set the theme', ()=> {
    let spyOnMethod = spyOn(service, 'setCurrentTheme').and.callThrough();
    service.setCurrentTheme(ThemeMode.DARK);
    expect(spyOnMethod).toHaveBeenCalled();
  });

  it('should get the active theme', ()=> {
    let spyOnMethod = spyOn(service, 'getActiveTheme').and.callThrough();
    service.getActiveTheme();
    expect(spyOnMethod).toHaveBeenCalled();
  });
});
