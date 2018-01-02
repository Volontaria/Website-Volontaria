

import { Component } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {User} from "../../../models/user";
import {NotificationsService} from "angular2-notifications";

@Component({
  selector: 'manage-account-page',
  templateUrl: 'manage-account-page.component.html',
  styleUrls: ['manage-account-page.component.scss']
})
export class ManageAccountPageComponent {

  user: User;
  password: string;
  password_confirmation: string;

  error: string;

  constructor(private userService:UserService,
              private router:Router,
              private notificationService:NotificationsService)
  {
    this.user = new User();
  }

  createAccount() {
    if(this.password == this.password_confirmation){
      this.userService.createUser(this.user, this.password).subscribe(
        data => {
          this.notificationService.success('Inscription reussis', 'Verifier vos courriels!');
          this.router.navigate(['/login']);
        },
        err => {
          this.error = err;
        }
      );
    }
    else {
      this.error = 'La verification de mot de passe est errone.';
    }
  }
}
