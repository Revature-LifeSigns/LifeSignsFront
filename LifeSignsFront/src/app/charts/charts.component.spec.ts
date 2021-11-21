import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ChartsComponent } from './charts.component';

describe('ChartsComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      declarations: [ ChartsComponent ]
    })
    .compileComponents();
  });

  it('should be created', () => {
    const fixture = TestBed.createComponent(ChartsComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });
});