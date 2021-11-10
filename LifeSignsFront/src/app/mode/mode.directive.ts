import { Directive, ElementRef, OnInit } from '@angular/core';
import { ModeService } from './mode.service';
import { Theme } from './theme/theme';

@Directive({
  selector: '[appMode]'
})
export class ModeDirective implements OnInit{

  constructor(private modeServ: ModeService, private _elementRef: ElementRef) { }
  
  ngOnInit(): void {
    this.updateTheme(this.modeServ.getActiveTheme());

    this.modeServ.themeChange.subscribe(
      (theme:Theme) => this.updateTheme(theme));
  }

  updateTheme(theme:Theme){
    for(const property in theme.styles){
      console.log(theme.styles[property]);
      this._elementRef.nativeElement.style.setProperty(property, theme.styles[property]);
    }
  }

}
