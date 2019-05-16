import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { EventService } from '../../../services/event.service';
import { Event } from '../../../models/event';
import { ParticipationService } from '../../../services/participation.service';
import { Participation } from '../../../models/participation';
import { NotificationsService } from 'angular2-notifications';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MyModalService } from '../../../services/my-modal/my-modal.service';

@Component({
  selector: 'app-myschedule',
  templateUrl: './myschedule-page.component.html',
  styleUrls: ['myschedule-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MySchedulePageComponent implements OnInit {

  user: User;
  participations: Participation[];
  events: Event[];
  eventsAsVolunteer: Event[] = [];
  eventsAsOnHold: Event[] = [];
  changePasswordForm: FormGroup;
  changeProfileForm: FormGroup;
  idEventInDeletion: number;

  errors: string[];

  constructor(private userService: UserService,
              private eventService: EventService,
              private participationService: ParticipationService,
              private notificationService: NotificationsService,
              private formBuilder: FormBuilder,
              private myModalService: MyModalService) {
    this.changePasswordForm = this.formBuilder.group(
      {
        oldPassword: [null, Validators.required],
        newPassword: [null, Validators.required],
        confirmation: [null, Validators.required]
      },
      {validator: this.passwordValidator()}
    );

    this.changeProfileForm = this.formBuilder.group(
      {
        first_name: [null, Validators.required],
        last_name: [null, Validators.required],
        phone: [null],
        mobile: [null],
        email: [null, Validators.required],
      },
    );
  }

    ngOnInit() {
    this.userService.getProfile().subscribe(
      data => {
        this.user = data;
        this.updateParticipations();

        this.changeProfileForm.reset({
            'first_name': this.user.first_name,
            'last_name': this.user.last_name,
            'phone': this.user.phone,
            'mobile': this.user.mobile,
            'email': this.user.email
        });
      }
    );
  }

  changeProfile(form: FormGroup) {
    if ( form.valid ) {
      this.userService.changeProfile(
        this.user.id,
        {
          'first_name': form.controls['first_name'].value,
          'last_name': form.controls['last_name'].value,
          'phone': form.controls['phone'].value,
          'mobile': form.controls['mobile'].value,
          'email': form.controls['email'].value
        }
      ).subscribe(
        data => {
          this.myModalService.get('change profile').toggle();

          // Update the User local instance
          this.user.first_name = form.controls['first_name'].value;
          this.user.last_name = form.controls['last_name'].value;
          this.user.phone =form.controls['phone'].value;
          this.user.mobile =form.controls['mobile'].value;
          this.user.email =form.controls['email'].value;

          this.notificationService.success('Changement réussi',
            `Les informations ont été changé`);
        },
        err => {
          if (err.error.non_field_errors) {
            this.errors = err.error.non_field_errors;
          }
          if (err.error.first_name) {
            this.changeProfileForm.controls['first_name'].setErrors({
              apiError: err.error.first_name
            });
          }
          if (err.error.last_name) {
            this.changeProfileForm.controls['last_name'].setErrors({
              apiError: err.error.last_name
            });
          }
          if (err.error.phone) {
            this.changeProfileForm.controls['phone'].setErrors({
              apiError: err.error.phone
            });
          }
          if (err.error.mobile) {
            this.changeProfileForm.controls['mobile'].setErrors({
              apiError: err.error.mobile
            });
          }
          if (err.error.email) {
            this.changeProfileForm.controls['email'].setErrors({
              apiError: err.error.email
            });
          }
        }
      );
    }
  }

  passwordValidator() {
    return (group: FormGroup) => {

      const newPassword = group.controls['newPassword'];
      const confirmation = group.controls['confirmation'];

      if (newPassword.value && confirmation.value && newPassword.value !== confirmation.value) {
        return confirmation.setErrors({
          confirmationError: true
        });
      }
    };
  }

  changePassword(form: FormGroup) {
    if ( form.valid ) {
      this.userService.changePassword(
        this.user.id,
        form.controls['oldPassword'].value,
        form.controls['newPassword'].value).subscribe(
        data => {
          this.myModalService.get('change password').toggle();
          form.reset();
          this.notificationService.success('Changement réussi',
            `Le mot de passe a été changé`);
        },
        err => {
          if (err.error[0] === 'Bad password') {
            this.changePasswordForm.controls['oldPassword'].setErrors({
              badPassword: true
            });
          }
          if (err.error.password) {
            this.changePasswordForm.controls['newPassword'].setErrors({
              apiError: err.error.password
            });
          }
        }
      );
    }
  }

  updateParticipations() {
    /**
     * Sync participations data with API
     */

    this.participations = [];
    this.events = [];
    this.eventsAsVolunteer = [];
    this.eventsAsOnHold = [];

    this.participationService.getMyParticipations().subscribe(
      participations => {
        this.participations = participations.results.map(p => new Participation(p));

        this.eventService.getEvents([{name: 'volunteers', value: this.user.id}]).subscribe(
          events => {
            this.events = events.results.map(e => new Event(e));

            for (const event in this.events) {
              if ( new Date(this.events[event].start_date).getTime() > new Date().getTime()) {
                for (const participation in this.participations) {
                  if ( this.events[event].id === this.participations[participation].event ) {
                    if ( this.participations[participation].standby ) {
                      this.eventsAsOnHold.push(this.events[event]);
                    } else {
                      this.eventsAsVolunteer.push(this.events[event]);
                    }
                  }
                }
              }
            }
          }
        );
      }
    );
  }

  askToDeleteParticipation(idEvent: number) {
    /**
     * Open a modal to valid if user want to delete the participation
      */
    this.idEventInDeletion = idEvent;
    this.toggleModal('delete_participation');
  }

  deleteParticipation() {
    /**
     * Delete the participation linked to the specific event given in argument
     */
    this.toggleModal('delete_participation');
    let error = false;
    for (const participation in this.participations) {
      if (this.participations[participation].event === this.idEventInDeletion) {
        this.participationService.deleteParticipation(this.participations[participation].id).subscribe(
          data => {
            this.updateParticipations();
            this.notificationService.success('Désinscription réussie', 'Merci!');
          }, errors => {
            error = true;
          }
        );
      } else {
        error = true;
      }
    }
    if (error) {
      this.notificationService.error('Erreur', 'L\'annulation a échoué');
    }
  }

  toggleModal(name) {
    const modal = this.myModalService.get(name);

    if (!modal) {
      console.error('No modal named %s', name);
      return;
    }
    modal.toggle();
  }
}
