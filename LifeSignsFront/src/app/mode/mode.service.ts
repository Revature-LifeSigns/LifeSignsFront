import { EventEmitter, Injectable } from '@angular/core';
import { DarkTheme } from './theme/darkTheme';
import { LightTheme } from './theme/lightTheme';
import { Theme, ThemeMode } from './theme/theme';

@Injectable({
  providedIn: 'root'
})
export class ModeService {

  private currentTheme = ThemeMode.LIGHT;
  themeChange = new EventEmitter<Theme>();
  
  constructor() { }

  public toggleMode(){
    if(this.currentTheme == ThemeMode.LIGHT){
      this.setTheme(ThemeMode.DARK)
    }else{
      this.setTheme(ThemeMode.LIGHT)
    }
  }

  private setTheme(theme:ThemeMode){
    this.currentTheme = theme;
    this.themeChange.emit(this.getActiveTheme());
  }

  getActiveTheme():Theme{
    if(this.currentTheme == ThemeMode.LIGHT)
      return LightTheme;
    return DarkTheme;
  }
}
