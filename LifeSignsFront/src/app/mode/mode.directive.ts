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

  constructor(private modeServ: ModeService, private userServ: UserService, private _elementRef: ElementRef) { }

    //todo: get preference from database and set to currentTheme
    // todo: set slider to correct side based on preference
  ngOnInit(): void {
    let currentUser = this.userServ.getLoggedInUser();
    let currentTheme = this.modeServ.getActiveTheme();
    var element = <HTMLInputElement> document.getElementById("checkbox");
    // console.log(element.checked)
    if(element)
      // console.log(element.checked = true)
      
    // console.log(element.checked)
    if(currentUser && (currentUser.viewPreference || currentUser.viewPreference == null)){
      currentTheme = LightTheme;
    }else{
      currentTheme = DarkTheme;
    }

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
