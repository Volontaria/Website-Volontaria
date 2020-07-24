import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IUserInformation, User} from '../../../models/user';
import {ProfileService} from '../../../services/profile.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpErrorResponse} from '@angular/common/http';
import {manageFormError} from '../../../utils/form-errors';

@Component({
  selector: 'app-profile-informations',
  templateUrl: './profile-informations.component.html',
  styleUrls: ['./profile-informations.component.scss']
})
export class ProfileInformationsComponent implements OnInit {
  profileForm: FormGroup;
  private user: User;

  constructor(private formBuilder: FormBuilder,
              private profileService: ProfileService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.profileService.retrieveProfile().subscribe((user: User) => {
      this.updateUser(user);
      this.initChangeProfileForm();
    });
  }

  initChangeProfileForm(): void {
    this.profileForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
    });

    this.profileForm.patchValue(this.user);
    this.profileForm.controls.email.disable();
  }

  changeProfile(): void {
    if (this.profileForm.valid) {
      const userInformation: IUserInformation = this.profileForm.value;

      this.profileService.updateProfile(userInformation).subscribe(
        (user: User) => {
          this.updateUser(user);
          this.snackBar.open(
            'Vos informations ont été mises à jour',
            'X',
            {
              duration: 10000,
            }
          );
        },
        (errorResponse: HttpErrorResponse) => {
          manageFormError(this.profileForm, errorResponse);
        }
      );
    }
  }

  updateUser(user: User): void {
    this.user = user;
  }
}
