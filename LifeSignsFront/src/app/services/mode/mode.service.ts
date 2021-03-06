import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { DarkTheme } from 'src/app/mode/theme/darkTheme';
import { LightTheme } from 'src/app/mode/theme/lightTheme';
import { Theme, ThemeMode } from 'src/app/mode/theme/theme';
import { UserService } from '../user/user.service';


@Injectable({
  providedIn: 'root'
})
export class ModeService{

  private currentTheme;
  themeChange = new EventEmitter<Theme>();

  constructor(private userServ:UserService) { }

  // toggles between 2 Theme based on the current theme
  public toggleMode(){
    let currentUser = JSON.parse(localStorage.getItem("currentUser")!);

    currentUser.viewPref = !currentUser.viewPref;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    let temp = new User(currentUser.username, currentUser.userid, currentUser.viewPref);
    this.userServ.updateUserPref(temp).subscribe();
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

  setCurrentTheme(theme:ThemeMode){
    this.currentTheme = theme;
  }

  // returns the appropriate Theme (datatype Theme defined in theme.ts) based on the current theme
  getActiveTheme():Theme{
    if(this.currentTheme == ThemeMode.LIGHT)
      return LightTheme;
    return DarkTheme;
  }

}
class User{
  constructor(public username:string, public userid:number, public viewPreference:boolean){}
}
