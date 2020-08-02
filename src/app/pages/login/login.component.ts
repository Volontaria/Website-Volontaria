import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { manageFormError } from '../../utils/form-errors';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserRegister } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  activeSection: 'signin' | 'signup' = 'signin';

  signinForm: FormGroup;
  signinNonFieldErrors: string[] = [];
  signupForm: FormGroup;
  signupNonFieldErrors: string[] = [];

  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initSigninForm();
    this.initSignupForm();
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.returnUrl = params.get('returnUrl') || '/';
    });
  }

  switchDrawer(): void {
    if (this.activeSection === 'signin') {
      this.activeSection = 'signup';
    } else {
      this.activeSection = 'signin';
    }
  }

  initSigninForm(): void {
    this.signinForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signin(): void {
    this.signinNonFieldErrors = [];
    if (this.signinForm.valid) {
      this.authenticationService
        .login(this.signinForm.getRawValue().email, this.signinForm.value.password)
        .subscribe(
          () => {
            this.snackBar.open('Connexion réussie', '', {
              duration: 3000,
            });
            this.router.navigate([this.returnUrl]).then();
          },
          (errorResponse: HttpErrorResponse) => {
            manageFormError(this.signinForm, errorResponse);
          }
        );
    }
  }

  initSignupForm(): void {
    this.signupForm = this.formBuilder.group({
      email: [null, Validators.required],
      password1: [null, Validators.required],
      password2: [null, Validators.required],
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
    });
  }

  signup(): void {
    if (this.signupForm.valid) {
      this.signupNonFieldErrors = [];

      const registerData: IUserRegister = this.signupForm.value;

      this.authenticationService.register(registerData).subscribe(
        () => {
          this.snackBar.open('Inscription réussie', '', {
            duration: 3000,
          });
          this.signinForm.controls.email.setValue(this.signupForm.controls.email.value);
          this.signinForm.controls.password.setValue(
            this.signupForm.controls.password1.value
          );
          this.signin();
        },
        (errorResponse: HttpErrorResponse) => {
          manageFormError(this.signupForm, errorResponse);
        }
      );
    }
  }
}
