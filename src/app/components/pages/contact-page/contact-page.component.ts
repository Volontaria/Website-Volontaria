import { Component } from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  templateUrl: 'contact-page.component.html',
  selector: 'app-contact',
  styleUrls: ['contact-page.component.scss'],
})
export class ContactPageComponent {
  constructor(private authenticationService: AuthenticationService) { }

  isAuthenticated() {
    return this.authenticationService.isAuthenticated();
  }
}
