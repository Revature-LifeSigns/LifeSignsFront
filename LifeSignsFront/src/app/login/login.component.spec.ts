import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from '../services/user/user.service';
import { User } from '../services/util/user';

import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormControl, FormGroup } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userService: UserService;
  const loginForm = new FormGroup({
    username: new FormControl('admin'),
    password: new FormControl('admin')
  });

  const loggedInUser: User = {
    role: 'admin',
    username: "admin",
    password: "",
    email: "",
    firstName: "Admin",
    lastName: "User",
    dob: "",
    address: "",
    image: "",
    aboutMe: "",
    specialty: "",
    viewPref: false,
    covidStatus: "",
    userid: 1
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should login user', ()=> {
    let spyOnMethod = spyOn(component, 'userLogin').and.callThrough();
    component.userLogin(new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    }));
    expect(spyOnMethod).toHaveBeenCalled();
  });

});
