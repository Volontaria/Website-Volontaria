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
  idEventInDeletion: number;

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
        _data => {
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

  ngOnInit() {
    this.userService.getProfile().subscribe(
      data => {
        this.user = data;
        this.updateParticipations();
      }
    );
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

            for (const event of this.events) {
              if ( new Date(event.start_date).getTime() > new Date().getTime()) {
                for (const participation of this.participations) {
                  if ( event.id === participation.event ) {
                    if ( participation.standby ) {
                      this.eventsAsOnHold.push(event);
                    } else {
                      this.eventsAsVolunteer.push(event);
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
    for (const participation of this.participations) {
      if (participation.event === this.idEventInDeletion) {
        this.participationService.deleteParticipation(participation.id).subscribe(
          _data => {
            this.updateParticipations();
            this.notificationService.success('Désinscription réussie', 'Merci!');
          }, _errors => {
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
