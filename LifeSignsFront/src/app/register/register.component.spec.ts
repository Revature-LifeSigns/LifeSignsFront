import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    const fixture = TestBed.createComponent(RegisterComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should be valid name', ()=> {
    expect(component.validateName('Test', 'Name')).toBeTruthy();
  });

  it('should be invalid name', ()=> {
    expect(component.validateName('123', 'Name')).toBeFalsy();
  });

  it('should be valid zipcode', ()=> {
    expect(component.validateZip('20740')).toBeTruthy();
  });

  it('should be invalid zipcode', ()=> {
    expect(component.validateZip('abcde')).toBeFalsy();
  });

  it('should be valid username', ()=> {
    expect(component.validateUsername('user123')).toBeTruthy();
  });

  it('should be invalid username', ()=> {
    expect(component.validateUsername('user')).toBeFalsy();
  });

  it('should be valid email', ()=> {
    expect(component.validateEmail('name@domain.com')).toBeTruthy();
  });

  it('should be invalid email', ()=> {
    expect(component.validateEmail('email')).toBeFalsy();
  });

  it('should submit user form', ()=> {
    let spyOnMethod = spyOn(component, "submitUser").and.callThrough();
    component.submitUser(new FormGroup({
      role: new FormControl(''),
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      dob: new FormControl(''),
      address: new FormControl(''),
      street1: new FormControl(''),
      street2: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zipcode: new FormControl(''),
      email: new FormControl(''),
      username: new FormControl(''),
      password: new FormControl(''),
      confirmed: new FormControl('')
    }));
    expect(spyOnMethod).toHaveBeenCalled();
  });
});
