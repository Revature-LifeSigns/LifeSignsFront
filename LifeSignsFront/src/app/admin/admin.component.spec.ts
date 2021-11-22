import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      declarations: [ AdminComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should assign unit', ()=> {
    let spyOnMethod = spyOn(component, "assignUnit").and.callThrough();
    component.assignUnit(new FormGroup({
      unit: new FormControl('')
    }));
    expect(spyOnMethod).toHaveBeenCalled();
  });

  it('should get assigned unit', ()=> {
    let spyOnMethod = spyOn(component, 'getAssignedUnit').and.callThrough();
    component.getAssignedUnit();
    expect(spyOnMethod).toHaveBeenCalled();
  });
});
