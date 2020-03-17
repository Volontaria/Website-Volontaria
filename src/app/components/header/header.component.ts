import {Component, ViewEncapsulation} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {

  responsive = false;
  organizationName = environment.organization_name;

  constructor(private authenticationService: AuthenticationService) { }

  isAuthenticated() {
    return this.authenticationService.isAuthenticated();
  }

  toggleResponsiveNavbar() {
    this.responsive = !this.responsive;
  }

  closeResponsiveNavbar() {
    this.responsive = false;
  }
}
