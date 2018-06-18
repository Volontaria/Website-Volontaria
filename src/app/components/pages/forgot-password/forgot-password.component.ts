import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  forgotForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private router: Router) {
    this.forgotForm = this.formBuilder.group(
      {
        username: null,
      }
    );
  }

  resetPassword(form: FormGroup) {
    if ( form.valid ) {
      this.authenticationService.resetPassword(form.value['username']).subscribe(
        data => {
          this.router.navigate(['/forgot-password/confirmation']);
        },
        err => {
          if (err.error.non_field_errors) {
            this.forgotForm.setErrors({
              apiError: err.error.non_field_errors
            });
          }
          if (err.error.username) {
            this.forgotForm.controls['username'].setErrors({
              apiError: err.error.username
            });
          }
        }
      );
    }
  }

}
