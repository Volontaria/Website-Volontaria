import { Component } from '@angular/core';
import {NotificationsService} from "angular2-notifications";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';

  public options = {
    position: ["bottom", "right"],
    timeOut: 5000,
    lastOnBottom: true,
  };

  constructor(){ }
}
