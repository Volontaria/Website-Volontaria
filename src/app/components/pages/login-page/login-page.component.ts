import { Component } from '@angular/core';
import {AuthenticationService} from '../../../services/authentication.service';
import { Router } from '@angular/router';
import {UserService} from '../../../services/user.service';
import {NotificationsService} from 'angular2-notifications';
import {environment} from '../../../../environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: 'login-page.component.html',
  styleUrls: ['login-page.component.scss']
})
export class LoginPageComponent {

  login: string;
  password: string;
  error: string;

  welcomeMessage = environment.welcomeMessage;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private userService: UserService,
    private notificationService: NotificationsService
  ) {}

  authenticate() {
    this.authenticationService.authenticate(this.login, this.password).subscribe(
      data => {
        localStorage.setItem('token', data.token);
        this.userService.getProfile().subscribe(
          profile => {
            localStorage.setItem('userProfile', JSON.stringify(profile));
            this.notificationService.success('Connecté', 'Bienvenue!');
            this.router.navigate(['/index']);
          }
        );
      },
      err => {
        this.error = 'Ces identifiants sont incorrects!';
      }
    );
  }
}
