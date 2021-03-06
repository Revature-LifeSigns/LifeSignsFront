import { Directive, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModeService } from '../services/mode/mode.service';
import { UserService } from '../services/user/user.service';
import { DarkTheme } from './theme/darkTheme';
import { LightTheme } from './theme/lightTheme';

import { Theme, ThemeMode } from './theme/theme';

@Directive({
  selector: '[appMode]'
})
export class ModeDirective implements OnInit{
  private currentUser:any;
  constructor(private modeServ: ModeService, private userServ: UserService, private _elementRef: ElementRef) { }

  ngOnInit(): void {
    this.currentUser = this.userServ.getLoggedInUser();
    var element = <HTMLInputElement> document.getElementById("checkbox");
    if(this.currentUser){
      if(this.currentUser.viewPref || this.currentUser.viewPref == null){
        element.checked = false;
        this.modeServ.setCurrentTheme(ThemeMode.LIGHT);
      }else{
        element.checked = true;
        this.modeServ.setCurrentTheme(ThemeMode.DARK);
      }
    }
    let currentTheme = this.modeServ.getActiveTheme();

    if(currentTheme)
      this.updateTheme(currentTheme);

    this.modeServ.themeChange.subscribe(
      (theme:Theme) => this.updateTheme(theme));
  }

  // sets css variable names to its values defined in parameter theme (datatype Theme defined in theme.ts)
  updateTheme(theme:Theme){
      for(const property in theme.styles){
        this._elementRef.nativeElement.style.setProperty(property, theme.styles[property]);
      }
    }
}
