import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'LifeSignsFront'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('LifeSignsFront');
  });

  it('should invoke toggle()', ()=> {
    let spyOnMethod = spyOn(component, "toggle");
    component.toggle();
    expect(spyOnMethod).toHaveBeenCalled();
  });

  it('should invoke toggleUserMenu()', ()=> {
    let spyOnMethod = spyOn(component, "toggleUserMenu").and.callThrough();
    component.toggleUserMenu();
    expect(spyOnMethod).toHaveBeenCalled();
  });

  it('should invoke logoutUser()', ()=> {
    let spyOnMethod = spyOn(component, "logoutUser");
    component.logoutUser();
    expect(spyOnMethod).toHaveBeenCalled();
  });
});
