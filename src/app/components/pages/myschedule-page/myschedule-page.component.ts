import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { EventService } from '../../../services/event.service';
import { Event } from '../../../models/event';
import { ParticipationService } from '../../../services/participation.service';
import { Participation } from '../../../models/participation';
import { NotificationsService } from 'angular2-notifications';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private userService: UserService,
              private eventService: EventService,
              private participationService: ParticipationService,
              private notificationService: NotificationsService,
              private formBuilder: FormBuilder,
              private myModals: MyModalService) {
    this.changePasswordForm = this.formBuilder.group(
      {
        oldPassword: [null, Validators.required],
        newPassword: [null, Validators.required],
        confirmation: [null, Validators.required]
      },
      {validator: this.passwordValidator()}
    )
    ;
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
          this.myModals.get('change password').toggle();
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

  ngOnInit() {
    this.userService.getProfile().subscribe(
      data => {
        this.user = data;
      }
    );
    this.updateParticipations();
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

  deleteParticipation(idEvent: number) {
    /**
     * Delete the participation linked to the specific event given in argument
     */
    for (const participation in this.participations) {
      if (this.participations[participation].event === idEvent) {
        this.participationService.deleteParticipation(this.participations[participation].id).subscribe(
          data => {
            this.updateParticipations();
            this.notificationService.success('Désinscription réussie', 'Merci!');
          }
        );
      }
    }
  }

}
