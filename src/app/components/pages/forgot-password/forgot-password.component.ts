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
  errors: string;

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
        _data => {
          console.log('success');
          this.router.navigate(['/forgot-password/confirmation']);
        },
        err => {
          if (err.error.non_field_errors) {
            this.errors = err.error.non_field_errors;
            console.log(this.errors);
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
