import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {NotificationsService} from 'angular2-notifications';


@Component({
  selector: 'logout-page',
  templateUrl: 'logout-page.component.html',
  styleUrls: ['logout-page.component.scss']
})
export class LogoutPageComponent {

  constructor(private router: Router,
              private notificationService: NotificationsService) {
    localStorage.removeItem('token');
    localStorage.removeItem('userProfile');
    this.notificationService.success('Déconnecté', 'À bientôt!');
    this.router.navigate(['/login']);
  }
}
