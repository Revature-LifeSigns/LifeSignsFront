import { Directive, ElementRef, OnInit } from '@angular/core';
import { ModeService } from '../services/mode/mode.service';

import { Theme } from './theme/theme';

@Directive({
  selector: '[appMode]'
})
export class ModeDirective implements OnInit{

  constructor(private modeServ: ModeService, private _elementRef: ElementRef) { }

    //todo: get preference from database and set to currentTheme
    // todo: set slider to correct side based on preference
  ngOnInit(): void {
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
