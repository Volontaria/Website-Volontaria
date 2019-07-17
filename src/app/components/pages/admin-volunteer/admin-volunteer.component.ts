import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {AdminUser} from '../../../models/user';
import {Participation} from '../../../models/participation';
import {Event} from '../../../models/event';
import {ParticipationService} from '../../../services/participation.service';
import {EventService} from '../../../services/event.service';

@Component({
  selector: 'app-admin-volunteer',
  templateUrl: './admin-volunteer.component.html',
  styleUrls: ['./admin-volunteer.component.scss']
})
export class AdminVolunteerComponent implements OnInit {

  user: AdminUser = null;
  eventsAsOnHold: any[] = [];
  eventsAsVolunteer: any[] = [];

  settings = {
    noDataText: 'Aucune participation pour le moment.',
    clickable: true,
    columns: [
      {
        name: 'start_date',
        title: 'Début'
      },
      {
        name: 'end_date',
        title: 'Fin'
      },
      {
        name: 'tasktype',
        title: 'Activité'
      },
      {
        name: 'location',
        title: 'Lieu'
      }
    ]
  };

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private participationService: ParticipationService,
              private eventService: EventService,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.userService.getUser(params['volunteerId']).subscribe(
        data => {
          this.user = data;
          this.refreshParticipations();
        }
      );
    });
  }

  getPresenceTxt(status) {
    if (status === 'A') {
      return 'Absent';
    } else if (status === 'P') {
      return 'Présent';
    } else {
      return 'Initialisation';
    }
  }


  refreshParticipations() {
    this.participationService.getParticipations([{name: 'username', value: this.user.username}]).subscribe(
      participations => {
        const listParticipations = participations.results.map(p => new Participation(p));

        this.eventService.getEvents([{name: 'volunteers', value: this.user.id}]).subscribe(
          events => {
            const listEvents = events.results.map(e => new Event(e));

            for (const event in listEvents) {
              if (event) {
                for (const participation in listParticipations) {
                  if ( listEvents[event].id === listParticipations[participation].event ) {
                    listEvents[event].presence = this.getPresenceTxt(listParticipations[participation].presence_status);
                    if ( listParticipations[participation].standby ) {
                      this.eventsAsOnHold.push(this.eventAdapter(listEvents[event]));
                    } else {
                      this.eventsAsVolunteer.push(this.eventAdapter(listEvents[event]));
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

  eventAdapter(event) {
    return {
      id: event.id,
      presence: event.presence,
      cycle: event.cycle.name,
      start_date: event.getStartDate(),
      end_date: event.getEndTime(),
      tasktype: event.task_type.name,
      location: event.cell.name
    };
  }

  eventClicked(event) {
    this.router.navigate(['/admin/events/' + event.id]);
  }
}
