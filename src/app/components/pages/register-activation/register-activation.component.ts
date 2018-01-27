import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-register-activation',
  templateUrl: 'register-activation.component.html',
  styleUrls: ['register-activation.component.scss']
})
export class RegisterActivationComponent implements OnInit {

  success: Boolean = null;

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params);
      this.userService.activate(params['token']).subscribe(
        data => {
          this.success = true;
        },
        error => {
          this.success = false;
        }
      );
    });
  }
}
