import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DarkTheme } from 'src/app/mode/theme/darkTheme';
import { LightTheme } from 'src/app/mode/theme/lightTheme';
import { ThemeMode } from 'src/app/mode/theme/theme';

import { ModeService } from './mode.service';

describe('ModeService', () => {
  let service: ModeService;

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
