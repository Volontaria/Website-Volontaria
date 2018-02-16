import {Component, ViewEncapsulation} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {

  responsive = false;

  constructor(private authenticationService: AuthenticationService) { }

  isAuthenticated() {
    return this.authenticationService.isAuthenticated();
  }

  isAdmin() {
    return this.authenticationService.isAdmin();
  }

  toogleResponsiveNavbar() {
    this.responsive = !this.responsive;
  }
}
