import { Component, OnInit } from '@angular/core';
import { ModeService } from './services/mode/mode.service';
import { UserService } from './services/user/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'LifeSignsFront';

  isVisible = true;
  constructor(private userServ: UserService, private modeService: ModeService){}

  ngOnInit(): void {
    // if(this.userServ.getLoggedInUser())
      this.isVisible = true;
    // else
    //   this.isVisible = false;
  }

  // ModeService is injected and toggleMode() is being called at each click event
  toggle(){
    this.modeService.toggleMode();
  }

}

