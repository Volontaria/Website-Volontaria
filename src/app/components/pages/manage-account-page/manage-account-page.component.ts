import { Component } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {User} from '../../../models/user';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-manage-account',
  templateUrl: 'manage-account-page.component.html',
  styleUrls: ['manage-account-page.component.scss']
})
export class ManageAccountPageComponent {

  user: User;
  password: string;
  password_confirmation: string;

  error: any;
  errorConfirmationPassword: string;

  constructor(private userService: UserService,
              private router: Router,
              private notificationService: NotificationsService) {
    this.user = new User();
  }

  createAccount() {
    if (this.checkConfirmPassword()) {
      this.userService.createUser(this.user, this.password).subscribe(
        data => {
          this.router.navigate(['/register/validation']);
        },
        error => {
          this.error = error;
        }
      );
    }
  }

  checkConfirmPassword() {
    if (this.password !== this.password_confirmation) {
      this.errorConfirmationPassword = 'La verification de mot de passe est errone.';
      return false;
    } else {
      this.errorConfirmationPassword = null;
      return true;
    }
  }
}
