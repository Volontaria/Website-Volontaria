import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {manageFormError} from '../../../utils/form-errors';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthenticationService, IChangePassword} from '../../../services/authentication.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-password',
  templateUrl: './profile-password.component.html',
  styleUrls: ['./profile-password.component.scss']
})
export class ProfilePasswordComponent implements OnInit {
  passwordForm: FormGroup;

  @ViewChild(FormGroupDirective)
  ngFormChangePasswordForm: FormGroupDirective;

  constructor(private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.initChangePasswordForm();
  }

  initChangePasswordForm() {
    this.passwordForm = this.formBuilder.group({
      old_password: ['', Validators.required],
      new_password1: ['', Validators.required],
      new_password2: ['', Validators.required],
    });
  }

  changePassword() {
    if (this.passwordForm.valid) {
      this.authenticationService.changePassword(<IChangePassword> this.passwordForm.value)
        .subscribe(
          () => {
            this.ngFormChangePasswordForm.resetForm();
            this.snackBar.open(
              'Votre mot de passe a été modifié',
              'X',
              {
                duration: 10000,
              }
            );
          },
          (errorResponse: HttpErrorResponse) => {
            manageFormError(this.passwordForm, errorResponse);
          }
        );
    }
  }
}
