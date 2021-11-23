import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControl, FormGroup } from '@angular/forms';

import { By } from '@angular/platform-browser';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../services/user/user.service';


import { AccountComponent } from './account.component';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let modalServ: NgbModal;
  let userServ: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountComponent],
      imports:[HttpClientTestingModule],
      providers:[UserService]
    }).compileComponents();
    userServ = TestBed.inject(UserService);
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
  });


  it('should be created', () => {
    const fixture = TestBed.createComponent(AccountComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should be valid password', ()=> {
    expect(component.validatePwd('P4$$w0rd')).toBeTruthy();
  });

  it('should be invalid password', ()=> {
    expect(component.validatePwd('password')).toBeFalsy();
  });

  it('should display personal info', ()=> {
    const personal = fixture.debugElement.nativeElement.querySelector('.personal');
    expect(personal.childNodes[0].childNodes[0].innerHTML).toBe('Personal Info');
  });

  it('should display user email', ()=> {
    const email = fixture.debugElement.nativeElement.querySelector('.email');
    expect(email.childNodes[0].childNodes[0].innerHTML).toBe('Email');
  });

  it('should display reset password area', ()=> {
    const password = fixture.debugElement.nativeElement.querySelector('.password');
    expect(password.childNodes[0].childNodes[0].innerHTML).toBe('Password');
  })

  it('should have Update Password in button', () => {
    const btn = fixture.debugElement.nativeElement.querySelector('button');
    expect(btn.childNodes[0].innerHTML).toBe('UPDATE PASSWORD');
  });

  it('should update password', ()=> {
    let spyOnMethod = spyOn(component, 'updatePwd');

    component.updatePwd(new FormGroup({
      username: new FormControl(''),
      currentPassword: new FormControl(''),
      newPassword: new FormControl(''),
      passwordAgain: new FormControl('')
    }));
    expect(spyOnMethod).toHaveBeenCalled();
  });
});
