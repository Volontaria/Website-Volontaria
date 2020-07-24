import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private snackBar: MatSnackBar) {
    this.authenticationService.logout().subscribe();
    this.snackBar.open(
      'Déconnexion réussie, à bientôt!',
      '',
      {
        duration: 3000,
      }
    );
    this.router.navigate(['/login']);
  }
}
