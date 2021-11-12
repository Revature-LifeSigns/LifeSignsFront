import { Component } from '@angular/core';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LifeSignsFront';
  isVisible = true;

  constructor(private userService: UserService) {

  }

  // note *-* remove exclamation mark for all ngIf="isUserLoggedIn" in HTML file for actual implementation
  // leave for now for easier access
  get isUserLoggedIn() {
    return this.userService.isUserLoggedIn();
  }
}
