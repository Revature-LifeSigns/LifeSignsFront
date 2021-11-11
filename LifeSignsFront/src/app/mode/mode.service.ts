import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { DarkTheme } from './theme/darkTheme';
import { LightTheme } from './theme/lightTheme';
import { Theme, ThemeMode } from './theme/theme';

@Injectable({
  providedIn: 'root'
})
export class ModeService implements OnInit{

  private currentTheme = ThemeMode.LIGHT;
  themeChange = new EventEmitter<Theme>();
  
  constructor() { }


    //todo: get preference from database and set to currentTheme
  ngOnInit(): void {
    
  }

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