import { Component } from '@angular/core';
import { UserService } from './services/user/user.service';
import { ModeService } from './services/mode/mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'LifeSignsFront';

  isVisible = true;

  constructor(private userService: UserService, private modeService: ModeService) {

  }

  // note *-* remove exclamation mark for all ngIf="isUserLoggedIn" in HTML file for actual implementation
  // leave for now for easier access
  get isUserLoggedIn() {
    return this.userService.isUserLoggedIn();
  }
  get userLoggedIn(){
    return this.userService.getLoggedInUser();
  }
  // ModeService is injected and toggleMode() is being called at each click event
  toggle(){
    this.modeService.toggleMode();
  }

  toggleUserMenu():void {
    this.isVisible = !this.isVisible;
  }


}

