import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Event } from '../../../models/event';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { EventService } from '../../../services/event.service';
import { AdminParticipation } from '../../../models/participation';
import { ParticipationService } from '../../../services/participation.service';
import { NotificationsService } from 'angular2-notifications';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyModalService } from '../../../services/my-modal/my-modal.service';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { CompleterItem } from 'ng2-completer';
import { AuthenticationService } from "../../../services/authentication.service";
import { CustomCompleterUserData } from "../../../utils/custom-completer-user-data.component";



@Component({
  selector: 'app-admin-event',
  templateUrl: './admin-event.component.html',
  styleUrls: ['admin-event.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminEventComponent implements OnInit {

  event: Event;

  participations: AdminParticipation[];
  participationsAdapted: AdminParticipation[];

  settings = {
    editButton: true,
    removeButton: true,
    clickable: true,
    columns: [
      {
        name: 'first_name',
        title: 'Prénom'
      },
      {
        name: 'last_name',
        title: 'Nom'
      },
      {
        name: 'email',
        title: 'Courriel'
      },
      {
        name: 'phone',
        title: 'Téléphone'
      },
      {
        name: 'mobile',
        title: 'Mobile'
      },
      {
        name: 'last_participation',
        title: 'Dernière participation',
        type: 'date'
      },
      {
        name: 'standby',
        title: 'Remplacant',
        type: 'boolean'
      },
      {
        name: 'presence_duration_minutes',
        title: 'Durée (minutes)'
      },
      {
        name: 'presence_status',
        title: 'Présence'
      }
    ]
  };

  participationStatusOption = [
    {
      value: 'I',
      name: 'Inconnu',
    },
    {
      value: 'A',
      name: 'Absent',
    },
    {
      value: 'P',
      name: 'Présent',
    },
  ];

  participationForm: FormGroup;
  selectedParticipation: AdminParticipation;

  modalTitle: string;
  modalCreate: boolean;

  selectedUser: User;

  public searchStr: string;
  public dataServiceUser: CustomCompleterUserData;

  constructor(private activatedRoute: ActivatedRoute,
              private eventService: EventService,
              private participationService: ParticipationService,
              private notificationService: NotificationsService,
              private formBuilder: FormBuilder,
              private myModalService: MyModalService,
              private userService: UserService,
              private router: Router,
              private authenticationService: AuthenticationService) {
      this.dataServiceUser = new CustomCompleterUserData(userService);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.eventService.getEvent(params['eventId']).subscribe(
        data => {
          this.event = data;
          this.get_participations();
        }
      );
    });

    this.participationForm = this.formBuilder.group(
      {
        presence_status: [0, [Validators.required]],
        start_date: [0],
        end_date: [0],
        user: [0]
      },
      {
        validator: this.dateValidator()
      }
    );
  }

  isManager() {
    return this.authenticationService.isAdmin() || this.authenticationService.isManager(this.event.cell.id);
  }

  get_participations() {
    this.participationService.getParticipations([{name: 'event', value: this.event.id}]).subscribe(
      data => {
        this.participations = data.results.map(p => new AdminParticipation(p));
        this.participationsAdapted = this.participationAdapter(this.participations);
      }
    );
  }

  opParticipation() {
    const data = {};
    data['presence_status'] = this.participationForm.value['presence_status'];

    if (this.participationForm.value['start_date'] && this.participationForm.value['end_date']) {
      const start = new Date(this.participationForm.value['start_date']).getTime();
      const end = new Date(this.participationForm.value['end_date']).getTime();
      data['presence_duration_minutes'] = (end - start) / 60000;
    }

    data['event'] = this.event.id;
    data['standby'] = false;

    if (this.participationForm.valid) {
      data['user_id'] = this.selectedUser.id;

      if (this.modalCreate) {
        this.createParticipation(data);
      } else {
        this.updateParticipation(data);
      }
    } else {
      for (const controlKey of Object.keys(this.participationForm.controls)) {
        this.participationForm.controls[controlKey].markAsTouched();
      }
    }
  }

  createParticipation(data) {
    this.participationService.createParticipation(data).subscribe(
      success => {
        this.toggleModal();
        this.notificationService.success('Création réussie',
          `La participation a été créé`);

        this.get_participations();
      },
      err => {
        if (err.error.presence_status) {
          this.participationForm.controls['presence_status'].setErrors({
            apiError: err.error.presence_status
          });
        }
        if (err.error.non_field_errors) {
          this.participationForm.setErrors({
            apiError: err.error.non_field_errors
          });
        }
      }
    );
  }

  updateParticipation(data) {
    this.participationService.updateParticipation(this.selectedParticipation.id, data).subscribe(
      success => {
        this.toggleModal();
        this.notificationService.success('Modification réussie',
          `La participation a été modifié`);

        this.get_participations();
      },
      err => {
        if (err.error.presence_status) {
          this.participationForm.controls['presence_status'].setErrors({
            apiError: err.error.presence_status
          });
        }
        if (err.error.non_field_errors) {
          this.participationForm.setErrors({
            apiError: err.error.non_field_errors
          });
        }
      }
    );
  }

  dateValidator() {
    return (group: FormGroup) => {

      const date_start = group.controls['start_date'];
      const date_end = group.controls['end_date'];

      if (date_start.value && !date_end.value) {
        return date_end.setErrors({
          apiError: ['Si une date de début est saisie, la date de fin est obligatoire.']
        });
      } else if (!date_start.value && date_end.value) {
        return date_start.setErrors({
          apiError: ['Si une date de fin est saisie, la date de début est obligatoire.']
        });
      } else if (date_start.value && date_end.value && date_start.value >= date_end.value) {
        return date_end.setErrors({
          apiError: ['La fin de la plage horaire doit être après le début de la plage horaire.']
        });
      }
    };
  }

  getSearchString(user) {
    return user.first_name + ' ' + user.last_name + ' ' + user.username + ' <' + user.email + '>';
  }

  OpenModalEditParticipation(event) {
    this.participationForm.reset();
    for (const participation of this.participations) {
      if (participation.id === event.id) {
        this.selectedParticipation = participation;
        this.participationForm.controls['presence_status'].setValue(participation.presence_status);

        this.selectedUser = participation.user;
        this.participationForm.controls['user'].setValue(this.getSearchString(participation.user));

        this.modalCreate = false;
        this.modalTitle = 'Modification d\'une participation';
        this.toggleModal();
      }
    }
  }

  OpenModalCreateParticipation() {
    this.participationForm.reset();
    this.modalCreate = true;
    this.modalTitle = 'Création d\'une participation';
    this.participationForm.controls['presence_status'].setValue('P');

    this.toggleModal();
  }

  toggleModal() {
    const modal = this.myModalService.get('participation modal');

    if (!modal) {
      console.error('No modal named %s', 'participation modal');
      return;
    }
    modal.toggle();
  }

  participationAdapter(participations) {
    const participationsAdapted = [];
    for (const participation of participations) {
      const newParticipation = {
        id: participation.id,
        first_name: participation.user.first_name,
        last_name: participation.user.last_name,
        email: participation.user.email,
        phone: participation.user.phone,
        mobile: participation.user.mobile,
        standby: participation.standby,
        presence_duration_minutes: participation.presence_duration_minutes,
        user: participation.user,
        last_participation: participation.user.last_participation
      };
      for (const status of this.participationStatusOption) {
        if (status.value === participation.presence_status) {
          newParticipation['presence_status'] = status.name;
        }
      }
      participationsAdapted.push(newParticipation);
    }
    return participationsAdapted;
  }

  onUserSelected(item: CompleterItem) {
    this.selectedUser = item ? item.originalObject : null;
  }

  userClicked(participation) {
    this.router.navigate(['/admin/volunteer/' + participation.user.id]);
  }

  removeField(item) {
    this.participationService.deleteParticipation(item.id).subscribe(
      data => {
        this.notificationService.success('Suppression réussie',
          `La participation a été supprimé`);
        this.get_participations();
      },
      err => {
        this.notificationService.error('Suppression échoué',
          `La participation n'a pas été supprimé`);
      }
    );
  }
}
