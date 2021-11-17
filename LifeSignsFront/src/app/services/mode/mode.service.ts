import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { DarkTheme } from 'src/app/mode/theme/darkTheme';
import { LightTheme } from 'src/app/mode/theme/lightTheme';
import { Theme, ThemeMode } from 'src/app/mode/theme/theme';


@Injectable({
  providedIn: 'root'
})
export class ModeService{

  private currentTheme = ThemeMode.LIGHT;
  themeChange = new EventEmitter<Theme>();
  
  constructor() { }

  // toggles between 2 Theme based on the current theme
  public toggleMode(){
    if(this.currentTheme == ThemeMode.LIGHT){
      this.setTheme(ThemeMode.DARK)
    }else{
      this.setTheme(ThemeMode.LIGHT)
    }
  }

  // sets the current theme based on parameter input (datatype ThemeMode defined in theme.ts)
  private setTheme(theme:ThemeMode){
    this.currentTheme = theme;

    //deliveres the event getActiveTheme() whenever themeChange is referenced
    this.themeChange.emit(this.getActiveTheme());
  }

  // returns the appropriate Theme (datatype Theme defined in theme.ts) based on the current theme
  getActiveTheme():Theme{
    if(this.currentTheme == ThemeMode.LIGHT)
      return LightTheme;
    return DarkTheme;
  }
}
