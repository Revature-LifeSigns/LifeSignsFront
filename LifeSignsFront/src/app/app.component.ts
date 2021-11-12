import { Component } from '@angular/core';
import { ModeService } from './mode/mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LifeSignsFront';

  isVisible = true;
  constructor(private modeService: ModeService){}

  // ModeService is injected and toggleMode() is being called at each click event
  toggle(){
    this.modeService.toggleMode();
  }

  toggleUserMenu():void {
    this.isVisible = !this.isVisible;
  }
    

}

