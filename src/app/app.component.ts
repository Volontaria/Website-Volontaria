import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  public options = {
    position: ['bottom', 'right'],
    timeOut: 5000,
    lastOnBottom: true,
    preventDuplicates: true,
  };

  constructor(private titleService:Title) {
    this.titleService.setTitle('Volontaria - ' + environment.organisation_name);
  }
}
