import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../services/user/user.service';

import { AccountComponent } from './account.component';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let modalServ: NgbModal;
  let userServ: UserService;

  // beforeEach(async() => {
  //   TestBed.configureTestingModule({
  //     imports: [ HttpClientTestingModule ],
  //     declarations: [ AccountComponent ]
  //   })
  //   .compileComponents();
  // });

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

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(AccountComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

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
});
