import { Component } from '@angular/core';
import { ModeService } from './mode/mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LifeSignsFront';

  constructor(private modeService: ModeService){}

  toggle(){
    this.modeService.toggleMode();
  }
}
