import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Event } from '../../../models/event';
import { ActivatedRoute, Params } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { Participation } from '../../../models/participation';
import { ParticipationService } from '../../../services/participation.service';
import { NotificationsService } from 'angular2-notifications';


@Component({
  selector: 'app-admin-event',
  templateUrl: './admin-event.component.html',
  styleUrls: ['admin-event.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminEventComponent implements OnInit {

  event: Event;
  participations: Participation[];
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

  constructor(private activatedRoute: ActivatedRoute,
              private eventService: EventService,
              private participationService: ParticipationService,
              private notificationService: NotificationsService) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.eventService.getEvent(params['eventId']).subscribe(
        data => {
          this.event = data;
          this.get_participations();
        }
      );
    });
  }

  get_participations() {
    this.participationService.getParticipations(this.event.id).subscribe(
      data => {
        this.participations = data.results.map(p => new Participation(p) );
      }
    );
  }

  save_participation(participation, field, value) {
    if (value && participation[field] !== value) {
      const buffer = participation[field];
      participation[field] = value;
      this.participationService.updateParticipation(participation).subscribe(
        data => {
          participation = data;
        },
        error => {
          participation[field] = buffer;
        }
      );
    }
  }

  calculate_minutes(participation) {
    if (participation.in_time && participation.out_time) {
      participation.presence_duration_minutes = (participation.out_time - participation.in_time) * 60.0;
      participation.presence_duration_minutes.toFixed(2);
    }
  }

  set_in_time(participation, value) {
    participation.in_time = value;
    this.calculate_minutes(participation);
  }

  set_out_time(participation, value) {
    participation.out_time = value;
    this.calculate_minutes(participation);
  }


}
