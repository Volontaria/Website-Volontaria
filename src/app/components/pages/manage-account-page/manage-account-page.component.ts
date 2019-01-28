import { Component } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-account',
  templateUrl: 'manage-account-page.component.html',
  styleUrls: ['manage-account-page.component.scss']
})
export class ManageAccountPageComponent {

  registerForm: FormGroup;
  errors: string[];

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) {
    this.registerForm = this.formBuilder.group(
      {
        email: [null, Validators.required],
        first_name: [null, Validators.required],
        last_name: [null, Validators.required],
        password: [null, Validators.required],
        confirmation: [null, Validators.required],
        username: [null, Validators.required],
        phone: [null],
        mobile: [null],
      },
      {validator: [
          this.confirmationValidator(),
        ]}
    );
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

  createAccount() {
    this.userService.createUser(this.registerForm.value, this.registerForm.controls['password'].value).subscribe(
      _data => {
        this.router.navigate(['/register/validation']);
      },
      err => {
        if (err.error.non_field_errors) {
          this.errors = err.error.non_field_errors;
        }
        if (err.error.first_name) {
          this.registerForm.controls['first_name'].setErrors({
            apiError: err.error.first_name
          });
        }
        if (err.error.last_name) {
          this.registerForm.controls['last_name'].setErrors({
            apiError: err.error.last_name
          });
        }
        if (err.error.email) {
          this.registerForm.controls['email'].setErrors({
            apiError: err.error.email
          });
        }
        if (err.error.password) {
          this.registerForm.controls['password'].setErrors({
            apiError: err.error.password
          });
        }
        if (err.error.phone) {
          this.registerForm.controls['phone'].setErrors({
            apiError: err.error.phone
          });
        }
        if (err.error.mobile) {
          this.registerForm.controls['mobile'].setErrors({
            apiError: err.error.mobile
          });
        }
        if (err.error.username) {
          this.registerForm.controls['username'].setErrors({
            apiError: err.error.username
          });
        }
      }
    );
  }
}
