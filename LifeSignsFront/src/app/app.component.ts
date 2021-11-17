import { Component } from '@angular/core';
import { UserService } from './services/user/user.service';
import { ModeService } from './services/mode/mode.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LifeSignsFront';

  isVisible = true;

  constructor(private userService: UserService, private modeService: ModeService,
    private router: Router) {

  }

  // note *-* remove exclamation mark for all ngIf="isUserLoggedIn" in HTML file for actual implementation
  // leave for now for easier access
  get isUserLoggedIn() {
    return this.userService.isUserLoggedIn();
  }


  // ModeService is injected and toggleMode() is being called at each click event
  toggle(){
    this.modeService.toggleMode();
  }

  toggleUserMenu():void {
    this.isVisible = !this.isVisible;
  }
  logoutUser() {
    this.userService.logoutUser();
    this.router.navigate(['/login']);
  }

  // logout():void {

  // }
}

