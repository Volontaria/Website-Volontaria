import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  token: string;

  resetForm: FormGroup;
  errors: string[];

  success: boolean = null;

  constructor(private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private notificationService: NotificationsService,
              private router: Router) {
    this.resetForm = this.formBuilder.group(
      {
        password: [null, Validators.required],
        confirmation: [null, Validators.required]
      },
      {
        validator: [
          this.confirmationValidator()
        ]
      }
    );
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.token = params['token'];
    });
  }

  changePassword(form: FormGroup) {
    if ( form.valid ) {
      this.authenticationService.changePassword(this.token, form.value['password']).subscribe(
        data => {
          this.notificationService.success('Mot de passe réinitialiser', 'Vous pouvez maintenant vous connecter.');
          this.router.navigate(['/']);
        },
        err => {
          if (err.error.non_field_errors) {
            this.errors = err.error.non_field_errors;
          }
          if (err.error.new_password) {
            this.resetForm.controls['password'].setErrors({
              apiError: err.error.new_password
            });
          }
        }
      );
    } else {
      this.errors = ['Veuillez remplir tout les champs obligatoires'];
    }
  }

  confirmationValidator() {
    return (group: FormGroup) => {

      const password = group.controls['password'];
      const confirmation = group.controls['confirmation'];

      if (password.value !== confirmation.value) {
        return confirmation.setErrors({
          apiError: ['La confirmation n\'est pas identique au mot de passe.']
        });
      }
    };
  }
}
